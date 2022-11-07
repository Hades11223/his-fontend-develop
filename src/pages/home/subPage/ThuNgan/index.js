import React from "react";
import { ListDanhMucTN } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      i18n={"thuNgan.thuNgan"}
      bgPageFunc={require("assets/images/pagehome/bgThuNgan.png")}
      icon={require("assets/images/pagehome/icThuNgan.png")}
      listFunctions={ListDanhMucTN}
    />
  );
};
export default SubPage;
