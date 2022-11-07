import fetchProvider from "data-access/categories/dm-ly-do-tam-ung-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "lyDoTamUng",
    title: "Lý do tạm ứng",
  }),
};
