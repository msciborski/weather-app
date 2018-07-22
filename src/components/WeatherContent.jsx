import React from 'react';
import PropTypes from 'prop-types';
import CityWeatherHeader from './CityWeatherHeader';

const WeatherContent = (props) => {
  const { weather } = props;
  return (
    <div className="content">
      <CityWeatherHeader />
    </div>
  );
};
WeatherContent.propTypes = {
  weather: PropTypes.object.isRequired,
};
export default WeatherContent;
