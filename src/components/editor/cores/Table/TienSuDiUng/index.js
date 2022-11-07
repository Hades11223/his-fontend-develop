import React, { useState, useEffect, useRef } from "react";
import { MainTable } from "./styled";
import Block from "components/editor/config/Block";
import Resizeable from "components/editor/config/Block/Resizeable";
import { getWidthCell } from "../constants";
import TextEdit from "components/editor/cores/TextEdit";
import MultipleLine from "components/editor/config/MultipleLine";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
const TienSuDiUng = (props) => {
  const {
    rows,
    cols,
    keysHadConfig,
    localComponents,
    onColClick,
    colSelected,
    valuesHIS,
    verticalLine,
    updateComponents,
    formId,
    mode,
    component,
    form,
    formChange,
    updateContent,
  } = props;
  const itemProps = component.props || {};
  const refCols = useRef(null);
  const [state, _setState] = useState({
    rows: [],
    cols: [],
    data: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    refCols.current = state.cols;
  });
  useEffect(() => {
    if (rows?.length != 6) {
      setState({
        rows: Array.from(Array(6).keys()).map((item, index) => ({
          key: index + 1,
        })),
      });
    } else {
      setState({
        rows: rows,
      });
    }
  }, [rows]);

  useEffect(() => {
    if (cols?.length != 6) {
      setState({
        cols: Array.from(Array(6).keys()).map((item, index) => ({
          key: index + 1,
          width: getCols(index),
        })),
      });
    } else {
      setState({
        cols: cols,
      });
    }
  }, [cols]);

  useEffect(() => {
    let data = [];
    Array.from(Array(6).keys()).forEach((item, index) => {
      data[index] = form[component?.props?.fieldName + (index + 1)] || [];
    });
    setState({
      data: data.map((item) => {
        if (item.length == 0) {
          item.push({ isNew: true });
        }
        return item;
      }),
    });
  }, [form]);

  const resizeable = (currentItem, nextItem) => {
    let first = (refCols.current || []).find(
      (item) => item.key == currentItem?.key
    ); //lấy ra ô đầu
    let last =
      (refCols.current || []).find((item) => item.key == nextItem?.key) || {}; // và ô tiếp theo
    if (currentItem.width < 26) {
      //nếu check nhỏ hơn 26 (kích thước tối thiểu để hiển thị 1 ô, bao gồm cả nút thêm component)
      currentItem.width = 26; //thì width o đấy là 26
      last.width = first.width + last.width - 26; //đồng thời update lại widht ô tiếp theo bằng tổng 2 ô ban đầu trừ cho 26
      nextItem.width = last.width; //update lại các giá trị thay đổi
    }
    if (nextItem.width < 26 && nextItem.key) {
      //tương tự với ô tiếp theo mà nhỏ hơn 26 thì tính toán lại từ đầu
      nextItem.width = 26;
      first.width = first.width + last.width - 26;
      currentItem.width = first.width;
    }

    if (first) first.width = currentItem.width; //cập nhật lại giá trị width cho các ô
    if (last) last.width = nextItem?.width; //cập nhật lại giá trị width cho các ô

    const newProps = { ...component.props, cols: refCols.current || [] };
    updateContent({
      ...component,
      props: { ...newProps },
    });
  };

  const getCols = (index) => {
    switch (index) {
      case 0:
        return 40;

      case 1:
        return 254;

      case 2:
        return 190;

      case 3:
        return 80;

      case 4:
        return 80;

      case 5:
        return 190;

      default:
        return 50;
    }
  };
  const getHeader = (idx) => {
    switch (idx) {
      case 0:
        return (
          itemProps["header" + idx] ||
          "<div  style='text-align: center;'><b>STT</b></div>"
        );
      case 1:
        return (
          itemProps["header" + idx] ||
          "<div  style='text-align: center;'><b>Nội dung</b></div>"
        );
      case 2:
        return (
          itemProps["header" + idx] ||
          "<div  style='text-align: center;'><b>Tên thuốc, dị<br/>nguyên gây dị ứng</b></div>"
        );
      case 3:
        return (
          itemProps["header" + idx] ||
          "<div  style='text-align: center;'><b>Có/Số<br />lần</b></div>"
        );
      case 4:
        return (
          itemProps["header" + idx] ||
          "<div  style='text-align: center;'><b>Không</b></div>"
        );
      case 5:
        return (
          itemProps["header" + idx] ||
          "<div  style='text-align: center;'><b>Biểu hiện Lâm sàng <br /> - xử trí</b></div>"
        );
      default:
        return itemProps.header0 || "STT";
    }
  };
  const onChangeHeader = (col) => (value) => {
    component.props["header" + col] = value;
  };

  const getColData = (colIndex, dongIndex, lineIndex) => {
    if (component.props["row_" + dongIndex + "_" + colIndex])
      return component.props["row_" + dongIndex + "_" + colIndex];
    if (lineIndex != -1) {
      let data = state.data;
      if (!data[dongIndex]) data[dongIndex] = [];
      let key = getKey(colIndex);
      if (data[dongIndex][lineIndex]) return data[dongIndex][lineIndex][key];
    } else {
      switch (colIndex) {
        case 1:
          switch (dongIndex) {
            case 0:
              return "Loại thuốc hoặc di nguyên nào đã gây dị ứng?";
            case 1:
              return "Dị ứng với loại côn trùng nào?";
            case 2:
              return "Dị ứng với loại thực phẩm nào?";
            case 3:
              return "Dị ưng với các tác nhân khác: Phấn hoa, bụi nhà, hoá chất, mỹ phẩm...?";
            case 4:
              return "Tiền sử cá nhân có bệnh dị ứng nào? (viêm mũi dị ứng, hen phế quản...)";
            case 5:
              return "Tiền sử cá nhân có bệnh dị ứng nào? (viêm mũi dị ứng, hen phế quản...)";
          }
      }
    }
  };

  const onChangeContent = (col, row) => (value) => {
    component.props["row_" + col + "_" + row] = value;
  };

  const onAddNewLine = (dongIndex) => () => {
    let data = state.data;
    if (!data[dongIndex]) data[dongIndex] = [];
    data[dongIndex].push({
      isNew: true,
    });
    if (formChange[itemProps.fieldName + (dongIndex + 1)])
      formChange[itemProps.fieldName + (dongIndex + 1)](data[dongIndex]);
    setState({
      data: [...data],
    });
  };

  const onDeleteLine = (dongIndex, lineIndex) => () => {
    let data = state.data;
    if (!data[dongIndex]) data[dongIndex] = [];
    if (data[dongIndex][lineIndex]) {
      data[dongIndex].splice(lineIndex, 1);
    }
    if (formChange[itemProps.fieldName + (dongIndex + 1)])
      formChange[itemProps.fieldName + (dongIndex + 1)](data[dongIndex]);

    setState({
      data: [...data],
    });
  };

  const getKey = (cotIndex) => {
    let key = "tenThuoc";
    switch (cotIndex) {
      case 2:
        key = "tenThuoc";
        break;
      case 3:
        key = "soLan";
        break;
      case 4:
        key = "khong";
        break;
      case 5:
        key = "bieuHienLamSang";
        break;
    }
    return key;
  };
  const handleOnChange = (cotIndex, dongIndex, lineIndex) => (value) => {
    let data = state.data;
    if (!data[dongIndex]) data[dongIndex] = [];
    if (!data[dongIndex][lineIndex]) data[dongIndex][lineIndex] = {};
    let key = getKey(cotIndex);
    data[dongIndex][lineIndex][key] = value.htmlValue;
    if (formChange && formChange[itemProps.fieldName + (dongIndex + 1)])
      formChange[itemProps.fieldName + (dongIndex + 1)](data[dongIndex]);
  };
  return (
    <MainTable>
      <tbody>
        <tr>
          {Array.from(Array(6).keys()).map((_col, idx) => {
            const col = getCols(idx);
            const boxKey = `${component.key}_${-1}_${idx}`;
            // const com = localComponents.find((c) => c.parent === boxKey);
            const config = keysHadConfig ? keysHadConfig[boxKey] : null;

            if (config && config.hide) {
              return null;
            }

            const width = getWidthCell(state.cols, null, idx);
            return (
              <td
                key={idx}
                className={
                  colSelected.includes(boxKey) && mode === "config"
                    ? "col-selected"
                    : ""
                }
                data-width={width}
                style={{ maxWidth: width + "px" }}
              >
                <div style={{ width: col.width + "px" }}>
                  <TextEdit
                    id={`${component.type}_${component.key}_${idx}`}
                    className={"text-field-label"}
                    defaultValue={getHeader(idx)}
                    mode={mode}
                    onChange={onChangeHeader(idx)}
                    width={width}
                    disable={state.disable}
                  />
                </div>
                {mode == "config" && (
                  <Resizeable
                    verticalLine={verticalLine}
                    resizeable={resizeable}
                    currentItemProps={
                      state.cols[idx + (config?.colSpan || 1) - 1]
                    }
                    nextItemProps={state.cols[idx + (config?.colSpan || 1)]}
                  />
                )}
              </td>
            );
          })}
        </tr>
        {state.data.map((dong, dongIndex) => {
          if (dong.length == 0)
            dong = [
              {
                isNew: true,
              },
            ];
          let rows = dong.map((item, lineIndex) => {
            return (
              <tr key={lineIndex}>
                {Array.from(Array(6).keys()).map((_col, colIndex) => {
                  const width = getWidthCell(state.cols, null, colIndex);
                  switch (colIndex) {
                    case 0:
                      if (lineIndex == 0)
                        return (
                          <td rowSpan={dong.length} key={colIndex}>
                            <div
                              style={{
                                maxWidth: width + "px",
                                textAlign: "center",
                              }}
                            >
                              {dongIndex + 1}
                              {mode == "config" && (
                                <Resizeable
                                  verticalLine={verticalLine}
                                  resizeable={resizeable}
                                  currentItemProps={state.cols[colIndex]}
                                  nextItemProps={state.cols[colIndex + 1]}
                                />
                              )}
                            </div>
                          </td>
                        );
                    case 1:
                      if (lineIndex == 0)
                        return (
                          <td
                            rowSpan={dong.length}
                            style={{
                              maxWidth: width + "px",
                            }}
                            key={colIndex}
                          >
                            <div
                              style={{
                                width: width + "px",
                              }}
                              className="dong-col-1"
                            >
                              <TextEdit
                                id={`${component.type}_${component.key}_${dongIndex}_${lineIndex}`}
                                className={"text-field-label"}
                                defaultValue={getColData(1, dongIndex, -1)}
                                mode={mode}
                                onChange={onChangeContent(1, dongIndex)}
                                width={width - 6}
                                disable={state.disable}
                              />
                              {mode == "editing" && (
                                <Button
                                  size="small"
                                  icon={<PlusOutlined />}
                                  className="button-add-row"
                                  onClick={onAddNewLine(dongIndex)}
                                ></Button>
                              )}
                            </div>
                            {mode == "config" && (
                              <Resizeable
                                verticalLine={verticalLine}
                                resizeable={resizeable}
                                currentItemProps={state.cols[colIndex]}
                                nextItemProps={state.cols[colIndex + 1]}
                              />
                            )}
                          </td>
                        );
                      return null;
                    default:
                      return (
                        <td
                          style={{
                            maxWidth: width + "px",
                          }}
                          key={colIndex}
                        >
                          <div
                            className="col-ten-thuoc-di-nguyen"
                            style={{
                              width: width - 3 + "px",
                            }}
                          >
                            <MultipleLine
                              onChange={handleOnChange(
                                colIndex,
                                dongIndex,
                                lineIndex
                              )}
                              value={getColData(colIndex, dongIndex, lineIndex)}
                              disabled={state.disable}
                              width={width - 5}
                              lineHeightText={props.lineHeightText}
                              fontSize={props.fontSize}
                            />
                            {mode == "editing" && dong.length > 1 && (
                              <Button
                                size="small"
                                icon={<MinusOutlined />}
                                className="button-remove-row"
                                onClick={onDeleteLine(dongIndex, lineIndex)}
                              ></Button>
                            )}
                          </div>
                          {mode == "config" && (
                            <Resizeable
                              verticalLine={verticalLine}
                              resizeable={resizeable}
                              currentItemProps={state.cols[colIndex]}
                              nextItemProps={state.cols[colIndex + 1]}
                            />
                          )}
                        </td>
                      );
                  }
                })}
              </tr>
            );
          });
          return rows;
        })}
      </tbody>
    </MainTable>
  );
};

export default TienSuDiUng;
