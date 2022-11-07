import auth from "./auth";
import application from "./application";
import address from "./address";
import toaNha from "./toaNha";
import vanBang from "./categories/vanBang";
import tiepDon from "./tiepDon";
import quayTiepDon from "./categories/quayTiepDon";
import utils from "./utils";
import danToc from "./categories/danToc";
import ngheNghiep from "./ngheNghiep";
import moiQuanHe from "./categories/moiQuanHe";
import lyDoDoiTra from "./categories/lyDoDoiTra";
import lyDoTamUng from "./categories/lyDoTamUng";
import benhPham from "./categories/benhPham";
import chuyenKhoa from "./categories/chuyenKhoa";
import goiSo from "./goiSo";
import tiepDonDichVu from "./tiepDonDichVu";
import danhSachNbTiepDon from "./tiepDon/danhSachNbTiepDon";
import danhSachNbKSK from "./tiepDon/danhSachNbKSK";
import danhSachNbHuyTiepDon from "./tiepDon/danhSachNbHuyTiepDon";
import ngoaiVien from "./tiepDon/ngoaiVien";
import danhSachDichVuNbTiepDon from "./tiepDon/danhSachDichVuNbTiepDon";
import dashboardCDHA from "./tiepDon/dashboardCDHA";

// cetegories
import mauKetQuaXN from "./categories/mauKetQuaXN";
import mauKetQuaPTTT from "./categories/mauKetQuaPTTT";
import phuongThucTT from "./categories/phuongThucTT";
import dichVu from "./categories/dichVu";
import loaiCapCuu from "./categories/loaiCapCuu";
import nguyenNhanNhapVien from "./categories/nguyenNhanNhapVien";
import thoiGianCapCuu from "./categories/thoiGianCapCuu";
import nhomChiSo from "./categories/nhomChiSo";
import viTriChanThuong from "./categories/viTriChanThuong";
import nhomVatTu from "./categories/nhomVatTu";
import nhomHoatChat from "./categories/nhomVatTu/nhomHoatChat";
import phuongPhapGayMe from "./categories/phuongPhapGayMe";
import phuongPhapNhuom from "./categories/phuongPhapNhuom";
import viTriSinhThiet from "./categories/viTriSinhThiet";
import hocHamHocVi from "./categories/hocHamHocVi";
import loaiBenhAn from "./categories/loaiBenhAn";
import theBaoHiem from "./categories/theBaoHiem";
import goiDichVu from "./categories/goiDichVu";
import doiTac from "./categories/doiTac";
import goiDichVuChiTiet from "./categories/goiDichVuChiTiet";
import noiLayBenhPham from "./categories/noiLayBenhPham";

import danhMucThuoc from "./categories/danhMucThuoc";
import lieuDungThuoc from "./categories/danhMucThuoc/lieuDungThuoc";
import danhMucVatTu from "./categories/danhMucVatTu";
import kichCo from "./categories/kichCo";
import khoaChiDinhDichVu from "./categories/goiDichVu/khoaChiDinhDichVu";
import baoCao from "./categories/baoCao";
import mayIn from "./categories/mayIn";
import dichVuKemTheo from "./categories/dichVuKemTheo";
import chiSoCon from "./categories/chiSoCon";
import mauKetQua from "./categories/goiDichVu/mauKetQua";
import mauDienBien from "./categories/mauDienBien";
import chiSoSong from "./categories/chiSoSong";
import ngayNghiLe from "./categories/ngayNghiLe";
import nhanVien from "./categories/nhanVien";
import hauQuaTuongTac from "./categories/hauQuaTuongTac";
import dacTinhDuocLy from "./categories/dacTinhDuocLy";
import mucDoTuongTac from "./categories/mucDoTuongTac";
import tuongTacThuoc from "./categories/tuongTacThuoc";
import mucDichSuDung from "./categories/mucDichSuDung";

