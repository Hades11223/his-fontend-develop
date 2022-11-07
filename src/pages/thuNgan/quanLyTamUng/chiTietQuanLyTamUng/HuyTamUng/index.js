import React, { memo, useEffect } from "react";
import DanhSach from "./DanhSach";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const HuyTamUng = (props) => {
  const { id } = useParams();
  const { onChangeInputSearch } = useDispatch().huyTamUng;
  useEffect(() => {
    if (id) onChangeInputSearch({ nbDotDieuTriId: id, trangThai: 100 });
  }, [id]);
  return <DanhSach />;
};
export default memo(HuyTamUng);
