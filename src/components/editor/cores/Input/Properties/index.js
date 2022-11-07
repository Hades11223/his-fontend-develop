import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { Select, Input, Radio, Row, Col, Checkbox, InputNumber } from "antd";
import { Main } from "./styled";
import FieldName from "components/editor/config/EditorTool/FieldName";

const InputProps = forwardRef((props, ref) => {
  const { apiFields } = props;
  const [state, _setState] = useState({
    fieldName: "",
    disabled: false,
    width: 0,
    height: 0,
    type: "square",
    readOnly: false,
    blockSignLevel: 0,
    defaultFromHIS: false,
    defaultValue: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        width: props.state.props.width,
        height: props.state.props.height,
        disabled: props.state.props.disabled || false,
        type: props.state.props.type || "square",
        readOnly: props.state.props.readOnly,
        blockSignLevel: props.state.props.blockSignLevel,
        defaultFromHIS: props.state.props.defaultFromHIS || false,
        defaultValue: props.state.props.defaultValue || "",
      });
    }
  }, [props.state]);

  useImperativeHandle(ref, () => {
    return {
      fieldName: state.fieldName,
      height: state.height,
      width: state.width,
      type: state.type,
      disabled: state.disabled,
      blockSignLevel: state.blockSignLevel,
      readOnly: state.readOnly,
      defaultFromHIS: state.defaultFromHIS,
      defaultValue: state.defaultValue,
    };
  });
  const onChangeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };
  const changeInput = (type) => (e) => {
    setState({
      [type]: e.target.value,
    });
  };
  const changeCheckbox = (type) => (e) => {
    onChangeValue(type)(e.target.checked);
  };
  const changeDataFormEMR = (e) => {
    onChangeValue("disabled")(!e.target.checked);
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
          <span>{"Width: "}</span>
        </Col>
        <Col span={16}>
          <Input
            addonAfter={"px"}
            style={{ width: "50%" }}
            size={"small"}
            onChange={changeInput("width")}
            value={state.width}
          />
        </Col>
        <Col span={8}>
          <span>{"Height: "}</span>
        </Col>
        <Col span={16}>
          <Input
            addonAfter={"px"}
            style={{ width: "50%" }}
            size={"small"}
            onChange={changeInput("height")}
            value={state.height}
          />
        </Col>
        <Col span={8}>
          <span>{"Khoá ở cấp ký: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            value={state.blockSignLevel}
            onChange={onChangeValue("blockSignLevel")}
            size={"small"}
          />
        </Col>
        <Col span={8}>
          <span>{"Read Only: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            onChange={changeCheckbox("readOnly")}
            checked={state.readOnly}
          />
        </Col>
        {/* <Col span={8}>
          <span>{"Dữ liệu từ EMR: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox onChange={changeDataFormEMR} checked={!state.disabled} />
        </Col> */}
      </Row>
      {/* chỉ hiển thị khi đánh dấu lấy dữ liệu từ EMR */}
      {!state.disabled && (
        <Row gutter={[12, 12]}>
          <Col span={8}>
            <span>{"Giá trị mặc định: "}</span>
          </Col>
          <Col span={16}>
            <Input.TextArea
              onChange={changeInput("defaultValue")}
              rows={3}
              value={state.defaultValue}
              disabled={state.disabled}
              title={"Có hiệu lực khi lấy dữ liệu từ EMR"}
            />
          </Col>
        </Row>
      )}
      {/* chỉ hiển thị khi đánh dấu lấy dữ liệu từ EMR */}
      {/* {!state.disabled && (
        <Row gutter={[12, 12]}>
          <Col span={8}>
            <span>{"Giá trị ban đầu từ HIS: "}</span>
          </Col>
          <Col span={16}>
            <Checkbox
              onChange={changeCheckbox("defaultFromHIS")}
              checked={state.defaultFromHIS}
            />
          </Col>
        </Row>
      )} */}
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Shape: "}</span>
        </Col>
        <Col span={16}>
          <Radio.Group
            size={"small"}
            onChange={changeInput("type")}
            value={state.type}
          >
            <Row gutter={12}>
              <Col span={12}>
                <Radio value={"square"}>{"Square"}</Radio>
              </Col>
              <Col span={12}>
                <Radio value={"circle"}>{"Circle"}</Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Col>
      </Row>
    </Main>
  );
});

export default InputProps;
