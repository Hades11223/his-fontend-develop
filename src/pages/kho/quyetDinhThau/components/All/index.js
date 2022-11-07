import React, { useEffect } from "react";
import { Checkbox, Input, DatePicker } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { ENUM, HIEU_LUC } from "constants/index";
import { useSelector, useDispatch } from "react-redux";
import SelectLoadMore from "components/SelectLoadMore";
import dichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider";
import { useEnum } from "hook";

const dateFormat = "DD-MM-YYYY";
let timer = null;

const DanhSach = ({ ...props }) => {
  const {
    listQuyetDinhThauChiTiet,
    totalElements,
    page,
    size,
    dataSortColumn,
  } = useSelector((state) => state.quyetDinhThauChiTiet);
  const { listAllQuyetDinhThau } = useSelector((state) => state.quyetDinhThau);
  const { listAllNhaSanXuat, listAllNhaCungCap } = useSelector(
    (state) => state.doiTac
  );
  const { listXuatXu } = useSelector((state) => state.xuatXu);
  const { listAllDichVuKho } = useSelector((state) => state.dichVuKho);
  const { listAllKhoa } = useSelector((state) => state.khoa);
  const { listAllDuongDung } = useSelector((state) => state.duongDung);
  const { listAllHoatChat } = useSelector((state) => state.hoatChat);
  const { listAllDonViTinh } = useSelector((state) => state.donViTinh);
  const { listAllNguonNhapKho } = useSelector((state) => state.nguonNhapKho);
  const { listDataTongHop } = useSelector((state) => state.nhomChiPhi);

  const { onSearch, onSortChange, onSizeChange, onChangeInputSearch } =
    useDispatch().quyetDinhThauChiTiet;


  const { listloaiThau } = useEnum(ENUM.LOAI_THAU);
  const { listnhomThau } = useEnum(ENUM.NHOM_THAU);
  const { listloaiDichVuThuocVatTuHoaChat } = useEnum(
    ENUM.LOAI_DICH_VU_THUOC_VAT_TU_HOA_CHAT
  );
  const { listgoiThau } = useEnum(ENUM.GOI_THAU);
  const { listtrangThaiThau } = useEnum(ENUM.TRANG_THAI_THAU);
  const { listloaiThuocThau } = useEnum(ENUM.LOAI_THUOC_THAU);
  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };
  useEffect(() => {
    onSortChange({ ["dichVu.dichVu.ten"]: 1 });
  }, []);
  
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 300);
  };
  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "index",
      key: "index",
      align: "center",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Quyết định thầu"
          sort_key="quyetDinhThauId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.quyetDinhThauId || 0}
          searchSelect={
            <Select
              placeholder="Tìm quyết định thầu"
              data={listAllQuyetDinhThau || []}
              onChange={onSearchInput("quyetDinhThauId")}
              ten={"quyetDinhThau"}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
      fixed: "left",
      render: (item) => {
        return item && item?.quyetDinhThau;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Dịch vụ"
          sort_key="dichVuId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dichVuId || 0}
          searchSelect={
            <SelectLoadMore
              api={dichVuKhoProvider.searchAll}
              mapData={(i) => ({
                value: i.id,
                label: i.ten,
              })}
              keySearch={"ten"}
              placeholder="Tìm dịch vụ"
              data={listAllDichVuKho}
              onChange={onSearchInput("dichVuId")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dichVu",
      key: "dichVu",
      fixed: "left",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL thầu"
          sort_key="soLuongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongThau || 0}
          search={
            <Input
              placeholder="Tìm số lượng thầu"
              onChange={onSearchInput("soLuongThau")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "soLuongThau",
      key: "soLuongThau",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL được phép mua"
          sort_key="soLuongDuocPhepMua"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongDuocPhepMua || 0}
          search={
            <Input
              placeholder="Tìm SL được phép mua"
              onChange={onSearchInput("soLuongDuocPhepMua")}
            />
          }
        />
      ),
      width: 120,
      align: "right",
      dataIndex: "soLuongDuocPhepMua",
      key: "soLuongDuocPhepMua",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Giá nhập sau VAT"
          sort_key="giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaNhapSauVat || 0}
          search={
            <Input
              placeholder="Tìm loại dịch vụ"
              onChange={onSearchInput("giaNhapSauVat")}
            />
          }
        />
      ),
      width: 120,
      align: "right",
      dataIndex: "giaNhapSauVat",
      key: "giaNhapSauVat",
      render: (item) => {
        return item && item.formatPrice();
      },
    },

    {
      title: (
        <HeaderSearch
          title="Đơn giá BH"
          sort_key="giaBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaBaoHiem || 0}
          search={
            <Input
              placeholder="Tìm đơn giá BH"
              onChange={onSearchInput("giaBaoHiem")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Phụ thu"
          sort_key="giaPhuThu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaPhuThu || 0}
          search={
            <Input
              placeholder="Tìm đơn giá phụ thu"
              onChange={onSearchInput("giaBaoHiem")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Quy cách"
          sort_key="quyCach"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.quyCach || 0}
          search={
            <Input
              placeholder="Tìm quy cách"
              onChange={onSearchInput("quyCach")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyCach",
      key: "quyCach",
    },
    {
      title: (
        <HeaderSearch
          title="Nhà cung cấp"
          sort_key="nhaCungCapId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhaCungCapId || 0}
          searchSelect={
            <Select
              placeholder="Tìm nhà cung cấp"
              data={listAllNhaCungCap}
              onChange={onSearchInput("nhaCungCapId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaCungCapId",
      key: "nhaCungCapId",
      render: (item) => {
        return (
          listAllNhaCungCap &&
          (listAllNhaCungCap.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã gói thầu"
          sort_key="goiThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.goiThau || 0}
          searchSelect={
            <Select
              placeholder="Tìm mã gói thầu"
              data={listgoiThau}
              onChange={onSearchInput("goiThau")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "goiThau",
      key: "goiThau",
      render: (item) => {
        return (
          listgoiThau && (listgoiThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số visa"
          sort_key="soVisa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soVisa || 0}
          search={
            <Input
              placeholder="Tìm số visa"
              onChange={onSearchInput("nhaCungCapId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soVisa",
      key: "soVisa",
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm thầu"
          sort_key="nhomThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhomThau || 0}
          searchSelect={
            <Select
              placeholder="Tìm nhóm thầu"
              data={listnhomThau}
              onChange={onSearchInput("nhaCungCapId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhomThau",
      key: "nhomThau",
      render: (item) => {
        return (
          listnhomThau && (listnhomThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm chi phí"
          sort_key="nhomChiPhiId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhomChiPhiId || 0}
          searchSelect={
            <Select
              placeholder="Tìm nhóm thầu"
              data={listDataTongHop}
              onChange={onSearchInput("nhomChiPhiBh")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhomChiPhiId",
      key: "nhomChiPhiId",
      render: (item) => {
        return (
          listDataTongHop &&
          (listDataTongHop.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tỷ lệ thanh toán BH"
          sort_key="tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tyLeBhTt || 0}
          search={
            <Input
              placeholder="Tìm tỷ lệ TTBH"
              onChange={onSearchInput("tyLeBhTt")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "tyLeBhTt",
      key: "tyLeBhTt",
    },
    {
      title: (
        <HeaderSearch
          title="Ngưỡng thầu"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nguongThau || 0}
          search={
            <Input
              placeholder="Tìm ngưỡng thầu"
              onChange={onSearchInput("nguongThau")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "nguongThau",
      key: "nguongThau",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại thuốc"
          sort_key="loaiThuoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiThuoc || 0}
          searchSelect={
            <Select
              placeholder="Tìm loại thuốc"
              data={listloaiThuocThau}
              onChange={onSearchInput("loaiThuoc")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiThuoc",
      key: "loaiThuoc",
      render: (item) => {
        return (
          listloaiThuocThau &&
          (listloaiThuocThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nước sản xuất"
          sort_key="xuatXu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["xuatXu.ten"] || 0}
          searchSelect={
            <Select
              placeholder="Tìm nhà sản xuất"
              data={listXuatXu}
              onChange={onSearchInput("xuatXuId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "xuatXu",
      key: "xuatXu",
      render: (item) => {
        return (item && item?.ten) || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhà sản xuất"
          sort_key="nhaSanXuatId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhaSanXuatId || 0}
          searchSelect={
            <Select
              placeholder="Tìm nhà sản xuất"
              data={listAllNhaSanXuat}
              onChange={onSearchInput("loaiThuoc")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaSanXuatId",
      key: "nhaSanXuatId",
      render: (item) => {
        return (
          listAllNhaSanXuat &&
          (listAllNhaSanXuat.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trần bảo hiểm"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tranBh || 0}
          search={
            <Input
              placeholder="Tìm trần bảo hiểm"
              onChange={onSearchInput("tranBh")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "tranBh",
      key: "tranBh",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Giá trần"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaTran || 0}
          search={
            <Input
              placeholder="Tìm ngưỡng thầu"
              onChange={onSearchInput("tranBh")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "giaTran",
      key: "giaTran",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đường dùng"
          sort_key="duongDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.duongDung || 0}
          searchSelect={
            <Select
              placeholder="Tìm đường dùng"
              data={listAllDuongDung}
              onChange={onSearchInput("duongDung")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVuId",
      key: "duongDung",
      render: (item) => {
        "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã đường dùng"
          sort_key="maDuongDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maDuongDung || 0}
          searchSelect={
            <Select
              placeholder="Tìm đường dùng"
              data={listAllDuongDung}
              onChange={onSearchInput("tranBh")}
              ten="ma"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "maDuongDung",
      key: "maDuongDung",
    },
    {
      title: (
        <HeaderSearch
          title="Mã hoạt chất"
          sort_key="maHoatChat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maHoatChat || 0}
          searchSelect={
            <Select
              placeholder="Tìm mã hoạt chất"
              data={listAllHoatChat}
              onChange={onSearchInput("maHoatChat")}
              ten="ma"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "hoatChatId",
      key: "maHoatChat",
      render: (item) => {
        return (
          listAllHoatChat &&
          (listAllHoatChat.find((e) => e.id === item) || [])?.ma
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Hàm lượng"
          sort_key="hamLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.hamLuong || 0}
          search={
            <Input
              placeholder="Tìm hàm lượng"
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "hamLuong",
      key: "hamLuong",
    },
    {
      title: (
        <HeaderSearch
          title="Mã DV"
          sort_key="maDV"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maDV || 0}
          searchSelect={
            <Select
              placeholder="Tìm mã DV"
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "maDV",
      render: (item) => {
        return item && item.ma;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Năm"
          sort_key="quyetDinhThau.nam"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyetDinhThau.nam"] || 0}
          search={
            <Input
              placeholder="Tìm năm"
              onChange={onSearchInput("quyetDinhThau.nam")}
            />
          }
        />
      ),
      width: 150,
      align: "center",
      dataIndex: "quyetDinhThau",
      key: "nam",
      render: (item) => {
        return item && item?.nam;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn vị tính"
          sort_key="donViTinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.donViTinh || 0}
          searchSelect={
            <Select
              placeholder="Tìm đơn vị tính"
              data={listAllDonViTinh}
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "donViTinh",
      key: "donViTinh",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL đã nhập"
          sort_key="soLuongDaNhap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongDaNhap || 0}
          search={
            <Input
              placeholder="Tìm SL đã nhập"
              onChange={onSearchInput("soLuongDaNhap")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soLuongDaNhap",
      key: "soLuongDaNhap",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL trả lại"
          sort_key="soLuongDaTra"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongDaTra || 0}
          search={
            <Input
              placeholder="Tìm SL đã trả"
              onChange={onSearchInput("soLuongDaTra")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soLuongDaTra",
      key: "soLuongDaTra",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL còn lại"
          sort_key="soLuongConLai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongConLai || 0}
          search={
            <Input
              placeholder="Tìm SL còn lại"
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "soLuongConLai",
      key: "soLuongConLai",
    },
    {
      title: (
        <HeaderSearch
          title="SL có thể nhập"
          sort_key="soLuongCoTheNhap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongCoTheNhap || 0}
          search={
            <Input
              placeholder="Tìm SL có thể nhập"
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "soLuongCoTheNhap",
      key: "soLuongCoTheNhap",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Gói thầu"
          sort_key="goiThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.goiThau || 0}
          search={
            <Input
              placeholder="Tìm gói thầu"
              onChange={onSearchInput("goiThau")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThau",
      key: "goiThau",
      render: (item) => {
        return item && item?.goiThau;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại DV"
          sort_key="loaiDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiDichVu || 0}
          searchSelect={
            <Select
              placeholder="Tìm loại dịch vụ"
              data={listloaiDichVuThuocVatTuHoaChat}
              onChange={onSearchInput("loaiDichVu")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "loaiDichVu",
      render: (item) => {
        return (
          item &&
          listloaiDichVuThuocVatTuHoaChat &&
          (
            listloaiDichVuThuocVatTuHoaChat.find(
              (e) => e.id === item.loaiDichVu
            ) || []
          )?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nguồn nhập kho"
          sort_key="nguonNhapKhoId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nguonNhapKhoId || 0}
          searchSelect={
            <Select
              placeholder="Tìm nguồn nhập kho"
              data={listAllNguonNhapKho}
              onChange={onSearchInput("nguonNhapKhoId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThauId",
      key: "nguonNhapKho",
      render: (item) => {
        return (listAllQuyetDinhThau?.find((e) => e.id === item) || [])
          ?.nguonNhapKho?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại thầu"
          sort_key="loaiThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiThau || 0}
          searchSelect={
            <Select
              placeholder="Tìm loại thầu"
              data={listloaiThau}
              onChange={onSearchInput("loaiThau")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThauId",
      key: "loaiThau",
      render: (item) => {
        const res = (listAllQuyetDinhThau?.find((e) => e.id === item) || [])
          ?.loaiThau;
        return (
          res &&
          listloaiThau &&
          (listloaiThau?.find((e) => e.id === res) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngày công bố"
          sort_key="ngayCongBo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ngayCongBo || 0}
          searchSelect={
            <DatePicker
              format={dateFormat}
              placeholder="Tìm ngày công bố"
              onChange={onSearchInput("ngayCongBo")}
            />
          }
        />
      ),
      width: 120,
      align: "center",
      dataIndex: "quyetDinhThauId",
      key: "ngayCongBo",
      render: (item) => {
        return (listAllQuyetDinhThau?.find((e) => e.id === item) || [])
          ?.ngayCongBo;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Hiệu lực thầu"
          sort_key="ngayHieuLuc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ngayHieuLuc || 0}
          searchSelect={
            <DatePicker
              placeholder="Tìm hiệu lực thầu"
              onChange={onSearchInput("ngayHieuLuc")}
            />
          }
        />
      ),
      width: 120,
      align: "center",
      dataIndex: "quyetDinhThauId",
      key: "ngayHieuLuc",
      render: (item) => {
        return (listAllQuyetDinhThau?.find((e) => e.id === item) || [])
          ?.ngayHieuLuc;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          sort_key="khoaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaId || 0}
          searchSelect={
            <Select
              placeholder="Tìm khoa"
              data={listAllKhoa}
              onChange={onSearchInput("khoaId")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "quyetDinhThauId",
      key: "khoa",
      render: (item) => {
        const res = (listAllQuyetDinhThau?.find((e) => e.id === item) || [])
          ?.khoaId;
        return (
          res &&
          listAllKhoa &&
          (listAllKhoa?.find((e) => e.id === res) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.trangThai || 0}
          searchSelect={
            <Select
              placeholder="Tìm trạng thái"
              data={listtrangThaiThau}
              onChange={onSearchInput("trangThai")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThauId",
      key: "trangThai",
      render: (item) => {
        const res = (listAllQuyetDinhThau?.find((e) => e.id === item) || [])
          ?.trangThai;
        return (
          res &&
          listtrangThaiThau &&
          (listtrangThaiThau?.find((e) => e.id === res) || [])?.ten
        );
      },
    },

    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              defaultValue=""
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];
  return (
    <div>
      <TableWrapper
        columns={columnsGroup}
        dataSource={listQuyetDinhThauChiTiet}
        rowKey={(record) => record.id}
      />
      {!!totalElements ? (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listQuyetDinhThauChiTiet}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      ) : null}
    </div>
  );
};

export default DanhSach;
