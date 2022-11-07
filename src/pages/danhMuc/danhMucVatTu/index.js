import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "components/TableWrapper";
import FormServiceInfo from "./components/FormServiceInfo";
import NhomChiPhi from "components/DanhMuc/NhomChiPhi";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import MultiLevelTab from "components/MultiLevelTab";
import BaseDm3 from "../BaseDm3";
import { ENUM, LOAI_DICH_VU } from "constants/index";
import {
  PAGE_DEFAULT,
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  KHONG_TINH_TIEN,
} from "constants/index";
import Checkbox from "components/Checkbox";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import { Col, Input } from "antd";
import { formatNumber } from "utils";
import IcCreate from "assets/images/kho/IcCreate.png";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
import { Main } from "./styled";
import { InputTimeout } from "components";
import { useEnum } from "hook";
import { useTranslation } from "react-i18next";

let timer = null;
const ID_LOAI_DICH_VU = 100;
const TEN_LOAI_DICH_VU = "Danh mục vật tư";

const DanhMucVatTu = (props) => {
  const { t } = useTranslation();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  useEffect(() => {
    onSizeChange({ size: 10 });
    getAllServices();
  }, []);
  const {
    danhMucVatTu: {
      onSearch,
      onSizeChange,
      onSortChange,
      onChangeInputSearch,
      updateData,
      getListVatTuBo,
    },
    kichCo: { _getList: getKichCo },
    nhomDichVuKho: { getListMeGrLv1TongHop: searchNhomVatTu },
    donViTinh: { getListAllDonViTinh },
    xuatXu: { getListAllXuatXu },
    utils: { getUtils },
    doiTac: { getListAllNhaSanXuat, getListAllNhaCungCap },
    nhomDichVuCap1: { searchTongHopDichVuCap1 },
    nhomDichVuCap2: { searchTongHopDichVuCap2 },
    nhomDichVuCap3: { searchTongHopDichVuCap3 },
    dichVuKho: { onExport, onImport },
  } = useDispatch();
  const {
    danhMucVatTu: {
      listData,
      totalElements,
      page,
      size,
      currentItem,
      dataSortColumn,
    },
    nhomDichVuKho: { listMeGrLv1: listNhomVatTu = [] },
    donViTinh: { listAllDonViTinh },
    xuatXu: { listAllXuatXu = [] },
    utils: { listnhomChiPhiBh = [], listNguonKhacChiTra = [] },
    nhomDichVuCap1: { listGroupService1: listNhomDvCap1 = [] },
    nhomDichVuCap2: { listGroupService2: listNhomDvCap2 = [] },
    nhomDichVuCap3: { listGroupService3: listNhomDvCap3 = [] },
    doiTac: { listAllNhaSanXuat, listAllNhaCungCap },
  } = useSelector((state) => state);

  const [listDsMucDichSuDung] = useEnum(ENUM.MUC_DICH_SU_DUNG);

  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const getAllServices = () => {
    const params = { page: 0, size: 10000, active: true, sort: "ten,asc" };
    searchNhomVatTu({ ...params, loaiDichVu: LOAI_DICH_VU.VAT_TU });
    searchTongHopDichVuCap1({ ...params, loaiDichVu: LOAI_DICH_VU.VAT_TU });
    searchTongHopDichVuCap2({ ...params, loaiDichVu: LOAI_DICH_VU.VAT_TU });
    searchTongHopDichVuCap3({ ...params, loaiDichVu: LOAI_DICH_VU.VAT_TU });
    getListAllDonViTinh({ ...params, loaiDichVu: ID_LOAI_DICH_VU });
    getListAllDonViTinh({ ...params, loaiDichVu: ID_LOAI_DICH_VU });
    getListAllXuatXu(params);
    getUtils({ page: PAGE_DEFAULT, name: "nhomChiPhiBh", sort: "name, asc" });
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
    getUtils({
      page: PAGE_DEFAULT,
      name: "NguonKhacChiTra",
      sort: "name,asc",
    });
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) {
        value = e.target.checked;
      } else {
        value = e.target.value;
      }
    } else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 500);
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "80px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã vật tư"
          sort_key="dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã vật tư"
              onChange={onSearchInput("dichVu.ma")}
            />
          }
        />
      ),
      width: "130px",
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item.ma;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên vật tư"
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên vật tư"
              onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: "180px",
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm vật tư"
          sort_key="nhomDvKhoCap1"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhomDvKhoCap1.ten"] || 0}
          searchSelect={
            <Select
              data={listNhomVatTu}
              placeholder="Chọn nhóm vật tư"
              onChange={onSearchInput("nhomDvKhoCap1Id")}
            />
          }
        />
      ),
      width: "160px",
      dataIndex: "nhomDvKhoCap1",
      key: "nhomDvKhoCap1",
      render: (item) => item?.ten,
    },
    {
      title: (
        <HeaderSearch
          sort_key="maKyHieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maKyHieu || 0}
          search={
            <Input
              placeholder="Nhập mã ký hiệu"
              onChange={onSearchInput("maTt37")}
            />
          }
          title="Mã ký hiệu"
        />
      ),
      width: "130px",
      dataIndex: "maKyHieu",
      key: "maKyHieu",
    },
    {
      title: (
        <HeaderSearch
          sort_key="dvtSoCap.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dvtSoCap.ten"] || 0}
          searchSelect={
            <Select
              data={listAllDonViTinh}
              placeholder="Chọn đơn vị sơ cấp"
              onChange={onSearchInput("dvtSoCapId")}
            />
          }
          title="Đơn vị sơ cấp"
        />
      ),
      width: "150px",
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
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.donViTinh.ten"] || 0}
          searchSelect={
            <Select
              data={listAllDonViTinh}
              placeholder="Chọn đơn vị thứ cấp"
              onChange={onSearchInput("dichVu.donViTinh.ten")}
            />
          }
          title="Đơn vị thứ cấp"
        />
      ),
      width: "150px",
      dataIndex: "dichVu",
      key: "dichVu",
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
              placeholder="Nhập hệ số định mức"
              onChange={onSearchInput("heSoDinhMuc")}
            />
          }
          title="Hệ số định mức"
        />
      ),
      width: "150px",
      dataIndex: "heSoDinhMuc",
      key: "heSoDinhMuc",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          sort_key="thongSoKyThuat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thongSoKyThuat || 0}
          search={
            <Input
              placeholder="Nhập thông số kỹ thuật"
              onChange={onSearchInput("thongSoKyThuat")}
            />
          }
          title="Thông số kỹ thuật"
        />
      ),
      width: "160px",
      dataIndex: "thongSoKyThuat",
      key: "thongSoKyThuat",
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
              placeholder="Nhập quy cách"
              onChange={onSearchInput("quyCach")}
            />
          }
          title="Quy cách"
        />
      ),
      width: "100px",
      dataIndex: "quyCach",
      key: "quyCach",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          sort_key="xuatXu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["xuatXu.ten"] || 0}
          searchSelect={
            <Select
              data={listAllXuatXu}
              placeholder="Chọn nước sản xuất"
              onChange={onSearchInput("xuatXuId")}
            />
          }
          title="Nước sản xuất"
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
              placeholder="Chọn nước sản xuất"
              onChange={onSearchInput("nhaSanXuatId")}
            />
          }
          title="Nhà sản xuất"
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
              placeholder="Chọn nhà cung cấp"
              onChange={onSearchInput("nhaCungCapId")}
            />
          }
          title="Nhà cung cấp"
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
              placeholder="Tìm giá nhập"
              onChange={onSearchInput("giaNhapSauVat")}
            />
          }
          title="Giá nhập"
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
          sort_key="dichVu.giaKhongBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.giaKhongBaoHiem"] || 0}
          search={
            <InputTimeout
              type="number"
              formatPrice={true}
              placeholder="Tìm giá"
              onChange={onSearchInput("dichVu.giaKhongBaoHiem")}
            />
          }
          title="Giá không bảo hiểm"
        />
      ),
      width: 130,
      dataIndex: "dichVu",
      key: "giaKhongBaoHiem",
      align: "right",
      render: (field, _, __) =>
        field?.giaKhongBaoHiem ? field?.giaKhongBaoHiem.formatPrice() : "",
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.giaPhuThu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.giaPhuThu"] || 0}
          search={
            <InputTimeout
              type="number"
              formatPrice={true}
              placeholder="Tìm giá"
              onChange={onSearchInput("dichVu.giaPhuThu")}
            />
          }
          title="Giá phụ thu"
        />
      ),
      width: 130,
      dataIndex: "dichVu",
      key: "giaPhuThu",
      align: "right",
      render: (field, _, __) =>
        field?.giaPhuThu ? field?.giaPhuThu.formatPrice() : "",
    },
    // {
    //   title: (
    //     <HeaderSearch
    //       sort_key="giaTran"
    //       onClickSort={onClickSort}
    //       dataSort={dataSortColumn.giaTran || 0}
    //       search={
    //         <Input
    //           placeholder="Tìm giá trần"
    //           onChange={onSearchInput("giaTran")}
    //         />
    //       }
    //       title="Giá trần"
    //     />
    //   ),
    //   width: 130,
    //   dataIndex: "giaTran",
    //   key: "giaTran",
    //   align: "right",
    //   render: (field, _, __) => (field && formatNumber(field)) || "",
    // },
    {
      title: (
        <HeaderSearch
          sort_key="tranBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tranBaoHiem || 0}
          search={
            <Input
              placeholder="Tìm giá trần BH"
              onChange={onSearchInput("tranBaoHiem")}
            />
          }
          title="Trần bảo hiểm"
        />
      ),
      width: 130,
      dataIndex: "tranBaoHiem",
      key: "tranBaoHiem",
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
              placeholder="Tìm tỷ lệ BHTT"
              onChange={onSearchInput("dichVu.tyLeBhTt")}
            />
          }
          title="Tỷ lệ BH thanh toán"
        />
      ),
      width: 150,
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
          sort_key="dichVu.tyLeTtDv"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tyLeTtDv"] || 0}
          search={
            <Input
              placeholder="Tìm tỷ lệ TTDV"
              onChange={onSearchInput("dichVu.tyLeTtDv")}
            />
          }
          title="Tỷ lệ thanh toán DV"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      align: "right",
      render: (item) => {
        return item?.tyLeTtDv;
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
              placeholder="Chọn nhóm chi phí"
              onChange={onSearchInput("dichVu.nhomChiPhiBh")}
            />
          }
          title="Nhóm chi phí"
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
              placeholder="Chọn nhóm DV cấp 1"
              onChange={onSearchInput("dichVu.nhomDichVuCap1Id")}
            />
          }
          title="Nhóm DV cấp 1"
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
          sort_key="dichVu.nhomDichVuCap2.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap2.ten"] || 0}
          searchSelect={
            <Select
              data={listNhomDvCap2}
              placeholder="Chọn DV cấp 2"
              onChange={onSearchInput("dichVu.nhomDichVuCap2Id")}
            />
          }
          title="Nhóm DV cấp 2"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item?.nhomDichVuCap2?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.nhomDichVuCap3.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap3.ten"] || 0}
          searchSelect={
            <Select
              data={listNhomDvCap3}
              placeholder="Chọn DV cấp 3"
              onChange={onSearchInput("dichVu.nhomDichVuCap3Id")}
            />
          }
          title="Nhóm DV cấp 3"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item?.nhomDichVuCap3?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.maTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.maTuongDuong"] || 0}
          search={
            <Input
              placeholder="Tìm mã tương đương"
              onChange={onSearchInput("dichVu.maTuongDuong")}
            />
          }
          title="Mã tương đương"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item.maTuongDuong;
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
              placeholder="Tìm tên tương đương"
              onChange={onSearchInput("dichVu.tenTuongDuong")}
            />
          }
          title="Tên tương đương"
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
          sort_key="vatTuBo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.vatTuBo || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn vật tư bộ"
              onChange={onSearchInput("vatTuBo")}
            />
          }
          title="Vật tư bộ"
        />
      ),
      width: "130px",
      dataIndex: "vatTuBo",
      key: "vatTuBo",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="vatTuKichCo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["vatTuKichCo"] || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn vật tư bộ"
              onChange={onSearchInput("vatTuKichCo")}
            />
          }
          title="Vật tư theo kích cỡ"
        />
      ),
      width: "160px",
      dataIndex: "vatTuKichCo",
      key: "vatTuKichCo",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="kyThuatCao"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["kyThuatCao"] || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn kỹ thuật cao"
              onChange={onSearchInput("kyThuatCao")}
            />
          }
          title="Kỹ thuật cao"
        />
      ),
      width: "130px",
      dataIndex: "kyThuatCao",
      key: "kyThuatCao",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          // sort_key="dichVu.khongTinhTien"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn["dichVu.khongTinhTien"] || 0}
          searchSelect={
            <Select
              data={listNguonKhacChiTra}
              placeholder="Tìm nguồn chi trả khác"
              mode="multiple"
              onChange={onSearchInput("dsNguonKhacChiTra")}
            />
          }
          title="Nguồn khác chi trả"
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
          sort_key="dichVu.khongTinhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.khongTinhTien"] || 0}
          searchSelect={
            <Select
              data={KHONG_TINH_TIEN}
              placeholder="Chọn tính tiền"
              onChange={onSearchInput("dichVu.khongTinhTien")}
            />
          }
          title="Không tính tiền"
        />
      ),
      width: 160,
      dataIndex: "dichVu",
      key: "dichVu",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item?.khongTinhTien} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="vatTuTaiSuDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["vatTuTaiSuDung"] || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("vatTuTaiSuDung")}
            />
          }
          title="Vật tư tái sử dụng"
        />
      ),
      width: "130px",
      dataIndex: "vatTuTaiSuDung",
      key: "vatTuTaiSuDung",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
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
              placeholder="Nhập quyết định thầu"
              onChange={onSearchInput("quyetDinhThau")}
            />
          }
          title="Quyết định thầu"
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
          //     placeholder="Chọn mục đích sử dụng"
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
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["active"] || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn tính tiền"
              onChange={onSearchInput("active")}
            />
          }
          title="Có hiệu lực"
        />
      ),
      width: "130px",
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
      title: "Thông tin vật tư",
      key: 1,
      render: () => {
        return (
          <FormServiceInfo
            listNhomVatTu={listNhomVatTu}
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
            roleSave={[ROLES["DANH_MUC"].VAT_TU_THEM]}
            roleEdit={[ROLES["DANH_MUC"].VAT_TU_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].VAT_TU_SUA])
                : !checkRole([ROLES["DANH_MUC"].VAT_TU_THEM])
            }
            currentItemRowParent={currentItem}
            hiddenField={["giaTran"]}
            optionalField={["nhomDichVuCap2Id"]}
          />
        );
      },
    },
    {
      title: "Nhóm chi phí",
      key: 2,
      render: () => <NhomChiPhi dichVuId={currentItem?.id} />,
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
    getKichCo({ dichVuId: data?.id, size: 99 });
    getListVatTuBo({
      vatTuBoId: data.id,
      "dichVu.loaiDichVu": LOAI_DICH_VU.VAT_TU,
    });
    updateData({
      currentItem: data,
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
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

  return (
    <Main>
      <BaseDm3
        breadcrumb={[
          { title: "Danh mục", link: "/danh-muc" },
          {
            title: "Danh mục vật tư",
            link: "/danh-muc/vat-tu",
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
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <TableWrapper
            title={TEN_LOAI_DICH_VU}
            scroll={{ x: 1000 }}
            styleMain={{ marginTop: 0 }}
            classNameRow={"custom-header"}
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
              checkRole([ROLES["DANH_MUC"].VAT_TU_THEM])
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
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
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
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
            }
            columns={columns}
            dataSource={listData}
            onRow={onRow}
          ></TableWrapper>
          {totalElements ? (
            <Pagination
              listData={listData || []}
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              onShowSizeChange={onHandleSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          ) : null}
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
              listPanel={listPanel}
              isBoxTabs={true}
            ></MultiLevelTab>
          </Col>
        )}
      </BaseDm3>
    </Main>
  );
};

export default DanhMucVatTu;