import benhVien from "./categories/benhVien";
import loaGoiSo from "./categories/loaGoiSo";
import loiDan from "./categories/loiDan";
import khoa from "./categories/khoa";
import lieuDung from "./categories/lieuDung";
import nhomChiPhi from "./categories/nhomChiPhi";
import duongDung from "./categories/duongDung";
import maMay from "./categories/maMay";
import hoatChat from "./categories/hoatChat";
import nhaSanXuat from "./categories/nhaSanXuat";
import dichVuTongHop from "./categories/nhomDichVu/All";
import nhomDichVuCap1 from "./categories/nhomDichVu/Level1";
import nhomDichVuCap2 from "./categories/nhomDichVu/Level2";
import nhomDichVuCap3 from "./categories/nhomDichVu/Level3";
import donVi from "./categories/donVi";
import chucVu from "./categories/chucVu";
import quanHam from "./categories/quanHam";
import nguoiDaiDien from "./categories/nguoiDaiDien";
import phong from "./categories/phong";
import donViTinh from "./categories/donViTinh";
import phanLoaiThuoc from "./categories/phanLoaiThuoc";
import phanNhomDichVuKho from "./categories/phanNhomDichVuKho";
import nhomDichVuKho from "./categories/nhomDichVuKho";
import dichVuKho from "./categories/dichVuKho";
import chuongBenh from "./categories/chuongBenh";
import nhomBenh from "./categories/nhomBenh";
import loaiBenh from "./categories/loaiBenh";
import maBenh from "./categories/maBenh";
import ttHanhChinh from "./categories/ttHanhChinh";
import phongThucHien from "./categories/phongThucHien";
import tuyChonGia from "./categories/tuyChonGia";
import loaiDoiTuong from "./categories/loaiDoiTuong";
import loaiDoiTuongLoaiHinhTT from "./categories/loaiDoiTuongLoaiHinhTT";
import xaTongHop from "./xaTongHop";
import huyenTongHop from "./huyenTongHop";
import nhomTinhNang from "./categories/nhomTinhNang";
import quyen from "./categories/quyen";

import dichVuKyThuat from "./categories/dichVuKyThuat";
import chiPhiHapSay from "./categories/chiPhiHapSay";
import chiPhiHapSayVTYT from "./categories/chiPhiHapSayVTYT";

import hinhThucNhapXuat from "./categories/hinhThucNhapXuat";

import nguoiGioiThieu from "./categories/nguoiGioiThieu";
import nguonNguoiBenh from "./categories/nguonNguoiBenh";
import xuatXu from "./categories/xuatXu";
import thangSoBanLe from "./categories/thangSoBanLe";
import thietLapTichDiem from "./categories/thietLapTichDiem";
import template from "./categories/templateQms";

import thuocKeNgoai from "./categories/thuocKeNgoai";
import thuocKeNgoaiLieuDung from "./categories/thuocKeNgoaiLieuDung";
import danhMucHoaChat from "./categories/danhMucHoaChat";
import loaiBuaAn from "./categories/loaiBuaAn";
import dichVuAn from "./categories/dichVuAn";
import loaiHinhThanhToan from "./categories/loaiHinhThanhToan";
import phanLoaiBmi from "./categories/phanLoaiBmi";

import kios from "./kios";
import thuNgan from "./thuNgan";
import danhSachPhieuThu from "./thuNgan/danhSachPhieuThu";
import danhSachDichVu from "./thuNgan/danhSachDichVu";
import nbDotDieuTri from "./nbDotDieuTri";
import danhSachPhieuYeuCauHoan from "./thuNgan/danhSachPhieuYeuCauHoan";
import dsHoaDonDienTu from "./thuNgan/dsHoaDonDienTu";
import quanLyTamUng from "./thuNgan/quanLyTamUng";
import thuTamUng from "./thuNgan/thuTamUng";
import deNghiTamUng from "./thuNgan/deNghiTamUng";
import hoanTamUng from "./thuNgan/hoanTamUng";
import huyTamUng from "./thuNgan/huyTamUng";

