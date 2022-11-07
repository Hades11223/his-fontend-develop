import React, { useEffect, useRef, useState } from "react";
import T from "prop-types";
import { Main } from "./styled";
import Block from "components/editor/config/Block";
import Cell from "./Cell";
import { getWidthCell } from "../constants";
const BlockRender = (props) => {
  const {
    rows,
    cols,
    components,
    keysHadConfig,
    mode,
    component,
    dataSource,
    onChange,
    defaultRows,
    disabled,
    valuesHIS,
    fileConfig,
    fileTemplate,
  } = props;
  const [values, setValues] = useState({});
  const [defaultValues, setDefaultValues] = useState({});
  const [formChange, setFormChange] = useState({});
  const [sources, setSources] = useState([]);

  const prevValuesRef = useRef();
  const prevSourcesRef = useRef();

  useEffect(() => {
    prevValuesRef.current = values;
    prevSourcesRef.current = sources;
  });

  useEffect(() => {
    const data = {};

    if (dataSource.length > 0) {
      setSources(dataSource);
      dataSource.forEach((item, index) => {
        cols.forEach((col) => {
          data[`${index}_${col.colKey}`] = item[col.colKey];
          setDefaultValues(data);
        });
      });
    } else {
      const defaultList = [];
      for (let i = 0; i < defaultRows; i++) {
        const obj = cols.reduce(
          (res, col) => ({
            ...res,
            [col.colKey]: "",
          }),
          {}
        );
        defaultList.push(obj);
      }
      setSources(defaultList);

      defaultList.forEach((item, index) => {
        cols.forEach((col) => {
          data[`${index}_${col.colKey}`] = item[col.colKey];
          setDefaultValues(data);
        });
      });
    }
  }, [dataSource]);

  const setFormKey = (key) => (value) => {
    const prevValues = prevValuesRef.current;
    const prevSources = prevSourcesRef.current;

    const newForm = { ...prevValues, [key]: value };
    setValues(newForm);

    const keySplit = key.split("_");

    const output = prevSources.map((item, index) =>
      index === parseInt(keySplit[0])
        ? {
            ...item,
            [keySplit[1]]: value,
          }
        : item
    );

    setSources(output);
    onChange(output);
  };

  useEffect(() => {
    const data = {};
    sources.forEach((item, index) => {
      cols.forEach((col) => {
        data[`${index}_${col.colKey}`] = item[col.colKey];
        setValues(data);
      });
    });
  }, [sources]);

  useEffect(() => {
    const obj = Object.keys(values).reduce(
      (result, key) => ({
        ...result,
        [key]: setFormKey(key),
      }),
      {}
    );

    setFormChange(obj);
  }, [values]);

  return (
    <Main data-type="table-grid">
      <table>
        <tbody>
          {rows.map((row, rowIndex) => {
            if (rowIndex === 0) {
              return (
                <tr key={rowIndex}>
                  {cols.map((col, idx) => {
                    const boxKey = `${component.key}_${row.key}_${col.key}`;
                    const com = components.find((c) => c.parent === boxKey);
                    const config = keysHadConfig ? keysHadConfig[boxKey] : null;

                    if (config && config.hide) {
                      return null;
                    }

                    const width = getWidthCell(cols, config, idx);

                    return (
                      <td key={col.key} style={{ maxWidth: col.width + "px" }}>
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
                            component={com}
                            level={props.level}
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
              );
            }

            return null;
          })}

          {sources.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {cols.map((col) => (
                <Cell
                  key={`${rowIndex}_${col.key}`}
                  col={col}
                  mode={mode}
                  formChange={formChange}
                  defaultValues={defaultValues}
                  valuesHIS={valuesHIS}
                  fileConfig={fileConfig}
                  fileTemplate={fileTemplate}
                  rowIndex={rowIndex}
                  disabled={!!disabled || props.disable}
                  level={props.level}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Main>
  );
};

BlockRender.defaultProps = {
  dataSource: [],
  onChange: () => {},
  defaultRows: 1,
};

BlockRender.propTypes = {
  dataSource: T.arrayOf(T.shape({})),
  onChange: T.func,
  defaultRows: T.number,
};

export default BlockRender;
