import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputWithPlaceholder from './InputWithPlaceholder';

export default class CitySearchBar extends Component {
  handleCityChange = (e) => {
    const { setCity } = this.props;
    const city = e.target.value.trim();
    setCity(city);
  }

  render() {
    const { fetchError } = this.props;
    const inputStyle = !fetchError ? 'search-bar__form__input-field'
      : 'search-bar__form__input-field error';
    return (
      <div className="search-bar">
        <form id="form-city" name="form-city" className="search-bar__form">
          <InputWithPlaceholder
            placeHolder="City"
            inputStyle={inputStyle}
            onChangeHandler={this.handleCityChange}
          />
        </form>
      </div>
    );
  }
}
CitySearchBar.defaultProps = {
  fetchError: undefined,
};
CitySearchBar.propTypes = {
  setCity: PropTypes.func.isRequired,
  fetchError: PropTypes.string,
};
