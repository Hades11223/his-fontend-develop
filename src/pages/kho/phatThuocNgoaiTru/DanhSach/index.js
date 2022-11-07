import React from "react";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatNumber } from "utils";
import moment from "moment";
import IcView from "assets/images/kho/icView.png";
import { Tooltip } from "antd";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import { Main } from "./styled";

const DanhSach = (props) => {
  const {
    phatThuocNgoaiTru: {
      listDonThuocNgoaiTru,
      totalElements,
      page,
      size,
      dataSortColumn,
    },
  } = useSelector((state) => state);
  const [listTrangThaiPhieuNhapXuat] = useEnum(ENUM.TRANG_THAI_PHIEU_NHAP_XUAT);

  const {
    phatThuocNgoaiTru: { getListDonThuocNgoaiTru, onSizeChange, onSortChange },
  } = useDispatch();

  const onChangePage = (page) => {
    getListDonThuocNgoaiTru({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: () => {
        history.push(`/kho/phat-thuoc-ngoai-tru/chi-tiet/${record.id}`);
      },
    };
  };
  const setRowClassName = (record) => {
    let idDiff;
    // idDiff = phieuNhapXuatId;
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
          title="Họ tên người bệnh"
          sort_key="thanhTien"
          dataSort={dataSortColumn["tenNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "tenNb",
      key: "tenNb",
      align: "left",
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
          title="Mã hồ sơ"
          sort_key="trangThai"
          dataSort={dataSortColumn["maHoSo"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã NB"
          sort_key="maNb"
          dataSort={dataSortColumn["maNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "maNb",
      key: "maNb",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Địa chỉ"
          sort_key="diaChi"
          dataSort={dataSortColumn["diaChi"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày đăng ký"
          sort_key="thoiGianVaoVien"
          dataSort={dataSortColumn["thoiGianVaoVien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "60px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      align: "center",
      render: (item) => {
        return item ? moment(item).format("DD/MM/YYYY HH:mm:ss") : null;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái đơn"
          sort_key="trangThai"
          dataSort={dataSortColumn["trangThai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "60px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        return listTrangThaiPhieuNhapXuat.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title="Xem đơn thuốc" />,
      width: "50px",
      dataIndex: "action",
      key: "action",
      align: "center",
      fixed: "right",
      render: () => {
        return (
          <Tooltip title="Xem đơn thuốc">
            <img src={IcView} alt="..." />
          </Tooltip>
        );
      },
    },
  ];
  return (
    <Main noPadding={true} top={10}>
      <TableWrapper
        columns={columns}
        dataSource={listDonThuocNgoaiTru || []}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        rowClassName={setRowClassName}
        scroll={{ x: 2000 }}
      />
      <Pagination
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        listData={listDonThuocNgoaiTru}
        total={totalElements}
        onShowSizeChange={handleSizeChange}
      />
    </Main>
  );
};

export default DanhSach;
