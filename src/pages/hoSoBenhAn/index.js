import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { pageHSBA } from "pages/constants";

const HoSoBenhAnPages = (props) => {
  return (
    <Main className={"app-contain"}>
      {Object.keys(pageHSBA).map((key) => (
        <Route
          key={key}
          path={pageHSBA[key].path}
          component={pageHSBA[key].component}
          exact={pageHSBA[key].exact}
        />
      ))}
    </Main>
  );
};

export default HoSoBenhAnPages;
