import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { pageThuNgan } from "pages/constants";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
const ThuNganPages = (props) => {
  const {
    toaNha: { getNhaTheoTaiKhoan },
  } = useDispatch();
  useEffect(() => {
    getNhaTheoTaiKhoan({});
  }, []);
  return (
    <Main className={"app-contain"}>
      {Object.keys(pageThuNgan).map((key) => (
        <Route
          key={key}
          path={pageThuNgan[key].path}
          component={pageThuNgan[key].component}
          exact={pageThuNgan[key].exact}
        />
      ))}
    </Main>
  );
};

export default ThuNganPages;
