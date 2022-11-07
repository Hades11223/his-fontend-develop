import React from "react";
import { ListBaoCao, ListNhomBaoCao } from "../../layout/configData";
import TemplateCollapse from "../TemplateCollapse";

const SubPage = (props) => {
  return (
    <TemplateCollapse
      title={"Báo cáo"}
      listGroup={ListNhomBaoCao}
      listFunctions={ListBaoCao}
      bgPageFunc={require("assets/images/pagehome/bgBaoCao.png")}
      icon={require("assets/images/pagehome/icBaoCao.png")}
    />
  );
};
export default SubPage;
