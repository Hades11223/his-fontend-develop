import React, { memo, useEffect } from "react";
import DanhSach from "./DanhSach";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const HoanTamUng = (props) => {
  const { hiddenHeader = false } = props;
  const { id, nbDotDieuTriId } = useParams();
  const { onChangeInputSearch } = useDispatch().hoanTamUng;
  useEffect(() => {
    if (id || nbDotDieuTriId)
      onChangeInputSearch({
        nbDotDieuTriId: id || nbDotDieuTriId,
        dsTrangThai: [60],
      });
  }, [id, nbDotDieuTriId]);
  return <DanhSach hiddenHeader={hiddenHeader} />;
};
export default memo(HoanTamUng);
