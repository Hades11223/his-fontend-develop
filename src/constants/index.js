export const PAGE_SIZE = 10;
export const PAGE_DEFAULT = 0;
export const SIZE_DEFAULT = 10;
export const PAGE_SIZE_LOAD_MORE = 10;
export const MAX_MONTH_AGE = 36;
export const LENGTH_ZERO_PREFIX = 4;
export const FORMAT_DATE = "DD/MM/YYYY";
export const BIRTHDAY_FORMAT = "DD/MM/YYYY";
export const TABLE_LAYOUT = { xl: 14, xxl: 14 };
export const DICH_VU_CO_KET_QUA_LAU = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có",
  },
  {
    id: "false",
    ten: "Không",
  },
];
export const ADD_LAYOUT = { xl: 10, xxl: 10 };
export const TABLE_LAYOUT_COLLAPSE = { xl: 8, xxl: 8 };
export const ADD_LAYOUT_COLLAPSE = { xl: 16, xxl: 16 };
export const HIEU_LUC = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có hiệu lực",
  },
  {
    id: "false",
    ten: "Không hiệu lực",
  },
];
export const HAN_CHE_KHOA = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có hạn chế",
  },
  {
    id: "false",
    ten: "Không hạn chế",
  },
];

export const KHONG_TINH_TIEN = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "false",
    ten: "Có tính tiền",
  },
  {
    id: "true",
    ten: "Không tính tiền",
  },
];

export const CHI_PHI_VAN_CHUYEN = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có",
  },
  {
    id: "false",
    ten: "Không",
  },
];
export const NCC_KHAC = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có",
  },
  {
    id: "false",
    ten: "Không",
  },
];

export const TRANG_THAI_LAY_MAU_BN = [
  { label: "Chờ tiếp nhận", value: 25, i18n: "xetNghiem.choTiepNhan" },
  { label: "Chờ lấy mẫu", value: [46, 38, 62], i18n: "xetNghiem.choLayMau" },
  { label: "Bỏ qua", value: 50, i18n: "common.boQua" },
  { label: "Hủy mẫu", value: 80, i18n: "xetNghiem.huyMau" },
];
export const TRANG_THAI_HHSH_GPB = [
  { label: "Đã lấy mẫu", value: 66, i18n: "xetNghiem.daLayMau" },
  { label: "Đã tiếp nhận mẫu", value: 90, i18n: "xetNghiem.daTiepNhanMau" },
  { label: "Đã có KQ", value: 155, i18n: "xetNghiem.daCoKetQua" },
  { label: "Đã duyệt KQ", value: 160, i18n: "xetNghiem.daDuyetKetQua" },
];

export const TRANG_THAI_CDHA = [
  { label: "Chờ tiếp nhận", i18Key: "cdha.choTiepDon", value: 25 },
  { label: "Đã tiếp nhận", i18Key: "cdha.daTiepNhan", value: 63 },
  { label: "Đã có KQ", i18Key: "xetNghiem.daCoKetQua", value: 155 },
  { label: "Bỏ qua", i18Key: "common.boQua", value: 50 },
];

export const LOAI_THONG_BAO = [
  {
    value: 10,
    name: "Khẩn cấp",
  },

  {
    value: 20,
    name: "Hàng ngày",
  },
  {
    value: 30,
    name: "Theo thời gian",
  },
];

export const TRANG_THAI_KY = [
  {
    ten: "Tất cả",
    id: "all",
  },
  {
    id: 0,
    ten: "Chưa ký",
  },
  {
    id: 10,
    ten: "Trình ký",
  },
  {
    id: 20,
    ten: "Từ chối ký",
  },
  {
    id: 50,
    ten: "Đã ký",
  },
  {
    id: 60,
    ten: "Hoàn thành",
  },
];
export const YES_NO = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có",
  },
  {
    id: "false",
    ten: "Không",
  },
];
export const DA_KIEM_TRA = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "false",
    ten: "Chưa kiểm tra",
  },
  {
    id: "true",
    ten: "Đã kiểm tra",
  },
];

export const DOI_TUONG = {
  KHONG_BAO_HIEM: 1,
  BAO_HIEM: 2,
};

export const TRANG_THAI_THANH_TOAN = {
  CHUA_THANH_TOAN: {
    id: 1,
    ten: "Chưa thanh toán",
  },
  DA_THANH_TOAN: {
    id: 2,
    ten: "Đã thanh toán",
  },
};

export const DS_DOI_TUONG_BAO_HIEM = [
  {
    id: 1,
    ten: "Không bảo hiểm",
  },
  {
    id: 2,
    ten: "Bảo hiểm",
  },
];

export const LOAI_DICH_VU = {
  THUOC: 90,
  VAT_TU: 100,
  HOA_CHAT: 110,
  CHE_PHAM_MAU: 120,
  GOI_DICH_VU: 150,
  NGOAI_DIEU_TRI: 60,
  SUAT_AN: 50,
  PHAU_THUAT_THU_THUAT: 40,
  CDHA: 30,
  XET_NGHIEM: 20,
  KHAM: 10,
  TO_DIEU_TRI: 210,
  TIEP_DON: 200,
  BO_CHI_DINH: 150,
  GIUONG: 130,
};

export const TY_LE_THANH_TOAN = [
  {
    id: 100,
    ten: "100%",
  },
  {
    id: 80,
    ten: "80%",
  },
  {
    id: 50,
    ten: "50%",
  },
];

export const LOAI_PHIEU_THU = {
  KHONG_BAO_HIEM: 1,
  BAO_HIEM: 2,
};

//=========== Giới Tính
export const GIOI_TINH = {
  NAM: 1,
  NU: 2,
};

export const GIOI_TINH_BY_VALUE = {
  1: "Nam",
  2: "Nữ",
};

//===============================

