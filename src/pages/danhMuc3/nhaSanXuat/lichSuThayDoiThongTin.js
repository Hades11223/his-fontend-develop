import React, { useEffect, useRef, useState } from "react";
import { HeaderSearch, TableWrapper } from "components";
import { DatePicker, Input, InputNumber } from "antd";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "components/Pagination";
import { combineSort } from "utils";
import { PAGE_DEFAULT } from "constants/index";
import moment from "moment";
import { LichSuThayDoiThongTinStyle } from "./styled";
import ModalCapNhatThongTin from "./components/ModalCapNhatThongTin";
import IconEdit from "assets/svg/hoSoBenhAn/edit.svg";
import Icon from "@ant-design/icons";
let timer = null;

const LichSuThayDoiThongTin = (props) => {
  const [state, _setState] = useState({
    dataSearch: {},
    size: 10,
    dataSortColumn: {},
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const refModalCapNhatThongTin = useRef(null);
  const handleShowModal = (data) => {
    if (refModalCapNhatThongTin.current) {
      const dataEditDefault = {
        ...data,
        tuNgay: moment(data?.tuNgay),
        denNgay: moment(data?.denNgay),
      };
      refModalCapNhatThongTin.current.show({ dataEditDefault, isEdit: true });
    }
  };
  const {
    nhaSanXuat: { getListLichSuThayDoi },
  } = useDispatch();
  const {
    nhaSanXuat: { dataEditDefault, listLichSuThayDoi },
    utils: { listloaiDoiTac = [] },
    nhomDichVuCap1: { listAllNhomDichVuCap1 = [] },
  } = useSelector((state) => state);
  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const dataSearch = { ...state.dataSearch, [name]: value };
      setState({ dataSearch });
      getListLichSuThayDoi({
        ...dataSearch,
        page: PAGE_DEFAULT,
        size: state.size,
        [name]: value,
        sort: combineSort(state.dataSortColumn),
      });
    }, 500);
  };
  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...state.dataSortColumn, [key]: value };
    setState({
      dataSortColumn: sort,
    });
    const res = combineSort(sort);
    getListLichSuThayDoi({
      doiTacId: dataEditDefault.id,
      page: PAGE_DEFAULT,
      size: state.size,
      sort: res,
      ...state.dataSearch,
    }).then((s) => {
      setState({
        ...s,
      });
    });
  };
  useEffect(() => {
    if (dataEditDefault?.id) {
      getListLichSuThayDoi({
        doiTacId: dataEditDefault?.id,
        page: 0,
        size: state.size,
      }).then((s) => {
        setState({
          ...s,
        });
      });
    }
  }, [dataEditDefault]);
  const setRowClassName = () => {};
  const onPageChange = (page) => {
    const params = { page: page - 1, size: state.size };
    setState({
      ...params,
    });
    getListLichSuThayDoi({
      doiTacId: dataEditDefault.id,
      ...params,
      ...state.dataSearch,
      sort: combineSort(state.dataSortColumn),
    }).then((s) => {
      setState({
        ...s,
      });
    });
  };
  const onSizeChange = (size) => {
    const params = { page: state.page, size };
    setState({
      ...params,
    });
    getListLichSuThayDoi({
      doiTacId: dataEditDefault.id,
      ...params,
      ...state.dataSearch,
      sort: combineSort(state.dataSortColumn),
    });
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 45,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="M?? ?????i t??c"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["ma"] || 0}
          search={
            <Input
              placeholder="T??m M?? ?????i t??c"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="T??n ?????i t??c"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={state?.dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="T??m T??n ?????i t??c"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="M?? s??? thu???"
          onClickSort={onClickSort}
          sort_key="maSoThue"
          dataSort={state?.dataSortColumn["maSoThue"] || 0}
          search={
            <Input
              placeholder="T??m m?? s??? thu???"
              onChange={(e) => {
                onSearchInput(e.target.value, "maSoThue");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "maSoThue",
      key: "maSoThue",
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m DV"
          onClickSort={onClickSort}
          sort_key="dsNhomDichVuCap1"
          dataSort={state.dataSortColumn["dsNhomDichVuCap1"] || 0}
          searchSelect={
            <Select
              // mode="multiple"
              placeholder={"T??m nh??m DV"}
              data={listAllNhomDichVuCap1}
              onChange={(e) => {
                onSearchInput(e, "dsNhomDichVuCap1");
              }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "dsNhomDichVuCap1",
      key: "dsNhomDichVuCap1",
      render: (item) =>
        (listAllNhomDichVuCap1 || [])
          .filter((val) => (item || []).some((id) => id === val.id))
          .map((item) => item.ten)
          .join(","),
    },
    {
      title: (
        <HeaderSearch
          title="Lo???i ?????i t??c"
          onClickSort={onClickSort}
          sort_key="dsLoaiDoiTac"
          dataSort={state.dataSortColumn["dsLoaiDoiTac"] || 0}
          searchSelect={
            <Select
              onChange={(e) => {
                onSearchInput(e, "dsLoaiDoiTac");
              }}
              defaultValue=""
              placeholder={"Ch???n lo???i ?????i t??c"}
              data={[{ id: "", ten: "T???t c???" }, ...listloaiDoiTac]}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsLoaiDoiTac",
      key: "dsLoaiDoiTac",
      render: (item) =>
        (listloaiDoiTac || [])
          .filter((val) => item.some((doiTacId) => doiTacId === val.id))
          .map((item) => item.ten)
          .join(","),
    },
    {
      title: (
        <HeaderSearch
          title="S??? t??i kho???n"
          onClickSort={onClickSort}
          sort_key="soTaiKhoan"
          dataSort={state.dataSortColumn["soTaiKhoan"] || 0}
          search={
            <InputNumber
              placeholder="T??m t??i kho???n"
              onChange={(e) => {
                onSearchInput(e.target.value, "soTaiKhoan");
              }}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soTaiKhoan",
      key: "soTaiKhoan",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          sort_key="nguoiDaiDien"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn["nguoiDaiDien"] || 0}
          search={
            <Input
              placeholder="T??m ng?????i ?????i di???n"
              onChange={(e) => onSearchInput(e.target.value, "nguoiDaiDien")}
            />
          }
          title="Ng?????i ?????i di???n"
        />
      ),
      width: "150px",
      dataIndex: "nguoiDaiDien",
      key: "nguoiDaiDien",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="chucVuNguoiDaiDien"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn["chucVuNguoiDaiDien"] || 0}
          search={
            <Input
              placeholder="T??m ch???c v??? ng?????i ?????i di???n"
              onChange={(e) =>
                onSearchInput(e.target.value, "chucVuNguoiDaiDien")
              }
            />
          }
          title="Ch???c v??? ng?????i ?????i di???n"
        />
      ),
      width: "150px",
      dataIndex: "chucVuNguoiDaiDien",
      key: "chucVuNguoiDaiDien",
      align: "left",
    },

    {
      title: (
        <HeaderSearch
          sort_key="sdtNguoiDaiDien"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn["sdtNguoiDaiDien"] || 0}
          search={
            <Input
              placeholder="T??m S??T ng?????i ?????i di???n"
              onChange={(e) => onSearchInput(e.target.value, "sdtNguoiDaiDien")}
            />
          }
          title="S??T ng?????i ?????i di???n"
        />
      ),
      width: "150px",
      dataIndex: "sdtNguoiDaiDien",
      key: "sdtNguoiDaiDien",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="nguoiDauMoi"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn["nguoiDauMoi"] || 0}
          search={
            <Input
              placeholder="T??m ng?????i ?????u m???i"
              onChange={(e) => onSearchInput(e.target.value, "nguoiDauMoi")}
            />
          }
          title="Ng?????i ?????u m???i"
        />
      ),
      width: "150px",
      dataIndex: "nguoiDauMoi",
      key: "nguoiDauMoi",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="sdtNguoiDauMoi"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn["sdtNguoiDauMoi"] || 0}
          search={
            <Input
              placeholder="T??m S??T ng?????i ?????u m???i"
              onChange={(e) => onSearchInput(e.target.value, "sdtNguoiDauMoi")}
            />
          }
          title="S??T ng?????i ?????u m???i"
        />
      ),
      width: "150px",
      dataIndex: "sdtNguoiDauMoi",
      key: "sdtNguoiDauMoi",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="emailNguoiDauMoi"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn["emailNguoiDauMoi"] || 0}
          search={
            <Input
              placeholder="T??m email ng?????i ?????u m???i"
              onChange={(e) =>
                onSearchInput(e.target.value, "emailNguoiDauMoi")
              }
            />
          }
          title="Email ng?????i ?????u m???i"
        />
      ),
      width: "150px",
      dataIndex: "emailNguoiDauMoi",
      key: "emailNguoiDauMoi",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="tenNganHang"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn["tenNganHang"] || 0}
          search={
            <Input
              placeholder="T??m t??n ng??n h??ng"
              onChange={(e) => onSearchInput(e.target.value, "tenNganHang")}
            />
          }
          title="T??n ng??n h??ng"
        />
      ),
      width: "150px",
      dataIndex: "tenNganHang",
      key: "tenNganHang",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="chuTaiKhoan"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn["chuTaiKhoan"] || 0}
          search={
            <Input
              placeholder="T??m ch??? t??i kho???n ng??n h??ng"
              onChange={(e) => onSearchInput(e.target.value, "chuTaiKhoan")}
            />
          }
          title="Ch??? t??i kho???n ng??n h??ng"
        />
      ),
      width: "150px",
      dataIndex: "chuTaiKhoan",
      key: "chuTaiKhoan",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="nguoiChiCongTac"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn["nguoiChiCongTac"] || 0}
          search={
            <Input
              placeholder="T??m ng?????i chi c???ng t??c"
              onChange={(e) => onSearchInput(e.target.value, "nguoiChiCongTac")}
            />
          }
          title="Ng?????i chi c???ng t??c"
        />
      ),
      width: "150px",
      dataIndex: "nguoiChiCongTac",
      key: "nguoiChiCongTac",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          sort_key="sdtNguoiChiCongTac"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn["sdtNguoiChiCongTac"] || 0}
          search={
            <Input
              placeholder="T??m S??T ng?????i chi c???ng t??c"
              onChange={(e) =>
                onSearchInput(e.target.value, "sdtNguoiChiCongTac")
              }
            />
          }
          title="S??T ng?????i chi c???ng t??c"
        />
      ),
      width: "150px",
      dataIndex: "sdtNguoiChiCongTac",
      key: "sdtNguoiChiCongTac",
      align: "left",
    },

    {
      title: (
        <HeaderSearch
          sort_key="tuNgay"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn["tuNgay"] || 0}
          search={
            <DatePicker
              style={{ width: "100%", height: "30px", border: "none" }}
              placeholder="ch???n th???i gian"
              onChange={(e) =>
                onSearchInput(moment(e).format("YYYY-MM-DD"), "tuNgay")
              }
            ></DatePicker>
          }
          title="??p d???ng t??? ng??y"
        />
      ),
      width: "150px",
      dataIndex: "tuNgay",
      key: "tuNgay",
      align: "left",
      render: (item) => moment(item).format("YYYY-MM-DD"),
    },
    {
      title: (
        <HeaderSearch
          sort_key="denNgay"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn["denNgay"] || 0}
          search={
            <DatePicker
              style={{ width: "100%", height: "30px", border: "none" }}
              placeholder="ch???n th???i gian"
              onChange={(e) =>
                onSearchInput(moment(e).format("DD/MM/YYYY"), "denNgay")
              }
            ></DatePicker>
          }
          title="??p d???ng ?????n ng??y"
        />
      ),
      width: "150px",
      dataIndex: "denNgay",
      key: "denNgay",
      align: "left",
      render: (item) => moment(item).format("DD/MM/YYYY"),
    },
    {
      title: <HeaderSearch title="S???a" />,
      width: "50px",
      align: "center",
      dataIndex: "doiTacId",
      key: "doiTacId",
      render: (item, data) => (
        <Icon component={IconEdit} onClick={() => handleShowModal(data)}></Icon>
      ),
    },
  ];
  return (
    <LichSuThayDoiThongTinStyle>
      <TableWrapper
        columns={columns}
        dataSource={listLichSuThayDoi || []}
        scroll={{ x: 200 }}
        rowClassName={setRowClassName}
      />
      <Pagination
        listData={listLichSuThayDoi || []}
        onChange={onPageChange}
        current={state.page + 1 || 1}
        pageSize={state.size || 10}
        total={state.totalElements || 0}
        onShowSizeChange={onSizeChange}
        style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}
      />
      <ModalCapNhatThongTin ref={refModalCapNhatThongTin} />
    </LichSuThayDoiThongTinStyle>
  );
};

export default LichSuThayDoiThongTin;
