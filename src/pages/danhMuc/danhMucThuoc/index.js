import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "components/TableWrapper";
import FormServiceInfo from "./components/FormServiceInfo";
import LieuDungThuoc from "./components/LieuDungThuoc";
import NhomChiPhi from "components/DanhMuc/NhomChiPhi";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import MultiLevelTab from "components/MultiLevelTab";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import BaseDm3 from "../BaseDm3";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  KHONG_TINH_TIEN,
  ENUM,
  YES_NO,
} from "constants/index";
import { Checkbox, Col, Input } from "antd";
import { formatNumber } from "utils";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import { useEnum } from "hook";
import { useTranslation } from "react-i18next";
import { useBeforeUnload } from "hook/usePrompt";
import MucDichSuDung from "components/DanhMuc//MucDichSuDung";

const ID_LOAI_DICH_VU = 90;
const TEN_LOAI_DICH_VU = "Danh mục thuốc";

const DanhMucThuoc = (props) => {
  const [editStatus, setEditStatus] = useState(false);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const { t } = useTranslation();
  const {
    danhMucThuoc: {
      listData,
      totalElements,
      page,
      size,
      currentItem,
      dataSortColumn,
    },
    hoatChat: { listHoatChat = [] },
    nhomDichVuKho: { listMeGrLv1: listNhomThuoc = [] },
    phanNhomDichVuKho: { listAllNhomDichVuKho = [] },
    phanLoaiThuoc: { listAllPhanLoaiThuoc },
    donViTinh: { listAllDonViTinh },
    xuatXu: { listAllXuatXu },
    doiTac: { listAllNhaSanXuat, listAllNhaCungCap },
    utils: { listnhomChiPhiBh = [], listNguonKhacChiTra = [] },
    nhomDichVuCap1: { listGroupService1: listNhomDvCap1 = [] },
    nhomDichVuCap2: { listGroupService2: listNhomDvCap2 = [] },
    nhomDichVuCap3: { listGroupService3: listNhomDvCap3 = [] },
    duongDung: { listAllDuongDung = [] },
    khoa: { listKhoa },
  } = useSelector((state) => state);
  const {
    danhMucThuoc: {
      onSearch,
      onSizeChange,
      onSortChange,
      onChangeInputSearch,
      updateData,
    },
    hoatChat: { searchHoatChatTongHop },
    nhomDichVuKho: { getListMeGrLv1TongHop: searchNhomThuoc },
    phanNhomDichVuKho: { getListAllNhomDichVuKho },
    phanLoaiThuoc: { getListAllPhanLoaiThuoc },
    donViTinh: { getListAllDonViTinh },
    xuatXu: { getListAllXuatXu },
    doiTac: { getListAllNhaSanXuat, getListAllNhaCungCap },
    utils: { getUtils },
    nhomDichVuCap1: { searchTongHopDichVuCap1 },
    nhomDichVuCap2: { searchTongHopDichVuCap2 },
    nhomDichVuCap3: { searchTongHopDichVuCap3 },
    duongDung: { getListAllDuongDung },
    dichVuKho: { onExport, onImport },
  } = useDispatch();
  const [listgoiThau] = useEnum(ENUM.GOI_THAU);
  const [listnhomThau] = useEnum(ENUM.NHOM_THAU);
  const [listDsMucDichSuDung] = useEnum(ENUM.MUC_DICH_SU_DUNG);

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    onSizeChange({ size: 10 });
    searchAllServices();
  }, []);

  const searchAllServices = () => {
    const params = { page: "", size: "", active: true, sort: "ten,asc" };
    searchHoatChatTongHop({ ...params, loaiDichVu: ID_LOAI_DICH_VU });
    searchNhomThuoc({ ...params, loaiDichVu: ID_LOAI_DICH_VU });
    getListAllNhomDichVuKho({ ...params, loaiDichVu: ID_LOAI_DICH_VU });
    getListAllPhanLoaiThuoc({ ...params, loaiDichVu: ID_LOAI_DICH_VU });
    getListAllDonViTinh({
      page: "",
      size: "",
      loaiDichVu: ID_LOAI_DICH_VU,
    });
    getListAllXuatXu(params);
    getListAllNhaSanXuat({
      page: "",
      size: "",
      active: true,
      dsLoaiDoiTac: [10],
      loaiDichVu: ID_LOAI_DICH_VU,
    });
    getListAllNhaCungCap({
      page: "",
      size: "",
      active: true,
      dsLoaiDoiTac: [20],
      loaiDichVu: ID_LOAI_DICH_VU,
    });
    getUtils({ page: 0, name: "nhomChiPhiBh", sort: "ten,asc" });
    getUtils({ page: 0, name: "NguonKhacChiTra", sort: "ten,asc" });
    searchTongHopDichVuCap1(params);
    searchTongHopDichVuCap2(params);
    searchTongHopDichVuCap3(params);
    getListAllDuongDung(params);
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
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
        } else value = e;
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
      title: <HeaderSearch title={t("common.stt")} />,
      width: 50,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("danhMuc.maThuoc")}
          sort_key="dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ma"] || 0}
          search={
            <Input
              placeholder={t("danhMuc.timMaThuoc")}
              onChange={onSearchInput("dichVu.ma")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item.ma;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("danhMuc.tenThuoc")}
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ten"] || 0}
          search={
            <Input
              placeholder={t("danhMuc.timTenThuoc")}
              onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("danhMuc.maHoatChat")}
          sort_key="hoatChat.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["hoatChat.ma"] || 0}
          searchSelect={
            <Select
              data={listHoatChat.map((item) => ({ id: item.id, ten: item.ma }))}
              placeholder={t("danhMuc.chonMaHoatChat")}
              onChange={onSearchInput("hoatChatId")}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "hoatChat",
      key: "hoatChat",
      render: (item) => item?.ma,
    },
    {
      title: (
        <HeaderSearch
          sort_key="tenHoatChat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenHoatChat || 0}
          search={
            <Input
              style={{ width: "100%" }}
              placeholder={t("danhMuc.timTenHoatChat")}
              onChange={onSearchInput("tenHoatChat")}
            />
          }
          title={t("danhMuc.tenHoatChat")}
        />
      ),
      width: 170,
      dataIndex: "tenHoatChat",
      key: "tenHoatChat",
    },
    {
      title: (
        <HeaderSearch
          sort_key="hamLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.hamLuong || 0}
          search={
            <Input
              placeholder={t("danhMuc.timHamLuong")}
              onChange={onSearchInput("hamLuong")}
            />
          }
          title={t("danhMuc.hamLuong")}
        />
      ),
      width: 150,
      dataIndex: "hamLuong",
      key: "hamLuong",
    },
    {
      title: (
        <HeaderSearch
          sort_key="nhomDvKhoCap1.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhomDvKhoCap1.ten"] || 0}
          searchSelect={
            <Select
              data={listNhomThuoc}
              placeholder={t("danhMuc.chonNhomThuoc")}
              onChange={onSearchInput("nhomDvKhoCap1Id")}
            />
          }
          title={t("danhMuc.nhomThuoc")}
        />
      ),
      width: 150,
      dataIndex: "nhomDvKhoCap1",
      key: "nhomDvKhoCap1",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="phanNhomDvKho.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["phanNhomDvKho.ten"] || 0}
          searchSelect={
            <Select
              data={listAllPhanLoaiThuoc}
              placeholder={t("danhMuc.chonPhanNhomThuoc")}
              onChange={onSearchInput("nhomDvKhoCap1Id")}
            />
          }
          title={t("danhMuc.phanNhomThuoc")}
        />
      ),
      width: 150,
      dataIndex: "phanNhomDvKho",
      key: "phanNhomDvKho",
      render: (item, _, __) => item && item?.ten,
    },
    {
      title: (
        <HeaderSearch
          sort_key="phanLoaiDvKho.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["phanLoaiDvKho.ten"] || 0}
          searchSelect={
            <Select
              data={listAllPhanLoaiThuoc}
              placeholder={t("danhMuc.chonPhanLoaiThuoc")}
              onChange={onSearchInput("phanLoaiDvKhoId")}
            />
          }
          title={t("danhMuc.phanLoaiThuoc")}
        />
      ),
      width: 150,
      dataIndex: "phanLoaiDvKho",
      key: "phanLoaiDvKho",
      render: (item, _, __) => item && item?.ten,
    },
    {
      title: (
        <HeaderSearch
          sort_key="dvtSoCap.ten"
          defaultValue=""
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dvtSoCap.ten"] || 0}
          searchSelect={
            <Select
              data={listAllDonViTinh}
              placeholder={t("danhMuc.chonDonViSoCap")}
              onChange={onSearchInput("dvtSoCapId")}
            />
          }
          title={t("danhMuc.donViSoCap")}
        />
      ),
      width: 150,
      dataIndex: "dvtSoCap",
      key: "dvtSoCap",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.donViTinh.ten"
          defaultValue=""
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.donViTinh.ten"] || 0}
          searchSelect={
            <Select
              data={listAllDonViTinh}
              placeholder={t("danhMuc.chonDonViThuCap")}
              onChange={onSearchInput("dichVu.donViTinhId")}
            />
          }
          title={t("danhMuc.donViThuCap")}
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dvtThuCap",
      render: (item) => {
        return item?.donViTinh?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="heSoDinhMuc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.heSoDinhMuc || 0}
          search={
            <Input
              placeholder={t("danhMuc.timHeSoDinhMuc")}
              onChange={onSearchInput("heSoDinhMuc")}
            />
          }
          title={t("danhMuc.heSoDinhMuc")}
        />
      ),
      width: 150,
      dataIndex: "heSoDinhMuc",
      key: "heSoDinhMuc",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          sort_key="quyCach"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.quyCach || 0}
          search={
            <Input
              placeholder={t("danhMuc.timQuyCach")}
              onChange={onSearchInput("quyCach")}
            />
          }
          title={t("danhMuc.quyCach")}
        />
      ),
      width: 130,
      dataIndex: "quyCach",
      key: "quyCach",
    },
    {
      title: (
        <HeaderSearch
          sort_key="xuatXu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["xuatXu.ten"] || 0}
          searchSelect={
            <Select
              // data={listQuocGia}
              data={listAllXuatXu}
              placeholder={t("danhMuc.chonNuocSanXuat")}
              onChange={onSearchInput("xuatXuId")}
            />
          }
          title={t("danhMuc.nuocSanXuat")}
        />
      ),
      width: 130,
      dataIndex: "xuatXu",
      key: "xuatXu",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="nhaSanXuat.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhaSanXuat.ten"] || 0}
          searchSelect={
            <Select
              data={listAllNhaSanXuat}
              placeholder={t("danhMuc.chonNhaSanXuat")}
              onChange={onSearchInput("nhaSanXuatId")}
            />
          }
          title={t("danhMuc.nhaSanXuat")}
        />
      ),
      width: 130,
      dataIndex: "nhaSanXuat",
      key: "nhaSanXuat",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="nhaCungCap.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhaCungCap.ten"] || 0}
          searchSelect={
            <Select
              data={listAllNhaCungCap}
              placeholder={t("danhMuc.chonNhaCungCap")}
              onChange={onSearchInput("nhaCungCapId")}
            />
          }
          title={t("danhMuc.nhaCungCap")}
        />
      ),
      width: 130,
      dataIndex: "nhaCungCap",
      key: "nhaCungCap",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaNhapSauVat || 0}
          search={
            <Input
              placeholder={t("danhMuc.timGiaNhap")}
              onChange={onSearchInput("giaNhapSauVat")}
            />
          }
          title={t("danhMuc.giaNhap")}
        />
      ),
      width: 130,
      dataIndex: "giaNhapSauVat",
      key: "giaNhapSauVat",
      align: "right",
      render: (field, _, __) => (field && formatNumber(field)) || "",
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tyLeBhTt"] || 0}
          search={
            <Input
              placeholder={t("danhMuc.timTyLeBhtt")}
              onChange={onSearchInput("dichVu.tyLeBhTt")}
            />
          }
          title={t("danhMuc.tyLeBhThanhToan")}
        />
      ),
      width: 170,
      dataIndex: "dichVu",
      key: "dichVu",
      align: "right",
      render: (item) => {
        return item?.tyLeBhTt;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomChiPhiBh"] || 0}
          searchSelect={
            <Select
              data={listnhomChiPhiBh}
              placeholder={t("danhMuc.chonNhomChiPhi")}
              onChange={onSearchInput("dichVu.nhomChiPhiBh")}
            />
          }
          title={t("danhMuc.nhomChiPhi")}
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        const index = listnhomChiPhiBh.findIndex(
          (chiphi) => chiphi.id === item.nhomChiPhiBh
        );
        if (index === -1) return;
        return listnhomChiPhiBh[index]?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.nhomDichVuCap1.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap1.ten"] || 0}
          searchSelect={
            <Select
              data={listNhomDvCap1}
              placeholder={t("danhMuc.chonNhomDCap1")}
              onChange={onSearchInput("dichVu.nhomDichVuCap1Id")}
            />
          }
          title={t("danhMuc.nhomDvCap1")}
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item?.nhomDichVuCap1?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.tenTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tenTuongDuong"] || 0}
          search={
            <Input
              placeholder={t("danhMuc.timTenTuongDuong")}
              onChange={onSearchInput("dichVu.tenTuongDuong")}
            />
          }
          title={t("danhMuc.tenTuongDuong")}
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item.tenTuongDuong;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="soVisa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soVisa || 0}
          search={
            <Input
              placeholder={t("danhMuc.timSoVisa")}
              onChange={onSearchInput("soVisa")}
            />
          }
          title={t("danhMuc.soVisa")}
        />
      ),
      width: 150,
      dataIndex: "soVisa",
      key: "soVisa",
    },
    {
      title: (
        <HeaderSearch
          sort_key="maLienThong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maLienThong || 0}
          search={
            <Input
              placeholder={t("danhMuc.timMaLienThongDuocQuocGia")}
              onChange={onSearchInput("maLienThong")}
            />
          }
          title={t("danhMuc.maLienThongDuocQuocGia")}
        />
      ),
      width: 150,
      dataIndex: "maLienThong",
      key: "maLienThong",
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={listNguonKhacChiTra}
              placeholder={t("danhMuc.timNguonChiTraKhac")}
              mode="multiple"
              onChange={onSearchInput("dsNguonKhacChiTra")}
            />
          }
          title={t("danhMuc.nguonChiTraKhac")}
        />
      ),
      width: 170,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) =>
        item?.dsNguonKhacChiTra
          ?.map((dsId) => {
            const index = listNguonKhacChiTra?.findIndex(
              (nguon) => nguon.id === dsId
            );
            return listNguonKhacChiTra[index]?.ten;
          })
          .join(", "),
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={listKhoa}
              placeholder={t("danhMuc.timKhoaChiDinhTheoDvtSoCap")}
              mode="multiple"
              onChange={onSearchInput("dsKhoaCdDvtSoCapId")}
            />
          }
          title={t("danhMuc.khoaChiDinhTheoDvtSoCap")}
        />
      ),
      width: 170,
      dataIndex: "id",
      key: "id",
      render: (item, row) =>
        row?.dsKhoaCdDvtSoCapId
          ?.map((dsId) => {
            const index = listKhoa?.findIndex((nguon) => nguon.id === dsId);
            return listKhoa[index]?.ten;
          })
          .join(", "),
    },
    {
      title: (
        <HeaderSearch
          sort_key="dungTich"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dungTich || 0}
          search={
            <Input
              placeholder={t("danhMuc.timDungTich")}
              onChange={onSearchInput("dungTich")}
            />
          }
          title={t("danhMuc.dungTich")}
        />
      ),
      width: 150,
      dataIndex: "dungTich",
      key: "dungTich",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          sort_key="duongDung.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["duongDung.ten"] || 0}
          searchSelect={
            <Select
              data={listAllDuongDung}
              placeholder={t("danhMuc.timDuongDung")}
              onChange={onSearchInput("duongDung.ten")}
            />
          }
          title={t("danhMuc.duongDung")}
        />
      ),
      width: 170,
      dataIndex: "duongDung",
      key: "duongDung",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="chiDinhSlLe"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.chiDinhSlLe || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder={t("danhMuc.chonKeSlLe")}
              onChange={(value) => {
                onSearchInput(value, "chiDinhSlLe");
              }}
            />
          }
          title={t("danhMuc.choPhepKeSlLe")}
        />
      ),
      width: 130,
      dataIndex: "chiDinhSlLe",
      key: "chiDinhSlLe",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="theoDoiNgaySd"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.theoDoiNgaySd || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder={t("danhMuc.chonTheoDoiNgaySuDung")}
              onChange={(value) => {
                onSearchInput(value, "theoDoiNgaySd");
              }}
            />
          }
          title={t("danhMuc.theoDoiNgaySd")}
        />
      ),
      width: 130,
      dataIndex: "theoDoiNgaySd",
      key: "theoDoiNgaySd",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
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
              placeholder={t("danhMuc.chonTinhTien")}
              onChange={onSearchInput("dichVu.khongTinhTien")}
            />
          }
          title={t("danhMuc.khongTinhTien")}
        />
      ),
      align: "center",
      width: 160,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return <Checkbox checked={!!item?.khongTinhTien} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="nhomThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhomThau"] || 0}
          searchSelect={
            <Select
              data={listnhomThau}
              placeholder={t("danhMuc.chonNhomThau")}
              onChange={onSearchInput("nhomThau")}
            />
          }
          title={t("danhMuc.nhomThau")}
        />
      ),
      align: "center",
      width: 160,
      dataIndex: "nhomThau",
      key: "nhomThau",
      render: (item) => {
        return (listnhomThau || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="goiThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["goiThau"] || 0}
          searchSelect={
            <Select
              data={listgoiThau}
              placeholder={t("danhMuc.chonGoiThau")}
              onChange={onSearchInput("goiThau")}
            />
          }
          title={t("danhMuc.goiThau")}
        />
      ),
      align: "center",
      width: 160,
      dataIndex: "goiThau",
      key: "goiThau",
      render: (item) => {
        return (listgoiThau || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="quyetDinhThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyetDinhThau"] || 0}
          search={
            <Input
              placeholder={t("danhMuc.nhapQuyetDinhThau")}
              onChange={onSearchInput("quyetDinhThau")}
            />
          }
          title={t("danhMuc.quyetDinhThau")}
        />
      ),
      align: "center",
      width: 160,
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
    },
    {
      title: (
        <HeaderSearch
          title={t("danhMuc.mucDichSuDung")}
          sort_key="dsMucDichSuDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dsMucDichSuDung"] || 0}
          // searchSelect={
          //   <Select
          //     data={[{ id: "", ten: t("common.tatCa") }, ...listDsMucDichSuDung]}
          //     placeholder={t("danhMuc.chonMucDichSuDung")}
          //     onChange={onSearchInput("dsMucDichSuDung")}
          //   />
          // }
        />
      ),
      width: "150px",
      dataIndex: "dsMucDichSuDung",
      key: "dsMucDichSuDung",
      render: (item) => {
        let arr = [];
        if (item?.length && listDsMucDichSuDung) {
          item.forEach((mucDichSuDungItem) => {
            const tenMucDIchSuDung = listDsMucDichSuDung.find(
              (item) => item.id === mucDichSuDungItem
            );
            if (tenMucDIchSuDung) arr.push(tenMucDIchSuDung.ten);
          });
        }
        return arr.join(", ");
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="thuocDauSao"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thuocDauSao || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              onChange={(value) => {
                onSearchInput(value, "thuocDauSao");
              }}
            />
          }
          title={t("danhMuc.thuocDauSao")}
        />
      ),
      width: 130,
      dataIndex: "thuocDauSao",
      key: "thuocDauSao",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="mucDichSuDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.mucDichSuDung || 0}
          searchSelect={
            <Select data={YES_NO} onChange={onSearchInput("mucDichSuDung")} />
          }
          title={t("danhMuc.apDungTt30")}
        />
      ),
      width: 130,
      dataIndex: "mucDichSuDung",
      key: "mucDichSuDung",
      align: "center",
      render: (item, data) => {
        return <Checkbox checked={data?.mucDichSuDung} />;
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
              placeholder={t("danhMuc.chonHieuLuc")}
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          title={t("danhMuc.coHieuLuc")}
        />
      ),
      width: 130,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];
  const listPanel = [
    {
      title: "Thông tin dịch vụ",
      key: 1,
      show: true,
      render: () => {
        return (
          <FormServiceInfo
            listHoatChat={listHoatChat}
            listNhomThuoc={listNhomThuoc}
            listAllNhomDichVuKho={listAllNhomDichVuKho}
            listAllPhanLoaiThuoc={listAllPhanLoaiThuoc}
            listAllDonViTinh={listAllDonViTinh}
            // listQuocGia={listQuocGia}
            listAllXuatXu={listAllXuatXu}
            listNSX={listAllNhaSanXuat}
            listNCC={listAllNhaCungCap}
            listnhomChiPhiBh={listnhomChiPhiBh}
            listNguonKhacChiTra={listNguonKhacChiTra}
            listNhomDvCap1={listNhomDvCap1}
            listNhomDvCap2={listNhomDvCap2}
            listNhomDvCap3={listNhomDvCap3}
            listAllDuongDung={listAllDuongDung}
            roleSave={[ROLES["DANH_MUC"].THUOC_THEM]}
            roleEdit={[ROLES["DANH_MUC"].THUOC_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].THUOC_SUA])
                : !checkRole([ROLES["DANH_MUC"].THUOC_THEM])
            }
            currentItemRowParent={props?.currentItem}
            optionalField={["nhomDichVuCap2Id"]}
            hiddenField={[
              "giaTran",
              "tranBaoHiem",
              "maTuongDuong",
              "nhomDichVuCap2Id",
              "nhomDichVuCap3Id",
            ]}
          />
        );
      },
    },
    {
      title: "Liều dùng",
      key: 2,
      show: true,
      render: () => {
        return (
          <LieuDungThuoc
            dichVuId={currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].THUOC_THEM]}
            roleEdit={[ROLES["DANH_MUC"].THUOC_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].THUOC_SUA])
                : !checkRole([ROLES["DANH_MUC"].THUOC_THEM])
            }
          />
        );
      },
    },
    {
      title: "Nhóm chi phí",
      key: 3,
      show: true,
      render: () => {
        return (
          <NhomChiPhi
            dichVuId={currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].THUOC_THEM]}
            roleEdit={[ROLES["DANH_MUC"].THUOC_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].THUOC_SUA])
                : !checkRole([ROLES["DANH_MUC"].THUOC_THEM])
            }
          />
        );
      },
    },
    {
      key: 4,
      title: `${t("danhMuc.mucDichSuDung")}(TT30)`,
      show: currentItem?.dichVu?.mucDichSuDung,
      render: () => {
        return (
          <MucDichSuDung dichVuId={currentItem?.id} currentItem={currentItem} />
        );
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
    setEditStatus(true);
    updateData({
      currentItem: { ...data },
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        setState({
          dataSelected: record,
        });
        onShowAndHandleUpdate(record);
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    updateData({
      currentItem: {},
    });
  };

  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
  const handleChangeshowTable = () => {
    setState({
      changeShowFullTbale: true,
      showFullTable: !state.showFullTable,
    });
    setTimeout(() => {
      setState({
        changeShowFullTbale: false,
      });
    }, 1000);
  };
  const setRowClassName = (record) => {
    let idDiff = state.dataSelected?.id;
    return record.id === idDiff ? "row-actived" : "";
  };
  return (
    <BaseDm3
      breadcrumb={[
        { title: "Danh mục", link: "/danh-muc" },
        {
          title: "Danh mục thuốc",
          link: "/danh-muc/thuoc",
        },
      ]}
    >
      <Col
        {...(!state.showFullTable
          ? collapseStatus
            ? TABLE_LAYOUT_COLLAPSE
            : TABLE_LAYOUT
          : null)}
        span={state.showFullTable ? 24 : null}
        className={`pr-3 ${state.changeShowFullTbale ? "" : "transition-ease"}`}
      >
        <TableWrapper
          title={TEN_LOAI_DICH_VU}
          scroll={{ x: 1000 }}
          classNameRow={"custom-header"}
          styleMain={{ marginTop: 0 }}
          styleContainerButtonHeader={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 35,
          }}
          onImport={onImport}
          onExport={() =>
            onExport({
              id: ID_LOAI_DICH_VU,
              ten: TEN_LOAI_DICH_VU,
            })
          }
          buttonHeader={
            checkRole([ROLES["DANH_MUC"].THUOC_THEM])
              ? [
                  {
                    title: "Thêm mới",
                    onClick: handleClickedBtnAdded,
                    buttonHeaderIcon: (
                      <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                    ),
                  },
                  {
                    className: `btn-change-full-table ${
                      state?.showFullTable ? "small" : "large"
                    }`,
                    title: (
                      <Icon
                        component={state.showFullTable ? thuNho : showFull}
                      />
                    ),
                    onClick: handleChangeshowTable,
                  },
                  {
                    className: "btn-collapse",
                    title: (
                      <Icon
                        component={collapseStatus ? extendTable : extendChiTiet}
                      />
                    ),
                    onClick: handleCollapsePane,
                  },
                ]
              : [
                  {
                    className: `btn-change-full-table ${
                      state?.showFullTable ? "small" : "large"
                    }`,
                    title: (
                      <Icon
                        component={state.showFullTable ? thuNho : showFull}
                      />
                    ),
                    onClick: handleChangeshowTable,
                  },
                  {
                    className: "btn-collapse",
                    title: (
                      <Icon
                        component={collapseStatus ? extendTable : extendChiTiet}
                      />
                    ),
                    onClick: handleCollapsePane,
                  },
                ]
          }
          columns={columns}
          dataSource={listData}
          onRow={onRow}
          rowClassName={setRowClassName}
        ></TableWrapper>
        {totalElements && (
          <Pagination
            listData={listData}
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            total={totalElements}
            onShowSizeChange={onHandleSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        )}
      </Col>
      {!state.showFullTable && (
        <Col
          {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
          className={`mt-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
          style={
            state.isSelected
              ? { border: "2px solid #c1d8fd", borderRadius: 20 }
              : {}
          }
        >
          <MultiLevelTab
            defaultActiveKey={1}
            listPanel={listPanel.filter((x) => x.show)}
            isBoxTabs={true}
          ></MultiLevelTab>
        </Col>
      )}
    </BaseDm3>
  );
};

export default DanhMucThuoc;