export const ROLES = {
  SUPER_ADMIN: "ROLE_AdminISofH",
  KIOSK: {
    DANG_KY_UU_TIEN: "kiosk_dangKy_uuTien",
    DANG_KY_LOAI_KHAM: "kiosk_dangKy_loaiKham",
    PHUONG_THUC_TIM_HS: "kiosk_phuongThuc_timHS",
    KET_QUA_TIM_KIEM: "kiosk_ketQuaTimKiem",
    DANG_KY_KHAM_BHYT: "kiosk_dangKy_khamBHYT",
    TIM_HS_QR: "kiosk_timHS_qr",
    SUA_KET_QUA: "kiosk_sua_ketQua",
    DANG_KY_THONG_TIN_MOI: "kiosk_dangKy_thongTinMoi",
    KET_QUA_LAY_SO: "kiosk_ketQua_laySo",
    TIM_HS_SDT: "kiosk_timHS_sdt",
    TIM_HS_CMND: "kiosk_timHS_cmnd",
  },
  THU_NGAN: {
    THU_NGAN: "0400101",
    TIM_NB: "0400101",
    NB_TIEP_THEO: "0400102",
    QUAY_LAI: "0400101",
    DANH_SACH_PHIEU_THU: "0400101",
    PHIEU_THU: "0400101",
    XUAT_DS_PHIEU_THU: "0400103",
    CHI_TIET_PHIEU_THU: "0400101",
    THONG_TIN_CA_NHAN: "0400101",
    LICH_SU_TAM_UNG: "0400104",
    DS_KHOAN_TIEN: "0400105",
    DS_TONG_HOP_PHIEU_THU: "0400106",
    DS_DICH_VU: "0400101",
    CHIA_PHIEU_THU: "0400107",
    MIEN_GIAM: "0400108",
    THONG_TIN_PHIEU_THU: "0400101",
    THANH_TOAN: "0400101",
    XUAT_HDDT: "0400111",
    PHIEU_CHI: "0400115",
    IN_PHIEU_THU: "0400116",
    HUY_THANH_TOAN: "0400117",
    SUA_THOI_GIAN_THANH_TOAN: "0400118",
    DS_PHIEU_YEU_CAU_HOAN: "0400201",
    XEM_CHI_TIET_PHIEU_YEU_CAU_HOAN: "0400202",
    XAC_NHAN_HOAN_DICH_VU: "0400203",
    XAC_NHAN_HOAN_DICH_VU_DA_XUAT_HDDT: "0400204",
    CHI_HOAN_NHA_THUOC: "0400205",
    DS_HOA_DON_DIEN_TU: "0400301",
    XEM_CHI_TIET_HOA_DON_DIEN_TU: "0400302",
    XOA_HOA_DON: "0400303",
    IN_HOA_DON: "0400304",
    THEM_HOA_DON_DIEN_TU: "0400305",
    THEM_HOA_DON_DIEN_TU_NHIEU_NGUOI: "0400306",
    XEM_DS_NB_QUAN_LY_TAM_UNG: "0400401",
    XEM_DS_DE_NGHI_TAM_UNG: "0400402",
    THEM_DE_NGHI_TAM_UNG: "0400403",
    SUA_DE_NGHI_TAM_UNG: "0400404",
    XOA_DE_NGHI_TAM_UNG: "0400405",
    DUYET_DE_NGHI_TAM_UNG: "0400406",
    IN_DE_NGHI_TAM_UNG: "0400407",
    XEM_DS_THU_TAM_UNG: "0400408",
    HOAN_PHIEU_THU_TAM_UNG: "0400410",
    HUY_PHIEU_THU_TAM_UNG: "0400411",
    IN_PHIEU_THU_TAM_UNG: "0400412",
    XEM_DS_HOAN_TAM_UNG: "0400413",
    IN_PHIEU_HOAN_TAM_UNG: "0400414",
    XEM_DS_HUY_TAM_UNG: "0400415",
    THU_NGAN_NOI_TRU: "0400122",
  },
  TIEP_DON: {
    TIEP_DON: "tiepDon",
    THONG_TIN_CHUNG: "tiepDon_thongTinChung",
    THONG_TIN_CA_NHAN: "tiepDon_thongTinCaNhan",
    CHON_QUAY: "tiepDon_chonQuay",
    DS_NHO: "tiepDon_dsNho",
    TIEP_DON_LAI_NB_NHO: "tiepDon_tiepDonLai_nbNho",
    NB_TIEP_THEO: "tiepDon_nbTiepTheo",
    DS_DA_TIEP_DON: "tiepDon_dsDaTiepDon",
    CHI_TIET_NB_DA_TIEP_DON: "tiepDon_chiTiet_nbDaTiepDon",
    SL_THEO_PHONG: "tiepDon_slTheoPhong",
    HUY_TIEP_DON: "tiepDon_huyTiepDon",
    KE_DV_KHAM: "tiepDon_ke_dvKham",
    KE_DV_XN: "tiepDon_ke_dvXN",
    KE_DV_CLS: "tiepDon_ke_dvCLS",
    KE_GOI_DV: "tiepDon_ke_goiDV",
    BHYT: "tiepDon_BHYT",
    THONG_TIN_BO_SUNG: "tiepDon_thongTinBoSung",
    KE_DV: "tiepDon_keDV",
    XEM_LAI_TT: "tiepDon_xemLai_thongTin",
    SUA_THONG_TIN: "tiepDon_sua_thongTin",
    SUA_DV: "tiepDon_sua_dv",
    TIEP_NHAN_NHIEU_KSK: "0300301",
    SUA_THONG_TIN_DA_THANH_TOAN: "0300201",
  },
  DANH_MUC: {
    LOAI_CC: "0100101",
    LOAI_CC_SUA: "0100103",
    LOAI_CC_THEM: "0100102",
    TG_CC: "0100201",
    TG_CC_SUA: "0100203",
    TG_CC_THEM: "0100202",
    QUAY: "0100301",
    QUAY_SUA: "0100303",
    QUAY_THEM: "0100302",
    PTTT: "0100401",
    PTTT_SUA: "0100403",
    PTTT_THEM: "0100402",
    BENH_TAT: "0100501",
    BENH_TAT_SUA: "0100503",
    BENH_TAT_THEM: "0100502",
    BENH_VIEN: "0100601",
    BENH_VIEN_SUA: "0100603",
    BENH_VIEN_THEM: "0100602",
    NGUYEN_NHAN_NHAP_VIEN: "0100701",
    NGUYEN_NHAN_NHAP_VIEN_SUA: "0100703",
    NGUYEN_NHAN_NHAP_VIEN_THEM: "0100702",
    CHUC_VU: "0100801",
    CHUC_VU_SUA: "0100803",
    CHUC_VU_THEM: "0100802",
    NGHE_NGHIEP: "0100901",
    NGHE_NGHIEP_SUA: "0100903",
    NGHE_NGHIEP_THEM: "0100902",
    MOI_QUAN_HE: "0101001",
    MOI_QUAN_HE_SUA: "0101003",
    MOI_QUAN_HE_THEM: "0101002",
    KHOA: "0101101",
    KHOA_SUA: "0101103",
    KHOA_THEM: "0101102",
    PHONG: "0101201",
    PHONG_SUA: "0101203",
    PHONG_THEM: "0101202",
    CHUYEN_KHOA: "0101401",
    CHUYEN_KHOA_SUA: "0101403",
    CHUYEN_KHOA_THEM: "0101402",
    VI_TRI_CHAN_THUONG: "0101501",
    VI_TRI_CHAN_THUONG_SUA: "0101503",
    VI_TRI_CHAN_THUONG_THEM: "0101502",
    THE_BAO_HIEM: "0101601",
    THE_BAO_HIEM_SUA: "0101603",
    THE_BAO_HIEM_THEM: "0101602",
    HOC_HAM: "0101701",
    HOC_HAM_SUA: "0101703",
    HOC_HAM_THEM: "0101702",
    DAN_TOC: "0101801",
    DAN_TOC_SUA: "0101803",
    DAN_TOC_THEM: "0101802",
    LOA_GOI_SO: "0101901",
    LOA_GOI_SO_SUA: "0101903",
    LOA_GOI_SO_THEM: "0101902",
    NHA: "0102001",
    NHA_SUA: "0102003",
    NHA_THEM: "0102002",
    VAN_BANG: "0102101",
    VAN_BANG_SUA: "0102103",
    VAN_BANG_THEM: "0102102",
    DUONG_DUNG: "0102201",
    DUONG_DUNG_SUA: "0102203",
    DUONG_DUNG_THEM: "0102202",
    LIEU_DUNG: "0102301",
    LIEU_DUNG_SUA: "0102303",
    LIEU_DUNG_THEM: "0102302",
    MA_MAY: "0102401",
    MA_MAY_SUA: "0102403",
    MA_MAY_THEM: "0102402",
    HOAT_CHAT: "0102501",
    HOAT_CHAT_SUA: "0102503",
    HOAT_CHAT_THEM: "0102502",
    NGUOI_DAI_DIEN: "0102601",
    NGUOI_DAI_DIEN_SUA: "0102603",
    NGUOI_DAI_DIEN_THEM: "0102602",
    CO_QUAN: "0102701",
    CO_QUAN_SUA: "0102703",
    CO_QUAN_THEM: "0102702",
    QUAN_HAM: "0102801",
    QUAN_HAM_SUA: "0102803",
    QUAN_HAM_THEM: "0102802",
    LOI_DAN: "0102901",
    LOI_DAN_SUA: "0102903",
    LOI_DAN_THEM: "0102902",
    NHA_SAN_XUAT: "0103001",
    NHA_SAN_XUAT_SUA: "0103003",
    NHA_SAN_XUAT_THEM: "0103002",
    DOI_TAC: "0103101",
    DOI_TAC_SUA: "0103103",
    DOI_TAC_THEM: "0103102",
    DOI_TRA_DICH_VU: "0103201",
    DOI_TRA_DICH_VU_SUA: "0103203",
    DOI_TRA_DICH_VU_THEM: "0103202",
    BENH_PHAM: "0103301",
    BENH_PHAM_SUA: "0103303",
    BENH_PHAM_THEM: "0103302",
    PHUONG_PHAP_GAY_ME: "0103401",
    PHUONG_PHAP_GAY_ME_SUA: "0103403",
    PHUONG_PHAP_GAY_ME_THEM: "0103402",
    PHUONG_PHAP_NHUOM: "0103501",
    PHUONG_PHAP_NHUOM_SUA: "0103503",
    PHUONG_PHAP_NHUOM_THEM: "0103502",
    VI_TRI_SINH_THIET: "0103601",
    VI_TRI_SINH_THIET_SUA: "0103603",
    VI_TRI_SINH_THIET_THEM: "0103602",
    DINH_MUC_THANG_SO: "0103701",
    DINH_MUC_THANG_SO_SUA: "0103703",
    DINH_MUC_THANG_SO_THEM: "0103702",
    TAI_SAN_KHAC: "0103801",
    TAI_SAN_KHAC_SUA: "0103803",
    TAI_SAN_KHAC_THEM: "0103802",
    LOAI_DOI_TUONG: "0103901",
    LOAI_DOI_TUONG_SUA: "0103903",
    LOAI_DOI_TUONG_THEM: "0103902",
    LOAI_BA: "0104001",
    LOAI_BA_SUA: "0104003",
    LOAI_BA_THEM: "0104002",
    // view
    NHOM_VAT_TU: "0104101",
    NHOM_VAT_TU_THEM: "0104102",
    NHOM_VAT_TU_SUA: "0104103",
    NHOM_HOA_CHAT: "0104201",
    NHOM_HOA_CHAT_THEM: "0104202",
    NHOM_HOA_CHAT_SUA: "0104203",
    CDHA_TDCN: "0104301",
    CDHA_TDCN_THEM: "0104302",
    CDHA_TDCN_SUA: "0104303",
    VAT_TU: "0104401",
    VAT_TU_THEM: "0104402",
    VAT_TU_SUA: "0104403",
    DICH_VU_XN: "0104501",
    DICH_VU_XN_THEM: "0104502",
    DICH_VU_XN_SUA: "0104503",
    HOA_CHAT: "0104601",
    HOA_CHAT_THEM: "0104602",
    HOA_CHAT_SUA: "0104603",
    THUOC: "0104701",
    THUOC_THEM: "0104702",
    THUOC_SUA: "0104703",
    DV_PHAU_THUAT_THU_THUAT: "0104801",
    DV_PHAU_THUAT_THU_THUAT_THEM: "0104802",
    DV_PHAU_THUAT_THU_THUAT_SUA: "0104803",
    CHE_PHAM_MAU: "0104901",
    CHE_PHAM_MAU_THEM: "0104902",
    CHE_PHAM_MAU_SUA: "0104903",
    DV_NGOAI_DIEU_TRI: "0105001",
    DV_NGOAI_DIEU_TRI_THEM: "0105002",
    DV_NGOAI_DIEU_TRI_SUA: "0105003",
    DIA_CHI_HANH_CHINH: "0105101",
    DIA_CHI_HANH_CHINH_THEM: "0105102",
    DIA_CHI_HANH_CHINH_SUA: "0105103",
    NHOM_DICH_VU: "0105201",
    NHOM_DICH_VU_THEM: "0105202",
    NHOM_DICH_VU_SUA: "0105203",
    DON_VI_TINH: "0105301",
    DON_VI_TINH_THEM: "0105302",
    DON_VI_TINH_SUA: "0105303",
    NHOM_THUOC: "0105401",
    NHOM_THUOC_THEM: "0105402",
    NHOM_THUOC_SUA: "0105403",
    PHAN_LOAI_THUOC: "0105501",
    PHAN_LOAI_THUOC_THEM: "0105502",
    PHAN_LOAI_THUOC_SUA: "0105503",
    PHAN_NHOM_THUOC: "0105601",
    PHAN_NHOM_THUOC_THEM: "0105602",
    PHAN_NHOM_THUOC_SUA: "0105603",
    // end view
    GOI_DICH_VU: "0105701",
    GOI_DICH_VU_SUA: "0105703",
    GOI_DICH_VU_THEM: "0105702",
    BAO_CAO: "0105801",
    BAO_CAO_SUA: "0105803",
    BAO_CAO_THEM: "0105802",
    MAY_IN: "0105901",
    MAY_IN_SUA: "0105903",
    NHOM_CHI_SO: "0106101",
    NHOM_CHI_SO_SUA: "0106103",
    NHOM_CHI_SO_THEM: "0106102",
    MAU_KET_QUA_XN: "0106201",
    MAU_KET_QUA_XN_SUA: "0106203",
    MAU_KET_QUA_XN_THEM: "0106202",
    NOI_LAY_BENH_PHAM: "0106301",
    NOI_LAY_BENH_PHAM_SUA: "0106303",
    NOI_LAY_BENH_PHAM_THEM: "0106302",
    // view
    NGUON_NHAP_KHO: "0106801",
    NGUON_NHAP_KHO_THEM: "0106802",
    NGUON_NHAP_KHO_SUA: "0106803",
    HINH_THUC_NHAP_XUAT_LOAI_XUAT: "0106901",
    HINH_THUC_NHAP_XUAT_LOAI_XUAT_THEM: "0106902",
    HINH_THUC_NHAP_XUAT_LOAI_XUAT_SUA: "0106903",
    BO_CHI_DINH: "0107001",
    BO_CHI_DINH_THEM: "0107002",
    BO_CHI_DINH_SUA: "0107003",
    CHUONG_TRINH_GIAM_GIA: "0107101",
    CHUONG_TRINH_GIAM_GIA_THEM: "0107102",
    CHUONG_TRINH_GIAM_GIA_SUA: "0107103",
    NGUON_NGUOI_BENH: "0107401",
    NGUON_NGUOI_BENH_THEM: "0107402",
    NGUON_NGUOI_BENH_SUA: "0107403",
    HANG_THE: "0108101",
    HANG_THE_THEM: "0108102",
    HANG_THE_SUA: "0108103",
    XUAT_XU: "0107501",
    XUAT_XU_THEM: "0107502",
    XUAT_XU_SUA: "0107503",
    QUYEN_KY: "0107601",
    QUYEN_KY_THEM: "0107602",
    QUYEN_KY_SUA: "0107603",
    QUYEN_KY_XOA: "0107604",
    DICH_VU_KHAM_BENH: "0101301",
    DICH_VU_KHAM_BENH_THEM: "0101302",
    DICH_VU_KHAM_BENH_SUA: "0101303",
    LOAI_PHIEU: "0107701",
    LOAI_PHIEU_THEM: "0107702",
    LOAI_PHIEU_SUA: "0107703",
    LOAI_PHIEU_XOA: "0107704",
    MAU_QMS: "0108001",
    MAU_QMS_THEM: "0108002",
    MAU_QMS_SUA: "0108003",
    MAU_QMS_XOA: "0108004",
    LIEU_DUNG_BS: "0108201",
    LIEU_DUNG_BS_THEM: "0108202",
    LIEU_DUNG_BS_SUA: "0108203",
    THUOC_KE_NGOAI: "0108301",
    THUOC_KE_NGOAI_THEM: "0108302",
    THUOC_KE_NGOAI_SUA: "0108303",
    HDSD: "0108601",
    HDSD_THEM: "0108602",
    HDSD_SUA: "0108603",
    NHOM_CHI_PHI: "0108701",
    NHOM_CHI_PHI_THEM: "0108702",
    NHOM_CHI_PHI_SUA: "0108703",
    HOI_DONG: "0108801",
    HOI_DONG_THEM: "0108802",
    HOI_DONG_SUA: "0108803",
    MAU_KQ_CDHA_TDCN: "0108501",
    MAU_KQ_CDHA_TDCN_THEM: "0108502",
    MAU_KQ_CDHA_TDCN_SUA: "0108503",
    LY_DO_TAM_UNG: "0109301",
    LY_DO_TAM_UNG_THEM: "0109302",
    LY_DO_TAM_UNG_SUA: "0109303",
    MAU_DIEN_BIEN: "0109401",
    MAU_DIEN_BIEN_THEM: "0109402",
    MAU_DIEN_BIEN_SUA: "0109403",
    // end view,
    XOA_VAT_TU_KICH_CO: "0104404",
    BAC_SI_NGOAI_VIEN: "0109501",
    BAC_SI_NGOAI_VIEN_SUA: "0109503",
    BAC_SI_NGOAI_VIEN_THEM: "0109502",
    LOAI_BUA_AN: "0109901",
    LOAI_BUA_AN_THEM: "0109902",
    LOAI_BUA_AN_SUA: "0109903",
    DICH_VU_AN: "0109801",
    DICH_VU_AN_THEM: "0109802",
    DICH_VU_AN_SUA: "0109803",
    MAU_KQ_PT_TT: "0110001",
    MAU_KQ_PT_TT_THEM: "0110002",
    MAU_KQ_PT_TT_SUA: "0110003",
    CHI_SO_SONG: "0110301",
    CHI_SO_SONG_THEM: "0110302",
    CHI_SO_SONG_SUA: "0110303",
    PHAN_LOAI_BMI: "0110401",
    PHAN_LOAI_BMI_THEM: "0110402",
    PHAN_LOAI_BMI_SUA: "0110403",
    NGAY_NGHI_LE: "0110501",
    NGAY_NGHI_LE_THEM: "0110502",
    NGAY_NGHI_LE_SUA: "0110503",
    HAU_QUA_TUONG_TAC: "01102301",
    HAU_QUA_TUONG_TAC_THEM: "01102302",
    HAU_QUA_TUONG_TAC_SUA: "01102303",
    DAC_TINH_DUOC_LY: "01102101",
    DAC_TINH_DUOC_LY_THEM: "01102102",
    DAC_TINH_DUOC_LY_SUA: "01102103",
    MUC_DO_TUONG_TAC: "01102201",
    MUC_DO_TUONG_TAC_THEM: "01102202",
    MUC_DO_TUONG_TAC_SUA: "01102202",
    TUONG_TAC_THUOC: "0110901",
    TUONG_TAC_THUOC_THEM: "0110902",
    TUONG_TAC_THUOC_SUA: "0110903",
    CHI_PHI_HAP_SAY: "0110901",
    CHI_PHI_HAP_SAY_THEM: "0110902",
    CHI_PHI_HAP_SAY_SUA: "0110903",
  },
  GOI_DICH_VU: {
    DANH_SACH_NB_SU_DUNG_GOI_DICH_VU: "2200101",
    CHI_TIET_NB_SU_DUNG_GOI_DICH_VU: "2200102",
    THEM_MOI_GOI_CHO_NB: "2200103",
    THEM_MOI_PHIEU_THU_THANH_TOAN_GOI: "2200104",
    HUY_THANH_TOAN_PHIEU_THU_GOI: "2200105",
    KET_THUC_SU_DUNG_GOI: "2200106",
    HUY_SU_DUNG_GOI: "2200107",
    DUNG_SU_DUNG_GOI: "2200108",
    XOA_GOI: "2200109",

    GOI_DICH_VU: "0109601",
    GOI_DICH_VU_THEM: "0109602",
    GOI_DICH_VU_SUA: "0109603",
  },
  THIET_LAP_CHUNG: "0107201",
  THIET_LAP: {
    KIOSK: "0107901",
    KIOSK_THEM: "0107902",
    KIOSK_SUA: "0107903",
    THIET_LAP_CHUNG_SUA: "0107203",
    THIET_LAP_CHUNG_THEM: "0107202",
  },
  CDHA_TDCN: {
    CHO_TIEP_DON: "0107901",
    CHO_TIEP_DON_THEM: "0107902",
    CHO_TIEP_DON_SUA: "0107903",
    SUA_DICH_VU_CO_KET_QUA: "0700",
  },
  QUAN_LY_TAI_KHOAN: {
    QUYEN: "0106001",
    QUYEN_SUA: "0106003",
    QUYEN_THEM: "0106002",
    VAI_TRO_HE_THONG: "0106401",
    VAI_TRO_HE_THONG_SUA: "0106403",
    VAI_TRO_HE_THONG_THEM: "0106402",
    NHOM_TINH_NANG: "0106501",
    NHOM_TINH_NANG_SUA: "0106503",
    NHOM_TINH_NANG_THEM: "0106502",
    NHAN_VIEN: "0106701",
    NHAN_VIEN_THEM: "0106702",
    NHAN_VIEN_SUA: "0106703",
    QUAN_LY_TAI_KHOAN: "0107301",
    QUAN_LY_TAI_KHOAN_THEM: "0107302",
    QUAN_LY_TAI_KHOAN_SUA: "0107303",
  },
  XET_NGHIEM: {
    MH_LAY_MAU: "0600102",
    XAC_NHAN_LAY_MAU: "0600104",
    DS_NB_TIEP_THEO: "0600101",
    TIEP_NHAN_MAU: "0600103",
    BO_QUA: "0600105",
    THONG_TIN_NB: "0300110",
    XET_NGHIEM_HH: "0600201",
    TIEP_NHAN_MAU_HH: "0600202",
    HUY_MAU_HH: "0600203",
    NHAP_KET_QUA_HH: "0600204",
    DUYET_KET_QUA_HH: "0600205",
    IN_KET_QUA_HH: "0600206",
    HUY_DUYET_KET_QUA_HH: "0600207",
    XET_NGHIEM_GPB: "0600301",
    TIEP_NHAN_MAU_GPB: "0600302",
    HUY_MAU_GPB: "0600303",
    NHAP_KET_QUA_GPB: "0600304",
    DUYET_KET_QUA_GPB: "0600305",
    IN_KET_QUA_GPB: "0600306",
    HUY_DUYET_KET_QUA_GPB: "0600307",
  },
  CHAN_DOAN_HINH_ANH: {
    CHO_TIEP_DON: "0700101",
    THONG_TIN_NGUOI_BENH: "0300110",
    PHAN_PHONG_CHO_TIEP_DON: "0700102",
    TIEP_NHAN: "0700202",
    TIEP_NHAN_DICH_VU: "0700203",
    HUY_TIEP_NHAN_DICH_VU: "0700204",
    CO_KET_QUA: "0700205",
    HUY_CO_KET_QUA: "0700206",
    IN_KET_QUA: "0700207",
    CHI_DICH_DV: "0700208",
    NB_TIEP_THEO: "0700201",
  },
  KHAM_BENH: {
    XEM: "0500101",
    GOI_NB_TIEP_THEO: "0500102",
    XEM_SO_TIEN: "0500103",
    MO_HO_SO: "0300115",
    DOI_TRANG_THAI: "0300116",
  },
  QUAN_LY_THONG_BAO: {
    QUYEN_XEM: "1600101",
    QUYEN_THEM: "1600102",
    QUYEN_SUA: "1600103",
  },
  HE_THONG: {
    DANH_MUC: "000101",
    TIEP_DON: "000301",
    THU_NGAN: "000401",
    KIOSK: "000201",
    KHAM_BENH: "000501",
    XET_NGHIEM: "000601",
    CDHA_TDCN: "000701",
    KHO: "000801",
    KY_SO: "000901",
    HO_SO_BENH_AN: "001001",
    NHA_THUOC: "001101",
    THEO_DOI_DIEU_TRI: "001201",
    QUAN_TRI_HE_THONG: "001301",
    THIET_LAP: "001401",
    BAO_CAO: "001501",
    QUAN_LY_THONG_BAO: "001601",
    QUYET_TOAN_BHYT: "002001",
    QUAN_LY_NOI_TRU: "002101",
    KHAM_SUC_KHOE: "001801",
    GOI_DICH_VU: "002201",
    PHAU_THUAT_THU_THUAT: "002301",
    GIAY_DAY_CONG: "002401",
  },
  BAO_CAO: {
    CHI_TIET_THEO_NGUOI_BENH: "1500101",
    NHAP_THEO_NHA_CC: "1500201",
    BANG_KE_HOA_DON_NHAP: "1500202",
    XUAT_NHAP_TON_KHO: "1500203",
    CHI_TIET_XUAT_KHO: "1500204",
    THE_KHO: "1500205",
    CHI_TIET_NHAP_KHO: "1500206",
    NGUOI_BENH_KHAM_CHI_TIET: "1500301",
    NGUOI_BENH_CO_LICH_HEN_KHAM: "1500302",
    TONG_HOP_THU_TIEN_NB: "1500401",
    TC02: "1500403",
    TC03: "1500402",
    TC04: "1500404",
    TC05: "1500405",
    TC06: "1500406",
    TC07: "1500407",
    TC08: "1500408",
    TC09: "1500409",
    TC10: "1500410",
    TC11: "1500411",
    TC12: "1500412",
    TC13: "1500413",
    TC14: "1500414",
    TC15: "1500415",
    TC16: "1500416",
    TC17: "1500417",
    TC17_1: "1500422",
    TC18: "1500418",
    TC20: "1500420",
    TC20_1: "1500421",
    TC21: "1500423",
    TC22: "1500424",
    TC23: "1500425",
    TC24: "1500426",
    BC01: "1500101",
    BC02: "1500102",
    BC03: "1500103",
    BC04: "1500104",
    BC05: "1500105",
    BC06: "1500106",
    BC07: "1500107",
    BC08: "1500108",
    BC09: "1500109",
    BC10: "1500110",
    BC11: "1500111",
    K07: "1500207",
    K08: "1500208",
    K10: "1500212",
    K11: "1500209",
    K12: "1500210",
    K13: "1500211",
    K14: "1500214",
    KNT01: "1500501",
    KNT02: "1500504",
    KNT03: "1500505",
    KNT04: "1500506",
    KNT05: "1500502",
    KNT06: "1500503",
    K01_2: "1500601",
    K02_1: "1500211",
    KVT01_1: "1500602",
    KVT02: "1500603",
    KVT03: "1500604",
    PK03: "1500303",
    KSK01: "1500701",
    KSK02: "1500702",
    KSK04: "1500704",
    KSK05: "1500705",
    KSK12: "1500706",
    G01: "1500801",
    G02: "1500802",
    G03: "1500803",
    G04: "1500804",
    KHTH01: "1500901",
    KHTH02: "1500902",
    KHTH03: "1500903",
    KHTH04: "1500904",
    KHTH05: "1500905",
    KHTH06: "1500906",
    KHTH07: "1500907",
  },
  TRO_GIUP: "001701",
  QUAN_LY_NOI_TRU: {
    DANH_SACH_LAP_BENH_AN: "2100101",
    CHI_TIET_LAP_BENH_AN: "2100102",
    THONG_TIN_SO_TIEN: "2100103",
    LAP_BENH_AN: "2100104",
    HUY_BENH_AN: "2100105",
    XOA_BO_BENH_AN: "2100106",
    SUA_THONG_TIN_BENH_AN: "2100107",
    SUA_THONG_TIN_HANH_CHINH: "2100108",
    XEM_HO_SO_BENH_AN: "2100109",
    XEM_SO_DO_PHONG_GIUONG: "2100110",
    DANH_SACH_NB_NOI_TRU: "2100201",
    CHI_TIET_NOI_TRU: "2100202",
    SUA_THONG_TIN_HANH_CHINH_NOI_TRU: "2100203",
    XEM_HO_SO_BENH_AN_NOI_TRU: "2100204",
    PHONG_GIUONG: "2100205",
    TO_DIEU_TRI: "2100206",
    DO_CHI_SO_SONG: "2100207",
    SO_KET_15_NGAY: "2100208",
    HOI_CHAN: "2100209",
    XAC_NHAN_HIV: "2100210",
    DV_NGOAI_DIEU_TRI: "2100211",
    DV_NGOAI_TRU: "2100212",
    THAO_TAC_NB_KHAC_KHOA: "2100213",
  },
  KHO: {
    SUA_PHIEU_HOAN_THANH: "0800404",
    XEM_PHIEU_XUAT_KHO: "0800501",
    XEM_CHI_TIET_PHIEU_XUAT_KHO: "0800502",
    THEM_MOI_PHIEU_XUAT_KHO: "0800503",
    SUA_PHIEU_XUAT_KHO: "0800504",
    GUI_DUYET_PHIEU_XUAT_KHO: "0800505",
    DUYET_PHIEU_XUAT_KHO: "0800506",
    HUY_DUYET_PHIEU_XUAT_KHO: "0800507",
    XEM_PHIEU_NHAP_KHO: "0800401",
    XEM_CHI_TIET_PHIEU_NHAP_KHO: "0800402",
    THEM_MOI_PHIEU_NHAP_KHO: "0800403",
    SUA_PHIEU_NHAP_KHO: "0800408",
    GUI_DUYET_PHIEU_NHAP_KHO: "0800405",
    DUYET_PHIEU_NHAP_KHO: "0800406",
    HUY_DUYET_PHIEU_NHAP_KHO: "0800407",
    SUA_PHIEU_NHAP_KHO_HOAN_THẠNH: "0800404",
    SUA_THOI_GIAN_DUYET_NGUOI_DUYET: "1100109",
    HUY_GUI_DUYET_PHIEU_NHAP_KHO: "0800410",
    HUY_GUI_DUYET_PHIEU_XUAT_KHO: "0800508",
  },
  NHA_THUOC: {
    SUA_THOI_GIAN_DUYET: "0800404",
  },
  GIAY_DAY_CONG: {
    GIAY_NGHI_HUONG_DS: "2400101",
    GIAY_NGHI_HUONG_CHI_TIET: "2400102",
    GIAY_NGHI_HUONG_DAY_HANG_LOAT: "2400103",
    GIAY_NGHI_HUONG_DAY_LE: "2400104",
    GIAY_NGHI_HUONG_HUY: "2400105",

    NB_RA_VIEN_DS: "2400201",
    NB_RA_VIEN_CHI_TIET: "2400202",
    NB_RA_VIEN_DAY_HANG_LOAT: "2400203",
    NB_RA_VIEN_DAY_LE: "2400204",
    NB_RA_VIEN_HUY: "2400205",
  },
};

