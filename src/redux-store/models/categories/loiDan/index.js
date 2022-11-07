import loiDanProvider from "data-access/categories/dm-loi-dan-provider";
import { message } from "antd";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: loiDanProvider,
    storeName: "loiDan",
    title: "Lời dặn",
    initState: {
      listLoiDan: [],
      totalElements: null,
      page: 0,
      size: 10,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListLoiDan: async (payload = {}, state) => {
        try {
          const response = await loiDanProvider.search(payload);
          let {
            data: listLoiDan,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.loiDan.getListLoiDan({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.loiDan.updateData({
            listLoiDan,
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
            response = await loiDanProvider.put(payload);
            dispatch.loiDan.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu lời dặn!");
          } else {
            response = await loiDanProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu lời dặn!");
          }
          return response?.data;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          loiDan: { page, size },
        } = state;
        const response = await loiDanProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.loiDan.getListLoiDan({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
