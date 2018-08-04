export default class ForecastDataProcessor {
  constructor(forecast) {
    this.forecast = forecast;
  }

  getLabels = () => (
    this.forecast.map((f) => {
      const date = new Date(f.dateTimeStamp * 1000);
      return date.toLocaleTimeString();
    }));

  getData = () => (this.forecast.map(f => f.temp));

  getTempMin = () => (this.forecast.map(f => f.tempMin));

  getTempMax = () => (this.forecast.map(f => f.tempMax));

  getPressure = () => (this.forecast.map(f => f.pressure));

  getDescription = () => (this.forecast.map(f => f.description));
}
