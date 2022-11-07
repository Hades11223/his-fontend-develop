import React, { useEffect } from "react";
import TableWrapper from "components/TableWrapper";
import { Main } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { formatDecimal } from "../../../thuNgan/danhSachPhieuThu/configs";
import { Tooltip } from "antd";
import { FORMAT_DATE_TIME } from "constants/index";
import IcEye from "assets/svg/ic-eye.svg";

const DanhSach = (props) => {
  const history = useHistory();
  const { dataSortColumn } = useSelector(
    (state) => state.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT
  );

  const { onSortChange, updateData } =
    useDispatch().danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT;
  const {
    onSizeChange,
    getUtils,
    totalElements,
    page,
    size,
    phieuNhapXuatId,
    getList,
    listData,
  } = props;

  useEffect(() => {
    getUtils({ name: "trangThaiKy" });
    getUtils({ name: "doituongkcb" });
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
          `/quyet-toan-bhyt/danh-sach-nguoi-benh-cho-tao-ho-so-quyet-toan-bhyt/chi-tiet/${id}`
        );
      },
    };
  };

  const setRowClassName = (record) => {
    let idDiff;
    idDiff = phieuNhapXuatId;
    return record.id === idDiff ? "row-actived" : "";
  };
  const onViewDetail = (item) => () => {
    updateData({
      dataCurrent: item,
    });
    history.push(
      `/quyet-toan-bhyt/danh-sach-nguoi-benh-cho-tao-ho-so-quyet-toan-bhyt/chi-tiet/${item?.id}`
    );
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "22px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày đăng ký"
          sort_key="thoiGianVaoVien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianVaoVien"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      render: (item) => {
        return item && moment(item).format(FORMAT_DATE_TIME);
      },
    },
    {
      title: (
        <HeaderSearch
          title="Họ tên người bệnh"
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenNb"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenNb",
      key: "tenNb",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã hồ sơ"
          sort_key="maHoSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maHoSo"] || ""}
        />
      ),
      align: "right",
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã NB"
          sort_key="maNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maNb"] || ""}
        />
      ),
      align: "right",
      width: "50px",
      dataIndex: "maNb",
      key: "maNb",
    },
    {
      title: (
        <HeaderSearch
          title="Tổng chi phí"
          sort_key="tongTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tongTien"] || ""}
        />
      ),
      align: "right",
      width: "50px",
      dataIndex: "tongTien",
      key: "tongTien",
      render: (item) => {
        return item && formatDecimal(item);
      },
    },
    {
      title: (
        <HeaderSearch
          title="BHYT chi trả"
          sort_key="tienBhThanhToan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tienBhThanhToan"] || ""}
        />
      ),
      align: "right",
      width: "50px",
      dataIndex: "tienBhThanhToan",
      key: "tienBhThanhToan",
      render: (item) => {
        return item && formatDecimal(item);
      },
    },
    {
      title: (
        <HeaderSearch
          title="NB phải trả"
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thanhTien"] || ""}
        />
      ),
      align: "right",
      width: "50px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      render: (item) => {
        return item && formatDecimal(item);
      },
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian thanh toán"
          sort_key="thoiGianThanhToan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianThanhToan"] || ""}
        />
      ),
      width: "60px",
      dataIndex: "thoiGianThanhToan",
      key: "thoiGianThanhToan",
      render: (item) => {
        return item && moment(item).format(FORMAT_DATE_TIME);
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          sort_key="tenKhoaNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenKhoaNb"] || ""}
        />
      ),
      width: "80px",
      dataIndex: "tenKhoaNb",
      key: "tenKhoaNb",
      fixed: "right",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Xem chi tiết"
          // sort_key="diaChi"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn["soPhieu"] || ""}
        />
      ),
      width: "30px",
      // dataIndex: "diaChi",
      // key: "diaChi",
      align: "center",
      render: (item) => {
        return (
          <Tooltip title="Xem chi tiết" placement="bottom">
            <IcEye onClick={onViewDetail(item)} className={"ic-detail"}/>
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
        rowClassName={setRowClassName}
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
    danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT: {
      listData,
      totalElements,
      page,
      size,
    },
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
  danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT: {
    getList,
    updateData,
    onSizeChange,
  },
  utils: { getUtils },
}) => ({
  getList,
  updateData,
  onSizeChange,
  getUtils,
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSach);
