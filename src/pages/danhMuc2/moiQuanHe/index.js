import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const nameScreen = "mối quan hệ";

const MoiQuanHe = ({}) => {
  return (
    <BaseDmWrap
      titleMain={nameScreen}
      roleName="MOI_QUAN_HE"
      classNameForm={"form-custom--one-line"}
      storeName="moiQuanHe"
    />
  );
};

export default MoiQuanHe;
