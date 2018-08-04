import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import ForeCastDataProcessor from '../utilites/ForecastDataProcessor';

export default class ForecastChart extends Component {
  constructor(props) {
    super(props);
    const { forecast } = this.props;
    const forecastDataProcessor = new ForeCastDataProcessor(forecast);
    const data = forecastDataProcessor.getData();
    const labels = forecastDataProcessor.getLabels();
    const tempMin = forecastDataProcessor.getTempMin();
    const tempMax = forecastDataProcessor.getTempMax();
    const pressure = forecastDataProcessor.getPressure();
    const description = forecastDataProcessor.getDescription();

    // Create global object of Chart, becouse i need to access to
    // the canvas in customtooltip function
    let chart;

    this.state = {
      labels,
      data,
      tempMin,
      tempMax,
      pressure,
      description,
    };
  }

  componentDidMount() {
    const ctx = document.getElementById('forecast-chart');
    const { labels, data } = this.state;
    this.chart = new Chart(ctx, this.getChartOptions(labels, data));
  }

  getChartOptions = (labels, data) => ({
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Pogoda',
        data,
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
      // scales: {
      //   xAxes: [{
      //     ticks: {
      //       display: false,
      //     },
      //   }],
      // },
      tooltips: {
        enabled: false,
        position: 'nearest',
        mode: 'index',
        custom: this.customTooltip,
      },
    },
  });

  customTooltip = (tooltipModel) => {
    console.log(tooltipModel);
    if (tooltipModel) {
      let tooltipEl = document.getElementById('chartjs-tooltip');
      // Create tooltip element, when tooltip dosen't exist
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.classList.add('weather-content__header__forecast-chart__tooltip');
        tooltipEl.innerHTML = '<div class="weather-content__header__forecast-chart__tooltip__body"></div>';
        document.body.appendChild(tooltipEl);
      }

      // Hide if tooltip opacity is set 0
      if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set carret position
      tooltipEl.classList.remove('above', 'below', 'no-transform');
      if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
      } else {
        tooltipEl.classList.add('no-transform');
      }

      if (tooltipModel.body) {
        const label = tooltipModel.dataPoints[0].xLabel;
        const { index } = tooltipModel.dataPoints[0];
        const { tempMin } = this.state;
        const { tempMax } = this.state;
        const { pressure } = this.state;
        const { description } = this.state;

        const labelHtml = `<div class="weather-content__header__forecast-chart__tooltip__body__label"><span>${label}</span></div>`;
        const tempMinHtml = `<div class="weather-content__header__forecast-chart__tooltip__body__info"><span>Temp min:</span><span>${tempMin[index]}</span></div>`;
        const tempMaxHtml = `<div class="weather-content__header__forecast-chart__tooltip__body__info"><span>Temp max:</span><span>${tempMax[index]}</span></div>`;
        const pressureHtml = `<div class="weather-content__header__forecast-chart__tooltip__body__info"><span>Pressure:</span><span>${pressure[index]}</span></div>`;

        const rootTooltip = tooltipEl.querySelector('div');
        rootTooltip.innerHTML = `${labelHtml}${tempMinHtml}${tempMaxHtml}${pressureHtml}`;

        const { canvas } = this.chart;
        const position = canvas.getBoundingClientRect();
        // CSS that have to be set in js, becouse we need to know position of caret and canvas

        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = `${position.left + tooltipModel.caretX}px`;
        tooltipEl.style.top = `${position.top + tooltipModel.caretY + 50}px`;
        tooltipEl.style.padding = `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`;
      }
    }
  }

  render() {
    return (
      <div className="weather-content__header__forecast-chart">
        <canvas id="forecast-chart" />
      </div>
    );
  }
}
