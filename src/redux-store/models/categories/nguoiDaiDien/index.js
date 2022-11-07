import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import nguoiDaiDienProvider from "data-access/categories/dm-nguoi-dai-dien-provider";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: nguoiDaiDienProvider,
    storeName: "nguoiDaiDien",
    title: "người đại diện",
    initState: {
      listNguoiDaiDien: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListNguoiDaiDien: async (payload = {}, state) => {
        try {
          const response = await nguoiDaiDienProvider.search(payload);
          let {
            data: listNguoiDaiDien,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.nguoiDaiDien.getListNguoiDaiDien({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.nguoiDaiDien.updateData({
            listNguoiDaiDien,
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
            response = await nguoiDaiDienProvider.put(payload);
            dispatch.nguoiDaiDien.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu người đại diện!");
          } else {
            response = await nguoiDaiDienProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu người đại diện!");
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          nguoiDaiDien: { page, size },
        } = state;
        const response = await nguoiDaiDienProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.nguoiDaiDien.getListNguoiDaiDien({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
