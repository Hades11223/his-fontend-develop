import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
  useMemo,
} from "react";
import T from "prop-types";
import {
  Button,
  Row,
  Col,
  Select,
  Input,
  Checkbox,
  InputNumber,
  Drawer,
  Form,
  Radio,
  message,
} from "antd";
import { formItemLayout } from "components/constanst";
import components from "components/editor/cores";
import { get } from "lodash";
import TableControl from "../TableControl";
import { Main } from "./styled";
import FontSizeConfig from "components/editor/config/FontSizeConfig";
import MarginConfig from "components/editor/config/MarginConfig";
import FieldName from "components/editor/config/EditorTool/FieldName";
import { format } from "../../DatePicker/constants";
import { SaveOutlined } from "@ant-design/icons";

const TableProperties = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    fieldName: "",
    categoriesQty: 0,
    fields: "",
    type: "normal",
    rows: [],
    cols: [],
    defaultRows: [],
    disabled: false,
    focusObj: {},
    visible: false,
    maxRow: 2,
    filteredOptions: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { apiFields, handleSubmit } = props;
  const tableRef = useRef(null);

  useEffect(() => {
    if (props.state.key) {
      let newState = {
        rows: props.state.props.rows,
        categoriesQty: props.state.props.categoriesQty,
        fieldName: props.state.props.fieldName,
        dieuDuong: props.state.props.dieuDuong,
        numberDateInRow: props.state.props.numberDateInRow || 14,
        numberLineInFirstPage: props.state.props.numberLineInFirstPage || 20,
        numberLineInNextPage: props.state.props.numberLineInNextPage || 50,
        colDateWidth: props.state.props.colDateWidth || 40,
        fields: props.state.props.fields,
        type:
          props.state.props.type == "analytic"
            ? "vat-tu-tieu-hao"
            : props.state.props.type || "normal",
        disabled: props.state.props.disabled,
        defaultRows: props.state.props.defaultRows,
        cols: props.state.props.cols,
        rowHeight: props.state.props.rowHeight,
        lineHeightText: props.state.props.lineHeightText,
        fontSize: props.state.props.fontSize || 12,
        marginTop: props.state.props.marginTop,
        marginRight: props.state.props.marginRight,
        marginLeft: props.state.props.marginLeft,
        marginBottom: props.state.props.marginBottom,
        maxRow: props.state.props.maxRow || "",
        hideHeader: props.state.props.hideHeader || false,
        hideKhung: props.state.props.hideKhung || false,
        readOnly: props.state.props.readOnly || false,
        dauNganCach: props.state.props.dauNganCach || "",
        filteredOptions: props.state.props.cols || [],
        disableToRow: props.state.props.disableToRow || 0,
        listColDisable: props.state.props.listColDisable || [],
        hideBtnAddRow: props.state.props.hideBtnAddRow,
      };
      if (props.state.props.gridData) {
        newState.type = "gridData";
      }
      setState(newState);
    }
  }, [props.state]);
  const signFields = useMemo(() => {
    if (apiFields) {
      return apiFields.filter((item) => apiFields.includes(item + "_ngayKy"));
    }
    return [];
  }, [apiFields]);
  useImperativeHandle(ref, () => {
    return {
      marginTop: state.marginTop,
      marginRight: state.marginRight,
      marginLeft: state.marginLeft,
      marginBottom: state.marginBottom,
      fields: state.fields,
      fieldName: state.fieldName,
      dieuDuong: state.dieuDuong,
      numberDateInRow: state.numberDateInRow,
      numberLineInFirstPage: state.numberLineInFirstPage,
      numberLineInNextPage: state.numberLineInNextPage,
      colDateWidth: state.colDateWidth,

      categoriesQty: state.categoriesQty,
      rows: state.rows,
      defaultRows: state.defaultRows,
      disabled: state.disabled,
      cols: state.cols,
      type: state.type,
      rowHeight: state.rowHeight,
      lineHeightText: state.lineHeightText,
      fontSize: state.fontSize,
      maxRow: state.maxRow || "",
      hideHeader: state.hideHeader || false,
      hideKhung: state.hideKhung || false,
      readOnly: state.readOnly || false,
      dauNganCach: state.dauNganCach || "",
      listColDisable: state.listColDisable,
      disableToRow: state.disableToRow,
      hideBtnAddRow: state.hideBtnAddRow,
    };
  });

  const changeDataFormEMR = (e) => {
    onChangeValue("disabled")(!e.target.checked);
  };
  const onChangeValueCheckbox = (key) => (e) => {
    onChangeValue(key)(e.target.checked);
  };
  const showDrawer = (open) => () => {
    setState({
      visible: open,
    });
  };

  const handleChangeColKey = (e) => {
    const { col } = tableRef.current;

    const currentCols = props.state.props.cols || [];
    const currentCol = currentCols.find((item) => item.key === col.key) || {};
    const newCols = currentCols.map((item) =>
      item.key === currentCol.key ? currentCol : item
    );

    currentCol.colKey = e.target.value;
    setState({
      cols: newCols,
    });
  };

  const handleChangeRowField = (rowField) => (e) => {
    let value = "";
    if (rowField == "rowKey") {
      value = e.target?.value;
    } else {
      value = e;
    }
    const { row } = tableRef.current;
    const currentRows = props.state.props.rows || [];
    const currentRow = currentRows.find((item) => item.key === row.key) || {};
    const newRows = currentRows.map((item) =>
      item.key === currentRow.key ? { ...currentRow, [rowField]: value } : item
    );
    setState({
      rows: newRows,
      focusObj: {
        ...state.focusObj,
        row: { ...currentRow, [rowField]: value },
      },
    });
  };

  const handleChangeColComponent = (value) => {
    const { col } = tableRef.current;
    const currentCols = props.state.props.cols || [];
    const currentCol = currentCols.find((item) => item.key === col.key) || {};
    currentCol.component = value;
    const newCols = currentCols.map((item) =>
      item.key === currentCol.key ? currentCol : item
    );
    setState({
      cols: newCols,
      currentCol,
    });
  };
  const handleChangeFormat = (value) => {
    const { col } = tableRef.current;
    const currentCols = props.state.props.cols || [];
    const currentCol = currentCols.find((item) => item.key === col.key) || {};
    currentCol.dateTimeFormat = value;
    const newCols = currentCols.map((item) =>
      item.key === currentCol.key ? currentCol : item
    );
    setState({
      cols: newCols,
    });
  };
  const submit = () => {
    handleSubmit();
  };
  const handleChangeColFixed = (e) => {
    const checked = e.target.checked;
    const { col } = tableRef.current;
    const currentCols = props.state.props.cols || [];
    const currentCol = currentCols.find((item) => item.key === col.key) || {};
    const newCols = currentCols.map((item) =>
      item.key === currentCol.key ? { ...currentCol, fixed: checked } : item
    );
    setState({
      cols: newCols,
      focusObj: { ...state.focusObj, col: { ...currentCol, fixed: checked } },
    });
  };

  const handleChangeColPlusBtn = (e) => {
    const checked = e.target.checked;
    const { col } = tableRef.current;
    const currentCols = props.state.props.cols || [];
    const currentCol = currentCols.find((item) => item.key === col.key) || {};
    const newCols = currentCols.map((item) =>
      item.key === currentCol.key ? { ...currentCol, plusBtn: checked } : item
    );
    setState({
      cols: newCols,
      focusObj: { ...state.focusObj, col: { ...currentCol, plusBtn: checked } },
    });
  };

  const handleChangeRowCopied = (e) => {
    const checked = e.target.checked;
    const { row } = tableRef.current;
    const currentRows = props.state.props.rows || [];
    const currentRow = currentRows.find((item) => item.key === row.key) || {};
    const newRows = currentRows.map((item) =>
      item.key === currentRow.key ? { ...currentRow, copied: checked } : item
    );
    setState({
      rows: newRows,
      focusObj: { ...state.focusObj, row: { ...currentRow, copied: checked } },
    });
  };

  const handleChangeRowFixed = (e) => {
    const checked = e.target.checked;
    const { row } = tableRef.current;
    const currentRows = props.state.props.rows || [];
    const currentRow = currentRows.find((item) => item.key === row.key) || {};
    const newRows = currentRows.map((item) =>
      item.key === currentRow.key ? { ...currentRow, fixed: checked } : item
    );
    setState({
      rows: newRows,
      focusObj: { ...state.focusObj, row: { ...currentRow, fixed: checked } },
    });
  };

  const handleChangeRowHeader = (e) => {
    const checked = e.target.checked;
    const { row } = tableRef.current;
    const currentRows = props.state.props.rows || [];
    const currentRow = currentRows.find((item) => item.key === row.key) || {};
    const newRows = currentRows.map((item) =>
      item.key === currentRow.key ? { ...currentRow, isHeader: checked } : item
    );
    setState({
      rows: newRows,
      focusObj: {
        ...state.focusObj,
        row: { ...currentRow, isHeader: checked },
      },
    });
  };
  const handleChangeCategoriesQty = (value) => {
    setState({
      categoriesQty: value,
    });
  };

  const getFieldName = () => {
    if (state.type == "tien-su-di-ung") {
      let list = ["dong"]; //với bảng dạng tiền sử dị ứng thì các trường sẽ nằm từ
      /* dong1:, dong2: dong3: dong4: dong5, dong6 
      hiển thị chung là dong để hiển thị dữ liệu lên bảng
      */
      return list;
    }
    return apiFields;
  };
  const onChangeInput = (type) => (e) => {
    if (type == "maxRow") {
      if (/^\d+$/.test(e.target.value) || e.target.value == "") {
        setState({
          [type]: e.target.value,
        });
      }
    } else {
      let newState = {
        [type]: e.target.value,
      };
      if (type == "type" && e.target.value == "tien-su-di-ung") {
        newState.cols = [{ key: 1, width: 100 }];
      }
      if (type == "type" && e.target.value == "vat-tu-tieu-hao") {
        newState.disabled = true;
      }
      setState(newState);
    }
  };
  const onChangeValue = (type) => (value) => {
    if (type == "focusObj") {
      setState({
        [type]: value,
        currentCol: value?.col,
      });
    } else if (type === "listColDisable") {
      const filteredOptions = state.filteredOptions.filter(
        (item) => item.key != value
      );
      setState({
        [type]: value,
        filteredOptions,
      });
    } else {
      setState({
        [type]: value,
      });
    }
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
  return (
    <Main>
      <Row gutter={[12, 12]}>
        <Col span={8}>{"Type: "}</Col>
        <Col span={16}>
          <Radio.Group
            value={state.type}
            onChange={onChangeInput("type")}
            className="radio-type"
          >
            <Radio value={"normal"}>{"Normal"}</Radio>
            <Radio value={"gridData"}>{"Grid data"}</Radio>
            <Radio value={"insertRow"}>{"Insert row"}</Radio>
            <Radio value={"replicationRow"}>{"Replication row"}</Radio>
            <Radio value={"vat-tu-tieu-hao"}>{"Vật tư tiêu hao"}</Radio>
            <Radio value={"tien-su-di-ung"}>{"Tiền sử dị ứng"}</Radio>
            <Radio value={"tom-tat-benh-an"}>{"Tóm tắt bệnh án"}</Radio>
            <Radio value={"listRender"}>{"List render"}</Radio>
          </Radio.Group>
        </Col>

        <Col span={8}>{"Field name: "}</Col>
        <Col span={16}>
          <FieldName
            style={{ width: "100%" }}
            onSelect={onChangeValue("fieldName")}
            value={state.fieldName}
            apiFields={getFieldName() || []}
          />
        </Col>
      </Row>
      {state.type === "vat-tu-tieu-hao" && (
        <>
          <Row gutter={[12, 12]} style={{ marginBottom: 10 }}>
            <Col span={8}>
              <span>{"Data Điều dưỡng: "}</span>
            </Col>
            <Col span={16}>
              <FieldName
                style={{ width: "100%" }}
                onSelect={onChangeValue("dieuDuong")}
                value={state.dieuDuong}
                apiFields={apiFields}
              />
            </Col>
          </Row>
          <Row gutter={[12, 12]} style={{ marginBottom: 10 }}>
            <Col span={8}>
              <span>{"Số ngày trên hàng "}</span>
            </Col>
            <Col span={16}>
              <InputNumber
                type="number"
                size={"small"}
                min={1}
                value={state.numberDateInRow}
                onChange={onChangeValue("numberDateInRow")}
              />
            </Col>
          </Row>
          <Row gutter={[12, 12]} style={{ marginBottom: 10 }}>
            <Col span={8}>
              <span>{"Số dòng trang đầu: "}</span>
            </Col>
            <Col span={16}>
              <InputNumber
                type="number"
                size={"small"}
                min={1}
                value={state.numberLineInFirstPage}
                onChange={onChangeValue("numberLineInFirstPage")}
              />
            </Col>
          </Row>
          <Row gutter={[12, 12]} style={{ marginBottom: 10 }}>
            <Col span={8}>
              <span>{"Số dòng trang tiếp theo: "}</span>
            </Col>
            <Col span={16}>
              <InputNumber
                type="number"
                size={"small"}
                min={1}
                value={state.numberLineInNextPage}
                onChange={onChangeValue("numberLineInNextPage")}
              />
            </Col>
          </Row>
          <Row gutter={[12, 12]} style={{ marginBottom: 10 }}>
            <Col span={8}>
              <span>{"Độ rộng của cột ngày: "}</span>
            </Col>
            <Col span={16}>
              <InputNumber
                type="number"
                size={"small"}
                min={1}
                value={state.colDateWidth}
                onChange={onChangeValue("colDateWidth")}
              />
              (px)
            </Col>
          </Row>
        </>
      )}
      <Row gutter={[12, 12]} style={{ marginBottom: 10 }}>
        {state.type !== "vat-tu-tieu-hao" &&
          state.type !== "tien-su-di-ung" &&
          state.type !== "replicationRow" && (
            <>
              <Col span={8}>{"Default row: "}</Col>
              <Col span={16}>
                <InputNumber
                  value={state.defaultRows}
                  onChange={onChangeValue("defaultRows")}
                  size={"small"}
                  min={1}
                />
              </Col>
            </>
          )}
        <>
          <Col span={8}>
            <span>{"Dữ liệu từ EMR: "}</span>
          </Col>
          <Col span={16}>
            <Checkbox onChange={changeDataFormEMR} checked={!state.disabled} />
          </Col>
        </>
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
      {state.type == "replicationRow" && (
        <Row gutter={[12, 12]}>
          <Col span={8}>
            <span>{"Số lượng hàng tối đa"}</span>
          </Col>
          <Col span={16}>
            <Input
              size={"small"}
              min={2}
              type="number"
              value={state.maxRow}
              onChange={onChangeInput("maxRow")}
            />
          </Col>
          <Col span={8}>
            <span>{"Ẩn nút thêm mới dòng"}</span>
          </Col>
          <Col span={16}>
            <Checkbox
              onChange={onChangeValueCheckbox("hideBtnAddRow")}
              checked={state.hideBtnAddRow}
            />
          </Col>
        </Row>
      )}
      {state.type == "tom-tat-benh-an" && (
        <>
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <span>{"Dấu ngăn cách"}</span>
            </Col>
            <Col span={16}>
              <Input
                onChange={onChangeInput("dauNganCach")}
                value={state.dauNganCach}
              />
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <span>{"Read only"}</span>
            </Col>
            <Col span={16}>
              <Checkbox
                onChange={onChangeValueCheckbox("readOnly")}
                checked={state.readOnly}
              />
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <span>{"Hiện header"}</span>
            </Col>
            <Col span={16}>
              <Checkbox
                onChange={onChangeValueCheckbox("hideHeader")}
                checked={state.hideHeader}
              />
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <span>{"Hiện khung"}</span>
            </Col>
            <Col span={16}>
              <Checkbox
                onChange={onChangeValueCheckbox("hideKhung")}
                checked={state.hideKhung}
              />
            </Col>
          </Row>
        </>
      )}

      <Row gutter={[12, 12]}>
        {state.type !== "vat-tu-tieu-hao" &&
          state.type !== "tien-su-di-ung" &&
          state.type !== "tom-tat-benh-an" && (
            <Col span={24}>
              <Button
                size={"small"}
                block
                onClick={showDrawer(true)}
                type="primary"
              >
                {"Cài đặt nâng cao"}
              </Button>
            </Col>
          )}

        <Drawer
          title="Table config"
          placement={"right"}
          closable={false}
          onClose={showDrawer(false)}
          visible={state.visible}
          width={720}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <TableControl
                ref={tableRef}
                rows={props.state.props.rows}
                cols={props.state.props.cols}
                handleChangeFocus={onChangeValue("focusObj")}
              />
            </Col>

            <Col span={16}>
              <Form {...formItemLayout}>
                {state.type !== "replicationRow" && (
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label={"Categories quantity"}
                  >
                    <InputNumber
                      value={state.categoriesQty}
                      size={"small"}
                      onChange={handleChangeCategoriesQty}
                    />
                  </Form.Item>
                )}
                {state.type !== "replicationRow" && (
                  <>
                    <Form.Item style={{ marginBottom: 0 }} label={"Column key"}>
                      <Input
                        value={get(state.focusObj, "col.colKey", "")}
                        size={"small"}
                        onChange={handleChangeColKey}
                      />
                    </Form.Item>
                  </>
                )}

                <Form.Item style={{ marginBottom: 0 }} label={"Row key"}>
                  <Input
                    value={get(state.focusObj, "row.rowKey", "")}
                    size={"small"}
                    onChange={handleChangeRowField("rowKey")}
                  />
                </Form.Item>
                {state.type == "replicationRow" && (
                  <>
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      label={"Disable đến dòng số"}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        value={state.disableToRow}
                        size={"small"}
                        min={0}
                        onChange={onChangeValue("disableToRow")}
                      />
                    </Form.Item>
                    {state.disableToRow ? (
                      <Form.Item
                        style={{ marginBottom: 0 }}
                        label={"Danh sách cột disable"}
                      >
                        <Select
                          mode="multiple"
                          value={state.listColDisable}
                          size={"small"}
                          onChange={onChangeValue("listColDisable")}
                        >
                          {state.filteredOptions.map((item) => (
                            <Select.Option key={item.key} value={item.key}>
                              {item.key}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ) : null}
                  </>
                )}
                <Form.Item
                  label={"Dữ liệu chữ ký"}
                  className={"props-form-item"}
                >
                  <Select
                    style={{ width: "100%" }}
                    size={"small"}
                    showSearch
                    onSelect={handleChangeRowField("signedField")}
                    value={get(state.focusObj, "row.signedField", "")}
                  >
                    <Select.Option value={""}>
                      <span>--- Để trống ---</span>
                    </Select.Option>
                    {signFields.map((item) => {
                      return (
                        <Select.Option key={item} value={item}>
                          <span title={item}>{item}</span>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                {state.type !== "replicationRow" && (
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label={"Component type"}
                  >
                    <Select
                      value={get(state.focusObj, "col.component", "")}
                      size={"small"}
                      style={{ width: "100%" }}
                      onChange={handleChangeColComponent}
                    >
                      {Object.keys(components).map((item) => (
                        <Select.Option key={item}>{item}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
                {state.type == "gridData" &&
                state?.currentCol?.component == "date" ? (
                  <Form.Item style={{ marginBottom: 0 }} label={"Format"}>
                    <Select
                      value={get(state.focusObj, "col.dateTimeFormat", "")}
                      size={"small"}
                      style={{ width: "100%" }}
                      onChange={handleChangeFormat}
                    >
                      {Object.keys(format).map((key) => (
                        <Select.Option key={key} value={key}>
                          {format[key].label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : null}
                {state.type !== "replicationRow" && (
                  <>
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      label={"Fixed column"}
                    >
                      <Checkbox
                        onChange={handleChangeColFixed}
                        checked={get(state.focusObj, "col.fixed", false)}
                      />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }} label={"Fixed row"}>
                      <Checkbox
                        onChange={handleChangeRowFixed}
                        checked={get(state.focusObj, "row.fixed", false)}
                      />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: 0 }}
                      label={"Have plus btn"}
                    >
                      <Checkbox
                        onChange={handleChangeColPlusBtn}
                        checked={get(state.focusObj, "col.plusBtn", false)}
                      />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }} label={"Row copied"}>
                      <Checkbox
                        onChange={handleChangeRowCopied}
                        checked={get(state.focusObj, "row.copied", false)}
                      />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }} label={"Row header"}>
                      <Checkbox
                        onChange={handleChangeRowHeader}
                        checked={get(state.focusObj, "row.isHeader", false)}
                      />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }} label={"Fields"}>
                      <Input.TextArea
                        rows={3}
                        value={state.fields}
                        size={"small"}
                        onChange={onChangeInput("fields")}
                      />
                    </Form.Item>
                  </>
                )}
              </Form>
            </Col>

            <Col
              span={24}
              className={"action-footer"}
              style={{ marginTop: 15 }}
            >
              <Button
                icon={<SaveOutlined />}
                onClick={submit}
                style={{ marginRight: "6px" }}
                type={"primary"}
                className="action-item"
              >
                {"Lưu"}
              </Button>
              <Button onClick={showDrawer(false)} className="action-item">
                {"Huỷ"}
              </Button>
            </Col>
          </Row>
        </Drawer>
      </Row>
    </Main>
  );
});

TableProperties.defaultProps = {
  state: {},
};

TableProperties.propTypes = {
  state: T.shape({}),
};

export default TableProperties;
