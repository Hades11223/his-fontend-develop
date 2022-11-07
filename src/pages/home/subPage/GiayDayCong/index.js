import React from "react";
import { ListGiayDayCong } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Danh sách giấy đẩy cổng"}
      i18n={"giayDayCong.danhSachGiayDayCong"}
      listFunctions={ListGiayDayCong}
      bgPageFunc={require("assets/images/pagehome/bgKskHopDong.png")}
      icon={require("assets/images/pagehome/icKskHopDong.png")}
    />
  );
};
export default SubPage;
