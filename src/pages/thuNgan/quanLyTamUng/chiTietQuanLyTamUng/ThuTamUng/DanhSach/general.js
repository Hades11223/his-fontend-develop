import React from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import IcEye from "assets/svg/ic-eye.svg";
import IcDelete from "assets/svg/ic-delete.svg";
import IcReload from "assets/svg/ic-reload.svg";
import IcPrint from "assets/svg/ic-print.svg";
import IcSetting from "assets/svg/ic-setting.svg";
import { checkRoleOr } from "utils/role-utils";
import { ROLES } from "constants/index";
import { t } from "i18next";
export const columns = ({
  onClickSort,
  onSettings,
  dataSortColumn,
  onDelete,
  onReturn,
  onViewDetail,
  onInPhieuThuTamUng,
  listTrangThaiTamUng,
  hiddenHeader
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
          title="Số tiền tạm ứng"
          sort_key="tongTien"
          dataSort={dataSortColumn["tongTien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "tongTien",
      key: "tongTien",
      columnName: "Số tiền tạm ứng",
      show: true,
      align: "right",
      render: (field, item, index) => {
        return <div>{field && field?.formatPrice()}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ký hiệu phiếu thu"
          sort_key="kyHieu"
          dataSort={dataSortColumn["kyHieu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "kyHieu",
      key: "kyHieu",
      align: "left",
      columnName: "Ký hiệu phiếu thu",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title="Số phiếu tạm ứng"
          sort_key="soPhieu"
          dataSort={dataSortColumn["soPhieu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "140px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      align: "left",
      columnName: "Số phiếu tạm ứng",
      show: true,
      render: (field, item, index) => {
        return <div>{field}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Lần"
          sort_key="stt"
          dataSort={dataSortColumn["stt"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "stt",
      key: "stt",
      columnName: "stt",
      show: true,
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày phiếu thu"
          sort_key="thoiGianThucHien"
          dataSort={dataSortColumn["thoiGianThucHien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      columnName: "Ngày phiếu thu",
      show: true,
      render: (field, item, index) => {
        return field && moment(field).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Lý do tạm ứng"
          sort_key="tenLyDoTamUng"
          dataSort={dataSortColumn["tenLyDoTamUng"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "tenLyDoTamUng",
      key: "tenLyDoTamUng",
      columnName: "Lý do tạm ứng",
      show: true,
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          sort_key="tenKhoa"
          dataSort={dataSortColumn["tenKhoa"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "120px",
      dataIndex: "tenKhoa",
      key: "tenKhoa",
      columnName: "Khoa",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title="Thu ngân"
          sort_key="tenThuNgan"
          dataSort={dataSortColumn["tenThuNgan"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "tenThuNgan",
      key: "tenThuNgan",
      align: "left",
      columnName: "Thu ngân",
      show: true,
      render: (field, item, index) => {
        return field;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ghi chú"
          sort_key="ghiChu"
          dataSort={dataSortColumn["ghiChu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "ghiChu",
      key: "ghiChu",
      align: "left",
      columnName: "Ghi chú",
      show: true,
      render: (field, item, index) => {
        return field;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái tạm ứng"
          sort_key="trangThai"
          dataSort={dataSortColumn["trangThai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "120px",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "left",
      columnName: "Trạng thái tạm ứng",
      show: true,
      render: (item, index) => {
        return listTrangThaiTamUng.find((x) => x.id === item)?.ten || "";
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
      width: "80px",
      dataIndex: "",
      key: "",
      align: "center",
      fixed: "right",
      render: (field, item, index) => {
        return (
          <div className="action">
            <div
              onClick={() => onViewDetail(item)}
              title={t("common.xemChiTiet")}
            >
              <IcEye />
            </div>
            {checkRoleOr([ROLES["THU_NGAN"].HOAN_PHIEU_THU_TAM_UNG]) && !hiddenHeader &&(
              <div
                title={t("thuNgan.quanLyTamUng.hoanTamUng")}
                onClick={() => onReturn(item)}
              >
                <IcReload className="ic-action" />
              </div>
            )}
            {checkRoleOr([ROLES["THU_NGAN"].HUY_PHIEU_THU_TAM_UNG]) && !hiddenHeader && (
              <div
                onClick={() => onDelete(item)}
                title={t("thuNgan.quanLyTamUng.huyTamUng")}
              >
                <IcDelete />
              </div>
            )}
            {checkRoleOr([ROLES["THU_NGAN"].IN_PHIEU_THU_TAM_UNG]) && (
              <div
                onClick={() => onInPhieuThuTamUng(item.id)}
                title={t("common.inPhieu")}
              >
                <IcPrint />
              </div>
            )}
          </div>
        );
      },
    },
  ];
};
