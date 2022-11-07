import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import stores from "redux-store/stores";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
import "./themes/styles.css";
import "./themes/default.less";
import "./i18n";
import "./utils/validate";
import { BrowserRouter } from "react-router-dom";
import dateUtils from "mainam-react-native-date-utils";
import stringUtils from "mainam-react-native-string-utils";
import { HotKey, DetectInteractive } from "components";
import "react-datepicker/dist/react-datepicker.css";
import { configMessage, GlobalMessageStyle } from "utils/message-utils";
import { useStore } from "hook";
//override default useStore of React
React.useStore = useStore;

configMessage();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

const Root = () => {
  return (
    <Provider store={stores}>
      <GlobalMessageStyle />
      <BrowserRouter>
        <Suspense fallback={<div></div>}>
          <App />
        </Suspense>
        <HotKey />
        <DetectInteractive />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
