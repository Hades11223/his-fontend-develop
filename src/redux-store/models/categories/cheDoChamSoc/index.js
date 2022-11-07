import dmCheDoChamSocProvider from "data-access/categories/dm-che-do-cham-soc-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider: dmCheDoChamSocProvider,
    storeName: "cheDoChamSoc",
    title: "Chế độ chăm sóc",
  }),
};
