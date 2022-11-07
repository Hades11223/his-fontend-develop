import React from "react";
import { Route } from "react-router-dom";
import { pagePhauThuatThuThuat } from "pages/constants";
import { Main } from "./styled";

const pagePhauThuatThuThuats = (props) => {
  return (
    <Main className={"app-contain"}>
      {Object.keys(pagePhauThuatThuThuat).map((key) => (
        <Route
          key={key}
          path={pagePhauThuatThuThuat[key].path}
          component={pagePhauThuatThuThuat[key].component}
          exact={pagePhauThuatThuThuat[key].exact}
        />
      ))}
    </Main>
  );
};

export default pagePhauThuatThuThuats;
