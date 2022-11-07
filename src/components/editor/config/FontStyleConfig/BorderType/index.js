import React, { useState, useEffect } from "react";
import { Dropdown, Icon, Row, Col } from "antd";
import { Main, Border, BorderItem, BorderContain } from "./styled";
const borderTypes = ["solid", "dashed", "dotted", "none"];

const OverLay = (handleSetType) => (
  <BorderContain>
    <Row gutter={[6, 6]}>
      {borderTypes.map((key) => (
        <Col span={8} key={key}>
          <BorderItem onClick={handleSetType(key)} type={key}>
            <div></div>
          </BorderItem>
        </Col>
      ))}
    </Row>
  </BorderContain>
);

const BorderType = ({ icon, onChange, type, title }) => {
  const [state, _setState] = useState({
    visible: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    setState({
      type: type || "solid",
    });
  }, [type]);

  const handleSetType = (res) => () => {
    setState({
      type: res,
    });
    if (onChange) onChange(res);
  };

  return (
    <Main title={title}>
      <Dropdown.Button
        className="color-picker"
        placement="bottom"
        overlay={OverLay(handleSetType)}
        size={"small"}
        icon={<Border type={state.type} />}
        trigger={["click"]}
      >
        {icon && <Icon type={icon} style={{ color: state.value }} />}
      </Dropdown.Button>
    </Main>
  );
};

export default BorderType;
