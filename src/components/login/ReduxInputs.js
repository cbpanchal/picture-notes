import React from "react";
import PropTypes from "prop-types";

import { ErrorText } from "../../style/LoginStyle";

const ReduxInputs = props => {
  const {
    input,
    placeholder,
    type,
    id,
    label,
    meta: { touched, error }
  } = props;
  return (
    <div>
      <label htmlFor={id}>
        {label}
        <input {...input} id={id} placeholder={placeholder} type={type} />
      </label>
      {touched &&
        error && (
          <ErrorText>
            {" "}
            <i className="fa fa-exclamation-circle" /> {error}{" "}
          </ErrorText>
        )}
    </div>
  );
};

ReduxInputs.propTypes = {
  input: PropTypes.instanceOf(Object).isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.instanceOf(Object).isRequired
};

ReduxInputs.defaultProps = {
  placeholder: "",
  id: "",
  label: "",
  type: "text"
};

export default ReduxInputs;
