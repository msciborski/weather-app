
import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

const Header = (props) => {
  const { title } = props;
  const { setLang } = props;
  const { lang } = props;
  return (
    <div className="header">
      <h1 className="header__title">
        { title }
      </h1>
      <Dropdown selectHandler={setLang} elements={lang} />
    </div>
  );
};

Header.defaultProps = {
  title: 'Weather App',
  lang: [
    { name: 'Poland', value: 'pl' },
    { name: 'English', value: 'en' },
  ],
  setLang: undefined,
};

Header.propTypes = {
  title: PropTypes.string,
  lang: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  setLang: PropTypes.func,
};
export default Header;
