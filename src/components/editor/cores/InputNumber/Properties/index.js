import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Select, Checkbox, InputNumber, Row, Col } from "antd";
import { Main } from "../styled";
import { sizeInput } from "mokup";
import FieldName from "components/editor/config/EditorTool/FieldName";

const InputNumberProps = forwardRef((props, ref) => {
  const { apiFields } = props;
  const [state, _setState] = useState({
    fieldName: "",
    size: "",
    disabled: false,
    quantity: "",
    readOnly: false,
    blockSignLevel: 0,
    defaultFromHIS: false,
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
        size: props.state.props.size,
        disabled: props.state.props.disabled,
        quantity: props.state.props.quantity,
        readOnly: props.state.props.readOnly,
        blockSignLevel: props.state.props.blockSignLevel || 0,
        defaultFromHIS: props.state.props.defaultFromHIS || false,
      });
    }
  }, [props.state]);
  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    size: state.size,
    disabled: state.disabled,
    quantity: state.quantity,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
    defaultFromHIS: state.defaultFromHIS,
  }));

  const onChangeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };

  const onChangeCheckbox = (type) => (e) => {
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
          <span>{"Size: "}</span>
        </Col>
        <Col span={16}>
          <Select
            showSearch
            size={"small"}
            style={{ width: "100%" }}
            value={state.size}
            onSelect={onChangeValue("size")}
          >
            {sizeInput.map((item, index) => (
              <Select.Option key={index} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <span>{"Quantity: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            type="number"
            size={"small"}
            min={1}
            value={state.quantity}
            onChange={onChangeValue("quantity")}
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
            onChange={onChangeCheckbox("readOnly")}
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
      {/* {!state.disabled && (
        <Row gutter={[12, 12]} style={{ marginBottom: 50 }}>
          <Col span={8}>
            <span>{"Giá trị ban đầu từ HIS: "}</span>
          </Col>
          <Col span={16}>
            <Checkbox
              onChange={onChangeCheckbox("defaultFromHIS")}
              checked={state.defaultFromHIS}
            />
          </Col>
        </Row>
      )} */}
      <Row gutter={[12, 12]}></Row>
    </Main>
  );
});

export default InputNumberProps;
