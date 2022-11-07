import apiBase from "data-access/api-base";
import fetchProvider from "data-access/categories/dm-hau-qua-tuong-tac-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "hauQuaTuongTac",
    title: "Hậu quả tương tác",
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: fetchProvider.searchAll,
        KEY_CACHE: "DATA_ALL_HAU_QUA_TUONG_TAC",
        model: "hauQuaTuongTac",
        fieldName: "HauQuaTuongTac",
      }),
    }),
  }),
};
