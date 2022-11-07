import React from "react";
import { Route } from "react-router-dom";
import { pageKhamSucKhoe } from "pages/constants";
import { Main } from "./styled";

const pageKhamSucKhoes = (props) => {
  return (
    <Main className={"app-contain"}>
      {Object.keys(pageKhamSucKhoe).map((key) => (
        <Route
          key={key}
          path={pageKhamSucKhoe[key].path}
          component={pageKhamSucKhoe[key].component}
          exact={pageKhamSucKhoe[key].exact}
        />
      ))}
    </Main>
  );
};

export default pageKhamSucKhoes;
