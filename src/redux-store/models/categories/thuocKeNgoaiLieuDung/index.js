import { message } from "antd";
import thuocKeNgoaiLieuDungProvider from "data-access/categories/thuoc-ke-ngoai-lieu-dung-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import cacheUtils from "utils/cache-utils";
export default {
  state: {
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    dataSortColumn: { active: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.thuocKeNgoaiLieuDung.updateData({
        size,
        page: 0,
      });
      dispatch.thuocKeNgoaiLieuDung.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.thuocKeNgoaiLieuDung.updateData(newState);
      let size = payload.size || state.thuocKeNgoaiLieuDung.size || 10;
      const sort = combineSort(
        payload.dataSortColumn ||
          state.thuocKeNgoaiLieuDung.dataSortColumn ||
          {}
      );
      const dataSearch =
        payload.dataSearch || state.thuocKeNgoaiLieuDung.dataSearch || {};
      thuocKeNgoaiLieuDungProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.thuocKeNgoaiLieuDung.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
            dataSearch,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.thuocKeNgoaiLieuDung.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.thuocKeNgoaiLieuDung.dataSortColumn,
        ...payload,
      };
      dispatch.thuocKeNgoaiLieuDung.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.thuocKeNgoaiLieuDung.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.thuocKeNgoaiLieuDung.dataSearch || {}),
        ...payload,
      };
      dispatch.thuocKeNgoaiLieuDung.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.thuocKeNgoaiLieuDung.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            thuocKeNgoaiLieuDungProvider
              .update(payload)
              .then((s) => {
                message.success(
                  "Cập nhật thành công dữ liệu liều dùng thuốc kê ngoài!"
                );

                let data = (state.thuocKeNgoaiLieuDung.listData || []).map(
                  (item) => {
                    if (item.id === s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  }
                );
                dispatch.thuocKeNgoaiLieuDung.updateData({
                  currentItem: null,
                  listData: data,
                  dataEditDefault: {
                    ...state.thuocKeNgoaiLieuDung.dataEditDefault,
                    payload,
                  },
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          } else {
            thuocKeNgoaiLieuDungProvider
              .create(payload)
              .then((s) => {
                message.success(
                  "Thêm mới thành công dữ liệu liều dùng thuốc kê ngoài!"
                );
                dispatch.thuocKeNgoaiLieuDung.updateData({ currentItem: null });
                dispatch.thuocKeNgoaiLieuDung.onSearch({
                  page: 0,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getAll: async ({ page = 0, size, active = true, ...payload }, state) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page === 0) {
        list = await cacheUtils.read(userId, `DATA_BAO_CAO`, [], false);
        dispatch.thuocKeNgoaiLieuDung.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        thuocKeNgoaiLieuDungProvider
          .search({
            page,
            size: size || 99999,
            sort: "ten,asc",
            active,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                dispatch.thuocKeNgoaiLieuDung.updateData({ listAllData: data });
                if (!size && page === 0)
                  cacheUtils.save(userId, `DATA_BAO_CAO`, data, false);
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
    getAllTongHop: async (
      { page = 0, size, active = true, ...payload },
      state
    ) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page === 0) {
        list = await cacheUtils.read(userId, `DATA_BAO_CAO`, [], false);
        dispatch.thuocKeNgoaiLieuDung.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        thuocKeNgoaiLieuDungProvider
          .searchTongHop({
            page,
            size: size || 99999,
            sort: "ten,asc",
            active,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                dispatch.thuocKeNgoaiLieuDung.updateData({ listAllData: data });
                if (!size && page === 0)
                  cacheUtils.save(userId, `DATA_BAO_CAO`, data, false);
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
    tongHop: async (id, state) => {
      return new Promise((resolve, reject) => {
        thuocKeNgoaiLieuDungProvider
          .tongHop()
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.thuocKeNgoaiLieuDung.updateData({
                listPhieu: data,
              });
              return resolve(s);
            } else {
              return reject(s);
              // message.error(
              // s?.message == "Network Error"
              //   ? "Đang cập nhật hệ thống"
              //   : s?.message || "Xảy ra lỗi, vui lòng thử lại sau";
              // );
            }
          })
          .catch((e) => {
            return reject(e);
          });
      });
    },
  }),
};
