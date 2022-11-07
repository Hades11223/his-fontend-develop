import React, { Suspense } from "react";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import { Fallback } from "components";

const Page =
  (Component, roles = []) =>
  (props) => {
    return (
      <Suspense fallback={<Fallback />}>
        <AuthWrapper accessRoles={roles} isCheckRoute>
          <Component {...props} />
        </AuthWrapper>
      </Suspense>
    );
  };

// Page home
const SubPageHome = React.lazy(() => import("./home/subPage/Home"));
const SubPageDanhMuc = React.lazy(() => import("./home/subPage/DanhMuc"));
const SubPageXetNghiem = React.lazy(() => import("./home/subPage/XetNghiem"));
const SubPageThuNgan = React.lazy(() => import("./home/subPage/ThuNgan"));
const SubPageQuanTri = React.lazy(() => import("./home/subPage/QuanTri"));
const SubPageThietLap = React.lazy(() => import("./home/subPage/ThietLap"));
const SubPageKho = React.lazy(() => import("./home/subPage/Kho"));
const SubPageCDHA = React.lazy(() => import("./home/subPage/CDHA"));
const SubPageHSBA = React.lazy(() => import("./home/subPage/HSBA"));
const SubPageTDDT = React.lazy(() => import("./home/subPage/TheoDoiDieuTri"));
const SubPageKySo = React.lazy(() => import("./home/subPage/KySo"));
const SubPageBaoCao = React.lazy(() => import("./home/subPage/BaoCao"));
const SubPageQuyetToanBHYT = React.lazy(() =>
  import("./home/subPage/QuyetToanBHYT")
);

const SubPageQuanLyNoiTru = React.lazy(() =>
  import("./home/subPage/QuanLyNoiTru")
);
const SubPageTiepDon = React.lazy(() => import("./home/subPage/TiepDon"));
const SubPageKhamSucKhoe = React.lazy(() =>
  import("./home/subPage/KhamSucKhoe")
);
const SubPageGoiDichVu = React.lazy(() => import("./home/subPage/GoiDichVu"));
const SubPageNhaThuoc = React.lazy(() => import("./home/subPage/NhaThuoc"));
const SubPagePhauThuatThuThuat = React.lazy(() =>
  import("./home/subPage/PhauThuatThuThuat")
);
const SubPageGiayDayCong = React.lazy(() =>
  import("./home/subPage/GiayDayCong")
);
const SubPageSinhHieu = React.lazy(() => import("./home/subPage/SinhHieu"));

// Login
const Login = React.lazy(() => import("./login"));

//tiếp đón
const QuanLyTiepDon = React.lazy(() => import("./tiepDon"));
const KeDichVu = React.lazy(() => import("./tiepDon/KeDichVuKham"));
const TiepDon = React.lazy(() => import("./tiepDon/TiepDon"));
const DanhSachNBTiepDon = React.lazy(() =>
  import("./tiepDon/DanhSachNB/DaTiepDon")
);
const DanhSachNBHuyTiepDon = React.lazy(() =>
  import("./tiepDon/DanhSachNB/HuyTiepDon")
);
const ChiTietNbDaTiepDon = React.lazy(() =>
  import("./tiepDon/DanhSachNB/DaTiepDon/ChiTietNbDaTiepDon")
);

//
const Guide = React.lazy(() => import("./guide"));
// kham benh
const KhamBenh = React.lazy(() => import("./khamBenh"));

// danh muc
const DanhMuc = React.lazy(() => import("./danhMuc"));
const LoaiCapCuu = React.lazy(() => import("./danhMuc2/loaiCapCuu"));
const HangThe = React.lazy(() => import("./danhMuc2/hangThe"));
const NguyenNhanNhapVien = React.lazy(() =>
  import("./danhMuc2/nguyenNhanNhapVien")
);
const NhomHoaChat = React.lazy(() => import("./danhMuc2/nhomHoaChat"));
const ViTriChanThuong = React.lazy(() => import("./danhMuc2/viTriChanThuong"));
const ThoiGianCapCuu = React.lazy(() => import("./danhMuc2/thoiGianCapCuu"));
const QuanHam = React.lazy(() => import("./danhMuc2/quanHam"));
const Unit = React.lazy(() => import("./danhMuc2/donVi"));
const LoaiBenhAn = React.lazy(() => import("./danhMuc2/loaiBenhAn"));
const PhuongPhapGayMe = React.lazy(() => import("./danhMuc2/phuongPhapGayMe"));
const NhomVatTu = React.lazy(() => import("./danhMuc2/nhomVatTu"));
const PhuongPhapNhuom = React.lazy(() => import("./danhMuc2/phuongPhapNhuom"));
const ViTriSinhThiet = React.lazy(() => import("./danhMuc2/viTriSinhThiet"));
const LoaiDoiTuong = React.lazy(() => import("./danhMuc2/loaiDoiTuong"));
const NhomChiSo = React.lazy(() => import("./danhMuc2/nhomChiSo"));
const HocHamHocVi = React.lazy(() => import("./danhMuc2/hocHamHocVi"));
const TheBaoHiem = React.lazy(() => import("./danhMuc2/theBaoHiem"));
const NguoiDaiDien = React.lazy(() => import("./danhMuc2/nguoiDaiDien"));
const BenhVien = React.lazy(() => import("./danhMuc2/benhVien"));
const DonViTinh = React.lazy(() => import("./danhMuc/donViTinh"));
const ThietLap = React.lazy(() => import("./danhMuc/thietLap"));
const PhanNhomDichVuKho = React.lazy(() =>
  import("./danhMuc2/phanNhomDichVuKho")
);
const ChiSoSong = React.lazy(() => import("./danhMuc2/chiSoSong"));
const NgayNghiLe = React.lazy(() => import("./danhMuc2/ngayNghiLe"));
const GroupMedicineByLevel = React.lazy(() =>
  import("./danhMuc/nhomDichVuKho")
);
// const ServicesPack = React.lazy(() => import("./danhMuc/goiDichVu"));
const canLamSang = React.lazy(() => import("./danhMuc/canLamSang"));
const MauKetQuaXN = React.lazy(() => import("./danhMuc/mauKetQuaXN"));
const dichVuXetNghiem = React.lazy(() => import("./danhMuc/dichVuXetNghiem"));
// const DrugCategories = React.lazy(() => import("./danhMuc/drugCategories"));
const GoiDichVu = React.lazy(() => import("./danhMuc/goiDichVu"));
const DmGoiDichVu = React.lazy(() => import("./danhMuc2/goiDichVu"));
const DoiTac = React.lazy(() => import("./danhMuc/doiTac"));
const DanhMucThuoc = React.lazy(() => import("./danhMuc/danhMucThuoc"));
const DanhMucVatTu = React.lazy(() => import("./danhMuc/danhMucVatTu"));
const DanhMucKhamBenh = React.lazy(() => import("./danhMuc/khamBenh"));
const PhauThuat = React.lazy(() => import("./danhMuc/phauThuat"));
const DMBaoCao = React.lazy(() => import("./danhMuc/baoCao"));
const MayIn = React.lazy(() => import("./danhMuc/mayIn"));
const Quyen = React.lazy(() => import("./danhMuc/quyen"));
const NhomTinhNang = React.lazy(() => import("./danhMuc/nhomTinhNang"));
const NguonGioiThieu = React.lazy(() => import("./danhMuc/nguonGioiThieu"));
const TichDiem = React.lazy(() => import("./danhMuc/thietLapTichDiem"));
const QuyenKy = React.lazy(() => import("./danhMuc/quyenKy"));
const LoaiPhieu = React.lazy(() => import("./danhMuc2/loaiPhieu"));
const MauQms = React.lazy(() => import("./danhMuc2/mauQms"));
const PhuongThucTT = React.lazy(() => import("./danhMuc2/phuongThucTT"));
const ChePhamMau = React.lazy(() => import("./danhMuc/chePhamMau"));
const DiaChiHanhChinh = React.lazy(() => import("./danhMuc/diaChiHanhChinh"));
const NhomBenh = React.lazy(() => import("./danhMuc/nhomBenh"));
const HoaChat = React.lazy(() => import("./danhMuc/hoaChat"));
const NhomDichVu = React.lazy(() => import("./danhMuc/nhomDichVu"));
const GoiPtTt = React.lazy(() => import("./danhMuc/goiPtTt"));
const Phong = React.lazy(() => import("./danhMuc2/phong"));
const PhanLoaiThuoc = React.lazy(() => import("./danhMuc2/phanLoaiThuoc"));
const Faculty = React.lazy(() => import("./danhMuc2/khoa"));
const NhaSanXuat = React.lazy(() => import("./danhMuc3/nhaSanXuat"));
const MaMay = React.lazy(() => import("./danhMuc2/maMay"));
const HoatChat = React.lazy(() => import("./danhMuc2/hoatChat"));
const DuongDung = React.lazy(() => import("./danhMuc2/duongDung"));
const LieuDung = React.lazy(() => import("./danhMuc2/lieuDung"));
const NhomChiPhi = React.lazy(() => import("./danhMuc2/nhomChiPhi"));
const ToaNha = React.lazy(() => import("./danhMuc2/toaNha"));
const LoiDan = React.lazy(() => import("./danhMuc2/loiDan"));
const DanToc = React.lazy(() => import("./danhMuc2/danToc"));
const VanBang = React.lazy(() => import("./danhMuc2/vanBang"));
const LoaGoiSo = React.lazy(() => import("./danhMuc2/loaGoiSo"));
const NgheNghiep = React.lazy(() => import("./danhMuc2/ngheNghiep"));
const ChucVu = React.lazy(() => import("./danhMuc2/chucVu"));
const MoiQuanHe = React.lazy(() => import("./danhMuc2/moiQuanHe"));
const LyDoDoiTra = React.lazy(() => import("./danhMuc2/lyDoDoiTra"));
const LoaiBuaAn = React.lazy(() => import("./danhMuc2/loaiBuaAn"));
const DichVuAn = React.lazy(() => import("./danhMuc2/dichVuAn"));
const LyDoTamUng = React.lazy(() => import("./danhMuc2/lyDoTamUng"));
const MauDienBien = React.lazy(() => import("./danhMuc2/mauDienBien"));
const BenhPham = React.lazy(() => import("./danhMuc2/benhPham"));
const Specialist = React.lazy(() => import("./danhMuc2/chuyenKhoa"));
const QuayTiepDon = React.lazy(() => import("./danhMuc2/quayTiepDon"));
const NoiLayBenhPham = React.lazy(() => import("./danhMuc2/noiLayBenhPham"));
const NhanVien = React.lazy(() => import("./danhMuc/nhanVien"));
const HinhThucNhapXuat = React.lazy(() =>
  import("./danhMuc2/hinhThucNhapXuat")
);
const ThuocKeNgoai = React.lazy(() => import("./danhMuc/thuocKeNgoai"));
const ChuongTrinhGiamGia = React.lazy(() =>
  import("./danhMuc/chuongTrinhGiamGia")
);
const XuatXu = React.lazy(() => import("./danhMuc2/xuatXu"));
const ThangSoBanLe = React.lazy(() => import("./danhMuc2/thangSoBanLe"));
const MauKetQuaCLS = React.lazy(() => import("./danhMuc/mauKetQuaCLS"));
const LieuDungBacSy = React.lazy(() => import("./danhMuc/lieuDungBacSy"));
const TachGopPhieuXN = React.lazy(() => import("./danhMuc/tachGopPhieuXN"));
const TachGopPhieuDVKT = React.lazy(() => import("./danhMuc/tachGopPhieuDVKT"));
const NguonNhapKho = React.lazy(() => import("./danhMuc2/nguonNhapKho"));
const Kiosk = React.lazy(() => import("./danhMuc/kiosk"));
const ThongSoHangDoi = React.lazy(() => import("./danhMuc/thongSoHangDoi"));
const ThietLapPhieuIn = React.lazy(() => import("./danhMuc/thietLapPhieuIn"));
const ThietLapPhieuLinhTra = React.lazy(() =>
  import("./danhMuc/thietLapPhieuLinhTra")
);
const HuongDanSuDung = React.lazy(() => import("./danhMuc2/huongDanSuDung"));
const HoiDong = React.lazy(() => import("./danhMuc2/hoiDong"));
const NgoaiDieuTri = React.lazy(() => import("./danhMuc/ngoaiDieuTri"));
const DonViChiNhanh = React.lazy(() => import("./danhMuc/donViChiNhanh"));
const LoaiGiuong = React.lazy(() => import("./danhMuc2/loaiGiuong"));
const SoHieuGiuong = React.lazy(() => import("./danhMuc2/soHieuGiuong"));
const DichVuGiuong = React.lazy(() => import("./danhMuc/dichVuGiuong"));
const BacSiNgoaiVien = React.lazy(() => import("./danhMuc2/bacSiNgoaiVien"));
const CheDoChamSoc = React.lazy(() => import("./danhMuc2/cheDoChamSoc"));
const MauKetQuaPTTT = React.lazy(() => import("./danhMuc2/mauKetQuaPTTT"));
const LoaiHinhThanhToan = React.lazy(() =>
  import("./danhMuc2/loaiHinhThanhToan")
);
const PhanLoaiBmi = React.lazy(() => import("./danhMuc2/phanLoaiBmi"));
const HauQuaTuongTac = React.lazy(() => import("./danhMuc2/hauQuaTuongTac"));
const DacTinhDuocLy = React.lazy(() => import("./danhMuc2/dacTinhDuocLy"));
const MucDoTuongTac = React.lazy(() => import("./danhMuc2/mucDoTuongTac"));
const TuongTacThuoc = React.lazy(() => import("./danhMuc2/tuongTacThuoc"));
const ChiPhiHapSayVTYTTaiSuDung = React.lazy(() =>
  import("./danhMuc2/chiPhiHapSayVTYTTaiSuDung")
);

// trợ giúp
const TroGiupHdsd = React.lazy(() => import("./troGiup/troGiupHdsd"));
const HtmlHdsd = React.lazy(() => import("./troGiup/HtmlHdsd"));
const BangKeCPKb_Cb = React.lazy(() => import("./troGiup/bangKeChiPhiKb_Cb"));
const VideoHdsd = React.lazy(() => import("./troGiup/Video"));

// Kios
const Kios = React.lazy(() => import("./kiosk"));
const SelectExaminationForm = React.lazy(() =>
  import("./kiosk/selectExaminationForm")
);
const GetNumber = React.lazy(() => import("./kiosk/getNumber"));
const RegisterPersonalInfo = React.lazy(() =>
  import("./kiosk/registerPersonalInfo")
);
const LaySoTheoDienThoai = React.lazy(() =>
  import("./kiosk/LaySoTheoDienThoai")
);
const UpdateInformation = React.lazy(() => import("./kiosk/updateInformation"));
const Register = React.lazy(() => import("./kiosk/register"));
const LaySoTheoQRCode = React.lazy(() => import("./kiosk/LaySoTheoQRCode"));
const SelectPriorityPerson = React.lazy(() =>
  import("./kiosk/selectPriorityPerson")
);
const KiosKHome = React.lazy(() => import("./kiosk/home"));
const LaySoBaoHiem = React.lazy(() => import("./kiosk/LaySoBaoHiem"));

