import React, { memo } from "react";
import Block from "components/editor/config/Block";
import { getWidthCell } from "../constants";
import stringUtils from "mainam-react-native-string-utils";
import { MODE } from "utils/editor-utils";
const Row = ({ row, rowIndex, cols, colSelected, keysHadConfig, ...props }) => {
  const {
    rowValue,
    //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
    //values = valueEMR khi không nằm trong replication row
    valueEMR,
    valuesHIS,
    localComponents,
    updateComponents,
    formId,
    mode,
    component,
    formChange,
    fileConfig,
  } = props;
  return (
    <tr>
      {cols.map((col, idx) => {
        const checkDisable = () => {
          const listColDisable = (component.props?.listColDisable || []).map(
            (item) => item - 1
          );
          let disbale = false;
          if (
            component.props.disableToRow &&
            component.props.disableToRow > rowIndex
          ) {
            if (listColDisable.includes(idx)) {
              disbale = true;
            }
          }
          return disbale;
        };
        const disabled = checkDisable();
        const boxKey = `${component.key}_${row.mainKey}_${col.key}`;
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
            style={{ maxWidth: col.width + "px" }}
            colSpan={config ? config.colSpan : ""}
            rowSpan={config ? config.rowSpan : ""}
          >
            <div className={"in-side-col"} style={{ width: width + "px" }}>
              <Block
                item={{
                  key: boxKey,
                  width: width - 2,
                }}
                mode={mode}
                updateComponents={updateComponents}
                component={com}
                formId={formId}
                //value emr global sử dụng trong replication row khi replication row truyền vào là form chính là valuerow
                //values = valueEMR khi không nằm trong replication row
                valueEMR={valueEMR}
                values={rowValue}
                valuesHIS={valuesHIS} //[dataFromHis]
                fileConfig={fileConfig}
                formChange={formChange}
                key={boxKey}
                level={props.level}
                disable={disabled}
                fontSize={props.fontSize}
                lineHeightText={props.lineHeightText}
                rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
              />
            </div>
          </td>
        );
      })}
    </tr>
  );
};

export default memo(Row);
