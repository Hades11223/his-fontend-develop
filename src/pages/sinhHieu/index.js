import React from "react";
import { Route } from "react-router-dom";
import { pageSinhHieu } from "pages/constants";
import { Main } from "./styled";

const pageSinhHieus = (props) => {
  return (
    <Main className={"app-contain"}>
      {Object.keys(pageSinhHieu).map((key) => (
        <Route
          key={key}
          path={pageSinhHieu[key].path}
          component={pageSinhHieu[key].component}
          exact={pageSinhHieu[key].exact}
        />
      ))}
    </Main>
  );
};

export default pageSinhHieus;
