import React, { useEffect } from "react";
import { Main, ContentTable } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Pagination from "components/Pagination";
import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";

const DATE_FORMAT = "DD/MM/YYYY";

const DanhSachLienThongGPP = (props) => {
  const history = useHistory();
  const {
    dataSearch,
    listData,
    page,
    size,
    totalElements,
    listLoaiNhapXuat,
    listTrangThaiGpp,

    onSizeChange,
    onSearch,
    getUtils,
  } = props;

  //effect
  useEffect(() => {
    getUtils({ name: "LoaiNhapXuat" });
    getUtils({ name: "TrangThaiGpp" });

    onSizeChange({ page, size });
  }, []);

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    //danh sách liên thông hóa đơn bán thuốc
    {
      title: <HeaderSearch title="Mã NB" sort_key="maNb" />,
      dataIndex: "maNb",
      key: "maNb",
      width: 120,
      hidden: dataSearch?.dsLoaiNhapXuat !== "120",
      render: (item) => {
        return item;
      },
    },
    {
      title: <HeaderSearch title="Mã hồ sơ" sort_key="maHoSo" />,
      dataIndex: "maHoSo",
      key: "maHoSo",
      width: 120,
      hidden: dataSearch?.dsLoaiNhapXuat !== "120",
      render: (item) => {
        return item;
      },
    },
    {
      title: <HeaderSearch title="Tên người bệnh" sort_key="tenNb" />,
      dataIndex: "tenNb",
      key: "tenNb",
      width: 300,
      hidden: dataSearch?.dsLoaiNhapXuat !== "120",
      render: (item) => {
        return item;
      },
    },
    {
      title: <HeaderSearch title="Số phiếu" sort_key="soPhieu" />,
      dataIndex: "soPhieu",
      key: "soPhieu",
      width: 120,
      hidden: dataSearch?.dsLoaiNhapXuat !== "120",
      render: (item) => {
        return item;
      },
    },
    {
      title: <HeaderSearch title="Ngày phát" sort_key="ngayPhat" />,
      dataIndex: "ngayPhat",
      key: "ngayPhat",
      width: 150,
      hidden: dataSearch?.dsLoaiNhapXuat !== "120",
      render: (item) => {
        return moment(item).format(DATE_FORMAT);
      },
    },
    //danh sách liên thông phiếu nhập
    {
      title: <HeaderSearch title="Số phiếu" sort_key="soPhieu" />,
      dataIndex: "soPhieu",
      key: "soPhieu",
      width: 120,
      hidden: dataSearch?.dsLoaiNhapXuat !== "40, 90",
      render: (item) => {
        return item;
      },
    },
    {
      title: <HeaderSearch title="Ngày nhập" sort_key="ngayNhap" />,
      dataIndex: "ngayNhap",
      key: "ngayNhap",
      width: 150,
      hidden: dataSearch?.dsLoaiNhapXuat !== "40, 90",
      render: (item) => {
        return moment(item).format(DATE_FORMAT);
      },
    },
    {
      title: <HeaderSearch title="Loại phiếu nhập" sort_key="loaiNhapXuat" />,
      dataIndex: "loaiNhapXuat",
      key: "loaiNhapXuat",
      width: 150,
      hidden: dataSearch?.dsLoaiNhapXuat !== "40, 90",
      render: (item) => {
        return listLoaiNhapXuat.find((x) => x.id === item)?.ten || "";
      },
    },
    {
      title: <HeaderSearch title="Nhà cung cấp" sort_key="nhaCungCap" />,
      dataIndex: "nhaCungCap",
      key: "nhaCungCap",
      width: 340,
      hidden: dataSearch?.dsLoaiNhapXuat !== "40, 90",
    },
    //danh sách liên thông phiếu xuất
    {
      title: <HeaderSearch title="Số phiếu" sort_key="soPhieu" />,
      dataIndex: "soPhieu",
      key: "soPhieu",
      width: 120,
      hidden: dataSearch?.dsLoaiNhapXuat !== "10",
      render: (item) => {
        return item;
      },
    },
    {
      title: <HeaderSearch title="Ngày nhập" sort_key="ngayNhap" />,
      dataIndex: "ngayNhap",
      key: "ngayNhap",
      width: 150,
      hidden: dataSearch?.dsLoaiNhapXuat !== "10",
      render: (item) => {
        return moment(item).format(DATE_FORMAT);
      },
    },
    {
      title: <HeaderSearch title="Loại phiếu xuất" sort_key="loaiNhapXuat" />,
      dataIndex: "loaiNhapXuat",
      key: "loaiNhapXuat",
      width: 150,
      hidden: dataSearch?.dsLoaiNhapXuat !== "10",
      render: (item) => {
        return listLoaiNhapXuat.find((x) => x.id === item)?.ten || "";
      },
    },
    {
      title: <HeaderSearch title="Nhà cung cấp" sort_key="nhaCungCap" />,
      dataIndex: "nhaCungCap",
      width: 340,
      hidden: dataSearch?.dsLoaiNhapXuat !== "10",
      key: "nhaCungCap",
    },
    //end
    {
      title: <HeaderSearch title="Mã GPP" sort_key="maGpp" />,
      dataIndex: "maGpp",
      width: 200,
      key: "maGpp",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày đẩy liên thông"
          sort_key="thoiGianLienThongGpp"
        />
      ),
      width: 150,
      dataIndex: "thoiGianLienThongGpp",
      key: "thoiGianLienThongGpp",
      render: (item) => {
        return item ? moment(item).format(DATE_FORMAT) : "";
      },
    },
    {
      title: <HeaderSearch title="Người đẩy liên thông" />,
      dataIndex: "tenNguoiDay",
      key: "tenNguoiDay",
      width: 150,
    },
    {
      title: <HeaderSearch title="Trạng thái" sort_key="trangThaiGpp" />,
      dataIndex: "trangThaiGpp",
      key: "trangThaiGpp",
      width: 150,
      render: (item) => {
        return listTrangThaiGpp.find((x) => x.id === item)?.ten || "";
      },
    },
    {
      title: <HeaderSearch title="Tiện ích" />,
      width: "100px",
      render: () => {
        return <EyeOutlined />;
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
        history.push("/nha-thuoc/lien-thong-gpp/chi-tiet/" + id);
      },
    };
  };

  const _tableTitle =
    dataSearch.dsLoaiNhapXuat === "120"
      ? "Danh sách Hóa đơn bán thuốc"
      : dataSearch.dsLoaiNhapXuat === "10"
      ? "Danh sách phiếu xuất kho"
      : "Danh sách phiếu nhập kho";

  return (
    <Main noPadding={true}>
      <TableWrapper
        title={<label>{_tableTitle}</label>}
        columns={columns}
        dataSource={listData || []}
        onRow={onRow}
        rowKey={(record) => `${record.index}-${record.id}`}
      />
      <Pagination
        listData={listData || []}
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
    lienThongGpp: { listData, totalElements, page, size, dataSearch },
    utils: { listLoaiNhapXuat = [], listTrangThaiGpp = [] },
  } = state;
  return {
    dataSearch,
    listData,
    totalElements,
    page,
    size,
    listLoaiNhapXuat,
    listTrangThaiGpp,
  };
};

const mapDispatchToProps = ({
  lienThongGpp: { onSearch, onSizeChange },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  getUtils,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanhSachLienThongGPP);
