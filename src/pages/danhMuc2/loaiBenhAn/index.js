import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const screenName = "loại bệnh án";

const LoaiBenhAn = ({}) => {
  return (
    <BaseDmWrap
      titleMain={screenName}
      roleName={"LOAI_BA"}
      storeName="loaiBenhAn"
      classNameForm={"form-custom--one-line"}
    />
  );
};

export default LoaiBenhAn;
