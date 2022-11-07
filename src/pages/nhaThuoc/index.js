import React from "react";
import { Route } from "react-router-dom";
import { pageNhaThuoc } from "pages/constants";
import { Main } from "./styled";

const pageNhaThuocs = (props) => {
  return (
    <Main className={"app-contain"}>
      {Object.keys(pageNhaThuoc).map((key) => (
        <Route
          key={key}
          path={pageNhaThuoc[key].path}
          component={pageNhaThuoc[key].component}
          exact={pageNhaThuoc[key].exact}
        />
      ))}
    </Main>
  );
};

export default pageNhaThuocs;
