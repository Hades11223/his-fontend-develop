import React from "react";
import { Route } from "react-router-dom";
import { pageTiepDon } from "pages/constants";
import { Main } from "./styled";
const pageTiepDons = (props) => {
  return (
    <Main className={"app-contain"}>
      {Object.keys(pageTiepDon).map((key) => (
        <Route
          key={key}
          path={pageTiepDon[key].path}
          component={pageTiepDon[key].component}
          exact={pageTiepDon[key].exact}
        />
      ))}
    </Main>
  );
};

export default pageTiepDons;
