import React from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import IconPrint from "assets/images/utils/print-blue.png";
import IcSetting from "assets/svg/ic-setting.svg";
import { Input } from "antd";
import { checkRoleOr } from "utils/role-utils";
import { ROLES } from "constants/index";
export const columns = ({
  onClickSort,
  onSettings,
  dataSortColumn,
  onSearchInput,
  t,
  onInPhieuTamUng,
}) => {
  return [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.soTienHoan")}
          sort_key="tongTien"
          dataSort={dataSortColumn["tongTien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "tongTien",
      key: "tongTien",
      columnName: t("thuNgan.quanLyTamUng.soTienHoan"),
      show: true,
      align: "right",
      render: (field, item, index) => {
        return <div>{field && field?.formatPrice()}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.soPhieuHoan")}
          sort_key="soPhieu"
          dataSort={dataSortColumn["soPhieu"] || ""}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("thuNgan.quanLyTamUng.nhapSoPhieuHoan")}
              onChange={onSearchInput("soPhieu")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      align: "left",
      columnName: t("thuNgan.quanLyTamUng.soPhieuHoan"),
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.kyHieu")}
          sort_key="kyHieu"
          dataSort={dataSortColumn["kyHieu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "kyHieu",
      key: "kyHieu",
      align: "left",
      columnName: t("thuNgan.quanLyTamUng.kyHieu"),
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.lyDoHoanTamUng")}
          sort_key="tenLyDoTamUng"
          dataSort={dataSortColumn["tenLyDoTamUng"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "tenLyDoTamUng",
      key: "tenLyDoTamUng",
      align: "left",
      columnName: t("thuNgan.quanLyTamUng.lyDoHoanTamUng"),
      show: true,
      render: (field, item, index) => {
        return <div>{field}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.ngayPhieuHoan")}
          sort_key="thoiGianThucHien"
          dataSort={dataSortColumn["thoiGianThucHien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      columnName: t("thuNgan.quanLyTamUng.ngayPhieuHoan"),
      show: true,
      render: (field, item, index) => {
        return field && moment(field).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.khoa")}
          sort_key="tenKhoa"
          dataSort={dataSortColumn["tenKhoa"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "tenKhoa",
      key: "tenKhoa",
      columnName: t("common.khoa"),
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.thuNgan")}
          sort_key="tenThuNgan"
          dataSort={dataSortColumn["tenThuNgan"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "tenThuNgan",
      key: "tenThuNgan",
      align: "left",
      columnName: t("thuNgan.thuNgan"),
      show: true,
      render: (field, item, index) => {
        return field;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.ghiChu")}
          sort_key="ghiChu"
          dataSort={dataSortColumn["ghiChu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "120px",
      dataIndex: "ghiChu",
      key: "ghiChu",
      align: "left",
      columnName: t("common.ghiChu"),
      show: true,
      render: (field, item, index) => {
        return field;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.soPhieuThu")}
          sort_key="soPhieu"
          dataSort={dataSortColumn["soPhieu"] || ""}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("thuNgan.quanLyTamUng.nhapSoPhieuThu")}
              //   onChange={onSearchInput("")}
            />
          }
        />
      ),
      width: "80px",
      dataIndex: "",
      key: "",
      align: "left",
      columnName: t("thuNgan.soPhieuThu"),
      show: true,
      render: (field, item, index) => {
        return field;
      },
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              Thao tác
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: "60px",
      dataIndex: "",
      key: "",
      align: "center",
      fixed: "right",
      render: (item, data) => {
        return (
          <>
            {checkRoleOr([ROLES["THU_NGAN"].IN_PHIEU_HOAN_TAM_UNG]) && (
              <img
                src={IconPrint}
                alt="..."
                onClick={() => onInPhieuTamUng(data.id)}
              />
            )}
          </>
        );
      },
    },
  ];
};
