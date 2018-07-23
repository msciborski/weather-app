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

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseClickedOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseClickedOutside);
  }

  setDropdownRef = (node) => {
    this.node = node;
  }

  setSelectedItem = (element) => {
    const selectedBeforeElement = this.getSelectedElement();
    if (selectedBeforeElement) {
      this.removeSelectionFromItem(selectedBeforeElement);
    }
    element.setAttribute('selected', '');
  }

  getElementList = () => {
    if (this.node) {
      return _.filter(this.node.childNodes, node => node.id === 'drop-down__list')[0];
    }
    return undefined;
  }

  getSelectedElement = () => {
    const elementList = this.getElementList();
    if (elementList) {
      const elements = elementList.childNodes;
      if (elements.length > 0) {
        const selectedElement = _.filter(elements, element => element.hasAttribute('selected'));
        return selectedElement[0];
      }
    }
    return undefined;
  }

  handleMouseClickedOutside = (e) => {
    if (this.node && !this.node.contains(e.target)) {
      const elementList = this.getElementList();
      elementList.classList.remove('opened');
    }
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

  handleDropdownClick = () => {
    const elementList = this.getElementList();
    elementList.classList.toggle('opened');
  }

  render() {
    const { dropDownId } = this.state;
    const { optionsList } = this.state;
    const { dropDownStyle } = this.props;
    const { title } = this.props;

    return (
      <div
        ref={this.setDropdownRef}
        role="button"
        onClick={this.handleDropdownClick}
        tabIndex="0"
        id={dropDownId}
        className={`drop-down ${dropDownStyle}`}
      >
        <span className="drop-down__label">
          {title}
        </span>
        <ul id="drop-down__list">
          {optionsList}
        </ul>
      </div>
    );
  }
}
Dropdown.defaultProps = {
  dropDownStyle: '',
  title: 'Language',
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
  title: PropTypes.string,
};
