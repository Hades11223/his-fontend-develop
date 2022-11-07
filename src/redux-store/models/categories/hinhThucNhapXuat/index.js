import hinhThucNhapXuatProvider from "data-access/categories/dm-hinh-thuc-nhap-xuat";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: hinhThucNhapXuatProvider,
    storeName: "hinhThucNhapXuat",
    title: "Hình thức nhập xuất",
    initState: {
      listHinhThucNhapXuat: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListHinhThucNhapXuat: async (payload = {}, state) => {
        try {
          const response = await hinhThucNhapXuatProvider.search(payload);
          let {
            code,
            data: listHinhThucNhapXuat,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (code !== 0) throw new Error(messageInfo);

          if (page > 0 && numberOfElements === 0) {
            return dispatch.hinhThucNhapXuat.getListHinhThucNhapXuat({
              page: page - 1,
              size,
            });
          }

          return dispatch.hinhThucNhapXuat.updateData({
            listHinhThucNhapXuat,
            totalElements,
            page,
            size,
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      getTongHop: (payload) => {
        hinhThucNhapXuatProvider
          .searchAll(payload)
          .then((s) => {
            dispatch.hinhThucNhapXuat.updateData({
              listTongHop: s.data,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      },
      createOrEdit: async (payload = {}, state) => {
        try {
          let response = {};
          if (payload.id) {
            response = await hinhThucNhapXuatProvider.put(payload);
            dispatch.hinhThucNhapXuat.updateData({
              dataEditDefault: response.data,
            });
            message.success(
              "Cập nhật thành công dữ liệu hình thức nhâp/loại xuất!"
            );
          } else {
            response = await hinhThucNhapXuatProvider.post(payload);
            message.success(
              "Thêm mới thành công dữ liệu hình thức nhâp/loại xuất!"
            );
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          hinhThucNhapXuat: { page, size },
        } = state;
        const response = await hinhThucNhapXuatProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công!");
          dispatch.hinhThucNhapXuat.getListHinhThucNhapXuat({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
