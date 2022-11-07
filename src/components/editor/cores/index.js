import React from "react";
import Label from "./Label";
import TextField from "./TextField";
import Barcode from "./Barcode";
import QRcode from "./QRcode";
import Date from "./DatePicker";
import {
  QrcodeOutlined,
  EditOutlined,
  CalendarOutlined,
  FontSizeOutlined,
  BarcodeOutlined,
  LayoutOutlined,
  CarryOutOutlined,
  TableOutlined,
  BuildOutlined,
  PictureOutlined,
  FileDoneOutlined,
  MinusOutlined,
  FileOutlined,
  BarsOutlined,
  FileTextOutlined,
  AppstoreAddOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import Layout from "./Layout";
import CheckGroups from "./CheckGroups";
import Table from "./Table";
// import BangTheoDoiBenhNhanHSTC from "./BangTheoDoiBenhNhanHSTC";
// import BangTheoDoiBenhNhanGMHS from "./BangTheoDoiBenhNhanGMHS";
// import BangTheoDoiHoiTinh from "./BangTheoDoiHoiTinh";
import InputNumber from "./InputNumber";
import CodeInput from "./CodeInput";
import InputGroup from "./InputGroup";
import Image from "./Image";
import ArrayConverter from "./ArrayConverter";
import ElectronicSignature from "./ElectronicSignature";
import BreakLine from "./BreakLine";
import Title from "./Title";
import Input from "./Input";
import NameWrapper from "./FieldsWrapper";
import Page from "./Page";
import DropDownList from "./DropDownList";
import ToDieuTri from "./ToDieuTri";
import BangKeChiPhiTongHop from "./BangKeChiPhi";

import { FORM_WIDTH } from "components/constanst";

export default {
  label: {
    name: "Label",
    component: Label,
    icon: <FontSizeOutlined />,
    defaultProps: {},
  },
  title: {
    name: "Title",
    component: Title,
    icon: <FontColorsOutlined />,
    defaultProps: {},
  },
  date: {
    name: "Date",
    component: Date,
    icon: <CalendarOutlined />,
    defaultProps: { dateTimeFormat: "D/M/Y" },
  },
  barcode: {
    name: "Barcode",
    component: Barcode,
    icon: <BarcodeOutlined />,
    defaultProps: {},
    groupKey: "qrbarcode",
  },
  qrcode: {
    name: "QRcode",
    component: QRcode,
    icon: <QrcodeOutlined />,
    defaultProps: {},
    groupKey: "qrbarcode",
  },
  layout: {
    name: "Layout",
    component: Layout,
    icon: <LayoutOutlined />,
    defaultProps: {},
  },
  groupCheck: {
    name: "GroupCheck",
    component: CheckGroups,
    icon: <CarryOutOutlined />,
    defaultProps: { checkList: [], direction: "ltr" },
  },
  table: {
    name: "Table",
    component: Table,
    icon: <TableOutlined />,
    defaultProps: {
      cols: [
        { key: 1, width: FORM_WIDTH * 0.4 },
        { key: 2, width: FORM_WIDTH * 0.1 },
        { key: 3, width: FORM_WIDTH * 0.25 },
        { key: 4, width: FORM_WIDTH * 0.25 },
        // { key: 6, width: FORM_WIDTH*0.1 },
      ],
      rows: [
        { key: 1 },
        { key: 2 },
        { key: 4 },
        { key: 5 },
        { key: 6 },
        { key: 7 },
        { key: 8 },
        { key: 9 },
      ],
    },
  },
  // bangTheoDoiBenhNhanHSTC: {
  //   name: "Bảng theo dõi bệnh nhân HSTC",
  //   component: BangTheoDoiBenhNhanHSTC,
  //   icon: "profile",
  //   defaultProps: {},
  // },
  // bangTheoDoiBenhNhanGMHS: {
  //   name: "Bảng theo dõi bệnh nhân GMHS",
  //   component: BangTheoDoiBenhNhanGMHS,
  //   icon: "profile",
  //   defaultProps: {
  //     showDongTu: true,
  //     showALMPB: true,
  //     showALTMTT: true,
  //     showServoran: true,
  //     showDesflurane: true,
  //     showHalotan: true,
  //     showMoreInfo: true,
  //   },
  // },
  // bangTheoDoiHoiTinh: {
  //   name: "Bảng theo dõi hồi tỉnh",
  //   component: BangTheoDoiHoiTinh,
  //   icon: "profile",
  //   defaultProps: {},
  // },
  inputCombo: {
    name: "Code input",
    component: CodeInput,
    icon: <BuildOutlined />,
    defaultProps: {
      size: 2,
      disabled: false,
      props: {
        fieldName: "",
      },
    },
  },
  image: {
    name: "Image",
    component: Image,
    icon: <PictureOutlined />,
    defaultProps: { width: 64, height: 64 },
  },
  textField: {
    name: "Text field",
    component: TextField,
    icon: <EditOutlined />,
    defaultProps: {},
    groupKey: "input",
  },
  inputNumber: {
    name: "InputNumber",
    component: InputNumber,
    icon: <EditOutlined />,
    defaultProps: {},
    groupKey: "input",
  },
  inputGroup: {
    name: "Input Group",
    component: InputGroup,
    icon: <EditOutlined />,
    defaultProps: {},
    groupKey: "input",
  },
  input: {
    name: "Input",
    component: Input,
    icon: <EditOutlined />,
    defaultProps: {},
    groupKey: "input",
  },
  arrayConverter: {
    name: "Array Converter",
    component: ArrayConverter,
    icon: <EditOutlined />,
    defaultProps: {},
  },
  nameWrapper: {
    name: "Field wrapper",
    component: NameWrapper,
    icon: <BuildOutlined />,
    defaultProps: {},
  },
  electronicSignature: {
    name: "Electronic Signature",
    component: ElectronicSignature,
    icon: <FileDoneOutlined />,
    defaultProps: {},
  },
  breakLine: {
    name: "Break Line",
    component: BreakLine,
    icon: <MinusOutlined />,
    defaultProps: { marginTop: 5, marginBottom: 5 },
  },
  page: {
    name: "Page",
    component: Page,
    icon: <FileOutlined />,
    defaultProps: {},
  },
  dropDownList: {
    name: "DropDownList",
    component: DropDownList,
    icon: <BarsOutlined />,
    defaultProps: {},
  },
  toDieuTri: {
    name: "ToDieuTri",
    component: ToDieuTri,
    icon: <FileTextOutlined />,
    defaultProps: {},
    groupKey: "more",
  },
  bangKeChiPhi: {
    name: "Bảng kê chi phí tổng hợp",
    component: BangKeChiPhiTongHop,
    icon: <FileTextOutlined />,
    defaultProps: {},
    groupKey: "more",
  },

  groups: [
    {
      groupKey: "more",
      name: "More",
      icon: <AppstoreAddOutlined />,
    },
    {
      groupKey: "qrbarcode",
      name: "QR-Barcode",
      icon: <QrcodeOutlined />,
    },
    {
      groupKey: "input",
      name: "Input",
      icon: <EditOutlined />,
    },
  ],
};
