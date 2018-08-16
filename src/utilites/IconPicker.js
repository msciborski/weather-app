import React from 'react';
import ReactSVG from 'react-svg';
import Sun from '../images/icons/weather-sunny.svg';
import PartlyCloudy from '../images/icons/weather-partlycloudy.svg';
import Cloudy from '../images/icons/weather-cloudy.svg';
import Rainy from '../images/icons/weather-rainy.svg';
import Pouring from '../images/icons/weather-pouring.svg';
import Thunderstorm from '../images/icons/weather-lightning-rainy.svg';
import Snow from '../images/icons/weather-snowy.svg';
import Mist from '../images/icons/weather-fog.svg';

const GetIcon = (description) => {
  const desc = description.toLowerCase();
  switch (desc) {
    case 'clear': {
      return (
        <ReactSVG path={Sun} svgClassName="weather-content__header__main-information__icon__icon" />
      );
    }
    case 'few clouds': {
      return (
        <ReactSVG path={PartlyCloudy} svgClassName="weather-content__header__main-information__icon__icon" />
      );
    }
    case 'broken clouds':
    case 'scattered clouds': {
      return (
        <ReactSVG path={Cloudy} svgClassName="weather-content__header__main-information__icon__icon" />
      );
    }
    case 'shower rain': {
      return (
        <ReactSVG path={Rainy} svgClassName="weather-content__header__main-information__icon__icon" />
      );
    }
    case 'rain': {
      return (
        <ReactSVG path={Pouring} svgClassName="weather-content__header__main-information__icon__icon" />
      );
    }
    case 'thunderstorm': {
      return (
        <ReactSVG path={Thunderstorm} svgClassName="weather-content__header__main-information__icon__icon" />
      );
    }
    case 'snow': {
      return (
        <ReactSVG path={Snow} svgClassName="weather-content__header__main-information__icon__icon" />
      );
    }
    case 'mist': {
      return (
        <ReactSVG path={Mist} svgClassName="weather-content__header__main-information__icon__icon" />
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

export default GetIcon;
