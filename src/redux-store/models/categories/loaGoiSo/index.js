import loaGoiSoProvider from "data-access/categories/dm-loa-goi-so-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import apiBase from "data-access/api-base";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: loaGoiSoProvider,
    storeName: "loaGoiSo",
    title: "Loa gọi số",
    initState: {
      listLoaGoiSo: [],
      listAllLoaGoiSo: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: loaGoiSoProvider.searchAll,
        KEY_CACHE: "DATA_ALL_LOA_GOI_SO",
        model: "loaGoiSo",
        fieldName: "LoaGoiSo",
      }),
      getListLoaGoiSo: async (payload = {}, state) => {
        try {
          const response = await loaGoiSoProvider.search(payload);
          let {
            code,
            data: listLoaGoiSo,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.loaGoiSo.getListLoaGoiSo({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.loaGoiSo.updateData({
            listLoaGoiSo,
            totalElements,
            page,
            size,
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      createOrEdit: async (payload = {}, state) => {
        let response = {};
        try {
          if (payload.id) {
            response = await loaGoiSoProvider.put(payload);
            dispatch.loaGoiSo.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu loa gọi số!");
          } else {
            response = await loaGoiSoProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu loa gọi số!");
          }
          return response?.data;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          loaGoiSo: { page, size },
        } = state;
        const response = await loaGoiSoProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.loaGoiSo.getListLoaGoiSo({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
