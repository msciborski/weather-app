import React from 'react';
import PropTypes from 'prop-types';

const Row = (props) => {
  const { children } = props;
  return (
  <div className="row">
    {children && children}
  </div>
  );
};

Row.defaultProps = {
  children: undefined,
};

Row.propTypes = {
  children: PropTypes.node,
};

export default Row;
