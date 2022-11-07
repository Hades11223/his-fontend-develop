import React, { useState, useEffect } from "react";
import { Dropdown, Icon, Row, Col } from "antd";
import { Main, Size, SizeItem, SizeContain } from "./styled";
const borderTypes = ["0", "0.5", "1", "2", "3", "4", "5"];

const OverLay = (handleSetSize) => (
  <SizeContain>
    <Row gutter={[6, 6]}>
      {borderTypes.map((key) => (
        <Col span={8} key={key}>
          <SizeItem onClick={handleSetSize(key)} size={key}>
            <div></div>
          </SizeItem>
        </Col>
      ))}
    </Row>
  </SizeContain>
);

const BorderSize = ({ icon, onChange, size, title }) => {
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
      size: size || "0",
    });
  }, [size]);

  const handleSetSize = (res) => () => {
    setState({
      size: res,
    });
    if (onChange) onChange(res);
  };

  return (
    <Main title={title}>
      <Dropdown.Button
        className="color-picker"
        placement="bottom"
        overlay={OverLay(handleSetSize)}
        size={"small"}
        icon={<Size size={state.size} />}
        trigger={["click"]}
      >
        {icon && <Icon type={icon} style={{ color: state.value }} />}
      </Dropdown.Button>
    </Main>
  );
};

export default BorderSize;
