import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Row, Col, Input } from "antd";
import { Main } from "./styled";
import { Select } from "components";
import FieldName from "components/editor/config/EditorTool/FieldName";

const BangKeChiPhiProperties = forwardRef((props, ref) => {
  const { apiFields } = props;
  const [state, _setState] = useState({
    fieldName: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (props.state.key) {
      let newState = {
        fieldName: props.state.props.fieldName,
      };
      setState(newState);
    }
  }, [props.state]);

  useImperativeHandle(ref, () => {
    return {
      fieldName: state.fieldName,
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
      </Row>
    </Main>
  );
});

BangKeChiPhiProperties.defaultProps = {
  state: {},
};

BangKeChiPhiProperties.propTypes = {
  state: T.shape({}),
};

export default BangKeChiPhiProperties;
