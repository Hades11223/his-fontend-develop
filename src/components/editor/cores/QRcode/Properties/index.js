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
import MarginConfig from "components/editor/config/MarginConfig";

const QrcodeProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    noLabel: false,
    size: 200,
    fromEMR: false,
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
        size: props.state.props.size || 100,
        noLabel: props.state.props.noLabel,
        contentAlign: props.state.props.contentAlign || "center",
        defaultFromHIS: props.state.props.defaultFromHIS || false,
        defaultValue: props.state.props.defaultValue || "",
        marginTop: props.state.props.marginTop,
        marginRight: props.state.props.marginRight,
        marginLeft: props.state.props.marginLeft,
        marginBottom: props.state.props.marginBottom,
      });
    }
  }, [props.state]);

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    label: state.label,
    fromEMR: state.fromEMR,
    size: state.size,
    noLabel: state.noLabel,
    contentAlign: state.contentAlign,
    defaultFromHIS: state.defaultFromHIS,
    defaultValue: state.defaultValue,
    marginTop: state.marginTop,
    marginRight: state.marginRight,
    marginLeft: state.marginLeft,
    marginBottom: state.marginBottom,
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

  const onChangeMargin = (type, value) => {
    let key = null;
    switch (type) {
      case "top":
        key = "marginTop";
        break;
      case "bottom":
        key = "marginBottom";
        break;
      case "left":
        key = "marginLeft";
        break;
      case "right":
        key = "marginRight";
        break;
    }
    setState({
      [key]: value,
    });
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
          <span>{"Khoảng Cách Ngoài: "}</span>
        </Col>

        <Col span={16}>
          <MarginConfig
            onChange={onChangeMargin}
            top={state.marginTop}
            bottom={state.marginBottom}
            right={state.marginRight}
            left={state.marginLeft}
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
          <span>{"Size: "}</span>
        </Col>

        <Col span={16}>
          <Input
            style={{ height: "100%" }}
            size={"small"}
            onChange={changeInput("size")}
            value={state.size}
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

QrcodeProps.propTypes = {
  config: T.shape({}),
};

export default QrcodeProps;
