import phuongPhapNhuomProvider from "data-access/categories/dm-phuong-phap-nhom-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: phuongPhapNhuomProvider,
    storeName: "phuongPhapNhuom",
    title: "phương pháp nhuộm",
    initState: {
      listPhuongPhapNhuom: [],
      listAllPhuongPhapNhuom: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      listAllPhuongPhapNhuom: [],
    },
    customEffect: ({ dispatch }) => ({
      getListPhuongPhapNhuom: async (payload = {}, state) => {
        try {
          const response = await phuongPhapNhuomProvider.search(payload);
          let {
            data: listPhuongPhapNhuom,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.phuongPhapNhuom.getListPhuongPhapNhuom({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.phuongPhapNhuom.updateData({
            listPhuongPhapNhuom,
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
            response = await phuongPhapNhuomProvider.put(payload);
            dispatch.phuongPhapNhuom.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu phương pháp nhuộm!");
          } else {
            response = await phuongPhapNhuomProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu phương pháp nhuộm!");
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          phuongPhapNhuom: { page, size },
        } = state;
        const response = await phuongPhapNhuomProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.phuongPhapNhuom.getListPhuongPhapNhuom({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
