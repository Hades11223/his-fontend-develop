import baseStore from "redux-store/models/base-store";
import chiPhiHapSayProvider from "data-access/categories/dm-chi-phi-hap-say-vtyt-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { message } from "antd";
import i18n from "i18n";
import baseReduxStore from "../baseReduxStore";

export default {
  ...baseReduxStore({
    fetchProvider: chiPhiHapSayProvider.init,
    storeName: "chiPhiHapSay",
    title: "chi phí hấp sấy",

    initState: {
      totalElements: null,
    },

    customEffect: ({ dispatch }) => ({}),
  }),
};
