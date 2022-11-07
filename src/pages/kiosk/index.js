import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { pageKiosk } from "pages/constants";
import { useScale } from "hook";

const KiosPages = (props) => {
  const { onScale, onUnscale } = useScale();
  useEffect(() => {
    onUnscale();
    return () => {
      onScale();
    };
  }, []);
  return (
    <div className={"app-contain"}>
      {Object.keys(pageKiosk).map((key) => (
        <Route
          key={key}
          path={pageKiosk[key].path}
          component={pageKiosk[key].component}
          exact={pageKiosk[key].exact}
        />
      ))}
    </div>
  );
};

export default KiosPages;
