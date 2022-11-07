import React, { useEffect } from "react";
import { HeaderSearch, TableWrapper } from "components";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import { Checkbox } from "antd";
const { Column } = TableWrapper;

const ThuocHoSoBenhAn = (props, ref) => {
  const { t } = useTranslation();
  const { onListData, selectedRowKeys, isCheckedAll } = props;
  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };
  const {
    dsThuoc: { onSortChange },
  } = useDispatch();


  const listDsThuoc = useStore("dsThuoc.listDsThuoc", []);
  const dataSortColumn = useStore("dsThuoc.dataSortColumn", {});
  
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
      title: t("khamBenh.donThuoc.kho"),
      sort_key: "tenKho",
      dataSort: dataSortColumn["tenKho"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "tenKho",
      key: "tenKho",
    }),
    Column({
      title: t("hsba.tenThuoc"),
      sort_key: "tenDichVu",
      dataSort: dataSortColumn["tenDichVu"] || "",
      onClickSort: onClickSort,
      width: "300px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
    }),
    Column({
      title: t("common.soLuong"),
      sort_key: "soLuongYeuCau",
      dataSort: dataSortColumn["soLuongYeuCau"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "soLuongYeuCau",
      key: "soLuongYeuCau",
      align: "center",
    }),

    Column({
      title: t("common.lieuDung"),
      sort_key: "tenLieuDung",
      dataSort: dataSortColumn["tenLieuDung"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "tenLieuDung",
      key: "tenLieuDung",
      align: "center",
    }),
    Column({
      title: t("khamBenh.donThuoc.dotDung"),
      sort_key: "dotDung",
      dataSort: dataSortColumn["dotDung"] || "",
      onClickSort: onClickSort,
      width: "90px",
      dataIndex: "dotDung",
      key: "dotDung",
      align: "center",
    }),
    Column({
      title: t("common.luuY"),
      sort_key: "ghiChu",
      dataSort: dataSortColumn["ghiChu"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "ghiChu",
      key: "ghiChu",
    }),
    Column({
      title: t("hsba.bsChiDinh"),
      sort_key: "tenBacSiChiDinh",
      dataSort: dataSortColumn["tenBacSiChiDinh"] || "",
      onClickSort: onClickSort,
      width: "200px",
      dataIndex: "tenBacSiChiDinh",
      key: "tenBacSiChiDinh",
      i18Name: "hsba.bsChiDinh",
      align: "center",
    }),
  ];

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    onListData(updatedSelectedKeys);
  };

  const oncheckAll = (e) => {
    let data = e.target?.checked ? listDsThuoc.map((item) => item.id) : [];
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
      dataSource={listDsThuoc}
      rowKey={(record) => record.id}
      styleWrap={{ height: 400 }}
      rowSelection={rowSelection}
    />
  );
};

export default ThuocHoSoBenhAn;
