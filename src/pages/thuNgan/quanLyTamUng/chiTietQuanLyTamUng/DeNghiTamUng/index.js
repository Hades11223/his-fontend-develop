import React, { memo, useEffect } from "react";
import DanhSach from "./DanhSach";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const DeNghiTamUng = (props) => {
  const { id } = useParams();
  const { onChangeInputSearch } = useDispatch().deNghiTamUng;
  useEffect(() => {
    onChangeInputSearch({ nbDotDieuTriId: id, trangThai: 10 });
  }, []);
  return <DanhSach />;
};
export default memo(DeNghiTamUng);
