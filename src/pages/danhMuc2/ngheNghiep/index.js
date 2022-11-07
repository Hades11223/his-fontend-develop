import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const nameScreen = "nghề nghiệp";

const NgheNghiep = ({}) => {
  return (
    <BaseDmWrap
      titleMain={nameScreen}
      roleName="NGHE_NGHIEP"
      classNameForm={"form-custom--one-line"}
      storeName="ngheNghiep"
    />
  );
};

export default NgheNghiep;
