import React from 'react';
import PropTypes from 'prop-types';

const Grid = (props) => {
  const { children } = props;
  const { styles } = props;

  return (
    <div className={`container ${styles}`}>
    <div className="left-panel" />
      {children}
    <div className="right-panel" />
    </div>
  );
};

Grid.defaultProps = {
  styles: '',
};
Grid.propTypes = {
  children: PropTypes.node.isRequired,
  styles: PropTypes.string,
};
export default Grid;
