export const isNumber = (value) => {
  const regex = /^[0-9\b]+$/;
  return regex.test(value);
};

export const TRANG_THAI_HOAN = {
  10: [20, 30, 40, 50], //Kham
  30: [15, 25, 50, 35, 43], //CDHA
  20: [25, 38, 46, 62, 80, 50], //Xet Nghiem
};

// utils/enums?name=trangThaiDichVu
export const TRANG_THAI = {
  TIEP_NHAN: [25, 35, 43, 50],
  DA_TIEP_NHAN: [63],
  DA_CO_KET_QUA: [155],
  CHO_TIEP_NHAN: [25, 35, 43],
  YEU_CAU_HOAN: [25, 35, 43, 50],
};
export const TRANG_THAI_FILTER = [66, 90, 155, 160];

export const SERVICE_STATUS = {
  DA_LAY_MAU: 66,
  DA_TIEP_NHAN_MAU: 90,
};

export const dataInfoCommon = [
  {
    title: "common.thanhTien",
    dataIndex: "thanhTien",
    type: "price",
    className: "space-bottom",
  },
  {
    title: "xetNghiem.bsChiDinh",
    dataIndex: "tenBacSiChiDinh",
    className: "",
  },
  {
    title: "cdha.thoiGianChiDinh",
    dataIndex: "thoiGianChiDinh",
    type: "datetime",
    className: "",
  },
  {
    title: "xetNghiem.khoaChiDinh",
    dataIndex: "tenKhoaChiDinh",
    className: "space-bottom",
  },
  {
    title: "cdha.phongThucHien",
    dataIndex: "tenPhongThucHien",
    className: "",
  },
  {
    title: "cdha.thoiGianThucHien",
    dataIndex: "thoiGianThucHien",
    type: "datetimeEdit",
    className: "space-bottom",
  },
  {
    title: "cdha.thoiGianTiepNhan",
    dataIndex: "thoiGianTiepNhan",
    type: "datetimeEdit",
    className: "",
  },
  {
    title: "xetNghiem.nguoiTiepNhan",
    dataIndex: "nguoiTiepNhanId",
    type: "listNhanVien",
    className: "space-bottom space-top",
  },
  {
    title: "cdha.thoiGianCoKetQua",
    dataIndex: "thoiGianCoKetQua",
    type: "datetimeEdit",
    className: "",
  },
  {
    title: "cdha.bsDocKetQua",
    dataIndex: "tenNguoiDocKetQua",
    className: "space-bottom",
  },
  {
    title: "common.trangThai",
    dataIndex: "trangThai",
    type: "status",
    className: "space-bottom",
  },

  {
    title: "cdha.daGuiPacs",
    dataIndex: "guiPacs",
    type: "checkbox",
    className: "space-bottom",
  },
  {
    title: "cdha.mayThucHien",
    dataIndex: "maMayId",
    type: "listMaMay",
    className: "space-bottom",
  },
  {
    title: "cdha.nguoiThucHien",
    dataIndex: "nguoiThucHienId",
    type: "listNhanVien",
    className: "space-bottom",
  },
  {
    title: "cdha.dieuDuong",
    dataIndex: "dieuDuongId",
    type: "listNhanVien",
    className: "space-bottom",
  },
];

export const FORMAT_DATE = "HH:mm:ss DD/MM/YYYY";

export const LOAI_KET_QUA = {
  SO: 10,
  CHU: 20,
  CHON_GIA_TRI: 30,
};

export const BAT_THUONG = [
  { id: null, ten: "Tất cả" },
  { id: true, ten: "Bất thường" },
  { id: false, ten: "Không bất thường" },
];

export const FRAME_TITLE = ["Phiếu chỉ định", "Đơn thuốc", "Vật tư"];

export const LOAI_DICH_VU_CHI_DINH = [
  {
    ten: "Khám",
    id: 10,
  },
  {
    ten: "Xét nghiệm",
    id: 20,
  },
  {
    ten: "Cận lâm sàng",
    id: 30,
  },
  {
    ten: "Bộ chỉ định",
    id: 150,
  },
  {
    ten: "Tất cả loại phiếu chỉ định",
    id: "",
  },
];

export const ALL_DON_THUOC = [
  {
    ten: "Thuốc nhà thuốc",
    id: 10,
  },
  {
    ten: "Thuốc BHYT",
    id: 20,
  },
  {
    ten: "Thuốc tủ trực",
    id: 30,
  },
  {
    ten: "Tất cả loại thuốc",
    id: "",
  },
];
