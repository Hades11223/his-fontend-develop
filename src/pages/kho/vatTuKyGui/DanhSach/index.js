import React, { useEffect, useRef } from "react";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Checkbox } from "antd";
import { useEnum, useStore } from "hook";
import { ENUM, FORMAT_DATE_TIME } from "constants/index";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import IcGroup from "assets/images/template/icGroup.png";

const { Column } = TableWrapper;

const DanhSach = (props) => {
  const { t } = useTranslation();
  const refSettings = useRef(null);

  const { totalElements, page, size } = useSelector(
    (state) => state.vatTuKyGui
  );
  const [listTrangThaiVatTuKyGui] = useEnum(ENUM.TRANG_THAI_VAT_TU_KY_GUI);

  const {
    vatTuKyGui: { onSearch, onSizeChange, onSortChange, onChangeInputSearch },
  } = useDispatch();
  const listVatTuKyGui = useStore("vatTuKyGui.listVatTuKyGui", []);
  const dataSortColumn = useStore("vatTuKyGui.dataSortColumn", {});

  useEffect(() => {
    onSizeChange(10);
  }, []);
  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const onRow = (record) => {};
  const setRowClassName = (record) => {
    let idDiff;
    // idDiff = phieuNhapXuatId;
    return record.id === idDiff ? "row-actived" : "";
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      ignore: true,
      fixed: "left",
    }),
    Column({
      title: t("kho.ma"),
      sort_key: "ma",
      dataSort: dataSortColumn["ma"] || "",
      onClickSort: onClickSort,
      width: "120px",
      dataIndex: "ma",
      key: "ma",
      i18Name: "kho.ma",
    }),
    Column({
      title: t("kho.tenHangHoa"),
      sort_key: "ten",
      dataSort: dataSortColumn["ten"] || "",
      onClickSort: onClickSort,
      width: "250px",
      dataIndex: "ten",
      key: "ten",
      i18Name: "kho.tenHangHoa",
    }),
    Column({
      title: t("kho.sl"),
      sort_key: "soLuong",
      dataSort: dataSortColumn["soLuong"] || "",
      onClickSort: onClickSort,
      width: "60px",
      dataIndex: "soLuong",
      key: "soLuong",
      i18Name: "kho.sl",
    }),
    Column({
      title: t("kho.dvt"),
      sort_key: "tenDonViTinh",
      dataSort: dataSortColumn["tenDonViTinh"] || "",
      onClickSort: onClickSort,
      width: "70px",
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      i18Name: "kho.dvt",
    }),
    Column({
      title: t("kho.nhaCungCap"),
      sort_key: "tenNhaCungCap",
      dataSort: dataSortColumn["tenNhaCungCap"] || "",
      onClickSort: onClickSort,
      width: "250px",
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
      i18Name: "kho.nhaCungCap",
    }),
    Column({
      title: t("kho.trangThai"),
      sort_key: "trangThaiVatTuKyGui",
      dataSort: dataSortColumn["trangThaiVatTuKyGui"] || "",
      onClickSort: onClickSort,
      width: "120px",
      dataIndex: "trangThaiVatTuKyGui",
      key: "trangThaiVatTuKyGui",
      i18Name: "kho.trangThai",
      // align: "center",
      render: (field, item, index) => {
        return (
          <div>{listTrangThaiVatTuKyGui.find((x) => x.id === field)?.ten}</div>
        );
      },
    }),
    Column({
      title: t("kho.hoTenNb"),
      sort_key: "tenNb",
      dataSort: dataSortColumn["tenNb"] || "",
      onClickSort: onClickSort,
      width: "180px",
      dataIndex: "tenNb",
      key: "tenNb",
      i18Name: "kho.hoTenNb",
    }),
    Column({
      title: t("common.maNb"),
      sort_key: "maNb",
      dataSort: dataSortColumn["maNb"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "maNb",
      key: "maNb",
      i18Name: "common.maNb",
    }),
    Column({
      title: t("common.maHoSo"),
      sort_key: "maHoSo",
      dataSort: dataSortColumn["maHoSo"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      i18Name: "common.maHoSo",
    }),
    Column({
      title: t("kho.thanhTien"),
      sort_key: "thanhTien",
      dataSort: dataSortColumn["thanhTien"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      i18Name: "kho.thanhTien",
      // align: "center",
      render: (field, item, index) => {
        return <div>{field && field.formatPrice()}</div>;
      },
    }),
    Column({
      title: t("common.tuTra"),
      sort_key: "tuTra",
      dataSort: dataSortColumn["tuTra"] || "",
      onClickSort: onClickSort,
      width: "80px",
      dataIndex: "tuTra",
      key: "tuTra",
      i18Name: "common.tuTra",
      align: "center",
      render: (field, item, index) => {
        return <Checkbox checked={field}></Checkbox>;
      },
    }),
    Column({
      title: t("common.khongTinhTien"),
      sort_key: "khongTinhTien",
      dataSort: dataSortColumn["khongTinhTien"] || "",
      onClickSort: onClickSort,
      width: "80px",
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      i18Name: "common.khongTinhTien",
      align: "center",
      render: (field, item, index) => {
        return <Checkbox checked={field}></Checkbox>;
      },
    }),
    Column({
      title: t("kho.quyetDinhThau.donGiaKhongBh"),
      sort_key: "giaKhongBaoHiem",
      dataSort: dataSortColumn["giaKhongBaoHiem"] || "",
      onClickSort: onClickSort,
      width: "90px",
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      i18Name: "kho.quyetDinhThau.donGiaKhongBh",
      // align: "center",
      render: (field, item, index) => {
        return <div>{field && field.formatPrice()}</div>;
      },
    }),
    Column({
      title: t("kho.quyetDinhThau.donGiaBh"),
      sort_key: "giaBaoHiem",
      dataSort: dataSortColumn["giaBaoHiem"] || "",
      onClickSort: onClickSort,
      width: "90px",
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      i18Name: "kho.quyetDinhThau.donGiaBh",
      // align: "center",
      render: (field, item, index) => {
        return <div>{field && field.formatPrice()}</div>;
      },
    }),
    Column({
      title: t("kho.quyetDinhThau.phuThu"),
      sort_key: "giaPhuThu",
      dataSort: dataSortColumn["giaPhuThu"] || "",
      onClickSort: onClickSort,
      width: "90px",
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
      i18Name: "kho.quyetDinhThau.phuThu",
      // align: "center",
      render: (field, item, index) => {
        return <div>{field && field.formatPrice()}</div>;
      },
    }),
    Column({
      title: t("kho.khoaChiDinh"),
      sort_key: "tenKhoaChiDinh",
      dataSort: dataSortColumn["tenKhoaChiDinh"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "tenKhoaChiDinh",
      key: "tenKhoaChiDinh",
      i18Name: "kho.khoaChiDinh",
    }),
    Column({
      title: t("kho.thoiGianThucHien"),
      sort_key: "thoiGianThucHien",
      dataSort: dataSortColumn["thoiGianThucHien"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      i18Name: "kho.thoiGianThucHien",
      // align: "center",
      render: (field, item, index) => {
        return <div>{field && moment(field).format(FORMAT_DATE_TIME)}</div>;
      },
    }),
    Column({
      title: t("kho.kho"),
      sort_key: "tenKho",
      dataSort: dataSortColumn["tenKho"] || "",
      onClickSort: onClickSort,
      width: "150px",
      dataIndex: "tenKho",
      key: "tenKho",
      i18Name: "kho.kho",
    }),
    Column({
      title: t("kho.soPhieu"),
      sort_key: "soPhieu",
      dataSort: dataSortColumn["soPhieu"] || "",
      onClickSort: onClickSort,
      width: "100px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      i18Name: "kho.soPhieu",
    }),
    Column({
      title: (
        <img
          src={IcGroup}
          alt="..."
          onClick={onSettings}
          style={{ cursor: "pointer" }}
        />
      ),
      width: "50px",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      ignore: true,
    }),
  ];
  return (
    <Main noPadding={true} top={10}>
      <TableWrapper
        columns={columns}
        dataSource={listVatTuKyGui || []}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        rowClassName={setRowClassName}
        scroll={{ x: 2800 }}
        tableName="table_Kho_VatTuKyGui"
        ref={refSettings}
      />
      <Pagination
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        listData={listVatTuKyGui}
        total={totalElements}
        onShowSizeChange={handleSizeChange}
      />
    </Main>
  );
};

export default DanhSach;
