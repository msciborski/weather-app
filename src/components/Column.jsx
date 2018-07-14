import React from 'react';
import PropTypes from 'prop-types';

const Column = (props) => {
  const { colStyle } = props;
  const { children } = props;

  return (
    <div className={colStyle}>
      {children && children}
    </div>
  );
};

Column.defaultProps = {
  children: undefined,
};
Column.propTypes = {
  children: PropTypes.node,
  colStyle: PropTypes.string.isRequired,
};

export default Column;
