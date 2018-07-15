import React from 'react';
import PropTypes from 'prop-types';
import CitySearchBar from './CitySearchBar';

const WeatherContent = (props) => {
  const { setCity } = props;
  return (
    <div className="content">
      <CitySearchBar setCity={setCity} />
    </div>
  );
};
WeatherContent.propTypes = {
  setCity: PropTypes.func.isRequired,
};
export default WeatherContent;
