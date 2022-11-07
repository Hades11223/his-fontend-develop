import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { pageKho } from "pages/constants";

const KhoPages = (props) => {
  return (
    <Main>
      {Object.keys(pageKho).map((key) => (
        <Route
          key={key}
          path={pageKho[key].path}
          component={pageKho[key].component}
          exact={pageKho[key].exact}
        />
      ))}
    </Main>
  );
};

export default KhoPages;
