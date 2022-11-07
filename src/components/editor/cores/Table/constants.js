import React from "react";
import InsertRow from "./InsertRow";
import GridData from "./GridDataRender";
import LayoutRender from "./LayoutRender";
import VatTuTieuHao from "./VatTuTieuHao";
import TienSuDiUng from "./TienSuDiUng";
import ConfigRender from "./ConfigRender";
import ListRender from "./ListRender";
import ReplicationRow from "./ReplicationRow";
import TomTatBenhAn from "./TomTatBenhAn";

export const composeRender = (type, props) => {
  const { mode } = props;

  if (
    type === "analytic" || //đã xoá bỏ type này và thay bằng vat-tu-tieu-hao
    type === "vat-tu-tieu-hao"
  ) {
    return <VatTuTieuHao {...props} />;
  }

  if (type === "tien-su-di-ung") {
    return <TienSuDiUng {...props} />;
  }

  if (mode === "config") {
    return <ConfigRender {...props} />;
  }

  if (type === "insertRow") {
    return <InsertRow {...props} />;
  }

  if (type === "listRender") {
    return <ListRender {...props} />;
  }

  if (type === "gridData") {
    return <GridData {...props} />;
  }

  if (type === "replicationRow") {
    return <ReplicationRow {...props} />;
  }
  if (type == "tom-tat-benh-an") {
    return <TomTatBenhAn {...props}></TomTatBenhAn>;
  }
  return <LayoutRender {...props} />;
};

const isHiddenBetweenTwoItem = (hiddenKeys, start, end) => {
  let idx = start + 1;
  let flag = false;
  while (idx < end) {
    flag = hiddenKeys.includes(idx);
    idx += 1;
  }
  return flag;
};

export const checkConsecutive = (indexList, hiddenKeys) => {
  indexList = indexList.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  if (indexList.length > 1) {
    let idx = 0;

    while (idx < indexList.length) {
      if (indexList[idx] + 1 !== indexList[idx + 1]) {
        if (
          isHiddenBetweenTwoItem(
            hiddenKeys,
            indexList[idx] + 1,
            indexList[idx + 1] + 1
          )
        )
          return true;
        return false;
      }
      idx += 1;

      if (idx === indexList.length - 1) {
        return true;
      }
    }
  } else {
    return true;
  }
};

export const getWidthCell = (cols, config, index) => {
  if (config && config.colSpan > 1) {
    let width = 0;
    for (let i = index; i < index + config.colSpan; i++) {
      width += cols[i]?.width;
    }
    return width;
  } else {
    return cols[index]?.width;
  }
};
