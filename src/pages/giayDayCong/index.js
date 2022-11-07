import React from "react";
import { Route } from "react-router-dom";
import { pageGiayDayCong } from "pages/constants";
import { Main } from "./styled";

const pageGiayDayCongs = (props) => {
  return (
    <Main className={"app-contain"}>
      {Object.keys(pageGiayDayCong).map((key) => (
        <Route
          key={key}
          path={pageGiayDayCong[key].path}
          component={pageGiayDayCong[key].component}
          exact={pageGiayDayCong[key].exact}
        />
      ))}
    </Main>
  );
};

export default pageGiayDayCongs;
