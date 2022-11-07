import React, { useEffect } from "react";
import SoLuongLeLinh from "../SoLuongLeLinh";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DanhSachNguoiBenh = (props) => {
  const { dsNbDvKho } = useSelector((state) => state.nbDvKho);
  const { id } = useParams();
  const {
    nbDvKho: { getNbDvKho: getDsNb },
  } = useDispatch();
  const renderColumns = ({ commonCol }) => [
    commonCol.check,
    commonCol.stt,
    commonCol.maBenhAn,
    commonCol.tenNb,
    commonCol.tenHangHoa,
    commonCol.slKe,
    commonCol.ngayThucHien,
    commonCol.ngayKe,
  ];

  useEffect(() => {
    getDsNb({ phieuLinhId: id })
  }, [])


  const onSearch = (data) => {
    getDsNb({ phieuLinhId: id, ...data });
  };
  return (
    <SoLuongLeLinh
      onSearch={onSearch}
      dataSource={dsNbDvKho}
      renderColumns={renderColumns}
    />
  );
};

export default DanhSachNguoiBenh;
