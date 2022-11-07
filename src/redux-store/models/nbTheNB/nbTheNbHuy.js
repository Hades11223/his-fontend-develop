import baseReduxStore from "../categories/baseReduxStore";
import nbTheNbProvider from "data-access/nb-the-nb-provider";

export default {
  ...baseReduxStore({
    fetchProvider: nbTheNbProvider.initHuy,
    storeName: "nbTheNbHuy",
    title: "nbTheNbHuy",

    initState: {},

    customEffect: ({ dispatch }) => ({}),
  }),
};
