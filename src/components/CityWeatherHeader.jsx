import React from 'react';
import PropTypes from 'prop-types';

const CityWeatherHeader = (props) => {
  const { temp, city, country } = props;
  return (
    <div className="content__city-weather-header">
      <h1>
        {`${city}, ${country}`}
      </h1>
      <h2>
        {temp}
      </h2>
    </div>
  );
};
export default CityWeatherHeader;

// CityWeatherHeader.propTypes = {
//   city: PropTypes.string.isRequired,
//   country: PropTypes.string.isRequired,
//   temp: PropTypes.number.isRequired,
// };
