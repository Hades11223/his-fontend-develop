import React from "react";
import { Main } from "./styled";
const Input = ({ icon, ...props }) => {
  return (
    <Main>
      <div className="input-inner">
        <input
          onChange
          type="text"
          className="form-control"
          {...props}
        />
      </div>
      <img className="img-login-account" src={icon} alt="..." />
    </Main>
  );
};

export default Input;
