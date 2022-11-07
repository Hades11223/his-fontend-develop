import React, { useEffect, useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { TRANG_THAI_DIEU_TRI } from "constants/index";

const DanhSach = (props) => {
  const {
    dataSortColumn,
    onSizeChange,
    listThongTinNguoiBenh,
    totalElements,
    page,
    size,
    onChangeInputSearch,
    onSortChange,
    updateData,
    getListNguoiBenh,
  } = props;
  useEffect(() => {
    onSizeChange(10);
  }, []);

  const onChangePage = (page) => {
    getListNguoiBenh({ page: page - 1 });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        updateData({
          selectedId: id,
        });
        history.push(
          "/theo-doi-nguoi-benh/danh-sach-nguoi-benh/chi-tiet/" + id
        );
      },
    };
  };

  // const setRowClassName = (record) => {
  //   let idDiff;
  //   idDiff = phieuNhapXuatId;
  //   return record.id === idDiff ? "row-actived" : "";
  // };

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
          title="Ngày đăng ký"
          sort_key="thoiGianVaoVien"
          dataSort={dataSortColumn["thoiGianVaoVien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      render: (field, item, index) =>
        field ? moment(field).format("DD / MM / YYYY") : "",
    },
    {
      title: (
        <HeaderSearch
          title="Mã hồ sơ"
          sort_key="maHoSo"
          dataSort={dataSortColumn["maHoSo"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title="Họ tên"
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày sinh"
          sort_key="ngaySinh"
          dataSort={dataSortColumn["ngaySinh"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      render: (item, data, index) =>
        item ? moment(item).format("DD/MM/YYYY") : "",
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
          title="Số điện thoại"
          sort_key="soDienThoai"
          dataSort={dataSortColumn["soDienThoai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
      render: (item) => {
        return item;
      },
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
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái điều trị"
          sort_key="maTheBhyt"
          dataSort={dataSortColumn["ketThucTheoDoiCovid"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "ketThucTheoDoiCovid",
      key: "ketThucTheoDoiCovid",
      render: (item) => {
        return TRANG_THAI_DIEU_TRI.find((x) => x.id === (item ? item : false))
          ?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="NB Covid"
          sort_key="covid"
          dataSort={dataSortColumn["covid"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px  ",
      dataIndex: "covid",
      key: "covid",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item}></Checkbox>;
      },
    },
  ];
  return (
    <Main>
      <ContentTable>
        <TableWrapper
          columns={columns}
          dataSource={listThongTinNguoiBenh}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
          // rowClassName={setRowClassName}
        />
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          listData={listThongTinNguoiBenh}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
    </Main>
  );
};

export default connect(
  (state) => ({
    dataSortColumn: state.danhSachCovid.dataSortColumn || {},
    listThongTinNguoiBenh: state.danhSachCovid.listNguoiBenh || [],
    totalElements: state.danhSachCovid.totalElements || 0,
    page: state.danhSachCovid.page || 0,
    size: state.danhSachCovid.size || 10,
  }),
  ({
    danhSachCovid: {
      onSizeChange,
      onChangeInputSearch,
      onSortChange,
      updateData,
      getListNguoiBenh,
    },
  }) => ({
    onSizeChange,
    onChangeInputSearch,
    onSortChange,
    updateData,
    getListNguoiBenh,
  })
)(DanhSach);
