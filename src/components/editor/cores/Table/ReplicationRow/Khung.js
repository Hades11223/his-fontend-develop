import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
  memo,
} from "react";
import moment from "moment";
import { convert } from "utils/editor-utils";
import { combineFields } from "utils/editor-utils";
import stringUtils from "mainam-react-native-string-utils";
import Row from "./Row";
import { get } from "lodash";
const Khung = forwardRef((props, ref) => {
  const {
    rows,
    cols,
    checkDisableWhenRowSigned,
    fieldName,
    colSelected,
    fileConfig,
    formChange,
    mode,
    updateComponents,
    component,
    formId,
    form,
    localComponents,
    keysHadConfig,
    //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
    //values = valueEMR khi không nằm trong replication row
    valueEMR,
    valuesHIS,
    onRowsLengthChange,
  } = props;
  const [state, _setState] = useState({
    tableRows: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const prevValuesRef = useRef([]);

  useImperativeHandle(ref, () => ({
    onAddRow,
  }));

  const rowCopy = useMemo(() => {
    return (rows || []).find((r) => r.rowKey);
  }, [rows]);
  const setFormKey = (rowKey) => (key) => (value) => {
    if (!prevValuesRef.current) prevValuesRef.current = [];
    let obj = prevValuesRef.current.find((item) => item.key === rowKey);

    if (!obj) {
      prevValuesRef.current.push({ key: rowKey, [key]: value });
    } else {
      prevValuesRef.current = prevValuesRef.current.map((item) =>
        item.key === rowKey ? { ...obj, [key]: value } : item
      );
    }
    formChange[fieldName](
      prevValuesRef.current.map((item) => {
        const convertData = convert(item);
        const value = convertData[fieldName];
        if (value) return value;
        return get(convertData, fieldName.replaceAll("_", "."));
      })
    );
  };

  useEffect(() => {
    const tableValue = form[fieldName] ? form[fieldName] : []; //check nếu table được cấu hình fieldName
    if (tableValue.length < 1 && state.tableRows.length < 1) {
      //nếu không được cấu hình fieldName hoặc form data đang empty thì tiến hành thêm mới dòng
      onAddRow();
    } else {
      if (tableValue.length > 0) {
        prevValuesRef.current = tableValue.map((item, index) => ({
          ...combineFields(item, {}, fieldName),
          index,
          key: index,
          takeMe: true,
        }));
        setState({
          tableRows: tableValue.map((item, index) => ({
            mainKey: rowCopy.key,
            key: index,
          })),
        });
        onRowsLengthChange && onRowsLengthChange(tableValue);
      }
    }
  }, [form]);

  const onAddRow = (e) => {
    debugger;
    if (rowCopy) {
      const obj = { mainKey: rowCopy.key, key: moment().valueOf() };
      const tableRows = [...state.tableRows, obj];
      setState({
        tableRows,
      });
      onRowsLengthChange && onRowsLengthChange(tableRows);
    }
  };
  const formChangeKeys = useMemo(() => {
    return Object.keys(formChange).filter(
      (key) =>
        key.split("_")[0] === fieldName || key.indexOf(fieldName + "_") == 0
    );
  }, [formChange]);
  const onChange = (row) => {
    const rowKey = row.key;
    const obj = {};
    formChangeKeys.forEach((key) => {
      obj[key] = setFormKey(rowKey)(key);
    });
    obj.getAllData = () => {
      return form;
    };
    obj.setMultiData = (data = {}) => {
      let newState = {};
      const prevValues = prevValuesRef.current;
      const value = prevValues.find((item) => item.key === rowKey);
      let newForm = prevValues;
      if (!value) {
        const newValue = { key: rowKey, ...data };
        newForm.push(newValue);
      } else {
        const newValue = { ...value, ...data };
        newForm = prevValues.map((item) =>
          item.key === rowKey ? newValue : item
        );
      }
      prevValuesRef.current = newForm;
      setState(newState);
      formChange[fieldName](
        newForm.map((item) => {
          const convertData = convert(item);
          const value = convertData[fieldName];
          if (value) return value;
          return get(convertData, fieldName.replaceAll("_", ""));
        })
      );
    };
    return obj;
  };

  return state.tableRows.map((row, index) => {
    const rowValue = prevValuesRef.current.find((item) => item.key === row.key);
    const disable = checkDisableWhenRowSigned(row.mainKey, rowValue);
    const onChangeRow = onChange(row);
    return (
      <Row
        rowValue={rowValue}
        key={row.key}
        rowIndex={index}
        mode={mode}
        formId={formId}
        //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
        //values = valueEMR khi không nằm trong replication row
        updateComponents={updateComponents}
        formChange={onChangeRow}
        valueEMR={valueEMR}
        valuesHIS={valuesHIS} //[dataFromHis]
        fileConfig={fileConfig}
        cols={cols}
        component={component}
        row={row}
        keysHadConfig={keysHadConfig}
        localComponents={localComponents}
        colSelected={colSelected}
        level={props.level}
        disable={props.disable || disable}
        fontSize={props.fontSize}
        lineHeightText={props.lineHeightText}
        rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
      />
    );
  });
});

export default memo(Khung);