export const LOAI_PHONG = {
  LAM_SANG: 10,
  CAN_LAM_SANG: 20,
  PHONG_KHAM: 30,
  LAY_MAU_BENH_PHAM: 40,
  PHONG_GIUONG: 50,
  PHONG_GIUONG_TU_CHON: 60,
  KHAC: 70,
};

export const SORT_LOAD_MORE = "ten,asc";

export const TIEPDON_CLS = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có",
  },
  {
    id: "false",
    ten: "Không",
  },
];
export const THANH_TOAN_SAU = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Thanh toán sau",
  },
  {
    id: "false",
    ten: "Không thanh toán sau",
  },
];
export const TIEP_NHAN_NOI_TRU = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có tiếp nhận",
  },
  {
    id: "false",
    ten: "Không tiếp nhận",
  },
];

export const DANH_CHO_THUOC = [
  { id: "", ten: "Tất cả" },
  { id: "true", ten: "Dành cho thuốc" },
  { id: "false", ten: "Không dành cho thuốc" },
];

export const SORT_DEFAULT_DICH_VU = {
  active: 2,
  "dichVu.ma": 1,
  updatedOn: 2,
};

export const TRANG_THAI_DICH_VU = {
  CHO_TIEP_DON_CLS: 15,
  CHO_KHAM: 20,
  CHO_TIEP_NHAN: 25,
  DA_CHECKIN_KHAM: 30,
  DA_CHECKIN: 35,
  CHUAN_BI_KHAM: 40,
  CHUAN_BI_THUC_HIEN: 43,
  CHUAN_BI_LAY_MAU: 46,
  BO_QUA: 50,
  DANG_KHAM: 60,
  DA_TIEP_NHAN: 63,
  DA_LAU_MAU: 66,
  DANG_THUC_HIEN_DICH_VU: 70,
  HUY_MAU: 80,
  TIEP_NHAN_MAU: 90,
  CHO_KET_LUAN: 100,
  DA_CHECKIN_KET_LUAN: 110,
  CHUAN_BI_KET_LUAN: 120,
  BO_QUA_KET_LUAN: 130,
  DANG_KET_LUAN: 140,
  DA_KET_LUAN: 150,
  DA_CO_KET_QUA: 155,
  DA_DUYET: 160,
  YEU_CAU_HOAN: [15, 20, 25, 30, 35, 40, 43, 50],
};

