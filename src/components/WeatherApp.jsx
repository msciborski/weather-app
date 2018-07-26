import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Header from './Header';
import WeatherContent from './WeatherContent';
import CitySearchBar from './CitySearchBar';

const isDevelopment = true;
const API_KEY = '9751d95f8393e1ba8fe312a569747b91';
const WEATHER_MOCK = JSON.parse('{"coord":{"lon":16.93,"lat":52.41},"weather":[{"id":800,"main":"Clear","description":"bezchmurnie","icon":"01d"}],"base":"stations","main":{"temp":27,"pressure":1013,"humidity":47,"temp_min":27,"temp_max":27},"visibility":10000,"wind":{"speed":3.1,"deg":350},"clouds":{"all":0},"dt":1532453400,"sys":{"type":1,"id":5364,"message":0.0027,"country":"PL","sunrise":1532401267,"sunset":1532458532},"id":7530858,"name":"Poznań","cod":200}');
export default class WeatherApp extends Component {
  state = {
    city: undefined,
    weather: undefined,
    selectedUnit: 'metric',
    error: undefined,
    selectedLang: 'pl',
  }

  componentDidMount() {
    console.log(WEATHER_MOCK);
    this.setWeather(WEATHER_MOCK);
  }

  componentDidUpdate(prevProps, prevState) {
    const { city } = this.state;
    const { selectedUnit } = this.state;
    const { selectedLang } = this.state;
    if (prevState.city !== city && !isDevelopment) {
      this.fetchWeather(city, selectedUnit, selectedLang);
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

  fetchWeather = (city, units, lang) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=${units}&lang=${lang}`;
    fetch(url)
      .then(response => response.json())
      .then((responseJson) => {
        const { cod } = responseJson;
        if (cod === 200) {
          console.log(responseJson);
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
