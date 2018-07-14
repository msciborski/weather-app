import React from 'react';
import PropTypes from 'prop-types';

const Grid = (props) => {
  const { children } = props;
  return (
    <div className="container">
    { children }
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};
