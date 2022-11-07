import nhomBenhProvider from "data-access/categories/dm-nhom-benh-provider";
import { message } from "antd";
import { SORT_DEFAULT } from "constants/index";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import cacheUtils from "utils/cache-utils";
import orderBy from "lodash/orderBy";
import apiBase from "data-access/api-base";
export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSort: SORT_DEFAULT,
    dataSearch: {},
    listAllNhomBenhChinh: [],
    listAllNhomBenhPhu1: [],
    listAllNhomBenhPhu2: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: nhomBenhProvider.searchAll,
      KEY_CACHE: "DATA_ALL_NHOM_BENH",
      model: "nhomBenh",
      fieldName: "NhomBenh",
    }),
    onSearch: async (payload = {}, state) => {
      try {
        const response = await nhomBenhProvider.search(payload);
        let {
          data: listData,
          totalElements: total,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nhomBenh.onSearch({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.nhomBenh.updateData({
          listData,
          total,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onSearchTongHop: async (payload = {}, state) => {
      try {
        const response = await nhomBenhProvider.searchTongHop(payload);
        let {
          data: listData,
          totalElements: total,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nhomBenh.onSearchTongHop({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.nhomBenh.updateData({
          listData,
          total,
          page,
          size,
        });
      } catch (err) {
        message.error(
          err?.message.toString() == "Network Error"
            ? "Đang cập nhật hệ thống"
            : err?.message.toString() || "Xảy ra lỗi, vui lòng thử lại sau"
        );
        return Promise.reject(err);
      }
    },
    getData: (payload, state) => {
      const {
        nhomBenh: { page, size, dataSearch, dataSort },
      } = state;
      const { loaiNhomBenh, ...rest } = payload;
      dispatch.nhomBenh.updateData({
        page,
        size,
        ...dataSearch,
        dataSort,
        ...rest,
      });
      dispatch.nhomBenh.onSearch({
        page,
        size,
        ...dataSearch,
        sort: combineSort(dataSort),
        ...payload,
      });
    },
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await nhomBenhProvider.put(payload);
          if (payload?.loaiNhomBenh === 10) {
            message.success("Cập nhật thành công dữ liệu nhóm bệnh chính!");
          } else if (payload?.loaiNhomBenh === 20) {
            message.success("Cập nhật thành công dữ liệu nhóm bệnh phụ I!");
          } else if (payload?.loaiNhomBenh === 30) {
            message.success("Cập nhật thành công dữ liệu nhóm bệnh phụ II!");
          }
          dispatch.nhomBenh.getData({
            loaiNhomBenh: payload?.loaiNhomBenh,
          });
        } else {
          response = await nhomBenhProvider.post(payload);
          if (payload?.loaiNhomBenh === 10) {
            message.success("Thêm mới thành công dữ liệu nhóm bệnh chính!");
          } else if (payload?.loaiNhomBenh === 20) {
            message.success("Thêm mới thành công dữ liệu nhóm bệnh phụ I!");
          } else if (payload?.loaiNhomBenh === 30) {
            message.success("Thêm mới thành công dữ liệu nhóm bệnh phụ II!");
          }
          dispatch.nhomBenh.getData({
            page: 0,
            loaiNhomBenh: payload?.loaiNhomBenh,
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
        nhomBenh: { page, size },
      } = state;
      const response = await nhomBenhProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.nhomBenh.onSearch({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getAllNhomBenh: async ({ loaiNhomBenh, ...payload }, state) => {
      let userId = state.auth.auth?.id;
      let list = [];
      let DataCache = "";
      let DataStore = "";
      switch (loaiNhomBenh) {
        case 10:
          DataCache = "NHOM_CHINH";
          DataStore = "NhomBenhChinh";
          break;
        case 20:
          DataCache = "NHOM_PHU_1";
          DataStore = "NhomBenhPhu1";
          break;
        default:
          DataCache = "NHOM_PHU_2";
          DataStore = "NhomBenhPhu2";
          break;
      }
      list = await cacheUtils.read(userId, `DATA_${DataCache}`, [], false);
      dispatch.nhomBenh.updateData({ [`listAll${DataStore}`]: list });
      return new Promise((resolve, reject) => {
        nhomBenhProvider
          .searchAll({
            loaiNhomBenh,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let { data } = s;
              data = orderBy(data, "ten", "asc");
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                dispatch.nhomBenh.updateData({
                  [`listAll${DataStore}`]: data,
                });
                cacheUtils.save(userId, `DATA_${DataCache}`, data, false);
              }
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getNhomBenh: async ({ loaiNhomBenh, ...payload }, state) => {
      let userId = state.auth.auth?.id;
      let list = [];
      let DataCache = "";
      let DataStore = "";
      switch (loaiNhomBenh) {
        case 10:
          DataCache = "NHOM_CHINH";
          DataStore = "NhomBenhChinh";
          break;
        case 20:
          DataCache = "NHOM_PHU_1";
          DataStore = "NhomBenhPhu1";
          break;
        default:
          DataCache = "NHOM_PHU_2";
          DataStore = "NhomBenhPhu2";
          break;
      }
      list = await cacheUtils.read(userId, `DATA_${DataCache}`, [], false);
      dispatch.nhomBenh.updateData({ [`list${DataStore}`]: list });
      return new Promise((resolve, reject) => {
        nhomBenhProvider
          .search({
            loaiNhomBenh,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let { data } = s;
              data = orderBy(data, "ten", "asc");
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                dispatch.nhomBenh.updateData({
                  [`list${DataStore}`]: data,
                });
                cacheUtils.save(userId, `DATA_${DataCache}`, data, false);
              }
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
