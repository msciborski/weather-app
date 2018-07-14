import React from 'react';
import PropTypes from 'prop-types';

const Row = (props) => {
  const { children } = props;
  const { rowStyle } = props;
  return (
  <div className={`pure-g ${rowStyle}`}>
    {children && children}
  </div>
  );
};

Row.defaultProps = {
  children: undefined,
  rowStyle: '',
};

Row.propTypes = {
  children: PropTypes.node,
  rowStyle: PropTypes.string,
};

export default Row;
