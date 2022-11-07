import fetchProvider from "data-access/categories/dm-ngay-nghi-le-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "ngayNghiLe",
    title: "Ngày nghỉ lễ",
    customEffect: ({ dispatch }) => ({}),
  }),
};
