import React, { Suspense, useMemo } from "react";
import Header from "app/Header";
import Pages from "pages";
import { Main } from "./styled";
import NotificationRealtime from "components/NotificationRealtime";
import { useHistory } from "react-router-dom";

const Layout = (props) => {
  const history = useHistory();
  const isHiddenNoti = useMemo(() => {
    return !["/login", "/kiosk", "/qms"].every((path) =>
      history.location.pathname.indexOf(path)
    );
  }, [history]);
  return (
    <Main>
      {(window.location.pathname.indexOf("/kiosk") &&
        window.location.pathname.indexOf("/qms")) === -1 && (
        <Header history={props.history} />
      )}
      <div className="app-main">
        <Pages />
      </div>
      {isHiddenNoti ? null : (
        <NotificationRealtime />
      )}
    </Main>
  );
};

export default Layout;
