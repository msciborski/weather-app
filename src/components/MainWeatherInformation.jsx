import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import Sun from '../images/icons/weather-sunny.svg';
import Sunrise from '../images/icons/weather-sunset-up.svg';
import Sunset from '../images/icons/weather-sunset-down.svg';
import WeatherInfoRow from './WeatherInfoRow';

const GetIcon = (description) => {
  switch (description) {
    case 'Clear': {
      return (
        <ReactSVG path={Sun} svgClassName="weather-content__header__main-information__icon__icon" />
      );
    }
    default: {
      return (
        <div>
          Default icon.
        </div>
      );
    }
  }
};

const MainWeatherInformation = (props) => {
  const { mainInformation } = props;

  const {
    city,
    country,
    sunrise,
    sunset,
    temp,
    tempMax,
    tempMin,
    humidity,
    pressure,
    description,
  } = mainInformation;
  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();

  return (
    <div className="weather-content__header__main-information">
      <div className="weather-conent__header__main-information__icon">
        {GetIcon(description)}
      </div>
      <div className="weather-content__header__main-infromation__title">
        <h1>
          {`${city}, ${country}`}
        </h1>
      </div>
      <div className="weather-content__header__main-information__sun">
        <div className="weather-content__header__main-information__sun__sunrise">
          <ReactSVG path={Sunrise} svgClassName="weather-content__header__main__main-information__sun__sunrise__icon" />
          <span>
            {sunriseTime}
          </span>
        </div>
        <div className="weather-content__header__main-information__sun__sunset">
          <ReactSVG path={Sunset} svgClassName="weather-content__header__main__main-information__sun__sunset__icon" />
          <span>
            {sunsetTime}
          </span>
        </div>
      </div>
      <div className="weather-content__header__main-information__weather">
        <WeatherInfoRow rowName="Temperature" rowValue={temp} />
        <WeatherInfoRow rowName="Min temp." rowValue={tempMin} />
        <WeatherInfoRow rowName="Max temp." rowValue={tempMax} />
        <WeatherInfoRow rowName="Humidity" rowValue={humidity} />
        <WeatherInfoRow rowName="Pressure" rowValue={pressure} />
      </div>
    </div>
  );
};
MainWeatherInformation.propTypes = {
  mainInformation: PropTypes.shape({
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    sunrise: PropTypes.number.isRequired,
    sunset: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    tempMax: PropTypes.number.isRequired,
    tempMin: PropTypes.number.isRequired,
  }).isRequired,
};

export default MainWeatherInformation;