// Thu ngân
const ThuNgan = React.lazy(() => import("./thuNgan"));
const TimKiemBenhNhan = React.lazy(() => import("./thuNgan/timKiemBenhNhan"));
const ChiTietPhieuThu = React.lazy(() => import("./thuNgan/chiTietPhieuThu"));
const DanhSachPhieuThu = React.lazy(() => import("./thuNgan/danhSachPhieuThu"));
const DsPhieuYeuCauHoan = React.lazy(() =>
  import("./thuNgan/dsPhieuYeuCauHoan")
);
const ChiTietPhieuYeuCauHoan = React.lazy(() =>
  import("./thuNgan/chiTietPhieuYeuCauHoan")
);
const DsHoaDonDienTu = React.lazy(() => import("./thuNgan/dsHoaDonDienTu"));
const ChitietHoaDonDienTu = React.lazy(() => import("./thuNgan/chiTietHoaDon"));
const TaoHoaDonDienTu = React.lazy(() => import("./thuNgan/taoHoaDonDienTu"));
const TaoHoaDonNhieuNguoi = React.lazy(() =>
  import("./thuNgan/taoHoaDonNhieuNguoi")
);
const ChinhSuaHoaDonDienTu = React.lazy(() =>
  import("./thuNgan/chinhSuaHoaDonDienTu")
);
const QuanLyTamUng = React.lazy(() => import("./thuNgan/quanLyTamUng"));
const chiTietQuanLyTamUng = React.lazy(() =>
  import("./thuNgan/quanLyTamUng/chiTietQuanLyTamUng")
);

// xet nghiem
const XetNghiem = React.lazy(() => import("./xetNghiem"));
const LayMauXetNghiem = React.lazy(() => import("./xetNghiem/LayMauXetNghiem"));
const ThucHienHHSH = React.lazy(() => import("./xetNghiem/ThucHienHHSH"));
const ThucHienGBPVS = React.lazy(() => import("./xetNghiem/ThucHienGBPVS"));

// admin
const VaiTroHeThong = React.lazy(() => import("./admin/vaiTroHeThong"));
const TaiKhoanHeThong = React.lazy(() => import("./admin/taiKhoanHeThong"));

// Quan ly thong bao
const QuanLyThongBao = React.lazy(() => import("./thongBao/index"));

// page
const ThietLapPage = React.lazy(() => import("./thietLap"));
const QuanTriPage = React.lazy(() => import("./quanTri"));
const TroGiup = React.lazy(() => import("./troGiup"));

// kho
const KhoPage = React.lazy(() => import("./kho"));
const ThietLapChonKho = React.lazy(() =>
  import("./kho/thietLapChonKho/index2")
);
const QuanTriKho = React.lazy(() => import("./kho/quanTriKho"));
const QuyetDinhThau = React.lazy(() => import("./kho/quyetDinhThau"));
const DanhSachPhieuNhap = React.lazy(() => import("./kho/phieuNhap"));

const DanhSachPhieuXuat = React.lazy(() => import("./kho/phieuXuat/DanhSach"));

const ChiTietPhieuXuat = React.lazy(() => import("./kho/phieuXuat/ChiTiet"));
const PhieuXuat = React.lazy(() => import("./kho/phieuXuat"));

const PhieuNhapNhaCungCap = React.lazy(() =>
  import("./kho/phieuNhap/NhaCungCap")
);
const ChiTietPhieuNhapNhaCungCap = React.lazy(() =>
  import("./kho/phieuNhap/NhaCungCap/ChiTiet")
);
const PhieuNhapDuTru = React.lazy(() => import("./kho/phieuNhap/DuTru"));
const ChiTietPhieuNhapDuTru = React.lazy(() =>
  import("./kho/phieuNhap/DuTru/ChiTiet")
);
const ChiTietPhieuLinhBu = React.lazy(() =>
  import("./kho/phieuNhap/PhieuLinh")
);
const ChiTietPhieuXuatLinhBu = React.lazy(() =>
  import("./kho/phieuXuat/PhieuLinh")
);

const ChiTietPhieuChuyenKho = React.lazy(() =>
  import("./kho/phieuNhap/ChuyenKho/ChiTiet")
);

const DanhSachDichVuKho = React.lazy(() => import("./kho/DanhSachDichVuKho"));
const ChiTietDanhSachDichVuKho = React.lazy(() =>
  import("./kho/DanhSachDichVuKho/ChiTietDanhSachDichVuKho")
);
const PhatThuocNgoaiTru = React.lazy(() => import("./kho/phatThuocNgoaiTru"));
const ChiTietDonThuocNgoaiTru = React.lazy(() =>
  import("./kho/phatThuocNgoaiTru/ChiTietDonThuoc")
);
const VatTuKyGui = React.lazy(() => import("./kho/vatTuKyGui"));

// ho so benh an
const DanhSachNguoiBenh = React.lazy(() =>
  import("./hoSoBenhAn/DanhSachNguoiBenh")
);
const ChiTietNguoiBenh = React.lazy(() =>
  import("./hoSoBenhAn/ChiTietNguoiBenh")
);
const HoSoBenhAn = React.lazy(() => import("./hoSoBenhAn"));
const DanhSachLuuTruBA = React.lazy(() =>
  import("./hoSoBenhAn/DanhSachLuuTruBA")
);
const ChiTietLuuTruBA = React.lazy(() =>
  import("./hoSoBenhAn/ChiTietLuuTruBA")
);

// Nhà thuốc
const QuanLyNhaThuoc = React.lazy(() => import("./nhaThuoc"));
const DonThuoc = React.lazy(() => import("./nhaThuoc/DonThuoc"));
const ChiTietDonThuoc = React.lazy(() => import("./nhaThuoc/ChiTietDonThuoc"));
const LienThongGPP = React.lazy(() => import("./nhaThuoc/LienThongGPP"));
const ChiTietLienThongGPP = React.lazy(() =>
  import("./nhaThuoc/ChiTietLienThongGPP")
);

//Chan doan hinh anh
const ChanDoanHinhAnh = React.lazy(() => import("./chanDoanHinhAnh"));
const ChoTiepDon = React.lazy(() => import("./chanDoanHinhAnh/choTiepDon"));
const TiepNhan = React.lazy(() => import("./chanDoanHinhAnh/tiepNhan"));
const DocKetQua = React.lazy(() => import("./chanDoanHinhAnh/docKetQua"));
const DocKetQua2 = React.lazy(() => import("./chanDoanHinhAnh/docKetQua2"));
const BieuDoThongKe = React.lazy(() =>
  import("./chanDoanHinhAnh/BieuDoThongKe")
);
const CDHATDCN = React.lazy(() => import("./chanDoanHinhAnh/CDHATDCN"));

//theo doi dieu tri
const TheoDoiDieuTri = React.lazy(() => import("./theoDoiDieuTri"));
const DanhSachNguoiBenhTheoDoi = React.lazy(() =>
  import("./theoDoiDieuTri/DanhSachNguoiBenh")
);
const ChiTietTheoDoiDieuTri = React.lazy(() =>
  import("./theoDoiDieuTri/DanhSachNguoiBenh/ChiTietTheoDoiDieuTri")
);

//qms
const Qms = React.lazy(() => import("./qms"));
const QmsDoc = React.lazy(() => import("./qms/qmsDoc/thietLap"));
const QmsNgang = React.lazy(() => import("./qms/qmsNgang/thietLap"));
const QmsDocKhamBenh = React.lazy(() => import("./qms/qmsDoc/khamBenh"));
const QmsNgangKhamBenh = React.lazy(() => import("./qms/qmsNgang/khamBenh"));
const QmsDocChanDoanHinhAnh = React.lazy(() =>
  import("./qms/qmsDoc/chanDoanHinhAnh")
);
const QmsNgangChanDoanHinhAnh = React.lazy(() =>
  import("./qms/qmsNgang/chanDoanHinhAnh")
);
const QmsDocXetNghiem = React.lazy(() => import("./qms/qmsDoc/xetNghiem"));
const QmsNgangXetNghiem = React.lazy(() => import("./qms/qmsNgang/xetNghiem"));
const QmsNgangKhamBenh2 = React.lazy(() => import("./qms/qmsNgang/khamBenh2"));
const QmsTiepDon = React.lazy(() => import("./qms/qmsNgang/tiepDon"));

// Ký số
const KySo = React.lazy(() => import("./kySo"));
const ThietLapQuyenKy = React.lazy(() => import("./kySo/ThietLapQuyenKy"));
const DanhSachPhieuChoKy = React.lazy(() =>
  import("./kySo/DanhSachPhieuChoKy")
);
const LichSuKyDanhSachNguoiBenh = React.lazy(() =>
  import("./kySo/LichSuKy/DanhSachNguoiBenh")
);
const LichSuKyDanhSachPhieu = React.lazy(() =>
  import("./kySo/LichSuKy/DanhSachPhieu")
);
const LichSuKyLichSuPhieu = React.lazy(() =>
  import("./kySo/LichSuKy/LichSuPhieu")
);

//dashboard
const Dashboard = React.lazy(() => import("./dashboard"));
const TrinhChieuTv = React.lazy(() => import("./dashboard/trinhChieuTv"));
const SubPageDashboard = React.lazy(() => import("./home/subPage/Dashboard"));

//trinh chieu Tv

const soLieuBenhVien = React.lazy(() =>
  import("./dashboard/trinhChieuTv/soLieuBenhVien")
);

// Bao cao
const BaoCaoPages = React.lazy(() => import("./baocao"));
const PK01 = React.lazy(() => import("./baocao/phongKham/pk01"));
const BC01 = React.lazy(() => import("./baocao/dichVu/bc01"));
const BC02 = React.lazy(() => import("./baocao/dichVu/bc02"));
const BC03 = React.lazy(() => import("./baocao/dichVu/bc03"));
const BC04 = React.lazy(() => import("./baocao/dichVu/bc04"));
const BC05 = React.lazy(() => import("./baocao/dichVu/bc05"));
const BC06 = React.lazy(() => import("./baocao/dichVu/bc06"));
const BC07 = React.lazy(() => import("./baocao/dichVu/bc07"));
const BC08 = React.lazy(() => import("./baocao/dichVu/bc08"));
const BC09 = React.lazy(() => import("./baocao/dichVu/bc09"));
const BC10 = React.lazy(() => import("./baocao/dichVu/bc10"));
const BC11 = React.lazy(() => import("./baocao/dichVu/bc11"));
const TongHopThuTienNb = React.lazy(() => import("./baocao/taiChinh/tc01"));
const TC02 = React.lazy(() => import("./baocao/taiChinh/tc02"));
const TC03 = React.lazy(() => import("./baocao/taiChinh/tc03"));
const TC04 = React.lazy(() => import("./baocao/taiChinh/tc04"));
const TC05 = React.lazy(() => import("./baocao/taiChinh/tc05"));
const TC06 = React.lazy(() => import("./baocao/taiChinh/tc06"));
const TC07 = React.lazy(() => import("./baocao/taiChinh/tc07"));
const TC08 = React.lazy(() => import("./baocao/taiChinh/tc08"));
const TC09 = React.lazy(() => import("./baocao/taiChinh/tc09"));
const TC10 = React.lazy(() => import("./baocao/taiChinh/tc10"));
const TC11 = React.lazy(() => import("./baocao/taiChinh/tc11"));
const TC12 = React.lazy(() => import("./baocao/taiChinh/tc12"));
const TC13 = React.lazy(() => import("./baocao/taiChinh/tc13"));
const TC14 = React.lazy(() => import("./baocao/taiChinh/tc14"));
const TC15 = React.lazy(() => import("./baocao/taiChinh/tc15"));
const TC16 = React.lazy(() => import("./baocao/taiChinh/tc16"));
const TC17 = React.lazy(() => import("./baocao/taiChinh/tc17"));
const TC17_1 = React.lazy(() => import("./baocao/taiChinh/tc17_1"));
const TC18 = React.lazy(() => import("./baocao/taiChinh/tc18"));
const TC20 = React.lazy(() => import("./baocao/taiChinh/tc20"));
const TC20_1 = React.lazy(() => import("./baocao/taiChinh/tc20_1"));
const TC21 = React.lazy(() => import("./baocao/taiChinh/tc21"));
const TC22 = React.lazy(() => import("./baocao/taiChinh/tc22"));
const TC23 = React.lazy(() => import("./baocao/taiChinh/tc23"));
const TC24 = React.lazy(() => import("./baocao/taiChinh/tc24"));

const PK02 = React.lazy(() => import("./baocao/phongKham/pk02"));
const PK03 = React.lazy(() => import("./baocao/phongKham/pk03"));
const NhaCungCap = React.lazy(() => import("./baocao/kho/k01_1"));
const K01_2 = React.lazy(() => import("./baocao/kho/k01_2"));
const K01 = React.lazy(() => import("./baocao/kho/k01"));
const K02 = React.lazy(() => import("./baocao/kho/k02"));
const K02_1 = React.lazy(() => import("./baocao/kho/k02_1"));
const K03 = React.lazy(() => import("./baocao/kho/k03"));
const K04 = React.lazy(() => import("./baocao/kho/k04"));
const K05 = React.lazy(() => import("./baocao/kho/k05"));
const K07 = React.lazy(() => import("./baocao/kho/k07"));
const K08 = React.lazy(() => import("./baocao/kho/k08"));
const K10 = React.lazy(() => import("./baocao/kho/k10"));
const K11 = React.lazy(() => import("./baocao/kho/k11"));
const K12 = React.lazy(() => import("./baocao/kho/k12"));
const K13 = React.lazy(() => import("./baocao/kho/k13"));
const K14 = React.lazy(() => import("./baocao/kho/k14"));
const KNT05 = React.lazy(() => import("./baocao/nhaThuoc/knt05"));
const KNT03 = React.lazy(() => import("./baocao/nhaThuoc/knt03"));
const KNT02 = React.lazy(() => import("./baocao/nhaThuoc/knt02"));
const KNT04 = React.lazy(() => import("./baocao/nhaThuoc/knt04"));

const KVT01_1 = React.lazy(() => import("./baocao/khoVatTu/kvt01_1"));
const KVT02 = React.lazy(() => import("./baocao/khoVatTu/kvt02"));
const KVT03 = React.lazy(() => import("./baocao/khoVatTu/kvt03"));
const KNT01 = React.lazy(() => import("./baocao/nhaThuoc/knt01"));
const KNT06 = React.lazy(() => import("./baocao/nhaThuoc/knt06"));
const KNT07 = React.lazy(() => import("./baocao/nhaThuoc/knt07"));
const KSK01 = React.lazy(() => import("./baocao/khamSucKhoe/ksk01"));
const KSK02 = React.lazy(() => import("./baocao/khamSucKhoe/ksk02"));
const KSK04 = React.lazy(() => import("./baocao/khamSucKhoe/ksk04"));
const KSK05 = React.lazy(() => import("./baocao/khamSucKhoe/ksk05"));
const KSK12 = React.lazy(() => import("./baocao/khamSucKhoe/ksk12"));
const G01 = React.lazy(() => import("./baocao/goiLieuTrinh/g01"));
const G02 = React.lazy(() => import("./baocao/goiLieuTrinh/g02"));
const G03 = React.lazy(() => import("./baocao/goiLieuTrinh/g03"));
const G04 = React.lazy(() => import("./baocao/goiLieuTrinh/g04"));
const KHTH01 = React.lazy(() => import("./baocao/keHoachTongHop/khth01"));
const KHTH02 = React.lazy(() => import("./baocao/keHoachTongHop/khth02"));
const KHTH03 = React.lazy(() => import("./baocao/keHoachTongHop/khth03"));
const KHTH04 = React.lazy(() => import("./baocao/keHoachTongHop/khth04"));
const KHTH05 = React.lazy(() => import("./baocao/keHoachTongHop/khth05"));
const KHTH06 = React.lazy(() => import("./baocao/keHoachTongHop/khth06"));
const KHTH07 = React.lazy(() => import("./baocao/keHoachTongHop/khth07"));

const PTTT01 = React.lazy(() => import("./baocao/phauThuatThuThuat/pttt01"));

