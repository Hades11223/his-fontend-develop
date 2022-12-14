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
          title="S??? phi???u nh???p"
          sort_key="soPhieu"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nh???p s??? phi???u"
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
          title="S??? h??a ????n"
          sort_key="soHoaDon"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nh???p s??? h??a ????n"
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
          title="Nh?? cung c???p"
          sort_key="nhaCungCap"
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...(listNhaSanXuat || [])]}
              placeholder="Nh???p nh?? cung c???p"
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
          title="Tr???ng th??i"
          sort_key="trangThai"
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...listTrangThaiPhieuNhapXuat]}
              placeholder="Nh???p tr???ng th??i"
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
          title="Ngu???n nh???p kho"
          searchSelect={
            <Select
              data={listNguonNhapKho}
              placeholder="Nh???p nh?? cung c???p"
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
          title="Quy???t ?????nh th???u"
          searchSelect={
            <Select
              data={listAllQuyetDinhThau}
              placeholder="Quy???t ?????nh th???u"
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
          title="Th??nh ti???n"
          sort_key="thanhTien"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nh???p th??nh ti???n"
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
          title="Ng??y duy???t"
          searchSelect={
            <DatePicker
              placeholder="Nh???p ng??y duy???t"
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
          <span>Danh s??ch phi???u nh???p</span>
          <Button className="btn-show" onClick={showChiTiet}>
            <img src={IcUp} alt="..." />
          </Button>
        </div>
        <div className="header__right">
          <Button className="btn_new">
            <span>Th??m m???i</span>
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
