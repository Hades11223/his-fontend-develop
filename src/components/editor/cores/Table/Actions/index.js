import React from "react";
import T from "prop-types";
import { sum } from "lodash";
import { Menu, message } from "antd";
import { Main } from "./styled";
import { checkConsecutive } from "../constants";

const TableActions = ({
  colSelected,
  rows,
  cols,
  handleUpdateColBox,
  itemProps,
  ...props
}) => {
  const getKeys = (listItem, key) =>
    listItem.map((d) => {
      // key index: 0 component key, 1 row key, 2 col key
      const record = d.split("_");
      return parseInt(record[key]);
    });
  const handleMerCol = () => {
    colSelected = colSelected.sort((a, b) =>
      parseInt(a.replace(/_/g, "")) > parseInt(b.replace(/_/g, "")) ? 1 : -1
    );
    const rowSelectedKeys = getKeys(colSelected, 1);
    if ([...new Set(rowSelectedKeys)].length > 1) {
      // Can not merge in two different row
      message.error("Can not merge!");
      return;
    }
    const colsKey = getKeys(colSelected, 2);

    let hiddenKeys = [];
    Object.keys(itemProps.keysHadConfig || []).forEach((d) => {
      const currentRow = parseInt(d?.split("_")[1]);
      if (
        itemProps.keysHadConfig[d].hide &&
        getKeys(colSelected, 1).includes(currentRow)
      ) {
        hiddenKeys.push(d);
      }
    });
    hiddenKeys = getKeys(hiddenKeys, 2);
    const colsIndex = colsKey.map((key) =>
      cols.findIndex((item) => item.key === key)
    );

    if (checkConsecutive(colsIndex, hiddenKeys)) {
      const currentConfig = itemProps.keysHadConfig || {};
      let x = [];
      let totalCol = 0;
      const temp = Object.keys(currentConfig)
        .filter((item) => {
          return colSelected.includes(item);
        })
        .map((item) => {
          let rowSpan = currentConfig[item].rowSpan || 1;
          let colSpan = currentConfig[item].colSpan || 1;
          totalCol += colSpan;
          if (!x.includes(rowSpan)) x.push(rowSpan);
          return rowSpan;
        })
        .sort((a, b) => {
          return a > b ? 1 : -1;
        });
      if (x.length > 1 || (x[0] > 1 && temp.length < colSelected.length)) {
        message.error("Can not merge!");
        return;
      }
      if (temp.length < colSelected.length) {
        totalCol += colSelected.length - temp.length;
      }
      const totalWidth = sum(colsIndex.map((index) => cols[index]["width"]));
      const newConfig = colSelected.reduce(
        (res, key, index) => ({
          ...res,
          [key]: {
            hadConfig: true,
            hide: index > 0,
            colSpan: totalCol == 0 ? colsIndex.length : totalCol,
            rowSpan: temp.length ? temp[0] : 1,
            totalWidth,
          },
        }),
        {}
      );

      const props = {
        ...itemProps,
        keysHadConfig: {
          ...currentConfig,
          ...newConfig,
        },
      };

      handleUpdateColBox({ props });
    } else {
      message.error("Can not merge!");
    }
  };

  const handleMergeRow = () => {
    colSelected = colSelected.sort((a, b) =>
      parseInt(a.replace(/_/g, "")) > parseInt(b.replace(/_/g, "")) ? 1 : -1
    );
    const colSelectedKeys = getKeys(colSelected, 2);
    if ([...new Set(colSelectedKeys)].length > 1) {
      // Can not merge in two different col
      message.error("Can not merge!");
      return;
    }
    const rowsKey = getKeys(colSelected, 1);
    const rowsIndex = rowsKey.map((key) =>
      rows.findIndex((item) => item.key === key)
    );

    let hiddenKeys = [];
    Object.keys(itemProps.keysHadConfig || []).forEach((d) => {
      const currentCol = parseInt(d?.split("_")[2]);
      if (
        itemProps.keysHadConfig[d].hide &&
        getKeys(colSelected, 2).includes(currentCol)
      ) {
        hiddenKeys.push(d);
      }
    });
    hiddenKeys = getKeys(hiddenKeys, 1);

    if (checkConsecutive(rowsIndex, hiddenKeys)) {
      const currentConfig = itemProps.keysHadConfig || {};

      let x = [];
      let totalRow = 0;
      const temp = Object.keys(currentConfig)
        .filter((item) => {
          return colSelected.includes(item);
        })
        .map((item) => {
          let rowSpan = currentConfig[item].rowSpan || 1;
          let colSpan = currentConfig[item].colSpan || 1;
          totalRow += rowSpan;
          if (!x.includes(colSpan)) x.push(colSpan);
          return rowSpan;
        })
        .sort((a, b) => {
          return a > b ? 1 : -1;
        });
      if (x.length > 1 || (x[0] > 1 && temp.length < colSelected.length)) {
        message.error("Can not merge!");
        return;
      }
      if (temp.length < colSelected.length) {
        totalRow += colSelected.length - temp.length;
      }
      const newConfig = colSelected.reduce(
        (res, key, index) => ({
          ...res,
          [key]: {
            ...currentConfig[key],
            hide: index > 0,
            rowSpan: totalRow == 0 ? rowsIndex.length : totalRow,
          },
        }),
        {}
      );

      const props = {
        ...itemProps,
        keysHadConfig: {
          ...currentConfig,
          ...newConfig,
        },
      };

      handleUpdateColBox({ props });
    } else {
      message.error("Can not merge!");
    }
  };

  const handleDeleteCol = () => {
    if (!colSelected.length) {
      message.error("Vui lòng chọn 1 ô cần xoá cột");
      return;
    }
    if (colSelected.length > 1) {
      message.error("Vui lòng chỉ chọn 1 ô");
      return;
    }
    colSelected = (colSelected[0] || "").split("_")[2] || "";

    if (props.handleDeleteCol) props.handleDeleteCol(colSelected);
  };
  const handleDeleteRow = () => {
    if (!colSelected.length) {
      message.error("Vui lòng chọn 1 ô cần xoá hàng");
      return;
    }
    if (!colSelected.length || colSelected.length > 1) {
      message.error("Vui lòng chỉ chọn 1 ô");
      return;
    }
    colSelected = (colSelected[0] || "").split("_")[1] || "";
    if (props.handleDeleteRow) props.handleDeleteRow(colSelected);
  };

  const addRow = (type) => () => {
    if (!colSelected.length) {
      message.error("Vui lòng chọn ô để chèn dòng");
      return;
    }
    if (!colSelected.length || colSelected.length > 1) {
      message.error("Vui lòng chỉ chọn 1 ô");
      return;
    }
    colSelected = (colSelected[0] || "").split("_")[1] || "";
    if (props.onAddRow) {
      props.onAddRow(type == 1, colSelected);
    }
  };
  const addCol = (type) => () => {
    if (!colSelected.length) {
      message.error("Vui lòng chọn ô để chèn dòng");
      return;
    }
    if (!colSelected.length || colSelected.length > 1) {
      message.error("Vui lòng chỉ chọn 1 ô");
      return;
    }
    colSelected = (colSelected[0] || "").split("_")[2] || "";
    if (props.onAddRow) {
      props.onAddCol(type == 1, colSelected);
    }
  };
  return (
    <Main>
      <ul>
        <li onClick={handleMerCol}>
          <span>{"Gộp Cột"}</span>
        </li>
        <li onClick={handleMergeRow}>
          <span>{"Gộp Hàng"}</span>
        </li>
        <li onClick={handleDeleteRow}>
          <span>{"Xoá Hàng"}</span>
        </li>
        <li onClick={handleDeleteCol}>
          <span>{"Xoá Cột"}</span>
        </li>
        <li onClick={addRow(1)}>
          <span>{"Chèn phía trên 1 hàng"}</span>
        </li>

        <li onClick={addRow(0)}>
          <span>{"Chèn phía dưới 1 hàng"}</span>
        </li>
        <li onClick={addCol(1)}>
          <span>{"Chèn bên trái 1 cột"}</span>
        </li>
        <li onClick={addCol(0)}>
          <span>{"Chèn phía phải 1 cột"}</span>
        </li>
      </ul>
    </Main>
  );
};

TableActions.defaultProps = {
  handleUpdateColBox: () => {},
};

TableActions.propTypes = {
  handleUpdateColBox: T.func,
};

export default TableActions;
