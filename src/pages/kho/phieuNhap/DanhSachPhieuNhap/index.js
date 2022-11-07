import React from "react";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatNumber } from "utils";
import { Main } from "./styled";
import moment from "moment";
import { useEnum } from "hook";
import { ENUM, FORMAT_DATE_TIME } from "constants/index";

const DanhSachPhieuNhap = (props) => {
  const history = useHistory();

  const {
    nhapKho: { listPhieuNhap, totalElements, page, size, dataSortColumn = {} },
    nhapKhoChiTiet: { phieuNhapXuatId },
  } = useSelector((state) => state);
  const {
    nhapKho: { getListPhieuNhap, onSizeChange },
    nhapKhoChiTiet: { updateData: updateDataNhapKho },
  } = useDispatch();
  const [listTrangThaiPhieuNhapXuat] = useEnum(ENUM.TRANG_THAI_PHIEU_NHAP_XUAT);

  const onClickSort = (key, value) => {
    getListPhieuNhap({ dataSortColumn: { ...dataSortColumn, [key]: value } });
  };
  const onChangePage = (page) => {
    getListPhieuNhap({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        let path = "/kho/phieu-nhap-nha-cung-cap/chi-tiet/";
        switch (record.loaiNhapXuat) {
          case 10: //nha cung cap
            path = "/kho/phieu-nhap-nha-cung-cap/chi-tiet/";
            break;
          case 20: //du tru
            path = "/kho/phieu-nhap-du-tru/chi-tiet/";
            break;
          case 30: //chuyen kho
            path = "/kho/phieu-nhap-chuyen-kho/chi-tiet/";
            break;
          case 70: //nha cung cap
            path = "/kho/phieu-nhap-nha-cung-cap/chi-tiet/";
            break;
          case 80: //chuyen kho
            path = "/kho/nhap-kho/chi-tiet-linh-bu/";
            break;
          default:
            break;
        }
        const { id } = record;
        history.push(`${path}${id}`);
        updateDataNhapKho({
          phieuNhapXuatId: id,
          currentItem: { ...record },
        });
      },
    };
  };

  const setRowClassName = (record) => {
    let idDiff;
    idDiff = phieuNhapXuatId;
    return record.id === idDiff ? "row-actived" : "";
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Số phiếu"
          sort_key="soPhieu"
          dataSort={dataSortColumn["soPhieu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "soPhieu",
      key: "soPhieu",
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền"
          sort_key="thanhTien"
          dataSort={dataSortColumn["thanhTien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: (field, _, __) =>
        (field && formatNumber(Number.parseFloat(`${field}`))) || "",
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThai"
          dataSort={dataSortColumn["trangThai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        return listTrangThaiPhieuNhapXuat.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số hóa đơn"
          sort_key="soHoaDon"
          dataSort={dataSortColumn["soHoaDon"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "soHoaDon",
      key: "soHoaDon",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày hóa đơn"
          sort_key="ngayHoaDon"
          dataSort={dataSortColumn["ngayHoaDon"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "ngayHoaDon",
      key: "ngayHoaDon",
      render: (item) => item && moment(item).format("DD/MM/YYYY"),
    },
    {
      title: (
        <HeaderSearch
          title="Nhà cung cấp"
          sort_key="tenNhaCungCap"
          dataSort={dataSortColumn["tenNhaCungCap"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
    },
    {
      title: (
        <HeaderSearch
          title="Tháng dự trù"
          sort_key="thangDuTru"
          dataSort={dataSortColumn["thangDuTru"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "thangDuTru",
      key: "thangDuTru",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Quyết định thầu"
          sort_key="quyetDinhThau"
          dataSort={dataSortColumn["quyetDinhThau"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
    },
    {
      title: (
        <HeaderSearch
          title="Nguồn nhập kho"
          sort_key="tenNguonNhapKho"
          dataSort={dataSortColumn["tenNguonNhapKho"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "tenNguonNhapKho",
      key: "tenNguonNhapKho",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày tạo"
          sort_key="thoiGianTaoPhieu"
          dataSort={dataSortColumn["thoiGianTaoPhieu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "thoiGianTaoPhieu",
      key: "thoiGianTaoPhieu",
      render: (item) => {
        return item && moment(item).format(FORMAT_DATE_TIME);
      },
    },
    {
      title: (
        <HeaderSearch
          title="Người tạo"
          sort_key="tenNguoiTaoPhieu"
          dataSort={dataSortColumn["tenNguoiTaoPhieu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "tenNguoiTaoPhieu",
      key: "tenNguoiTaoPhieu",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày duyệt"
          sort_key="thoiGianDuyet"
          dataSort={dataSortColumn["thoiGianDuyet"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "thoiGianDuyet",
      key: "thoiGianDuyet",
      render: (item) => {
        return item && moment(item).format(FORMAT_DATE_TIME);
      },
    },
  ];
  return (
    <Main noPadding={true} top={8}>
      <TableWrapper
        columns={columns}
        dataSource={listPhieuNhap}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        rowClassName={setRowClassName}
        scroll={{ x: 2000 }}
      />
      <Pagination
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        listData={listPhieuNhap}
        total={totalElements}
        onShowSizeChange={handleSizeChange}
      />
    </Main>
  );
};

export default DanhSachPhieuNhap;
