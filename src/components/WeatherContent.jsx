import React from 'react';
import PropTypes from 'prop-types';
import CityWeatherHeader from './CityWeatherHeader';

const WeatherContent = (props) => {
  const { weather } = props;
  const { name, main, sys } = weather;
  const description = weather.weather[0].main;

  return (
    <div className="weather-content">
      <CityWeatherHeader city={name} mainWeatherInfo={main} mainSysInfo={sys} description={description} />
    </div>
  );
};
WeatherContent.propTypes = {
  weather: PropTypes.object.isRequired,
};
export default WeatherContent;
