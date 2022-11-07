import React from "react";
import { ListDashboard } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Dashboard"}
      listFunctions={ListDashboard}
      bgPageFunc={require("assets/images/pagehome/bgDashboard1.png")}
      icon={require("assets/images/pagehome/icDashboard.png")}
    />
  );
};
export default SubPage;
