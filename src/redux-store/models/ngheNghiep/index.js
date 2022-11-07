import { message } from "antd";
import ngheNghiepProvider from "data-access/categories/dm-nghe-nghiep-provider";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider: ngheNghiepProvider,
    storeName: "ngheNghiep",
    title: "nghề nghiệp",
    initState: {
      listNgheNghiep: [],
      listAllNgheNghiep: [],
    },
    customEffect: ({ dispatch }) => ({
      getListNgheNghiep: async (payload = {}, state) => {
        try {
          const response = await ngheNghiepProvider.search(payload);
          let {
            code,
            data: listNgheNghiep,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.ngheNghiep.getListNgheNghiep({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.ngheNghiep.updateData({
            listNgheNghiep,
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
            response = await ngheNghiepProvider.put(payload);
            dispatch.ngheNghiep.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu nghề nghiệp!");
          } else {
            response = await ngheNghiepProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu nghề nghiệp!");
          }
          return response?.data;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          ngheNghiep: { page, size },
        } = state;
        const response = await ngheNghiepProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.ngheNghiep.getListNgheNghiep({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
