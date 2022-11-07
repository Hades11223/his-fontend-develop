import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const screenName = "cơ quan đơn vị";

const CoQuanDonVi = ({}) => {
  return (
    <BaseDmWrap
      titleMain={screenName}
      roleName="CO_QUAN"
      storeName="donVi"
      classNameForm={"form-custom--one-line"}
    />
  );
};

export default CoQuanDonVi;
