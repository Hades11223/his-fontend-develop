import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import T from "prop-types";
import { Button, Row, Col, Radio, Input, Checkbox, InputNumber } from "antd";
import moment from "moment";
import { Main } from "./styled";
import AlignConfig from "components/editor/config/AlignConfig";
import FontSizeConfig from "components/editor/config/FontSizeConfig";
import PickColor from "components/editor/config/EditorTool/PickColor";
import FieldName from "components/editor/config/EditorTool/FieldName";
import {
  DeleteOutlined,
  PlusOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import FontStyleConfig from "components/editor/config/FontStyleConfig";

const DropDownListProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    fieldName: "",
    type: "multiple",
    checkList: [],
    variable: [],
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
  const refTimeOut = useRef();
  const { apiFields, updateComponents } = props;

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    type: state.type,
    checkList: state.checkList,
    variable: state.variable,
    noLabel: state.noLabel,
    disabled: state.disabled,
    labelWidth: state.labelWidth,
    contentAlign: state.contentAlign,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
    defaultFromHIS: state.defaultFromHIS,
    markSpanRow: state.markSpanRow,
    lineHeight: state.lineHeight,
    fontSize: state.fontSize,
    contentColor: state.contentColor,
    listType: state.listType,
    dataApi: state.dataApi,
    fieldValue: state.fieldValue,
    fieldDisplay: state.fieldDisplay,
    minRow: state.minRow,
    displayText: state.displayText,
    bold: state.bold,
    italic: state.italic,
    underline: state.underline,
  }));

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        type: props.state.props.type || "multiple",
        checkList: props.state.props.checkList || [],
        variable: props.state.props.variable || [], //các biến tham số cho api
        noLabel: props.state.props.noLabel,
        disabled: props.state.props.disabled || false,
        labelWidth: props.state.props.labelWidth,
        contentAlign: props.state.props.contentAlign || "left",
        readOnly: props.state.props.readOnly || false,
        blockSignLevel: props.state.props.blockSignLevel,
        defaultFromHIS: props.state.props.defaultFromHIS || false,
        markSpanRow:
          props.state.props.markSpanRow === undefined
            ? true
            : props.state.props.markSpanRow,
        lineHeight: props.state.props.lineHeight,
        fontSize: props.state.props.fontSize || 12,
        contentColor: props.state.props.contentColor,
        listType: props.state.props.listType || 2, //loại dữ liệu hiển thị 1/api 2/customize
        dataApi: props.state.props.dataApi, //api danh sách
        fieldValue: props.state.props.fieldValue, //trường giá trị
        fieldDisplay: props.state.props.fieldDisplay, //trường hiển thị
        minRow: props.state.props.minRow, //số dòng mặc định
        displayText: props.state.props.displayText,
        bold: props.state.props.bold,
        italic: props.state.props.italic,
        underline: props.state.props.underline,
      });
    }
  }, [props.state]);

  const changeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };
  const updateItem = (item, key) => (e) => {
    const value = e.target.value;
    const newList = state.checkList.map((obj) =>
      obj.key === item.key
        ? {
            ...obj,
            [key]: value,
            ...(key == "label" ? { labelValue: value } : {}),
          }
        : obj
    );
    setState({
      checkList: newList,
    });
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
    }
    refTimeOut.current = setTimeout(() => {
      updateComponents({
        ...props.state,
        props: {
          ...props.state.props,
          checkList: newList,
        },
      });
    }, 300);
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

  const updateVariable = (item, key) => (e) => {
    let value = "";
    if (e?.target?.hasOwnProperty("checked")) value = e.target.checked;
    else if (e?.target?.hasOwnProperty("value")) value = e.target.value;
    else value = e;
    const newList = state.variable.map((obj) =>
      obj.key === item.key
        ? {
            ...obj,
            [key]: value,
          }
        : obj
    );
    setState({
      variable: newList,
    });
    updateComponents({
      ...props.state,
      props: {
        ...props.state.props,
        variable: newList,
      },
    });
  };
  const removeVariable = (itemKey) => () => {
    const newList = state.variable.filter((item) => item.key !== itemKey);
    setState({
      variable: newList,
    });
    updateComponents({
      ...props.state,
      props: {
        ...props.state.props,
        variable: newList,
      },
    });
  };
  const addVariable = () => {
    const newList = state.variable;
    const item = {
      name: "",
      value: null,
      fromEMR: true,
      key: moment().valueOf(),
    };
    const list = [...newList, item];
    setState({
      variable: list,
    });
    updateComponents({
      ...props.state,
      props: {
        ...props.state.props,
        variable: list,
      },
    });
  };
  const changeInput = (type) => (e) => {
    console.log(type, e);
    if (type == "blockSignLevel") {
      if (/^\d+$/.test(e.target.value) || e.target.value == "") {
        setState({
          [type]: e.target.value,
        });
      }
    } else {
      setState({
        [type]: e.target.value,
      });
    }
  };
  const changeDataFormEMR = (e) => {
    changeValue("disabled")(!e.target.checked);
  };

  const changeCheckbox = (type) => (e) => {
    changeValue(type)(e.target.checked);
  };
  const onChangeFontStyle = (type, value) => {
    setState({
      [type]: value,
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
            apiFields={apiFields}
          />
        </Col>

        <Col span={8}>
          <span>{"Type: "}</span>
        </Col>

        <Col span={16}>
          <Radio.Group onChange={changeInput("type")} value={state.type}>
            <Radio value={"onlyOne"}>{"Chọn 1 giá trị"}</Radio>
            <Radio value={"multiple"}>{"Chọn nhiều giá trị"}</Radio>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <span>{"Không hiển thị nhãn: "}</span>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={state.noLabel}
            onChange={changeCheckbox("noLabel")}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Độ rộng nhãn: "}</span>
        </Col>
        <Col span={16}>
          <Input
            className="option-content"
            style={{ flex: 1 }}
            value={state.labelWidth}
            onChange={changeInput("labelWidth")}
            size={"small"}
          />
        </Col>
        <Col span={8}>
          <span>{"Cỡ chữ: "}</span>
        </Col>
        <Col span={16}>
          <FontSizeConfig
            changeFont={changeValue("fontSize")}
            fontSize={state.fontSize}
          />
        </Col>
        <Col span={8}>
          <span>{"Content Align: "}</span>
        </Col>
        <Col span={16}>
          <AlignConfig
            changeAlign={changeValue("contentAlign")}
            contentAlign={state.contentAlign}
          />
        </Col>

        {state.displayText && (
          <>
            <Col span={8}>
              <span>{"Font Style: "}</span>
            </Col>
            <Col span={16}>
              <FontStyleConfig
                bold={state.bold}
                italic={state.italic}
                underline={state.underline}
                onChange={onChangeFontStyle}
              />
            </Col>
          </>
        )}

        <Col span={8}>
          <span>{"Content Color: "}</span>
        </Col>
        <Col span={16}>
          <PickColor
            iconComponent={FontColorsOutlined}
            title="Chọn màu chữ"
            dataColor={state.contentColor || "black"}
            changeColor={changeValue("contentColor")}
          />
        </Col>
        <Col span={8}>
          <span>{"Khoá ở cấp ký "}</span>
        </Col>

        <Col span={16}>
          <Input
            value={state.blockSignLevel}
            onChange={changeInput("blockSignLevel")}
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
        <Col span={8}>
          <span>{"Display Text"}</span>
        </Col>

        <Col span={16}>
          <Checkbox
            onChange={changeCheckbox("displayText")}
            checked={state.displayText}
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

      {!state.disabled && (
        <Row gutter={[12, 12]}>
          <Col span={8}>
            <span>{"Hiển thị đánh dấu dòng: "}</span>
          </Col>
          <Col span={16}>
            <Checkbox
              onChange={changeCheckbox("markSpanRow")}
              checked={state.markSpanRow}
            />
          </Col>
        </Row>
      )}
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Độ cao dòng văn bản: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            value={state.lineHeight}
            onChange={changeValue("lineHeight")}
            placeholder={1.5}
            min={1}
            step={0.1}
            size={"small"}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Số dòng mặc định: "}</span>
        </Col>
        <Col span={16}>
          <InputNumber
            value={state.minRow}
            onChange={changeValue("minRow")}
            placeholder={1}
            min={1}
            step={1}
            size={"small"}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Dữ liệu danh sách: "}</span>
        </Col>
        <Col span={16}>
          <Radio.Group
            onChange={changeInput("listType")}
            value={state.listType}
          >
            <Radio value={1}>{"Từ api"}</Radio>
            <Radio value={2}>{"Tự chọn"}</Radio>
          </Radio.Group>
        </Col>
      </Row>

      {state.listType == 2 ? (
        <>
          <ul>
            {state.checkList.map((item) => (
              <li key={item.key} className={"item-main"}>
                <div className={"item-option"}>
                  <span className="option-label">Nhãn:</span>
                  <Input
                    className="option-content"
                    style={{ flex: 1 }}
                    value={item.label}
                    onChange={updateItem(item, "label")}
                    size={"small"}
                  />
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
              </li>
            ))}
          </ul>
          <Button
            className={"add-btn"}
            icon={<PlusOutlined />}
            size={"small"}
            onClick={addCheckItem}
          />
        </>
      ) : (
        <Row gutter={[12, 12]}>
          <Col span={8}>
            <span>{"API: "}</span>
          </Col>
          <Col span={16}>
            <Input
              size="small"
              value={state.dataApi}
              onChange={changeInput("dataApi")}
            />
          </Col>
          <Col span={8}>
            <span>{"Trường giá trị: "}</span>
          </Col>
          <Col span={16}>
            <Input
              size="small"
              value={state.fieldValue}
              onChange={changeInput("fieldValue")}
            />
          </Col>
          <Col span={8}>
            <span>{"Trường hiển thị: "}</span>
          </Col>
          <Col span={16}>
            <Input
              size="small"
              value={state.fieldDisplay}
              onChange={changeInput("fieldDisplay")}
            />
          </Col>
          <Col span={8}>
            <span>{"Khai báo tham số: "}</span>
          </Col>
          <Col span={24}>
            <ul>
              {state.variable.map((item) => (
                <li key={item.key} className={"item-main"}>
                  <div className={"item-option"}>
                    <span className="option-label">Tham số:</span>
                    <Input
                      placeholder="Nhập tên tham số"
                      className="option-content"
                      style={{ flex: 1 }}
                      value={item.name}
                      onChange={updateVariable(item, "name")}
                      size={"small"}
                    />
                  </div>
                  <div className={"item-option"}>
                    <span className="option-label">Giá trị:</span>
                    <FieldName
                      apiFields={apiFields}
                      value={item.value}
                      placeholder="Chọn trường dữ liệu"
                      onSelect={updateVariable(item, "value")}
                    />
                    <Button
                      icon={<DeleteOutlined />}
                      size={"small"}
                      onClick={removeVariable(item.key)}
                    />
                  </div>
                  <div className={"item-option"}>
                    <span className="option-label">Từ EMR</span>
                    <Checkbox
                      onChange={updateVariable(item, "fromEMR")}
                      checked={item.fromEMR}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <Button
              className={"add-btn"}
              icon={<PlusOutlined />}
              size={"small"}
              onClick={addVariable}
            />
          </Col>
        </Row>
      )}
    </Main>
  );
});

DropDownListProps.defaultProps = {
  state: {},
};

DropDownListProps.propTypes = {
  state: T.shape({}),
};

export default DropDownListProps;
