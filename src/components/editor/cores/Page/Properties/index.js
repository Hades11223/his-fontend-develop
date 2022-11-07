import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Row, Col, InputNumber, Icon } from "antd";
import { Main } from "./styled";
import MarginConfig from "components/editor/config/MarginConfig";
import FontSizeConfig from "components/editor/config/FontSizeConfig";

const PageProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    visible: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    border: state.border,
    paddingTop: state.paddingTop,
    paddingRight: state.paddingRight,
    paddingLeft: state.paddingLeft,
    paddingBottom: state.paddingBottom,
    rowHeight: state.rowHeight,
    lineHeightText: state.lineHeightText,
    fontSize: state.fontSize,
  }));
  useEffect(() => {
    setState({
      paddingTop: props.state.props.paddingTop,
      paddingRight: props.state.props.paddingRight,
      paddingLeft: props.state.props.paddingLeft,
      paddingBottom: props.state.props.paddingBottom,
      rowHeight: props.state.props.rowHeight || 24,
      lineHeightText: props.state.props.lineHeightText || 1.5,
      fontSize: props.state.props.fontSize || 12,
    });
  }, [props.state]);

  const onChangePadding = (type, value) => {
    let key = null;
    switch (type) {
      case "top":
        key = "paddingTop";
        break;
      case "bottom":
        key = "paddingBottom";
        break;
      case "left":
        key = "paddingLeft";
        break;
      case "right":
        key = "paddingRight";
        break;
    }
    setState({
      [key]: value,
    });
  };

  const onChangeValue = (type) => (e) => {
    setState({
      [type]: e,
    });
  };

  return (
    <Main>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Khoảng Cách Trong: "}</span>
        </Col>

        <Col span={16}>
          <MarginConfig
            onChange={onChangePadding}
            top={state.paddingTop}
            bottom={state.paddingBottom}
            right={state.paddingRight}
            left={state.paddingLeft}
          />
        </Col>
        <Col span={8}>
          <span>{"Độ cao dòng: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            type="number"
            size={"small"}
            min={1}
            value={state.rowHeight}
            onChange={onChangeValue("rowHeight")}
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
      </Row>
      <Row gutter={[12, 12]} style={{ marginBottom: 10, marginTop: 10 }}>
        <Col span={8}>
          <span>{"Độ cao dòng văn bản: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            type="number"
            size={"small"}
            min={1}
            step={0.1}
            value={state.lineHeightText}
            onChange={onChangeValue("lineHeightText")}
          />
        </Col>
      </Row>
    </Main>
  );
});

export default PageProps;
