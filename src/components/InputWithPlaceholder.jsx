import React from 'react';
import PropTypes from 'prop-types';

const InputWithPlaceholder = (props) => {
  const { placeHolder } = props;
  const { inputStyle } = props;
  const { onChangeHandler } = props;

  return (
    <div className={inputStyle}>
      {
        !onChangeHandler ? <input type="text" name="city" required />
          : <input type="text" name="city" required onChange={onChangeHandler} />
      }
      <label htmlFor="city">
        {placeHolder}
      </label>
    </div>
  );
};

InputWithPlaceholder.defaultProps = {
  onChangeHandler: undefined,
};
InputWithPlaceholder.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  inputStyle: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func,
};

export default InputWithPlaceholder;
