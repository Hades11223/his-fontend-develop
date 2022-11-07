import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
} from "react";
import T from "prop-types";
import { Select, Input, Checkbox, Row, Col } from "antd";
import { Main } from "../styled";
import AlignConfig from "components/editor/config/AlignConfig";
import FieldName from "components/editor/config/EditorTool/FieldName";

const BarcodeProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    noLabel: false,
    width: 200,
    fromEMR: false,
    height: 90,
    contentAlign: "center",
    defaultFromHIS: false,
    defaultValue: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { apiFields } = props;

  useEffect(() => {
    if (props.state.props) {
      setState({
        fieldName: props.state.props.fieldName,
        label: props.state.props.label,
        fromEMR: props.state.props.fromEMR,
        width: props.state.props.width || 200,
        height: props.state.props.height || 90,
        noLabel: props.state.props.noLabel,
        contentAlign: props.state.props.contentAlign || "center",
        defaultFromHIS: props.state.props.defaultFromHIS || false,
        defaultValue: props.state.props.defaultValue || "",
      });
    }
  }, [props.state]);

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    label: state.label,
    fromEMR: state.fromEMR,
    height: state.height,
    width: state.width,
    noLabel: state.noLabel,
    contentAlign: state.contentAlign,
    defaultFromHIS: state.defaultFromHIS,
    defaultValue: state.defaultValue,
  }));

  const changeInput = (key) => (e) => {
    setState({
      [key]: e.target.value,
    });
  };

  const changeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };

  const changeAlign = (value) => {
    setState({
      contentAlign: value,
    });
  };

  const changeCheckbox = (type) => (e) => {
    changeValue(type)(e.target.checked);
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
          <span>{"Content Align: "}</span>
        </Col>

        <Col span={16}>
          <AlignConfig
            changeAlign={changeAlign}
            contentAlign={state.contentAlign}
          />
        </Col>
        <Col span={8}>
          <span>{"Label: "}</span>
        </Col>

        <Col span={16}>
          <Input
            style={{ width: "100%" }}
            size={"small"}
            onChange={changeInput("label")}
            value={state.label}
          />
        </Col>
        <Col span={8}>
          <span>{"Width: "}</span>
        </Col>

        <Col span={16}>
          <Input
            style={{ height: "100%" }}
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
            style={{ height: "100%" }}
            size={"small"}
            onChange={changeInput("height")}
            value={state.height}
          />
        </Col>
        <Col span={8}>
          <span>{"Không hiển thị nhãn: "}</span>
        </Col>

        <Col span={16}>
          <Checkbox
            onChange={changeCheckbox("noLabel")}
            checked={state.noLabel}
          />
        </Col>
      </Row>
      {/* <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Dữ liệu từ EMR: "}</span>
        </Col>

        <Col span={16}>
          <Checkbox
            onChange={changeCheckbox("fromEMR")}
            checked={state.fromEMR}
          />
        </Col>
      </Row> */}
      {state.fromEMR && (
        <Row gutter={[12, 12]}>
          <Col span={8}>
            <span>{"Giá trị mặc định: "}</span>
          </Col>
          <Col span={16}>
            <Input
              onChange={changeInput("defaultValue")}
              rows={3}
              value={state.defaultValue}
              disabled={!state.fromEMR}
              title={"Có hiệu lực khi lấy dữ liệu từ EMR"}
            />
          </Col>
        </Row>
      )}
      {/* chỉ hiển thị khi đánh dấu lấy dữ liệu từ EMR */}
      {/* {state.fromEMR && (
        <Row gutter={[12, 12]} style={{ marginBottom: 50 }}>
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
    </Main>
  );
});

BarcodeProps.propTypes = {
  config: T.shape({}),
};

export default BarcodeProps;
