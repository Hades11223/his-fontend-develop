import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { pageThietLap } from "pages/constants";

const ThietLapPages = (props) => {
  return (
    <Main className={"app-contain"}>
      {Object.keys(pageThietLap).map((key) => (
        <Route
          key={key}
          path={pageThietLap[key].path}
          component={pageThietLap[key].component}
          exact={pageThietLap[key].exact}
        />
      ))}
    </Main>
  );
};

export default ThietLapPages;
