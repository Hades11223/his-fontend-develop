import React from "react";
import { ListThietLap } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Thiết Lập"}
      bgPageFunc={require("assets/images/pagehome/bgThietLap.png")}
      icon={require("assets/images/pagehome/icThietLap.png")}
      listFunctions={ListThietLap}
    />
  );
};
export default SubPage;
