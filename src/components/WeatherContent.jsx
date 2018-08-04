import React from 'react';
import PropTypes from 'prop-types';
import CityWeatherHeader from './CityWeatherHeader';

const WeatherContent = (props) => {
  const { forecast } = props;
  const { weather } = props;
  const { name, main, sys } = weather;
  const description = weather.weather[0].main;

  return (
    <div className="weather-content">
      <CityWeatherHeader
        city={name}
        mainWeatherInfo={main}
        mainSysInfo={sys}
        description={description}
        forecast={forecast}
      />
    </div>
  );
};
WeatherContent.propTypes = {
  weather: PropTypes.object.isRequired,
  forecast: PropTypes.shape({
    dateTimeStamp: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    tempMin: PropTypes.number.isRequired,
    tempMax: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    seaLevel: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    clouds: PropTypes.number.isRequired,
  }).isRequired,
};
export default WeatherContent;
