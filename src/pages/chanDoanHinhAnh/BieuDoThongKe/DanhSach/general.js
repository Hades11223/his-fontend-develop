import React from "react";
import { HeaderSearch } from "components";
import IcEye from "assets/svg/ic-eye.svg";
import IcSetting from "assets/svg/ic-setting.svg";
export const columns = ({ onClickSort, onSettings, dataSortColumn, t }) => {
  return [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "20px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.tenBacSiDocKetQua")}
          sort_key="tenBacSi"
          dataSort={dataSortColumn["tenBacSi"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "tenBacSi",
      key: "tenBacSi",
      // columnName: t("cdha.tenBacSiDocKetQua"),
      i18Name: "cdha.tenBacSiDocKetQua",
      show: true,
      render: (field, item, index) => {
        return <div>{field}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.dsNhomDichVuCap2")}
          sort_key="tenNhomDichVuCap2"
          dataSort={dataSortColumn["tenNhomDichVuCap2"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "tenNhomDichVuCap2",
      key: "tenNhomDichVuCap2",
      align: "left",
      // columnName: t("cdha.dsNhomDichVuCap2"),
      i18Name: "cdha.dsNhomDichVuCap2",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.soLuong")}
          sort_key="soLuong"
          dataSort={dataSortColumn["soLuong"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "30px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
      columnName: t("common.soLuong"),
      i18Name: "common.soLuong",
      show: true,
      render: (field, item, index) => {
        return <div>{field}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tong")}
          sort_key="soLuong"
          dataSort={dataSortColumn["soLuong"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "30px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
      columnName: t("common.tong"),
      i18Name: "common.tong",
      show: true,
      render: (field, item, index) => {
        return <div>{field}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.xemChiTiet")}
              <IcSetting className="icon" onClick={onSettings} />
            </>
          }
        />
      ),
      width: "30px",
      dataIndex: "",
      key: "",
      align: "center",
      fixed: "right",
      render: () => {
        return <IcEye className="ic-action"/>;
      },
    },
  ];
};
