import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { useDispatch } from "react-redux";
import T from "prop-types";
import { Button, Popover } from "antd";
import { Main } from "./styled";
import Actions from "./Actions";
import { isEmpty } from "lodash";
import { composeRender } from "./constants";
import { MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { MODE } from "utils/editor-utils";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";

const Table = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const configComponents = useStore("config.components");

  const {
    config: { updateComponents },
    component: { init },
  } = useDispatch();

  const {
    component,
    updateContent,
    mode,
    formId,
    //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
    //values = valueEMR khi không nằm trong replication row
    valueEMR,
    form,
    formChange,
    verticalLine,
    valuesHIS,
    fileConfig,
    fileTemplate,
    template,
    level,
  } = props;
  const [state, _setState] = useState({
    visible: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const refArray = useRef([]);
  const [colSelected, setColSelected] = useState([]);
  const [defaultData, setDefaultData] = useState({});
  const itemProps = component.props || {};

  const collectComponent = () => {
    let list = [];

    itemProps.rows.forEach((row, index) =>
      itemProps.cols.forEach((col, idx) => {
        const obj = refArray.current[`block_${index}_${idx}`]
          ? refArray.current[`block_${index}_${idx}`].collect()
          : {};
        const cList = obj.components || [];

        list = [...list, ...cList, obj.component];
      })
    );

    return list.filter((item) => !!item);
  };

  const collectDefault = () => {
    return defaultData;
  };
  useImperativeHandle(ref, () => ({
    collectComponent: () => collectComponent(),
    collectDefault: () => collectDefault(),
  }));

  useEffect(() => {
    setDefaultData(itemProps.defaultData || {});
  }, [itemProps]);

  const localComponents = useMemo(() => {
    if (mode === MODE.config) {
      return configComponents;
    } else {
      const formX = fileConfig;
      if (formX) {
        return formX.components;
      }
    }
    return [];
  }, [mode, configComponents, fileConfig]);

  const handleUpdateColBox = (res) => {
    updateContent({
      ...component,
      ...res,
    });
    setColSelected([]);
    setState({
      visible: false,
    });
  };

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };

  const onChange = (value) => {
    if (formChange[itemProps.fieldName]) {
      formChange[itemProps.fieldName](value);
    }
  };

  const handleSelectCol = (key) => {
    const newList = [...colSelected, key];
    setColSelected(newList);
  };

  const handleDeselect = (key) => {
    const newList = colSelected.filter((item) => item !== key);
    setColSelected(newList);
  };

  const onColClick = (key) => () => {
    if (colSelected.includes(key)) {
      handleDeselect(key);
    } else {
      handleSelectCol(key);
    }
  };
  const handleDeleteRow = (row) => {
    setState({
      visible: false,
    });
    let props = component.props;
    props.rows = props.rows.filter((item, index) => {
      return row != item.key;
    });
    updateContent({
      ...component,
    });
    setColSelected([]);
  };
  const handleDeleteCol = (col) => {
    setState({
      visible: false,
    });
    let props = component.props;
    props.cols = props.cols.filter((item, index) => {
      return col != item.key;
    });
    updateContent({
      ...component,
    });
    setColSelected([]);
  };

  const onAddRow = (isBefore, row) => {
    setState({
      visible: false,
    });
    let props = component.props;
    let rowKeys = props.rows.map((item) => item.key);
    let newKey = Array.from(Array(rowKeys.length + 1).keys()).find((item) => {
      return !rowKeys.includes(item);
    });
    let index = props.rows.findIndex((item) => item.key == row);
    if (isBefore) index = Math.max(0, index);
    else index = Math.min(props.rows.length, index + 1);
    props.rows.splice(index, 0, { key: newKey });
    updateContent({
      ...component,
    });
    setColSelected([]);
  };

  const onAddCol = (isBefore, col) => {
    setState({
      visible: false,
    });
    let props = component.props;
    let colKeys = props.cols.map((item) => item.key);
    let newKey = Array.from(Array(colKeys.length + 1).keys()).find((item) => {
      return !colKeys.includes(item);
    });
    let index = props.cols.findIndex((item) => item.key == col);
    if (isBefore) index = Math.max(0, index);
    else index = Math.min(props.cols.length, index + 1);
    props.cols.splice(index, 0, { key: newKey });
    updateContent({
      ...component,
    });
    setColSelected([]);
  };

  const onColResize = () => {
    updateContent({
      ...component,
    });
    setColSelected([]);
  };
  const getFontSize = () => {
    if (itemProps.fontSize) return itemProps.fontSize;
    return props.fontSize;
  };
  return (
    !isEmpty(itemProps.rows) &&
    !isEmpty(itemProps.cols) && (
      <Main
        data-type="table"
        mode={mode}
        itemProps={itemProps}
        colMinHeight={itemProps.rowHeight || props.rowHeight || 24}
        lineHeightText={itemProps.lineHeightText || props.lineHeightText || 24}
        hideKhung={itemProps?.hideKhung}
      >
        {mode === MODE.config && (
          <>
            <div className="table-config">
              <Popover
                visible={state.visible}
                content={
                  <Actions
                    colSelected={colSelected}
                    rows={itemProps.rows}
                    cols={itemProps.cols}
                    itemProps={itemProps}
                    handleUpdateColBox={handleUpdateColBox}
                    handleDeleteRow={handleDeleteRow}
                    handleDeleteCol={handleDeleteCol}
                    onAddRow={onAddRow}
                    onAddCol={onAddCol}
                  />
                }
                onVisibleChange={() => {
                  setState({
                    visible: false,
                  });
                }}
                title={t("editor.thaoTac")}
              >
                <Button
                  icon={<MenuOutlined />}
                  onClick={() => {
                    setState({
                      visible: true,
                    });
                  }}
                  size={"small"}
                />
              </Popover>
              <Button
                icon={<SettingOutlined />}
                onClick={handleFocus}
                size={"small"}
              />
            </div>
          </>
        )}
        {composeRender(itemProps.type, {
          ...itemProps,
          component,
          localComponents,
          components: localComponents,
          mode,
          formId,
          //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
          //values = valueEMR khi không nằm trong replication row
          valueEMR,
          form,
          formChange,
          verticalLine,
          dataSource: form[itemProps.fieldName] || [],
          onChange,
          onColClick,
          refArray,
          colSelected,
          valuesHIS, //[dataFromHis]
          fileConfig,
          fileTemplate,
          updateContent,
          updateComponents,
          setDefaultData,
          template,
          onColResize,
          level,
          disable: props.disable,
          fontSize: getFontSize(),
          lineHeightText: itemProps.lineHeightText || props.lineHeightText,
          rowHeight: itemProps.rowHeight || props.rowHeight,
        })}
      </Main>
    )
  );
});

Table.defaultProps = {
  component: {},
  form: {},
};

Table.propTypes = {
  component: T.shape({}),
  form: T.shape({}),
};

export default React.memo(Table);
