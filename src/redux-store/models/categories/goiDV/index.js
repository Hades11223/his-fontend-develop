import fetchProvider from "data-access/categories/dm-goi-dich-vu-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "goiDV",
    title: "gói dịch vụ",
  }),
};
