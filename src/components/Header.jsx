
import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  const { title } = props;

  return (
    <div className="header">
      <h1 className="header__title">
        { title }
      </h1>
    </div>
  );
};

Header.defaultProps = {
  title: 'Weather App',
};
Header.propTypes = {
  title: PropTypes.string,
};
export default Header;
