import chuongTrinhGiamGiaProvider from "data-access/categories/dm-chuong-trinh-giam-gia-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listChuongTrinhGiamGia: [],
    listAllChuongTrinhGiamGia: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSort: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListAllChuongTrinhGiamGia: async (payload, state) => {
      try {
        const response = await chuongTrinhGiamGiaProvider.searchAll(payload);
        let {
          code,
          data: listAllChuongTrinhGiamGia,
          message: messageInfo,
        } = response;
        if (code !== 0) throw new Error(messageInfo);
        return dispatch.chuongTrinhGiamGia.updateData({
          listAllChuongTrinhGiamGia,
        });
      } catch (err) {
        message.error(err?.message.toString());
        return Promise.reject(err);
      }
    },
    getListChuongTrinhGiamGia: async (payload = {}, state) => {
      try {
        const response = await chuongTrinhGiamGiaProvider.search(payload);
        let {
          code,
          data: listChuongTrinhGiamGia,
          totalElements,
          numberOfElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
        } = response;
        if (code !== 0) throw new Error(messageInfo);
        if (page > 0 && numberOfElements === 0) {
          return dispatch.chuongTrinhGiamGia.getListChuongTrinhGiamGia({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.chuongTrinhGiamGia.updateData({
          listChuongTrinhGiamGia,
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
      let response = {};
      try {
        if (payload.id) {
          response = await chuongTrinhGiamGiaProvider.put(payload);
          dispatch.chuongTrinhGiamGia.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu chương trình giảm giá!");
        } else {
          response = await chuongTrinhGiamGiaProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu chương trình giảm giá!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        chuongTrinhGiamGia: { page, size },
      } = state;
      const response = await chuongTrinhGiamGiaProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.chuongTrinhGiamGia.getListChuongTrinhGiamGia({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
