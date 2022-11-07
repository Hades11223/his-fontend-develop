import { Button, Row, Input, DatePicker } from "antd";
import React, { useEffect } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcUp from "assets/images/kho/IcUp.png";
import { connect } from "react-redux";
import moment from "moment";
import Select from "components/Select";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

let timer = null;

const DanhSachRutGon = (props) => {
  const {
    dataSortColumn,
    getListPhieuNhap,
    onSizeChange,
    listPhieuNhap,
    totalElements,
    page,
    size,
    updateDataNhapKho,
    phieuNhapXuatId,
    onChangeInputSearch,
    listNhaSanXuat,
    listNguonNhapKho,
    listAllQuyetDinhThau,
    updateData,
  } = props;
  const [listTrangThaiPhieuNhapXuat] = useEnum(ENUM.TRANG_THAI_PHIEU_NHAP_XUAT);
  useEffect(() => {
    onSizeChange({ size: 20 });
  }, []);
  const onClickSort = () => {};
  const onChangePage = (page) => {
    getListPhieuNhap({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
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

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({ [key]: value });
    }, 300);
  };

  const showChiTiet = () => {
    updateData({ chiTiet: true });
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
          title="Số phiếu nhập"
          sort_key="soPhieu"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nhập số phiếu"
              onChange={onSearchInput("soPhieu")}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "soPhieu",
      key: "soPhieu",
    },
    {
      title: (
        <HeaderSearch
          title="Số hóa đơn"
          sort_key="soHoaDon"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nhập số hóa đơn"
              onChange={onSearchInput("soHoaDon")}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "soHoaDon",
      key: "soHoaDon",
    },
    {
      title: (
        <HeaderSearch
          title="Nhà cung cấp"
          sort_key="nhaCungCap"
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...(listNhaSanXuat || [])]}
              placeholder="Nhập nhà cung cấp"
              onChange={onSearchInput("nhaCungCapId")}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "nhaCungCap",
      key: "nhaCungCap",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThai"
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listTrangThaiPhieuNhapXuat]}
              placeholder="Nhập trạng thái"
              onChange={onSearchInput("trangThai")}
            />
          }
        />
      ),
      width: "70px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        return listTrangThaiPhieuNhapXuat.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nguồn nhập kho"
          searchSelect={
            <Select
              data={listNguonNhapKho}
              placeholder="Nhập nhà cung cấp"
              onChange={onSearchInput("nguonNhapKhoId")}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "nguonNhapKho",
      key: "nguonNhapKho",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Quyết định thầu"
          searchSelect={
            <Select
              data={listAllQuyetDinhThau}
              placeholder="Quyết định thầu"
              onChange={onSearchInput("quyetDinhThauId")}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền"
          sort_key="thanhTien"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nhập thành tiền"
              onChange={onSearchInput("thanhTien")}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "thanhTien",
      key: "thanhTien",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày duyệt"
          searchSelect={
            <DatePicker
              placeholder="Nhập ngày duyệt"
              format="YYYY-MM-DD"
              onChange={onSearchInput("thoiGianDuyet")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "thoiGianDuyet",
      key: "thoiGianDuyet",
      render: (item) => {
        return item && moment(item).format("YYYY-MM-DD");
      },
    },
  ];
  return (
    <Main>
      <Row className="header">
        <div className="header__left">
          <span>Danh sách phiếu nhập</span>
          <Button className="btn-show" onClick={showChiTiet}>
            <img src={IcUp} alt="..." />
          </Button>
        </div>
        <div className="header__right">
          <Button className="btn_new">
            <span>Thêm mới</span>
            <img src={IcCreate} alt="IcCreate" />
          </Button>
        </div>
      </Row>
      <ContentTable>
        <TableWrapper
          columns={columns}
          dataSource={listPhieuNhap}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
          rowClassName={setRowClassName}
          scroll={{ x: 1000 }}
        />
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listPhieuNhap}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    nhapKho: { listPhieuNhap, totalElements, page, size },
    nhapKhoChiTiet: { phieuNhapXuatId },
    nhaSanXuat: { listNhaSanXuat },
    nguonNhapKho: { listData: listNguonNhapKho },
    quyetDinhThau: { listAllQuyetDinhThau },
  } = state;
  return {
    listPhieuNhap,
    totalElements,
    page,
    size,
    phieuNhapXuatId,
    listNhaSanXuat,
    listNguonNhapKho,
    listAllQuyetDinhThau,
  };
};
const mapDispatchToProps = ({
  nhapKho: { getListPhieuNhap, onSizeChange, updateData, onChangeInputSearch },
  nhapKhoChiTiet: { updateData: updateDataNhapKho },
}) => ({
  getListPhieuNhap,
  onSizeChange,
  updateDataNhapKho,
  updateData,
  onChangeInputSearch,
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSachRutGon);
