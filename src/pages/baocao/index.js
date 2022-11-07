import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { pageBaoCao } from "pages/constants";

const BaoCaoPages = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(pageBaoCao).map((key) => (
          <Route
            key={key}
            path={pageBaoCao[key].path}
            component={pageBaoCao[key].component}
            exact={pageBaoCao[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default BaoCaoPages;
