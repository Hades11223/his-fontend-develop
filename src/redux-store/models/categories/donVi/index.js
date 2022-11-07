import donViProvider from "data-access/categories/dm-don-vi-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import apiBase from "../../../../data-access/api-base";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: donViProvider,
    storeName: "donVi",
    title: "đơn vị",
    initState: {
      listDonVi: [],
      listAllDonVi: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: donViProvider.searchAll,
        KEY_CACHE: "DATA_ALL_DON_VI",
        model: "donVi",
        fieldName: "DonVi",
      }),
      getListDonVi: async (payload = {}, state) => {
        try {
          const response = await donViProvider.search(payload);
          let {
            data: listDonVi,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.donVi.getListDonVi({
              page: page - 1,
              size,
            });
          }

          return dispatch.donVi.updateData({
            listDonVi,
            totalElements,
            page,
            size,
          });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      },
      createOrEdit: async (payload = {}, state) => {
        try {
          let response = {};
          if (payload.id) {
            response = await donViProvider.put(payload);
            dispatch.donVi.updateData({ dataEditDefault: response.data });
            message.success("Cập nhật thành công dữ liệu cơ quan đơn vị!");
          } else {
            response = await donViProvider.post(payload);

            message.success("Thêm mới thành công dữ liệu cơ quan đơn vị!");
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          donVi: { page, size },
        } = state;
        const response = await donViProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.donVi.search({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
