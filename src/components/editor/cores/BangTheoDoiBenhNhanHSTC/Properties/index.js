import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Row, Col, Input } from "antd";
import { Main } from "./styled";
import FieldName from "components/editor/config/EditorTool/FieldName";

const BangTheoDoiBenhNhanHSTCProperties = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    fieldName: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { apiFields } = props;

  useEffect(() => {
    if (props.state.key) {
      let newState = {
        fieldName: props.state.props.fieldName,
        textPSIPAP: "PS/IPAP",
        textSoLan: "Số lần",
      };
      setState(newState);
    }
  }, [props.state]);

  useEffect(() => {
    if (props.state.key) {
      let newState = {
        textPSIPAP:
          props.state.props.textPSIPAP == undefined
            ? "PS/IPAP"
            : props.state.props.textPSIPAP,
        textSoLan:
          props.state.props.textSoLan == undefined
            ? "Số lần"
            : props.state.props.textSoLan,
      };
      setState(newState);
    }
  }, [props.state]);

  useImperativeHandle(ref, () => {
    return {};
  });

  useImperativeHandle(ref, () => {
    return {
      fieldName: state.fieldName,
      textSoLan: state.textSoLan,
      textPSIPAP: state.textPSIPAP,
    };
  });

  const onChangeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };
  const onChangeInput = (type) => (e) => {
    onChangeValue(type)(e.target.value);
  };
  return (
    <Main>
      <Row gutter={[12, 12]}>
        <Col span={8}>{"Field name: "}</Col>
        <Col span={16}>
          <FieldName
            style={{ width: "100%" }}
            onSelect={onChangeValue("fieldName")}
            value={state.fieldName}
            apiFields={apiFields}
          />
        </Col>
        <Col span={8}>{"Text PS/IPAP: "}</Col>
        <Col span={16}>
          <Input
            size={"small"}
            value={state.textPSIPAP}
            onChange={onChangeInput("textPSIPAP")}
          />
        </Col>
        <Col span={8}>{"Text Số lần(Phân): "}</Col>
        <Col span={16}>
          <Input
            size={"small"}
            value={state.textSoLan}
            onChange={onChangeInput("textSoLan")}
          />
        </Col>
      </Row>
    </Main>
  );
});

BangTheoDoiBenhNhanHSTCProperties.defaultProps = {
  state: {},
};

BangTheoDoiBenhNhanHSTCProperties.propTypes = {
  state: T.shape({}),
};

export default BangTheoDoiBenhNhanHSTCProperties;
