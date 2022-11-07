import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const screenName = "chế độ chăm sóc";

const CheDoChamSoc = ({}) => {
  return (
    <BaseDmWrap
      titleMain={screenName}
      roleName="CHE_DO_CHAM_SOC"
      classNameForm={"form-custom--one-line"}
      storeName="cheDoChamSoc"
    />
  );
};

export default CheDoChamSoc;
