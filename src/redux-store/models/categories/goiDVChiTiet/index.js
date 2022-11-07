import fetchProvider from "data-access/categories/dm-goi-dich-vu-chi-tiet";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "goiDVChiTiet",
    title: "gói dịch vụ chi tiết",
  }),
};
