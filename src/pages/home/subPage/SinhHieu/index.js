import React from "react";
import { ListSinhHieu } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  console.log("ahihi");
  return (
    <Template
      title={"Sinh Hiệu"}
      listFunctions={ListSinhHieu}
      bgPageFunc={require("assets/images/pagehome/bgKskHopDong.png")}
      icon={require("assets/images/pagehome/icKskHopDong.png")}
    />
  );
};
export default SubPage;
