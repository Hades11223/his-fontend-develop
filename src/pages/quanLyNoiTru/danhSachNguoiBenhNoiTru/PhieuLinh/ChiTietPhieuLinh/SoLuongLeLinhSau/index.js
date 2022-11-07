import React from "react";
import SoLuongLeLinh from "../SoLuongLeLinh";

const SoLuongLeLinhSau = (props) => {
  const renderColumns = ({ commonCol }) => [
    commonCol.check,
    commonCol.stt,
    commonCol.maBenhAn,
    commonCol.tenNb,
    commonCol.tenHangHoa,
    commonCol.slKeChuaLenPhieu,
    commonCol.slKe,
    commonCol.ngayThucHien,
    commonCol.ngayKe,
  ];
  return <SoLuongLeLinh renderColumns={renderColumns} />;
};

export default SoLuongLeLinhSau;
