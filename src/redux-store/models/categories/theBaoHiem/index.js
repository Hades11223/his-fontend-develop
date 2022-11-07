import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import theBaoHiemProvider from "data-access/categories/dm-the-bao-hiem-provider";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: theBaoHiemProvider,
    storeName: "theBaoHiem",
    title: "thẻ bảo hiểm",
    initState: {
      listTheBaoHiem: [],
      listAllTheBaoHiem: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListTheBaoHiem: async (payload = {}, state) => {
        try {
          const response = await theBaoHiemProvider.search(payload);
          let {
            data: listTheBaoHiem,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.listAllTheBaoHiem.getListTheBaoHiem({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.theBaoHiem.updateData({
            listTheBaoHiem,
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
        try {
          let response = {};
          if (payload.id) {
            response = await theBaoHiemProvider.put(payload);
            dispatch.theBaoHiem.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu thẻ bảo hiểm!");
          } else {
            response = await theBaoHiemProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu thẻ bảo hiểm!");
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          theBaoHiem: { page, size },
        } = state;
        const response = await theBaoHiemProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.theBaoHiem.getListTheBaoHiem({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
