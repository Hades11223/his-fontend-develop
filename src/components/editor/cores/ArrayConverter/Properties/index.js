import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Checkbox, InputNumber, Select, Input, Col, Row } from "antd";
import { Main } from "./styled";
import FieldName from "components/editor/config/EditorTool/FieldName";

const ComponentProps = forwardRef((props, ref) => {
  const { apiFields } = props;
  const [state, _setState] = useState({
    fieldName: "",
    noLabel: false,
    disabled: false,
    size: "",
    border: false,
    line: "",
    rule: "",
    readOnly: false,
    blockSignLevel: 0,
    defaultFromHIS: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    noLabel: state.noLabel,
    disabled: state.disabled,
    size: state.size,
    border: state.border,
    line: state.line,
    rule: state.rule,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
    defaultFromHIS: state.defaultFromHIS,
  }));

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        noLabel: props.state.props.noLabel,
        disabled: props.state.props.disabled,
        size: props.state.props.size,
        border: props.state.props.border,
        line: props.state.props.line,
        rule: props.state.props.rule,
        readOnly: props.state.props.readOnly,
        blockSignLevel: props.state.props.blockSignLevel,
        defaultFromHIS: props.state.props.defaultFromHIS,
      });
    }
  }, [props.state]);
  const changeValue = (type) => (value) => {
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
          <span>{"Không hiển thị nhãn: "}</span>
        </Col>

        <Col span={16}>
          <Checkbox
            checked={state.noLabel}
            onChange={changeCheckbox("noLabel")}
          />
        </Col>
      </Row>
      {/* <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Dữ liệu từ EMR: "}</span>
        </Col>

        <Col span={16}>
          <Checkbox onChange={changeDataFormEMR} checked={!state.disabled} />
        </Col>
      </Row> */}
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
          <span>{"Số dòng: "}</span>
        </Col>

        <Col span={16}>
          <InputNumber
            size={"small"}
            value={state.line}
            onChange={changeValue("line")}
          />
        </Col>
        <Col span={8}>
          <span>{"Size: "}</span>
        </Col>

        <Col span={16}>
          <InputNumber
            size={"small"}
            value={state.size}
            onChange={changeValue("size")}
          />
        </Col>
        <Col span={8}>
          <span>{"Rule: "}</span>
        </Col>

        <Col span={16}>
          <Input
            size={"small"}
            style={{ width: 100 }}
            placeholder="Nhập ký tự phân cách"
            value={state.rule}
            onChange={changeInput("rule")}
          />
        </Col>
      </Row>
    </Main>
  );
});

ComponentProps.defaultProps = {
  component: {},
  apiFields: [],
};

ComponentProps.propTypes = {
  component: T.shape({}),
  apiFields: T.arrayOf(T.string),
};

export default ComponentProps;
