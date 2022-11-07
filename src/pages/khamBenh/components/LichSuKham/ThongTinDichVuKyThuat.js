import React, { useEffect, useState } from "react";
import { HeaderSearch, TableWrapper } from "components";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import { Checkbox } from "antd";

const { Column } = TableWrapper;

const DsDichVu = (props) => {
  const { t } = useTranslation();
  const { onListData, selectedRowKeys, isCheckedAll } = props;

  const {
    dsDichVuKyThuat: { onSortChange },
  } = useDispatch();

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };
  const listDichVuKyThuat = useStore("dsDichVuKyThuat.listDichVuKyThuat", []);
  const dataSortColumn = useStore("dsDichVuKyThuat.dataSortColumn", {});

  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      ignore: true,
    }),
    Column({
      title: t("common.dichVu"),
      sort_key: "tenDichVu",
      dataSort: dataSortColumn["tenDichVu"] || "",
      onClickSort: onClickSort,
      width: "350px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
    }),
    Column({
      title: t("common.soLuong"),
      sort_key: "soLuong",
      dataSort: dataSortColumn["soLuong"] || "",
      onClickSort: onClickSort,
      width: "90px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
    }),
    Column({
      title: t("common.thanhTien"),
      sort_key: "thanhTien",
      dataSort: dataSortColumn["thanhTien"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      i18Name: "common.thanhTien",
      render: (value) => value.formatPrice(),
    }),
    Column({
      title: t("khamBenh.ketQua.ketQuaKetLuan"),
      sort_key: "tenBacSiChiDinh",
      dataSort: dataSortColumn["tenBacSiChiDinh"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "ketQuaKetLuan",
      key: "ketQuaKetLuan",
    }),
    Column({
      title: t("khamBenh.ketQua.giaTriThamChieu"),
      sort_key: "giaTriThamChieu",
      dataSort: dataSortColumn["giaTriThamChieu"] || "",
      onClickSort: onClickSort,
      width: "170px",
      dataIndex: "giaTriThamChieu",
      key: "giaTriThamChieu",
    }),
    Column({
      title: "TT35",
      sort_key: "tenMucDich",
      dataSort: dataSortColumn["tenMucDich"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "tenMucDich",
      key: "tenMucDich",
      i18Name: "TT35",
    }),

    Column({
      title: t("hsba.bsChiDinh"),
      sort_key: "tenBacSiChiDinh",
      dataSort: dataSortColumn["tenBacSiChiDinh"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "tenBacSiChiDinh",
      key: "tenBacSiChiDinh",
    }),
  ];

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    onListData(updatedSelectedKeys);
  };

  const oncheckAll = (e) => {
    let data = e.target?.checked
      ? listDichVuKyThuat.map((item) => item.id)
      : [];
    onListData(data);
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox onChange={oncheckAll} checked={isCheckedAll}></Checkbox>
        }
      />
    ),
    columnWidth: 40,
    onChange: onSelectChange,
    selectedRowKeys: selectedRowKeys,
  };

  return (
    <TableWrapper
      columns={columns}
      dataSource={listDichVuKyThuat}
      rowKey={(record) => record.id}
      styleWrap={{ height: 400 }}
      rowSelection={rowSelection}
    />
  );
};
export default DsDichVu;
