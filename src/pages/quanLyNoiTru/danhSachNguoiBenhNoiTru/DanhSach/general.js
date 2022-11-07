import React from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import IcEye from "assets/svg/ic-eye.svg";
import IcSetting from "assets/svg/ic-setting.svg";
export const columns = ({
  t,
  onClickSort,
  onSettings,
  dataSortColumn,
  listTrangThaiNb,
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
          title={t("cdha.khoaDangDieuTri")}
          sort_key="khoaNbId"
          dataSort={dataSortColumn["khoaNbId"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "300px",
      dataIndex: "khoaNbId",
      key: "khoaNbId",
      // columnName: "Khoa đang điều trị",
      i18Name: "cdha.khoaDangDieuTri",
      show: true,
      render: (field, item, index) => {
        return (
          <div>
            {item?.maKhoaNb} - {item?.tenKhoaNb}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.hoTenNb")}
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "300px",
      dataIndex: "tenNb",
      key: "tenNb",
      align: "left",
      // columnName: "Họ tên NB",
      i18Name: "thuNgan.hoTenNb",
      show: true,
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
      align: "left",
      // columnName: "Ngày sinh",
      i18Name: "common.ngaySinh",
      show: true,
      render: (field, item, index) => {
        return (
          <div>
            {item?.ngaySinh &&
              moment(item?.ngaySinh).format(
                item?.chiNamSinh ? "YYYY" : "DD/MM/YYYY"
              )}
          </div>
        );
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
      width: "110px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      // columnName: "Mã hồ sơ",
      i18Name: "common.maHoSo",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maBa")}
          sort_key="maBenhAn"
          dataSort={dataSortColumn["maBenhAn"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "maBenhAn",
      key: "maBenhAn",
      // columnName: "Mã BA",
      i18Name: "common.maBa",
      show: true,
    },
    {
      title: <HeaderSearch title={t("common.soNgayDT")} />,
      width: "70px",
      align: "right",
      // columnName: "Số ngày ĐT",
      i18Name: "common.soNgayDT",
      dataIndex: "soNgayDieuTri",
      key: "soNgayDieuTri",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.khoaNhapVien")}
          sort_key="tenKhoaNhapVien"
          dataSort={dataSortColumn["tenKhoaNhapVien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "300px",
      dataIndex: "tenKhoaNhapVien",
      key: "tenKhoaNhapVien",
      // columnName: "Khoa nhập viện",
      i18name: "common.khoaNhapVien",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.thoiGianNhapVien")}
          sort_key="thoiGianVaoKhoaNhapVien"
          dataSort={dataSortColumn["thoiGianVaoKhoaNhapVien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "170px",
      dataIndex: "thoiGianVaoKhoaNhapVien",
      key: "thoiGianVaoKhoaNhapVien",
      // columnName: "Thời gian nhập viện",
      i18Name: "cdha.thoiGianNhapVien",
      show: true,
      render: (field, item, index) => {
        return (
          <div>
            {item?.thoiGianVaoKhoaNhapVien &&
              moment(item?.thoiGianVaoKhoaNhapVien).format(
                "DD/MM/YYYY HH:mm:ss"
              )}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.tienTamUng")}
          sort_key="tienTamUng"
          dataSort={dataSortColumn["tienTamUng"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "130px",
      dataIndex: "tienTamUng",
      key: "tienTamUng",
      align: "right",
      // columnName: "Tiền tạm ứng",
      i18Name: "thuNgan.tienTamUng",
      show: true,
      render: (field, item, index) => {
        return (
          (item.tienTamUng || 0) - (item.tienHoanUng || 0)
        )?.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.tienConLai")}
          sort_key="tienConLai"
          dataSort={dataSortColumn["tienConLai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "130px",
      dataIndex: "tienConLai",
      key: "tienConLai",
      align: "right",
      // columnName: "Tiền còn lại",
      i18Name: "cdha.tienConLai",
      show: true,
      render: (field, item, index) => {
        return field?.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.chanDoanBenhHienTai")}
          onClickSort={onClickSort}
        />
      ),
      width: "300px",
      // columnName: "Chẩn đoán bệnh hiện tại",
      i18Name: "cdha.chanDoanBenhHienTai",
      show: true,
      render: (field, item, index) => {
        return (
          <div>
            {item?.dsCdChinh?.length &&
              item?.dsCdChinh?.map((itemLoop) => itemLoop.ten)?.join("; ")}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.thoiGianVaoKhoa")}
          sort_key="thoiGianVaoKhoa"
          dataSort={dataSortColumn["thoiGianVaoKhoa"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "200px",
      dataIndex: "thoiGianVaoKhoa",
      key: "thoiGianVaoKhoa",
      // columnName: "Thời gian vào khoa",
      i18Name: "cdha.thoiGianVaoKhoa",
      show: true,
      render: (field, item, index) => {
        return (
          <div>
            {item?.thoiGianVaoKhoa &&
              moment(item?.thoiGianVaoKhoa).format("DD/MM/YYYY HH:mm:ss")}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.trangThaiNb")}
          sort_key="trangThai"
          dataSort={dataSortColumn["trangThai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "180px",
      dataIndex: "trangThai",
      key: "trangThai",
      // columnName: "Trạng thái NB",
      i18Name: "cdha.trangThaiNb",
      show: true,
      render: (item) => {
        return (listTrangThaiNb || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.giuongPhong")}
          sort_key="trangThai"
          dataSort={dataSortColumn["trangThai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "300px",
      // columnName: "Giường  - Phòng",
      i18Name: "cdha.giuongPhong",
      show: true,
      render: (field, item, index) => {
        return (
          <div>
            {item?.maGiuong &&
              item?.tenPhong &&
              `${item?.maGiuong} - ${item?.tenPhong}`}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("cdha.bacSiDieuTri")}
          sort_key="tenBacSiDieuTri"
          dataSort={dataSortColumn["tenBacSiDieuTri"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "300px",
      dataIndex: "tenBacSiDieuTri",
      key: "tenBacSiDieuTri",
      // columnName: "Bác sĩ điều trị",
      i18Name: "cdha.bacSiDieuTri",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maNguoiBenh")}
          sort_key="maNb"
          dataSort={dataSortColumn["maNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "130px",
      dataIndex: "maNb",
      key: "maNb",
      // columnName: "Mã người bệnh",
      i18Name: "common.maNguoiBenh",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.xemChiTiet")}
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
        return <IcEye onClick={onViewDetail(record)} className="ic-action" />;
      },
    },
  ];
};
