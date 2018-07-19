import React, { Component } from 'react';
import _ from 'lodash';
import Grid from './Grid';
import Header from './Header';
import WeatherContent from './WeatherContent';
import CitySearchBar from './CitySearchBar';

const API_KEY = '9751d95f8393e1ba8fe312a569747b91';

export default class WeatherApp extends Component {
  state = {
    city: undefined,
    weather: undefined,
    units: 'metric',
    error: undefined,
    lang: 'pl',
  }

  componentDidUpdate(prevProps, prevState) {
    const { city } = this.state;
    const { units } = this.state;
    const { lang } = this.state;
    if (prevState.city !== city) {
      this.fetchWeather(city, units, lang);
    }
  }

  setCity = _.debounce((city) => {
    this.setState(() => ({ city }));
  }, 400);

  setError = (error) => {
    this.setState(() => ({ error }));
  }

  setWeather = (weather) => {
    this.setState(() => ({ weather }));
    this.setError(undefined);
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
    return (
      <Grid>
        <Header />
        <CitySearchBar setCity={this.setCity} fetchError={error} />
        {weather && <WeatherContent weather={weather} />}
      </Grid>
    );
  }
}