import layMauXN from "./xetNghiem/layMauXN";
import xetNghiem from "./xetNghiem";
import nbXetNghiem from "./xetNghiem/nbXetNghiem";
import xnHuyetHocSinhHoa from "./xetNghiem/xnHuyetHocSinhHoa";
import xnGiaiPhauBenhViSinh from "./xetNghiem/xnGiaiPhauBenhViSinh";
import boChiDinh from "./categories/boChiDinh";
import boChiDinhChiTiet from "./categories/boChiDinhChiTiet";
import chuongTrinhGiamGia from "./categories/chuongTrinhGiamGia";
import maGiamGia from "./categories/maGiamGia";
import hangThe from "./categories/hangThe";
import quyenKy from "./categories/quyenKy";
import loaiPhieu from "./categories/loaiPhieu";
import thietLapHangDoi from "./categories/thietLapHangDoi";
import kiosk from "./categories/kiosk";
import thietLapPhieuIn from "./categories/thietLapPhieuIn";
import hdsd from "./categories/huongDanSuDung";
import mauKetQuaCDHA from "./categories/mauKetQuaCDHA";
import hoiDongKiemKe from "./categories/hoiDongKiemKe";
import hoiDongChiTiet from "./categories/hoiDongChiTiet";
import chiNhanh from "./categories/chiNhanh";
import donViYTe from "./categories/donViYTe";
import loaiGiuong from "./categories/loaiGiuong";
import soHieuGiuong from "./categories/soHieuGiuong";
import dichVuGiuong from "./categories/dichVuGiuong";
import bacSiNgoaiVien from "./categories/bacSiNgoaiVien";
import nbPhieuLinhSuatAn from "./categories/nbPhieuLinhSuatAn";
import cheDoChamSoc from "./categories/cheDoChamSoc";
import goiDV from "./categories/goiDV";
import goiDVChiTiet from "./categories/goiDVChiTiet";
import khoaChiDinh from "./categories/goiDV/khoaChiDinh";

// khamBenh
import khamBenh from "./khamBenh";
import nbKhamBenh from "./khamBenh/nbKhamBenh";
import chiDinhKhamBenh from "./khamBenh/chiDinhKhamBenh";
import ketQuaKham from "./khamBenh/ketQuaKham";
import nbDichVuKhamKSK from "./khamBenh/nbDichVuKhamKSK";
import nbBoChiDinh from "./khamBenh/nbBoChiDinh";

import thietLap from "./categories/thietLap";
import adminVaiTroHeThong from "./admin/vaiTroHeThong";
import adminTaiKhoanHeThong from "./admin/taiKhoanHeThong";

// thongBao
import thongBao from "./thongBao";

import tachGopPhieuXN from "./categories/tachGopPhieuXN";

import tachGopPhieuDVKT from "./categories/tachGopPhieuDVKT";

import nguonNhapKho from "./categories/nguonNhapKho";

//kho
import kho from "./kho";
import phieuNhapXuat from "./kho/phieuNhapXuat";
import thietLapChonKho from "./kho/thietLapChonKho";
import quanTriKho from "./kho/quanTriKho";
import quyetDinhThau from "./kho/quyetDinhThau";
import quyetDinhThauChiTiet from "./kho/quyetDinhThauChiTiet";
import tonKho from "./kho/tonKho";
import phieuNhapDuTru from "./kho/phieuNhapDuTru";
import nhapKho from "./kho/nhapKho";
import phieuXuat from "./kho/phieuXuat";
import nhapKhoChiTiet from "./kho/nhapKhoChiTiet";
import danhSachDichVuKho from "./kho/danhSachDichVuKho";
import danhSachDichVuKhoChiTiet from "./kho/danhSachDichVuKho/danhSachDichVuKhoChiTiet";
import themMoiThuoc from "./kho/themMoiThuoc";
import thuocChiTiet from "./kho/thuocChiTiet";
import thuocKho from "./kho/thuocKho";
import nhanVienKho from "./kho/nhanVienKho";
import phatThuocNgoaiTru from "./kho/phatThuocNgoaiTru";
import nbDvKho from "./kho/nbDvKho";

