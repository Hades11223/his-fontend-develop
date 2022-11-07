import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const screenName = "loại bữa ăn";

const LoaiBuaAn = ({}) => {
  return (
    <BaseDmWrap
      titleMain={screenName}
      roleName="LOAI_BUA_AN"
      classNameForm={"form-custom--one-line"}
      storeName="loaiBuaAn"
    />
  );
};

export default LoaiBuaAn;
