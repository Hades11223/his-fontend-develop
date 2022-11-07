import React, { useEffect } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import {  useDispatch } from "react-redux";
import moment from "moment";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";

const DanhSach = () => {
  const { t } = useTranslation();
  const {listData} = useStore("danhSachPhieuChoKy",[]);
  const {dataSortColumn} = useStore("danhSachPhieuChoKy",{})
  const { totalElements, page, size} = useStore("danhSachPhieuChoKy",[])

  const {
    danhSachPhieuChoKy: { getList, onSizeChange, onSortChange, updateData },
    utils: { getUtils },
  } = useDispatch();

  useEffect(() => {
    getUtils({ name: "trangThaiKy" });
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


  const setRowClassName = (record) => {
    return "";
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "15px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.tenPhieu")}
          sort_key="tenBaoCao"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenBaoCao"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenBaoCao",
      key: "tenBaoCao",
      render: (item) => {
        return <b>{item}</b>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHoSo")}
          sort_key="maHoSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maHoSo"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      render: (item) => {
        return <b>{item}</b>;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.hoVaTenNb")}
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenNb"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.nguoiTrinhKy")}
          sort_key="tenNguoiTrinhKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenNguoiTrinhKy"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenNguoiTrinhKy",
      key: "tenNguoiTrinhKy",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.thoiGianTrinhKy")}
          sort_key="thoiGianTrinhKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianTrinhKy"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "thoiGianTrinhKy",
      key: "thoiGianTrinhKy",
      render: (item) => {
        return moment(item)?.format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kySo.xemPhieu")}
        />
      ),
      width: "30px",
      dataIndex: "",
      key: "",
      align: "center",
      render: (item) => {
        return (
          <img
            src={require("assets/images/utils/eye.png")}
            alt=""
            onClick={() => {}}
          />
        );
      },
    },
  ];
  return (
    <Main>
      <ContentTable>
        <TableWrapper
          columns={columns}
          dataSource={listData}
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
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
    </Main>
  );
};

export default DanhSach;
