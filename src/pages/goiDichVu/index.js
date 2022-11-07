import React from "react";
import { Route } from "react-router-dom";
import { pageGoiDichVu } from "pages/constants";
import { Main } from "./styled";

const pageKhamSucKhoes = (props) => {
  return (
    <Main className={"app-contain"}>
      {Object.keys(pageGoiDichVu).map((key) => (
        <Route
          key={key}
          path={pageGoiDichVu[key].path}
          component={pageGoiDichVu[key].component}
          exact={pageGoiDichVu[key].exact}
        />
      ))}
    </Main>
  );
};

export default pageKhamSucKhoes;
