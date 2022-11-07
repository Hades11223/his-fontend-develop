import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { pageQuyetToanBHYT } from "pages/constants";

const QuyetToanBHYTPages = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(pageQuyetToanBHYT).map((key) => (
          <Route
            key={key}
            path={pageQuyetToanBHYT[key].path}
            component={pageQuyetToanBHYT[key].component}
            exact={pageQuyetToanBHYT[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default QuyetToanBHYTPages;
