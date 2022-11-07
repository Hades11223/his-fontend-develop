import BaseDmWrap from "components/BaseDmWrap";
import React from "react";

const screenName = "dân tộc";

const DanToc = ({}) => {
  return (
    <BaseDmWrap
      titleMain={screenName}
      roleName="DAN_TOC"
      storeName="danToc"
      classNameForm={"form-custom--one-line"}
    />
  );
};

export default DanToc;
