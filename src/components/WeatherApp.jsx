import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Header from './Header';
import WeatherContent from './WeatherContent';
import CitySearchBar from './CitySearchBar';

const API_KEY = '9751d95f8393e1ba8fe312a569747b91';

export default class WeatherApp extends Component {
  state = {
    city: undefined,
    weather: undefined,
    selectedUnit: 'metric',
    error: undefined,
    selectedLang: 'pl',
  }

  componentDidUpdate(prevProps, prevState) {
    const { city } = this.state;
    const { selectedUnit } = this.state;
    const { selectedLang } = this.state;
    if (prevState.city !== city) {
      this.fetchWeather(city, selectedUnit, selectedLang);
    }
  }

  setCity = _.debounce((city) => {
    if (city !== '') {
      this.setState(() => ({ city }));
    }
    this.setState(() => ({ error: undefined }));
  }, 400);

  setError = (error) => {
    this.setState(() => ({ error }));
  }

  setWeather = (weather) => {
    this.setState(() => ({ weather }));
    this.setError(undefined);
  }

  setLanguage = (lang) => {
    this.setState(() => ({ selectedLang: lang }));
  }

  setUnit = (unit) => {
    this.setState(() => ({ selectedUnit: unit }));
  }

  fetchWeather = (city, units, lang) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=${units}&lang=${lang}`;
    fetch(url)
      .then(response => response.json())
      .then((responseJson) => {
        const { cod } = responseJson;
        if (cod === '200') {
          this.setWeather(responseJson);
        } else {
          this.setError(responseJson.message);
        }
      });
  }

  render() {
    const { weather } = this.state;
    const { error } = this.state;
    const { languages } = this.props;
    const { units } = this.props;
    return (
      <Grid>
        <Header units={units} lang={languages} setLang={this.setLanguage} setUnit={this.setUnit} />
        <CitySearchBar setCity={this.setCity} fetchError={error} />
        {weather && <WeatherContent weather={weather} />}
      </Grid>
    );
  }
}
WeatherApp.defaultProps = {
  languages: [
    { name: 'Polish', value: 'pl' },
    { name: 'English', value: 'en' },
    { name: 'Russia', value: 'ru' },
  ],
  units: [
    { name: 'test', value: 'test' },
    { name: 'test2', value: 'test2' },
  ],
};
WeatherApp.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  units: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};
