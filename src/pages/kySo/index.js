import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { pageKySo } from "pages/constants";

const KySoPages = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(pageKySo).map((key) => (
          <Route
            key={key}
            path={pageKySo[key].path}
            component={pageKySo[key].component}
            exact={pageKySo[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default KySoPages;
