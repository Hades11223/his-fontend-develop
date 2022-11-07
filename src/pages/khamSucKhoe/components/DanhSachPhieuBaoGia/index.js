import React, { useEffect } from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Pagination from "components/Pagination";
import IcEye from "assets/svg/ic-eye.svg";
import Icon from "@ant-design/icons";
import moment from "moment";

const DanhSachPhieuBaoGia = (props) => {
  const history = useHistory();
  const {
    listData,
    page,
    size,
    totalElements,
    listTrangThaiHopDong,
    dataSortColumn,

    onSearch,
    onSizeChange,
    getUtils,
    onSortChange,
  } = props;

  useEffect(() => {
    onSizeChange({ page, size });
    getUtils({ name: "TrangThaiHopDong" });
  }, []);

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const columns = [
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
          title="Mã báo giá"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || ""}
        />
      ),
      width: "120px",
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên báo giá"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || ""}
        />
      ),
      width: "300px",
      dataIndex: "ten",
      key: "ten",
      render: (item) => {
        return item;
      },
    },
    {
      title: <HeaderSearch title="Tên công ty" />,
      width: "300px",
      dataIndex: "tenDoiTac",
      key: "tenDoiTac",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["trangThai"] || ""}
        />
      ),
      width: "170px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        return listTrangThaiHopDong.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngày tạo báo giá"
          sort_key="thoiGianTao"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianTao"] || ""}
        />
      ),
      width: "150px",
      dataIndex: "thoiGianTao",
      key: "thoiGianTao",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày cập nhật"
          sort_key="thoiGianCapNhat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianCapNhat"] || ""}
        />
      ),
      width: "150px",
      dataIndex: "thoiGianCapNhat",
      key: "thoiGianCapNhat",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
    },
    {
      title: <HeaderSearch title="Tiện ích" />,
      width: "80px",
      fixed: "right",
      align: "center",
      render: () => {
        return (
          <div className="ic-action">
            <Icon component={IcEye} />
          </div>
        );
      },
    },
  ];

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        history.push("/kham-suc-khoe/phieu-bao-gia/chi-tiet/" + id);
      },
    };
  };

  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listData || []}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
      />
      {!!totalElements && (
        <Pagination
          listData={listData || []}
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        />
      )}
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    khamSucKhoe: { listData, totalElements, page, size, dataSortColumn },
    utils: { listTrangThaiHopDong = [] },
  } = state;
  return {
    listData,
    totalElements,
    page,
    size,
    listTrangThaiHopDong,
    dataSortColumn,
  };
};

const mapDispatchToProps = ({
  khamSucKhoe: { onSearch, onSizeChange, onSortChange },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  getUtils,
  onSortChange,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanhSachPhieuBaoGia);
