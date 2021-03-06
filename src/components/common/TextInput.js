import React, {PropTypes} from 'react';

const TextInput = ({name, label, onChange, placeholder, value, error}) => {

  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input type="text"
               name={name}
               className="form-control"
               onChange={onChange}
               value={value}
               placeholder={placeholder}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );

}

TextInput.proptypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
