import apiBase from "data-access/api-base";
import fetchProvider from "data-access/categories/dm-muc-do-tuong-tac-provider";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "mucDoTuongTac",
    title: "Mức độ tương tác",
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: fetchProvider.searchAll,
        KEY_CACHE: "DATA_ALL_MUC_DO_TUONG_TAC",
        model: "mucDoTuongTac",
        fieldName: "MucDoTuongTac",
      }),
    }),
  }),
};