const BCXXX = React.lazy(() => import("./baocao/bangKe6556/index"));
const EditorConfig = React.lazy(() => import("./editor/config"));
const EditorReport = React.lazy(() => import("./editor/report"));
const EditorPreview = React.lazy(() => import("./editor/preview"));

// quyết toán bhyt
const quyetToanBHYT = React.lazy(() => import("./quyetToanBHYT"));
const DanhSachNguoiBenhChoTaoHoSoBHYT = React.lazy(() =>
  import("./quyetToanBHYT/DanhSachNguoiBenhChoTaoHoSoBHYT")
);
const ChiTietDanhSachNguoiBenhChoTaoHoSoBHYT = React.lazy(() =>
  import("./quyetToanBHYT/DanhSachNguoiBenhChoTaoHoSoBHYT/ChiTiet")
);
const DanhSachHoSoBaoHiem79a46CotTheoQD4210 = React.lazy(() =>
  import("./quyetToanBHYT/DanhSachHoSoBaoHiem79a46CotTheoQD4210")
);
const ChiTietDanhSachHoSoBaoHiem79a46CotTheoQD4210 = React.lazy(() =>
  import("./quyetToanBHYT/DanhSachHoSoBaoHiem79a46CotTheoQD4210/ChiTiet")
);
const QuanLyNoiTru = React.lazy(() => import("./quanLyNoiTru"));
const DanhSachLapBenhAn = React.lazy(() =>
  import("./quanLyNoiTru/danhSachLapBenhAn")
);
const ChiTietBenhAn = React.lazy(() =>
  import("./quanLyNoiTru/danhSachLapBenhAn/ChiTietBenhAn")
);
const DanhSachNguoiBenhNoiTru = React.lazy(() =>
  import("./quanLyNoiTru/danhSachNguoiBenhNoiTru")
);
const DanhSachNguoiBenhNoiTruTraDv = React.lazy(() =>
  import("./quanLyNoiTru/dsNbNoiTruTraDv")
);
const ChiTietNguoiBenhNoiTruTraDv = React.lazy(() =>
  import("./quanLyNoiTru/dsNbNoiTruTraDv/ChiTiet")
);
const ChiTietNguoiBenhNoiTru = React.lazy(() =>
  import("./quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru")
);
const ChiTietTraHangHoa = React.lazy(() =>
  import("./quanLyNoiTru/danhSachNguoiBenhNoiTru/traHangHoa")
);

const ToDieuTri = React.lazy(() =>
  import(
    "./quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/ToDieuTri/containers/ChiTietToDieuTri"
  )
);

const ThemMoiPhieuSoKet = React.lazy(() =>
  import(
    "./quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/DieuTriSoKet/ThemMoiPhieuSoKet"
  )
);

const ChiTietPhieuSoKet = React.lazy(() =>
  import(
    "./quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/DieuTriSoKet/ChiTietPhieuSoKet"
  )
);
const DanhSachPhieuLinh = React.lazy(() =>
  import("./quanLyNoiTru/danhSachNguoiBenhNoiTru/PhieuLinh")
);
const DanhSachPhieuTra = React.lazy(() =>
  import("./quanLyNoiTru/danhSachNguoiBenhNoiTru/PhieuTra")
);
const DanhSachPhieuLinhSuatAn = React.lazy(() =>
  import("./quanLyNoiTru/danhSachNguoiBenhNoiTru/PhieuLinhSuatAn")
);
const DanhSachPhieuTraSuatAn = React.lazy(() =>
  import("./quanLyNoiTru/danhSachNguoiBenhNoiTru/PhieuTraSuatAn")
);
const ChiTietPhieuLinhSuatAn = React.lazy(() =>
  import(
    "./quanLyNoiTru/danhSachNguoiBenhNoiTru/PhieuLinhSuatAn/ChiTietPhieuLinh"
  )
);
const ChiTietPhieuTraSuatAn = React.lazy(() =>
  import(
    "./quanLyNoiTru/danhSachNguoiBenhNoiTru/PhieuTraSuatAn/ChiTietPhieuTra"
  )
);
const ChiTietPhieuLinh = React.lazy(() =>
  import("./quanLyNoiTru/danhSachNguoiBenhNoiTru/PhieuLinh/ChiTietPhieuLinh")
);
const ChiTietPhieuTra = React.lazy(() =>
  import("./quanLyNoiTru/danhSachNguoiBenhNoiTru/PhieuTra/ChiTietPhieuTra")
);

const ThemMoiBienBanHoiChan = React.lazy(() =>
  import(
    "./quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/BienBanHoiChan/ThemMoiBienBanHoiChan"
  )
);

const ChiTietBienBanHoiChan = React.lazy(() =>
  import(
    "./quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/BienBanHoiChan/ChiTietBienBanHoiChan"
  )
);

const DanhSachGiaHanThe = React.lazy(() =>
  import("./quanLyNoiTru/danhSachGiaHanThe")
);
const ChiTietGiaHanThe = React.lazy(() =>
  import("./quanLyNoiTru/danhSachGiaHanThe/ChiTietGiaHanThe")
);
const VitalSignsPrint = React.lazy(() =>
  import("components/VitalSigns/VitalSignsPrint")
);

// Kham Suc Khoe
const QuanLyKhamSucKhoe = React.lazy(() => import("./khamSucKhoe"));
const PhieuBaoGia = React.lazy(() => import("./khamSucKhoe/PhieuBaoGia"));
const ChiTietPhieuBaoGia = React.lazy(() =>
  import("./khamSucKhoe/ChiTietPhieuBaoGia")
);
const HopDongKhamSucKhoe = React.lazy(() =>
  import("./khamSucKhoe/HopDongKhamSucKhoe")
);
const ChiTietHopDong = React.lazy(() => import("./khamSucKhoe/ChiTietHopDong"));
// Goi dich vu
const QuanLyGoiDichVu = React.lazy(() => import("./goiDichVu"));
const DanhSachSuDungGoi = React.lazy(() =>
  import("./goiDichVu/DanhSachSuDungGoi")
);
const ChiTietSuDungGoi = React.lazy(() =>
  import("./goiDichVu/ChiTietNguoiBenhSuDungGoi")
);

// quản lý phẫu thuật - thủ thuật
const PhauThuatThuThuat = React.lazy(() => import("./phauThuatThuThuat"));
const DanhSachNguoiBenhPTTT = React.lazy(() =>
  import("./phauThuatThuThuat/DanhSachNguoiBenh")
);
const ChiTietPhauThuat = React.lazy(() =>
  import("./phauThuatThuThuat/ChiTietNguoiBenh")
);

// danh sách giấy đẩy cổng
const DanhSachGiayDayCong = React.lazy(() => import("./giayDayCong"));
const DanhSachGiayNghiHuong = React.lazy(() =>
  import("./giayDayCong/GiayNghiHuong")
);
const DanhSachNbTuVong = React.lazy(() => import("./giayDayCong/NbTuVong"));
const DanhSachNbRaVien = React.lazy(() => import("./giayDayCong/NbRaVien"));

// sinh hiệu
const QuanLySinhHieu = React.lazy(() => import("./sinhHieu"));
const DanhSachSinhHieu = React.lazy(() =>
  import("./sinhHieu/DanhSachSinhHieu")
);
const vitalSignsPrint = (props) => {
  return Page(VitalSignsPrint, [])(props);
};
const pageThuNgan = {
  subPageThuNgan: {
    component: Page(SubPageThuNgan, []),
    accessRoles: [],
    path: "/thu-ngan",
    exact: true,
  },
  timKiemBenhNhan: {
    component: Page(TimKiemBenhNhan, [ROLES["THU_NGAN"].THU_NGAN]),
    accessRoles: [],
    path: "/thu-ngan/thu-ngan",
    exact: true,
  },
  danhSachPhieuThu: {
    component: Page(DanhSachPhieuThu, [ROLES["THU_NGAN"].DANH_SACH_PHIEU_THU]),
    accessRoles: [],
    path: "/thu-ngan/danh-sach-phieu-thu",
    exact: true,
  },
  chiTietPhieuThu: {
    component: Page(ChiTietPhieuThu, [ROLES["THU_NGAN"].PHIEU_THU]),
    accessRoles: [],
    path: "/thu-ngan/chi-tiet-phieu-thu/:maHoSo/:phieuThuId/:nbDotDieuTriId",
    exact: true,
  },
  dsPhieuYeuCauHoan: {
    // component: Page(DsPhieuYeuCauHoan, [ROLES["THU_NGAN"].DANH_SACH_PHIEU_THU]),
    component: Page(DsPhieuYeuCauHoan, [
      ROLES["THU_NGAN"].DS_PHIEU_YEU_CAU_HOAN,
      ROLES["THU_NGAN"].CHI_HOAN_NHA_THUOC,
    ]),
    accessRoles: [],
    path: "/thu-ngan/ds-phieu-yeu-cau-hoan",
    exact: true,
  },
  chiTietPhieuYeuCauHoan: {
    // component: Page(DsPhieuYeuCauHoan, [ROLES["THU_NGAN"].DANH_SACH_PHIEU_THU]),
    component: Page(ChiTietPhieuYeuCauHoan, [
      ROLES["THU_NGAN"].XEM_CHI_TIET_PHIEU_YEU_CAU_HOAN,
      ROLES["THU_NGAN"].CHI_HOAN_NHA_THUOC,
    ]),
    accessRoles: [],
    path: "/thu-ngan/chi-tiet-phieu-hoan-tra/:maHoSo/:phieuHoanTraId/:nbDotDieuTriId/:soPhieu",
    exact: true,
  },
  dsHoaDonDienTu: {
    // component: Page(DsPhieuYeuCauHoan, [ROLES["THU_NGAN"].DANH_SACH_PHIEU_THU]),
    component: Page(DsHoaDonDienTu, [ROLES["THU_NGAN"].DS_HOA_DON_DIEN_TU]),
    accessRoles: [],
    path: "/thu-ngan/ds-hoa-don-dien-tu",
    exact: true,
  },
  chitietHoaDonDienTu: {
    // component: Page(DsPhieuYeuCauHoan, [ROLES["THU_NGAN"].DANH_SACH_PHIEU_THU]),
    component: Page(ChitietHoaDonDienTu, [
      ROLES["THU_NGAN"].XEM_CHI_TIET_HOA_DON_DIEN_TU,
    ]),
    accessRoles: [],
    path: "/thu-ngan/chi-tiet-hoa-don/:maHoSo/:hoaDonId/:nbDotDieuTriId",
    exact: true,
  },
  taoMoiHoaDonDienTu: {
    component: Page(TaoHoaDonDienTu, [ROLES["THU_NGAN"].THEM_HOA_DON_DIEN_TU]),
    accessRoles: [],
    path: [
      "/thu-ngan/tao-hoa-don-dien-tu/:nbDotDieuTriId",
      "/thu-ngan/tao-hoa-don-dien-tu/:nbDotDieuTriId/:soPhieu",
      "/thu-ngan/tao-hoa-don-dien-tu/:nbDotDieuTriId/:soPhieu/:phieuThuId",
    ],
    exact: true,
  },
  taoHoaDonNhieuNguoi: {
    component: Page(TaoHoaDonNhieuNguoi, [
      ROLES["THU_NGAN"].THEM_HOA_DON_DIEN_TU_NHIEU_NGUOI,
    ]),
    accessRoles: [],
    path: "/thu-ngan/tao-hoa-don-nhieu-nguoi",
    exact: true,
  },
  chinhSuaHoaDonDienTu: {
    component: Page(ChinhSuaHoaDonDienTu, []),
    accessRoles: [],
    path: "/thu-ngan/chinh-sua-hoa-don-dien-tu/:maHoSo/:hoaDonId/:nbDotDieuTriId",
    exact: true,
  },
  quanLyTamUng: {
    component: Page(QuanLyTamUng, [
      ROLES["THU_NGAN"].XEM_DS_NB_QUAN_LY_TAM_UNG,
    ]),
    accessRoles: [],
    path: "/thu-ngan/quan-ly-tam-ung",
    exact: true,
  },
  chiTietQuanLyTamUng: {
    component: Page(chiTietQuanLyTamUng, []),
    accessRoles: [],
    path: ["/thu-ngan/quan-ly-tam-ung/:id"],
    exact: true,
  },
};

const pageXetNghiem = {
  subPageXetNghiem: {
    component: Page(SubPageXetNghiem, []),
    accessRoles: [],
    path: "/xet-nghiem",
    exact: true,
  },
  layMauXetNghiem: {
    component: Page(LayMauXetNghiem, [ROLES["XET_NGHIEM"].MH_LAY_MAU]),
    accessRoles: [],
    path: "/xet-nghiem/lay-mau",
    exact: true,
  },
  thucHienHHSH: {
    component: Page(ThucHienHHSH, [ROLES["XET_NGHIEM"].XET_NGHIEM_HH]),
    accessRoles: [],
    path: "/xet-nghiem/sinh-hoa-huyet-hoc",
    exact: true,
  },
  thucHienGBPVS: {
    component: Page(ThucHienGBPVS, [ROLES["XET_NGHIEM"].XET_NGHIEM_GPB]),
    accessRoles: [],
    path: "/xet-nghiem/giai-phau-benh-vi-ky-sinh",
    exact: true,
  },
};

const pageKiosk = {
  kioskHome: {
    component: Page(KiosKHome, []),
    accessRoles: [],
    path: "/kiosk",
    exact: true,
  },
  selectPriorityPerson: {
    component: Page(SelectPriorityPerson, [ROLES["KIOSK"].DANG_KY_UU_TIEN]),
    accessRoles: [],
    path: "/kiosk/doi-tuong-uu-tien",
    exact: true,
  },
  selectExaminationForm: {
    component: Page(SelectExaminationForm, [ROLES["KIOSK"].DANG_KY_LOAI_KHAM]),
    accessRoles: [],
    path: "/kiosk/lua-chon-hinh-thuc-kham",
    exact: true,
  },
  registerPersonalInfo: {
    component: Page(RegisterPersonalInfo, [ROLES["KIOSK"].PHUONG_THUC_TIM_HS]),
    accessRoles: [],
    path: "/kiosk/dang-ky-thong-tin-ca-nhan",
    exact: true,
  },
  laySoTheoDienThoai: {
    component: Page(LaySoTheoDienThoai, [ROLES["KIOSK"].KET_QUA_TIM_KIEM]),
    accessRoles: [],
    path: "/kiosk/dang-ky-qua-so/:type",
  },
  laySoTheoQrCode: {
    component: Page(LaySoTheoQRCode, [ROLES["KIOSK"].TIM_HS_QR]),
    accessRoles: [],
    path: "/kiosk/dang-ky-qua-qr",
    exact: true,
  },
  updateInformation: {
    component: Page(UpdateInformation, [ROLES["KIOSK"].SUA_KET_QUA]),
    accessRoles: [],
    path: "/kiosk/cap-nhat-thong-tin",
    exact: true,
  },
  register: {
    component: Page(Register, [ROLES["KIOSK"].DANG_KY_THONG_TIN_MOI]),
    accessRoles: [],
    path: "/kiosk/dang-ky-kham-benh",
    exact: true,
  },
  getNumber: {
    component: Page(GetNumber, []),
    accessRoles: [ROLES["KIOSK"].KET_QUA_LAY_SO],
    path: "/kiosk/lay-so",
    exact: true,
  },
  laySoBaoHiem: {
    component: Page(LaySoBaoHiem, [ROLES["KIOSK"].DANG_KY_KHAM_BHYT]),
    accessRoles: [],
    path: "/kiosk/dang-ky-kham-bhyt",
    exact: true,
  },
};