export const THUC_HIEN_DICH_VU = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: false,
    ten: "Chưa thực hiện",
  },
  {
    id: true,
    ten: "Đã thực hiện",
  },
];

export const SO_LUONG_DICH_VU = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: false,
    ten: "Dịch vụ đã thanh toán",
  },
  {
    id: true,
    ten: "Dịch vụ hoàn sau thanh toán",
  },
];

//=================================== kho
export const TRANG_THAI_PHIEU = [
  { label: "Tạo mới", value: 10 },
  { label: "Tạo mới, đã giữ chỗ", value: 15 },
  { label: "Chờ duyệt", value: 20 },
  { label: "Hoàn thành", value: 30 },
];
export const LOAI_PHIEU_XUAT = [
  { ten: "Xem phiếu duyệt dự trù", id: 1 },
  { ten: "Xem phiếu xuất", id: 2 },
  { ten: "Xem phiếu lĩnh", id: 3 },
];

export const TK_TRANG_THAI_PHIEU_NHAP_DU_TRU = [
  { label: "Chờ duyệt", value: 20 },
  { label: "Hoàn thành", value: 30 },
];
export const TK_TRANG_THAI_PHIEU_NHAP_XUAT = [
  { label: "Tạo mới", value: 10 },
  { label: "Tạo mới, đã giữ chỗ", value: 15 },
  { label: "Chờ duyệt", value: 20 },
  { label: "Hoàn thành", value: 30 },
];