import dsBenhNhan from "./chanDoanHinhAnh/dsBenhNhan";
import choTiepDonDV from "./chanDoanHinhAnh/choTiepDonDV";
import chanDoanHinhAnh from "./chanDoanHinhAnh";
import information from "./information";
import chiDinhDichVuCls from "./chanDoanHinhAnh/chiDinhDichVuCls";
import chiDinhDichVuKho from "./khamBenh/chiDinhDichVuKho";

import hoSoBenhAn from "./hoSoBenhAn";
import dsDichVuKyThuat from "./hoSoBenhAn/dsDichVuKyThuat";
import dsThuoc from "./hoSoBenhAn/dsThuoc";
import dsVatTu from "./hoSoBenhAn/dsVatTu";
import dsLuuTruBa from "./hoSoBenhAn/dsLuuTruBa";

//theo dõi người bệnh
import chiTietTheoDoiNguoiBenh from "./theoDoiNguoiBenh/DanhSachNguoiBenh/ChiTietTheoDoiNguoiBenh";
import danhSachCovid from "./theoDoiNguoiBenh/DanhSachNguoiBenh/DanhSachNguoiBenh";
import nbDocThuocCovid from "./theoDoiNguoiBenh/DanhSachNguoiBenh/NbDonThuocCovid";

//ký số
import thietLapQuyenKy from "./kySo/thietLapQuyenKy";
import phanQuyenThietLapQuyenKy from "./kySo/thietLapQuyenKy/phanQuyenThietLapQuyenKy";
import lichSuKyDanhSachNguoiBenh from "./kySo/lichSuKy/lichSuKyDanhSachNguoiBenh";
import lichSuKyDanhSachPhieu from "./kySo/lichSuKy/lichSuKyDanhSachPhieu";
import lichSuKyLichSuPhieu from "./kySo/lichSuKy/lichSuKyLichSuPhieu";
import danhSachPhieuChoKy from "./kySo/danhSachPhieuChoKy";
import qms from "./qms";

// báo cáo đã in

import baoCaoDaIn from "./baoCaoDaIn";
import phimTat from "./phimTat";

import chiDinhDichVuTuTruc from "./chanDoanHinhAnh/chiDinhDichVuTuTruc";
import nbDvHoan from "./chanDoanHinhAnh/nbDvHoan";
import chiDinhDichVuVatTu from "./chanDoanHinhAnh/chiDinhDichVuVatTu";

//quyết toán BHYT
import danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT from "./quyetToanBHYT/danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT";
import danhSachHoSoBaoHiem79A46QD4201 from "./quyetToanBHYT/danhSachHoSoBaoHiem79A46QD4201";
import danhSachHoSoBaoHiem79A46QD4201Xml2 from "./quyetToanBHYT/danhSachHoSoBaoHiem79A46QD4201/xml2";
import danhSachHoSoBaoHiem79A46QD4201Xml3 from "./quyetToanBHYT/danhSachHoSoBaoHiem79A46QD4201/xml3";
import danhSachHoSoBaoHiem79A46QD4201Xml4 from "./quyetToanBHYT/danhSachHoSoBaoHiem79A46QD4201/xml4";
import danhSachHoSoBaoHiem79A46QD4201Xml5 from "./quyetToanBHYT/danhSachHoSoBaoHiem79A46QD4201/xml5";

//pacs
import pacs from "./chanDoanHinhAnh/pacs";
import nbHoSo from "./nbHoSo";
import phieuIn from "./phieuIn";

