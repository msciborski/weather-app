import React from 'react';
import PropTypes from 'prop-types';
import MainWeatherInformation from './MainWeatherInformation';

const CityWeatherHeader = (props) => {
  const { city, mainWeatherInfo, mainSysInfo, description } = props;
  const { country, sunrise, sunset } = mainSysInfo;
  const { humidity, pressure, temp, temp_max, temp_min } = mainWeatherInfo;

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
  console.log(mainInformation);
  return (
    <div className="weather-content__header">
      <MainWeatherInformation mainInformation={mainInformation} />
    </div>
  );
};
export default CityWeatherHeader;

// CityWeatherHeader.propTypes = {
//   city: PropTypes.string.isRequired,
//   country: PropTypes.string.isRequired,
//   temp: PropTypes.number.isRequired,
// };
