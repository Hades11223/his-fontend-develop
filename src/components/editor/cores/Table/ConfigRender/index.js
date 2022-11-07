import React from "react";
import { Main } from "./styled";
import Block from "components/editor/config/Block";
import Resizeable from "components/editor/config/Block/Resizeable";
import { getWidthCell } from "../constants";

const ConfigRender = (props) => {
  const {
    rows,
    cols,
    keysHadConfig,
    localComponents,
    onColClick,
    colSelected,
    valuesHIS,
    refArray,
    verticalLine,
    updateComponents,
    formId,
    mode,
    component,
    form,
    formChange,
    onColResize,
  } = props;

  const resizeable = (currentItem, nextItem) => {
    let first = cols.find((item) => item.key == currentItem?.key); //lấy ra ô đầu
    let last = cols.find((item) => item.key == nextItem?.key) || {}; // và ô tiếp theo
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
    onColResize(first, last);
  };

  return (
    <Main>
      <table>
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
                    style={{ maxWidth: col.width + "px" }}
                  >
                    <div
                      className={"in-side-col"}
                      style={{ width: width + "px" }}
                    >
                      <Block
                        ref={(ref) => {
                          refArray.current[`block_${index}_${idx}`] = ref;
                        }}
                        verticalLine={verticalLine}
                        item={{
                          key: boxKey,
                          width: width - 2,
                        }}
                        mode={mode}
                        updateComponents={updateComponents}
                        component={com}
                        formId={formId}
                        values={form}
                        valuesHIS={valuesHIS}
                        formChange={formChange}
                        level={props.level}
                        fontSize={props.fontSize}
                        lineHeightText={props.lineHeightText}
                        rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
                      />
                    </div>
                    <Resizeable
                      verticalLine={verticalLine}
                      resizeable={resizeable}
                      currentItemProps={cols[idx + (config?.colSpan || 1) - 1]}
                      nextItemProps={cols[idx + (config?.colSpan || 1)]}
                    />
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

export default ConfigRender;
