import React, { useEffect, useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Pagination } from "components";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { formatDecimal } from "../../../thuNgan/danhSachPhieuThu/configs";
import { Tooltip } from "antd";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const DanhSach = (props) => {
  const history = useHistory();
  const { dataSortColumn, listData, totalElements, page, size } = useSelector(
    (state) => state.danhSachHoSoBaoHiem79A46QD4201
  );
  const { onSortChange, updateData, getList, onSizeChange } =
    useDispatch().danhSachHoSoBaoHiem79A46QD4201;
  const [listTrangThaiDlqt] = useEnum(ENUM.TRANG_THAI_DLQT);
  const [listTrangThaiQuyetToan] = useEnum(ENUM.TRANG_THAI_QUYET_TOAN);

  useEffect(() => {
    onSizeChange({});
    return () => {
      updateData({
        dataSortColumn: {},
        maHoSo: "",
        dataSearch: {},
      });
    };
  }, []);
  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };
  const onChangePage = (page) => {
    getList({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        updateData({
          dataCurrent: record,
        });
        history.push(
          `/quyet-toan-bhyt/danh-sach-ho-so-bao-hiem-79a-46cot-theo-qd4210/chi-tiet/${id}`
        );
      },
    };
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "15px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="MA_LK"
          sort_key="maLk"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maLk"] || ""}
        />
      ),
      width: "30px",
      dataIndex: "MA_LK",
      key: "MA_LK",
      align: "right",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="HO_TEN"
          sort_key="hoTen"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["hoTen"] || ""}
        />
      ),
      width: "40px",
      dataIndex: "HO_TEN",
      key: "HO_TEN",
      render: (item) => {
        return item?.toUpperCase();
      },
    },
    {
      title: (
        <HeaderSearch
          title="MA_BN"
          sort_key="maBn"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maBn"] || ""}
        />
      ),
      align: "right",
      width: "30px",
      dataIndex: "MA_BN",
      key: "MA_BN",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MA_THE"
          sort_key="maThe"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maThe"] || ""}
        />
      ),
      align: "right",
      width: "30px",
      dataIndex: "MA_THE",
      key: "MA_THE",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T_TONGCHI"
          sort_key="tTongchi"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tTongchi"] || ""}
        />
      ),
      align: "right",
      width: "30px",
      dataIndex: "T_TONGCHI",
      key: "T_TONGCHI",
      render: (item) => {
        return item && formatDecimal(item);
      },
    },
    {
      title: (
        <HeaderSearch
          title="NGAY_TTOAN"
          sort_key="ngayTtoan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngayTtoan"] || ""}
        />
      ),
      width: "40px",
      dataIndex: "NGAY_TTOAN",
      key: "NGAY_TTOAN",
      render: (item) => {
        return (
          item && moment(item, "YYYYMMDDhhmmss").format("DD/MM/YYYY HH:mm:ss")
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngày tạo hồ sơ"
          sort_key="thoiGianTaoHoSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianTaoHoSo"] || ""}
        />
      ),
      width: "40px",
      dataIndex: "thoiGianTaoHoSo",
      key: "thoiGianTaoHoSo",
      render: (item) => {
        return item && moment(item).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái DLQT"
          sort_key="trangThaiDlqt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["trangThaiDlqt"] || ""}
        />
      ),
      width: "30px",
      dataIndex: "trangThaiDlqt",
      key: "trangThaiDlqt",
      render: (item) => {
        return (listTrangThaiDlqt || []).find((x) => x.id === item)?.ten;
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
      width: "30px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        return (
          item &&
          listTrangThaiQuyetToan?.find((itemTT) => itemTT.id === item)?.ten
        );
      },
    },
    {
      title: <HeaderSearch title="Xem chi tiết" />,
      width: "30px",
      align: "center",
      render: (item) => {
        return (
          <Tooltip title="Xem chi tiết" placement="bottom">
            <img
              src={require("assets/images/utils/eye.png")}
              alt=""
              onClick={() => {
                updateData({
                  dataCurrent: item,
                });
                history.push(
                  `/quyet-toan-bhyt/danh-sach-ho-so-bao-hiem-79a-46cot-theo-qd4210/chi-tiet/${item?.id}`
                );
              }}
            />
          </Tooltip>
        );
      },
    },
  ];
  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listData}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        scroll={{ x: "1920px" }}
      />
      <Pagination
        listData={listData}
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        total={totalElements}
        onShowSizeChange={handleSizeChange}
      />
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    danhSachHoSoBaoHiem79A46QD4201: { listData, totalElements, page, size },
    utils: { listTrangThaiPhieuNhapXuat = [] },
  } = state;
  return {
    listData,
    listTrangThaiPhieuNhapXuat,
    totalElements,
    page,
    size,
  };
};
const mapDispatchToProps = ({
  danhSachHoSoBaoHiem79A46QD4201: { getList, updateData, onSizeChange },
  utils: { getUtils },
}) => ({
  getList,
  updateData,
  onSizeChange,
  getUtils,
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSach);
