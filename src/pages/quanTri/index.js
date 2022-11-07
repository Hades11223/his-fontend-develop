import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { pageQuanTri } from "pages/constants";

const QuanTriPages = (props) => {
  return (
    <Main>
      {Object.keys(pageQuanTri).map((key) => (
        <Route
          key={key}
          path={pageQuanTri[key].path}
          component={pageQuanTri[key].component}
          exact={pageQuanTri[key].exact}
        />
      ))}
    </Main>
  );
};

export default QuanTriPages;
