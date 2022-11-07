import noiLayBenhPhamProvider from "data-access/categories/dm-noi-lay-benh-pham-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: noiLayBenhPhamProvider,
    storeName: "noiLayBenhPham",
    title: "nơi lấy bệnh phẩm",
    initState: {
      listNoiLayBenhPham: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      searchNoiLayBenhPham: async (payload = {}, state) => {
        try {
          const response = await noiLayBenhPhamProvider.search(payload);
          let {
            code,
            data: listNoiLayBenhPham,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.noiLayBenhPham.searchNoiLayBenhPham({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.noiLayBenhPham.updateData({
            listNoiLayBenhPham,
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
            response = await noiLayBenhPhamProvider.put(payload);
            dispatch.noiLayBenhPham.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu nơi lấy bệnh phẩm!");
          } else {
            response = await noiLayBenhPhamProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu nơi lấy bệnh phẩm!");
          }
          return response?.data;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          noiLayBenhPham: { page, size },
        } = state;
        const response = await noiLayBenhPhamProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.noiLayBenhPham.searchNoiLayBenhPham({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
