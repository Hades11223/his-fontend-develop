import fetchProvider from "data-access/categories/dm-loai-bua-an-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "loaiBuaAn",
    title: "Loại bữa ăn",
    initState: {
      listAllLoaiBuaAn: [],
    },
    customEffect: ({}) => ({}),
  }),
};
