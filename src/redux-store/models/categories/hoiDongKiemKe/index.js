import fetchProvider from "data-access/categories/dm-hoi-dong-kiem-ke-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "hoiDongKiemKe",
    title: "Hội đồng kiểm kê",
  }),
};
