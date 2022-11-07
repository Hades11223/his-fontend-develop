import React from "react";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
export const columns = ({ onClickSort, onSettings, dataSortColumn }) => {
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
      width: "90px",
      dataIndex: "tongTien",
      key: "tongTien",
      columnName: "Số tiền hoàn",
      show: true,
      align: "right",
      render: (field, item, index) => {
        return <div>{field && field?.formatPrice()}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số phiếu thu"
          sort_key="soPhieu"
          dataSort={dataSortColumn["soPhieu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "90px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      align: "left",
      columnName: "Số phiếu thu",
      show: true,
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
      align: "center",
      columnName: "Lần",
      show: true,
      render: (field, item, index) => {
        return field;
      },
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
      width: "100px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      columnName: "Ngày phiếu thu",
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
          title="Lý do tạm ứng"
          sort_key="tenLyDoTamUng"
          dataSort={dataSortColumn["tenLyDoTamUng"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "tenLyDoTamUng",
      key: "tenLyDoTamUng",
      align: "left",
      columnName: "Lý do tạm ứng",
      show: true,
      render: (field, item, index) => {
        return field;
      },
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
      width: "130px",
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
      width: "130px",
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
      width: "80px",
      dataIndex: "ghiChu",
      key: "ghiChu",
      align: "left",
      columnName: "Ghi chú",
      show: true,
      render: (field, item, index) => {
        return field;
      },
    },
  ];
};
