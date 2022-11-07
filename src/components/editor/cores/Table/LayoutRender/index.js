import React, { useEffect } from "react";
import T from "prop-types";
import { Main } from "./styled";
import Block from "components/editor/config/Block";
import { getWidthCell } from "../constants";

const LayoutRender = (props) => {
  const {
    rows,
    cols,
    keysHadConfig,
    localComponents,
    onColClick,
    colSelected,
    valuesHIS,
    fileConfig,
    fileTemplate,
    refArray,
    verticalLine,
    updateComponents,
    formId,
    mode,
    component,
    form,
    formChange,
  } = props;

  useEffect(() => {}, [form]);

  return (
    <Main data-type="table-normal-render" fontSize={props.fontSize}>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
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
                  key={idx}
                  onClick={onColClick(boxKey)}
                  className={
                    colSelected.includes(boxKey) && mode === "config"
                      ? "col-selected"
                      : ""
                  }
                  colSpan={config ? config.colSpan : ""}
                  rowSpan={config ? config.rowSpan : ""}
                  data-width={col.width}
                  style={{ maxWidth: col.width + "px", width: width + "px" }}
                >
                  <div
                    className={"in-side-col"}
                    style={{ width: width + "px" }}
                  >
                    <Block
                      key={boxKey}
                      ref={(ref) => {
                        refArray.current[`block_${index}_${idx}`] = ref;
                      }}
                      verticalLine={verticalLine}
                      item={{
                        key: boxKey,
                        width: width - 3,
                      }}
                      mode={mode}
                      updateComponents={updateComponents}
                      component={com}
                      formId={formId}
                      values={form}
                      valuesHIS={valuesHIS} //[dataFromHis]
                      fileConfig={fileConfig}
                      fileTemplate={fileTemplate}
                      formChange={formChange}
                      level={props.level}
                      disable={!!props.disable}
                      fontSize={props.fontSize}
                      lineHeightText={props.lineHeightText}
                      rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
                    />
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Main>
  );
};

LayoutRender.defaultProps = {
  rows: [],
  cols: [],
};

LayoutRender.propTypes = {
  rows: T.array,
  cols: T.array,
};

export default LayoutRender;
