import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const screenName = "lý do đổi trả DV";

const LyDoDoiTra = ({}) => {
  return (
    <BaseDmWrap
      titleMain={screenName}
      roleName="DOI_TRA_DICH_VU"
      classNameForm={"form-custom--one-line"}
      storeName="lyDoDoiTra"
    />
  );
};

export default LyDoDoiTra;
