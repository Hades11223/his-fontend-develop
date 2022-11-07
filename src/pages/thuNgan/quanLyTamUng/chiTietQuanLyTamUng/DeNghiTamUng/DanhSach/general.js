import React from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import IconDelete from "assets/images/utils/delete-blue.png";
import IconPrint from "assets/images/utils/print-blue.png";
import IconPen from "assets/images/utils/edit.png";
import IcSetting from "assets/svg/ic-setting.svg";
import { Button } from "components";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";

export const columns = ({
  onClickSort,
  onSettings,
  dataSortColumn,
  showModaConfirmRemove,
  t,
  onShowDuyetTamUng,
  onShowEditDeNghiTamUng,
  onInPhieuTamUng,
}) => {
  return [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.soTienDeNghi")}
          sort_key="tongTien"
          dataSort={dataSortColumn["tongTien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "tongTien",
      key: "tongTien",
      columnName: t("thuNgan.quanLyTamUng.soTienDeNghi"),
      show: true,
      align: "right",
      render: (field, item, index) => {
        return <div>{field && field?.formatPrice()}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.lan")}
          sort_key="lan"
          dataSort={dataSortColumn["lan"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "stt",
      key: "stt",
      columnName: t("thuNgan.quanLyTamUng.lan"),
      show: true,
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.lyDoDeNghi")}
          sort_key="tenLyDoTamUng"
          dataSort={dataSortColumn["tenLyDoTamUng"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "tenLyDoTamUng",
      key: "tenLyDoTamUng",
      columnName: t("thuNgan.quanLyTamUng.lyDoDeNghi"),
      show: true,
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.ngayDeNghi")}
          sort_key="thoiGianThucHien"
          dataSort={dataSortColumn["thoiGianThucHien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      columnName: t("thuNgan.quanLyTamUng.ngayDeNghi"),
      show: true,
      render: (field, item, index) => {
        return (
          field && moment(field, "YYYY/MM/DD").format("DD/MM/YYYY HH:mm:ss")
        );
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
          title={t("thuNgan.quanLyTamUng.nguoiDeNghi")}
          sort_key="tenThuNgan"
          dataSort={dataSortColumn["tenThuNgan"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "tenThuNgan",
      key: "tenThuNgan",
      columnName: t("thuNgan.quanLyTamUng.nguoiDeNghi"),
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.soPhieuThu")}
          sort_key="soPhieu"
          dataSort={dataSortColumn["soPhieu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      align: "left",
      columnName: t("thuNgan.quanLyTamUng.soPhieuThu"),
      show: true,
      render: (field, item, index) => {
        return <div>{field}</div>;
      },
    },
    ...(checkRole([ROLES["THU_NGAN"].DUYET_DE_NGHI_TAM_UNG])
      ? [
          {
            title: <HeaderSearch title={t("thuNgan.quanLyTamUng.xacNhan")} />,
            width: "70px",
            align: "center",
            columnName: t("thuNgan.quanLyTamUng.xacNhan"),
            show: true,
            fixed: "right",
            render: (field, item, index) => {
              return (
                <Button
                  style={{ margin: "auto" }}
                  type="primary"
                  onClick={() => onShowDuyetTamUng(item)}
                >
                  {t("thuNgan.quanLyTamUng.duyet")}
                </Button>
              );
            },
          },
        ]
      : []),
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.thaoTac")}
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: "120px",
      dataIndex: "",
      key: "",
      align: "center",
      fixed: "right",
      render: (record, item) => {
        return (
          <>
            {checkRole([ROLES["THU_NGAN"].SUA_DE_NGHI_TAM_UNG]) && (
              <img
                src={IconPen}
                alt="..."
                style={{ marginRight: 10 }}
                onClick={() => onShowEditDeNghiTamUng(item)}
              />
            )}
            {checkRole([ROLES["THU_NGAN"].XOA_DE_NGHI_TAM_UNG]) && (
              <img
                src={IconDelete}
                alt="..."
                style={{ marginRight: 10 }}
                onClick={() => showModaConfirmRemove(item)}
              />
            )}
            {checkRole([ROLES["THU_NGAN"].IN_DE_NGHI_TAM_UNG]) && (
              <img
                src={IconPrint}
                alt="..."
                onClick={() => onInPhieuTamUng(item.id)}
              />
            )}
          </>
        );
      },
    },
  ];
};
