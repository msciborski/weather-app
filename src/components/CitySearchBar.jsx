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
      <div className="search-bar">
        <form id="form-city" name="form-city" className="search-bar__form">
          <div className="search-bar__form__input-field">
            <input type="text" name="city" onChange={this.handleCityChange} className={errorClass} />
            <label htmlFor="city">
              {placeHolder}
            </label>
          </div>
        </form>
      </div>
    );
  }
}

CitySearchBar.propTypes = {
  setCity: PropTypes.func.isRequired,
};
