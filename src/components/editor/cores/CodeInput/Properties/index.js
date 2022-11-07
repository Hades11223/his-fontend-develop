import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Checkbox, InputNumber, Select, Col, Row } from "antd";
import { Main } from "./styled";
import FieldName from "components/editor/config/EditorTool/FieldName";

const ComponentProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    fieldName: "",
    disabled: false,
    border: false,
    size: "",
    readOnly: false,
    blockSignLevel: 0,
    defaultFromHIS: false,
    type: "Strings",
    letterCase: "upper",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { apiFields } = props;

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        disabled: props.state.props.disabled,
        letterCase: props.state.props.letterCase || "upper",
        type: props.state.props.type || "Strings",
        border: props.state.props.border,
        size: props.state.props.size,
        readOnly: props.state.props.readOnly,
        blockSignLevel: props.state.props.blockSignLevel,
        defaultFromHIS: props.state.props.defaultFromHIS || false,
      });
    }
  }, [props.state]);
  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    disabled: state.disabled,
    letterCase: state.letterCase,
    type: state.type,
    border: state.border,
    size: state.size,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
    defaultFromHIS: state.defaultFromHIS,
  }));
  const changeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };

  const changeCheckbox = (type) => (e) => {
    changeValue(type)(e.target.checked);
  };

  const changeDataFormEMR = (e) => {
    changeValue("disabled")(!e.target.checked);
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
            onSelect={changeValue("fieldName")}
            value={state.fieldName}
            apiFields={apiFields}
          />
        </Col>
        <Col span={8}>
          <span>{"Khoá ở cấp ký: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            value={state.blockSignLevel}
            onChange={changeValue("blockSignLevel")}
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
      )}*/}
      <Row gutter={[12, 12]}>
        {props.state.type === "layout" && (
          <>
            <Col span={8}>
              <span>{"Hiển thị viền: "}</span>
            </Col>
            <Col span={16}>
              <Checkbox
                checked={state.border}
                onChange={changeCheckbox("border")}
              />
            </Col>
          </>
        )}
        <Col span={8}>
          <span>{"Kiểu dữ liệu: "}</span>
        </Col>
        <Col span={16}>
          <Select
            style={{ width: "100%" }}
            size={"small"}
            onSelect={changeValue("type")}
            value={state.type}
          >
            <Select.Option value={"Strings"}>
              <span title={"String"}>{"Chuỗi ký tự "}</span>
            </Select.Option>
            <Select.Option value={"Number"}>
              <span title={"Number"}>{"Số"}</span>
            </Select.Option>
          </Select>
        </Col>
        <Col span={8}>
          <span>{"Kiểu chữ: "}</span>
        </Col>
        <Col span={16}>
          <Select
            style={{ width: "100%" }}
            size={"small"}
            onSelect={changeValue("letterCase")}
            value={state.letterCase}
          >
            <Select.Option value={"upper"}>
              <span title={"Viết hoa"}>{"Viết hoa"}</span>
            </Select.Option>
            <Select.Option value={"lowerCase"}>
              <span title={"Viết thường"}>{"Viết thường"}</span>
            </Select.Option>
          </Select>
        </Col>
        <Col span={8}>
          <span>{"Size: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            size={"small"}
            onChange={changeValue("size")}
            value={state.size}
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
