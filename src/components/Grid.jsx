import React from 'react';
import PropTypes from 'prop-types';

const Grid = (props) => {
  const { children } = props;
  const { styles } = props;

  return (
    <div className={`container ${styles}`}>
      {children}
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