export const TRANG_THAI_DON_THUOC = [
  // { label: "Tất cả", value: 10 },
  { label: "Tạo mới", value: 15 }, // 10 , 15 , 20 = tạo mới
  { label: "Đã phát", value: 30 }, // 30 , 35  = đã phát => số liệu anh Minh đưa
  // { label: "Tất cả", value: 10 },
  // { label: "Chưa giữ chỗ", value: 20 },
  // { label: "Chờ phát", value: 30 },
  // { label: "Đã phát", value: 40 },
];

export const TRANG_THAI_DON_THUOC_NGOAI_TRU = [
  { label: "Tạo mới", value: 10 },
  { label: "Tạo mới, đã giữ chỗ", value: 15 },
  { label: "Hoàn thành", value: 30 },
];

export const THANG_DU_TRU = [
  { id: "1", ten: "Tháng 1" },
  { id: "2", ten: "Tháng 2" },
  { id: "3", ten: "Tháng 3" },
  { id: "4", ten: "Tháng 4" },
  { id: "5", ten: "Tháng 5" },
  { id: "6", ten: "Tháng 6" },
  { id: "7", ten: "Tháng 7" },
  { id: "8", ten: "Tháng 8" },
  { id: "9", ten: "Tháng 9" },
  { id: "10", ten: "Tháng 10" },
  { id: "11", ten: "Tháng 11" },
  { id: "12", ten: "Tháng 12" },
];

