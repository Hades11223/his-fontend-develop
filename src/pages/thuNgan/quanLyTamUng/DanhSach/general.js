import React from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import IcEye from "assets/svg/ic-eye.svg";
import IcSetting from "assets/svg/ic-setting.svg";
import { t } from "i18next";
import { checkRoleOr } from "utils/role-utils";
import { ROLES } from "constants/index";
export const columns = ({
  onClickSort,
  onSettings,
  dataSortColumn,
  listDoiTuongKcb,
  onViewDetail = () => () => {},
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
          title={t("thuNgan.ngayDangKy")}
          sort_key="thoiGianVaoVien"
          dataSort={dataSortColumn["thoiGianVaoVien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "140px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      columnName: t("thuNgan.ngayDangKy"),
      show: true,
      i18Name: "thuNgan.ngayDangKy",
      render: (field, item, index) => {
        return field && moment(field).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maNb")}
          sort_key="maNb"
          dataSort={dataSortColumn["maNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "maNb",
      key: "maNb",
      columnName: t("common.maNb"),
      show: true,
      i18Name: "common.maNb",
      render: (field, item, index) => {
        return <div>{item?.maNb}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHoSo")}
          sort_key="maHoSo"
          dataSort={dataSortColumn["maHoSo"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      columnName: t("common.maHoSo"),
      show: true,
      i18Name: "common.maHoSo",
      render: (field, item, index) => {
        return <div>{item?.maHoSo}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maBenhAn")}
          sort_key="maBenhAn"
          dataSort={dataSortColumn["maBenhAn"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "maBenhAn",
      key: "maBenhAn",
      columnName: t("common.maBenhAn"),
      show: true,
      i18Name: "common.maBenhAn",
      render: (field, item, index) => {
        return <div>{item?.maBenhAn}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.hoTenNguoiBenh")}
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "300px",
      dataIndex: "tenNb",
      key: "tenNb",
      align: "left",
      columnName: t("thuNgan.hoTenNguoiBenh"),
      show: true,
      i18Name: "thuNgan.hoTenNguoiBenh",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.soTienDaTamUng")}
          sort_key="tienTamUng"
          dataSort={dataSortColumn["tienTamUng"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "tienTamUng",
      key: "tienTamUng",
      align: "left",
      columnName: t("thuNgan.quanLyTamUng.soTienDaTamUng"),
      show: true,
      i18Name: "thuNgan.quanLyTamUng.soTienDaTamUng",
      render: (field, data, index) => {
        return (
          <div>{(data?.tienTamUng - data?.tienHoanUng)?.formatPrice()}</div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.soTienDvPhaiTra")}
          sort_key="tienChuaThanhToan"
          dataSort={dataSortColumn["tienChuaThanhToan"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "tienChuaThanhToan",
      key: "tienChuaThanhToan",
      columnName: t("thuNgan.quanLyTamUng.soTienDvPhaiTra"),
      show: true,
      i18Name: "thuNgan.quanLyTamUng.soTienDaSuDung",
      render: (item) => item && item?.formatPrice(),
    },
    {
      title: <HeaderSearch title={t("thuNgan.soTienConLai")} />,
      width: "150px",
      dataIndex: "soTienConLai",
      key: "soTienConLai",
      columnName: t("thuNgan.soTienConLai"),
      show: true,
      i18Name: "thuNgan.soTienConLai",
      render: (item, data) =>
        (
          data?.tienTamUng -
          data?.tienHoanUng -
          data?.tienChuaThanhToan
        )?.formatPrice(),
    },
    {
      title: (
        <HeaderSearch
          title={t("common.ngaySinh")}
          sort_key="ngaySinh"
          dataSort={dataSortColumn["ngaySinh"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      columnName: t("common.ngaySinh"),
      show: true,
      i18Name: "common.ngaySinh",
      align: "center",
      render: (field, item, index) => {
        return (
          <div>
            {item?.ngaySinh &&
              moment(item?.ngaySinh).format(
                item.chiNamSinh ? "YYYY" : "DD/MM/YYYY"
              )}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.diaChi")}
          sort_key="diaChi"
          dataSort={dataSortColumn["diaChi"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "170px",
      dataIndex: "diaChi",
      key: "diaChi",
      columnName: t("common.diaChi"),
      show: true,
      i18Name: "common.diaChi",
      render: (field, item, index) => {
        return <div>{item?.diaChi && item?.diaChi}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.sdt")}
          sort_key="soDienThoai"
          dataSort={dataSortColumn["soDienThoai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
      align: "right",
      columnName: t("common.sdt"),
      show: true,
      i18Name: "common.sdt",
      render: (field, item, index) => {
        return field;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.soBHYT")}
          sort_key="maTheBhyt"
          dataSort={dataSortColumn["maTheBhyt"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "140px",
      dataIndex: "maTheBhyt",
      key: "maTheBhyt",
      align: "right",
      columnName: t("common.soBHYT"),
      show: true,
      i18Name: "common.soBHYT",
      render: (field, item, index) => {
        return field;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.quanLyTamUng.loaiKcb")}
          sort_key="doiTuongKcb"
          dataSort={dataSortColumn["doiTuongKcb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "doiTuongKcb",
      key: "doiTuongKcb",
      columnName: t("thuNgan.quanLyTamUng.loaiKcb"),
      show: true,
      i18Name: "thuNgan.quanLyTamUng.loaiKcb",
      render: (field, item, index) => {
        return (listDoiTuongKcb || []).find((x) => x.id === field)?.ten;
      },
    },
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
      render: (record) => {
        return (
          <>
            {checkRoleOr([ROLES["THU_NGAN"].XEM_DS_DE_NGHI_TAM_UNG]) && (
              <IcEye className="ic-action" onClick={onViewDetail(record)} />
            )}
          </>
        );
      },
    },
  ];
};
