import React from "react";
import { ListKhamSucKhoe } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Khám sức khoẻ hợp đồng"}
      listFunctions={ListKhamSucKhoe}
      bgPageFunc={require("assets/images/pagehome/bgKskHopDong.png")}
      icon={require("assets/images/pagehome/icKskHopDong.png")}
    />
  );
};
export default SubPage;
