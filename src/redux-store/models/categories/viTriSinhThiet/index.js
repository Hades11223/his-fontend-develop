import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import viTriSinhThietProvider from "data-access/categories/dm-vi-tri-sinh-thiet-provider";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: viTriSinhThietProvider,
    storeName: "viTriSinhThiet",
    title: "vị trí sinh thiết",
    initState: {
      listAllViTriSinhThiet: [],
      listViTriSinhThiet: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      listDataTongHop: [],
    },
    customEffect: ({ dispatch }) => ({
      getListViTriSinhThiet: async (payload = {}, state) => {
        try {
          const response = await viTriSinhThietProvider.search(payload);
          let {
            data: listViTriSinhThiet,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.viTriSinhThiet.getListViTriSinhThiet({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.viTriSinhThiet.updateData({
            listViTriSinhThiet,
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
            response = await viTriSinhThietProvider.put(payload);
            dispatch.viTriSinhThiet.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu vị trí sinh thiết!");
          } else {
            response = await viTriSinhThietProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu vị trí sinh thiết!");
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          viTriSinhThiet: { page, size },
        } = state;
        const response = await viTriSinhThietProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.viTriSinhThiet.getListViTriSinhThiet({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