const pageKho = {
  subPageKho: {
    component: Page(SubPageKho, []),
    accessRoles: [],
    path: "/kho",
    exact: true,
  },
  thietLapChonKho: {
    component: Page(ThietLapChonKho, []),
    accessRoles: [],
    path: "/kho/thiet-lap-kho-chi-dinh",
    exact: true,
  },
  danhMucKho: {
    component: Page(QuanTriKho, []),
    accessRoles: [],
    path: "/kho/quan-tri-kho",
  },
  quanLyThau: {
    component: Page(QuyetDinhThau, []),
    accessRoles: [],
    path: "/kho/quan-ly-thau",
    exact: true,
  },
  danhSachPhieuNhap: {
    component: Page(DanhSachPhieuNhap, [ROLES["KHO"].XEM_PHIEU_NHAP_KHO]),
    accessRoles: [],
    path: "/kho/nhap-kho",
    exact: true,
  },
  danhSachPhieuXuat: {
    component: Page(DanhSachPhieuXuat, [ROLES["KHO"].XEM_PHIEU_XUAT_KHO]),
    accessRoles: [],
    path: "/kho/xuat-kho",
    exact: true,
  },
  themMoiPhieuXuat: {
    component: Page(PhieuXuat, []),
    accessRoles: [],
    path: ["/kho/xuat-kho/them-moi", "/kho/xuat-kho/chinh-sua/:id"],
    exact: true,
  },
  ChiTietPhieuXuat: {
    component: Page(ChiTietPhieuXuat, [
      ROLES["KHO"].XEM_CHI_TIET_PHIEU_XUAT_KHO,
    ]),
    accessRoles: [],
    path: "/kho/xuat-kho/chi-tiet/:id",
    exact: true,
  },
  chiTietPhieuXuatLinhBu: {
    component: Page(ChiTietPhieuXuatLinhBu, []),
    accessRoles: [],
    path: ["/kho/xuat-kho/chi-tiet-linh-bu/:id"],
    exact: true,
  },
  phieuNhapNhaCungCap: {
    component: Page(PhieuNhapNhaCungCap, []),
    accessRoles: [],
    path: [
      "/kho/phieu-nhap-nha-cung-cap/chinh-sua/:id",
      "/kho/nhap-kho/phieu-nhap-nha-cung-cap/them-moi",
    ],
    exact: true,
  },
  chiTietPhieuNhapNhaCungCap: {
    component: Page(ChiTietPhieuNhapNhaCungCap, [
      ROLES["KHO"].XEM_CHI_TIET_PHIEU_NHAP_KHO,
    ]),
    accessRoles: [],
    path: "/kho/phieu-nhap-nha-cung-cap/chi-tiet/:id",
    exact: true,
  },
  phieuNhapDuTru: {
    component: Page(PhieuNhapDuTru, []),
    accessRoles: [],
    path: [
      "/kho/phieu-nhap-du-tru/them-moi",
      "/kho/phieu-nhap-du-tru/chinh-sua/:id",
    ],
    exact: true,
  },
  chiTietPhieuNhapDuTru: {
    component: Page(ChiTietPhieuNhapDuTru, [
      ROLES["KHO"].XEM_CHI_TIET_PHIEU_NHAP_KHO,
    ]),
    accessRoles: [],
    path: ["/kho/phieu-nhap-du-tru/chi-tiet/:id"],
    exact: true,
  },
  chiTietPhieuLinh: {
    component: Page(ChiTietPhieuLinhBu, [
      ROLES["KHO"].XEM_CHI_TIET_PHIEU_NHAP_KHO,
    ]),
    accessRoles: [],
    path: ["/kho/nhap-kho/chi-tiet-linh-bu/:id"],
    exact: true,
  },
  chiTietPhieuChuyenKho: {
    component: Page(ChiTietPhieuChuyenKho, [
      ROLES["KHO"].XEM_CHI_TIET_PHIEU_NHAP_KHO,
    ]),
    accessRoles: [],
    path: ["/kho/phieu-nhap-chuyen-kho/chi-tiet/:id"],
    exact: true,
  },
  danhSachDichVuKho: {
    component: Page(DanhSachDichVuKho, []),
    accessRoles: [],
    path: ["", "/kho/danh-sach-ton-kho"],
    exact: true,
  },
  ChiTietDanhSachDichVuKho: {
    component: Page(ChiTietDanhSachDichVuKho, []),
    accessRoles: [],
    path: ["", "/kho/danh-sach-ton-kho/chi-tiet/:khoId/:dichVuId"],
    exact: true,
  },
  phatThuocNgoaiTru: {
    component: Page(PhatThuocNgoaiTru, []),
    accessRoles: [],
    path: "/kho/phat-thuoc-ngoai-tru",
    exact: true,
  },
  chiTietDonThuocNgoaiTru: {
    component: Page(ChiTietDonThuocNgoaiTru, []),
    accessRoles: [],
    path: "/kho/phat-thuoc-ngoai-tru/chi-tiet/:id",
    exact: true,
  },
  chiTietPhieuLinhTra: {
    component: Page(ChiTietPhieuLinh, []),
    accessRoles: [],
    path: ["/kho/chi-tiet-phieu-linh/:id"],
    exact: true,
  },
  vatTuKyGui: {
    component: Page(VatTuKyGui, []),
    accessRoles: [],
    path: "/kho/vat-tu-ky-gui",
    exact: true,
  },
};

const pageThietLap = {
  subPageThietLap: {
    component: Page(SubPageThietLap, []),
    accessRoles: [],
    path: "/thiet-lap",
    exact: true,
  },
  thietLapChung: {
    component: Page(ThietLap, [ROLES.THIET_LAP_CHUNG]),
    accessRoles: [],
    path: "/thiet-lap/thiet-lap-chung",
    exact: true,
  },
  thietLapPhieuIn: {
    component: Page(ThietLapPhieuIn, []),
    accessRoles: [],
    path: "/thiet-lap/thiet-lap-phieu-in",
    exact: true,
  },
  tachGopPhieuXN: {
    component: Page(TachGopPhieuXN, []),
    accessRoles: [],
    path: "/thiet-lap/tach-gop-phieu-xet-nghiem",
    exact: true,
  },
  tachGopPhieuDVKT: {
    component: Page(TachGopPhieuDVKT, []),
    accessRoles: [],
    path: "/thiet-lap/tach-gop-phieu-dvkt",
    exact: true,
  },
  thietLapTichDiem: {
    component: Page(TichDiem, []),
    accessRoles: [],
    path: "/thiet-lap/tich-diem",
    exact: true,
  },
  thongSoHangDoi: {
    component: Page(ThongSoHangDoi, []),
    accessRoles: [],
    path: "/thiet-lap/thong-so-hang-doi",
    exact: true,
  },
  thietLapPhieuLinhTra: {
    component: Page(ThietLapPhieuLinhTra, []),
    accessRoles: [],
    path: "/thiet-lap/phieu-linh-tra",
    exact: true,
  },
};

const pageQuanTri = {
  subPageQuanTri: {
    component: Page(SubPageQuanTri, []),
    accessRoles: [],
    path: "/quan-tri",
    exact: true,
  },
  nhomTinhNang: {
    component: Page(NhomTinhNang, [ROLES["QUAN_LY_TAI_KHOAN"].NHOM_TINH_NANG]),
    accessRoles: [],
    path: "/quan-tri/nhom-tinh-nang",
    exact: true,
  },
  quyen: {
    component: Page(Quyen, [ROLES["QUAN_LY_TAI_KHOAN"].QUYEN]),
    accessRoles: [],
    path: "/quan-tri/quyen",
    exact: true,
  },
  danhMucNhanVien: {
    component: Page(NhanVien, [ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN]),
    accessRoles: [],
    path: "/quan-tri/nhan-vien",
    exact: true,
  },
  adminVaiTroHeThong: {
    component: Page(VaiTroHeThong, [
      ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG,
    ]),
    accessRoles: [],
    path: "/quan-tri/danh-muc-vai-tro",
    exact: true,
  },
  adminTaiKhoanHeThong: {
    component: Page(TaiKhoanHeThong, [
      ROLES["QUAN_LY_TAI_KHOAN"].QUAN_LY_TAI_KHOAN,
    ]),
    accessRoles: [],
    path: "/quan-tri/danh-muc-tai-khoan",
    exact: true,
  },
};

const pageCDHA = {
  subPageCDHA: {
    component: Page(SubPageCDHA, []),
    accessRoles: [],
    path: "/chan-doan-hinh-anh",
    exact: true,
  },
  choTiepDon: {
    component: Page(ChoTiepDon, [ROLES["CHAN_DOAN_HINH_ANH"].CHO_TIEP_DON]),
    accessRoles: [],
    path: "/chan-doan-hinh-anh/cho-tiep-don",
    exact: true,
  },
  tiepNhan: {
    component: Page(TiepNhan, [ROLES["CHAN_DOAN_HINH_ANH"].TIEP_NHAN]),
    accessRoles: [],
    path: "/chan-doan-hinh-anh/tiep-nhan",
    exact: true,
  },
  docKetQua: {
    component: Page(DocKetQua, []),
    accessRoles: [],
    path: "/chan-doan-hinh-anh/doc-ket-qua",
    exact: true,
  },
  docKetQua2: {
    component: Page(DocKetQua2, []),
    accessRoles: [],
    path: "/chan-doan-hinh-anh/doc-ket-qua-2",
    exact: true,
  },
  bieuDoThongKe: {
    component: Page(BieuDoThongKe, []),
    accessRoles: [],
    path: "/chan-doan-hinh-anh/bieu-do-thong-ke",
    exact: true,
  },
  CĐHATDCN: {
    component: Page(CDHATDCN, []),
    accessRoles: [],
    path: "/chan-doan-hinh-anh/thuc-hien-cdha-tdcn",
    exact: true,
  },
};

const pageHSBA = {
  subPageHoSoBenhAn: {
    component: Page(SubPageHSBA, []),
    accessRoles: [],
    path: "/ho-so-benh-an",
    exact: true,
  },
  danhSachNguoiBenh: {
    component: Page(DanhSachNguoiBenh, []),
    accessRoles: [],
    path: ["/ho-so-benh-an/danh-sach-nguoi-benh"],
    exact: true,
  },
  chiTietNguoiBenh: {
    component: Page(ChiTietNguoiBenh, []),
    accessRoles: [],
    path: ["/ho-so-benh-an/chi-tiet-nguoi-benh/:id"],
    exact: true,
  },
  danhSachLuuTruBA: {
    component: Page(DanhSachLuuTruBA, []),
    accessRoles: [],
    path: ["/ho-so-benh-an/danh-sach-luu-tru-benh-an"],
    exact: true,
  },
  chiTietLuuTruBA: {
    component: Page(ChiTietLuuTruBA, []),
    accessRoles: [],
    path: ["/ho-so-benh-an/chi-tiet-luu-tru-ba/:id"],
    exact: true,
  },
};

const pageKySo = {
  subPageKySo: {
    component: Page(SubPageKySo, []),
    accessRoles: [],
    path: "/ky-so",
    exact: true,
  },
  // thietLapQuyenKy
  thietLapQuyenKy: {
    component: Page(ThietLapQuyenKy, []),
    accessRoles: [],
    path: "/ky-so/thiet-lap-quyen-ky/",
    exact: true,
  },
  // danhSachPhieuChoKy
  danhSachPhieuChoKy: {
    component: Page(DanhSachPhieuChoKy, []),
    accessRoles: [],
    path: "/ky-so/danh-sach-phieu-cho-ky/",
    exact: true,
  },
  lichSuKyDanhSachNguoiBenh: {
    component: Page(LichSuKyDanhSachNguoiBenh, []),
    accessRoles: [],
    path: "/ky-so/lich-su-ky/danh-sach-nguoi-benh",
    exact: true,
  },
  lichSuKyDanhSachPhieu: {
    component: Page(LichSuKyDanhSachPhieu, []),
    accessRoles: [],
    path: "/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/:id",
    exact: true,
  },
  lichSuKyLichSuPhieu: {
    component: Page(LichSuKyLichSuPhieu, []),
    accessRoles: [],
    path: "/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/:id/lich-su-phieu/:lichSuPhieuId",
    exact: true,
  },
};

