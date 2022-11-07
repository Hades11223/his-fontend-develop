import { message } from "antd";
import React from "react";
import { Main } from "./styled";

const Setting = ({ refTable, className }) => {
  const onShowSetting = () => {
    if (refTable && refTable.current) {
      refTable.current.settings();
    } else {
      message.error("Thiếu cấu hình thông tin bảng cần setting");
    }
  };
  return <Main className={`${className || ""}`} onClick={onShowSetting} />;
};
export default Setting;
