import React from "react";
import { Route } from "react-router-dom";
import { pageCDHA } from "pages/constants";
import { Main } from "./styled";
const ChanDoanHinhAnhPages = (props) => {
  return (
    <Main className={"app-contain"}>
      {Object.keys(pageCDHA).map((key) => (
        <Route
          key={key}
          path={pageCDHA[key].path}
          component={pageCDHA[key].component}
          exact={pageCDHA[key].exact}
        />
      ))}
    </Main>
  );
};

export default ChanDoanHinhAnhPages;