const pageDanhMuc = {
  subPageDanhMuc: {
    component: Page(SubPageDanhMuc, []),
    accessRoles: [],
    path: "/danh-muc",
    exact: true,
  },
  phuongThucTT: {
    component: Page(PhuongThucTT, [ROLES["DANH_MUC"].PTTT]),
    accessRoles: [],
    path: "/danh-muc/phuong-thuc-thanh-toan",
    exact: true,
  },
  chePhamMau: {
    component: Page(ChePhamMau, [ROLES["DANH_MUC"].CHE_PHAM_MAU]),
    accessRoles: [],
    path: "/danh-muc/che-pham-mau",
    exact: true,
  },
  diaChiHanhChinh: {
    component: Page(DiaChiHanhChinh, [ROLES["DANH_MUC"].DIA_CHI_HANH_CHINH]),
    accessRoles: [],
    path: "/danh-muc/dia-chi-hanh-chinh",
    exact: true,
  },
  nhomHoaChat: {
    component: Page(NhomHoaChat, [ROLES["DANH_MUC"].NHOM_HOA_CHAT]),
    accessRoles: [],
    path: "/danh-muc/nhom-hoa-chat",
    exact: true,
  },
  nhomBenh: {
    component: Page(NhomBenh, [ROLES["DANH_MUC"].BENH_TAT]),
    accessRoles: [],
    path: "/danh-muc/nhom-benh-tat",
    exact: true,
  },
  hoaChat: {
    component: Page(HoaChat, [ROLES["DANH_MUC"].HOA_CHAT]),
    accessRoles: [],
    path: "/danh-muc/hoa-chat",
    exact: true,
  },
  nhomDichVu: {
    component: Page(NhomDichVu, [ROLES["DANH_MUC"].NHOM_DICH_VU]),
    accessRoles: [],
    path: "/danh-muc/nhom-dich-vu",
    exact: true,
  },
  goiPtTt: {
    component: Page(GoiPtTt, []),
    accessRoles: [],
    path: "/danh-muc/goi-pt-tt",
    exact: true,
  },
  phong: {
    component: Page(Phong, [ROLES["DANH_MUC"].PHONG]),
    accessRoles: [],
    path: "/danh-muc/phong",
    exact: true,
  },
  phanLoaiThuoc: {
    component: Page(PhanLoaiThuoc, [ROLES["DANH_MUC"].PHAN_LOAI_THUOC]),
    accessRoles: [],
    path: "/danh-muc/phan-loai-thuoc",
    exact: true,
  },
  khoa: {
    component: Page(Faculty, [ROLES["DANH_MUC"].KHOA]),
    accessRoles: [],
    path: "/danh-muc/khoa",
    exact: true,
  },

  nhaSanXuat: {
    component: Page(NhaSanXuat, [ROLES["DANH_MUC"].NHA_SAN_XUAT]),
    accessRoles: [],
    path: "/danh-muc/doi-tac",
    exact: true,
  },
  hoatChat: {
    component: Page(HoatChat, [ROLES["DANH_MUC"].HOAT_CHAT]),
    accessRoles: [],
    path: "/danh-muc/hoat-chat",
    exact: true,
  },
  maMay: {
    component: Page(MaMay, [ROLES["DANH_MUC"].MA_MAY]),
    accessRoles: [],
    path: "/danh-muc/ma-may",
    exact: true,
  },
  duongDung: {
    component: Page(DuongDung, [ROLES["DANH_MUC"].DUONG_DUNG]),
    accessRoles: [],
    path: "/danh-muc/duong-dung",
    exact: true,
  },
  lieuDung: {
    component: Page(LieuDung, [ROLES["DANH_MUC"].LIEU_DUNG]),
    accessRoles: [],
    path: "/danh-muc/lieu-dung",
    exact: true,
  },
  nhomChiPhi: {
    component: Page(NhomChiPhi, [ROLES["DANH_MUC"].NHOM_CHI_PHI]),
    accessRoles: [],
    path: "/danh-muc/nhom-chi-phi",
    exact: true,
  },
  loiDan: {
    component: Page(LoiDan, [ROLES["DANH_MUC"].LOI_DAN]),
    accessRoles: [],
    path: "/danh-muc/loi-dan",
    exact: true,
  },
  toaNha: {
    component: Page(ToaNha, [ROLES["DANH_MUC"].NHA]),
    accessRoles: [],
    path: "/danh-muc/toa-nha",
    exact: true,
  },
  vanBang: {
    component: Page(VanBang, [ROLES["DANH_MUC"].VAN_BANG]),
    accessRoles: [],
    path: "/danh-muc/van-bang-chuyen-mon",
    exact: true,
  },
  loaGoiSo: {
    component: Page(LoaGoiSo, [ROLES["DANH_MUC"].LOA_GOI_SO]),
    accessRoles: [],
    path: "/danh-muc/loa-goi-so",
    exact: true,
  },
  quayTiepDon: {
    component: Page(QuayTiepDon, [ROLES["DANH_MUC"].QUAY]),
    accessRoles: [],
    path: "/danh-muc/quay-tiep-don",
    exact: true,
  },
  danToc: {
    component: Page(DanToc, [ROLES["DANH_MUC"].DAN_TOC]),
    accessRoles: [],
    path: "/danh-muc/dan-toc",
    exact: true,
  },
  ngheNghiep: {
    component: Page(NgheNghiep, [ROLES["DANH_MUC"].NGHE_NGHIEP]),
    accessRoles: [],
    path: "/danh-muc/nghe-nghiep",
    exact: true,
  },
  chucVu: {
    component: Page(ChucVu, [ROLES["DANH_MUC"].CHUC_VU]),
    accessRoles: [],
    path: "/danh-muc/chuc-vu",
    exact: true,
  },
  loaiCapCuu: {
    component: Page(LoaiCapCuu, [ROLES["DANH_MUC"].LOAI_CC]),
    accessRoles: [],
    path: "/danh-muc/loai-cap-cuu",
    exact: true,
  },
  nhomChiSo: {
    component: Page(NhomChiSo, [ROLES["DANH_MUC"].NHOM_CHI_SO]),
    accessRoles: [],
    path: "/danh-muc/nhom-chi-so",
    exact: true,
  },
  nguyenNhanNhapVien: {
    component: Page(NguyenNhanNhapVien, [
      ROLES["DANH_MUC"].NGUYEN_NHAN_NHAP_VIEN,
    ]),
    accessRoles: [],
    path: "/danh-muc/nguyen-nhan-nhap-vien",
    exact: true,
  },
  viTriChanThuong: {
    component: Page(ViTriChanThuong, [ROLES["DANH_MUC"].VI_TRI_CHAN_THUONG]),
    accessRoles: [],
    path: "/danh-muc/vi-tri-chan-thuong",
    exact: true,
  },
  nhomVatTu: {
    component: Page(NhomVatTu, [ROLES["DANH_MUC"].NHOM_VAT_TU]),
    accessRoles: [],
    path: "/danh-muc/nhom-vat-tu",
    exact: true,
  },
  thoiGianCapCuu: {
    component: Page(ThoiGianCapCuu, [ROLES["DANH_MUC"].TG_CC]),
    accessRoles: [],
    path: "/danh-muc/thoi-gian-cap-cuu",
    exact: true,
  },
  quanHam: {
    component: Page(QuanHam, [ROLES["DANH_MUC"].QUAN_HAM]),
    accessRoles: [],
    path: "/danh-muc/quan-ham",
    exact: true,
  },
  donVi: {
    component: Page(Unit, [ROLES["DANH_MUC"].CO_QUAN]),
    accessRoles: [],
    path: "/danh-muc/co-quan-don-vi",
    xact: true,
  },
  moiQuanHe: {
    component: Page(MoiQuanHe, [ROLES["DANH_MUC"].MOI_QUAN_HE]),
    accessRoles: [],
    path: "/danh-muc/moi-quan-he",
    exact: true,
  },
  lyDoDoiTra: {
    component: Page(LyDoDoiTra, [ROLES["DANH_MUC"].DOI_TRA_DICH_VU]),
    accessRoles: [],
    path: "/danh-muc/ly-do-tra-dv",
    exact: true,
  },
  loaiBuaAn: {
    component: Page(LoaiBuaAn, [ROLES["DANH_MUC"].LOAI_BUA_AN]),
    accessRoles: [],
    path: "/danh-muc/loai-bua-an",
    exact: true,
  },
  lyDoTamUng: {
    component: Page(LyDoTamUng, [ROLES["DANH_MUC"].LY_DO_TAM_UNG]),
    accessRoles: [],
    path: "/danh-muc/ly-do-tam-ung",
    exact: true,
  },
  mauDienBien: {
    component: Page(MauDienBien, [ROLES["DANH_MUC"].MAU_DIEN_BIEN]),
    accessRoles: [],
    path: "/danh-muc/mau-dien-bien",
    exact: true,
  },
  specimens: {
    component: Page(BenhPham, [ROLES["DANH_MUC"].BENH_PHAM]),
    accessRoles: [],
    path: "/danh-muc/benh-pham",
    exact: true,
  },
  chuyenKhoa: {
    component: Page(Specialist, [ROLES["DANH_MUC"].CHUYEN_KHOA]),
    accessRoles: [],
    path: "/danh-muc/chuyen-khoa",
    exact: true,
  },
  loaiBenhAn: {
    component: Page(LoaiBenhAn, [ROLES["DANH_MUC"].LOAI_BA]),
    accessRoles: [],
    path: "/danh-muc/loai-benh-an",
    exact: true,
  },
  phuongPhapGayMe: {
    component: Page(PhuongPhapGayMe, [ROLES["DANH_MUC"].PHUONG_PHAP_GAY_ME]),
    accessRoles: [],
    path: "/danh-muc/phuong-phap-gay-me",
    exact: true,
  },
  phuongPhapNhuom: {
    component: Page(PhuongPhapNhuom, [ROLES["DANH_MUC"].PHUONG_PHAP_NHUOM]),
    accessRoles: [],
    path: "/danh-muc/phuong-phap-nhuom",
    exact: true,
  },
  viTriSinhThiet: {
    component: Page(ViTriSinhThiet, [ROLES["DANH_MUC"].VI_TRI_SINH_THIET]),
    accessRoles: [],
    path: "/danh-muc/vi-tri-sinh-thiet",
    exact: true,
  },
  loaiDoiTuong: {
    component: Page(LoaiDoiTuong, [ROLES["DANH_MUC"].LOAI_DOI_TUONG]),
    accessRoles: [],
    path: "/danh-muc/loai-doi-tuong",
    exact: true,
  },
  hocHamHocVi: {
    component: Page(HocHamHocVi, [ROLES["DANH_MUC"].HOC_HAM]),
    accessRoles: [],
    path: "/danh-muc/hoc-ham-hoc-vi",
    exact: true,
  },
  theBaoHiem: {
    component: Page(TheBaoHiem, [ROLES["DANH_MUC"].THE_BAO_HIEM]),
    accessRoles: [],
    path: "/danh-muc/the-bao-hiem",
    exact: true,
  },
  nguoiDaiDien: {
    component: Page(NguoiDaiDien, [ROLES["DANH_MUC"].NGUOI_DAI_DIEN]),
    accessRoles: [],
    path: "/danh-muc/nguoi-dai-dien",
    exact: true,
  },
  benhVien: {
    component: Page(BenhVien, [ROLES["DANH_MUC"].BENH_VIEN]),
    accessRoles: [],
    path: "/danh-muc/benh-vien",
    exact: true,
  },
  donViTinh: {
    component: Page(DonViTinh, [ROLES["DANH_MUC"].DON_VI_TINH]),
    accessRoles: [],
    path: "/danh-muc/don-vi-tinh",
    exact: true,
  },
  phanNhomDichVuKho: {
    component: Page(PhanNhomDichVuKho, [ROLES["DANH_MUC"].PHAN_NHOM_THUOC]),
    accessRoles: [],
    path: "/danh-muc/phan-nhom-thuoc",
    exact: true,
  },
  nhomDichVuKho: {
    component: Page(GroupMedicineByLevel, [ROLES["DANH_MUC"].NHOM_THUOC]),
    accessRoles: [],
    path: "/danh-muc/nhom-thuoc",
    exact: true,
  },
  // goiDichVu: {
  //   component: Page(GoiDichVu, [ROLES["DANH_MUC"].GOI_DICH_VU]),
  //   accessRoles: [],
  //   path: "/danh-muc/goi-dich-vu",
  //   exact: true,
  // },
  // doiTac: {
  //   component: Page(DoiTac, [ROLES["DANH_MUC"].DOI_TAC]),
  //   accessRoles: [],
  //   path: "/danh-muc/doi-tac",
  //   exact: true,
  // },
  dichVuXetNghiem: {
    component: Page(dichVuXetNghiem, [ROLES["DANH_MUC"].DICH_VU_XN]),
    accessRoles: [],
    path: "/danh-muc/dich-vu-xet-nghiem",
    exact: true,
  },
  canLamSang: {
    component: Page(canLamSang, [ROLES["DANH_MUC"].CDHA_TDCN]),
    accessRoles: [],
    path: "/danh-muc/dich-vu-cdha-tdcn",
    exact: true,
  },
  danhMucThuoc: {
    component: Page(DanhMucThuoc, [ROLES["DANH_MUC"].THUOC]),
    accessRoles: [],
    path: "/danh-muc/thuoc",
    exact: true,
  },
  danhMucVatTu: {
    component: Page(DanhMucVatTu, [ROLES["DANH_MUC"].VAT_TU]),
    accessRoles: [],
    path: "/danh-muc/vat-tu",
    exact: true,
  },
  danhMucKhamBenh: {
    component: Page(DanhMucKhamBenh, [ROLES["DANH_MUC"].DICH_VU_KHAM_BENH]),
    accessRoles: [],
    path: "/danh-muc/dich-vu-kham-benh",
    exact: true,
  },
  phauThuat: {
    component: Page(PhauThuat, [ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT]),
    accessRoles: [],
    path: "/danh-muc/dich-vu-phau-thuat",
    exact: true,
  },
  baoCao: {
    component: Page(DMBaoCao, [ROLES["DANH_MUC"].BAO_CAO]),
    accessRoles: [],
    path: "/danh-muc/bao-cao",
    exact: true,
  },
  mayIn: {
    component: Page(MayIn, [ROLES["DANH_MUC"].MAY_IN]),
    accessRoles: [],
    path: "/danh-muc/may-in",
    exact: true,
  },
  MauKetQuaXN: {
    component: Page(MauKetQuaXN, [ROLES["DANH_MUC"].MAU_KET_QUA_XN]),
    accessRoles: [],
    path: "/danh-muc/mau-ket-qua-xet-nghiem",
  },
  nNoiLayBenhPham: {
    component: Page(NoiLayBenhPham, [ROLES["DANH_MUC"].NOI_LAY_BENH_PHAM]),
    accessRoles: [],
    path: "/danh-muc/noi-lay-benh-pham",
    exact: true,
  },

  hinhThucNhapXuat: {
    component: Page(HinhThucNhapXuat, [
      ROLES["DANH_MUC"].HINH_THUC_NHAP_XUAT_LOAI_XUAT,
    ]),
    accessRoles: [],
    path: "/danh-muc/hinh-thuc-nhap-xuat",
    exact: true,
  },

  nguonNhapKho: {
    component: Page(NguonNhapKho, [ROLES["DANH_MUC"].NGUON_NHAP_KHO]),
    accessRoles: [],
    path: "/danh-muc/nguon-nhap-kho",
    exact: true,
  },
  boChiDinh: {
    component: Page(GoiDichVu, [ROLES["DANH_MUC"].BO_CHI_DINH]),
    accessRoles: [],
    path: "/danh-muc/bo-chi-dinh",
    exact: true,
  },
  voucher: {
    component: Page(ChuongTrinhGiamGia, [
      ROLES["DANH_MUC"].CHUONG_TRINH_GIAM_GIA,
    ]),
    accessRoles: [],
    path: "/danh-muc/chuong-trinh-giam-gia",
    exact: true,
  },
  nguonGioiThieu: {
    component: Page(NguonGioiThieu, [ROLES["DANH_MUC"].NGUON_NGUOI_BENH]),
    accessRoles: [],
    path: "/danh-muc/nguon-nguoi-benh",
    exact: true,
  },
  hangThe: {
    component: Page(HangThe, [ROLES["DANH_MUC"].HANG_THE]),
    accessRoles: [],
    path: "/danh-muc/hang-the",
    exact: true,
  },
  xuatXu: {
    component: Page(XuatXu, [ROLES["DANH_MUC"].XUAT_XU]),
    accessRoles: [],
    path: "/danh-muc/xuat-xu",
    exact: true,
  },
  thangSoBanLe: {
    component: Page(ThangSoBanLe, [ROLES["DANH_MUC"].DINH_MUC_THANG_SO]),
    accessRoles: [],
    path: "/danh-muc/thang-so-ban-le",
    exact: true,
  },
  mauKetQuaCLS: {
    component: Page(MauKetQuaCLS, [ROLES["DANH_MUC"].MAU_KQ_CDHA_TDCN]),
    accessRoles: [],
    path: "/danh-muc/mau-ket-qua-cls",
    exact: true,
  },
  quyenKy: {
    component: Page(QuyenKy, [ROLES["DANH_MUC"].QUYEN_KY]),
    accessRoles: [],
    path: "/danh-muc/quyen-ky",
    exact: true,
  },
  loaiPhieu: {
    component: Page(LoaiPhieu, [ROLES["DANH_MUC"].LOAI_PHIEU]),
    accessRoles: [],
    path: "/danh-muc/loai-phieu",
    exact: true,
  },

  mauQms: {
    component: Page(MauQms, [ROLES["DANH_MUC"].MAU_QMS]),
    accessRoles: [],
    path: "/danh-muc/mau-qms",
    exact: true,
  },
  thuocKeNgoai: {
    component: Page(ThuocKeNgoai, [ROLES["DANH_MUC"].THUOC_KE_NGOAI]),
    accessRoles: [],
    path: "/danh-muc/thuoc-ke-ngoai",
    exact: true,
  },
  lieuDungBacSy: {
    component: Page(LieuDungBacSy, [ROLES["DANH_MUC"].LIEU_DUNG_BS]),
    accessRoles: [],
    path: "/danh-muc/lieu-dung-bac-si",
    exact: true,
  },

  kiosk: {
    component: Page(Kiosk, [ROLES["THIET_LAP"].KIOSK]),
    accessRoles: [],
    path: "/danh-muc/kiosk",
    exact: true,
  },
  hdsd: {
    component: Page(HuongDanSuDung, [ROLES["DANH_MUC"].HDSD]),
    accessRoles: [],
    path: "/danh-muc/huong-dan-su-dung",
    exact: true,
  },
  hoiDong: {
    component: Page(HoiDong, [ROLES["DANH_MUC"].HOI_DONG]),
    accessRoles: [],
    path: "/danh-muc/hoi-dong",
    exact: true,
  },
  ngoaiDieuTri: {
    component: Page(NgoaiDieuTri, [ROLES["DANH_MUC"].DV_NGOAI_DIEU_TRI]),
    accessRoles: [],
    path: "/danh-muc/ngoai-dieu-tri",
    exact: true,
  },
  DonViChiNhanh: {
    component: Page(DonViChiNhanh),
    accessRoles: [],
    path: "/danh-muc/don-vi-chi-nhanh",
    exact: true,
  },
  loaiGiuong: {
    component: Page(LoaiGiuong),
    accessRoles: [],
    path: "/danh-muc/loai-giuong",
    exact: true,
  },
  soHieuGiuong: {
    component: Page(SoHieuGiuong),
    accessRoles: [],
    path: "/danh-muc/so-hieu-giuong",
    exact: true,
  },
  dichVuGiuong: {
    component: Page(DichVuGiuong),
    accessRoles: [],
    path: "/danh-muc/dich-vu-giuong",
    exact: true,
  },
  bacSiNgoaiVien: {
    component: Page(BacSiNgoaiVien),
    accessRoles: [],
    path: "/danh-muc/bac-si-ngoai-vien",
    exact: true,
  },
  cheDoChamSoc: {
    component: Page(CheDoChamSoc),
    accessRoles: [],
    path: "/danh-muc/che-do-cham-soc",
    exact: true,
  },
  mauKetQuaPttt: {
    component: Page(MauKetQuaPTTT),
    accessRoles: [],
    path: "/danh-muc/mau-kq-pt-tt",
    exact: true,
  },
  dichVuAn: {
    component: Page(DichVuAn, [ROLES["DANH_MUC"].DICH_VU_AN]),
    accessRoles: [],
    path: "/danh-muc/dich-vu-an",
    exact: true,
  },
  loaiHinhThanhToan: {
    component: Page(LoaiHinhThanhToan, []),
    accessRoles: [],
    path: "/danh-muc/loai-hinh-thanh-toan",
    exact: true,
  },
  chiSoSong: {
    component: Page(ChiSoSong, [ROLES["DANH_MUC"].CHI_SO_SONG]),
    accessRoles: [],
    path: "/danh-muc/chi-so-song",
    exact: true,
  },
  phanLoaiBmi: {
    component: Page(PhanLoaiBmi, [ROLES["DANH_MUC"].PHAN_LOAI_BMI]),
    accessRoles: [],
    path: "/danh-muc/phan-loai-bmi",
    exact: true,
  },
  ngayNghiLe: {
    component: Page(NgayNghiLe, [ROLES["DANH_MUC"].NGAY_NGHI_LE]),
    accessRoles: [],
    path: "/danh-muc/ngay-nghi-le",
    exact: true,
  },
  hauQuaTuongTac: {
    component: Page(HauQuaTuongTac, [ROLES["DANH_MUC"].HAU_QUA_TUONG_TAC]),
    accessRoles: [],
    path: "/danh-muc/hau-qua-tuong-tac",
    exact: true,
  },
  dacTinhDuocLy: {
    component: Page(DacTinhDuocLy, [ROLES["DANH_MUC"].DAC_TINH_DUOC_LY]),
    accessRoles: [],
    path: "/danh-muc/dac-tinh-duoc-ly",
    exact: true,
  },
  mucDoTuongTac: {
    component: Page(MucDoTuongTac, [ROLES["DANH_MUC"].MUC_DO_TUONG_TAC]),
    accessRoles: [],
    path: "/danh-muc/muc-do-tuong-tac",
    exact: true,
  },
  tuongTacThuoc: {
    component: Page(TuongTacThuoc, [ROLES["DANH_MUC"].TUONG_TAC_THUOC]),
    accessRoles: [],
    path: "/danh-muc/tuong-tac-thuoc",
    exact: true,
  },
  chiPhiHapSayVTYTTaiSuDung: {
    component: Page(ChiPhiHapSayVTYTTaiSuDung, [
      ROLES["DANH_MUC"].CHI_PHI_HAP_SAY,
    ]),
    accessRoles: [],
    path: "/danh-muc/chi-phi-hap-say-vtyt-tai-su-dung",
    exact: true,
  },
};

