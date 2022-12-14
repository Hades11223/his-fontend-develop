import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";

import { Main } from "../styled";
import { HAN_CHE_KHOA, HIEU_LUC, KHONG_TINH_TIEN } from "constants/index";
import Checkbox from "components/Checkbox";
import { DatePicker, Input, InputNumber } from "antd";
import moment from "moment";
const DanhSachDichVu = ({
  styleContainerButtonHeader,
  layerId,
  title,
  classNameRow,
  buttonHeader,
  ...props
}) => {
  const { onRegisterHotkey } = useDispatch().phimTat;
  const refSelectRow = useRef();
  const {
    dichVuGiuong: {
      onSearch,
      onSizeChange,
      onSortChange,
      onChangeInputSearch,
      updateData,
    },
    utils: { getUtils },
    chuyenKhoa: { getListAllChuyenKhoa },
    donViTinh: { getListAllDonViTinh },
    nhomDichVuCap1: { getAllTongHopDichVuCap1 },
    nhomDichVuCap2: { getAllTongHopDichVuCap2 },
    nhomDichVuCap3: { getAllTongHopDichVuCap3 },
  } = useDispatch();
  const {
    dichVuGiuong: {
      listDichVuGiuong,
      totalElements,
      page,
      size,
      currentItem,
      dataSortColumn,
    },
    donViTinh: { listAllDonViTinh = [] },
    utils: {
      listnhomChiPhiBh = [],
      listnguonKhacChiTra = [],
      listdoiTuongSuDung = [],
      listPhanLoaiPtTt = [],
      listphanLoaiGiuong = [],
      listthoiGianSuDung = [],
    },
    nhomDichVuCap1: { listAllNhomDichVuCap1 = [] },
    nhomDichVuCap2: { listAllNhomDichVuCap2 = [] },
    nhomDichVuCap3: { listAllNhomDichVuCap3 = [] },
  } = useSelector((state) => state);
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 38, //up
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });
  }, []);
  refSelectRow.current = (index) => {
    const indexNextItem =
      (listDichVuGiuong?.findIndex((item) => item.id === state.currentItem?.id) || 0) +
      index;
    if (-1 < indexNextItem && indexNextItem < listDichVuGiuong.length) {
      onShowAndHandleUpdate(listDichVuGiuong[indexNextItem]);
      setState({ currentItem: listDichVuGiuong[indexNextItem] });
      document
        .getElementsByClassName("row-id-" + listDichVuGiuong[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    updateData({ listDichVuGiuong: [] });
    onSizeChange({
      size: 10,
      dataSearch: {},
    });
    getUtils({ name: "nguonKhacChiTra" });
    getUtils({ name: "nhomChiPhiBh" });
    getUtils({ name: "thoiGianSuDung" });
    getUtils({ name: "PhanLoaiPtTt" });
    getUtils({ name: "doiTuongSuDung" });
    getUtils({ name: "phanLoaiGiuong" });
    getListAllChuyenKhoa({ page: "", size: "" });
    getListAllDonViTinh({ page: "", size: "" });
    getAllTongHopDichVuCap1({ page: "", size: "" });
    getAllTongHopDichVuCap2({ page: "", size: "" });
    getAllTongHopDichVuCap3({ page: "", size: "" });
  }, []);

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (
      key === "dichVu.nhomDichVuCap1Id" ||
      key === "dichVu.nhomDichVuCap2Id" ||
      key === "dichVu.nhomDichVuCap3Id"
    ) {
      onChangeInputSearch({
        [key]: e,
      });
      return null;
    }
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, s) => {
        let value = "";
        if (s) {
          if (s?.hasOwnProperty("checked")) value = s?.checked;
          else value = s?.value;
        } else {
          if (e && typeof e === "object" && !Array.isArray(e)) {
            value = moment(e).format("YYYY-MM-DD");
          } else {
            value = e;
          }
        }
        onChangeInputSearch({
          [key]: value,
        });
      },
      500,
      key,
      e?.target
    );
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: 0,
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="M?? D???ch V???"
          sort_key="dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ma"] || 0}
          search={
            <Input
              placeholder="T??m m?? d???ch v???"
              onChange={onSearchInput("dichVu.ma")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: 1,
      render: (item) => {
        return item?.ma;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??n d???ch v???"
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ten"] || 0}
          search={
            <Input
              placeholder="T??m t??n d???ch v???"
              onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dichVu",
      key: 2,
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="????n gi?? kh??ng BH"
          sort_key="dichVu.giaKhongBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.giaKhongBaoHiem"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m gi?? kh??ng BH"
              onChange={onSearchInput("dichVu.giaKhongBaoHiem")}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      align: "right",
      key: 3,
      render: (item = []) => {
        return item?.giaKhongBaoHiem?.formatPrice() || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="????n gi?? BH"
          sort_key="dichVu.giaBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.giaBaoHiem"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m gi?? BH"
              onChange={onSearchInput("dichVu.giaBaoHiem")}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      align: "right",
      key: 4,
      render: (item, list, index) => {
        return item?.giaBaoHiem?.formatPrice() || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ph??? thu"
          sort_key="dichVu.giaPhuThu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.giaPhuThu"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m gi?? ph??? thu"
              onChange={onSearchInput("dichVu.giaPhuThu")}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      align: "right",
      key: 5,
      render: (item, list, index) => {
        return item?.giaPhuThu?.formatPrice() || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m chi ph??"
          sort_key="dichVu.nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomChiPhiBh"] || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...listnhomChiPhiBh]}
              placeholder="Ch???n nh??m chi ph??"
              onChange={onSearchInput("dichVu.nhomChiPhiBh")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "dichVu",
      key: 16,
      render: (item, list, index) => {
        if (listnhomChiPhiBh?.length) {
          return (
            listnhomChiPhiBh.find((x) => x.id === item?.nhomChiPhiBh)?.ten || ""
          );
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="??VT"
          sort_key="dichVu.donViTinhId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.donViTinhId"] || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...listAllDonViTinh]}
              placeholder="Ch???n ??VT"
              onChange={onSearchInput("dichVu.donViTinhId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: 17,
      render: (item, list, index) => {
        return item?.donViTinh?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m d???ch v??? c???p 1"
          sort_key="dichVu.nhomDichVuCap1Id"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap1Id"] || 0}
          searchSelect={
            <Select
              placeholder={"Ch???n d???ch v??? c???p 1"}
              data={[{ id: "", ten: "T???t c???" }, ...listAllNhomDichVuCap1]}
              onChange={onSearchInput("dichVu.nhomDichVuCap1Id")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "dichVu",
      key: 18,
      render: (item) => {
        return item?.nhomDichVuCap1?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m d???ch v??? c???p 2"
          sort_key="dichVu.nhomDichVuCap2Id"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap2Id"] || 0}
          searchSelect={
            <Select
              placeholder={"Ch???n d???ch v??? c???p 2"}
              data={[{ id: "", ten: "T???t c???" }, ...listAllNhomDichVuCap2]}
              onChange={onSearchInput("dichVu.nhomDichVuCap2Id")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "dichVu",
      key: 19,
      render: (item) => {
        return item?.nhomDichVuCap2?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m d???ch v??? c???p 3"
          sort_key="dichVu.nhomDichVuCap3Id"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap3Id"] || 0}
          searchSelect={
            <Select
              placeholder={"Ch???n d???ch v??? c???p 3"}
              data={[{ id: "", ten: "T???t c???" }, ...listAllNhomDichVuCap3]}
              onChange={onSearchInput("dichVu.nhomDichVuCap3Id")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "dichVu",
      key: 20,
      render: (item) => {
        return item?.nhomDichVuCap3?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ph??n lo???i gi?????ng"
          sort_key="phanLoai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["phanLoai"] || 0}
          searchSelect={
            <Select
              placeholder="Ch???n ph??n lo???i gi?????ng"
              onChange={onSearchInput("phanLoai")}
              data={listphanLoaiGiuong}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "phanLoai",
      key: 21,
      render: (item) => {
        return listphanLoaiGiuong.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="??p d???ng c??c tr?????ng h???p"
          sort_key="thoiGianSuDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianSuDung"] || 0}
          searchSelect={
            <Select
              placeholder="Ch???n tr?????ng h???p"
              onChange={onSearchInput("thoiGianSuDung")}
              data={listthoiGianSuDung}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "thoiGianSuDung",
      key: 21,
      render: (item) => {
        return listthoiGianSuDung.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Lo???i ph???u thu???t"
          sort_key="phanLoaiPtTt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["phanLoaiPtTt"] || 0}
          searchSelect={
            <Select
              placeholder="Ch???n lo???i ph???u thu???t"
              onChange={onSearchInput("phanLoaiPtTt")}
              data={listPhanLoaiPtTt}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "phanLoaiPtTt",
      key: 21,
      render: (item) => {
        return listPhanLoaiPtTt.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="M?? t????ng ??????ng"
          sort_key="dichVu.maTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.maTuongDuong"] || 0}
          search={
            <Input
              placeholder="T??m m?? t????ng ??????ng"
              onChange={onSearchInput("dichVu.maTuongDuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: 21,
      render: (item) => {
        return item?.maTuongDuong;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??n t????ng ??????ng"
          sort_key="dichVu.tenTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tenTuongDuong"] || 0}
          search={
            <Input
              placeholder="T??m t??n t????ng ??????ng"
              onChange={onSearchInput("dichVu.tenTuongDuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: 22,
      render: (item) => {
        return item?.tenTuongDuong;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="hanCheKhoaChiDinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.hanCheKhoaChiDinh || 0}
          searchSelect={
            <Select
              data={HAN_CHE_KHOA}
              placeholder="Ch???n h???n ch??? khoa ch??? ?????nh"
              onChange={onSearchInput("hanCheKhoaChiDinh")}
            />
          }
          title="H???n ch??? khoa ch??? ?????nh"
        />
      ),
      width: 130,
      dataIndex: "hanCheKhoaChiDinh",
      key: 24,
      align: "center",
      render: (item) => {
        return <Checkbox checked={!!item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tr?????ng h???p k?? DV"
          sort_key="dsDoiTuongSuDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dsDoiTuongSuDung"] || 0}
          searchSelect={
            <Select
              data={listdoiTuongSuDung}
              placeholder="Ch???n tr?????ng h???p k?? DV"
              onChange={onSearchInput("dsDoiTuongSuDung")}
              mode="multiple"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "dsDoiTuongSuDung",
      key: 25,
      render: (item, list, index) => {
        if (listdoiTuongSuDung?.length) {
          let list =
            item
              ?.map((nguon, index) => {
                let x = listdoiTuongSuDung.find((dv) => dv.id === nguon);
                return x?.ten || "";
              })
              .filter((item) => item) ?? [];

          return list.join(", ");
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="quyetDinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyetDinh"] || 0}
          search={
            <Input
              placeholder="Nh???p m?? s??? quy???t ?????nh"
              onChange={onSearchInput("quyetDinh")}
            />
          }
          title="M?? s??? quy???t ?????nh"
        />
      ),
      width: "150px",
      dataIndex: "quyetDinh",
      key: "quyetDinh",
    },
    {
      title: (
        <HeaderSearch
          sort_key="ngayCongBo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngayCongBo"] || 0}
          searchDate={
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Ch???n ng??y quy???t ?????nh"
              onChange={onSearchInput("ngayCongBo")}
            />
          }
          title="Ng??y quy???t ?????nh"
        />
      ),
      width: "150px",
      dataIndex: "ngayCongBo",
      key: "ngayCongBo",
      render: (item) => {
        return item && new Date(item).format("dd/MM/YYYY");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngu???n kh??c chi tr???"
          sort_key="dichVu.dsNguonKhacChiTra"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.dsNguonKhacChiTra"] || 0}
          searchSelect={
            <Select
              data={listnguonKhacChiTra}
              placeholder="Ch???n ngu???n kh??c chi tr???"
              onChange={onSearchInput("dichVu.dsNguonKhacChiTra")}
              mode="multiple"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "dichVu",
      key: 16,
      render: (item, list, index) => {
        if (listnguonKhacChiTra?.length) {
          let list =
            item?.dsNguonKhacChiTra
              ?.map((nguon, index) => {
                let x = listnguonKhacChiTra.find((dv) => dv.id === nguon);
                return x?.ten || "";
              })
              .filter((item) => item) ?? [];

          return list.join(", ");
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.khongTinhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.khongTinhTien"] || 0}
          searchSelect={
            <Select
              data={KHONG_TINH_TIEN}
              placeholder="Ch???n t??nh ti???n"
              onChange={onSearchInput("dichVu.khongTinhTien")}
            />
          }
          title="Kh??ng t??nh ti???n"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: 17,
      align: "center",
      render: (item) => {
        return item && <Checkbox checked={!!item.khongTinhTien} />;
      },
    },

    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Ch???n hi???u l???c"
              onChange={onSearchInput("active")}
              defaultValue=""
            />
          }
          title="C?? hi???u l???c"
        />
      ),
      width: 120,
      dataIndex: "active",
      key: 18,
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onHandleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  const onShowAndHandleUpdate = (data = {}) => {
    props.setEditStatus(true);
    updateData({
      currentItem: { ...data },
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
        setState({ currentItem: record });
      },
    };
  };
  const setRowClassName = (record) => {
    let idDiff = currentItem?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  return (
    <Main>
      <TableWrapper
        title={title}
        scroll={{ x: 1000 }}
        buttonHeader={buttonHeader || []}
        classNameRow={classNameRow}
        columns={columns.filter((item) => {
          return item.display !== false;
        })}
        dataSource={listDichVuGiuong}
        onRow={onRow}
        rowClassName={setRowClassName}
        styleContainerButtonHeader={{ ...styleContainerButtonHeader }}
        isImport={props?.isImport}
      ></TableWrapper>
      {totalElements ? (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={0}
          listData={listDichVuGiuong}
          onShowSizeChange={onHandleSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      ) : null}
    </Main>
  );
};

export default DanhSachDichVu;
