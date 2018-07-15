import React, { Component } from 'react';
import _ from 'lodash';
import Grid from './Grid';
import Header from './Header';
import WeatherContent from './WeatherContent';

export default class WeatherApp extends Component {
  state = {
    city: undefined,
  }

  componentDidUpdate(prevProps, prevState) {
    const { city } = this.state;
    if (prevState.city !== city) {
      console.log(city);
    }
  }

  setCity = _.debounce((city) => {
    this.setState(() => ({ city }));
  }, 1000);

  render() {
    const { city } = this.state;
    return (
      <Grid>
        <Header />
        <WeatherContent setCity={this.setCity} />
        <h1>
          {city}
        </h1>
      </Grid>
    );
  }
}
