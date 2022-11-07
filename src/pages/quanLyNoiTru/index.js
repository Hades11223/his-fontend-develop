import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { pageQuanLyNoiTru } from "pages/constants";
import { useDispatch } from "react-redux";

const LapBenhAns = (props) => {
  const {
    khoa: { getKhoaTheoTaiKhoan },
  } = useDispatch();
  useEffect(() => {
    getKhoaTheoTaiKhoan({
      dsTinhChatKhoa: 70,
      page: "",
      size: "",
      ative: true
    });
  }, []);
  return (
    <Main>
      {Object.keys(pageQuanLyNoiTru).map((key) => (
        <Route
          key={key}
          path={pageQuanLyNoiTru[key].path}
          component={pageQuanLyNoiTru[key].component}
          exact={pageQuanLyNoiTru[key].exact}
        />
      ))}
    </Main>
  );
};

export default LapBenhAns;
