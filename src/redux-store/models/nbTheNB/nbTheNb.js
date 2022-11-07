import baseReduxStore from "../categories/baseReduxStore";
import nbTheNbProvider from "data-access/nb-the-nb-provider";

export default {
  ...baseReduxStore({
    fetchProvider: nbTheNbProvider.init,
    storeName: "nbTheNb",
    title: "nbTheNb",

    initState: {},

    customEffect: ({ dispatch }) => ({}),
  }),
};
