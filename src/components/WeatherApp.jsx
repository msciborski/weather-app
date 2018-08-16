import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Header from './Header';
import WeatherContent from './WeatherContent';
import CitySearchBar from './CitySearchBar';
import ForecastMock from '../ForecastMock';
import ForecastUtils from '../utilites/ForecastUtils';

const isDevelopment = true;
const API_KEY = '9751d95f8393e1ba8fe312a569747b91';
const WEATHER_MOCK = JSON.parse('{"coord":{"lon":16.93,"lat":52.41},"weather":[{"id":800,"main":"Clear","description":"bezchmurnie","icon":"01d"}],"base":"stations","main":{"temp":27,"pressure":1013,"humidity":47,"temp_min":27,"temp_max":27},"visibility":10000,"wind":{"speed":3.1,"deg":350},"clouds":{"all":0},"dt":1532453400,"sys":{"type":1,"id":5364,"message":0.0027,"country":"PL","sunrise":1532401267,"sunset":1532458532},"id":7530858,"name":"Poznań","cod":200}');
const FORECAST_MOCK = ForecastMock.GetForecastMock();
export default class WeatherApp extends Component {
  state = {
    city: undefined,
    weather: undefined,
    forecast: undefined,
    selectedUnit: 'metric',
    error: undefined,
    selectedLang: 'pl',
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    const { city } = this.state;
    const { selectedUnit } = this.state;
    const { selectedLang } = this.state;
    if (prevState.city !== city || prevState.selectedLang !== selectedLang || prevState.selectedUnit !== selectedUnit) {
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

  fetchWeather = (city, units, lang) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=${units}&lang=${lang}`;
    fetch(url)
      .then(response => response.json())
      .then((responseJson) => {
        const { cod } = responseJson;
        if (cod === '200') {
          console.log(responseJson);
          this.setWeather(responseJson);
        } else {
          this.setError(responseJson.message);
        }
      });
  }

  fetchForecast = (city, units, lang) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=${units}&lang=${lang}`;
    fetch(url)
      .then(response => response.json())
      .then((responseJson) => {
        const { cod } = responseJson;
        if (cod === '200') {
          const forecast = ForecastUtils.GetForecast(responseJson);
          console.log(forecast);
          this.setForecast(forecast);
        } else {
          console.log('Nie dobrze');
          this.setError(responseJson.message);
        }
      });
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
