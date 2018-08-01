import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import ForeCastDataProcessor from '../utilites/ForecastDataProcessor';

export default class ForecastChart extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    const { forecast } = this.props;

    this.state = {
      forecast: new ForeCastDataProcessor(forecast),
    };
  }

  componentDidMount() {
    const ctx = document.getElementById('forecast-chart');
    const { forecast } = this.state;
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: forecast.getLabels(),
        datasets: [{
          label: 'Pogoda',
          data: forecast.getData(),
          backgroundColor: 'rgba(187, 222, 251, 1)',
          borderColor: 'rgba(0,0,0,0)',
        }],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Poznan',
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false,
            },
          }],
        },
      },
    });
  }

  render() {
    return (
      <div className="weather-content__header__forecast-chart">
        <canvas id="forecast-chart" />
      </div>
    );
  }
}
