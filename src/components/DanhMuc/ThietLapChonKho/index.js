import React, { useState, useEffect } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { connect } from "react-redux";
import TabPanel from "components/MultiLevelTab/TabPanel";
import { HIEU_LUC } from "constants/index";
import { Checkbox, InputNumber } from "antd";
import { useHistory } from "react-router-dom";

function ThietLapChonKho(props) {
  const {
    size,
    page,
    totalElements,
    khoId,
    listdoiTuong,
    listAllLoaiDoiTuong,
  } = props;
  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
  });
  const [data, setData] = useState([]);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const history = useHistory();

  useEffect(() => {
    props.getListThietLapChonKho({ khoId });
    props.getListAllKhoa();
    props.getAllKhoTongHop({});
    props.getListAllPhong({});
    props.getListAccount({});
    props.getListAllLoaiDoiTuong({});
    props.getUtils({ name: "doiTuong" });
  }, [khoId]);

  const YES_NO = [
    { id: "", ten: "Tất cả" },
    { id: true, ten: "Có" },
    { id: false, ten: "Không" },
  ];

  useEffect(() => {
    const data = props.listThietLapChonKho.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [props.listThietLapChonKho, page, size]);

  useEffect(() => {
    setState({
      listAllKhoa: [{ id: "", ten: "Tất cả" }, ...props.listAllKhoa],
    });
  }, [props.listAllKhoa]);

  useEffect(() => {
    setState({
      listAllKho: [{ id: "", ten: "Tất cả" }, ...props.listAllKho],
    });
  }, [props.listAllKho]);

  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  const onAddNewRow = () => {
    history.push(`/kho/thiet-lap-kho-chi-dinh`);
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    props.onChangeInputSearch({
      [key]: value,
      khoId,
    });
  };

  const onChange = (key, selector) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e._d;
    else value = e;
    if (state.currentItem) {
      if (selector) {
        if (!state.currentItem[selector]) state.currentItem[selector] = {};
        state.currentItem[selector][key] = value;
      } else state.currentItem[key] = value;
    }
  };

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1, khoId });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size, khoId });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 48,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Kho"
          sort_key="khoId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoId"] || 0}
          searchSelect={
            <Select
              data={state.listAllKho}
              placeholder="Chọn kho"
              onChange={onSearchInput("khoId")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "kho",
      key: "kho",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa Chỉ Định"
          sort_key="khoaChiDinhId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoaChiDinhId"] || 0}
          searchSelect={
            <Select
              data={state.listAllKhoa}
              placeholder="Chọn khoa chỉ định"
              onChange={onSearchInput("khoaChiDinhId")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "khoaChiDinh",
      key: "khoaChiDinh",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa NB"
          sort_key="khoaNbId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoaNbId"] || 0}
          searchSelect={
            <Select
              data={state.listAllKhoa}
              placeholder="Chọn khoa NB"
              onChange={onSearchInput("khoaNbId")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "khoaNb",
      key: "khoaNb",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại dối tượng"
          sort_key="loaiDoiTuongId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["loaiDoiTuongId"] || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={[{ id: "", ten: "Tất cả" }, ...(listAllLoaiDoiTuong || [])]}
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "loaiDoiTuongId");
              }}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "loaiDoiTuong",
      key: "loaiDoiTuong",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đối tượng"
          sort_key="doiTuong"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["doiTuong"] || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={[{ id: "", ten: "Tất cả" }, ...(listdoiTuong || [])]}
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "doiTuong");
              }}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "doiTuong",
      key: "doiTuong",
      render: (item) => {
        if (item && listdoiTuong) {
          const index = listdoiTuong.findIndex((e) => e.id === item);
          return listdoiTuong[index].ten;
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={YES_NO}
              placeholder="Nội trú"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "noiTru");
              }}
            />
          }
          sort_key="noiTru"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.noiTru || 0}
          title="Nội trú"
        />
      ),
      width: 100,
      dataIndex: "noiTru",
      key: "noiTru",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Là cấp cứu"
          sort_key="capCuu"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["capCuu"] || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Cấp cứu"
              onChange={onSearchInput("capCuu")}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "capCuu",
      key: "capCuu",
      align: "center",
      render: (item, list, index) => {
        return <Checkbox checked={item}></Checkbox>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Cận lâm sàng"
          sort_key="canLamSang"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["canLamSang"] || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Cận lâm sàng"
              onChange={onSearchInput("canLamSang")}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "canLamSang",
      key: "canLamSang",
      align: "center",
      render: (item, list, index) => {
        return <Checkbox checked={item}></Checkbox>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Phòng"
          sort_key="phongId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={props.listAllPhong}
              onChange={(value) => {
                onSearchInput(value, "phongId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "phong",
      key: "phong",
      render: (item) => {
        return item && item?.ten;
      },
    },
    ,
    {
      title: (
        <HeaderSearch
          title="Chức vụ"
          sort_key="chucVuId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={props.listChucVu}
              placeholder="Tìm kiếm"
              onChange={onSearchInput("chucVuId")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "chucVu",
      key: "chucVu",
      render: (item) => {
        return item && item?.ten;
      },
    },
    ,
    {
      title: (
        <HeaderSearch
          title="Tài khoản"
          sort_key="nhanVienId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={props.listAccount}
              onChange={(value) => {
                onSearchInput(value, "nhanVienId");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "nhanVien",
      key: "nhanVien",
      align: "center",
      render: (item) => {
        return item && item?.ten;
      },
    },
    ,
    {
      title: (
        <HeaderSearch
          title="Ưu tiên"
          sort_key="uuTien"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          search={
            <InputNumber
              placeholder="Tìm kiếm"
              onChange={(value) => {
                onSearchInput(value, "uuTien");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "uuTien",
      key: "uuTien",
      align: "center",
    },
    ,
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <Checkbox defaultChecked={item} onChange={onChange("active")} />
          );
        } else return <Checkbox checked={item} onChange={onChange("active")} />;
      },
    },
  ];
  const onRow = (record = {}, index) => {
    return {
      onClick: (event) => {
        setState({
          currentItem: JSON.parse(JSON.stringify(record)),
          currentIndex: index,
        });
      },
    };
  };
  return (
    <TabPanel>
      <EditWrapper
        title={"Thiết lập kho chỉ định"}
        // showAdded={khoId && !state.currentItem}
        showAdded={true}
        onAddNewRow={onAddNewRow}
      >
        <TableWrapper
          scroll={{ y: 500, x: 700 }}
          columns={columns}
          dataSource={khoId ? data : []}
          onRow={onRow}
        ></TableWrapper>
        {khoId && totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={props.page + 1}
            pageSize={props.size}
            listData={khoId ? data : []}
            total={totalElements}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        ) : null}
      </EditWrapper>
    </TabPanel>
  );
}

const mapStateToProps = (state) => {
  const {
    thietLapChonKho: {
      listThietLapChonKho,
      size,
      page,
      totalElements,
      dataSortColumn,
    },
    phong: { listAllPhong = [] },
    khoa: { listAllKhoa = [] },
    kho: { listAllKho = [] },
    loaiDoiTuong: { listAllLoaiDoiTuong = [] },
    utils: { listdoiTuong = [] },
    adminTaiKhoanHeThong: { listAccount },
  } = state;

  return {
    listThietLapChonKho: listThietLapChonKho || [],
    size,
    page,
    listdoiTuong,
    listAccount,
    totalElements,
    listAllPhong,
    listAllKhoa,
    listAllKho,
    listAllLoaiDoiTuong,
    dataSortColumn: dataSortColumn || { active: 2, ["dichVu.ten"]: 1 },
  };
};

const mapDispatchToProps = ({
  thietLapChonKho: {
    getListThietLapChonKho,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    onDelete,
  },
  khoa: { getListAllKhoa },
  kho: { getAllTongHop: getAllKhoTongHop },
  phong: { getListAllPhong },
  utils: { getUtils },
  loaiDoiTuong: { getListAllLoaiDoiTuong },
  adminTaiKhoanHeThong: { onSearch: getListAccount },
}) => {
  return {
    getListThietLapChonKho,
    getListAllKhoa,
    getAllKhoTongHop,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    getListAccount,
    onDelete,
    updateData,
    getListAllPhong,
    getListAllLoaiDoiTuong,
    getUtils,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThietLapChonKho);
