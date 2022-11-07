import apiBase from "data-access/api-base";
import mauKqPtttProvider from "data-access/categories/dm-mau-ket-qua-pt-tt-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider: mauKqPtttProvider,
    storeName: "mauKetQuaPTTT",
    title: "Mẫu kết quả phẫu thuật - thủ thuật",
    initState: {
      _dataSearch: {
        loaiDichVu: 40,
      },
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: mauKqPtttProvider.searchAll,
        KEY_CACHE: "DATA_ALL_MAU_KET_QUA_PTTT",
        model: "mauKetQuaPTTT",
        fieldName: "MauKetQuaPTTT",
      }),
    }),
  }),
};
