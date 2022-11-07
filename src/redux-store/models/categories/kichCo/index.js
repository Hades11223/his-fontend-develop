import fetchProvider from "data-access/categories/dm-kich-co-vt";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "kichCo",
    title: "Kích cỡ vật tư",
  }),
};
