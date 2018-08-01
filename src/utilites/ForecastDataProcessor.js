export default class ForecastDataProcessor {
  constructor(forecast) {
    this.forecast = forecast;
  }

  getLabels = () => (
    this.forecast.map((f) => {
      const date = new Date(f.dateTimeStamp * 1000);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }));

  getData = () => (this.forecast.map(f => f.temp));
}
