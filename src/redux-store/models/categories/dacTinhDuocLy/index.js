import apiBase from "data-access/api-base";
import fetchProvider from "data-access/categories/dm-dac-tinh-duoc-ly-provider";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "dacTinhDuocLy",
    title: "Đặc tính dược lý",
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: fetchProvider.searchAll,
        KEY_CACHE: "DATA_ALL_DAC_TINH_DUOC_LY",
        model: "dacTinhDuocLy",
        fieldName: "DacTinhDuocLy",
      }),
    }),
  }),
};
