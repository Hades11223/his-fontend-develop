import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Button, Row, Col, InputNumber } from "antd";
import { Main } from "./styled";
import MarginConfig from "components/editor/config/MarginConfig";
import BorderConfig from "components/editor/config/BorderConfig";
import FontSizeConfig from "components/editor/config/FontSizeConfig";

const LayoutProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    blockSignLevel: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    border: state.border,
    marginTop: state.marginTop,
    marginRight: state.marginRight,
    marginLeft: state.marginLeft,
    marginBottom: state.marginBottom,
    paddingTop: state.paddingTop,
    paddingRight: state.paddingRight,
    paddingLeft: state.paddingLeft,
    paddingBottom: state.paddingBottom,
    borderTop: state.borderTop,
    borderBottom: state.borderBottom,
    borderLeft: state.borderLeft,
    borderRight: state.borderRight,
    blockSignLevel: state.blockSignLevel,
    rowHeight: state.rowHeight,
    lineHeightText: state.lineHeightText,
    layoutMinHeight: state.layoutMinHeight,
    fontSize: state.fontSize,
  }));
  useEffect(() => {
    let newState = {};
    if (props.state.props.border) {
      delete props.state.props.border;
      newState.borderTop = {
        size: 1,
        color: "#000",
        type: "solid",
      };
      newState.borderBottom = {
        size: 1,
        color: "#000",
        type: "solid",
      };
      newState.borderRight = {
        size: 1,
        color: "#000",
        type: "solid",
      };
      newState.borderLeft = {
        size: 1,
        color: "#000",
        type: "solid",
      };
    } else {
      newState.borderTop = props.state.props.borderTop;
      newState.borderBottom = props.state.props.borderBottom;
      newState.borderRight = props.state.props.borderRight;
      newState.borderLeft = props.state.props.borderLeft;
    }
    setState({
      border: props.state.props.border,
      marginTop: props.state.props.marginTop,
      marginRight: props.state.props.marginRight,
      marginLeft: props.state.props.marginLeft,
      marginBottom: props.state.props.marginBottom,
      paddingTop: props.state.props.paddingTop,
      paddingRight: props.state.props.paddingRight,
      paddingLeft: props.state.props.paddingLeft,
      paddingBottom: props.state.props.paddingBottom,
      blockSignLevel: props.state.props.blockSignLevel,
      rowHeight: props.state.props.rowHeight,
      lineHeightText: props.state.props.lineHeightText,
      layoutMinHeight: props.state.props.layoutMinHeight,
      fontSize: props.state.props.fontSize || 12,
      ...newState,
    });
  }, [props.state]);

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
  const onChangeBorder = (type, value) => {
    setState({
      [type]: value,
    });
  };
  const onChangeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };
  const setDefaultBorder = () => {
    setState({
      border: false,
      borderTop: {
        size: 1,
        color: "#000",
        type: "solid",
      },
      borderBottom: {
        size: 1,
        color: "#000",
        type: "solid",
      },
      borderRight: {
        size: 1,
        color: "#000",
        type: "solid",
      },
      borderLeft: {
        size: 1,
        color: "#000",
        type: "solid",
      },
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
          <span>{"Độ cao tối thiểu: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            type="number"
            size={"small"}
            min={1}
            value={state.layoutMinHeight}
            onChange={onChangeValue("layoutMinHeight")}
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
            placeholder={24}
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
      <Row gutter={[12, 12]}>
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
            placeholder={1.5}
            onChange={onChangeValue("lineHeightText")}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Border: "}</span>
          <Button type="dashed" onClick={setDefaultBorder}>
            Set Default
          </Button>
        </Col>
        <Col span={16}>
          <BorderConfig
            onChange={onChangeBorder}
            borderTop={state.borderTop}
            borderLeft={state.borderLeft}
            borderRight={state.borderRight}
            borderBottom={state.borderBottom}
            // checked={state.border}
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
      </Row>
    </Main>
  );
});

export default LayoutProps;
