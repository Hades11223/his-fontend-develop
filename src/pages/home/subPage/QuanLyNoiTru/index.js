import React from "react";
import { ListQuanLyNoiTru } from "../../layout/configData";
import Template from "../Template";


const SubPage = (props) => {
  return (
    <Template
      i18n={"quanLyNoiTru.quanLyNoiTru"}
      listFunctions={ListQuanLyNoiTru}
      bgPageFunc={require("assets/images/pagehome/bgQuanLyNoiTru.png")}
      icon={require("assets/images/pagehome/icQuanLyNoiTru.png")}
    />
  );
};
export default SubPage;