const pageTDDT = {
  subPageTheoDoiDieuTri: {
    component: Page(SubPageTDDT, []),
    accessRoles: [],
    path: "/theo-doi-nguoi-benh",
    exact: true,
  },
  danhSachNguoiBenh: {
    component: Page(DanhSachNguoiBenhTheoDoi, []),
    accessRoles: [],
    path: ["/theo-doi-nguoi-benh/danh-sach-nguoi-benh"],
    exact: true,
  },
  chiTietTheoDoiDieuTri: {
    component: Page(ChiTietTheoDoiDieuTri, []),
    accessRoles: [],
    path: ["/theo-doi-nguoi-benh/danh-sach-nguoi-benh/chi-tiet/:id"],
    exact: true,
  },
};

const pageQMS = {
  qmsDoc: {
    component: Page(QmsDoc, []),
    accessRoles: [],
    path: "/qms/thiet-lap-doc",
    exact: true,
  },
  qmsNgang: {
    component: Page(QmsNgang, []),
    accessRoles: [],
    path: "/qms/thiet-lap-ngang",
    exact: true,
  },
  qmsDocKhamBenh: {
    component: Page(QmsDocKhamBenh, []),
    accessRoles: [],
    path: ["/qms/qms-doc/kham-benh"],
    exact: true,
  },
  qmsNgangKhamBenh: {
    component: Page(QmsNgangKhamBenh, []),
    accessRoles: [],
    path: ["/qms/qms-ngang/kham-benh"],
    exact: true,
  },
  qmsDocChanDoanHinhAnh: {
    component: Page(QmsDocChanDoanHinhAnh, []),
    accessRoles: [],
    path: ["/qms/qms-doc/chan-doan-hinh-anh"],
    exact: true,
  },
  qmsNgangChanDoanHinhAnh: {
    component: Page(QmsNgangChanDoanHinhAnh, []),
    accessRoles: [],
    path: ["/qms/qms-ngang/chan-doan-hinh-anh"],
    exact: true,
  },
  qmsNgangXetNghiem: {
    component: Page(QmsNgangXetNghiem, []),
    accessRoles: [],
    path: ["/qms/qms-ngang/xet-nghiem"],
    exact: true,
  },
  qmsDocXetNghiem: {
    component: Page(QmsDocXetNghiem, []),
    accessRoles: [],
    path: ["/qms/qms-doc/xet-nghiem"],
    exact: true,
  },
  qmsNgangKhamBenh2: {
    component: Page(QmsNgangKhamBenh2, []),
    accessRoles: [],
    path: ["/qms/qms-ngang/kham-benh2"],
    exact: true,
  },
  qmsTiepDon: {
    component: Page(QmsTiepDon, []),
    accessRoles: [],
    path: ["/qms/qms-ngang/tiep-don"],
    exact: true,
  },
};

const pageBaoCao = {
  subPageBaoCao: {
    component: Page(SubPageBaoCao, []),
    accessRoles: [],
    path: "/bao-cao",
    exact: true,
  },
  pk01: {
    component: Page(PK01, [ROLES["BAO_CAO"].NGUOI_BENH_KHAM_CHI_TIET]),
    accessRoles: [],
    path: "/bao-cao/danh-sach-nguoi-benh-kham-chi-tiet",
    exact: true,
  },
  pk02: {
    component: Page(PK02, [ROLES["BAO_CAO"].NGUOI_BENH_CO_LICH_HEN_KHAM]),
    accessRoles: [],
    path: "/bao-cao/danh-sach-nguoi-benh-co-lich-hen-kham",
    exact: true,
  },
  pk03: {
    component: Page(PK03, [ROLES["BAO_CAO"].PK03]),
    accessRoles: [],
    path: "/bao-cao/pk-03",
    exact: true,
  },
  bc01: {
    component: Page(BC01, [ROLES["BAO_CAO"].BC01]),
    accessRoles: [],
    path: "/bao-cao/bc-01",
    exact: true,
  },
  bc02: {
    component: Page(BC02, [ROLES["BAO_CAO"].BC02]),
    accessRoles: [],
    path: "/bao-cao/chi-tiet-nguoi-benh-da-tiep-don",
    exact: true,
  },
  bc03: {
    component: Page(BC03, [ROLES["BAO_CAO"].BC03]),
    accessRoles: [],
    path: "/bao-cao/bc-03",
    exact: true,
  },
  bc04: {
    component: Page(BC04, [ROLES["BAO_CAO"].BC04]),
    accessRoles: [],
    path: "/bao-cao/bc-04",
    exact: true,
  },
  bc05: {
    component: Page(BC05, [ROLES["BAO_CAO"].BC05]),
    accessRoles: [],
    path: "/bao-cao/bc-05",
    exact: true,
  },
  bc06: {
    component: Page(BC06, [ROLES["BAO_CAO"].BC06]),
    accessRoles: [],
    path: "/bao-cao/bc-06",
    exact: true,
  },
  bc07: {
    component: Page(BC07, [ROLES["BAO_CAO"].BC07]),
    accessRoles: [],
    path: "/bao-cao/bc-07",
    exact: true,
  },
  bc08: {
    component: Page(BC08, [ROLES["BAO_CAO"].BC08]),
    accessRoles: [],
    path: "/bao-cao/bc-08",
    exact: true,
  },
  bc09: {
    component: Page(BC09, [ROLES["BAO_CAO"].BC09]),
    accessRoles: [],
    path: "/bao-cao/bc-09",
    exact: true,
  },
  bc10: {
    component: Page(BC10, [ROLES["BAO_CAO"].BC10]),
    accessRoles: [],
    path: "/bao-cao/bc-10",
    exact: true,
  },
  bc11: {
    component: Page(BC11, [ROLES["BAO_CAO"].BC11]),
    accessRoles: [],
    path: "/bao-cao/bc-11",
    exact: true,
  },
  thuTienNb: {
    component: Page(TongHopThuTienNb, [ROLES["BAO_CAO"].TONG_HOP_THU_TIEN_NB]),
    accessRoles: [],
    path: "/bao-cao/tong-hop-thu-tien-nb",
    exact: true,
  },
  tc02: {
    component: Page(TC02, [ROLES["BAO_CAO"].TC02]),
    accessRoles: [],
    path: "/bao-cao/tong-hop-chi-tiet-thu-chi-theo-thu-ngan",
    exact: true,
  },
  tc03: {
    component: Page(TC03, [ROLES["BAO_CAO"].TC03]),
    accessRoles: [],
    path: "/bao-cao/tc03",
    exact: true,
  },
  tc04: {
    component: Page(TC04, [ROLES["BAO_CAO"].TC04]),
    accessRoles: [],
    path: "/bao-cao/tc-04",
    exact: true,
  },
  tc05: {
    component: Page(TC05, [ROLES["BAO_CAO"].TC05]),
    accessRoles: [],
    path: "/bao-cao/tc05",
    exact: true,
  },
  tc06: {
    component: Page(TC06, [ROLES["BAO_CAO"].TC06]),
    accessRoles: [],
    path: "/bao-cao/tc06",
    exact: true,
  },
  tc07: {
    component: Page(TC07, [ROLES["BAO_CAO"].TC07]),
    accessRoles: [],
    path: "/bao-cao/tc07",
    exact: true,
  },
  tc08: {
    component: Page(TC08, [ROLES["BAO_CAO"].TC08]),
    accessRoles: [],
    path: "/bao-cao/tc08",
    exact: true,
  },
  tc09: {
    component: Page(TC09, [ROLES["BAO_CAO"].TC09]),
    accessRoles: [],
    path: "/bao-cao/tc09",
    exact: true,
  },
  tc10: {
    component: Page(TC10, [ROLES["BAO_CAO"].TC10]),
    accessRoles: [],
    path: "/bao-cao/tc10",
    exact: true,
  },
  tc11: {
    component: Page(TC11, [ROLES["BAO_CAO"].TC11]),
    accessRoles: [],
    path: "/bao-cao/tc11",
    exact: true,
  },
  tc12: {
    component: Page(TC12, [ROLES["BAO_CAO"].TC12]),
    accessRoles: [],
    path: "/bao-cao/tc12",
    exact: true,
  },
  tc13: {
    component: Page(TC13, [ROLES["BAO_CAO"].TC13]),
    accessRoles: [],
    path: "/bao-cao/tc13",
    exact: true,
  },
  tc14: {
    component: Page(TC14, [ROLES["BAO_CAO"].TC14]),
    accessRoles: [ROLES["BAO_CAO"].TC14],
    path: "/bao-cao/tc14",
    exact: true,
  },
  tc15: {
    component: Page(TC15, [ROLES["BAO_CAO"].TC15]),
    accessRoles: [ROLES["BAO_CAO"].TC15],
    path: "/bao-cao/tc15",
    exact: true,
  },
  tc16: {
    component: Page(TC16, [ROLES["BAO_CAO"].TC16]),
    accessRoles: [ROLES["BAO_CAO"].TC16],
    path: "/bao-cao/tc16",
    exact: true,
  },
  tc17: {
    component: Page(TC17, [ROLES["BAO_CAO"].TC17]),
    accessRoles: [ROLES["BAO_CAO"].TC17],
    path: "/bao-cao/tc17",
    exact: true,
  },
  tc17_1: {
    component: Page(TC17_1, [ROLES["BAO_CAO"].TC17_1]),
    accessRoles: [ROLES["BAO_CAO"].TC17_1],
    path: "/bao-cao/tc17.1",
    exact: true,
  },
  tc18: {
    component: Page(TC18, [ROLES["BAO_CAO"].TC18]),
    accessRoles: [ROLES["BAO_CAO"].TC18],
    path: "/bao-cao/tc18",
    exact: true,
  },
  tc20: {
    component: Page(TC20, [ROLES["BAO_CAO"].TC20]),
    accessRoles: [ROLES["BAO_CAO"].TC20],
    path: "/bao-cao/tc20",
    exact: true,
  },
  tc20_1: {
    component: Page(TC20_1, [ROLES["BAO_CAO"].TC20_1]),
    accessRoles: [ROLES["BAO_CAO"].TC20_1],
    path: "/bao-cao/tc20.1",
    exact: true,
  },
  tc21: {
    component: Page(TC21, [ROLES["BAO_CAO"].TC21]),
    accessRoles: [ROLES["BAO_CAO"].TC21],
    path: "/bao-cao/tc21",
    exact: true,
  },
  tc22: {
    component: Page(TC22, [ROLES["BAO_CAO"].TC22]),
    accessRoles: [ROLES["BAO_CAO"].TC22],
    path: "/bao-cao/tc22",
    exact: true,
  },
  tc23: {
    component: Page(TC23, [ROLES["BAO_CAO"].TC23]),
    accessRoles: [ROLES["BAO_CAO"].TC23],
    path: "/bao-cao/tc23",
    exact: true,
  },
  tc24: {
    component: Page(TC24, [ROLES["BAO_CAO"].TC24]),
    accessRoles: [ROLES["BAO_CAO"].TC24],
    path: "/bao-cao/tc24",
    exact: true,
  },

  nhaCungCap: {
    component: Page(NhaCungCap, [ROLES["BAO_CAO"].NHAP_THEO_NHA_CC]),
    accessRoles: [],
    path: "/bao-cao/nhap-theo-nha-cung-cap",
    exact: true,
  },
  hoaDonNhap: {
    component: Page(K01, [ROLES["BAO_CAO"].BANG_KE_HOA_DON_NHAP]),
    accessRoles: [],
    path: "/bao-cao/bang-ke-hoa-don-nhap",
    exact: true,
  },
  k01_2: {
    component: Page(K01_2, [ROLES["BAO_CAO"].K01_2]),
    accessRoles: [],
    path: "/bao-cao/k01_2",
    exact: true,
  },
  k02: {
    component: Page(K02, [ROLES["BAO_CAO"].XUAT_NHAP_TON_KHO]),
    accessRoles: [],
    path: "/bao-cao/k02",
    exact: true,
  },
  k02_1: {
    component: Page(K02_1, [ROLES["BAO_CAO"].K02_1]),
    accessRoles: [],
    path: "/bao-cao/k02_1",
    exact: true,
  },
  k03: {
    component: Page(K03, [ROLES["BAO_CAO"].CHI_TIET_XUAT_KHO]),
    accessRoles: [],
    path: "/bao-cao/k03",
    exact: true,
  },
  k04: {
    component: Page(K04, [ROLES["BAO_CAO"].THE_KHO]),
    accessRoles: [],
    path: "/bao-cao/k04",
    exact: true,
  },
  k05: {
    component: Page(K05, [ROLES["BAO_CAO"].CHI_TIET_NHAP_KHO]),
    accessRoles: [],
    path: "/bao-cao/k05",
    exact: true,
  },
  k07: {
    component: Page(K07, [ROLES["BAO_CAO"].K07]),
    accessRoles: [],
    path: "/bao-cao/k07",
    exact: true,
  },
  k08: {
    component: Page(K08, [ROLES["BAO_CAO"].K08]),
    accessRoles: [],
    path: "/bao-cao/k08",
    exact: true,
  },
  k10: {
    component: Page(K10, [ROLES["BAO_CAO"].K10]),
    accessRoles: [],
    path: "/bao-cao/k10",
    exact: true,
  },
  k11: {
    component: Page(K11, [ROLES["BAO_CAO"].K11]),
    accessRoles: [],
    path: "/bao-cao/k11",
    exact: true,
  },
  k12: {
    component: Page(K12, [ROLES["BAO_CAO"].K12]),
    accessRoles: [],
    path: "/bao-cao/k12",
    exact: true,
  },
  k13: {
    component: Page(K13, [ROLES["BAO_CAO"].K13]),
    accessRoles: [],
    path: "/bao-cao/k13",
    exact: true,
  },
  k14: {
    component: Page(K14, [ROLES["BAO_CAO"].K14]),
    accessRoles: [ROLES["BAO_CAO"].K14],
    path: "/bao-cao/k14",
    exact: true,
  },
  kvt01_1: {
    component: Page(KVT01_1, [ROLES["BAO_CAO"].KVT01_1]),
    accessRoles: [],
    path: "/bao-cao/kvt01_1",
    exact: true,
  },
  kvt02: {
    component: Page(KVT02, [ROLES["BAO_CAO"].KVT02]),
    accessRoles: [],
    path: "/bao-cao/kvt02",
    exact: true,
  },
  kvt03: {
    component: Page(KVT03, [ROLES["BAO_CAO"].KVT03]),
    accessRoles: [],
    path: "/bao-cao/kvt03",
    exact: true,
  },
  knt01: {
    component: Page(KNT01, [ROLES["BAO_CAO"].KNT01]),
    accessRoles: [],
    path: "/bao-cao/knt01",
    exact: true,
  },
  knt03: {
    component: Page(KNT03, [ROLES["BAO_CAO"].KNT03]),
    accessRoles: [],
    path: "/bao-cao/knt03",
    exact: true,
  },
  knt02: {
    component: Page(KNT02, [ROLES["BAO_CAO"].KNT02]),
    accessRoles: [],
    path: "/bao-cao/knt02",
    exact: true,
  },
  knt04: {
    component: Page(KNT04, [ROLES["BAO_CAO"].KNT04]),
    accessRoles: [],
    path: "/bao-cao/knt04",
    exact: true,
  },
  knt05: {
    component: Page(KNT05, [ROLES["BAO_CAO"].KNT05]),
    accessRoles: [],
    path: "/bao-cao/knt05",
    exact: true,
  },
  knt06: {
    component: Page(KNT06, [ROLES["BAO_CAO"].KNT06]),
    accessRoles: [],
    path: "/bao-cao/knt06",
    exact: true,
  },
  knt07: {
    component: Page(KNT07, []),
    accessRoles: [],
    path: "/bao-cao/knt07",
    exact: true,
  },
  bangKe6556: {
    component: Page(BCXXX, []),
    accessRoles: [],
    path: "/bao-cao/bangKe6556",
    exact: true,
  },
  ksk01: {
    component: Page(KSK01, [ROLES["BAO_CAO"].KSK01]),
    accessRoles: [],
    path: "/bao-cao/ksk-01",
    exact: true,
  },
  ksk02: {
    component: Page(KSK02, [ROLES["BAO_CAO"].KSK02]),
    accessRoles: [],
    path: "/bao-cao/ksk-02",
    exact: true,
  },
  ksk04: {
    component: Page(KSK04, [ROLES["BAO_CAO"].KSK04]),
    accessRoles: [],
    path: "/bao-cao/ksk-04",
    exact: true,
  },
  ksk05: {
    component: Page(KSK05, [ROLES["BAO_CAO"].KSK05]),
    accessRoles: [],
    path: "/bao-cao/ksk-05",
    exact: true,
  },
  ksk12: {
    component: Page(KSK12, [ROLES["BAO_CAO"].KSK12]),
    accessRoles: [],
    path: "/bao-cao/ksk-12",
    exact: true,
  },
  g01: {
    component: Page(G01, [ROLES["BAO_CAO"].G01]),
    accessRoles: [],
    path: "/bao-cao/g-01",
    exact: true,
  },
  g02: {
    component: Page(G02, [ROLES["BAO_CAO"].G02]),
    accessRoles: [],
    path: "/bao-cao/g-02",
    exact: true,
  },
  g03: {
    component: Page(G03, [ROLES["BAO_CAO"].G03]),
    accessRoles: [],
    path: "/bao-cao/g-03",
    exact: true,
  },
  g04: {
    component: Page(G04, [ROLES["BAO_CAO"].G04]),
    accessRoles: [ROLES["BAO_CAO"].G04],
    path: "/bao-cao/g-04",
    exact: true,
  },
  khth01: {
    component: Page(KHTH01, [ROLES["BAO_CAO"].KHTH01]),
    accessRoles: [ROLES["BAO_CAO"].KHTH01],
    path: "/bao-cao/khth-01",
    exact: true,
  },
  khth02: {
    component: Page(KHTH02, [ROLES["BAO_CAO"].KHTH02]),
    accessRoles: [ROLES["BAO_CAO"].KHTH02],
    path: "/bao-cao/khth-02",
    exact: true,
  },
  khth03: {
    component: Page(KHTH03, [ROLES["BAO_CAO"].KHTH03]),
    accessRoles: [ROLES["BAO_CAO"].KHTH03],
    path: "/bao-cao/khth-03",
    exact: true,
  },
  khth04: {
    component: Page(KHTH04, [ROLES["BAO_CAO"].KHTH04]),
    accessRoles: [ROLES["BAO_CAO"].KHTH04],
    path: "/bao-cao/khth-04",
    exact: true,
  },
  khth05: {
    component: Page(KHTH05, [ROLES["BAO_CAO"].KHTH05]),
    accessRoles: [ROLES["BAO_CAO"].KHTH05],
    path: "/bao-cao/khth-05",
    exact: true,
  },
  khth06: {
    component: Page(KHTH06, [ROLES["BAO_CAO"].KHTH06]),
    accessRoles: [ROLES["BAO_CAO"].KHTH06],
    path: "/bao-cao/khth-06",
    exact: true,
  },
  khth07: {
    component: Page(KHTH07, [ROLES["BAO_CAO"].KHTH07]),
    accessRoles: [ROLES["BAO_CAO"].KHTH07],
    path: "/bao-cao/khth-07",
    exact: true,
  },
  pttt01: {
    component: Page(PTTT01, []),
    accessRoles: [],
    path: "/bao-cao/pttt-01",
    exact: true,
  },
};

