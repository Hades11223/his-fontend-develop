import React, { useRef, useEffect, useMemo } from "react";
import Navigation from "./Navigation";
import useWindowSize from "hook/useWindowSize";
import { DANH_SACH_DAU_TRANG } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { useTranslation } from "react-i18next";
const NavigationBar = ({ onActiveTab, activeKey, layerId }) => {
  const { t } = useTranslation();
  const windowSize = useWindowSize();
  const infoNb = useSelector((state) => state.khamBenh.infoNb);
  const updateData = useDispatch().khamBenh.updateData;
  const refLinks = useRef({});
  const onClickChild = (item) => {
    let obj = {};
    updateData({
      typeKhamCoBan: obj,
    });
  };
  const list = useMemo(() => {
    let clone = cloneDeep(DANH_SACH_DAU_TRANG);
    return clone.filter((item) => {
      if (!infoNb?.covid) {
        let index = item.dataChild.findIndex((i) => i.text == "Khám covid");
        if (index !== -1) {
          item.dataChild.splice(index, 1);
        }
      }

      if (!(infoNb?.khamSucKhoe || infoNb?.loaiDoiTuongKsk)) {
        let index = item.dataChild.findIndex((i) => i.text == "Khám sức khỏe");
        if (index !== -1) {
          item.dataChild.splice(index, 1);
        }
      } else {
        let index = item.dataChild.findIndex((i) => i.text == "Khám chung");
        if (index !== -1) {
          item.dataChild.splice(index, 1);
        }
      }

      item.title = t(item.title);
      return item;
    });
  }, [infoNb, DANH_SACH_DAU_TRANG, t]);
  return list.map((item, index) => {
    return (
      <Navigation
        {...item}
        ref={(ref) => (refLinks.current[item.itemKey] = ref)}
        key={item.title}
        onActive={onActiveTab}
        onClickChild={onClickChild}
        layerId={layerId}
        activeKey={activeKey}
      />
    );
  });
};

export default NavigationBar;
