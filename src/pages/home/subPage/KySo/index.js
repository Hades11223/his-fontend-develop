import React from "react";
import { ListKySo } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Ký số"}
      bgPageFunc={require("assets/images/pagehome/bgKySo.png")}
      icon={require("assets/images/pagehome/icKySo.png")}
      listFunctions={ListKySo}
    />
  );
};
export default SubPage;
