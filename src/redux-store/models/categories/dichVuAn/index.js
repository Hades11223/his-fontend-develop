import fetchProvider from "data-access/categories/dm-dv-ky-thuat-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    initState: {
      _dataSearch: {
        ["dichVu.loaiDichVu"]: 50,
      },
    },
    storeName: "dichVuAn",
    title: "Dịch vụ ăn",
  }),
};
