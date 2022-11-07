import duongDungProvider from "data-access/categories/dm-duong-dung-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider: duongDungProvider,
    storeName: "duongDung",
    title: "Đường dùng",
    initState: {
      totalElements: null,
      page: 0,
      size: 10,
      dataEditDefault: {},
      dataSearch: {},
    },
  }),
};
