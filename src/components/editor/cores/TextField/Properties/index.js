import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Checkbox, Radio, InputNumber, Input, Row, Col } from "antd";
import { Main } from "./styled";
import AlignConfig from "components/editor/config/AlignConfig";
import FontSizeConfig from "components/editor/config/FontSizeConfig";
import PickColor from "components/editor/config/EditorTool/PickColor";
import FieldName from "components/editor/config/EditorTool/FieldName";
import { FontColorsOutlined } from "@ant-design/icons";

const ComponentProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    fieldName: "",
    noLabel: false,
    disabled: false,
    size: "",
    border: false,
    line: "",
    contentAlign: "left",
    readOnly: false,
    blockSignLevel: 0,
    defaultValue: "",
    defaultFromHIS: false,
    markSpanRow: true,
    lineHeight: "",
    fontSize: "",
    contentColor: "black",
    inputNumber: false,
    maxValue: "",
    minValue: "",
    typeNumber: "int",
    fontWeight: false,
    isDataArray: false,
    toUpperCaseText: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { apiFields } = props;

  useImperativeHandle(ref, () => ({
    size: state.size,
    fieldName: state.fieldName,
    noLabel: state.noLabel,
    disabled: state.disabled,
    border: state.border,
    line: state.line,
    labelWidth: state.labelWidth,
    contentAlign: state.contentAlign,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
    defaultValue: state.defaultValue,
    defaultFromHIS: state.defaultFromHIS,
    markSpanRow: state.markSpanRow,
    lineHeight: state.lineHeight,
    fontSize: state.fontSize,
    contentColor: state.contentColor,
    inputNumber: state.inputNumber,
    maxValue: state.maxValue,
    minValue: state.minValue,
    typeNumber: state.typeNumber,
    fontWeight: state.fontWeight,
    isDataArray: state.isDataArray || false,
    toUpperCaseText: state.toUpperCaseText || false,
  }));

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        size: props.state.props.size,
        noLabel: props.state.props.noLabel,
        disabled: props.state.props.disabled,
        border: props.state.props.border,
        line: props.state.props.line,
        labelWidth: props.state.props.labelWidth,
        contentAlign: props.state.props.contentAlign || "left",
        readOnly: props.state.props.readOnly || false,
        blockSignLevel: props.state.props.blockSignLevel || 0,
        defaultValue: props.state.props.defaultValue || "",
        defaultFromHIS: props.state.props.defaultFromHIS || false,
        markSpanRow:
          props.state.props.markSpanRow === undefined
            ? true
            : props.state.props.markSpanRow,
        lineHeight: props.state.props.lineHeight,
        fontSize: props.state.props.fontSize || 12,
        contentColor: props.state.props.contentColor,
        inputNumber: props.state.props.inputNumber,
        maxValue: props.state.props.maxValue,
        minValue: props.state.props.minValue,
        typeNumber: props.state.props.typeNumber || "int",
        fontWeight: props.state.props.fontWeight || false,
        isDataArray: props.state.props.isDataArray || false,
        toUpperCaseText: props.state.props.toUpperCaseText || false,
      });
    }
  }, [props.state]);

  const onChangeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };
  const onChangeInput = (type) => (e) => {
    setState({
      [type]: e.target.value,
    });
  };

  const onChangeCheckbox = (type) => (e) => {
    onChangeValue(type)(e.target.checked);
  };
  const onChangeDataFormEMR = (e) => {
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
          <span>{"Không hiển thị nhãn: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={state.noLabel}
            onChange={onChangeCheckbox("noLabel")}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Độ rộng nhãn: "}</span>
        </Col>
        <Col span={16}>
          <Input
            className="option-content"
            style={{ flex: 1 }}
            value={state.labelWidth}
            onChange={onChangeInput("labelWidth")}
            size={"small"}
          />
        </Col>
        <Col span={8}>
          <span>{"Cỡ chữ: "}</span>
        </Col>
        <Col span={16}>
          <FontSizeConfig
            changeFont={onChangeValue("fontSize")}
            fontSize={state.fontSize}
          />
        </Col>
        <Col span={8}>
          <span>{"Content Align: "}</span>
        </Col>
        <Col span={16}>
          <AlignConfig
            changeAlign={onChangeValue("contentAlign")}
            contentAlign={state.contentAlign}
          />
        </Col>
        <Col span={8}>
          <span>{"Bôi đậm chữ: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            onChange={onChangeCheckbox("fontWeight")}
            checked={state.fontWeight}
          />
        </Col>
        <Col span={8}>
          <span>{"Viết hoa: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            onChange={onChangeCheckbox("toUpperCaseText")}
            checked={state.toUpperCaseText}
          />
        </Col>
        <Col span={8}>
          <span>{"Content Color: "}</span>
        </Col>
        <Col span={16}>
          <PickColor
            iconComponent={FontColorsOutlined}
            title="Chọn màu chữ"
            dataColor={state.contentColor || "black"}
            changeColor={onChangeValue("contentColor")}
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
          <Checkbox onChange={onChangeDataFormEMR} checked={!state.disabled} />
        </Col> */}
      </Row>
      {/* chỉ hiển thị khi đánh dấu lấy dữ liệu từ EMR */}
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Giá trị mặc định: "}</span>
        </Col>
        <Col span={16}>
          <Input.TextArea
            onChange={onChangeInput("defaultValue")}
            rows={3}
            value={state.defaultValue}
            disabled={state.disabled}
            title={"Có hiệu lực khi lấy dữ liệu từ EMR"}
          />
        </Col>
      </Row>
      {/* chỉ hiển thị khi đánh dấu lấy dữ liệu từ EMR */}
      {/* {!state.disabled && (
        <Row gutter={[12, 12]}>
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
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Hiển thị đánh dấu dòng: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            onChange={onChangeCheckbox("markSpanRow")}
            checked={state.markSpanRow}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Hiển thị viền: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            onChange={onChangeCheckbox("border")}
            checked={state.border}
          />
        </Col>
        <Col span={8}>
          <span>{"Dữ liệu mảng: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            onChange={onChangeCheckbox("isDataArray")}
            checked={state.isDataArray}
          />
        </Col>
        <Col span={8}>
          <span>{"Nhập số: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            onChange={onChangeCheckbox("inputNumber")}
            checked={state.inputNumber}
          />
        </Col>
        {state.inputNumber && (
          <>
            <Col span={24}>
              <Radio.Group
                onChange={onChangeInput("typeNumber")}
                value={state.typeNumber}
              >
                <Radio value={"int"}>Nhập số nguyên</Radio>
                <Radio value={"float"}>Nhập số thập phân</Radio>
              </Radio.Group>
            </Col>

            <Col span={8}>
              <span>{"Giá trị tối đa: "}</span>
            </Col>
            <Col span={16}>
              <InputNumber
                value={state.maxValue}
                onChange={onChangeValue("maxValue")}
                size={"small"}
              />
            </Col>
            <Col span={8}>
              <span>{"Giá trị tối thiểu: "}</span>
            </Col>
            <Col span={16}>
              <InputNumber
                value={state.minValue}
                onChange={onChangeValue("minValue")}
                size={"small"}
              />
            </Col>
          </>
        )}
        <Col span={8}>
          <span>{"Độ cao dòng văn bản: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            value={state.lineHeight}
            onChange={onChangeValue("lineHeight")}
            placeholder={1.5}
            min={1}
            step={0.1}
            size={"small"}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Số dòng: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            value={state.line}
            onChange={onChangeValue("line")}
            size={"small"}
          />
        </Col>
        <Col span={8}>
          <span>{"Số ký tự: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            size={"small"}
            value={state.size}
            onChange={onChangeValue("size")}
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
