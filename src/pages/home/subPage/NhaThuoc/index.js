import React from "react";
import { ListNhaThuoc } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Nhà Thuốc"}
      listFunctions={ListNhaThuoc}
      bgPageFunc={require("assets/images/pagehome/bgBaoCao.png")}
      icon={require("assets/images/pagehome/icBaoCao.png")}
    />
  );
};
export default SubPage;
