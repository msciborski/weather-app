import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    const { elements } = props;
    const optionsList = elements.map(element => (
      <li role="button" key={element.value} value={element.value} onClick={this.handleDropdownSelect} tabIndex="0">
        {element.name}
      </li>
    ));
    this.state = {
      optionsList,
      dropDownId: _.uniqueId('drop-down-'),
    };
  }

  setDropdownRef = (node) => {
    this.node = node;
  }

  setSelectedItem = (element) => {
    const selectedBeforeElement = document.querySelector('[selected]');
    this.removeSelectionFromItem(selectedBeforeElement);
    element.setAttribute('selected', '');
  }

  removeSelectionFromItem = (selectedItem) => {
    if (selectedItem) {
      selectedItem.removeAttribute('selected');
    }
  }

  handleDropdownSelect = (e) => {
    const value = e.target.getAttribute('value');
    const { selectHandler } = this.props;
    selectHandler(value);
    this.setSelectedItem(e.target);
  }

  render() {
    const { dropDownId } = this.state;
    const { optionsList } = this.state;
    const { dropDownStyle } = this.props;

    return (
      <div
        ref={this.setDropdownRef}
        role="button"
        tabIndex="0"
        id={dropDownId}
        className={`drop-down ${dropDownStyle}`}
      >
        <span className="drop-down__label">
          Language
        </span>
        <span className="drop-down__bar" />
        <ul id="drop-down__list">
          {optionsList}
        </ul>
      </div>
    );
  }
}
Dropdown.defaultProps = {
  dropDownStyle: '',
};

Dropdown.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  })).isRequired,
  dropDownStyle: PropTypes.string,
  selectHandler: PropTypes.func.isRequired,
};
