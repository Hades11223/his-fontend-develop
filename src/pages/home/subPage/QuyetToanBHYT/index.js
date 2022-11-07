import React from "react";
import { ListQuyetToanBHYT } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Quyết toán BHYT"}
      bgPageFunc={require("assets/images/pagehome/bgQuyetToanBHYT.png")}
      icon={require("assets/images/pagehome/icQuyetToanBHYT.png")}
      listFunctions={ListQuyetToanBHYT}
    />
  );
};
export default SubPage;
