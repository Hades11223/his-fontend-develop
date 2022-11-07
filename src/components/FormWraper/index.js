import React from "react";
import { Form } from "antd";
import { Main } from "./styled";
const FormWraper = (props) => {
  const { children, disabled, readOnly, ...rest } = props;
  return (
    <Main>
      <fieldset disabled={disabled} style={{pointerEvents: readOnly ? "none" : "unset"}}>
        <Form {...rest}>{children}</Form>
      </fieldset>
    </Main>
  );
};

export default FormWraper;
