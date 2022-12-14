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
  { id: null, ten: "T???t c???" },
  { id: true, ten: "B???t th?????ng" },
  { id: false, ten: "Kh??ng b???t th?????ng" },
];

export const FRAME_TITLE = ["Phi???u ch??? ?????nh", "????n thu???c", "V???t t??"];

export const LOAI_DICH_VU_CHI_DINH = [
  {
    ten: "Kh??m",
    id: 10,
  },
  {
    ten: "X??t nghi???m",
    id: 20,
  },
  {
    ten: "C???n l??m s??ng",
    id: 30,
  },
  {
    ten: "B??? ch??? ?????nh",
    id: 150,
  },
  {
    ten: "T???t c??? lo???i phi???u ch??? ?????nh",
    id: "",
  },
];

export const ALL_DON_THUOC = [
  {
    ten: "Thu???c nh?? thu???c",
    id: 10,
  },
  {
    ten: "Thu???c BHYT",
    id: 20,
  },
  {
    ten: "Thu???c t??? tr???c",
    id: 30,
  },
  {
    ten: "T???t c??? lo???i thu???c",
    id: "",
  },
];
