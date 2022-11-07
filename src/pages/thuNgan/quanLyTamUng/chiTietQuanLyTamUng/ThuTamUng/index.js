import React, { memo, useEffect } from "react";
import DanhSach from "./DanhSach";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const ThuTamUng = (props) => {
  const { hiddenHeader = false } = props;
  const { id, nbDotDieuTriId } = useParams();
  const { onChangeInputSearch } = useDispatch().thuTamUng;
  useEffect(() => {
    if (id || nbDotDieuTriId)
      onChangeInputSearch({
        nbDotDieuTriId: id || nbDotDieuTriId,
        dsTrangThai: [40, 50],
      });
  }, [id, nbDotDieuTriId]);
  return <DanhSach hiddenHeader={hiddenHeader}/>;
};
export default memo(ThuTamUng);
