import React, { useEffect, useRef, useState } from "react";
import T from "prop-types";
import { Main } from "./styled";
import Block from "components/editor/config/Block";
import Cell from "./Cell";
import { ylenh } from "mokup";
import { getWidthCell } from "../constants";

const ListRender = (props) => {
  const {
    form,
    rows,
    cols,
    keysHadConfig,
    localComponents,
    valuesHIS,
    fileConfig,
    fileTemplate,
    onChange,
    mode,
    formId,
    component,
  } = props;
  const headers = rows.filter((item) => item.isHeader);
  const bottom = rows.filter((item) => item.fixed);

  const [values, setValues] = useState([]);
  const [sources, setSources] = useState([]);

  const prevValuesRef = useRef();
  const prevSourcesRef = useRef();

  useEffect(() => {
    prevValuesRef.current = values;
    prevSourcesRef.current = sources;
  });

  useEffect(() => {
    setValues(ylenh);
    setSources(ylenh);
  }, [ylenh]);

  const handleChange = (rowIndex) => (key) => (res) => {
    const prevValues = prevValuesRef.current;
    const data = prevValues.map((item, index) =>
      index === rowIndex ? { ...item, [key]: res } : item
    );

    onChange(data);
    setValues(data);
  };
  return (
    <Main data-type="table-list-render">
      <table>
        <tbody>
          {headers.map((row, index) => (
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
                    key={boxKey}
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
                        key={boxKey}
                        item={{
                          key: boxKey,
                          width: width - 2,
                        }}
                        mode={mode}
                        component={com}
                        formId={formId}
                        disable={!!props.disable}
                        fontSize={props.fontSize}
                        lineHeightText={props.lineHeightText}
                        rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
                        valuesHIS={valuesHIS} //[dataFromHis]
                        fileConfig={fileConfig}
                        fileTemplate={fileTemplate}
                      />
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}

          {sources.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {cols.map((col, idx) => {
                const row = rows[headers.length];
                const boxKey = `${component.key}_${row.key}_${col.key}`;
                const config = keysHadConfig ? keysHadConfig[boxKey] : null;
                const com = localComponents.find((c) => c.parent === boxKey);
                if (config && config.hide) {
                  return null;
                }
                const width = getWidthCell(cols, config, idx);
                if (idx === 0) {
                  return (
                    <td
                      key={`${rowIndex}_${idx}`}
                      style={{ width: col.width + "px" }}
                    >
                      <div style={{ width: width + "px" }}>{rowIndex + 1}</div>
                    </td>
                  );
                }
                if (col.fixed) {
                  return (
                    <td key={boxKey} style={{ maxWidth: col.width + "px" }}>
                      <div
                        className={"in-side-col"}
                        style={{ width: width + "px" }}
                      >
                        <Block
                          key={boxKey}
                          item={{
                            key: boxKey,
                            width: width - 2,
                          }}
                          mode={mode}
                          component={com}
                          formId={formId}
                          values={item}
                          valuesHIS={item}
                          level={props.level}
                          disable={!!props.disable}
                          fontSize={props.fontSize}
                          lineHeightText={props.lineHeightText}
                          rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
                        />
                      </div>
                    </td>
                  );
                }

                return (
                  <Cell
                    width={width - 2}
                    key={`${rowIndex}_${col.key}`}
                    col={col}
                    mode={mode}
                    rowIndex={rowIndex}
                    formId={formId}
                    defaultValues={item}
                    onChange={handleChange(rowIndex)}
                    level={props.level}
                    disabled={props.disable}
                  />
                );
              })}
            </tr>
          ))}

          {bottom.map((row, index) => (
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
                    key={boxKey}
                    style={{ maxWidth: col.width + "px" }}
                    colSpan={config ? config.colSpan : ""}
                    rowSpan={config ? config.rowSpan : ""}
                  >
                    <div
                      className={"in-side-col"}
                      style={{ width: width + "px" }}
                    >
                      <Block
                        key={boxKey}
                        item={{
                          key: boxKey,
                          width: width - 2,
                        }}
                        mode={mode}
                        component={com}
                        formId={formId}
                        values={form}
                        valuesHIS={valuesHIS}
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
      </table>
    </Main>
  );
};

ListRender.defaultProps = {
  rows: [],
  cols: [],
};

ListRender.propTypes = {
  rows: T.array,
  cols: T.array,
};

export default ListRender;
