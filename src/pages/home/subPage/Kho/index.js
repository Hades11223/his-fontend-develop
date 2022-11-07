import React from "react";
import { ListKho } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Kho"}
      bgPageFunc={require("assets/images/pagehome/bgKho.png")}
      icon={require("assets/images/pagehome/icKho.png")}
      listFunctions={ListKho}
    />
  );
};
export default SubPage;
