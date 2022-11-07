import React from "react";
import { ListPhieuTheoDoiDieuTri } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Theo dõi điều trị"}
      bgPageFunc={require("assets/images/pagehome/bgTheoDoiDieuTri.png")}
      icon={require("assets/images/pagehome/icTheoDoiDieuTri.png")}
      listFunctions={ListPhieuTheoDoiDieuTri}
    />
  );
};
export default SubPage;
