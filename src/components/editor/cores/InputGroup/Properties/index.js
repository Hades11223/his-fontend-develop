import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Checkbox, Input, Row, Col } from "antd";
import { Main } from "./styled";
import FieldName from "components/editor/config/EditorTool/FieldName";

const ComponentProps = forwardRef((props, ref) => {
  const { apiFields } = props;
  const [state, _setState] = useState({
    fieldName: "",
    height: "",
    width: "",
    disabled: false,
    rule: "false",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    height: state.height,
    width: state.width,
    fieldName: state.fieldName,
    disabled: state.disabled,
    rule: state.rule,
  }));

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        width: props.state.props.width,
        height: props.state.props.height,
        disabled: props.state.props.disabled,
        rule: props.state.props.rule,
      });
    }
  }, [props.state]);
  const onChangeCheckbox = (type) => (e) => {
    onChangeValue(type)(e.target.checked);
  };
  const onChangeValue = (target) => (e) => {
    setState({
      [target]: e,
    });
  };
  const onChangeInput = (target) => (e) => {
    onChangeValue(target)(e.target.value);
  };

  return (
    <Main>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Field name: "}</span>
        </Col>
        <Col span={16}>
          <FieldName
            style={{ width: "100%" }}
            onSelect={onChangeValue("fieldName")}
            value={state.fieldName}
            apiFields={apiFields || []}
          />
        </Col>
        <Col span={8}>
          <span>{"Width (px): "}</span>
        </Col>
        <Col span={16}>
          <Input
            size={"small"}
            value={state.width}
            onChange={onChangeInput("width")}
          />
        </Col>
        <Col span={8}>
          <span>{"Height (px): "}</span>
        </Col>
        <Col span={16}>
          <Input
            size={"small"}
            value={state.height}
            onChange={onChangeInput("height")}
          />
        </Col>
        <Col span={8}>
          <span>{"Disabled: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={state.disabled}
            onChange={onChangeCheckbox("disabled")}
          />
        </Col>
        <Col span={8}>
          <span>{"Rules: "}</span>
        </Col>
        <Col span={16}>
          <Input
            size={"small"}
            value={state.rule}
            onChange={onChangeInput("rule")}
          />
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
