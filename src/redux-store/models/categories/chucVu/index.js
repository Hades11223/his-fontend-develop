import chucVuProvider from "data-access/categories/dm-chuc-vu-provider";
import { message } from "antd";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: chucVuProvider,
    storeName: "chucVu",
    title: "Chức vụ",
    initState: {
      listChucVu: [],
      listAllChucVu: [],
    },
    customEffect: ({ dispatch }) => ({
      getListChucVu: async (payload = {}, state) => {
        try {
          const response = await chucVuProvider.search(payload);
          let {
            code,
            data: listChucVu,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.chucVu.getListChucVu({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.chucVu.updateData({
            listChucVu,
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
            response = await chucVuProvider.put(payload);
            dispatch.chucVu.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu chức vụ!");
          } else {
            response = await chucVuProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu chức vụ!");
          }
          return response?.data;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          chucVu: { page, size },
        } = state;
        const response = await chucVuProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.chucVu.getListChucVu({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
