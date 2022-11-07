import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { troGiup } from "pages/constants";

const SubPage = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(troGiup).map((key) => (
          <Route
            key={key}
            path={troGiup[key].path}
            component={troGiup[key].component}
            exact={troGiup[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default SubPage;
