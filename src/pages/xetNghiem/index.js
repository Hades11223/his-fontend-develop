import React from "react";
import { Route } from "react-router-dom";
import { pageXetNghiem } from "pages/constants";

const XetNghiemPages = (props) => {
  return (
    <div className={"app-contain"} style={{height:"100%", overflow:"auto"}}>
      {Object.keys(pageXetNghiem).map((key) => (
        <Route
          key={key}
          path={pageXetNghiem[key].path}
          component={pageXetNghiem[key].component}
          exact={pageXetNghiem[key].exact}
        />
      ))}
    </div>
  );
};

export default XetNghiemPages;
