export default class ForecastUtils {
  static GetForecast(weatherForeacast) {
    const MapForecastToShortForecast = (forecast) => {
      const { all } = forecast.clouds;
      const { dt } = forecast;

      const {
        temp,
        temp_min,
        temp_max,
        pressure,
        sea_level,
      } = forecast.main;

      const { description, main } = forecast.weather[0];
      return {
        dateTimeStamp: dt,
        temp,
        tempMin: temp_min,
        tempMax: temp_max,
        pressure,
        seaLevel: sea_level,
        description,
        main,
        clouds: all,
      };
    };

    const { list } = weatherForeacast;
    const forecasts = [];
    let i = 0;
    while (i < list.length) {
      if (i >= 8) {
        break;
      }
      const shortForecast = MapForecastToShortForecast(list[i]);
      forecasts.push(shortForecast);
      i += 1;
    }
    return forecasts;
  }
}
