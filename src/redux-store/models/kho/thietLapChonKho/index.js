import thietLapChonKhoProvider from "data-access/kho/thiet-lap-chon-kho-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import apiBase from "data-access/api-base";
import { KHO_THIET_LAP_CHON_KHO } from "client/api";

export default {
  state: {
    listThietLapChonKho: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      // console.log({ ...state, ...payload });
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListThietLapChonKho: async (payload = {}, state) => {
      const response = await thietLapChonKhoProvider.search({
        sort: "createdAt,asc",
        ...payload,
      });
      let {
        code,
        data: listThietLapChonKho,
        totalElements,
        message: messageInfo,
        pageNumber: page,
        pageSize: size,
        numberOfElements,
      } = response;
      if (code !== 0) throw new Error(messageInfo);

      if (page > 0 && numberOfElements === 0) {
        return dispatch.thietLapChonKho.listThietLapChonKho({
          ...payload,
          page: page - 1,
          size,
        });
      }

      return dispatch.thietLapChonKho.updateData({
        listThietLapChonKho,
        totalElements,
        page,
        size,
      });
    },

    getListThietLapChonKhoTongHop: async (payload = {}, state) => {
      const response = await thietLapChonKhoProvider.searchTongHop({
        ...payload,
      });
      let {
        code,
        data: listThietLapChonKho,
        totalElements,
        message: messageInfo,
        pageNumber: page,
        pageSize: size,
        numberOfElements,
      } = response;
      if (code !== 0) throw new Error(messageInfo);

      if (page > 0 && numberOfElements === 0) {
        return dispatch.thietLapChonKho.listThietLapChonKho({
          ...payload,
          page: page - 1,
          size,
        });
      }

      return dispatch.thietLapChonKho.updateData({
        listThietLapChonKho,
        totalElements,
        page,
        size,
      });
    },

    getListThietLapChonKhoTheoTaiKhoan: async (payload = {}, state) => {
      const response = await thietLapChonKhoProvider.searchTheoTaiKhoan({
        sort: "createdAt,asc",
        ...payload,
      });

      let {
        code,
        data: listThietLapChonKho,
        totalElements,
        message: messageInfo,
        pageNumber: page,
        pageSize: size,
        numberOfElements,
      } = response;
      if (code !== 0) throw new Error(messageInfo);

      if (page > 0 && numberOfElements === 0) {
        return dispatch.thietLapChonKho.listThietLapChonKho({
          ...payload,
          page: page - 1,
          size,
        });
      }
      // console.log("listThietLapChonKho", listThietLapChonKho);
      return dispatch.thietLapChonKho.updateData({
        listThietLapChonKho,
        totalElements,
        page,
        size,
      });
    },

    searchThietLapChonKho: async (payload = {}, state) => {
      const response = await thietLapChonKhoProvider.search({
        sort: "createdAt,asc",
        ...payload,
      });
      let {
        code,
        data: listThietLapChonKho,
        totalElements,
        message: messageInfo,
        pageNumber: page,
        pageSize: size,
        numberOfElements,
      } = response;

      if (code !== 0) throw new Error(messageInfo);

      if (page > 0 && numberOfElements === 0) {
        return dispatch.thongBao.listThietLapChonKho({
          ...payload,
          page: page - 1,
          size,
        });
      }
      dispatch.thietLapChonKho.updateData({
        listThietLapChonKho,
        totalElements,
        page,
        size,
      });
    },

    createOrEdit: async (payload = {}, state) => {
      try {
        let response = {};
        if (payload.id) {
          response = await thietLapChonKhoProvider.put(payload);
          if (response.code === 0) {
            dispatch.thietLapChonKho.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu thiết lập chọn kho");
          }
        } else {
          response = await thietLapChonKhoProvider.post(payload);
          if (response.code === 0) {
            message.success("Thêm mới thành công dữ liệu thiết lập chọn kho");
          }
        }

        const { code, message: messageInfo } = response;
        if (code !== 0) {
          message.error(messageInfo.toString());
        }
      } catch (err) {
        message.error(err.message.toString());
      }
    },
    onDelete: async (payload, state) => {
      const {
        thietLapChonKho: { page, size },
      } = state;
      const response = await thietLapChonKhoProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.thietLapChonKho.getListThietLapChonKho({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
