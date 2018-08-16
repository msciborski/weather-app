import React from 'react';
import PropTypes from 'prop-types';
import MainWeatherInformation from './MainWeatherInformation';
import ForecastChart from './ForecastChart';

const CityWeatherHeader = (props) => {
  const { forecast } = props;
  const {
    city, mainWeatherInfo, mainSysInfo, description,
  } = props;

  const { country, sunrise, sunset } = mainSysInfo;
  const {
    humidity, pressure, temp, temp_max, temp_min,
  } = mainWeatherInfo;

  const mainInformation = {
    city,
    country,
    sunrise,
    sunset,
    temp,
    tempMax: temp_max,
    tempMin: temp_min,
    humidity,
    pressure,
    description,
  };

  return (
    <div className="weather-content__header">
      <MainWeatherInformation mainInformation={mainInformation} />
      <ForecastChart forecast={forecast} />
    </div>
  );
};
export default CityWeatherHeader;

CityWeatherHeader.propTypes = {
  city: PropTypes.string.isRequired,
  mainWeatherInfo: PropTypes.shape({
    humidity: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    temp_max: PropTypes.number.isRequired,
    temp_min: PropTypes.number.isRequired,
  }).isRequired,
  mainSysInfo: PropTypes.shape({
    country: PropTypes.string.isRequired,
    id: PropTypes.number,
    sunrise: PropTypes.number.isRequired,
    sunset: PropTypes.number.isRequired,
    message: PropTypes.number,
    type: PropTypes.number,
  }).isRequired,
  description: PropTypes.string.isRequired,
  forecast: PropTypes.arrayOf(PropTypes.shape({
    dateTimeStamp: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    tempMin: PropTypes.number.isRequired,
    tempMax: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    seaLevel: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    clouds: PropTypes.number.isRequired,
  })).isRequired,
};
