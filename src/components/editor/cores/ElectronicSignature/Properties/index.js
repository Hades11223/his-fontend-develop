import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";
import T from "prop-types";
import { Checkbox, InputNumber, message, Input, Row, Col } from "antd";
import { Main } from "./styled";
import FieldName from "components/editor/config/EditorTool/FieldName";

const ComponentProps = forwardRef((props, ref) => {
  const { apiFields = [] } = props;
  const [state, _setState] = useState({
    newFields: [],
    fieldName: "",
    levelSign: "",
    width: 200,
    height: 200,
    isPatient: false,
    allowReset: true,
    // currentLevelRef: "soCapKy",
    disableIfSigned: true,
    disabled: false,
    signer: "",
    autoSave: true,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const newFields = useMemo(() => {
    if (apiFields) {
      let newFields = [];
      apiFields.forEach((item) => {
        if (apiFields.find((item2) => item + "_ngayKy" == item2)) {
          newFields.push(item);
        }
      });
      return newFields;
    }
    return [];
  }, [apiFields]);

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    levelSign: state.levelSign,
    // currentLevelRef: state.currentLevelRef,
    width: state.width,
    height: state.height,
    isPatient: state.isPatient,
    allowReset: state.allowReset,
    disableIfSigned: state.disableIfSigned,
    displayAsUserName: state.displayAsUserName,
    disabled: state.disabled,
    signer: state.signer,
    autoSave: state.autoSave,
  }));

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        levelSign: props.state.props.levelSign,
        width: props.state.props.width,
        height: props.state.props.height,
        isPatient: props.state.props.isPatient,
        allowReset: props.state.props.allowReset,
        disableIfSigned: props.state.props.disableIfSigned,
        displayAsUserName: props.state.props.displayAsUserName,
        disabled: props.state.props.disabled,
        // currentLevelRef: props.state.props.currentLevelRef || "soCapKy",
        signer: props.state.props.signer,
        autoSave:
          props.state.props.autoSave == undefined
            ? true
            : props.state.props.autoSave,
      });
    }
  }, [props.state]);

  const changeValue = (target) => (e) => {
    if (target == "fieldName") {
      let ngayKy = e + "_ngayKy";

      if (!apiFields.find((item) => item == ngayKy)) {
        message.error("Vui lòng chọn đúng trường ký");
        return;
      }
    }
    setState({
      [target]: e,
    });
  };

  const changeInput = (target) => (e) => {
    setState({
      [target]: e.target.value,
    });
  };
  const changeCheckbox = (target) => (e) => {
    setState({
      [target]: e.target.checked,
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
            apiFields={newFields}
          />
        </Col>
        <Col span={8}>
          <span>{"Cấp ký: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            size={"small"}
            value={state.levelSign}
            onChange={changeValue("levelSign")}
          />
        </Col>
        <Col span={8}>
          <span>{"Người ký: "}</span>
        </Col>
        <Col span={16}>
          <Input
            style={{ width: "100%" }}
            size={"small"}
            value={state.signer}
            onChange={changeInput("signer")}
          />
        </Col>

        <Col span={8}>
          <span>{"Người bệnh/ Người nhà Người bệnh: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={state.isPatient}
            onChange={changeCheckbox("isPatient")}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Khóa biểu mẫu sau khi ký: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={state.disableIfSigned}
            onChange={changeCheckbox("disableIfSigned")}
          />
        </Col>
      </Row>
      {!state.isPatient && (
        <Row gutter={[12, 12]}>
          <Col span={8}>
            <span>{"Hiển thị chữ ký là tên tài khoản: "}</span>
          </Col>
          <Col span={16}>
            <Checkbox
              checked={state.displayAsUserName}
              onChange={changeCheckbox("displayAsUserName")}
            />
          </Col>
        </Row>
      )}
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Cho phép huỷ khi đã ký: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={state.allowReset}
            onChange={changeCheckbox("allowReset")}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Tự động lưu sau khi ký: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={state.autoSave}
            onChange={changeCheckbox("autoSave")}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Disabled: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={state.disabled}
            onChange={changeCheckbox("disabled")}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        {(!state.displayAsUserName || state.isPatient) && (
          <>
            <Col span={8}>
              <span>{"Width: "}</span>
            </Col>
            <Col span={16}>
              <InputNumber
                size={"small"}
                value={state.width}
                onChange={changeValue("width")}
              />
            </Col>
            <Col span={8}>
              <span>{"Height: "}</span>
            </Col>
            <Col span={16}>
              <InputNumber
                size={"small"}
                value={state.height}
                onChange={changeValue("height")}
              />
            </Col>
          </>
        )}
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
