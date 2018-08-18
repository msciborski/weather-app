import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Header from './Header';
import WeatherContent from './WeatherContent';
import CitySearchBar from './CitySearchBar';
import ForecastUtils from '../utilites/ForecastUtils';

const API_KEY = '9751d95f8393e1ba8fe312a569747b91';

export default class WeatherApp extends Component {
  state = {
    city: undefined,
    weather: undefined,
    forecast: undefined,
    selectedUnit: 'metric',
    error: undefined,
    selectedLang: 'pl',
  }

  componentDidUpdate(prevProps, prevState) {
    const { city } = this.state;
    const { selectedUnit } = this.state;
    const { selectedLang } = this.state;
    if (prevState.city !== city || prevState.selectedLang !== selectedLang
      || prevState.selectedUnit !== selectedUnit) {
      this.fetchData(city, selectedUnit, selectedLang);
    }
  }

  setCity = _.debounce((city) => {
    if (city !== '') {
      this.setState(() => ({ city }));
    }
    this.setState(() => ({ error: undefined }));
  }, 1000);

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

  setForecast = (forecast) => {
    this.setState(() => ({ forecast }));
  }

  fetchData = (city, units, lang) => {
    const urlForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=${units}&lang=${lang}`;
    const urlWeather = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=${units}&lang=${lang}`;
    Promise.all([
      fetch(urlWeather),
      fetch(urlForecast),
    ]).then(([responseWeather, responseForecast]) => {
      Promise.all([responseWeather.json(), responseForecast.json()]).then(([weather, forecast]) => {
        const codW = weather.cod;
        const codF = forecast.cod;
        if (codW === 200 && codF === '200') {
          const processedForecast = ForecastUtils.GetForecast(forecast);
          this.setWeather(weather);
          this.setForecast(processedForecast);
        } else if (codW !== 200) {
          this.setError(weather.message);
        } else if (codF !== '200') {
          this.setError(forecast.message);
        }
      });
    });
  }

  render() {
    const { weather } = this.state;
    const { error } = this.state;
    const { forecast } = this.state;
    const { languages } = this.props;
    const { units } = this.props;

    return (
      <Grid>
        <Header units={units} lang={languages} setLang={this.setLanguage} setUnit={this.setUnit} />
        <CitySearchBar setCity={this.setCity} fetchError={error} />
        {(weather && forecast) && <WeatherContent weather={weather} forecast={forecast} />}
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
    { name: 'metric', value: 'metric' },
    { name: 'imperial', value: 'imperial' },
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
