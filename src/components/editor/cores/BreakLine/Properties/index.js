import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Row, Col, Input, Button } from "antd";
import { Main } from "./styled";
import PickColor from "components/editor/config/EditorTool/PickColor";
import {
  MinusOutlined,
  DashOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";

const ComponentProps = forwardRef((props, ref) => {
  const { updateComponents } = props;
  const [state, _setState] = useState({
    color: "#000",
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    weight: 1,
    type: "line",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    color: state.color,
    marginTop: state.marginTop,
    marginBottom: state.marginBottom,
    marginRight: state.marginRight,
    marginLeft: state.marginLeft,
    weight: state.weight,
    type: state.type,
  }));

  useEffect(() => {
    if (props.state.key) {
      setState({
        color: props.state.props.color,
        marginTop: props.state.props.marginTop || 0,
        marginBottom: props.state.props.marginBottom || 0,
        marginRight: props.state.props.marginRight || 0,
        marginLeft: props.state.props.marginLeft || 0,
        weight: props.state.props.weight || 0,
        type: props.state.props.type || "line",
      });
    }
  }, [props.state]);

  const changeInput = (target) => (e) => {
    setState({
      [target]: e.target.value,
    });
    updateComponents({
      ...props.state,
      props: {
        ...props.state.props,
        ...state,
        [target]: e.target.value,
      },
    });
  };
  const handleChangeColor = (color) => {
    setState({
      color: color,
    });
    updateComponents({
      ...props.state,
      props: {
        ...props.state.props,
        ...state,
        color,
      },
    });
  };
  const changeType = (type) => () => {
    setState({
      type,
    });
    updateComponents({
      ...props.state,
      props: {
        ...props.state.props,
        ...state,
        type,
      },
    });
  };

  return (
    <Main>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Màu: "}</span>
        </Col>

        <Col span={16}>
          <PickColor
            iconComponent={MinusOutlined}
            dataColor={state.color}
            changeColor={handleChangeColor}
          />
        </Col>
        <Col span={8}>
          <span>{"Margin Top: "}</span>
        </Col>

        <Col span={16} style={{ display: "flex" }}>
          <Input
            value={state.marginTop}
            onChange={changeInput("marginTop")}
            style={{ width: "50px", marginRight: "5px" }}
          />
          px
        </Col>
        <Col span={8}>
          <span>{"Margin Bottom: "}</span>
        </Col>

        <Col span={16} style={{ display: "flex" }}>
          <Input
            value={state.marginBottom}
            onChange={changeInput("marginBottom")}
            style={{ width: "50px", marginRight: "5px" }}
          />
          px
        </Col>
        <Col span={8}>
          <span>{"Margin Left: "}</span>
        </Col>

        <Col span={16} style={{ display: "flex" }}>
          <Input
            value={state.marginLeft}
            onChange={changeInput("marginLeft")}
            style={{ width: "50px", marginRight: "5px" }}
          />
          px
        </Col>
        <Col span={8}>
          <span>{"Margin Right: "}</span>
        </Col>

        <Col span={16} style={{ display: "flex" }}>
          <Input
            value={state.marginRight}
            onChange={changeInput("marginRight")}
            style={{ width: "50px", marginRight: "5px" }}
          />
          px
        </Col>
        <Col span={8}>
          <span>{"Độ đậm: "}</span>
        </Col>

        <Col span={16} style={{ display: "flex" }}>
          <Input
            value={state.weight}
            onChange={changeInput("weight")}
            style={{ width: "50px", marginRight: "5px" }}
          />
          px
        </Col>
        <Col span={8}>
          <span>{"Loại nét: "}</span>
        </Col>

        <Col span={16} style={{ display: "flex" }}>
          <Button.Group size={"small"} style={{ width: 100 }}>
            <Button
              type={state.type === "solid" ? "primary" : ""}
              icon={<MinusOutlined />}
              onClick={changeType("solid")}
              value={"left"}
            />
            <Button
              type={state.type === "dashed" ? "primary" : ""}
              icon={<DashOutlined />}
              onClick={changeType("dashed")}
              value={"center"}
            />
            <Button
              type={state.type === "dotted" ? "primary" : ""}
              icon={<SmallDashOutlined />}
              onClick={changeType("dotted")}
              value={"right"}
            />
          </Button.Group>
        </Col>
      </Row>
    </Main>
  );
});

ComponentProps.defaultProps = {
  component: {},
};

ComponentProps.propTypes = {
  component: T.shape({}),
};

export default ComponentProps;
