import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { dashboard } from "pages/constants";

const DashboardPage = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(dashboard).map((key) => (
          <Route
            key={key}
            path={dashboard[key].path}
            component={dashboard[key].component}
            exact={dashboard[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default DashboardPage;
