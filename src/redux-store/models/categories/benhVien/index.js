import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import benhVienProvider from "data-access/categories/dm-benh-vien-provider";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: benhVienProvider,
    storeName: "benhVien",
    title: "bệnh viện",
    initState: {
      listAllBenhVien: [],
      listBenhVien: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListBenhVien: async (payload = {}, state) => {
        try {
          const response = await benhVienProvider.search(payload);
          let {
            data: listBenhVien,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.benhVien.getListBenhVien({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.benhVien.updateData({
            listBenhVien,
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
            response = await benhVienProvider.put(payload);
            dispatch.benhVien.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu bệnh viện!");
          } else {
            response = await benhVienProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu bệnh viện!");
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          benhVien: { page, size },
        } = state;
        const response = await benhVienProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.benhVien.getListBenhVien({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
