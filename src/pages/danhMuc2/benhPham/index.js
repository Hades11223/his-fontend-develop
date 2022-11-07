import React from "react";
import BaseDmWrap from "components/BaseDmWrap";

const screenName = "bệnh phẩm";

const BenhPham = () => {
  return (
    <BaseDmWrap
      titleMain={screenName}
      roleName="BENH_PHAM"
      classNameForm={"form-custom--one-line"}
      storeName="benhPham"
    />
  );
};

export default BenhPham;
