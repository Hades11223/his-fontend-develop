import React from "react";
import { ListQuanTriHeThong } from "../../layout/configData";
import Template from "../Template";

const SubPageKho = (props) => {
  return (
    <Template
      title={"Quản trị hệ thống"}
      bgPageFunc={require("assets/images/pagehome/bgQuanTriHeThong.png")}
      icon={require("assets/images/pagehome/icQuanTriHeThong.png")}
      listFunctions={ListQuanTriHeThong}
    />
  );
};
export default SubPageKho;
