
import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

const Header = (props) => {
  const { title } = props;
  const { setLang } = props;
  const { lang } = props;
  const { units } = props;
  const { setUnit } = props;
  return (
    <div className="header">
      <h1 className="header__title">
        { title }
      </h1>
      <Dropdown selectHandler={setLang} elements={lang} title="Language" />
      <Dropdown selectHandler={setUnit} elements={units} title="Units" />
    </div>
  );
};

Header.defaultProps = {
  title: 'Weather App',
  setLang: undefined,
  setUnit: undefined,
};

Header.propTypes = {
  title: PropTypes.string,
  lang: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  units: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  setLang: PropTypes.func,
  setUnit: PropTypes.func,
};
export default Header;
