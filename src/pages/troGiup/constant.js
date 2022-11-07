import { ROLES } from "constants/index";
export const listView = [
  {
    title: "Giới thiệu phần mềm",
    bg: require("assets/images/pagehome/bgTheoDoiDieuTri.png"),
    icon: require("assets/svg/troGiup/bgKhamBenh.svg"),
    link: "/kham-benh",
    accessRoles: [ROLES["HE_THONG"].GIOI_THIEU_PHAN_MEM],
    value: "TL01_GT",
  },
  {
    title: "Tiếp đón",
    bg: require("assets/images/pagehome/bgTiepDon.png"),
    icon: require("assets/svg/troGiup/bgTiepDon.svg"),
    link: "/tiep-don",
    accessRoles: [ROLES["HE_THONG"].TIEP_DON],
    value: "TL02_TIEPDON",
  },
  {
    title: "Khám bệnh",
    bg: require("assets/images/pagehome/bgTheoDoiDieuTri.png"),
    icon: require("assets/svg/troGiup/bgKhamBenh.svg"),
    link: "/kham-benh",
    accessRoles: [ROLES["HE_THONG"].KHAM_BENH],
    value: "TL03_KB",
  },
  {
    title: "Thu ngân",
    bg: require("assets/images/pagehome/bgThuNgan.png"),
    icon: require("assets/svg/troGiup/bgThuNgan.svg"),
    link: "/thu-ngan",
    accessRoles: [ROLES["HE_THONG"].THU_NGAN],
    value: "TL04_THUNGAN",
  },
  {
    title: "Xét nghiệm",
    bg: require("assets/images/pagehome/bgXetNghiem.png"),
    icon: require("assets/svg/troGiup/bgXetNghiem.svg"),
    link: "/xet-nghiem",
    accessRoles: [ROLES["HE_THONG"].XET_NGHIEM],
    value: "TL05_XN",
  },
  {
    title: "CĐHA - TDCN",
    bg: require("assets/images/pagehome/bgChanDoanHinhAnh.png"),
    icon: require("assets/svg/troGiup/bgChuanDoanHinhAnh.svg"),
    link: "/chan-doan-hinh-anh",
    accessRoles: [ROLES["HE_THONG"].CDHA_TDCN],
    value: "TL06_CDHA",
  },
  {
    title: "Nhà thuốc",
    bg: require("assets/images/pagehome/bgNhaThuoc.png"),
    icon: require("assets/svg/troGiup/bgNhaThuoc.svg"),
    link: "/nha-thuoc",
    accessRoles: [ROLES["HE_THONG"].NHA_THUOC],
    value: "TL07_NHATHUOC",
  },
  {
    title: "Kho",
    bg: require("assets/images/pagehome/bgKho.png"),
    icon: require("assets/svg/troGiup/bgKho.svg"),
    link: "/kho",
    accessRoles: [ROLES["HE_THONG"].KHO],
    value: "TL08_KHO",
  },
  {
    title: "Thiết lập",
    bg: require("assets/images/pagehome/bgThietLap.png"),
    icon: require("assets/svg/troGiup/bgThietLap.svg"),
    link: "/thiet-lap",
    accessRoles: [ROLES["HE_THONG"].THIET_LAP],
    value: "TL09_THIETLAP",
  },
  {
    title: "Danh mục",
    bg: require("assets/images/pagehome/bgDanhMuc.png"),
    icon: require("assets/svg/troGiup/bgDanhMuc.svg"),
    link: "/danh-muc",
    accessRoles: [ROLES["HE_THONG"].DANH_MUC],
    value: "TL10_DANHMUC",
  },
  {
    title: "Quản lý thông báo",
    bg: require("assets/images/pagehome/bgQuanLyThongBao.png"),
    icon: require("assets/svg/troGiup/bgThongBao.svg"),
    link: "/quan-ly-thong-bao",
    accessRoles: [ROLES["HE_THONG"].QUAN_LY_THONG_BAO],
    value: "TL11_QTLB",
  },
  {
    title: "Hồ sơ bệnh án",
    bg: require("assets/images/pagehome/bgHoSoBenhAn.png"),
    icon: require("assets/svg/troGiup/bgHoSoBenhAn.svg"),
    link: "/ho-so-benh-an",
    accessRoles: [ROLES["HE_THONG"].HO_SO_BENH_AN],
    value: "TL12_HSBA",
  },
  {
    title: "Ký số",
    bg: require("assets/images/pagehome/bgKySo.png"),
    icon: require("assets/svg/troGiup/bgKySo.svg"),
    link: "/ky-so",
    accessRoles: [ROLES["HE_THONG"].KY_SO],
    value: "TL13_KYSO",
  },
  {
    title: "Theo dõi điều trị",
    bg: require("assets/images/pagehome/bgTheoDoiDieuTri.png"),
    icon: require("assets/svg/troGiup/bgKhamBenh.svg"),
    link: "/theo-doi-nguoi-benh",
    accessRoles: [ROLES["HE_THONG"].THEO_DOI_DIEU_TRI],
    value: "TL14_TDDT",
  },
  {
    title: "Báo cáo",
    bg: require("assets/images/pagehome/bgBaoCao.png"),
    icon: require("assets/svg/troGiup/bgBaoCao.svg"),
    link: "/bao-cao",
    accessRoles: [ROLES["HE_THONG"].BAO_CAO],
    value: "TL15_BAOCAO",
  },
  {
    title: "Quản trị hệ thống",
    bg: require("assets/images/pagehome/bgQuanTriHeThong.png"),
    icon: require("assets/svg/troGiup/bgQuanTriHeThong.svg"),
    link: "/quan-tri",
    accessRoles: [ROLES["HE_THONG"].BAO_CAO],
    value: "TL16_QTHT",
  },
  {
    title: "Quyết toán BHYT",
    bg: require("assets/images/pagehome/bgBaoCao.png"),
    icon: require("assets/svg/troGiup/bgBaoCao.svg"),
    link: "/quyet-toan-bhyt",
    accessRoles: [ROLES["HE_THONG"].QUYET_TOAN_BHYT],
    value: "TL17_QTBHXH",
  },
  {
    title: "Hướng dẫn khác",
    bg: require("assets/images/pagehome/bgBaoCao.png"),
    icon: require("assets/svg/troGiup/bgBaoCao.svg"),
    link: "/",
    accessRoles: [],
    value: "TL18_KHAC",
  },
  {
    title: "Khám sức khỏe hợp đồng",
    bg: require("assets/images/pagehome/bgDanhMuc.png"),
    icon: require("assets/svg/troGiup/bgDanhMuc.svg"),
    link: "/",
    accessRoles: [],
    value: "TL19_KSK",
  },
  {
    title: "Quản lý nội trú",
    bg: require("assets/images/pagehome/bgDanhMuc.png"),
    icon: require("assets/svg/troGiup/bgDanhMuc.svg"),
    link: "/",
    accessRoles: [],
    value: "TL20_NOITRU",
  },
  {
    title: "Gói dịch vụ",
    bg: require("assets/images/pagehome/bgDanhMuc.png"),
    icon: require("assets/svg/troGiup/bgDanhMuc.svg"),
    link: "/",
    accessRoles: [],
    value: "TL21_GOIDICHVU",
  },
  {
    title: "Quản lý phẫu thuật thủ thuật",
    bg: require("assets/images/pagehome/bgDanhMuc.png"),
    icon: require("assets/svg/troGiup/bgDanhMuc.svg"),
    link: "/",
    accessRoles: [],
    value: "TL22_PTTT",
  },
  {
    title: "Sinh hiệu",
    bg: require("assets/images/pagehome/bgDanhMuc.png"),
    icon: require("assets/svg/troGiup/bgDanhMuc.svg"),
    link: "/",
    accessRoles: [],
    value: "TL23_SINHHIEU",
  },
  {
    title: "Giấy đẩy cổng",
    bg: require("assets/images/pagehome/bgDanhMuc.png"),
    icon: require("assets/svg/troGiup/bgDanhMuc.svg"),
    link: "/",
    accessRoles: [],
    value: "TL24_GIAYDAYCONG",
  },
  {
    title: "Xếp hàng chờ QMS",
    bg: require("assets/images/pagehome/bgDanhMuc.png"),
    icon: require("assets/svg/troGiup/bgDanhMuc.svg"),
    link: "/",
    accessRoles: [],
    value: "TL25_QMS",
  },
  {
    title: "Kiosk tiếp đón",
    bg: require("assets/images/pagehome/bgDanhMuc.png"),
    icon: require("assets/svg/troGiup/bgDanhMuc.svg"),
    link: "/",
    accessRoles: [],
    value: "TL26_KIOSK",
  },
];
