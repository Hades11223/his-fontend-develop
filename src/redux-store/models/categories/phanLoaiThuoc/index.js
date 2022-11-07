import phanLoaiThuocProvider from "data-access/categories/dm-phan-loai-thuoc-provider";
import { message } from "antd";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: phanLoaiThuocProvider,
    storeName: "phanLoaiThuoc",
    title: "phân loại thuốc",
    customEffect: ({ dispatch }) => ({
      getListPhanLoaiThuoc: async (payload = {}, state) => {
        try {
          const response = await phanLoaiThuocProvider.search({
            sort: "active,desc&createdAt,desc&ma,asc",
            ...payload,
          });
          let {
            data: listPhanLoaiThuoc,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.phanLoaiThuoc.getListPhanLoaiThuoc({
              ...payload,
              page: page - 1,
              size,
            });
          }

          dispatch.phanLoaiThuoc.updateData({
            listPhanLoaiThuoc,
            totalElements,
            page,
            size,
          });
          return response;
        } catch (err) {
          return err;
        }
      },

      createOrEdit: async (payload = {}, state) => {
        let response = {};
        try {
          if (payload.id) {
            response = await phanLoaiThuocProvider.put(payload);
            dispatch.phanLoaiThuoc.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu phân loại thuốc!");
          } else {
            response = await phanLoaiThuocProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu phân loại thuốc!");
          }
          return response?.data;
        } catch (err) {
          if (payload.id) {
            message.success(
              err.message.toString() ||
                "Cập nhật không thành công dữ liệu phân loại thuốc!"
            );
          } else {
            message.success(
              err.message.toString() ||
                "Thêm mới không thành công dữ liệu phân loại thuốc!"
            );
          }
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          khoa: { page, size },
        } = state;
        const response = await phanLoaiThuocProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.phanLoaiThuoc.getListPhanLoaiThuoc({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
