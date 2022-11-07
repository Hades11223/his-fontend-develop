import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { pageDanhMuc } from "pages/constants";

const SubPage = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(pageDanhMuc).map((key) => (
          <Route
            key={key}
            path={pageDanhMuc[key].path}
            component={pageDanhMuc[key].component}
            exact={pageDanhMuc[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default SubPage;