import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { pageTDDT } from "pages/constants";

const TheoDoiDieuTriPages = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(pageTDDT).map((key) => (
          <Route
            key={key}
            path={pageTDDT[key].path}
            component={pageTDDT[key].component}
            exact={pageTDDT[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default TheoDoiDieuTriPages;