// quản lí nội trú
import quanLyNoiTru from "./quanLyNoiTru"; // lập bệnh án
import danhSachNguoiBenhNoiTru from "./quanLyNoiTru/danhSachNguoiBenhNoiTru";
import nbChuyenKhoa from "./quanLyNoiTru/nbChuyenKhoa";
import nbChuyenVien from "./quanLyNoiTru/nbChuyenVien";
import toDieuTri from "./quanLyNoiTru/toDieuTri";
import nbDieuTriSoKet from "./quanLyNoiTru/nbDieuTriSoKet";
import dvNgoaiTru from "./quanLyNoiTru/dvNgoaiTru";
import dvNoiTru from "./quanLyNoiTru/dvNoiTru";
import dvNgoaiDieuTri from "./quanLyNoiTru/dvNgoaiDieuTri";
import noiTruPhongGiuong from "./quanLyNoiTru/noiTruPhongGiuong";
import soDoPhongGiuong from "./quanLyNoiTru/soDoPhongGiuong";
import nbBienBanHoiChan from "./quanLyNoiTru/nbBienBanHoiChan";
import phanPhongGiuong from "./quanLyNoiTru/phanPhongGiuong";
import giaHanTheChuyenDoiTuong from "./quanLyNoiTru/giaHanTheChuyenDoiTuong";
import vitalSigns from "./quanLyNoiTru/vitalSigns";
import vitalSignsCommon from "./quanLyNoiTru/vitalSignsCommon";
import traHangHoa from "./quanLyNoiTru/traHangHoa";

//ksk
import khamSucKhoe from "./khamSucKhoe";
import dichVuKSK from "./khamSucKhoe/dichVuKSK";
import hopDongKSK from "./khamSucKhoe/hopDongKSK";
import nbKSK from "./khamSucKhoe/nbKSK";
//editor
import config from "./editor/config";
import component from "./editor/component";
import documents from "./editor/documents";
import files from "./editor/files";
import signer from "./signer";
//nhaThuoc
import lienThongGpp from "./nhaThuoc/lienThongGpp";

//goiDichVu
import nbGoiDv from "./nbGoiDv";
import nbThongTin from "./nbThongTin";
import dichVuDaSuDung from "./nbGoiDv/dichVuDaSuDung";
import thanhToanGoi from "./nbGoiDv/thanhToanGoi";
import dichVuTrongGoi from "./nbGoiDv/dichVuTrongGoi";
import chiDinhDvGoi from "./nbGoiDv/chiDinhDvGoi";
// pttt
import pttt from "./pttt";
import chiDinhDichVuThuoc from "./chiDinhDichVu/dichVuThuoc";
import chiDinhVatTu from "./chiDinhDichVu/dichVuVatTu";
import chiDinhSuatAn from "./chiDinhDichVu/dichVuSuatAn";
import chiDinhNgoaiDieuTri from "./chiDinhDichVu/dichVuNgoaiDieuTri";
import chiDinhGoiPTTT from "./chiDinhDichVu/goiPTTT";
import chiDinhHoaChat from "./chiDinhDichVu/dichVuHoaChat";

// giấy đẩy cổng
import giayNghiHuong from "./giayDayCong/giayNghiHuong";
import nbTuVong from "./giayDayCong/nbTuVong";
import nbRaVien from "./giayDayCong/nbRaVien";

//gói phẫu thuật thủ thuật
import goiPttt from "./categories/goiPttt";
import goiPtttChiTiet from "./categories/goiPtttChiTiet";
//sinh hiệu
import sinhHieu from "./sinhHieu";
import vatTuKyGui from "./kho/vatTuKyGui";

//dashboard
import soLieuBenhVien from "./dashboard/soLieuBenhVien";

import nbTheNb from "./nbTheNB/nbTheNb";
import nbTheNbHuy from "./nbTheNB/nbTheNbHuy";

