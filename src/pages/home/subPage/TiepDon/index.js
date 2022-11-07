import React from "react";
import { ListTiepDon } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Tiếp đón"}
      i18n={"tiepDon.tiepDon"}
      listFunctions={ListTiepDon}
      bgPageFunc={require("assets/images/pagehome/bgBaoCao.png")}
      icon={require("assets/images/pagehome/icBaoCao.png")}
    />
  );
};
export default SubPage;
