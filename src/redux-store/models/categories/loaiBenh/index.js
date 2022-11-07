import loaiBenhProvider from "data-access/categories/dm-loai-benh-provider";
import { message } from "antd";
import { SORT_DEFAULT } from "constants/index";
import cacheUtils from "utils/cache-utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "data-access/api-base";

export default {
  state: {
    listAllLoaiBenh: [],
    listLoaiBenh: [],
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSort: SORT_DEFAULT,
    listAllData: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: loaiBenhProvider.searchAll,
      KEY_CACHE: "DATA_ALL_LOAI_BENH",
      model: "loaiBenh",
      fieldName: "LoaiBenh",
    }),
    getListLoaiBenh: async (payload = {}, state) => {
      try {
        const response = await loaiBenhProvider.search(payload);
        let {
          code,
          data: listLoaiBenh,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.loaiBenh.getListLoaiBenh({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.loaiBenh.updateData({
          listLoaiBenh,
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
          response = await loaiBenhProvider.put(payload);
          message.success("Cập nhật thành công dữ liệu loại bệnh!");
          dispatch.loaiBenh.getListLoaiBenh({});
        } else {
          response = await loaiBenhProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu loại bệnh!");
          dispatch.loaiBenh.getListLoaiBenh({
            page: 0,
          });
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        loaiBenh: { page, size },
      } = state;
      const response = await loaiBenhProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.loaiBenh.getListLoaiBenh({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
