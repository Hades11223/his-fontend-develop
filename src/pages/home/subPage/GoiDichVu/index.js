import React from "react";
import { ListGoiDichVu } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Khám sức khoẻ hợp đồng"}
      i18n={"goiDichVu.goiDichVu"}
      listFunctions={ListGoiDichVu}
      bgPageFunc={require("assets/images/pagehome/bgKskHopDong.png")}
      icon={require("assets/images/pagehome/icKskHopDong.png")}
    />
  );
};
export default SubPage;
