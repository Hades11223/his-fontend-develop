import React from "react";
import { ListPhauThuatThuThuat } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Quản lý phẫu thuật - thủ thuật"}
      i18n={"pttt.quanLyPhauThuatThuThuat"}
      listFunctions={ListPhauThuatThuThuat}
      bgPageFunc={require("assets/images/pagehome/bgKskHopDong.png")}
      icon={require("assets/images/pagehome/icKskHopDong.png")}
    />
  );
};
export default SubPage;
