export const MAX_NUMBER_SICK = 20;

export const infoPatients = [
  {
    title: "Đợi khám",
    dataIndex: "doiKham",
    key: "doiKham",
    background: "#C1F3F7",
  },
  {
    title: "Đã khám",
    dataIndex: "daKham",
    key: "daKham",
    background: "#C1D8FD",
  },
  {
    title: "Đợi kết luận",
    dataIndex: "doiKetLuan",
    key: "doiKetLuan",
    background: "#D9C0F2",
  },
  {
    title: "Đã kết luận",
    dataIndex: "daKetLuan",
    key: "daKetLuan",
    background: "#C1F0DB",
  },
  {
    title: "Bỏ khám",
    dataIndex: "boKham",
    key: "boKham",
    background: "#FECECE",
  },
];

export const FRAME_TITLE = [
  "khamBenh.frameTitle.khamNoi",
  "khamBenh.frameTitle.phieuChiDinh",
  "khamBenh.frameTitle.kqXNCLS",
  "khamBenh.frameTitle.ketLuanKham",
  "khamBenh.frameTitle.donThuoc",
  "khamBenh.frameTitle.vatTu",
];

export const TRANG_THAI_KHAM_BN = [
  { id: 20, ten: "Chờ khám", i18n: "common.choKham" },
  { id: 60, ten: "Đang khám", i18n: "common.dangKham" },
  { id: 70, ten: "Đang thực hiện DV", i18n: "common.dangThucHienDv" },
  { id: 100, ten: "Chờ kết luận", i18n: "common.choKetLuan" },
  { id: 140, ten: "Đang kết luận", i18n: "common.dangKetLuan" },
  { id: 150, ten: "Đã kết luận", i18n: "common.daKetLuan" },
  { id: 50, ten: "Bỏ qua", i18n: "common.boQua" },
];

export const LOAI_DICH_VU = [
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
    ten: "Gói DV",
    id: 150,
  },
  {
    ten: "Tất cả",
    id: "",
  },
];

export const LOAI_DICH_VU_CHI_DINH = [
  {
    ten: "Tất cả loại phiếu chỉ định",
    i18n: "khamBenh.chiDinh.enum.tatCaGoiCD",
    id: "",
  },
  {
    ten: "Khám",
    i18n: "khamBenh.chiDinh.enum.kham",
    id: 10,
  },
  {
    ten: "Xét nghiệm",
    i18n: "khamBenh.chiDinh.enum.xetNghiem",
    id: 20,
  },
  {
    ten: "CĐHA-TDCN",
    i18n: "khamBenh.chiDinh.enum.cdhaTDCN",
    id: 30,
  },
  {
    ten: "Phẫu thuật - Thủ thuật",
    i18n: "khamBenh.chiDinh.enum.ptTt",
    id: 40,
  },
  {
    ten: "Ngoài điều trị",
    i18n: "khamBenh.chiDinh.enum.ngoaiDieuTri",
    id: 60,
  },
  {
    ten: "Bộ chỉ định",
    i18n: "khamBenh.chiDinh.enum.boChiDinh",
    id: 150,
  },
];

export const TITLE_KET_LUAN_KHAM = {
  10: { text: "", i18n: "" },
  20: {
    text: "GIẤY HẸN KHÁM LẠI",
    i18n: "khamBenh.ketLuanKham.giayHenKhamLai",
  },
  30: {
    text: "PHIẾU KHÁM BỆNH VÀO VIỆN",
    i18n: "khamBenh.ketLuanKham.phieuKhamBenhVaoVien",
  },
  40: {
    text: "GIẤY CHUYỂN TUYẾN KHÁM BỆNH, CHỮA BỆNH BHYT",
    i18n: "khamBenh.ketLuanKham.giayChuyenTuyen",
  },
  100: { text: "", i18n: "" },
};

export const DEFAULT_CHAN_DOAN_KSK = "Z00.0"; //Z00.0 - Khám sức khỏe tổng quát
