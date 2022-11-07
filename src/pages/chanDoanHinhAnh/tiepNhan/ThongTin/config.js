import React from "react";
import IcThongTinCoBan from "assets/images/khamBenh/icThongTinCoBan.svg";
import IcChiDinh from "assets/images/khamBenh/icChiDinh.svg";
import IcKetQua from "assets/images/khamBenh/icKetQua.svg";
import IcKetLuan from "assets/images/khamBenh/icKetLuan.svg";
import IcDonThuoc from "assets/images/khamBenh/icDonThuoc.svg";

export const listNav = [
  {
    title: "khamBenh.dauTrang.chiDinh",
    icon: <IcChiDinh />,
    dataChild: [
      "khamBenh.dauTrang.xetNghiem",
      "khamBenh.dauTrang.cdhaTDCN",
      "khamBenh.dauTrang.camKetNoiSoi",
    ],
    color: "#4C0398",
    itemKey: "0",
  },
  {
    title: "khamBenh.dauTrang.ketQuaXN_CDHA_TDCN",
    icon: <IcKetQua />,
    dataChild: ["khamBenh.dauTrang.xetNghiem", "khamBenh.dauTrang.cdhaTDCN"],
    color: "#054AB9",
    itemKey: "3",
  },
  {
    title: "khamBenh.dauTrang.donThuoc",
    icon: <IcDonThuoc />,
    dataChild: ["cdha.donThuocThuong"],
    color: "linear-gradient(0deg, #049254, #049254), #0762F7",
    itemKey: "1",
  },
  {
    title: "khamBenh.dauTrang.vatTu",
    icon: <IcKetLuan />,
    dataChild: ["cdha.khoTuTruc"],
    color: "linear-gradient(0deg, #069BA7, #069BA7), #0762F7",
    itemKey: "2",
  },
];
