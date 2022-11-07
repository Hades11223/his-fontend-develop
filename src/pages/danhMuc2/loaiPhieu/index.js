import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const screenName = "loại phiếu";

const LoaiPhieu = ({}) => {
  return (
    <BaseDmWrap
      titleMain={screenName}
      roleName="LOAI_PHIEU"
      classNameForm={"form-custom--one-line"}
      storeName="loaiPhieu"
    />
  );
};

export default LoaiPhieu;