export {
  soLieuBenhVien,
  application,
  dichVuKyThuat,
  chiPhiHapSay,
  chiPhiHapSayVTYT,
  dichVuTongHop,
  xaTongHop,
  huyenTongHop,
  kho,
  dichVuKemTheo,
  chiSoCon,
  dichVu,
  dichVuKho,
  phongThucHien,
  tuyChonGia,
  ttHanhChinh,
  nhomHoatChat,
  maBenh,
  loaiBenh,
  nhomBenh,
  chuongBenh,
  phanLoaiThuoc,
  nhomDichVuCap1,
  nhomDichVuCap2,
  nhomDichVuCap3,
  nhaSanXuat,
  hoatChat,
  maMay,
  duongDung,
  lieuDung,
  nhomChiPhi,
  loiDan,
  toaNha,
  vanBang,
  auth,
  address,
  tiepDon,
  quayTiepDon,
  utils,
  loaiDoiTuong,
  danToc,
  ngheNghiep,
  moiQuanHe,
  phong,
  goiSo,
  tiepDonDichVu,
  danhSachNbTiepDon,
  danhSachNbKSK,
  danhSachNbHuyTiepDon,
  danhSachDichVuNbTiepDon,
  dashboardCDHA,
  // categries
  loaiDoiTuongLoaiHinhTT,
  phuongThucTT,
  mauKetQuaXN,
  mauKetQuaPTTT,
  loaiCapCuu,
  thoiGianCapCuu,
  nguyenNhanNhapVien,
  benhVien,
  viTriChanThuong,
  nhomVatTu,
  loaGoiSo,
  khoa,
  donVi,
  chucVu,
  quanHam,
  phuongPhapGayMe,
  phuongPhapNhuom,
  viTriSinhThiet,
  hocHamHocVi,
  theBaoHiem,
  nguoiDaiDien,
  information,
  loaiBenhAn,
  lyDoDoiTra,
  lyDoTamUng,
  benhPham,
  chuyenKhoa,
  donViTinh,
  phanNhomDichVuKho,
  nhomDichVuKho,
  goiDV,
  goiDVChiTiet,
  khoaChiDinh,
  goiDichVu,
  goiDichVuChiTiet,
  doiTac,
  nhomChiSo,
  noiLayBenhPham,
  boChiDinh,
  boChiDinhChiTiet,
  chuongTrinhGiamGia,
  maGiamGia,
  hangThe,
  quyenKy,
  loaiPhieu,
  hdsd,
  hoiDongKiemKe,
  hoiDongChiTiet,
  nbPhieuLinhSuatAn,
  cheDoChamSoc,
  dichVuAn,
  loaiHinhThanhToan,
  // danh-muc/thuoc
  danhMucThuoc,
  lieuDungThuoc,
  // danh-muc/vat-tu
  danhMucVatTu,
  kichCo,
  khoaChiDinhDichVu,
  baoCao,
  mayIn,
  mauKetQua,
  mauDienBien,
  chiSoSong,
  phanLoaiBmi,
  ngayNghiLe,
  nhomTinhNang,
  quyen,
  thietLapHangDoi,
  // danh-muc/nguon-gioi-thieu
  nguoiGioiThieu,
  nguonNguoiBenh,
  xuatXu,
  thangSoBanLe,
  thietLapTichDiem,
  thuocKeNgoai,
  thuocKeNgoaiLieuDung,
  danhMucHoaChat,
  // danh-muc/don-vi-chi-nhanh
  chiNhanh,
  donViYTe,
  loaiGiuong,
  soHieuGiuong,
  dichVuGiuong,
  bacSiNgoaiVien,
  // Kios
  kios,
  thuNgan,
  danhSachPhieuThu,
  danhSachDichVu,
  nbDotDieuTri,
  danhSachPhieuYeuCauHoan,
  dsHoaDonDienTu,
  quanLyTamUng,
  thuTamUng,
  deNghiTamUng,
  hoanTamUng,
  huyTamUng,
  // Config
  thietLap,
  adminVaiTroHeThong,
  adminTaiKhoanHeThong,
  // XN
  layMauXN,
  xnHuyetHocSinhHoa,
  xnGiaiPhauBenhViSinh,
  xetNghiem,
  nbXetNghiem,
  // kham Benh
  khamBenh,
  nbKhamBenh,
  chiDinhKhamBenh,
  ketQuaKham,
  nbDichVuKhamKSK,
  nbBoChiDinh,
  //Nhan vien
  nhanVien,
  thongBao,
  hinhThucNhapXuat,
  tachGopPhieuXN,
  tachGopPhieuDVKT,
  nguonNhapKho,
  //Kho
  thietLapChonKho,
  quanTriKho,
  quyetDinhThau,
  quyetDinhThauChiTiet,
  nhapKho,
  phieuXuat,
  nhapKhoChiTiet,
  danhSachDichVuKho,
  danhSachDichVuKhoChiTiet,
  tonKho,
  phieuNhapDuTru,
  themMoiThuoc,
  thuocKho,
  phieuNhapXuat,
  nhanVienKho,
  phatThuocNgoaiTru,
  nbDvKho,
  //CDHA
  dsBenhNhan,
  choTiepDonDV,
  chanDoanHinhAnh,
  chiDinhDichVuCls,
  chiDinhDichVuKho,
  thuocChiTiet,
  hoSoBenhAn,
  dsDichVuKyThuat,
  dsThuoc,
  dsVatTu,
  dsLuuTruBa,
  //chi tiết theo dõi người bệnh
  chiTietTheoDoiNguoiBenh,
  danhSachCovid,
  nbDocThuocCovid,
  //Ký số
  thietLapQuyenKy,
  phanQuyenThietLapQuyenKy,
  lichSuKyDanhSachNguoiBenh,
  danhSachPhieuChoKy,
  lichSuKyDanhSachPhieu,
  lichSuKyLichSuPhieu,
  kiosk,
  qms,
  template,
  thietLapPhieuIn,
  // báo cáo đã in
  baoCaoDaIn,
  phimTat,
  chiDinhDichVuTuTruc,
  nbDvHoan,
  chiDinhDichVuVatTu,
  mauKetQuaCDHA,
  //quyết toán BHYT
  danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT,
  danhSachHoSoBaoHiem79A46QD4201,
  danhSachHoSoBaoHiem79A46QD4201Xml2,
  danhSachHoSoBaoHiem79A46QD4201Xml3,
  danhSachHoSoBaoHiem79A46QD4201Xml4,
  danhSachHoSoBaoHiem79A46QD4201Xml5,
  pacs,
  nbHoSo,
  phieuIn,
  ngoaiVien,
  //nội trú
  quanLyNoiTru,
  danhSachNguoiBenhNoiTru,
  nbChuyenKhoa,
  nbChuyenVien,
  traHangHoa,
  toDieuTri,
  nbDieuTriSoKet,
  dvNgoaiTru,
  dvNoiTru,
  dvNgoaiDieuTri,
  noiTruPhongGiuong,
  soDoPhongGiuong,
  nbBienBanHoiChan,
  phanPhongGiuong,
  giaHanTheChuyenDoiTuong,
  vitalSigns,
  vitalSignsCommon,
  //kham suc khoe
  khamSucKhoe,
  dichVuKSK,
  hopDongKSK,
  nbKSK,
  //editor
  config,
  component,
  documents,
  files,
  signer,
  //nha thuoc
  lienThongGpp,
  //pttt
  pttt,
  //goiDv
  nbGoiDv,
  dichVuDaSuDung,
  nbThongTin,
  thanhToanGoi,
  dichVuTrongGoi,
  chiDinhDvGoi,
  //
  chiDinhDichVuThuoc,
  chiDinhVatTu,
  chiDinhSuatAn,
  chiDinhGoiPTTT,
  chiDinhHoaChat,
  chiDinhNgoaiDieuTri,
  loaiBuaAn,
  //giấy đẩy cổng
  giayNghiHuong,
  nbTuVong,
  nbRaVien,
  //gói pttt
  goiPttt,
  goiPtttChiTiet,
  //sinh hiệu
  sinhHieu,
  hauQuaTuongTac,
  dacTinhDuocLy,
  mucDoTuongTac,
  tuongTacThuoc,
  vatTuKyGui,
  mucDichSuDung,
  nbTheNb,
  nbTheNbHuy,
};
