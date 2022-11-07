import React from "react";
import IcThongTinCoBan from "assets/images/khamBenh/icThongTinCoBan.svg";
import IcChiDinh from "assets/images/khamBenh/icChiDinh.svg";
import IcKetQua from "assets/images/khamBenh/icKetQua.svg";
import IcKetLuan from "assets/images/khamBenh/icKetLuan.svg";
import IcDonThuoc from "assets/images/khamBenh/icDonThuoc.svg";
import IcVatTu from "assets/images/khamBenh/icVatTu.svg";
import { TRANG_THAI_DICH_VU } from "constants/index";

export const DANH_SACH_DAU_TRANG = [
  {
    title: "khamBenh.dauTrang.thongTinKhamCoBan",
    icon: <IcThongTinCoBan />,
    // dataChild: ["Khám chung", "Khám chuyên khoa", "Khám sức khỏe"],
    dataChild: [
      { text: "Khám chung", i18n: "khamBenh.dauTrang.khamChung" },
      { text: "Khám sức khỏe", i18n: "khamBenh.dauTrang.khamSucKhoe" },
    ], //yến confirm bỏ
    color: "#B3304C",
    itemKey: "0",
    trangThai: 0,
  },
  {
    title: "khamBenh.dauTrang.chiDinh",
    icon: <IcChiDinh />,
    dataChild: [
      { text: "Xét nghiệm", i18n: "khamBenh.dauTrang.xetNghiem" },
      { text: "CDHA - TDCN", i18n: "khamBenh.dauTrang.cdhaTDCN" },
      { text: "Cam kết nội soi", i18n: "khamBenh.dauTrang.camKetNoiSoi" },
    ],
    color: "#4C0398",
    itemKey: "1",
  },
  {
    title: "khamBenh.dauTrang.kqXNCLS",
    icon: <IcKetQua />,
    dataChild: [
      { text: "Xét nghiệm", i18n: "khamBenh.dauTrang.xetNghiem" },
      { text: "CDHA - TDCN", i18n: "khamBenh.dauTrang.cdhaTDCN" },
    ],
    color: "#054AB9",
    itemKey: "2",
    trangThai: TRANG_THAI_DICH_VU.DANG_THUC_HIEN_DICH_VU,
  },
  {
    title: "khamBenh.dauTrang.ketLuanKham",
    icon: <IcKetLuan />,
    dataChild: [
      { text: "Tổng hợp khám chữa bệnh", i18n: "khamBenh.dauTrang.tongHopKCB" },
      { text: "Giấy hẹn khám", i18n: "khamBenh.dauTrang.giayHenKham" },
    ],
    color: "#069BA7",
    itemKey: "3",
    trangThai: TRANG_THAI_DICH_VU.DANG_KET_LUAN,
  },
  {
    title: "khamBenh.dauTrang.donThuoc",
    icon: <IcDonThuoc />,
    dataChild: [
      { text: "Đơn nhà thuốc", i18n: "khamBenh.dauTrang.donNhaThuoc" },
      { text: "Đơn TPCN", i18n: "khamBenh.dauTrang.donTPCN" },
      { text: "Đơn gây nghiện", i18n: "khamBenh.dauTrang.donGayNghien" },
    ],
    color: "#049254",
    itemKey: "4",
  },
  {
    title: "khamBenh.dauTrang.vatTu",
    icon: <IcVatTu />,
    dataChild: [{ text: "Vật tư kho", i18n: "khamBenh.dauTrang.vatTuKho" }],
    color: "#05B245",
    itemKey: "5",
  },
  {
    title: "khamBenh.dauTrang.goiDaChiDinh",
    icon: <IcChiDinh />,
    dataChild: [],
    color: "#05B245",
    itemKey: "6",
    trangThai: TRANG_THAI_DICH_VU.DANG_KHAM,
  },
];
