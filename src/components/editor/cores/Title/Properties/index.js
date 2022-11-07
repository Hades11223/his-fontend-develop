import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import T from "prop-types";
import { Row, Col, Radio } from "antd";
import { Main } from "./styled";
import FieldName from "components/editor/config/EditorTool/FieldName";
import AlignConfig from "components/editor/config/AlignConfig";
import FontSizeConfig from "components/editor/config/FontSizeConfig";

const TitleProps = forwardRef((props, ref) => {
  const { apiFields } = props;
  const [state, _setState] = useState({
    fontWeight: "",
    textTransform: "",
    fieldName: "",
    align: "left",
    fontSize: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    fontSize: state.fontSize,
    align: state.align,
    fieldName: state.fieldName,
    fontWeight: state.fontWeight,
    textTransform: state.textTransform,
  }));

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        fontSize: props.state.props.fontSize || 12,
        align: props.state.props.align,
        fontWeight: props.state.props.fontWeight,
        textTransform: props.state.props.textTransform,
      });
    }
  }, [props.state]);
  const onChangeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };
  const onChangeInput = (type) => (e) => {
    onChangeValue(type)(e.target.value);
    setState({
      [type]: e.target.value,
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
            onSelect={onChangeValue("fieldName")}
            value={state.fieldName}
            apiFields={apiFields || []}
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
            changeAlign={onChangeValue("align")}
            contentAlign={state.align}
          />
        </Col>
        <Col span={8}>
          <span>{"Font weight: "}</span>
        </Col>
        <Col span={16}>
          <Radio.Group
            buttonStyle="solid"
            size={"small"}
            value={state.fontWeight}
            onChange={onChangeInput("fontWeight")}
          >
            <Radio.Button value="700">Bold</Radio.Button>
            <Radio.Button value="500">Medium</Radio.Button>
            <Radio.Button value="300">Light</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <span>{"Transform: "}</span>
        </Col>
        <Col span={16}>
          <Radio.Group
            buttonStyle="solid"
            size={"small"}
            value={state.textTransform}
            onChange={onChangeInput("textTransform")}
          >
            <Radio.Button value="uppercase">Upper</Radio.Button>
            <Radio.Button value="lowercase">Lower</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
    </Main>
  );
});

TitleProps.propTypes = {
  state: T.shape({}),
};

export default TitleProps;
