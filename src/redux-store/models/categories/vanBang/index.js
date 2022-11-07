import vanBangProvider from "data-access/categories/dm-van-bang-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: vanBangProvider,
    storeName: "vanBang",
    title: "văn bằng",
    initState: {
      listVanBang: [],
      listAllVanBang: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListVanBang: async (payload = {}, state) => {
        try {
          const response = await vanBangProvider.search(payload);
          let {
            code,
            data: listVanBang,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.vanBang.getListVanBang({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.vanBang.updateData({
            listVanBang,
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
            response = await vanBangProvider.put(payload);
            dispatch.vanBang.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu VB chuyên môn!");
          } else {
            response = await vanBangProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu VB chuyên môn!");
          }
          return response?.data;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          vanBang: { page, size },
        } = state;
        const response = await vanBangProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.vanBang.getListVanBang({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
