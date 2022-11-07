import { Input } from "antd";
import React, { useEffect, useState } from "react";
import TableWrapper from "components/TableWrapper";
import { Main } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPrefixNumberZero } from "utils";
import { THEO_SO_LUONG_TON_KHO } from "constants/index";
import { useTranslation } from "react-i18next";

let timer = null;

const DanhSach = (props) => {
  const { t } = useTranslation();
  const {
    danhSachDichVuKho: {
      dataSortColumn,
      dsKhoId,
      listDanhSachDichVuKho,
      size,
      page,
      cachXem,
      totalElements,
    },
  } = useSelector((state) => state);
  const {
    danhSachDichVuKho: {
      searchByParams,
      onSortChange,
      updateData,
      getListDanhSachDichVuKho,
      onSizeChange,
    },
  } = useDispatch();

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    searchByParams({
      dsKhoId,
      theoSoLuongTonKho: THEO_SO_LUONG_TON_KHO.CON_TON,
      theoLo: cachXem === "2",
      thau: cachXem === "3",
    });
  }, []);

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
      theoLo: cachXem === "2",
      thau: cachXem === "3",
    });
  };
  const onChangePage = (page) => {
    getListDanhSachDichVuKho({
      page: page - 1,
      dsKhoId,
      theoLo: cachXem === "2",
      thau: cachXem === "3",
    });
  };

  const handleSizeChange = (size) => {
    onSizeChange({
      size,
      dsKhoId,
      theoLo: cachXem === "2",
      thau: cachXem === "3",
    });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: () => {
        const { khoId, dichVuId } = record;
        history.push({
          pathname: `/kho/danh-sach-ton-kho/chi-tiet/${khoId}/${dichVuId}`,
          state: { notUseParamsSearch: true },
        });
        updateData({
          selectedItem: { ...record },
        });
      },
    };
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchByParams({
        [key]: value,
        theoLo: cachXem === "2",
        thau: cachXem === "3",
      });
    }, 300);
  };
  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 50,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item) => {
        return addPrefixNumberZero(item, 3);
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.maHangHoa")}
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || ""}
          search={
            <Input
              placeholder={t("kho.nhapMaHangHoa")}
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: 80,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.tenHangHoa")}
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || ""}
          search={
            <Input
              placeholder={t("kho.nhapTenHangHoa")}
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.slTonThucTeSoCap")}
          sort_key="soLuongSoCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongSoCap"] || ""}
        />
      ),
      align: "right",
      width: 90,
      dataIndex: "soLuongSoCap",
      key: "soLuongSoCap",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.slTonThucTeThuCap")}
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      align: "right",
      width: 90,
      dataIndex: "soLuong",
      key: "soLuong",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.slTonKhaDungSoCap")}
          sort_key="soLuongSoCapKhaDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongSoCapKhaDung"] || ""}
        />
      ),
      align: "right",
      width: 100,
      dataIndex: "soLuongSoCapKhaDung",
      key: "soLuongSoCapKhaDung",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.slTonKhaDungThuCap")}
          sort_key="soLuongKhaDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongKhaDung"] || ""}
        />
      ),
      align: "right",
      width: 100,
      dataIndex: "soLuongKhaDung",
      key: "soLuongKhaDung",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.slGiuChoSoCap")}
          sort_key="soLuongSoCapDatTruoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongSoCapDatTruoc"] || ""}
        />
      ),
      align: "right",
      width: 100,
      dataIndex: "soLuongSoCapDatTruoc",
      key: "soLuongSoCapDatTruoc",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.slGiuChoThuCap")}
          sort_key="soLuongDatTruoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongDatTruoc"] || ""}
        />
      ),
      align: "right",
      width: 100,
      dataIndex: "soLuongDatTruoc",
      key: "soLuongDatTruoc",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.tongSlNhap")}
          sort_key="soLuongNhap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongNhap"] || ""}
        />
      ),
      align: "right",
      width: 90,
      dataIndex: "soLuongNhap",
      key: "soLuongNhap",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.slThucXuat")}
          sort_key="soLuongSoCapXuat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongSoCapXuat"] || ""}
        />
      ),
      align: "right",
      width: 90,
      dataIndex: "soLuongSoCapXuat",
      key: "soLuongSoCapXuat",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.dvtSoCap")}
          sort_key="tenDvtSoCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenDvtSoCap"] || ""}
        />
      ),
      align: "right",
      width: 70,
      dataIndex: "tenDvtSoCap",
      key: "tenDvtSoCap",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.dvtThuCap")}
          sort_key="tenDonViTinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenDonViTinh"] || ""}
        />
      ),
      align: "right",
      width: 70,
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.qdThau")}
          search={
            <Input
              placeholder={t("kho.qdThau")}
              onChange={onSearchInput("quyetDinhThau")}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
    },
    {
      title: <HeaderSearch title={t("kho.hieuLucThau")} />,
      align: "center",
      width: 70,
      dataIndex: "ngayHieuLuc",
      key: "ngayHieuLuc",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.hanSuDung")}
          sort_key="ngayHanSuDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngayHanSuDung"] || ""}
        />
      ),
      render: (item) => {
        return item?.toDateObject()?.format("dd/MM/yyyy");
      },
      width: 70,
      dataIndex: "ngayHanSuDung",
      key: "ngayHanSuDung",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.soLo")}
          sort_key="soLo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLo"] || ""}
        />
      ),
      width: 70,
      dataIndex: "soLo",
      key: "soLo",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.kho")}
          sort_key="tenKho"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenKho"] || ""}
        />
      ),
      width: 140,
      dataIndex: "tenKho",
      key: "tenKho",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.tenHoatChat")}
          sort_key="tenHoatChat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenHoatChat"] || ""}
          search={
            <Input
              placeholder={t("kho.nhapTenHoatChat")}
              onChange={onSearchInput("tenHoatChat")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tenHoatChat",
      key: "tenHoatChat",
      render: (text, record) => (
        <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {text}
        </div>
      ),
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.phanLoaiThuoc")}
          sort_key="tenPhanLoaiDvKho"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenPhanLoaiDvKho"] || ""}
          search={
            <Input
              placeholder={t("kho.nhapPhanLoaiThuoc")}
              onChange={onSearchInput("tenPhanLoaiDvKho")}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "tenPhanLoaiDvKho",
      key: "tenPhanLoaiDvKho",
    },
  ];
  const cachXem1 = [
    "soLo",
    "ngayHanSuDung",
    "soLuongNhap",
    "soLuongSoCapXuat",
    "quyetDinhThau",
    "ngayHieuLuc",
  ];
  const cachXem2 = [
    "soLuongNhap",
    "soLuongSoCapXuat",
    "quyetDinhThau",
    "ngayHieuLuc",
  ];
  const cachXem3 = ["soLo", "ngayHanSuDung"];

  const onSelectChange = (selectedRowKeys, data) => {
    setState({
      selectedRowKeys: selectedRowKeys,
    });

    updateData({
      selectedHangHoa: data && data[0],
    });
  };

  const rowSelection = {
    columnTitle: <HeaderSearch title="" />,
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
    type: "radio",
  };

  return (
    <Main noPadding={true}>
      <TableWrapper
        // columns={columns}
        columns={
          cachXem === "1"
            ? columns.filter((item) => !cachXem1.includes(item.dataIndex))
            : cachXem === "2"
            ? columns.filter((item) => !cachXem2.includes(item.dataIndex))
            : columns.filter((item) => !cachXem3.includes(item.dataIndex))
        }
        dataSource={listDanhSachDichVuKho || []}
        onRow={onRow}
        scroll={{ x: 2500 }}
        rowSelection={cachXem === "2" && rowSelection}
        rowClassName={(record, index) => {
          return index % 2 === 0
            ? `table-row-odd ${
                index === listDanhSachDichVuKho?.length - 1 ? "add-border" : ""
              }`
            : `table-row-even ${
                index === listDanhSachDichVuKho?.length - 1 ? "add-border" : ""
              }`;
        }}
      />
      <Pagination
        listData={listDanhSachDichVuKho}
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        total={totalElements}
        onShowSizeChange={handleSizeChange}
      />
    </Main>
  );
};
export default connect(null, null)(DanhSach);
