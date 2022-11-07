import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { ThemeProvider } from "styled-components";
import { pink } from "themes";
import Layout from "app/Layout";
import LayoutLogin from "app/LayoutLogin";
import { Main, GlobalStyle } from "./styled";
import { ConfigProvider, notification } from "antd";
import printUtils from "utils/print-utils";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  useQueryString,
  useLocalStorage,
  useInterval,
  usePingServer,
} from "hook";
import moment from "moment";
import viVN from "antd/lib/locale/vi_VN";
import appUtils from "utils/app-utils";
import { useTranslation } from "react-i18next";
import { ModalNotification2 } from "components/ModalConfirm";
import Camera from "components/Camera";
import "moment/locale/vi";
import ModalLoading from "../components/ModalLoading";
import { vitalSignsPrint } from "pages/constants";
import MultiFiles from "pages/editor/report/components/MultiFiles";

moment.locale("vi", {
  // months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  monthsShort:
    "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split(
      "_"
    ),
});
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

export const refConfirm = React.createRef(null);
export const refCamera = React.createRef(null);
export const refLoading = React.createRef(null);
const App = ({ ...props }) => {
  const [redirect] = useQueryString("redirect", "/");
  const [username] = useQueryString("username", "");
  const history = useHistory();
  const { t } = useTranslation();
  const {
    application: { getBuildInfo, updateData, onGetLogo, updateStatusServer },
  } = useDispatch();
  const buildInfo = useSelector((state) => state.application.buildInfo);
  const auth = useSelector((state) => state.auth.auth);
  useLocalStorage(
    (changed) => {
      if (changed.auth) {
        if (!auth) {
          window.location.href = "/";
        }
      } else {
        history.push("/logout");
      }
    },
    ["auth"]
  );
  useEffect(() => {
    if (auth) {
      onGetLogo({ benhVienId: auth?.benhVien?.id });
    }
  }, [auth]);
  usePingServer(({ status }) => {
    updateStatusServer({
      serverState: status ? "online" : "offline",
    });
  });

  useEffect(() => {
    const reportWindowSize = () => {
      updateData({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    reportWindowSize();
    window.addEventListener("resize", reportWindowSize);
    return () => {
      window.removeEventListener("resize", reportWindowSize);
    };
  }, []);

  useInterval(() => {
    appUtils.getBuildInfo("/app.info?v=" + new Date().getTime()).then((s) => {
      if (s.message && buildInfo.message && s.message != buildInfo.message) {
        notification.success({
          message: "Thông báo cập nhật",
          description:
            "Ứng dụng đã có bản cập nhật mới, sẽ được khởi động lại sau 10 giây",
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 10000);
      }
    });
  }, [60000]);

  useEffect(() => {
    getBuildInfo();
    let data = localStorage.getItem("checkLogin");
    let checkLogin = data && JSON.parse(data);
    if (checkLogin) printUtils.settingPrint();

    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/logout" &&
      (!auth || !auth?.access_token)
    ) {
      window.location.href =
        "/login?redirect=" + encodeURIComponent(window.location.href);
    }
  }, []);

  const logout = connect(null, ({ auth: { updateData } }) => ({ updateData }))(
    (props) => {
      props.updateData({ auth: null });
      localStorage.removeItem("auth");
      setTimeout(() => {
        window.location.href = `/login?redirect=${encodeURIComponent(
          redirect
        )}&username=${username}`;
      }, 2000);
      return null;
    }
  );
  return (
    <ThemeProvider theme={pink}>
      <GlobalStyle />
      <ConfigProvider locale={viVN}>
        <Switch>
          <Route path={"/logout"} component={logout} />
          <Route
            path={"/chi-so-song/:nbDotDieuTriId"}
            component={vitalSignsPrint}
          />
          <Route path={"/multiFile"} component={MultiFiles} />
          <Main>
            {window.location.pathname.indexOf("login") >= 0 ? (
              <Route path={"/login"} component={LayoutLogin} />
            ) : (
              <Route path={"/"} component={Layout} />
            )}
          </Main>
        </Switch>
        <ModalNotification2 ref={refConfirm} />
        <Camera ref={refCamera} />
        <ModalLoading ref={refLoading} />
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
