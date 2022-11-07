import chuyenKhoaProvider from "data-access/categories/dm-chuyen-khoa-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import apiBase from "../../../../data-access/api-base";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: chuyenKhoaProvider,
    storeName: "chuyenKhoa",
    title: "Chuyên khoa",
    initState: {
      listChuyenKhoa: [],
      listAllChuyenKhoa: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      currentChuyenKhoa: {},
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: chuyenKhoaProvider.searchAll,
        KEY_CACHE: "DATA_ALL_CHUYEN_KHOA",
        model: "chuyenKhoa",
        fieldName: "ChuyenKhoa",
      }),

      getListChuyenKhoa: async (payload = {}, state) => {
        try {
          const response = await chuyenKhoaProvider.search(payload);
          let {
            code,
            data: listChuyenKhoa,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.chuyenKhoa.getListChuyenKhoa({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.chuyenKhoa.updateData({
            listChuyenKhoa,
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
            response = await chuyenKhoaProvider.put(payload);
            dispatch.chuyenKhoa.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu chuyên khoa!");
          } else {
            response = await chuyenKhoaProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu chuyên khoa!");
          }
          return response?.data;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          chuyenKhoa: { page, size },
        } = state;
        const response = await chuyenKhoaProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.chuyenKhoa.getListChuyenKhoa({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
      getById: (payload = {}, state) => {
        chuyenKhoaProvider
          .getById(payload)
          .then((s) => {
            dispatch.chuyenKhoa.updateData({ currentChuyenKhoa: s?.data });
          })
          .catch((e) =>
            dispatch.chuyenKhoa.updateData({ currentChuyenKhoa: {} })
          );
      },
    }),
  }),
};
