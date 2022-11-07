import quanHamProvider from "data-access/categories/quan-ham-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: quanHamProvider,
    storeName: "quanHam",
    title: "quân hàm",
    initState: {
      listQuanHam: [],
      listAllQuanHam: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListQuanHam: async (payload = {}, state) => {
        try {
          const response = await quanHamProvider.search(payload);
          let {
            data: listQuanHam,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.quanHam.getListQuanHam({
              page: page - 1,
              size,
            });
          }

          return dispatch.quanHam.updateData({
            listQuanHam,
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
            response = await quanHamProvider.put(payload);
            dispatch.quanHam.updateData({ dataEditDefault: response.data });
            message.success("Cập nhật thành công dữ liệu quân hàm!");
          } else {
            response = await quanHamProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu quân hàm!");
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          quanHam: { page, size },
        } = state;
        const response = await quanHamProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.quanHam.getListQuanHam({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
