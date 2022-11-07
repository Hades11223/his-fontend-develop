import React from "react";
import appUtils from "utils/app-utils";
import i18n from "i18n";
import benhVienProvider from "data-access/categories/dm-benh-vien-provider";
import fileUtils from "utils/file-utils";
import cacheUtils from "utils/cache-utils";
import { message } from "antd";
import { t } from "i18next";
import IcConnected from "assets/svg/ic-connected.svg";
import IcDisconnect from "assets/svg/ic-disconnect.svg";
export default {
  state: {
    buildInfo: {},
    serverState: (() => {
      return localStorage.getItem("SERVER_STATE") == "offline"
        ? "offline"
        : "online";
    })(),
    // lastInteractive: new Date().getTime(),
    url: null,
    isVisible: false,
    showSidebar: false,
    lang: (() => {
      try {
        let lang = localStorage.getItem("LANG") || "vi";
        i18n.changeLanguage(lang);
        return lang;
      } catch (error) {
        console.log(error);
      }
      return "vi";
    })(),
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getBuildInfo: () => {
      appUtils.getBuildInfo().then((s) => {
        dispatch.application.updateData({
          buildInfo: s,
        });
      });
    },
    onChangeLanguage: ({ language = "vi" }, state) => {
      i18n.changeLanguage(language);
      localStorage.setItem("LANG", language);
      dispatch.application.updateData({
        lang: language,
      });
    },

    onInteractive: (payload, state) => {
      // const lastInteractive = state.application.lastInteractive;
      const time = new Date().getTime();
      if (time - (window.lastInteractiv || new Date().getTime()) > 1800000) {
        //cứ 10p không tương tác thì refresh lại trang
        window.location.reload(true);
      }
      window.lastInteractive = new Date().getTime();
      // dispatch.application.updateData({
      //   lastInteractive: new Date().getTime(),
      // });
    },
    onGetLogo: ({} = {}, { auth: { auth } }) => {
      if (auth?.benhVien?.id)
        benhVienProvider.getByIdTongHop(auth?.benhVien?.id).then(async (s) => {
          const logo = s?.data?.logo;
          const imageBase64 = await cacheUtils.read(
            "LOGO_BENH_VIEN",
            auth?.benhVien?.id,
            "",
            false
          );
          dispatch.application.updateData({
            logo: imageBase64,
            logoThuongHieu: s?.data?.logoThuongHieu
          });
          fileUtils
            .getFromUrl({ url: fileUtils.absoluteFileUrl(logo) })
            .then((s) => {
              var base64 = btoa(
                new Uint8Array(s).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              const newLogo = "data:image/png;base64," + base64;
              if (imageBase64 != newLogo);
              {
                dispatch.application.updateData({
                  logo: newLogo,
                });
                cacheUtils.save(
                  "LOGO_BENH_VIEN",
                  auth?.benhVien?.id,
                  newLogo,
                  false
                );
              }
            });
        });
      else {
        dispatch.application.updateData({
          logo: "",
        });
      }
    },
    updateStatusServer: (payload, state) => {
      if (payload.serverState != state.application.serverState) {
        if (state.application.serverState == "online") {
          message.error(
            t("common.khongTheKetNoiDenServer"),
            "",
            5,
            <IcDisconnect style={{ marginRight: 10 }} />
          );
        } else {
          message.success(
            t("common.daKhoiPhucKetNoi"),
            "",
            3,
            <IcConnected style={{ marginRight: 10 }} />
          );
        }
        localStorage.setItem(
          "SERVER_STATE",
          payload.serverState == "offline" ? "offline" : "online"
        );
        dispatch.application.updateData({
          serverState: payload.serverState == "offline" ? "offline" : "online",
        });
      }
    },
  }),
};
