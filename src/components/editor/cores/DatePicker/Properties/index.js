import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import T from "prop-types";
import { Select, Checkbox, InputNumber, Row, Col } from "antd";
import { format } from "../constants";
import AlignConfig from "components/editor/config/AlignConfig";
import FontSizeConfig from "components/editor/config/FontSizeConfig";
import FieldName from "components/editor/config/EditorTool/FieldName";
import FontStyleConfig from "components/editor/config/FontStyleConfig";
const DateTimeProps = forwardRef((props, ref) => {
  const { apiFields } = props;
  const [state, _setState] = useState({
    dateTimeFormat: "",
    fieldName: "",
    disabled: false,
    onlyDate: false,
    contentAlign: "right",
    readOnly: false,
    blockSignLevel: 0,
    defaultFromHIS: false,
    fontSize: "",
    bold: false,
    italic: false,
    underline: false,
    defaultTimeCurrent: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (props.state.props) {
      setState({
        dateTimeFormat: props.state.props.dateTimeFormat,
        fieldName: props.state.props.fieldName,
        disabled: props.state.props.disabled,
        onlyDate: props.state.props.onlyDate,
        defaultTimeCurrent: props.state.props.defaultTimeCurrent,
        contentAlign: props.state.props.contentAlign || "right",
        readOnly: props.state.props.readOnly || false,
        blockSignLevel: props.state.props.blockSignLevel || 0,
        defaultFromHIS: props.state.props.defaultFromHIS || false,
        fontSize: props.state.props.fontSize || 12,
        bold: props.state.props.bold || false,
        italic: props.state.props.italic || false,
        underline: props.state.props.underline || false,
      });
    }
  }, [props.state]);

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    dateTimeFormat: state.dateTimeFormat,
    disabled: state.disabled,
    onlyDate: state.onlyDate,
    contentAlign: state.contentAlign,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
    defaultFromHIS: state.defaultFromHIS,
    fontSize: state.fontSize,
    bold: state.bold,
    italic: state.italic,
    underline: state.underline,
    defaultTimeCurrent: state.defaultTimeCurrent,
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
  const onChangeFontStyle = (type, value) => {
    setState({
      [type]: value,
    });
  };
  return (
    <>
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
          <span>{"Format: "}</span>
        </Col>
        <Col span={16}>
          <Select
            showSearch
            size={"small"}
            style={{ width: "100%" }}
            value={state.dateTimeFormat}
            onSelect={changeValue("dateTimeFormat")}
          >
            {Object.keys(format).map((key) => (
              <Select.Option key={key} value={key}>
                {format[key].label}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <span>{"Cỡ chữ: "}</span>
        </Col>
        <Col span={16}>
          <FontSizeConfig
            changeFont={changeValue("fontSize")}
            fontSize={state.fontSize}
          />
        </Col>
        {state.dateTimeFormat == "yyyy" && (
          <>
            <Col span={8}>
              <span>{"Kiểu chữ: "}</span>
            </Col>
            <Col span={16}>
              <FontStyleConfig
                bold={state.bold}
                italic={state.italic}
                underline={state.underline}
                onChange={onChangeFontStyle}
              />
            </Col>
          </>
        )}

        <Col span={8}>
          <span>{"Content Align: "}</span>
        </Col>
        <Col span={16}>
          <AlignConfig
            changeAlign={changeValue("contentAlign")}
            contentAlign={state.contentAlign}
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
      )} */}
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Mặc định giờ hiện tại "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={state.defaultTimeCurrent}
            onChange={changeCheckbox("defaultTimeCurrent")}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Chỉ nhập ngày: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={state.onlyDate}
            onChange={changeCheckbox("onlyDate")}
          />
        </Col>
      </Row>
    </>
  );
});

DateTimeProps.propTypes = {
  state: T.shape({}),
};

export default DateTimeProps;
