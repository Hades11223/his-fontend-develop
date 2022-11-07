import React, { useEffect } from "react";
import { Main } from "./styled";
import { TableWrapper, Pagination } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import IcEye from "assets/svg/ic-eye.svg";
import Icon from "@ant-design/icons";
import moment from "moment";
import { Tooltip } from "antd";

const DanhSachHopDong = (props) => {
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
    onSizeChange({
      page,
      size,
      dataSearch: {
        dsTrangThai: [20, 40, 50],
      },
    });
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
          title="Mã thanh toán HĐ"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || ""}
        />
      ),
      width: "120px",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên hợp đồng"
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
      title: (
        <HeaderSearch
          title="Mã công ty"
          sort_key="doiTacId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["doiTacId"] || ""}
        />
      ),
      width: "120px",
      dataIndex: "doiTacId",
      key: "doiTacId",
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
          title="Ngày hiệu lực HĐ"
          sort_key="ngayHieuLuc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngayHieuLuc"] || ""}
        />
      ),
      width: "150px",
      dataIndex: "ngayHieuLuc",
      key: "ngayHieuLuc",
      render: (field, item, index) =>
        field ? moment(field).format("DD/MM/YYYY HH:mm") : "",
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
      title: <HeaderSearch title="Tiện ích" />,
      width: "80px",
      align: "center",
      fixed: "right",
      render: () => {
        return (
          <Tooltip title="Xem chi tiết hợp đồng">
            <div className="ic-action">
              <Icon component={IcEye} />
            </div>
          </Tooltip>
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
        history.push("/kham-suc-khoe/hop-dong/chi-tiet/" + id);
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
    hopDongKSK: { listData, totalElements, page, size, dataSortColumn },
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
  hopDongKSK: { onSearch, onSizeChange, onSortChange },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  getUtils,
  onSortChange,
});

export default connect(mapStateToProps, mapDispatchToProps)(DanhSachHopDong);
