import fetchProvider from "data-access/categories/dm-mau-dien-bien-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "mauDienBien",
    title: "Mẫu diễn biến",
    customEffect: ({ dispatch }) => ({}),
  }),
};
