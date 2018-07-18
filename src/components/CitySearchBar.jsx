import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputWithPlaceholder from './InputWithPlaceholder';

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
    const inputStyle = error ? 'search-bar__form__input-field error'
      : 'search-bar__form__input-field';
    const placeHolder = 'City';
    return (
      <div className="search-bar">
        <form id="form-city" name="form-city" className="search-bar__form">
          <InputWithPlaceholder
            placeHolder={placeHolder}
            inputStyle={inputStyle}
            onChangeHandler={this.handleCityChange}
          />
        </form>
      </div>
    );
  }
}

CitySearchBar.propTypes = {
  setCity: PropTypes.func.isRequired,
};
