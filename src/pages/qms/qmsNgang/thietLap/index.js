import React, { useEffect } from "react";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import { Wrapper } from "./styled";
import { useDispatch } from "react-redux";

const QmsNgang = () => {
  const {
    nhanVien: { getListDieuDuong, getListBacSi },
  } = useDispatch();
  useEffect(() => {
    getListBacSi({
      dsMaThietLapVanBang: ["BAC_SI", "KY_THUAT_Y"],
      page: "",
      size: "",
      active: true,
    });
    getListDieuDuong({
      dsMaThietLapVanBang: ["DIEU_DUONG", "Y_TA"],
      page: "",
      size: "",
      active: true,
    });
  }, []);
  return (
    <Wrapper>
      <Header />
      <Body />
      <Footer />
    </Wrapper>
  );
};

export default QmsNgang;
