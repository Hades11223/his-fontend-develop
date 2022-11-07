import { Checkbox, Input } from "antd";
import { DatePicker, HeaderSearch, Select, TableWrapper } from "components";
import Pagination from "components/Pagination";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "pages/kho/components/Button";
import IcSend from "assets/images/kho/ic-send.svg";
import IcPrint from "assets/svg/ic-print.svg";
import IcDelete from "assets/svg/ic-delete.svg";
import { useEnum } from "hook";
import moment from "moment";
import SelectLoadMore from "components/SelectLoadMore";
import dmKhoProvider from "data-access/categories/dm-kho-provider";
import dmKhoaProvider from "data-access/categories/dm-khoa-provider";
import { ENUM } from "constants/index";

const addParam = { active: true };

const DanhSach = ({ linkDetail }) => {
  const refTimeOut = useRef();

  const [state, _setState] = useState({
    dataSortColumn: {},
    listCheckId: [],
    param: {
      page: 0,
      size: 10,
      dsLoaiNhapXuat: [80, 85],
    },
  });
  const { dataSortColumn } = state;
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const { t } = useTranslation();
  const { dsPhieuNhapXuat, totalElements } = useSelector(
    (state) => state.phieuNhapXuat
  );
  const [listTrangThaiPhieuNhapXuat] = useEnum(ENUM.TRANG_THAI_PHIEU_NHAP_XUAT);
  const [listLoaiDichVu] = useEnum(ENUM.LOAI_DICH_VU);
  const [listTrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);

  const {
    phieuNhapXuat: { getListPhieu },
  } = useDispatch();

  const refSettings = useRef(null);

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };
    setState({ dataSortColumn: sort });
  };

  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, e) => {
        console.log(e, "e.target");
        let value = e?.hasOwnProperty("_d")
          ? moment(e._d).format("YYYY-MM-DD")
          : e?.value
          ? e?.value
          : e;
        const newParam = {
          ...state.param,
          page: 0,
          [key]: value,
        };
        setState({ param: newParam });
        getListPhieu(newParam);
      },
      500,
      key,
      e?.target || e
    );
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: (e) => {
        if (e.target.nodeName !== "INPUT") {
          history.push(linkDetail + record.id);
        }
      },
    };
  };

  useEffect(() => {
    getListPhieu(state.param);
  }, []);

  const onChangePage = (page) => {
    const newParam = {
      ...state.param,
      page: page - 1,
    };
    setState({ param: newParam });
    getListPhieu(newParam);
  };

  const onSizeChange = (size) => {
    const newParam = {
      ...state.param,
      page: 0,
      size,
    };
    setState({ param: newParam });
    getListPhieu(newParam);
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const clickCheckbox = (id) => (e) => {
    if (e.target.checked) {
      setState({ listCheckId: [...state.listCheckId, id] });
    } else {
      setState({ listCheckId: state.listCheckId.filter((i) => i != id) });
    }
  };

  const onClickAll = (e) => {
    if (e.target.checked) {
      setState({ listCheckId: dsPhieuNhapXuat.map((i) => i.id) });
    } else {
      setState({ listCheckId: [] });
    }
  };

  //column
  const columns = () => [
    {
      title: (
        <HeaderSearch
          title={
            <Checkbox
              checked={state.listCheckId?.length === dsPhieuNhapXuat.length}
              onClick={onClickAll}
            ></Checkbox>
          }
          //   sort_key="soPhieuLinh"
          //   onClickSort={onClickSort}
          //   dataSort={dataSortColumn.soPhieuLinh || 0}
          //   search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      dataIndex: "id",
      width: "50px",
      align: "center",
      render: (item) => (
        <Checkbox
          checked={state.listCheckId.includes(item)}
          onClick={clickCheckbox(item)}
        ></Checkbox>
      ),
    },
    {
      title: <HeaderSearch title="STT" />,
      dataIndex: "index",
      width: "50px",
      align: "center",
      render: (_, __, index) => state.param.page * state.param.size + index + 1,
    },
    {
      title: (
        <HeaderSearch
          title="Số phiếu lĩnh"
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soPhieu || 0}
          search={
            <Input placeholder="Tìm kiếm" onChange={onSearchInput("soPhieu")} />
          }
        />
      ),
      dataIndex: "soPhieu",
    },
    {
      title: (
        <HeaderSearch
          title="Kho xuất"
          sort_key="kho.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["kho.ten"] || 0}
          searchSelect={
            <SelectLoadMore
              api={dmKhoProvider.searchAll}
              addParam={addParam}
              onChange={onSearchInput("khoId")}
              keySearch={"ten"}
              placeholder="Chọn kho"
            />
          }
        />
      ),
      dataIndex: "tenKho",
      // render: (item) => item?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Kho yêu cầu"
          sort_key="khoDoiUng.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoDoiUng.ten"] || 0}
          searchSelect={
            <SelectLoadMore
              api={dmKhoProvider.searchAll}
              addParam={addParam}
              onChange={onSearchInput("khoDoiUngId")}
              keySearch={"ten"}
              placeholder="Chọn kho"
            />
          }
        />
      ),
      dataIndex: "tenKhoDoiUng",
      // render: (item) => item?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái phiếu"
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.trangThai || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listTrangThaiPhieuNhapXuat]}
              placeholder="Chọn trạng thái"
              defaultValue=""
              onChange={onSearchInput("trangThai")}
            />
          }
        />
      ),
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) =>
        listTrangThaiPhieuNhapXuat?.find((i) => i.id === item)?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Loại hàng hóa"
          sort_key="loaiDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiDichVu || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listLoaiDichVu]}
              placeholder="Chọn loại hàng hóa"
              defaultValue=""
              onChange={onSearchInput("loaiDichVu")}
            />
          }
        />
      ),
      dataIndex: "loaiDichVu",
      render: (item) => listLoaiDichVu?.find((i) => i.id === item)?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Khoa chỉ định"
          sort_key="khoaChiDinh.ten"
          // onClickSort={onClickSort}
          dataSort={dataSortColumn["khoaChiDinh.ten"] || 0}
          searchSelect={
            <SelectLoadMore
              api={dmKhoaProvider.searchAll}
              addParam={addParam}
              onChange={onSearchInput("khoaChiDinhId")}
              keySearch={"ten"}
              placeholder="Chọn khoa"
            />
          }
        />
      ),
      dataIndex: "tenKhoaChiDinh",
      // render: (i) => i?.map((i) => i.ten)?.join(", "),
    },
    {
      title: (
        <HeaderSearch
          title="Ngày tạo phiếu"
          sort_key="thoiGianTaoPhieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thoiGianTaoPhieu || 0}
          searchDate={
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Chọn ngày"
              onChange={onSearchInput("thoiGianTaoPhieu")}
            />
          }
        />
      ),
      dataIndex: "thoiGianTaoPhieu",
      render: (item) => (item ? moment(item).format("DD/MM/YYYY") : ""),
    },
    {
      title: (
        <HeaderSearch
          title="Ngày duyệt phiếu"
          sort_key="thoiGianDuyet"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thoiGianDuyet || 0}
          searchDate={
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Chọn ngày"
              onChange={onSearchInput("thoiGianDuyet")}
            />
          }
        />
      ),
      dataIndex: "thoiGianDuyet",
      render: (item) => (item ? moment(item).format("DD/MM/YYYY") : ""),
    },
    // {
    //   title: <HeaderSearch title="Tiện ích" />,
    //   width: "80px",
    //   align: "center",
    //   render: (_, item) => {
    //     return (
    //       <div className="tool-btn">
    //         {/* {state.editId === item.index ? (
    //           <CheckCircleOutlined
    //             style={{ color: "#049254", fontSize: 18 }}
    //             onClick={onCheck(item)}
    //           />
    //         ) : (
    //           <EditOutlined
    //             style={{ color: "#0762F7", fontSize: 18 }}
    //             onClick={onEdit(item)}
    //           />
    //         )}

    //         <DeleteOutlined
    //           onClick={clickDelete(item)}
    //           style={{ color: "red", fontSize: 18 }}
    //         /> */}
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <TableWrapper
        columns={columns({
          t,
          onClickSort,
          onSettings,
          dataSortColumn,
          listTrangThaiNb,
        })}
        dataSource={dsPhieuNhapXuat}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        scroll={{ x: 2000 }}
        // tableName="table_QLNT_Nguo"
        ref={refSettings}
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={state.param.page + 1}
          pageSize={state.param.size}
          listData={dsPhieuNhapXuat}
          total={totalElements}
          onShowSizeChange={onSizeChange}
        />
      )}
      {state.listCheckId.length > 0 && (
        <div className="button-action">
          <Button
            className="btn_new"
            rightIcon={<IcDelete className="red" />}
            iconHeight={20}
            // onClick={
            //   refTimKiemPhieuNhap.current &&
            //   refTimKiemPhieuNhap.current.onCreateNew
            // }
          >
            <span>Xóa phiếu</span>
          </Button>
          <Button
            className="btn_new"
            rightIcon={<IcPrint className="blue" />}
            iconHeight={20}
            // onClick={
            //   refTimKiemPhieuNhap.current &&
            //   refTimKiemPhieuNhap.current.onCreateNew
            // }
          >
            <span>In phiếu</span>
          </Button>
          <Button
            className="btn_new"
            type="primary"
            rightIcon={<IcSend />}
            iconHeight={20}
            // onClick={
            //   refTimKiemPhieuNhap.current &&
            //   refTimKiemPhieuNhap.current.onCreateNew
            // }
          >
            <span>Gửi duyệt</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default DanhSach;
