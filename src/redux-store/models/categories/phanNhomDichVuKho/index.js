import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import apiBase from "data-access/api-base";
import phanNhomDichVuKhoProvider from "data-access/categories/dm-phan-nhom-dich-vu-kho-provider";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: phanNhomDichVuKhoProvider,
    storeName: "phanNhomDichVuKho",
    title: "phân nhóm thuốc",
    initState: {
      listNhomDichVuKho: [],
      listAllNhomDichVuKho: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: phanNhomDichVuKhoProvider.searchAll,
        KEY_CACHE: "DATA_ALL_NHOM_DICH_VU_KHO",
        model: "phanNhomDichVuKho",
        fieldName: "NhomDichVuKho",
        getKeyCache: (key, payload = {}) => {
          return key + payload.loaiDichVu;
        },
      }),
      getListNhomDichVuKho: async (payload = {}, state) => {
        try {
          const response = await phanNhomDichVuKhoProvider.search(payload);
          let {
            code,
            data: listNhomDichVuKho,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.phanNhomDichVuKho.getListNhomDichVuKho({
              page: page - 1,
              size,
            });
          }

          listNhomDichVuKho = listNhomDichVuKho.map((item, index) => ({
            ...item,
            stt: page * size + index + 1,
          }));
          dispatch.phanNhomDichVuKho.updateData({
            listNhomDichVuKho,
            totalElements,
            page,
            size,
          });
          return response;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      createOrEdit: async (payload = {}, state) => {
        try {
          let response = {};
          if (payload.id) {
            response = await phanNhomDichVuKhoProvider.put(payload);
            dispatch.phanNhomDichVuKho.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu phân nhóm thuốc!");
          } else {
            response = await phanNhomDichVuKhoProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu phân nhóm thuốc!");
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
    }),
  }),
};
