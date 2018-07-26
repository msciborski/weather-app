import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import Sun from '../images/icons/Sun.svg';
import Sunrise from '../images/icons/Sunrise.svg';
import Sunset from '../images/icons/Sunset.svg';

const GetIcon = (description) => {
  switch (description) {
    case 'Clear': {
      return (
        <ReactSVG path={Sun} className="weather-content__header__main-information__icon__icon" />
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
  const { city, country, sunrise, sunset, temp,
            tempMax, tempMin, humidity, pressure, description} = mainInformation;
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
        <div className="weahter-content__header__main-information__weather__temp">
          {temp}
        </div>
      </div>
    </div>
  );
};


export default MainWeatherInformation;
