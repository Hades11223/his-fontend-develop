import React, { useEffect, useRef, useState } from "react";
import TableWrapper from "components/TableWrapper";
import { Main } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import { Checkbox, message } from "antd";
import IcGroup from "assets/images/template/icGroup.png";
import IcEye from "assets/svg/ic-eye.svg";

const { Column } = TableWrapper;

const DanhSachLuuTru = (props) => {
  const { t } = useTranslation();

  const refSettings = useRef(null);

  const [listTrangThaiBenhAn] = useEnum(ENUM.TRANG_THAI_BENH_AN);
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const [listTrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);
  const [listHuongDieuTriNoiTru] = useEnum(ENUM.HUONG_DIEU_TRI_NOI_TRU);
  const [listHuongDieuTriKham] = useEnum(ENUM.HUONG_DIEU_TRI_KHAM);
  const [listKetQuaDieuTri] = useEnum(ENUM.KET_QUA_DIEU_TRI);

  const {
    dataSortColumn = {},
    listDsLuuTru = [],
    totalElements,
    page,
    size,
  } = useSelector((state) => state.dsLuuTruBa);
  const {
    dsLuuTruBa: {
      onSizeChange,
      onSortChange,
      onSearch: onSearchLuuTruBa,
      updateData,
    },
  } = useDispatch();
  useEffect(() => {
    onSizeChange(10);
  }, []);

  const [state, _setState] = useState({
    selectedRowKeys: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onChangePage = (page) => {
    onSearchLuuTruBa({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange(size);
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        history.push("/ho-so-benh-an/chi-tiet-luu-tru-ba/" + id);
      },
    };
  };

  // const setRowClassName = (record) => {
  //   let idDiff;
  //   idDiff = phieuNhapXuatId;
  //   return record.id === idDiff ? "row-actived" : "";
  // };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "40px",
      dataIndex: "index",
      key: "index",
      align: "center",
      ignore: true,
    }),
    Column({
      title: t("hsba.hoTen"),
      width: "200px",
      dataIndex: "tenNb",
      key: "tenNb",
      i18Name: "hsba.hoTen",
    }),
    Column({
      title: t("common.maHoSo"),
      width: "120px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      i18Name: "common.maHoSo",
    }),
    Column({
      title: t("common.maNb"),
      width: "120px",
      dataIndex: "maNb",
      key: "maNb",
      i18Name: "common.maNb",
    }),
    Column({
      title: t("hsba.maLuuTru"),
      width: "100px",
      dataIndex: "maLuuTru",
      key: "maLuuTru",
      i18Name: "hsba.maLuuTru",
    }),
    Column({
      title: t("hsba.thoiGianLuuTru"),
      width: "100px",
      dataIndex: "thoiGianLuuTru",
      key: "thoiGianLuuTru",
      i18Name: "hsba.thoiGianLuuTru",
      render: (field, item, index) =>
        field ? moment(field).format("DD / MM / YYYY") : "",
    }),
    Column({
      title: t("common.maBenhAn"),
      width: "100px",
      dataIndex: "maBenhAn",
      key: "maBenhAn",
      i18Name: "common.maBenhAn",
    }),
    Column({
      title: t("hsba.trangThaiNb"),
      width: "120px",
      dataIndex: "trangThaiNb",
      key: "trangThaiNb",
      i18Name: "hsba.trangThaiNb",
      render: (item) => listTrangThaiNb.find((x) => x.id === item)?.ten || "",
    }),
    Column({
      title: t("hsba.trangThaiBenhAn"),
      width: "100px",
      dataIndex: "trangThaiBenhAn",
      key: "trangThaiBenhAn",
      i18Name: "hsba.trangThaiBenhAn",
      render: (item) =>
        listTrangThaiBenhAn.find((x) => x.id === item)?.ten || "",
    }),
    Column({
      title: t("hsba.doiTuongKcb"),
      width: "120px",
      dataIndex: "doiTuongKcb",
      key: "doiTuongKcb",
      i18Name: "hsba.doiTuongKcb",
      render: (item) => listDoiTuongKcb.find((x) => x.id === item)?.ten || "",
    }),
    Column({
      title: t("hsba.thoiGianNhanBa"),
      width: "140px",
      dataIndex: "thoiGianNhanBa",
      key: "thoiGianNhanBa",
      i18Name: "hsba.thoiGianNhanBa",
      render: (field, item, index) =>
        field ? moment(field).format("DD-MM-YYYY HH:mm") : "",
    }),
    Column({
      title: t("hsba.thoiGianLapBenhAn"),
      width: "120px",
      dataIndex: "thoiGianLapBenhAn",
      key: "thoiGianLapBenhAn",
      i18Name: "hsba.thoiGianLapBenhAn",
      render: (field, item, index) =>
        field ? moment(field).format("DD / MM / YYYY") : "",
    }),
    Column({
      title: t("hsba.tenKhoaNb"),
      width: "160px",
      dataIndex: "tenKhoaNb",
      key: "tenKhoaNb",
      i18Name: "hsba.tenKhoaNb",
    }),
    Column({
      title: t("hsba.soNgayDieuTri"),
      width: "100px",
      key: "soNgayDieuTri",
      dataIndex: "soNgayDieuTri",
      i18Name: "hsba.soNgayDieuTri",
      align: "center",
    }),
    Column({
      title: t("hsba.dsCdChinh"),
      width: "160px",
      dataIndex: "dsCdChinh",
      key: "dsCdChinh",
      i18Name: "hsba.dsCdChinh",
      render: (item) => (item || []).map((x) => x.ten).join(", "),
    }),
    Column({
      title: t("hsba.dsCdKemTheo"),
      width: "160px",
      dataIndex: "dsCdKemTheo",
      key: "dsCdKemTheo",
      i18Name: "hsba.dsCdKemTheo",
      render: (item) => (item || []).map((x) => x.ten).join(", "),
    }),
    Column({
      title: t("hsba.thoiGianVaoVien"),
      width: "120px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      i18Name: "hsba.thoiGianVaoVien",
      render: (field, item, index) =>
        field ? moment(field).format("DD / MM / YYYY") : "",
    }),
    Column({
      title: t("hsba.tienConLai"),
      width: "100px",
      dataIndex: "tienConLai",
      key: "tienConLai",
      align: "right",
      i18Name: "hsba.tienConLai",
      render: (item) => (item || 0).formatPrice(),
    }),
    Column({
      title: t("hsba.thoiGianRaVien"),
      width: "120px",
      dataIndex: "thoiGianRaVien",
      key: "thoiGianRaVien",
      i18Name: "hsba.thoiGianRaVien",
      render: (field, item, index) =>
        field ? moment(field).format("DD / MM / YYYY") : "",
    }),
    Column({
      title: t("hsba.huongDieuTri"),
      width: "100px",
      dataIndex: "huongDieuTri",
      key: "huongDieuTri",
      i18Name: "hsba.huongDieuTri",
      render: (item) =>
        [...listHuongDieuTriKham, ...listHuongDieuTriNoiTru].find(
          (x) => x.id === item
        )?.ten || "",
    }),
    Column({
      title: t("hsba.ketQuaDieuTri"),
      width: "120px",
      dataIndex: "ketQuaDieuTri",
      key: "ketQuaDieuTri",
      i18Name: "hsba.ketQuaDieuTri",
      render: (item) => listKetQuaDieuTri.find((x) => x.id === item)?.ten || "",
    }),
    Column({
      title: t("hsba.soNamLuuTru"),
      width: "100px",
      dataIndex: "soNamLuuTru",
      key: "soNamLuuTru",
      i18Name: "hsba.soNamLuuTru",
    }),

    Column({
      title: (
        <>
          {t("common.tienIch")}
          <img
            src={IcGroup}
            alt="..."
            onClick={onSettings}
            style={{ cursor: "pointer" }}
          />
        </>
      ),
      width: "120px",
      align: "center",
      fixed: "right",
      ignore: true,
      render: (list, item, index) => {
        return (
          <>
            <IcEye className="ic-action" />
          </>
        );
      },
    }),
  ];

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? listDsLuuTru.map((x) => x.id) : [],
      isCheckedAll: e.target?.checked,
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    const listTrangThai = [...new Set(data.map((x) => x.trangThaiBenhAn))];
    if (listTrangThai.length > 1) {
      message.error("Các bệnh án có trạng thái khác nhau");
      return;
    }

    let updatedSelectedKeys = selectedRowKeys;

    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    if (listDsLuuTru.length === updatedSelectedKeys.length) {
      setState({
        isCheckedAll: true,
        selectedRowKeys: updatedSelectedKeys,
      });
    } else {
      setState({
        isCheckedAll: false,
        selectedRowKeys: updatedSelectedKeys,
      });
    }

    updateData({
      selectedDichVu: data,
    });
  };

  const rowSelection = {
    columnTitle: <HeaderSearch title="" />,
    columnWidth: 40,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  return (
    <Main noPadding={true}>
      <TableWrapper
        columns={columns}
        dataSource={listDsLuuTru}
        onRow={onRow}
        rowKey={(record) => record.id}
        // scroll={{ x: 2000 }}
        rowSelection={rowSelection}
        ref={refSettings}
        tableName="table_HSBA_LuuTruBenhAn"
      />
      <Pagination
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        listData={listDsLuuTru}
        total={totalElements}
        onShowSizeChange={handleSizeChange}
      />
    </Main>
  );
};

export default DanhSachLuuTru;
