import fetchProvider from "data-access/categories/dm-hoi-dong-kiem-ke-chi-tiet-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "hoiDongChiTiet",
    title: "Hội đồng kiểm kê chi tiết",
  }),
};
