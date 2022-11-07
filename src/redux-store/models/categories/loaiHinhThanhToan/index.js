import apiBase from "data-access/api-base";
import loaiHinhThanhToanProvider from "data-access/categories/dm-loai-hinh-thanh-toan-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider: loaiHinhThanhToanProvider,
    storeName: "loaiHinhThanhToan",
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: loaiHinhThanhToanProvider.searchAll,
        KEY_CACHE: "DATA_ALL_LOAI_HINH_THANH_TOAN",
        model: "loaiHinhThanhToan",
        fieldName: "LoaiHinhThanhToan",
      }),
    }),
  }),
};