export const HINH_THUC_NHAP_XUAT = {
  HINH_THUC_NHAP: 10,
  LOAI_XUAT: 20,
};

export const LOAI_CHIET_KHAU = {
  PHAN_TRAM: 1,
  TIEN: 2,
};

export const IN_NHANH_KYSO = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: true,
    ten: "Có",
  },
  {
    id: false,
    ten: "Không",
  },
];

export const DATA_TIME_QMS = [
  {
    title: "Sáng từ",
    value: "thoiGianSangTu",
  },
  {
    title: "đến",
    value: "thoiGianSangDen",
  },
  {
    title: "Chiều từ",
    value: "thoiGianChieuTu",
  },
  {
    title: "đến",
    value: "thoiGianChieuDen",
  },
];

export const LOAI_QMS = [
  {
    id: 20,
    ten: "QMS CĐHA - TDCN",
  },
  {
    id: 30,
    ten: "QMS khám bệnh",
  },
  {
    id: 40,
    ten: "QMS xét nghiệm",
  },
];

export const TRANG_THAI_DIEU_TRI = [
  {
    ten: "Tất cả",
    id: "",
  },
  {
    ten: "Đang theo dõi",
    id: false,
  },
  {
    ten: "Đã kết thúc theo dõi",
    id: true,
  },
];

export const NHOM_DANH_MUC = {
  CHUYEN_KHOA_MAT: 0,
  CAP_CUU: 1,
  KHO: 2,
  KY_IN_PHIEU: 3,
  DICH_VU: 4,
  HANH_CHINH: 5,
  CHUNG: 6,
  KHACH_HANG: 7,
};

export const NHOM_BAO_CAO = {
  BAO_CAO_TAI_CHINH: 0,
  BAO_CAO_DICH_VU: 1,
  BAO_CAO_PHONG_KHAM: 2,
  BAO_CAO_KHO: 3,
  BAO_CAO_KHO_VT_HC: 4,
  BAO_CAO_KHO_NHA_THUOC: 5,
  BAO_CAO_KHAM_SUC_KHOE: 6,
  BAO_CAO_GOI_LIEU_TRINH: 7,
  BAO_CAO_KE_HOACH_TONG_HOP: 8,
  BAO_CAO_PHAU_THUAT_THU_THUAT: 9,
};

export const MUC_DO_UU_TIEN = [
  {
    id: 10,
    ten: "4",
  },

  {
    id: 20,
    ten: "3",
  },
  {
    id: 30,
    ten: "2",
  },
  {
    id: 40,
    ten: "1",
  },
];
export const TRANG_THAI_PHIEU_HOAN = [
  { label: "Chờ Hoàn", value: 15 }, // 10 , 15 , 20 = tạo mới
  { label: "Hoàn Thành", value: 30 }, // 30 , 35  = đã phát => số liệu anh Minh đưa
];

export const THIET_LAP_CHUNG = {
  MA_LOI_BH_DUOC_TIEP_DON: "MA_LOI_BH_DUOC_TIEP_DON",
  TAI_KHOAN_BHXH: "TAI_KHOAN_BHXH",
  TIEU_DE_TRAI_1: "TIEU_DE_TRAI_1",
  TIEU_DE_TRAI_2: "TIEU_DE_TRAI_2",
  MA_KHOA_CAP_CUU: "MA_KHOA_CAP_CUU",
  LY_DO_TAM_UNG: "LY_DO_TAM_UNG",
  HINH_THUC_THANH_TOAN: "HINH_THUC_THANH_TOAN",
  IN_PHIEU_HOAN_KHI_THANH_TOAN: "IN_PHIEU_HOAN_KHI_THANH_TOAN",
  PHAT_HANH_HOA_DON_KHI_THANH_TOAN: "PHAT_HANH_HOA_DON_KHI_THANH_TOAN",
  IN_PHIEU_THU_KHI_THANH_TOAN: "IN_PHIEU_THU_KHI_THANH_TOAN",
  MA_NHOM_DICH_VU_CAP1_PT: "MA_NHOM_DICH_VU_CAP1_PT",
  LY_DO_HOAN_UNG: "LY_DO_HOAN_UNG",
  NGUON_NGUOI_BENH: "NGUON_NGUOI_BENH",
  NHOM_DV_GOI10NGAY: "NHOM_DV_GOI10NGAY",
  CHUYEN_KHOA_NOI_KHOA: "CHUYEN_KHOA_NOI_KHOA",
  CHUYEN_KHOA_NGOAI_KHOA: "CHUYEN_KHOA_NGOAI_KHOA",
  CHUYEN_KHOA_SAN_PHU_KHOA: "CHUYEN_KHOA_SAN_PHU_KHOA",
  CHUYEN_KHOA_MAT: "CHUYEN_KHOA_MAT",
  CHUYEN_KHOA_TAI_MUI_HONG: "CHUYEN_KHOA_TAI_MUI_HONG",
  CHUYEN_KHOA_RANG_HAM_MAT: "CHUYEN_KHOA_RANG_HAM_MAT",
  CHUYEN_KHOA_DA_LIEU: "CHUYEN_KHOA_DA_LIEU",
  BAC_SI: "BAC_SI",
  THUC_HIEN_CAN_BANG_PHONG: "THUC_HIEN_CAN_BANG_PHONG",
  QUOC_TICH_MAC_DINH: "QUOC_TICH_MAC_DINH",
  DAN_TOC_MAC_DINH: "DAN_TOC_MAC_DINH",
};

export const A4 = {
  width: 838,
  height: 1185, //  1.41428571429 =  29.7/21 size A3,
};
export const LOAI_PHIEU_NHAP = [
  { ten: "Nhập từ nhà cung cấp", id: 10 },
  { ten: "Dự trù", id: 20 },
  { ten: "Chuyển kho", id: 30 },
  { ten: "Phiếu trả", id: 70 },
];

// 1 - asc || 2 - desc
export const SORT_DEFAULT = { active: 2, ma: 1, updatedOn: 2 };

export const LOAI_VAT_TU = [
  { id: 1, ten: "Chạy máy" },
  { id: 2, ten: "Không chạy máy" },
];

export const HOA_DON_BBBG = [
  { id: 1, ten: "Hóa đơn" },
  { id: 2, ten: "BBBG" },
];

export const TRANG_THAI_PHIEU_NHAP_XUAT = {
  TAO_MOI: 10,
  TAO_MOI_DA_GIU_CHO: 15,
  CHO_DUYET: 20,
  HOAN_THANH: 30,
  DA_PHAT: 35,
};

export const TRANG_THAI_HOA_DON = {
  HD_TAO_MOI: 10,
  HD_PHAT_HANH_LOI: 15,
  HD_DA_PHAT_HANH: 20,
  HD_CHO_XOA_BO: 30,
  HD_XOA_BO: 40,
  HD_CHO_DIEU_CHINH: 45,
  HD_DIEU_CHINH: 50,
};

export const DOI_TUONG_KCB_NOI_TRU = {
  NGOAI_TRU: 1,
  DIEU_TRI_NGOAI_TRU: 2,
  DIEU_TRI_NOI_TRU: 3,
  DIEU_TRI_NOI_TRU_BAN_NGAY: 4,
};

export const BASE_LAYOUT = {
  default: {
    table: { xl: 14, xxl: 14 },
    form: { xl: 10, xxl: 10 },
  },
  collapse: {
    table: { xl: 8, xxl: 8 },
    form: { xl: 16, xxl: 16 },
  },
  fullTable: {
    table: { xl: 24, xxl: 24 },
    form: { xl: 0, xxl: 0 },
  },
};

export const TRANG_THAI_NB = {
  // enum trangThaiNb
  CHO_LAP_BENH_AN: 10,
  CHO_TIEP_NHAN_VAO_KHOA: 20,
  DANG_DIEU_TRI: 30,
  DANG_CHUYEN_KHOA: 40,
  CHO_HOAN_TAT_THU_TUC_RA_VIEN: 50,
  DA_RA_VIEN: 100,
  HEN_DIEU_TRI: 110,
  DA_THANH_TOAN_RA_VIEN: 120,
  DA_THANH_TOAN_HEN_DIEU_TRI: 130,
  HUY_BENH_AN: 200,
};
export const DANH_SACH_LOAI_NHAP_XUAT = [
  { ten: "Hóa đơn bán thuốc", value: "120", _value: [120] },
  { ten: "Phiếu xuất", value: "40, 90", _value: [40, 90] },
  { ten: "Phiếu nhập", value: "10", _value: [10] },
];

