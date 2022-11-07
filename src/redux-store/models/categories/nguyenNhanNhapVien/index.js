import nguyenNhanNhapVienProvider from "data-access/categories/dm-nguyen-nhan-nhap-vien-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: nguyenNhanNhapVienProvider,
    storeName: "nguyenNhanNhapVien",
    title: "nguyên nhân nhập viện",
    initState: {
      listNguyenNhanNhapVien: [],
      listAllNguyenNhanNhapVien: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListNguyenNhanNhapVien: async (payload = {}, state) => {
        try {
          const response = await nguyenNhanNhapVienProvider.search(payload);
          let {
            data: listNguyenNhanNhapVien,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.nguyenNhanNhapVien.getListNguyenNhanNhapVien({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.nguyenNhanNhapVien.updateData({
            listNguyenNhanNhapVien,
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
        return new Promise((resolve, reject) => {
          if (state.nguyenNhanNhapVien?._dataEdit?.id || payload?.id) {
            nguyenNhanNhapVienProvider
              .put({
                ...payload,
                id: state.nguyenNhanNhapVien?._dataEdit?.id || payload?.id,
              })
              .then((res) => {
                if (res.code === 0) {
                  dispatch.nguyenNhanNhapVien.updateData({
                    dataEditDefault: res.data,
                  });
                  message.success(
                    `Cập nhật thành công dữ liệu nguyên nhân nhập viện!`
                  );
                } else {
                  message.error(res.message);
                }
                resolve(res);
              })
              .catch((e) => {
                reject(e);
              });
          } else {
            nguyenNhanNhapVienProvider
              .post(payload)
              .then((res) => {
                if (res.code === 0) {
                  message.success(
                    `Thêm mới thành công dữ liệu nguyên nhân nhập viện!`
                  );
                } else {
                  message.error(res.message);
                }
                resolve(res);
              })
              .catch((e) => {
                reject(e);
              });
          }
        });
      },
      onDelete: async (payload, state) => {
        const {
          thoiGianCapCuu: { page, size },
        } = state;
        const response = await nguyenNhanNhapVienProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.nguyenNhanNhapVien.getListNguyenNhanNhapVien({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
