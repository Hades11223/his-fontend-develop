import React from "react";
import { Route } from "react-router-dom";
import { pageQMS } from "pages/constants";

const QmsPages = (props) => {
  console.log("qms",pageQMS)
  return (
      <div className={"app-contain"}>
        {Object.keys(pageQMS).map((key) => (
          <Route
            key={key}
            path={pageQMS[key].path}
            component={pageQMS[key].component}
            exact={pageQMS[key].exact}
          />
        ))}
      </div>
  );
};

export default QmsPages;