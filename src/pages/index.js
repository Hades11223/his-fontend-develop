import React from "react";
import { pages } from "./constants";
import RouterWithPaths from "components/RouterWithPaths";
import { Switch } from "react-router-dom";
const Pages = (props) => {
  return (
    <Switch>
      {Object.keys(pages).map((key) => (
        <RouterWithPaths
          key={key}
          path={pages[key].path}
          component={pages[key].component}
          exact={pages[key].exact}
          {...props}
        />
      ))}
    </Switch>
  );
};

export default Pages;
