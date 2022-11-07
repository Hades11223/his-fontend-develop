import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import T from "prop-types";
import moment from "moment";
import { Input, Button, Row, Col } from "antd";
import { Main } from "./styled";
import FieldName from "components/editor/config/EditorTool/FieldName";
import {
  PlusOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";

const FieldsWrapperProps = forwardRef((props, ref) => {
  const { apiFields = [] } = props;
  const [state, _setState] = useState({
    fieldName: "",
    fields: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        fields: props.state.props.fields || [],
      });
    }
  }, [props.state]);
  const changeValue = (target) => (e) => {
    setState({
      [target]: e,
    });
  };

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    fields: state.fields,
  }));

  const addField = () => {
    const field = {
      name: "",
      key: moment().valueOf(),
      bold: false,
    };
    setState({
      fields: [...state.fields, field],
    });
  };

  const changeField = (index) => (e) => {
    const value = e.target.value;
    setState({
      fields: state.fields.map((item, idx) =>
        idx === index ? { ...item, name: value } : item
      ),
    });
  };

  const changePrefix = (index) => (e) => {
    const value = e.target.value;
    setState({
      fields: state.fields.map((item, idx) =>
        idx === index ? { ...item, prefix: value } : item
      ),
    });
  };

  const changeSuffix = (index) => (e) => {
    const value = e.target.value;
    setState({
      fields: state.fields.map((item, idx) =>
        idx === index ? { ...item, suffix: value } : item
      ),
    });
  };

  const changeFieldPropBold = (index, value) => () => {
    const obj = state.fields.find((item, idx) => idx === index);
    let boldCheck = obj.bold;
    let italicCheck = obj.italic;
    let underlineCheck = obj.underline;

    switch (value) {
      case "bold":
        boldCheck = !obj.bold;
        break;
      case "italic":
        italicCheck = !obj.italic;
        break;
      case "underline":
        underlineCheck = !obj.underline;
        break;
      default:
        break;
    }
    setState({
      fields: state.fields.map((item, idx) =>
        idx === index
          ? {
              ...item,
              bold: boldCheck,
              italic: italicCheck,
              underline: underlineCheck,
            }
          : item
      ),
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
            apiFields={apiFields || []}
          />
        </Col>
        {state.fields.map((item, index) => (
          <Col span={24} key={item.key}>
            <Row gutter={[12]} type={"flex"} align={"middle"} justify={"end"}>
              <Col span={2}>
                <div>{index + 1}</div>
              </Col>

              <Col span={15}>
                <Input.Group compact>
                  <Input
                    style={{ width: "15%", textAlign: "center" }}
                    size={"small"}
                    defaultValue={item.prefix}
                    onChange={changePrefix(index)}
                  />
                  <Input
                    style={{ width: "70%" }}
                    size={"small"}
                    defaultValue={item.name}
                    onChange={changeField(index)}
                  />
                  <Input
                    style={{ width: "15%", textAlign: "center" }}
                    size={"small"}
                    defaultValue={item.suffix}
                    onChange={changeSuffix(index)}
                  />
                </Input.Group>
              </Col>

              <Col span={7}>
                <Button.Group className={"btn-group"} size={"small"}>
                  <Button
                    type={item.bold ? "primary" : "default"}
                    icon={<BoldOutlined />}
                    onClick={changeFieldPropBold(index, "bold")}
                  />
                  <Button
                    type={item.italic ? "primary" : "default"}
                    icon={<ItalicOutlined />}
                    onClick={changeFieldPropBold(index, "italic")}
                  />
                  <Button
                    type={item.underline ? "primary" : "default"}
                    icon={<UnderlineOutlined />}
                    onClick={changeFieldPropBold(index, "underline")}
                  />
                </Button.Group>
              </Col>
            </Row>
          </Col>
        ))}

        <Col span={24}>
          <Button
            size={"small"}
            icon={<PlusOutlined />}
            block
            onClick={addField}
          >
            {"Add field"}
          </Button>
        </Col>
      </Row>
    </Main>
  );
});

export default FieldsWrapperProps;
