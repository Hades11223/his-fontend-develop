import React, { useEffect } from "react";
import { ListChanDoanHinhAnh } from "../../layout/configData";
import Template from "../Template";
import { useDispatch } from "react-redux";

const SubPage = (props) => {
  const {
    nbDotDieuTri: { resetData },
  } = useDispatch();
  useEffect(() => {
    resetData();
  }, []);

  return (
    <Template
      i18n={"cdha.cdha"}
      bgPageFunc={require("assets/images/pagehome/bgChanDoanHinhAnh.png")}
      icon={require("assets/images/pagehome/icCDHA.png")}
      listFunctions={ListChanDoanHinhAnh}
    />
  );
};
export default SubPage;