export const ENUM = {
  KHU_VUC_BHYT: "khuVucBHYT",
  LOAI_MIEN_GIAM: "loaiMienGiam",
  LOAI_GIAY_TO: "loaiGiayTo",
  GIOI_TINH: "gioiTinh",
  DOI_TUONG: "doiTuong",
  DOI_TUONG_KCB: "doiTuongKcb",
  TRANG_THAI_DICH_VU: "trangThaiDichVu",
  TRANG_THAI_HOAN: "trangThaiHoan",
  TRANG_THAI_GOI_DV_TAM_UNG: "TrangThaiGoiDvTamUng",
  TRANG_THAI_NB_GOI_DV: "TrangThaiNbGoiDv",
  PHAN_LOAI_KET_QUA_XET_NGHIEM: "phanLoaiKetQuaXetNghiem",
  LOAI_DICH_VU_KHO: "LoaiDichVuKho",
  LOAI_PHIEU_LINH: "LoaiPhieuLinh",
  HUONG_DIEU_TRI_KHAM: "HuongDieuTriKham",
  KET_QUA_DIEU_TRI: "KetQuaDieuTri",
  TRANG_THAI_DLQT: "trangThaiDlqt",
  TRANG_THAI_QUYET_TOAN: "trangThaiQuyetToan",
  TINH_CHAT_BENH_PHAM: "tinhChatBenhPham",
  KET_QUA_XET_NGHIEM: "KetQuaXetNghiem",
  TRANG_THAI_KY: "trangThaiKy",
  CAP_HOI_CHAN: "capHoiChan",
  TIEN_LUONG: "tienLuong",
  GOI_THAU: "goiThau",
  NHOM_THAU: "nhomThau",
  MUC_DICH_SU_DUNG: "MucDichSuDungDvKho",
  LOAI_DICH_VU_THUOC_VAT_TU_HOA_CHAT: "loaiDichVuThuocVatTuHoaChat",
  LOAI_THAU: "loaiThau",
  TRANG_THAI_THAU: "trangThaiThau",
  LOAI_THUOC_THAU: "loaiThuocThau",
  LOAI_DICH_VU: "loaiDichVu",
  TRANG_THAI_NB: "trangThaiNb",
  LY_DO_TU_VONG: "lyDoTuVong",
  HUONG_DIEU_TRI_NOI_TRU: "huongDieuTriNoiTru",
  DIA_DIEM_TU_VONG: "diaDiemTuVong",
  TRANG_THAI_PHIEU_NHAP_XUAT: "TrangThaiPhieuNhapXuat",
  TINH_CHAT_KHOA: "tinhChatKhoa",
  THEO_SO_LUONG_TON_KHO: "TheoSoLuongTonKho",
  PHAN_LOAI_PTTT: "PhanLoaiPTTT",
  LOAI_MAU: "loaiMau",
  NHOM_CHI_PHI: "nhomChiPhiBh",
  DOI_TUONG_SU_DUNG: "doiTuongSuDung",
  NGUON_KHAC_CHI_TRA: "nguonKhacChiTra",
  LOAI_KET_QUA_XET_NGHIEM: "loaiKetQuaXetNghiem",
  HINH_THUC_GIAM_GIA: "hinhThucGiamGia",
  CACH_THUC_GIAM_GIA: "cachThucGiamGia",
  LOAI_AP_DUNG_GIAM_GIA: "loaiApDungGiamGia",
  LOAI_THOI_GIAN: "LoaiThoiGian",
  TIEN_TAM_UNG_CON_LAI: "TienTamUngConLai",
  TRANG_THAI_TAI_KHOA: "TrangThaiTaiKhoa",
  NHOM_MAU: "NhomMau",
  TUYEN_BENH_VIEN: "tuyenBenhVien",
  HANG_BENH_VIEN: "hangBenhVien",
  HINH_THUC_MIEN_GIAM: "hinhThucMienGiam",
  LOAI_CHUYEN_KHOA: "LoaiChuyenKhoa",
  TRANG_THAI_HOP_DONG: "TrangThaiHopDong",
  TRANG_THAI_PHIEU_LINH_SUAT_AN: "TrangThaiPhieuLinhSuatAn",
  TRE_EM_KHONG_THE: "TreEmKhongThe",
  DINH_CHI_THAI_NGHEN: "DinhChiThaiNghen",
  PHUONG_THUC_THANH_TOAN: "phuongThucTt",
  TRANG_THAI_BENH_AN: "trangThaiBenhAn",
  TRANG_THAI_VAT_TU_KY_GUI: "TrangThaiVatTuKyGui",
  AP_DUNG_THEO_THOI_GIAN: "ApDungTheoThoiGian",
  TRANG_THAI_DAY_CONG: "trangThaiDayCong",
  TRANG_THAI_NB_KSK: "trangThaiNbKsk",
  LOAI_PTTT: "LoaiPtTt",
  DINH_DANG_BAO_CAO: "dinhDangBaoCao",
  NHOM_NGUON_NGUOI_BENH: "NhomNguonNguoiBenh",
  KHU_VUC_KY: "KhuVucKy",
  LOAI_DON_THUOC: "loaiDonThuoc",
  DON_VI_TOC_DO_TRUYEN: "DonViTocDoTruyen",
  SO_NAM_LUU_TRU: "SoNamLuuTru",
  LOAI_LUU_TRU: "LoaiLuuTru",
  LOAI_PHONG: "loaiPhong",
  NHOM_THOI_GIAN_DASHBOARD: "NhomThoiGianDashboard",
  LOAI_NHAP_XUAT: "loaiNhapXuat",
  LOAI_QMS: "loaiQms",
  TRANG_THAI_HIEN_THI: "TrangThaiHienThi",
  TRANG_THAI_GPP: "TrangThaiGpp",
  KET_NOI_PASC_LIS: "KetNoiPacsLis",
  TRANG_THAI_DON_THUOC_NHA_THUOC: "TrangThaiDonThuocNhaThuoc",
  HUONG_GIAY: "HuongGiay",
  KHO_GIAY: "KhoGiay",
  LOAI_BIEU_MAU: "LoaiBieuMau",
  THOI_DIEM_CHI_DINH: "thoiDiemChiDinh",
  LOAI_DOI_TRA: "loaiDoiTra",
  TRANG_THAI_HOA_DON: "trangThaiHoaDon",
  TRANG_THAI_PHIEU_DOI_TRA: "trangThaiPhieuDoiTra",
  TRANG_THAI_TAM_UNG: "trangThaiTamUng",
};

export const HINH_THUC_MIEN_GIAM = {
  MIEN_GIAM_THEO_PHIEU_THU: 10,
};
export const TRANG_THAI_NB_GOI_DV = {
  TAO_MOI: 10,
  DANG_SU_DUNG: 20,
  HUY_SU_DUNG: 30,
  DUNG_SU_DUNG: 40,
  KET_THUC: 50,
};
export const TRANG_THAI_NB_GOI_DV_TAM_UNG = {
  THANH_TOAN: 10,
  HUY_THANH_TOAN: 20,
};

export const NHOM_NGUON_NGUOI_BENH = {
  KHACH_MOI_ONLINE: 10,
  KHACH_MOI_OFFLINE: 20,
  KHACH_MOI_TU_DEN: 30,
  KHACH_CU: 40,
  CONG_TAC_VIEN: 50,
};

export const HUONG_DIEU_TRI_KHAM = {
  CHO_VE: 10,
  HEN_KHAM: 20,
  NHAP_VIEN: 30,
  CHUYEN_VIEN: 40,
  KHONG_KHAM: 100,
};

export const KET_QUA_KHAM = {
  KHOI: 1,
  DO: 2,
  KHONG_THAY_DOI: 3,
  NANG_HON: 4,
  TU_VONG: 5,
  KHONG_DANH_GIA: 10,
};

export const HOTKEY = {
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  ESC: 27,
  TAB: 9,
};

export const LIST_PHIEU_IN_EDITOR = [
  "P037",
  "P038",
  "P039",
  "P040",
  "P041",
  "P042",
  "P043",
  "P044",
  "P073",
  "P074",
  "P056",
  "P079",
  "P077",
  "P087",
  "P088",
  "P095",
  "P062",
  "P032",
  "P090",
];

export const LIST_PHIEU_IN_POPUP = ["P092"];

