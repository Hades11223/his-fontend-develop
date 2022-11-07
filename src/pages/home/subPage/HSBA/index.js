import React from "react";
import { ListHoSoBenhAn } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Hồ sơ bệnh án"}
      bgPageFunc={require("assets/images/pagehome/bgHoSoBenhAn.png")}
      icon={require("assets/images/pagehome/icHoSoBenhAn.png")}
      listFunctions={ListHoSoBenhAn}
    />
  );
};
export default SubPage;
