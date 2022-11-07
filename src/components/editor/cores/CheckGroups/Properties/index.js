import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import T from "prop-types";
import renderHtml from "react-render-html";
import {
  Button,
  Row,
  Col,
  Radio,
  Input,
  Checkbox,
  Select,
  InputNumber,
} from "antd";
import moment from "moment";
import { Main } from "./styled";
import MarginConfig from "components/editor/config/MarginConfig";
import FieldName from "components/editor/config/EditorTool/FieldName";
import {
  DeleteOutlined,
  PlusOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

const CheckGroupProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    fieldName: "",
    type: "multiple",
    direction: "ltr",
    checkList: [],
    disabled: false,
    readOnly: false,
    blockSignLevel: 0,
    defaultFromHIS: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
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

  const { apiFields, updateComponents } = props;

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    type: state.type,
    direction: state.direction,
    checkList: state.checkList,
    disabled: state.disabled,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
    defaultFromHIS: state.defaultFromHIS,
    marginTop: state.marginTop,
    marginRight: state.marginRight,
    marginLeft: state.marginLeft,
    marginBottom: state.marginBottom,
  }));

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        type: props.state.props.type || "multiple",
        checkList: props.state.props.checkList || [],
        direction: props.state.props.direction || "ltr",
        disabled: props.state.props.disabled || false,
        readOnly: props.state.props.readOnly || false,
        blockSignLevel: props.state.props.blockSignLevel,
        defaultFromHIS: props.state.props.defaultFromHIS || false,
        marginTop: props.state.props.marginTop,
        marginRight: props.state.props.marginRight,
        marginLeft: props.state.props.marginLeft,
        marginBottom: props.state.props.marginBottom,
      });
    }
  }, [props.state]);

  const changeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };

  const updateItem = (item, key) => (e) => {
    let value = "";
    if (key == "autoCheck") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    const newList = state.checkList.map((obj) =>
      obj.key === item.key
        ? {
            ...obj,
            [key]: value,
          }
        : obj
    );
    setState({
      checkList: newList,
    });
  };

  const removeItem = (itemKey) => () => {
    const newList = state.checkList.filter((item) => item.key !== itemKey);
    setState({
      checkList: newList,
    });
    updateComponents({
      ...props.state,
      props: {
        ...props.state.props,
        checkList: newList,
      },
    });
  };

  const addCheckItem = () => {
    const newList = state.checkList;
    const item = { label: "test", value: "text", key: moment().valueOf() };
    const list = [...newList, item];
    setState({
      checkList: list,
    });
    updateComponents({
      ...props.state,
      props: {
        ...props.state.props,
        checkList: list,
      },
    });
  };

  const changeInput = (type) => (e) => {
    setState({
      [type]: e.target.value,
    });
  };
  const changeDataFormEMR = (e) => {
    changeValue("disabled")(!e.target.checked);
  };

  const handleChangeDirection = (e) => {
    const value = e.currentTarget.value;
    if (value === "rtl") {
      setState({
        direction: "ltr",
      });
    } else {
      setState({
        direction: "rtl",
      });
    }
  };
  const changeCheckbox = (type) => (e) => {
    changeValue(type)(e.target.checked);
  };
  console.log("s", state.checkList);

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
          <span>{"Direction: "}</span>
        </Col>

        <Col span={16}>
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <Button
                icon={
                  state.direction === "ltr" ? (
                    <ArrowRightOutlined />
                  ) : (
                    <ArrowLeftOutlined />
                  )
                }
                size={"small"}
                value={state.direction}
                onClick={handleChangeDirection}
              />
            </Col>

            <Col span={16}>
              {state.direction === "ltr" ? "L to R" : "R to L"}
            </Col>
          </Row>
        </Col>

        <Col span={8}>
          <span>{"Type: "}</span>
        </Col>

        <Col span={16}>
          <Radio.Group onChange={changeInput("type")} value={state.type}>
            <Radio value={"onlyOne"}>{"Only one"}</Radio>
            <Radio value={"multiple"}>{"Multiple"}</Radio>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <span>{"Khoảng CheckBox: "}</span>
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
          <span>{"Khoá ở cấp ký "}</span>
        </Col>

        <Col span={16}>
          <InputNumber
            value={state.blockSignLevel}
            onChange={changeValue("blockSignLevel")}
            size={"small"}
          />
        </Col>
        <Col span={8}>
          <span>{"Read Only "}</span>
        </Col>

        <Col span={16}>
          <Checkbox
            onChange={changeCheckbox("readOnly")}
            checked={state.readOnly}
          />
        </Col>
        {/* <Col span={8}>
          <span>{"Dữ liệu từ EMR: "}</span>
        </Col>

        <Col span={16}>
          <Checkbox onChange={changeDataFormEMR} checked={!state.disabled} />
        </Col> */}
      </Row>
      {/* chỉ hiển thị khi đánh dấu lấy dữ liệu từ EMR */}
      {/* {!state.disabled && (
        <Row gutter={[12, 12]}>
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

      <ul>
        {state.checkList.map((item) => (
          <li key={item.key} className={"item-main"}>
            <div className={"item-option"}>
              <span className="option-label">Nhãn:</span>
              <span className="option-content">
                {renderHtml(item.label || "")}
              </span>
            </div>
            <div className={"item-option"}>
              <span className="option-label">Tự động chọn:</span>

              <Checkbox
                value={item?.autoCheck}
                checked={item?.autoCheck}
                onChange={updateItem(item, "autoCheck")}
              ></Checkbox>
            </div>
            <div className={"item-option"}>
              <span className="option-label">Giá trị:</span>
              <Input
                className="option-content"
                style={{ flex: 1 }}
                value={item.value}
                onChange={updateItem(item, "value")}
                size={"small"}
              />
              <Button
                icon={<DeleteOutlined />}
                size={"small"}
                onClick={removeItem(item.key)}
              />
            </div>
            <div className={"item-option"}>
              <span className="option-label">Độ rộng:</span>
              <Input
                className="option-content"
                style={{ flex: 1 }}
                value={item.width}
                onChange={updateItem(item, "width")}
                size={"small"}
              />
            </div>
            <div className={"item-option"}>
              <span className="option-label">Gợi ý:</span>
              <Input.TextArea
                rows={2}
                className="option-content"
                style={{ flex: 1 }}
                value={item.note}
                onChange={updateItem(item, "note")}
                size={"small"}
              />
            </div>
          </li>
        ))}
      </ul>
      <Button
        className={"add-btn"}
        icon={<PlusOutlined />}
        size={"small"}
        onClick={addCheckItem}
      />
    </Main>
  );
});

CheckGroupProps.defaultProps = {
  state: {},
};

CheckGroupProps.propTypes = {
  state: T.shape({}),
};

export default CheckGroupProps;
