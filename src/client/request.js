import axios from "axios";
import { combineUrlParams } from "utils";
import { getState, dispatch } from "redux-store/stores";
import { t } from "i18next";
import * as rax from "retry-axios";
const dataPath = "/api/his/v1";
export const authPath = "/auth/oauth";
export const formPath = "/api/html-editor/v1";
export const scanPath = "/api/file/v1";
export const signerPath = "/api/signer/v1";
export const originUrl = window.location.origin;
const search = window.location.search;

export const HOST = (() => {
  const dataHost = [];
  for (let i = 0; i < 20; i++) {
    if (process.env["REACT_APP_HOST_" + i])
      dataHost.push(process.env["REACT_APP_HOST_" + i]);
    if (window.location.host === process.env["REACT_APP_URL_" + i]) {
      return process.env["REACT_APP_HOST_" + i];
    }
  }
  return process.env["REACT_APP_HOST"] || dataHost[0];
})();

export const PDF_HOST = (() => {
  const dataHost = [];
  for (let i = 0; i < 20; i++) {
    if (process.env["REACT_APP_PDF_HOST_" + i])
      dataHost.push(process.env["REACT_APP_PDF_HOST_" + i]);
    if (
      window.location.host === process.env["REACT_APP_URL_" + i] &&
      process.env["REACT_APP_PDF_HOST_" + i]
    ) {
      return process.env["REACT_APP_PDF_HOST_" + i];
    }
  }
  return process.env["REACT_APP_PDF_HOST"] || dataHost[0];
})();

export const ISOFH_TOOL_HOST = process.env.REACT_APP_ISOFH_TOOL_HOST;

const getRedirect = () => {
  return window.location.origin;
};
export const accountUrl = combineUrlParams(`${getRedirect()}/login`, {
  // client_id: "isofh",
  // response_type: "code",
  redirect_uri: getRedirect(),
  state: (() => {
    const queryString = decodeURIComponent(search);
    let urlParams = Object.fromEntries(new URLSearchParams(queryString));
    delete urlParams.access_token;
    let url = combineUrlParams(`${window.location.pathname}`, {
      ...urlParams,
    });
    url = encodeURIComponent(url);
    return url;
  })(),
});
const client = axios.create({
  baseURL: `${HOST}`,
  headers: {
    "Content-Type": "application/json",
  },
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});
client.defaults.raxConfig = {
  instance: client,
  // statusCodesToRetry: [[401]],
  shouldRetry: (err) => {
    if (err?.response?.status === 401) return true;
    return false;
  },
  onRetryAttempt: (err) => {
    return new Promise((resolve, reject) => {
      const cfg = rax.getConfig(err);
      const onRefreshToken = dispatch.auth.onRefreshToken;
      console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
      onRefreshToken()
        .then((s) => {
          resolve(s);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  retryDelay: 2000,
};
const interceptorId = rax.attach(client);
client.interceptors.request.use(async (config) => {
  try {
    let state = getState();
    config.headers["Accept-Language"] = state.application.lang || "vi";
    if (config.url == "/api/his/v1/auth/refresh") return config;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const access_token = urlParams.get("access_token");
    if (config.url?.indexOf("blob:") == 0) config.baseURL = "";
    let token = state.auth.auth?.access_token;

    if (access_token !== undefined && access_token !== null) {
      token = access_token;
    }
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["uri"] = window.location.href;

    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

client.interceptors.response.use(
  (response) => {
    if (
      response.data.code === 401 &&
      (response.config.url == "/api/his/v1/auth/refresh" ||
        (response.config.url != "/api/his/v1/auth/login" &&
          accountUrl.indexOf("logout?redirect") == -1 &&
          accountUrl.indexOf("login?redirect") == -1))
    ) {
      localStorage.clear();
      if (accountUrl.indexOf("login?redirect_uri=") != -1)
        window.location.href = accountUrl;
      else
        window.location.href =
          "/login?redirect=" + encodeURIComponent(accountUrl);
      return Promise.reject();
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href =
        "/login?redirect=" + encodeURIComponent(accountUrl);
    } else {
      let serverState = getState().application.serverState;

      try {
        if (error?.response?.data?.message) {
          error.message = error.response.data.message;
        } else {
          error.message =
            serverState == "online"
              ? t("common.dangCapNhatHeThong")
              : t("common.khongTheKetNoiDenServer");
        }
      } catch (error) {}
    }
    return Promise.reject(error);
  }
);

export { client, dataPath };
