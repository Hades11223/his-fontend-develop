import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import viTriChanThuongProvider from "data-access/categories/dm-vi-tri-chan-thuong-provider";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: viTriChanThuongProvider,
    storeName: "viTriChanThuong",
    title: "vị trí chấn thương",
    initState: {
      listViTriChanThuong: [],
      listAllViTriChanThuong: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListViTriTranThuong: async (payload = {}, state) => {
        try {
          const response = await viTriChanThuongProvider.search(payload);
          let {
            data: listViTriChanThuong,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.viTriChanThuong.getListViTriTranThuong({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.viTriChanThuong.updateData({
            listViTriChanThuong,
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
            response = await viTriChanThuongProvider.put(payload);
            dispatch.viTriChanThuong.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu vị trí chấn thương!");
          } else {
            response = await viTriChanThuongProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu vị trí chấn thương!");
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          viTriChanThuong: { page, size },
        } = state;
        const response = await viTriChanThuongProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.viTriChanThuong.getListViTriTranThuong({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