export const MA_BIEU_MAU_EDITOR = {
  P037: { maBaoCao: "EMR_BA154", id: "nbDotDieuTriId" },
  P038: { maBaoCao: "EMR_BA155", id: "nbDvKhamId" },
  P039: { maBaoCao: "EMR_BA173", id: "nbDvKhamId" },
  P040: { maBaoCao: "EMR_BA156", id: "goiDvId" },
  P041: { maBaoCao: "EMR_BA153", id: "nbThongTinId" },
  P042: { maBaoCao: "EMR_BA155", id: "nbDvKhamId" },
  P043: { maBaoCao: "EMR_BA173", id: "nbDvKhamId" },
  P044: { maBaoCao: "EMR_BA098", id: "nbDotDieuTriId" },
  P073: { maBaoCao: "EMR_BA092", id: "id" },
  P074: { maBaoCao: "EMR_BA089", id: "id" },
  P056: { maBaoCao: "EMR_BA138", id: "nbDotDieuTriId" },
  P079: { maBaoCao: "EMR_BA051", id: "nbDotDieuTriId" },
  P077: { maBaoCao: "EMR_HSDD020", id: "id" },
  P087: { maBaoCao: "EMR_BA069", id: "nbDotDieuTriId" },
  P088: { maBaoCao: "EMR_BA077", id: "id" },
  P062: { maBaoCao: "EMR_BA106", id: "nbDotDieuTriId" },
  P032: { maBaoCao: "EMR_BA134", id: "nbDotDieuTriId" },
};
export const MODE_FILTER_GIUONG = {
  ALL: 1,
  EMPTY: 2,
  EXIST: 3,
};

export const KET_QUA_DIEU_TRI = {
  DO: 1,
  KHOI: 2,
  KHONG_THAY_DOI: 3,
  NANG_HON: 4,
  TU_VONG: 5,
  KHONG_DANH_GIA: 10,
};

export const HUONG_DIEU_TRI_NOI_TRU = {
  RA_VIEN: 15,
  CHUYEN_VIEN: 40,
  TRON_VIEN: 50,
  XIN_RA_VIEN: 60,
};

export const DS_TINH_CHAT_KHOA = {
  LAM_SANG: 10,
  CDHA_TDCN: 20,
  PHAU_THUAT: 30,
  CAP_CUU: 40,
  DIEU_TRI_NGOAI_TRU: 50,
  NGOAI_TRU: 60,
  NOI_TRU: 70,
  TIEP_DON: 80,
  TIEP_DON_ONLINE: 90,
};

export const DOI_TUONG_KCB = {
  NGOAI_TRU: 1,
  DIEU_TRI_NGOAI_TRU: 2,
  DIEU_TRI_NOI_TRU: 3,
  DIEU_TRI_NOI_TRU_BAN_NGAY: 4,
};

export const GIAY_IN_BIEN_BAN_HOI_CHAN = [
  {
    value: 1,
    ten: "phieuTrichBienBanHoiChan",
    path: "/trich-bien-ban",
  },
  {
    value: 2,
    ten: "giayDeNghiHoiChan",
    path: "/giay-de-nghi",
  },
  {
    value: 3,
    ten: "giayMoiHoiChan",
    path: "/giay-moi",
  },
  {
    value: 4,
    ten: "bienBanHoiChan",
    path: "/bien-ban",
  },
];
export const FORMAT_DATE_TIME = "DD/MM/YYYY HH:mm:ss";
export const LOAI_NHAP_XUAT = {
  NHAP_TU_NCC: 10,
  DU_TRU: 20,
  XUAT_CHUYEN_KHO: 30,
  XUAT_TRA_NHA_CUNG_CAP: 40,
  LINH_BU_TU_TRUC: 80,
  LINH_NOI_TRU: 85,
  XUAT_KHAC: 90,
  NB_NGOAI_TRU: 100,
  NB_NOI_TRU: 110,
  NB_TU_TRUC: 115,
  NHA_THUOC: 120,
};

export const THEO_SO_LUONG_TON_KHO = {
  CON_TON: 10,
  HET_TON: 20,
};

export const LOAI_DOI_TAC = {
  NHA_SAN_XUAT: 10,
  NHA_CUNG_CAP: 20,
  KHACH_HANG: 30,
  CONG_TY_KSK: 40,
  CONG_TY_BAO_HIEM: 50,
};

export const TEN_CO_CHE_DUYET_PHAT = {
  DUYET_PHAT_CHUNG: "DUYET_PHAT_CHUNG",
  DUYET_PHAT_NGAY_KHI_KE: "DUYET_PHAT_NGAY_KHI_KE",
  DUYET_SAU_KHO_XUAT_HUY: "DUYET_SAU_KHO_XUAT_HUY",
};

export const TEN_LOAI_DICH_VU = {
  KHAM: "KHAM",
  XET_NGHIEM: "XET_NGHIEM",
  CDHA_TDCN: "CDHA_TDCN",
  PHAU_THUAT_THU_THUAT: "PHAU_THUAT_THU_THUAT",
  SUAT_AN: "SUAT_AN",
  NGOAI_DIEU_TRI: "NGOAI_DIEU_TRI",
  VAN_CHUYEN: "VAN_CHUYEN",
  THUOC: "THUOC",
  VAT_TU: "VAT_TU",
  HOA_CHAT: "HOA_CHAT",
  CHE_PHAM_MAU: "CHE_PHAM_MAU",
  GIUONG: "GIUONG",
  BO_CHI_DINH: "BO_CHI_DINH",
  TIEP_DON: "TIEP_DON",
  NOI_TRU: "NOI_TRU",
  TO_DIEU_TRI: "TO_DIEU_TRI",
  NHA_THUOC: "NHA_THUOC",
  DAT_KHAM: "DAT_KHAM",
  CRM: "CRM",
};

export const TRANG_THAI_HOAN = {
  THUONG: 0,
  CHO_DUYET_HOAN: 10,
  CHO_DUYET_DOI: 20,
  DA_HOAN: 30,
  KHONG_THUC_HIEN: 40,
};

export const LOAI_CHUYEN_VIEN = {
  CHUYEN_VIEN: 10,
  CHUYEN_KHAM_CHUYEN_KHOA: 20,
};
export const TRANG_THAI_DO_SINH_HIEU = [
  {
    id: 10,
    ten: "Chưa đo",
  },

  {
    id: 20,
    ten: "Đã đo",
  },
];

export const LOAI_GIAY_GUI_CONG_BHXH = [
  { id: 1, ten: "CT03" },
  { id: 2, ten: "CT04" },
  { id: 3, ten: "CT05" },
  { id: 4, ten: "CT06" },
  { id: 5, ten: "CT07" },
  { id: 6, ten: "NB tử vong" },
];

export const NHOM_CHI_PHI = [
  { id: 0, ten: "Ngoài danh mục BHYT" },
  { id: 1, ten: "Xét nghiệm" },
  { id: 2, ten: "Chẩn đoán hình ảnh" },
  { id: 3, ten: "Thăm dò chức năng" },
  { id: 4, ten: "Thuốc trong danh mục BHYT" },
  { id: 5, ten: "Thuốc ngoài danh mục BHYT" },
  { id: 6, ten: "Thuốc thanh toán theo tỷ lệ" },
  { id: 7, ten: "Máu và chế phẩm máu" },
  { id: 8, ten: "Thủ thuật, phẫu thuật" },
  { id: 9, ten: "Dịch vụ kỹ thuật (DVKT) thanh toán theo tỷ lệ" },
  { id: 10, ten: "Vật tư y tế trong danh mục BHYT" },
  { id: 11, ten: "Vật tư y tế (VTYT) thanh toán theo tỷ lệ" },
  { id: 12, ten: "Vận chuyển" },
  { id: 13, ten: "Khám bệnh" },
  { id: 14, ten: "Ngày giường bệnh ban ngày" },
  { id: 15, ten: "Ngày giường bệnh điều trị nội trú, bao gồm cả giường lưu" },
];

export const LOAI_DON_THUOC = {
  NHA_THUOC: 10,
  THUOC_KHO: 20,
  KE_NGOAI: 150,
};

export const LIST_LOAI_DON_THUOC = [
  {
    id: 10,
    ten: "Thuốc nhà thuốc",
  },
  {
    id: 20,
    ten: "Thuốc Kho",
  },
  { id: 150, ten: "Thuốc kê ngoài" },
];

export const TRANG_THAI_HIEN_THI = {
  DANG_KHAM_THUC_HIEN: 10,
  TIEP_THEO: 20,
  DA_XAC_NHAN: 40,
  CHO_XÁC_NHAN: 50,
  GOI_NHO: 60,
};
