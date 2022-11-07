import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import T from "prop-types";
import { Row, Col } from "antd";
import { Main } from "./styled";
import MarginConfig from "components/editor/config/MarginConfig";

const LabelProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    setState({
      marginTop: props.state.props.marginTop,
      marginRight: props.state.props.marginRight,
      marginLeft: props.state.props.marginLeft,
      marginBottom: props.state.props.marginBottom,
    });
  }, [props.state]);

  useImperativeHandle(ref, () => ({
    marginTop: state.marginTop,
    marginRight: state.marginRight,
    marginLeft: state.marginLeft,
    marginBottom: state.marginBottom,
  }));

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
      </Row>
    </Main>
  );
});

LabelProps.propTypes = {
  state: T.shape({}),
};

export default LabelProps;
