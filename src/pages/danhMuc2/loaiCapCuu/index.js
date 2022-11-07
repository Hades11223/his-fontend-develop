import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const screenName = "loại cấp cứu";

const LoaiCapCuu = ({}) => {
  return (
    <BaseDmWrap
      titleMain={screenName}
      roleName="LOAI_CC"
      classNameForm={"form-custom--one-line"}
      storeName="loaiCapCuu"
    />
  );
};

export default LoaiCapCuu;
