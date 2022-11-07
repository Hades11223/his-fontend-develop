import React, { useContext, useEffect, useRef, useState } from "react";
import T from "prop-types";
import { Main } from "./styled";
import Block from "components/editor/config/Block";
import Cell from "./Cell";
import { getWidthCell } from "../constants";
import { cloneDeep } from "lodash";
import { useStore } from "hook";
import EMRContext from "pages/editor/context/EMR";
const TomTatBenhAn = (props) => {
  const {
    rows,
    cols,
    components,
    keysHadConfig,
    mode,
    fontSize,
    component,
    valuesHIS,
    fileConfig,
    fileTemplate,
    hideHeader,
    hideKhung,
    formChange,
    form,
  } = props;
  const itemProps = component.props || {};
  itemProps.disabled = false;
  const signStatus = useStore("files.signStatus", {});
  const context = useContext(EMRContext);
  const [state, _setState] = useState({
    disable: false,
    values: [],
  });
  const valuesRef = useRef([]);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    if (form[itemProps?.fieldName]) {
      const fieldName = (itemProps?.fieldName || "").split("_")[1];
      let mapData = [];
      if (fieldName === "cls") {
        mapData = (form["ketQuaCls"][fieldName] || []).map((item) => ({
          ten: item?.ten + (item?.ketLuan ? `: ${item?.ketLuan} ` : " "),
          donViTinh: null,
          ketLuan: null,
          ma: item?.ma,
          ketQua: null,
        }));
      } else {
        mapData = (form[itemProps?.fieldName] || []).map((item) => ({
          ten:
            item?.ten +
            (item?.ketQua ? `: ${item?.ketQua} ` : " ") +
            (item?.donViTinh || ""),
          donViTinh: null,
          ketLuan: null,
          ma: item?.ma,
          ketQua: null,
        }));
      }
      valuesRef.current = mapData;
      setState({ values: mapData });
    }
  }, [form]);
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
  const handleAdd = (index) => {
    const newValue = {
      donViTinh: null,
      ketQua: null,
      ten: "text",
      ma: null,
      ketLuan: null,
    };
    let newData = cloneDeep(valuesRef.current);
    newData.splice(index + 1, 0, newValue);
    valuesRef.current = newData;
    setState({
      values: newData,
    });
    if (formChange[itemProps.fieldName]) {
      formChange[itemProps.fieldName](newData);
    }
  };
  const handleDelete = (index) => {
    const data = state.values.filter((item, i) => i !== index);
    valuesRef.current = data;
    setState({
      values: data,
    });
    if (formChange[itemProps.fieldName]) {
      formChange[itemProps.fieldName](data);
    }
  };

  return (
    <Main
      className="layout-middle"
      data-type="table-phieu-ttba"
      hideKhung={hideKhung}
      mode={mode}
      fontSize={fontSize}
    >
      <table>
        <thead className="table-head">
          {!hideHeader
            ? null
            : rows.map((row, rowIndex) => {
                if (rowIndex === 0) {
                  return (
                    <tr key={rowIndex}>
                      {cols.map((col, idx) => {
                        const boxKey = `${component.key}_${row.key}_${col.key}`;
                        const com = components.find((c) => c.parent === boxKey);
                        const config = keysHadConfig
                          ? keysHadConfig[boxKey]
                          : null;

                        if (config && config.hide) {
                          return null;
                        }
                        const width = getWidthCell(cols, config, idx);
                        return (
                          <td
                            key={col.key}
                            style={{
                              maxWidth: col.width + "px",
                            }}
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
                                component={com}
                                level={props.level}
                                disable={state?.values}
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
        </thead>
        <tbody className="table-tbody">
          {rows.map((row, rowIndex) => {
            if (rowIndex !== rows.length - 1) {
              return (
                <tr key={rowIndex}>
                  {cols.map((col, index) => {
                    const position = rowIndex * cols.length + index;
                    return (
                      <Cell
                        numberElement={rows.length * cols.length}
                        key={`${rowIndex}_${col.key}`}
                        col={col}
                        mode={mode}
                        data={state?.values}
                        index={position}
                        formChange={formChange}
                        itemProps={itemProps}
                        valuesHIS={valuesHIS}
                        fileConfig={fileConfig}
                        valuesRef={valuesRef}
                        rowIndex={rowIndex}
                        disabled={state?.disable}
                        level={props.level}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                      />
                    );
                  })}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </Main>
  );
};

TomTatBenhAn.defaultProps = {
  dataSource: [],
  onChange: () => {},
  defaultRows: 1,
};

TomTatBenhAn.propTypes = {
  dataSource: T.arrayOf(T.shape({})),
  onChange: T.func,
  defaultRows: T.number,
};

export default TomTatBenhAn;
