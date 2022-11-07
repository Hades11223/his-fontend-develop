import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Row, Col, Select, Checkbox, Input } from "antd";
import { Main } from "./styled";

const BangTheoDoiHoiTinhProperties = forwardRef((props, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { apiFields } = props;

  useEffect(() => {
    if (props.state.key) {
      let newState = {};
      setState(newState);
    }
  }, [props.state]);

  useImperativeHandle(ref, () => {
    return {};
  });

  const onChangeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };
  const onChangeInput = (type) => (e) => {
    onChangeValue(type)(e.target.value);
  };

  const onChangeCheckBox = (type) => (e) => {
    onChangeValue(type)(e.target.checked);
  };
  return (
    <Main>
      <Row gutter={[12, 12]}>
        
      </Row>
    </Main>
  );
});

BangTheoDoiHoiTinhProperties.defaultProps = {
  state: {},
};

BangTheoDoiHoiTinhProperties.propTypes = {
  state: T.shape({}),
};

export default BangTheoDoiHoiTinhProperties;
