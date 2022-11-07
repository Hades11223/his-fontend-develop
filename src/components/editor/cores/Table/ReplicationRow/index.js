import React, { useRef, useMemo, useState } from "react";
import { MainTable } from "./styled";
import Block from "components/editor/config/Block";
import { getWidthCell } from "../constants";
import stringUtils from "mainam-react-native-string-utils";
import { MODE } from "utils/editor-utils";
import { useDispatch, useSelector } from "react-redux";
import PlusButton from "./PlusButton";
import Khung from "./Khung";
const ReplicationRow = (props) => {
  const [state, _setState] = useState({
    moreRowLength: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    rows,
    cols,
    keysHadConfig,
    localComponents,
    colSelected,
    fieldName,
    updateComponents,
    formId,
    mode,
    component,
    //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
    //values = valueEMR khi không nằm trong replication row
    valueEMR,
    form,
    formChange,
    valuesHIS,
    fileConfig,
  } = props;
  const refKhung = useRef(null);
  const { refValues } = useSelector((state) => state.files);
  const onAddRow = (e) => {
    refKhung.current && refKhung.current.onAddRow();
  };

  const checkDisableWhenRowSigned = (rowKey, values = {}) => {
    let rowProps =
      (component.props.rows || []).find((item) => item.key == rowKey) || {};
    let signKey = rowProps.signedField || "";
    return values[signKey + "_chuKy"];
  };
  const firstRow = useMemo(() => {
    return rows
      .filter((row) => !row.rowKey)
      .map((row) => {
        const disable = checkDisableWhenRowSigned(row.key, refValues);
        return (
          <tr key={row.key}>
            {cols.map((col, idx) => {
              const boxKey = `${component.key}_${row.key}_${col.key}`;
              const com = localComponents.find((c) => c.parent === boxKey);
              const config = keysHadConfig ? keysHadConfig[boxKey] : null;

              if (config && config.hide) {
                return null;
              }
              const width = getWidthCell(cols, config, idx);

              return (
                <td
                  key={col.key}
                  className={
                    colSelected.includes(boxKey) && mode === MODE.config
                      ? "col-selected"
                      : ""
                  }
                  colSpan={config ? config.colSpan : ""}
                  rowSpan={config ? config.rowSpan : ""}
                  data-width={col.width}
                  style={{ maxWidth: col.width + "px" }}
                >
                  <div
                    className={"in-side-col"}
                    style={{ width: width + "px" }}
                  >
                    <Block
                      item={{
                        key: boxKey,
                        width: width - 2,
                      }}
                      mode={mode}
                      updateComponents={updateComponents}
                      component={com}
                      formId={formId}
                      form={form}
                      //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
                      //values = valueEMR khi không nằm trong replication row
                      valueEMR={valueEMR}
                      values={form}
                      formChange={formChange}
                      key={boxKey}
                      level={props.level}
                      disable={!!(props.disable || disable)}
                      fontSize={props.fontSize}
                      lineHeightText={props.lineHeightText}
                      rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
                      valuesHIS={valuesHIS} //[dataFromHis]
                      fileConfig={fileConfig}
                    />
                  </div>
                </td>
              );
            })}
          </tr>
        );
      });
  }, [rows, component, form, localComponents, valuesHIS, refValues]);
  const onRowsLengthChange = (rows = []) => {
    setState({ moreRowLength: rows.length });
  };
  return (
    <>
      <MainTable data-type="table-replication-row">
        <tbody>
          {firstRow}
          <Khung
            rows={rows}
            cols={cols}
            ref={refKhung}
            checkDisableWhenRowSigned={checkDisableWhenRowSigned}
            fieldName={fieldName}
            colSelected={colSelected}
            fileConfig={fileConfig}
            formChange={formChange}
            mode={mode}
            updateComponents={updateComponents}
            component={component}
            formId={formId}
            form={form}
            localComponents={localComponents}
            keysHadConfig={keysHadConfig}
            //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
            //values = valueEMR khi không nằm trong replication row
            valueEMR={valueEMR}
            valuesHIS={valuesHIS} //[dataFromHis]
            level={props.level}
            disable={props.disable}
            fontSize={props.fontSize}
            lineHeightText={props.lineHeightText}
            rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
            onRowsLengthChange={onRowsLengthChange}
          />
        </tbody>
      </MainTable>

      {mode === MODE.editing &&
        (props.maxRow ? state.moreRowLength < props.maxRow - 1 : true) &&
        !props.hideBtnAddRow && <PlusButton onAddRow={onAddRow} />}
    </>
  );
};

export default React.memo(ReplicationRow);
