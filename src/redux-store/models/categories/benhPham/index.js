import benhPhamProvider from "data-access/categories/dm-benh-pham-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: benhPhamProvider,
    storeName: "benhPham",
    title: "bệnh phẩm",
    initState: {
      listBenhPham: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      searchBenhPham: async (payload = {}, state) => {
        try {
          const response = await benhPhamProvider.search(payload);
          let {
            code,
            data: listBenhPham,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.benhPham.searchBenhPham({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.benhPham.updateData({
            listBenhPham,
            totalElements,
            page,
            size,
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      searchBenhPhamTongHop: async (payload = {}, state) => {
        try {
          const response = await benhPhamProvider.searchTongHop(payload);
          let {
            code,
            data: listBenhPham,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.benhPham.searchBenhPhamTongHop({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.benhPham.updateData({
            listBenhPham,
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
            response = await benhPhamProvider.put(payload);
            dispatch.benhPham.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu bệnh phẩm!");
          } else {
            response = await benhPhamProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu bệnh phẩm!");
          }
          return response?.data;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          benhPham: { page, size },
        } = state;
        const response = await benhPhamProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.benhPham.searchBenhPham({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
