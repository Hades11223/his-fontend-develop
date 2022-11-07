import React, { useEffect, useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import IcEye from "assets/svg/ic-eye.svg";
import IcSetting from "assets/svg/ic-setting.svg";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import {
  getAllQueryString,
  setQueryStringValue,
  setQueryStringValues,
} from "hook/useQueryString/queryString";
import { cloneDeep } from "lodash";
const DanhSach = (props) => {
  const { t } = useTranslation();
  const { dataSortColumn, listDsGiaHanThe, totalElements, page, size } =
    useSelector((state) => state.giaHanTheChuyenDoiTuong);
  const { listAllLoaiDoiTuong } = useSelector((state) => state.loaiDoiTuong);
  const [listTrangThaiNB] = useEnum(ENUM.TRANG_THAI_NB);
  const [listDoiTuong] = useEnum(ENUM.DOI_TUONG);
  const {
    loaiDoiTuong: { getListAllLoaiDoiTuong },
    giaHanTheChuyenDoiTuong: { onSizeChange, onSortChange, onSearch },
  } = useDispatch();

  const refSettings = useRef(null);

  useEffect(() => {
    const {
      page,
      size,
      dataSortColumn = "{}",
      ...queries
    } = getAllQueryString();
    const sort = JSON.parse(dataSortColumn);
    queries.dsTrangThai = [20, 30, 40, 100, 110];

    getListAllLoaiDoiTuong({ active: true, page: "", size: "" });
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

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: onOpenDetail(record),
    };
  };

  const onOpenDetail = (record) => (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    history.push("/quan-ly-noi-tru/chi-tiet-gia-han-the/" + record.id);
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
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
          title={t("common.maHoSo")}
          sort_key="maHoSo"
          dataSort={dataSortColumn["maHoSo"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "70px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      align: "center",
      // columnName: "Mã hồ sơ",
      show: true,
      i18Name: "common.maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maBenhAn")}
          sort_key="maBenhAn"
          dataSort={dataSortColumn["maBenhAn"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "70px",
      dataIndex: "maBenhAn",
      key: "maBenhAn",
      align: "center",
      // columnName: "Mã BA",
      i18Name: "common.maBenhAn",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.hoTenNguoiBenh")}
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "tenNb",
      key: "tenNb",
      // columnName: "Họ tên người bệnh",
      show: true,
      i18Name: "tiepDon.hoTenNguoiBenh",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.doiTuong")}
          sort_key="doiTuong"
          dataSort={dataSortColumn["doiTuong"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "70px",
      dataIndex: "doiTuong",
      key: "doiTuong",
      // columnName: "Họ tên người bệnh",
      show: true,
      i18Name: "common.doiTuong",
      render: (item) => (listDoiTuong || []).find((x) => x.id === item)?.ten,
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.giaHanThe.loaiDoiTuong")}
          sort_key="loaiDoiTuong"
          dataSort={dataSortColumn["loaiDoiTuong"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "70px",
      dataIndex: "loaiDoiTuong",
      key: "loaiDoiTuong",
      // columnName: "Họ tên người bệnh",
      show: true,
      i18Name: "quanLyNoiTru.giaHanThe.loaiDoiTuong",
      render: (item) =>
        (listAllLoaiDoiTuong || []).find((x) => x.id === item)?.ten,
    },
    {
      title: (
        <HeaderSearch
          title={t("quanLyNoiTru.giaHanThe.soTheBh")}
          sort_key="maTheBhyt"
          dataSort={dataSortColumn["maTheBhyt"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "maTheBhyt",
      key: "maTheBhyt",
      // columnName: "Họ tên người bệnh",
      show: true,
      i18Name: "quanLyNoiTru.giaHanThe.soTheBh",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.trangThaiNb")}
          sort_key="trangThai"
          dataSort={dataSortColumn["trangThai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "trangThai",
      key: "trangThai",
      // columnName: "Trạng thái NB",
      i18Name: "common.trangThaiNb",
      show: true,
      render: (item) => {
        return (listTrangThaiNB || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.khoa")}
          sort_key="tenKhoaNb"
          dataSort={dataSortColumn["tenKhoaNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "tenKhoaNb",
      key: "tenKhoaNb",
      // columnName: "Khoa nhập viện",
      i18Name: "common.khoa",
      show: true,
    },
    {
      title: (
        <HeaderSearch
          title={
            <>
              {t("common.thaoTac")}
              <IcSetting onClick={onSettings} className="icon" />
            </>
          }
        />
      ),
      width: "90px",
      dataIndex: "",
      key: "",
      align: "center",
      fixed: "right",
      render: (record) => {
        return <IcEye className="ic-action" onClick={onOpenDetail(record)} />;
      },
    },
  ];
  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listDsGiaHanThe}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        scroll={{ x: 2000 }}
        tableName="table_QLNT_danhSachGiaHanThe"
        ref={refSettings}
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listDsGiaHanThe}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        />
      )}
    </Main>
  );
};

export default DanhSach;
