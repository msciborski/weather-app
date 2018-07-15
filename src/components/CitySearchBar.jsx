import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CitySearchBar extends Component {
  state = {
    error: undefined,
  };

  handleCityChange = (e) => {
    const { setCity } = this.props;
    const city = e.target.value.trim();
    const error = setCity(city);

    this.setState(() => ({ error }));
  }

  render() {
    const { error } = this.state;
    const errorClass = error ? 'error' : '';
    const placeHolder = error ? 'Invalid city' : 'Enter valid city name';
    return (
      <div className="content__search-bar">
        <form id="form-city" name="form-city">
          <input type="text" name="city" onChange={this.handleCityChange} className={`content__search-bar__city ${errorClass}`} placeholder={placeHolder} />
        </form>
      </div>
    );
  }
}

CitySearchBar.propTypes = {
  setCity: PropTypes.func.isRequired,
};
