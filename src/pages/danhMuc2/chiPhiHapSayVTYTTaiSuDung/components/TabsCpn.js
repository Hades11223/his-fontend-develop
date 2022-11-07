import MultiLevelTab from "components/MultiLevelTab";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChiPhiHapSay from "./ChiPhiHapSay";
import ThongTinChiTiet from "./ThongTinChiTiet";

const Tabs = () => {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    showFullTable: false,
    activeKeyTab: "2",
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const listPanel = [
    {
      title: t("common.thongTinChiTiet"),
      render: () => <ThongTinChiTiet />,
    },
    {
      title: t("danhMuc.chiTietHapSay"),
      render: () => <ChiPhiHapSay />,
    },
  ];
  return (
    <MultiLevelTab
      listPanel={listPanel}
      onChange={(activeKeyTab) => setState({ activeKeyTab })}
      isBoxTabs={true}
      activeKey={state.activeKeyTab}
    />
  );
};

export default Tabs;