const pageQuyetToanBHYT = {
  subPageQuyetToanBHYT: {
    component: Page(SubPageQuyetToanBHYT, []),
    accessRoles: [],
    path: "/quyet-toan-bhyt",
    exact: true,
  },
  danhSachNguoiBenhChoTaoHoSoBHYT: {
    component: Page(DanhSachNguoiBenhChoTaoHoSoBHYT, [
      ROLES["HE_THONG"].QUYET_TOAN_BHYT,
    ]),
    accessRoles: [],
    path: "/quyet-toan-bhyt/danh-sach-nguoi-benh-cho-tao-ho-so-quyet-toan-bhyt",
    exact: true,
  },
  chiTietDanhSachNguoiBenhChoTaoHoSoBHYT: {
    component: Page(ChiTietDanhSachNguoiBenhChoTaoHoSoBHYT, [
      ROLES["HE_THONG"].QUYET_TOAN_BHYT,
    ]),
    accessRoles: [],
    path: "/quyet-toan-bhyt/danh-sach-nguoi-benh-cho-tao-ho-so-quyet-toan-bhyt/chi-tiet/:id",
    exact: true,
  },
  danhSachHoSoBaoHiem79a46CotTheoQD4210: {
    component: Page(DanhSachHoSoBaoHiem79a46CotTheoQD4210, [
      ROLES["HE_THONG"].QUYET_TOAN_BHYT,
    ]),
    accessRoles: [],
    path: "/quyet-toan-bhyt/danh-sach-ho-so-bao-hiem-79a-46cot-theo-qd4210",
    exact: true,
  },
  chiTietDanhSachHoSoBaoHiem79a46CotTheoQD4210: {
    component: Page(ChiTietDanhSachHoSoBaoHiem79a46CotTheoQD4210, [
      ROLES["HE_THONG"].QUYET_TOAN_BHYT,
    ]),
    accessRoles: [],
    path: "/quyet-toan-bhyt/danh-sach-ho-so-bao-hiem-79a-46cot-theo-qd4210/chi-tiet/:id",
    exact: true,
  },
};

const pages = {
  home: {
    component: Page(SubPageHome, ["home_trangChu"]),
    accessRoles: [],
    path: ["/trang-chu", "/"],
    exact: true,
  },
  login: {
    component: Page(Login, []),
    accessRoles: [],
    path: "/login",
    exact: true,
  },
  kios: {
    component: Page(Kios, []),
    accessRoles: [],
    path: "/kiosk",
    exact: false,
  },
  thuNgan: {
    component: Page(ThuNgan, []),
    accessRoles: [],
    path: "/thu-ngan",
  },
  xetNghiem: {
    component: Page(XetNghiem, []),
    accessRoles: [],
    path: "/xet-nghiem",
  },
  khamBenh: {
    component: Page(KhamBenh, [ROLES["KHAM_BENH"].XEM]),
    accessRoles: [],
    path: [
      "/kham-benh/:phongThucHienId/:maHoSo/:dichVu",
      "/kham-benh/:maHoSo",
      "/kham-benh",
    ],
  },
  thongBao: {
    component: Page(QuanLyThongBao, []),
    accessRoles: [],
    path: "/quan-ly-thong-bao",
    exact: true,
  },
  kho: {
    component: Page(KhoPage, []),
    accessRoles: [],
    path: "/kho",
    exact: false,
  },
  thietLap: {
    component: Page(ThietLapPage, []),
    accessRoles: [],
    path: "/thiet-lap",
    exact: false,
  },
  quanTri: {
    component: Page(QuanTriPage, []),
    accessRoles: [],
    path: "/quan-tri",
    exact: false,
  },
  chanDoanHinhAnh: {
    component: Page(ChanDoanHinhAnh, []),
    accessRoles: [],
    path: "/chan-doan-hinh-anh",
    exact: false,
  },
  kySo: {
    component: Page(KySo, []),
    accessRoles: [],
    path: "/ky-so",
  },
  hoSoBenhAn: {
    component: Page(HoSoBenhAn, []),
    accessRoles: [],
    path: "/ho-so-benh-an",
    exact: false,
  },
  theoDoiDieuTri: {
    component: Page(TheoDoiDieuTri, []),
    accessRoles: [],
    path: "/theo-doi-nguoi-benh",
  },
  qms: {
    component: Page(Qms, []),
    accessRoles: [],
    path: "/qms",
    exact: false,
  },
  baoCao: {
    component: Page(BaoCaoPages, []),
    accessRoles: [],
    path: ["/bao-cao"],
  },
  dashboard: {
    component: Page(Dashboard, []),
    accessRoles: [],
    path: ["/dashboard"],
  },
  danhMuc: {
    component: Page(DanhMuc, []),
    accessRoles: [],
    path: "/danh-muc",
    exact: false,
  },
  quyetToanBHYT: {
    component: Page(quyetToanBHYT, []),
    accessRoles: [],
    path: "/quyet-toan-bhyt",
  },
  troGiup: {
    component: Page(TroGiup, []),
    accessRoles: [],
    path: "/tro-giup",
  },
  tiepDon: {
    component: Page(QuanLyTiepDon, []),
    accessRoles: [],
    path: ["/quan-ly-tiep-don", "/tiep-don"],
  },
  quanLyNoiTru: {
    component: Page(QuanLyNoiTru, [ROLES["HE_THONG"].QUAN_LY_NOI_TRU]),
    accessRoles: [],
    path: "/quan-ly-noi-tru",
  },
  khamSucKhoe: {
    component: Page(QuanLyKhamSucKhoe, [ROLES["HE_THONG"].KHAM_SUC_KHOE]),
    accessRoles: [],
    path: ["/kham-suc-khoe"],
  },
  giayDayCong: {
    component: Page(DanhSachGiayDayCong, [ROLES["HE_THONG"].GIAY_DAY_CONG]),
    accessRoles: [],
    path: ["/danh-sach-giay-day-cong", "/giay-day-cong"],
  },
  sinhHieu: {
    component: Page(QuanLySinhHieu, []),
    accessRoles: [],
    path: ["/quan-ly-sinh-hieu", "/sinh-hieu"],
  },
  editorConfig: {
    component: Page(EditorConfig, []),
    accessRoles: [],
    path: "/editor/config/:formId",
  },
  editorReport: {
    component: Page(EditorReport, []),
    accessRoles: [],
    path: ["/editor/bao-cao/:maBaoCao/:id", "/editor/bao-cao/:maBaoCao"],
  },
  editorPreview: {
    component: Page(EditorPreview, []),
    accessRoles: [],
    path: "/editor/preview/:baoCaoId",
  },
  nhaThuoc: {
    component: Page(QuanLyNhaThuoc, []),
    accessRoles: [],
    path: ["/quan-ly-nha-thuoc", "/nha-thuoc"],
  },
  goiDichVu: {
    component: Page(QuanLyGoiDichVu, [ROLES["HE_THONG"].GOI_DICH_VU]),
    accessRoles: [],
    path: ["/goi-dich-vu"],
  },
  phauThuatThuThuat: {
    component: Page(PhauThuatThuThuat, [
      ROLES["HE_THONG"].PHAU_THUAT_THU_THUAT,
    ]),
    accessRoles: [ROLES["HE_THONG"].PHAU_THUAT_THU_THUAT],
    path: ["/phau-thuat-thu-thuat"],
  },
  createTemplate: {
    component: Page(EditorPreview, []),
    accessRoles: [],
    path: "/editor/template/:baoCaoId",
  },
};

const dashboard = {
  subPageDashboard: {
    component: Page(SubPageDashboard, []),
    accessRoles: [],
    path: "/dashboard",
    exact: true,
  },
  trinhChieuTv: {
    component: Page(TrinhChieuTv, []),
    accessRoles: [],
    path: "/dashboard/trinh-chieu-tv",
    exact: true,
  },
  soLieuBenhVien: {
    component: Page(soLieuBenhVien, []),
    accessRoles: [],
    path: "/dashboard/trinh-chieu-tv/so-lieu-benh-vien",
    exact: true,
  },
};

