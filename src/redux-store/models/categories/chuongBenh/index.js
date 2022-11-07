import chuongBenhProvider from "data-access/dm-chuong-benh-provider";
import { message } from "antd";
import { SORT_DEFAULT } from "constants/index";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import cacheUtils from "utils/cache-utils";
import { combineSort } from "utils";
export default {
  state: {
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
    onSearch: async (payload = {}, state) => {
      try {
        const response = await chuongBenhProvider.search(payload);
        let {
          data: listData,
          totalElements: total,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.chuongBenh.onSearch({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.chuongBenh.updateData({
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
        const response = await chuongBenhProvider.searchTongHop(payload);
        let {
          data: listData,
          totalElements: total,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.chuongBenh.onSearchTongHop({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.chuongBenh.updateData({
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
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      const {
        chuongBenh: { page, size, dataSearch, dataSort },
      } = state;
      try {
        if (payload.id) {
          response = await chuongBenhProvider.put(payload);
          message.success("Cập nhật thành công dữ liệu chương bệnh!");
          dispatch.chuongBenh.onSearch({
            page,
            size,
            ...dataSearch,
            sort: combineSort(dataSort),
          });
        } else {
          response = await chuongBenhProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu chương bệnh!");
          dispatch.chuongBenh.onSearch({
            page: 0,
            size,
            ...dataSearch,
            sort: combineSort(dataSort),
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
        chuongBenh: { page, size },
      } = state;
      const response = await chuongBenhProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.chuongBenh.onSearch({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getAll: async ({ page = 0, size, active = true, ...payload }, state) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page === 0) {
        list = await cacheUtils.read(userId, `DATA_CHUONG_BENH`, [], false);
        dispatch.chuongBenh.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        chuongBenhProvider
          .search({
            page,
            size: size || 99999,
            sort: "ten,asc",
            active,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let data = (s?.data || []).map((item, index) => {
                const { ma, ten, id } = item;
                return {
                  ma,
                  ten,
                  id,
                };
              });
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                dispatch.chuongBenh.updateData({ listAllData: data });
                if (!size && page === 0)
                  cacheUtils.save(userId, `DATA_CHUONG_BENH`, data, false);
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
    getAllTongHop: async ({ page = 0, size, active = true, ...payload }, state) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page === 0) {
        list = await cacheUtils.read(userId, `DATA_CHUONG_BENH_TONG_HOP`, [], false);
        dispatch.chuongBenh.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        chuongBenhProvider
          .searchTongHop({
            page,
            size: size || 99999,
            sort: "ten,asc",
            active,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let data = (s?.data || []).map((item, index) => {
                const { ma, ten, id } = item;
                return {
                  ma,
                  ten,
                  id,
                };
              });
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                dispatch.chuongBenh.updateData({ listAllData: data });
                if (!size && page === 0)
                  cacheUtils.save(userId, `DATA_CHUONG_BENH_TONG_HOP`, data, false);
              }
              resolve(s);
            } else {
              reject(s);
              message.error(
                s?.message == "Network Error"
                  ? "Đang cập nhật hệ thống"
                  : s?.message || "Xảy ra lỗi, vui lòng thử lại sau"
              );
            }
          })
          .catch((e) => {
            reject(e);
            message.error(
              e?.message == "Network Error"
                ? "Đang cập nhật hệ thống"
                : e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
            );
          });
      });
    },
  }),
};
