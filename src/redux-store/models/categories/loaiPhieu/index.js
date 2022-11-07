import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import loaiPhieuProvider from "data-access/categories/dm-loai-phieu-provider.js";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider: loaiPhieuProvider,
    storeName: "loaiPhieu",
    title: "Loại phiếu",
    initState: {
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      listData: [],
      dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
    },
    customEffect: ({ dispatch }) => ({}),
  }),
};
