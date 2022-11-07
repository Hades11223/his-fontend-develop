import React, { useEffect, useState } from "react";
import TableWrapper from "components/TableWrapper";
import { Main } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Checkbox } from "antd";
import { TRANG_THAI_NB } from "constants/index";
import {
  getAllQueryString,
  setQueryStringValue,
  setQueryStringValues,
} from "hook/useQueryString/queryString";
import { cloneDeep } from "lodash";

const DanhSach = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    dataSortColumn = {},
    listThongTinNguoiBenh = [],
    totalElements,
    page,
    size,
  } = useSelector((state) => state.information);
  const {
    information: { onSizeChange, onSortChange, onSearch: onSearch },
  } = useDispatch();

  useEffect(() => {
    const {
      page,
      size,
      dataSortColumn = "{}",
      ...queries
    } = getAllQueryString();
    const sort = JSON.parse(dataSortColumn);
    onSizeChange({
      dataSearch: queries,
      dataSortColumn: sort,
      size: parseInt(size || 10),
      page: parseInt(page || 0),
    });
  }, []);

  const onChangePage = (page) => {
    setQueryStringValue("page", page - 1);
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    setQueryStringValues({ size: size, page: 0 });
    onSizeChange({ size });
  };

  const onClickSort = (key, value) => {
    let sort = cloneDeep(dataSortColumn);
    sort[key] = value;
    for (let key in sort) {
      if (!sort[key]) delete sort[key];
    }
    setQueryStringValues({ dataSortColumn: JSON.stringify(sort), page: 0 });
    onSortChange({ [key]: value });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        const { nbDotDieuTriId } = record;
        history.push("/ho-so-benh-an/chi-tiet-nguoi-benh/" + nbDotDieuTriId);
      },
    };
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("hsba.ngayDangKy")}
          sort_key="thoiGianVaoVien"
          dataSort={dataSortColumn["thoiGianVaoVien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      render: (field, item, index) =>
        field ? moment(field).format("DD / MM / YYYY") : "",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maNb")}
          sort_key="maNb"
          dataSort={dataSortColumn["maNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "maNb",
      key: "maNb",
    },
    {
      title: (
        <HeaderSearch
          title={t("hsba.hoTen")}
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.ngaySinh")}
          sort_key="ngaySinh"
          dataSort={dataSortColumn["ngaySinh"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      render: (field, item, index) =>
        field
          ? item.chiNamSinh
            ? moment(field).format("YYYY")
            : moment(field).format("DD / MM / YYYY")
          : "",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.diaChi")}
          sort_key="diaChi"
          dataSort={dataSortColumn["diaChi"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "diaChi",
      key: "diaChi",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("hsba.soDienThoai")}
          sort_key="soDienThoai"
          dataSort={dataSortColumn["soDienThoai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
    },
    {
      title: (
        <HeaderSearch
          title={t("hsba.soBHYT")}
          sort_key="maTheBhyt"
          dataSort={dataSortColumn["maTheBhyt"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "maTheBhyt",
      key: "maTheBhyt",
      render: (item) => {
        return item;
      },
    },
    {
      title: <HeaderSearch title={t("hsba.dongHoSo")} />,
      width: "40px",
      dataIndex: "checkbox",
      key: "checkbox",
      align: "center",
      render: (item, data) => {
        return (
          <Checkbox checked={data?.trangThaiNb === TRANG_THAI_NB.DA_RA_VIEN} />
        );
      },
    },
  ];
  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listThongTinNguoiBenh}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        // rowClassName={setRowClassName}
      />
      {!!listThongTinNguoiBenh?.length && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listThongTinNguoiBenh}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        />
      )}
    </Main>
  );
};

export default DanhSach;
