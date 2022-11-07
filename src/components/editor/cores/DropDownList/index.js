import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useContext,
  useMemo,
} from "react";
import T from "prop-types";
import { Main } from "./styled";
import TextEdit from "components/editor/cores/TextEdit";
import { useDispatch } from "react-redux";
import { MODE } from "utils/editor-utils";
import { Select } from "antd";
import { client } from "client/request";
import lodash from "lodash";
import cacheUtils from "utils/cache-utils";
import iconRemove from "assets/svg/cancel.svg";
import Icon from "@ant-design/icons";
import { useStore } from "hook";
import EMRContext from "pages/editor/context/EMR";

const DropDownList = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    disable: false,
    itemFocused: {},
    values: [],
    localCheckList: [],
    listOptionFromApi: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const context = useContext(EMRContext);
  const {
    component: { init },
  } = useDispatch();
  const signStatus = useStore("files.signStatus", {});

  const {
    component,
    mode,
    formChange,
    form,
    //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
    //values = valueEMR khi không nằm trong replication row
    valueEMR,
    valuesHIS,
    textTransform,
    blockWidth,
  } = props;

  const labelRef = useRef(null);
  const mainRef = useRef(null);
  const label = mode === MODE.config ? "label" : "";
  const itemProps = component.props || {};

  useEffect(() => {
    const isDisable = context.isDisable;
    let disable =
      isDisable({ itemProps, signStatus, props }) || itemProps.disabled;
    if (state.disable != disable) {
      setState({
        disable,
      });
    }
  }, [
    signStatus,
    itemProps,
    props.valuesHIS, //[dataFromHis]
    props.disable,
  ]);

  useImperativeHandle(ref, () => ({
    collectCheckList: () => {
      let newLocalCheckList = (state.localCheckList || []).map((item) => {
        item.label = item.labelValue;
        // item.label = item.labelValue;
        return item;
      });
      return newLocalCheckList;
    },
    collectLabel: () => {
      return state.labelValue;
    },
  }));

  const handleFocusItem = (item) => () => {
    setState({
      itemFocused: item,
    });
  };

  useEffect(() => {
    //nếu loại là dữ liệu tự chọn
    if (!itemProps.listType || itemProps.listType == 2) {
      setState({
        localCheckList: itemProps.checkList,
        labelValue: itemProps.label || itemProps.labelValue,
      });
    }
  }, [itemProps]);

  useEffect(() => {
    //nếu loại là lấy dữ liệu từ api
    if (!(!itemProps.listType || itemProps.listType == 2)) {
      getData();
    }
  }, [itemProps, valueEMR, valuesHIS, form]);

  const getData = async () => {
    if (mode == MODE.config) return;
    let api = itemProps.dataApi + "";
    const listVariable = itemProps.variable || []; //lấy danh sách các tham số đã khai báo
    listVariable.forEach((variable) => {
      //duyệt qua danh sách các tham số
      if (variable.value) {
        let value = "";
        if (!variable.fromEMR) {
          value = valuesHIS[variable.value];
        } else {
          value = form[variable.value]; //lấy giá trị tương ứng với tham số
          if (value === undefined) {
            //nếu không có dữ liệu thì lấy từ valueEMR global
            value = (valueEMR || {})[variable.value] || "";
          }
        }
        api = api.replaceAll(`{${variable?.name || ""}}`, value); //replace tham số với giá trị nhận được
        //tham số truyền vào api sẽ có rule như sau: {tenThamSo}
      }
    });

    //sau khi replace xong theo tham số khai báo mà vẫn còn các tham số thì sẽ lấy mặc định
    //các dữ liệu sẽ được replace theo dữ liệu của patient
    api = context.fillDataToParams ? context.fillDataToParams(api) : api;
    const data = await cacheUtils.read("DROPDOWNLIST", api, [], false);
    setState({
      listOptionFromApi: data,
      labelValue: itemProps.label || itemProps.labelValue,
    });

    client.get(api).then((s) => {
      if (s?.data?.code == 0) {
        const data = (s?.data?.data || []).filter((item, index, self) => {
          return (
            self.findIndex(
              (item2) =>
                lodash.get(item2, itemProps.fieldValue, "") ==
                lodash.get(item, itemProps.fieldValue, "")
            ) == index
          );
        });
        cacheUtils.save("DROPDOWNLIST", api, data, false);
        setState({
          listOptionFromApi: data,
          labelValue: itemProps.label || itemProps.labelValue,
        });
      }
    });
  };

  useEffect(() => {
    let values = form[itemProps.fieldName] || [];
    if (Array.isArray(values)) {
      if (itemProps.type === "onlyOne") {
        values = values.map((item) => item + "")[0] || "";
      } else {
        values = values.map((item) => item + "");
      }
    } else {
      values = values + "";
    }
    setState({
      values,
    });
  }, [form]);

  const handleBlueItem = () => {
    setState({
      itemFocused: {},
    });
  };

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  const handleOnChange = (value) => {
    if (state.disable) {
      return;
    }
    if (itemProps.type === "onlyOne") {
      if (itemProps.fieldName && formChange[itemProps.fieldName]) {
        if (state.values.includes(value)) {
          setState({
            values: [],
          });
          itemProps.fieldName && formChange[itemProps.fieldName]("");
        } else {
          setState({
            values: [value],
          });
          formChange[itemProps.fieldName](value);
        }
      }
    } else {
      if (itemProps.fieldName && formChange[itemProps.fieldName]) {
        setState({
          values: value,
        });
        if (itemProps.fieldName && formChange[itemProps.fieldName])
          formChange[itemProps.fieldName](value);
      }
    }
  };
  const handleClear = () => {
    setState({
      values: [],
    });
    itemProps.fieldName && formChange[itemProps.fieldName]("");
  };

  const lineHeightText =
    (((itemProps.fontSize || props.fontSize) * 4) / 3) *
    (itemProps.lineHeight || props.lineHeightText);
  let minHeight = itemProps.line
    ? itemProps.line * lineHeightText
    : lineHeightText;

  const renderOptionFromApi = (item, index) => {
    return (
      <Select.Option
        key={index}
        value={lodash.get(item, itemProps.fieldValue, "") + ""}
      >
        {lodash.get(item, itemProps.fieldDisplay, "")}
      </Select.Option>
    );
  };
  const filterOption = (input, option) => {
    try {
      return (
        option.props.children
          ?.toLowerCase()
          .createUniqueText()
          .indexOf(input.toLowerCase().createUniqueText()) >= 0
      );
    } catch (error) {
      return true;
    }
  };

  const text = useMemo(() => {
    return (state.localCheckList || []).find(
      (item) => item.value == state.values
    )?.labelValue;
  }, [state.localCheckList, state.values]);
  return (
    <Main
      ref={mainRef}
      onClick={handleFocus}
      itemProps={itemProps}
      hadLabel={!!itemProps.label}
      data-type="dropdownlist"
      showMarkSpanRow={
        itemProps.markSpanRow === undefined ? true : itemProps.markSpanRow
      }
      lineHeight={lineHeightText}
      minHeight={minHeight}
      fontSize={itemProps.fontSize || props.fontSize} //parrent font size
      contentAlign={itemProps.contentAlign || "left"}
      mode={mode}
      disabled={state.disable}
      minRow={itemProps.minRow || 1} //số dòng mặc định
      readOnly={itemProps.readOnly}
      fontWeight={itemProps.bold ? "bold" : ""}
      fontStyle={itemProps.italic ? "italic" : ""}
      textDecoration={itemProps.underline ? "underline" : ""}
    >
      {!itemProps.noLabel && (
        <TextEdit
          id={`${component.type}_${component.key}`}
          className={"text-field-label"}
          defaultValue={itemProps.label || label}
          ref={labelRef}
          mode={mode}
          onChange={(value) => {
            setState({
              labelValue: value,
            });
          }}
          textTransform={textTransform}
          width={itemProps.labelWidth}
          disabled={false} //allow edit in config mode
        />
      )}
      {itemProps.displayText ? (
        <div className="text-select">
          {mode !== MODE.config ? text : "text"}
        </div>
      ) : (
        <>
          {itemProps.listType == 1 || state.localCheckList?.length > 0 ? (
            <>
              <Select
                dropdownStyle={props.dropdownStyle}
                onChange={handleOnChange}
                disabled={state.disable}
                style={{ width: blockWidth }}
                mode={itemProps.type === "onlyOne" ? "default" : "multiple"}
                value={state.values}
                showSearch
                filterOption={filterOption}
              >
                {itemProps.listType == 2
                  ? state.localCheckList.map((item) => {
                      return (
                        <Select.Option key={item.key} value={item.value + ""}>
                          {item.label || ""}
                        </Select.Option>
                      );
                    })
                  : (state.listOptionFromApi || []).map((item, index) => {
                      return renderOptionFromApi(item, index);
                    })}
              </Select>
              {!state.disable &&
              !itemProps.readOnly &&
              itemProps.type == "onlyOne" &&
              state?.values.length !== 0 ? (
                <Icon
                  className="icon-clear"
                  component={iconRemove}
                  onClick={handleClear}
                />
              ) : null}
            </>
          ) : (
            <span>{"DropDownList"}</span>
          )}
        </>
      )}
    </Main>
  );
});

DropDownList.defaultProps = {
  form: {},
  component: {
    props: {
      checkList: [],
      direction: "ltr",
    },
  },
  line: {},
  disabled: false,
  mode: MODE.config,
};

DropDownList.propTypes = {
  form: T.shape({}),
  component: T.shape({}),
  line: T.shape({}),
  updateContent: T.func,
  disabled: T.bool,
  mode: T.string,
};

export default DropDownList;
