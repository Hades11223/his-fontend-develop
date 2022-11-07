import thoiGianCapCuuProvider from "data-access/categories/dm-thoi-gian-cap-cuu-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: thoiGianCapCuuProvider,
    storeName: "thoiGianCapCuu",
    title: "thời gian cấp cứu",
    initState: {
      listThoiGianCapCuu: [],
      listAllThoiGianCapCuu: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListThoiGianCapCuu: async (payload = {}, state) => {
        try {
          const response = await thoiGianCapCuuProvider.search(payload);
          let {
            code,
            data: listThoiGianCapCuu,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.thoiGianCapCuu.getListThoiGianCapCuu({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.thoiGianCapCuu.updateData({
            listThoiGianCapCuu,
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
            response = await thoiGianCapCuuProvider.put(payload);
            dispatch.thoiGianCapCuu.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu thời gian cấp cứu!");
          } else {
            response = await thoiGianCapCuuProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu thời gian cấp cứu!");
          }
          return response?.data;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          thoiGianCapCuu: { page, size },
        } = state;
        const response = await thoiGianCapCuuProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.thoiGianCapCuu.getListThoiGianCapCuu({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
