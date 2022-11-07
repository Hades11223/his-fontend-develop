import fetchProvider from "data-access/categories/dm-phan-loai-bmi-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "phanLoaiBmi",
    title: "Phân loại BMI",
    customEffect: ({ dispatch }) => ({}),
  }),
};
