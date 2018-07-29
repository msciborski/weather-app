import React from 'react';
import PropTypes from 'prop-types';

const WeatherInfoRow = (props) => {
  const { rowName, rowValue } = props;

  return (
    <div className="weather-content__header__main-information__weather__weather">
      <span className="weather-content__header__main-information__weather__weather__title">
        {rowName}
      </span>
      <span className="weather-contnet__header__main-information__weather__weather__value">
        {rowValue}
      </span>
    </div>
  );
};

WeatherInfoRow.propTypes = {
  rowName: PropTypes.string.isRequired,
  rowValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
export default WeatherInfoRow;