const troGiup = {
  troGiupHdsd: {
    component: Page(TroGiupHdsd, [ROLES.TRO_GIUP]),
    accessRoles: [],
    path: "/tro-giup/tro-giup-hdsd",
    exact: true,
  },
  htmlHdsd: {
    component: Page(HtmlHdsd, []),
    accessRoles: [],
    path: "/tro-giup/html-hdsd",
  },
  bangKeCPKb_Cb: {
    component: Page(BangKeCPKb_Cb, []),
    accessRoles: [],
    path: "/tro-giup/bang-ke-chi-phi-kb-cb-6556/:id",
  },
  video: {
    component: Page(VideoHdsd, []),
    accessRoles: [],
    path: "/tro-giup/video",
    exact: true,
  },
};

const pageTiepDon = {
  subPageTiepDon: {
    component: Page(SubPageTiepDon, []),
    accessRoles: [],
    path: "/quan-ly-tiep-don",
    exact: true,
  },
  tiepDon: {
    component: Page(TiepDon, [ROLES["TIEP_DON"].TIEP_DON]),
    accessRoles: [],
    path: "/tiep-don",
    exact: true,
  },
  guide: {
    component: Page(Guide, []),
    accessRoles: [],
    path: "/tiep-don/huong-dan-thuc-hien-dich-vu/:id",
    exact: true,
  },
  keDichVu: {
    component: Page(KeDichVu, [ROLES["TIEP_DON"].KE_DV]),
    accessRoles: [],
    path: "/tiep-don/dich-vu/:id",
    exact: true,
  },
  danhSachNBTiepDon: {
    component: Page(DanhSachNBTiepDon, [ROLES["TIEP_DON"].XEM_LAI_TT]),
    accessRoles: [],
    path: "/quan-ly-tiep-don/danh-sach-nb-da-tiep-don",
    exact: true,
  },
  danhSachNBHuyTiepDon: {
    component: Page(DanhSachNBHuyTiepDon, [ROLES["TIEP_DON"].XEM_LAI_TT]),
    accessRoles: [],
    path: "/quan-ly-tiep-don/danh-sach-nb-huy-tiep-don",
    exact: true,
  },
  chiTietNbDaTiepDon: {
    component: Page(ChiTietNbDaTiepDon, []),
    accessRoles: [],
    path: "/quan-ly-tiep-don/danh-sach-nb-da-tiep-don/:id",
    exact: true,
  },
};

const pageQuanLyNoiTru = {
  subPageQuanLyNoiTru: {
    component: Page(SubPageQuanLyNoiTru, []),
    accessRoles: [],
    path: "/quan-ly-noi-tru",
    exact: true,
  },
  danhSachLapBenhAn: {
    component: Page(DanhSachLapBenhAn, [
      ROLES["QUAN_LY_NOI_TRU"].DANH_SACH_LAP_BENH_AN,
    ]),
    accessRoles: [],
    path: "/quan-ly-noi-tru/danh-sach-lap-benh-an",
    exact: true,
  },
  chiTietBenhAn: {
    component: Page(ChiTietBenhAn, [
      ROLES["QUAN_LY_NOI_TRU"].CHI_TIET_LAP_BENH_AN,
    ]),
    accessRoles: [],
    path: "/quan-ly-noi-tru/chi-tiet-lap-benh-an/:id",
    exact: true,
  },
  danhSachNguoiBenhNoiTru: {
    component: Page(DanhSachNguoiBenhNoiTru, [
      ROLES["QUAN_LY_NOI_TRU"].DANH_SACH_NB_NOI_TRU,
    ]),
    accessRoles: [],
    path: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
    exact: true,
  },
  chiTietNguoiBenhNoiTru: {
    component: Page(ChiTietNguoiBenhNoiTru, [
      ROLES["QUAN_LY_NOI_TRU"].CHI_TIET_NOI_TRU,
    ]),
    accessRoles: [],
    path: [
      "/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/:id",
      "/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/:id/to-dieu-tri/them-moi",
    ],
    exact: true,
  },

  toDieuTri: {
    component: Page(ToDieuTri, []),
    accessRoles: [],
    path: ["/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/to-dieu-tri/:id"],
    exact: true,
  },
  themMoiPhieuSoKet: {
    component: Page(ThemMoiPhieuSoKet, []),
    accessRoles: [],
    path: "/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/phieu-so-ket/them-moi",
    exact: true,
  },
  chiTietPhieuSoKet: {
    component: Page(ChiTietPhieuSoKet, []),
    accessRoles: [],
    path: [
      "/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/phieu-so-ket/chi-tiet/:id",
      "/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/phieu-so-ket/chinh-sua/:id",
    ],
    exact: true,
  },
  danhSachPhieuLinh: {
    component: Page(DanhSachPhieuLinh, []),
    accessRoles: [],
    path: ["/quan-ly-noi-tru/danh-sach-phieu-linh"],
    exact: true,
  },
  danhSachPhieuTra: {
    component: Page(DanhSachPhieuTra, []),
    accessRoles: [],
    path: ["/quan-ly-noi-tru/danh-sach-phieu-tra"],
    exact: true,
  },
  danhSachPhieuLinhSuatAn: {
    component: Page(DanhSachPhieuLinhSuatAn, []),
    accessRoles: [],
    path: ["/quan-ly-noi-tru/danh-sach-phieu-linh-suat-an"],
    exact: true,
  },
  danhSachPhieuTraSuatAn: {
    component: Page(DanhSachPhieuTraSuatAn, []),
    accessRoles: [],
    path: ["/quan-ly-noi-tru/danh-sach-phieu-tra-suat-an"],
    exact: true,
  },
  chiTietPhieuLinhSuatAn: {
    component: Page(ChiTietPhieuLinhSuatAn, []),
    accessRoles: [],
    path: ["/quan-ly-noi-tru/chi-tiet-phieu-linh-suat-an/:id"],
    exact: true,
  },
  chiTietPhieuTraSuatAn: {
    component: Page(ChiTietPhieuTraSuatAn, []),
    accessRoles: [],
    path: ["/quan-ly-noi-tru/chi-tiet-phieu-tra-suat-an/:id"],
    exact: true,
  },
  chiTietPhieuLinh: {
    component: Page(ChiTietPhieuLinh, []),
    accessRoles: [],
    path: ["/quan-ly-noi-tru/chi-tiet-phieu-linh/:id"],
    exact: true,
  },
  ChiTietPhieuTra: {
    component: Page(ChiTietPhieuTra, []),
    accessRoles: [],
    path: ["/quan-ly-noi-tru/chi-tiet-phieu-tra/:id"],
    exact: true,
  },
  themMoiBienBanHoiChan: {
    component: Page(ThemMoiBienBanHoiChan, []),
    accessRoles: [],
    path: "/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/bien-ban-hoi-chan/them-moi",
    exact: true,
  },
  chiTietBienBanHoiChan: {
    component: Page(ChiTietBienBanHoiChan, []),
    accessRoles: [],
    path: "/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/bien-ban-hoi-chan/chi-tiet/:id",
    exact: true,
  },
  danhSachGiaHanThe: {
    component: Page(DanhSachGiaHanThe, []),
    accessRoles: [],
    path: "/quan-ly-noi-tru/gia-han-the-chuyen-doi-tuong",
    exact: true,
  },
  chiTietGiaHanThe: {
    component: Page(ChiTietGiaHanThe, []),
    accessRoles: [],
    path: "/quan-ly-noi-tru/chi-tiet-gia-han-the/:id",
    exact: true,
  },
  danhSachNguoiBenhTraDichVu: {
    component: Page(DanhSachNguoiBenhNoiTruTraDv, [
      ROLES["QUAN_LY_NOI_TRU"].DANH_SACH_NB_NOI_TRU,
    ]),
    accessRoles: [],
    path: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru-tra-dich-vu",
    exact: true,
  },
  chiTietNguoiBenhNoiTruTraDv: {
    component: Page(ChiTietNguoiBenhNoiTruTraDv, [
      ROLES["QUAN_LY_NOI_TRU"].DANH_SACH_NB_NOI_TRU,
    ]),
    accessRoles: [],
    path: "/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru-tra-dich-vu/:id",
    exact: true,
  },
  chiTietTraHangHoa: {
    component: Page(ChiTietTraHangHoa, [
      ROLES["QUAN_LY_NOI_TRU"].DANH_SACH_NB_NOI_TRU,
    ]),
    accessRoles: [],
    path: "/quan-ly-noi-tru/tra-hang-hoa/:id",
    exact: true,
  },
};

const pageKhamSucKhoe = {
  subPageKhamSucKhoe: {
    component: Page(SubPageKhamSucKhoe, []),
    accessRoles: [],
    path: "/kham-suc-khoe",
    exact: true,
  },
  phieuBaoGia: {
    component: Page(PhieuBaoGia, []),
    accessRoles: [],
    path: "/kham-suc-khoe/phieu-bao-gia",
    exact: true,
  },
  chiTietPhieuBaoGia: {
    component: Page(ChiTietPhieuBaoGia, []),
    accessRoles: [],
    path: [
      "/kham-suc-khoe/phieu-bao-gia/them-moi",
      "/kham-suc-khoe/phieu-bao-gia/chi-tiet/:id",
    ],
    exact: true,
  },
  hopDongKhamSucKhoe: {
    component: Page(HopDongKhamSucKhoe, []),
    accessRoles: [],
    path: "/kham-suc-khoe/hop-dong",
    exact: true,
  },
  chiTietHopDong: {
    component: Page(ChiTietHopDong, []),
    accessRoles: [],
    path: [
      "/kham-suc-khoe/hop-dong/them-moi",
      "/kham-suc-khoe/hop-dong/chi-tiet/:id",
    ],
    exact: true,
  },
};

const pageSinhHieu = {
  subPageSinhHieu: {
    component: Page(SubPageSinhHieu, []),
    accessRoles: [],
    path: "/quan-ly-sinh-hieu",
    exact: true,
  },
  dsSinhHieu: {
    component: Page(DanhSachSinhHieu, []),
    accessRoles: [],
    path: "/sinh-hieu/ds-sinh-hieu",
    exact: true,
  },
};

const pageNhaThuoc = {
  subPageNhaThuoc: {
    component: Page(SubPageNhaThuoc, []),
    accessRoles: [],
    path: "/quan-ly-nha-thuoc",
    exact: true,
  },
  donThuoc: {
    component: Page(DonThuoc, []),
    accessRoles: [],
    path: "/nha-thuoc",
    exact: true,
  },
  chiTietDonThuoc: {
    component: Page(ChiTietDonThuoc, []),
    accessRoles: [],
    path: ["/nha-thuoc/them-moi", "/nha-thuoc/chi-tiet/:id"],
    exact: true,
  },
  lienThongGPP: {
    component: Page(LienThongGPP, []),
    accessRoles: [],
    path: "/nha-thuoc/lien-thong-gpp",
    exact: true,
  },
  chiTietLienThongGPP: {
    component: Page(ChiTietLienThongGPP, []),
    accessRoles: [],
    path: [
      "/nha-thuoc/lien-thong-gpp/them-moi",
      "/nha-thuoc/lien-thong-gpp/chi-tiet/:id",
    ],
    exact: true,
  },
};

const pageGoiDichVu = {
  subPageGoiDichVu: {
    component: Page(SubPageGoiDichVu, []),
    accessRoles: [],
    path: "/goi-dich-vu",
    exact: true,
  },
  danhSachSuDungGoi: {
    component: Page(DanhSachSuDungGoi, []),
    accessRoles: [ROLES["GOI_DICH_VU"].DANH_SACH_NB_SU_DUNG_GOI_DICH_VU],
    path: "/goi-dich-vu/danh-sach-su-dung-goi",
    exact: true,
  },
  chiTietSuDungGoi: {
    component: Page(ChiTietSuDungGoi, []),
    accessRoles: [ROLES["GOI_DICH_VU"].CHI_TIET_NB_SU_DUNG_GOI_DICH_VU],
    path: "/goi-dich-vu/chi-tiet-nguoi-benh-su-dung-goi/:id",
    exact: true,
  },
  dmGoiDichVu: {
    component: Page(DmGoiDichVu),
    accessRoles: [ROLES["GOI_DICH_VU"].GOI_DICH_VU],
    path: "/goi-dich-vu/danh-muc",
    exact: true,
  },
};

const pagePhauThuatThuThuat = {
  subPagePhauThuatThuThuat: {
    component: Page(SubPagePhauThuatThuThuat, [
      ROLES["HE_THONG"].PHAU_THUAT_THU_THUAT,
    ]),
    accessRoles: [],
    path: "/phau-thuat-thu-thuat",
    exact: true,
  },
  danhSachNguoiBenhPTTT: {
    component: Page(DanhSachNguoiBenhPTTT, [
      ROLES["HE_THONG"].PHAU_THUAT_THU_THUAT,
    ]),
    accessRoles: [],
    path: "/phau-thuat-thu-thuat/danh-sach-nguoi-benh",
    exact: true,
  },
  chiTietPhauThuatThuThuat: {
    component: Page(ChiTietPhauThuat, [ROLES["HE_THONG"].PHAU_THUAT_THU_THUAT]),
    accessRoles: [],
    path: "/phau-thuat-thu-thuat/chi-tiet-phau-thuat/:id",
    exact: true,
  },
  danhSachPhieuLinh: {
    component: Page(DanhSachPhieuLinh, []),
    accessRoles: [],
    path: ["/phau-thuat-thu-thuat/danh-sach-phieu-linh"],
    exact: true,
  },
  chiTietPhieuLinhTra: {
    component: Page(ChiTietPhieuLinh, []),
    accessRoles: [],
    path: ["/phau-thuat-thu-thuat/chi-tiet-phieu-linh/:id"],
    exact: true,
  },
};

const pageGiayDayCong = {
  subPageGiayDayCong: {
    component: Page(SubPageGiayDayCong, [ROLES["HE_THONG"].GIAY_DAY_CONG]),
    accessRoles: [],
    path: "/danh-sach-giay-day-cong",
    exact: true,
  },
  dsGiayNghiHuong: {
    component: Page(DanhSachGiayNghiHuong, [
      ROLES["GIAY_DAY_CONG"].GIAY_NGHI_HUONG_DS,
    ]),
    accessRoles: [],
    path: "/giay-day-cong/giay-nghi-huong",
    exact: true,
  },
  dsNbTuVong: {
    component: Page(DanhSachNbTuVong, []),
    accessRoles: [],
    path: "/giay-day-cong/nb-tu-vong",
    exact: true,
  },
  dsNbRaVien: {
    component: Page(DanhSachNbRaVien, [ROLES["GIAY_DAY_CONG"].NB_RA_VIEN_DS]),
    accessRoles: [],
    path: "/giay-day-cong/nb-ra-vien",
    exact: true,
  },
};

export {
  vitalSignsPrint,
  pages,
  dashboard,
  pageDanhMuc,
  pageKiosk,
  pageThuNgan,
  pageXetNghiem,
  pageKho,
  pageThietLap,
  pageQuanTri,
  pageCDHA,
  pageHSBA,
  pageTDDT,
  pageQMS,
  pageKySo,
  pageBaoCao,
  pageQuyetToanBHYT,
  troGiup,
  pageTiepDon,
  pageQuanLyNoiTru,
  pageKhamSucKhoe,
  pageNhaThuoc,
  pageGoiDichVu,
  pagePhauThuatThuThuat,
  pageGiayDayCong,
  pageSinhHieu,
};
