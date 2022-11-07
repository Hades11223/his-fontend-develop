import mauKetQuaXNProvider from "data-access/categories/mau-ket-qua-xn-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/index";
import cacheUtils from "utils/cache-utils";
export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: SORT_DEFAULT,
    listDataTongHop: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getData: ({ page = 0, size = 10, ...payload }, state) => {
      dispatch.mauKetQuaXN.updateData({
        page: 0,
        size,
      });
      dispatch.mauKetQuaXN.onSearch({
        page: 0,
        size,
      });
    },

    onSizeChange: ({ size }, state) => {
      dispatch.mauKetQuaXN.updateData({
        size,
        page: 0,
      });
      dispatch.mauKetQuaXN.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.mauKetQuaXN.updateData(newState);
      let size = payload.size || state.mauKetQuaXN.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.mauKetQuaXN.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.mauKetQuaXN.dataSearch || {};
      mauKetQuaXNProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.mauKetQuaXN.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.mauKetQuaXN.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.mauKetQuaXN.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.mauKetQuaXN.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.mauKetQuaXN.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.mauKetQuaXN.dataSearch || {}),
        ...payload,
      };
      dispatch.mauKetQuaXN.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.mauKetQuaXN.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: ({ ...payload }, state) => {
      const {
        mauKetQuaXN: { dataSortColumn },
      } = state;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            mauKetQuaXNProvider
              .update(payload)
              .then((s) => {
                message.success(
                  "Cập nhật thành công dữ liệu mẫu kết quả xét nghiệm!"
                );

                let data = (state.mauKetQuaXN.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.mauKetQuaXN.updateData({
                  currentItem: null,
                  listData: data.sort((a, b) => b.active - a.active),
                  dataSortColumn,
                });
                resolve(s.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            mauKetQuaXNProvider
              .create(payload)
              .then((s) => {
                message.success(
                  "Thêm mới thành công dữ liệu mẫu kết quả xét nghiệm!"
                );
                dispatch.mauKetQuaXN.updateData({
                  currentItem: null,
                  dataSortColumn: { createdAt: 2 },
                });
                dispatch.mauKetQuaXN.onSearch({
                  page: 0,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
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
      if (!size && page == 0) {
        list = await cacheUtils.read(userId, `DATA_MAU_KET_QUA_XN`, [], false);
        dispatch.mauKetQuaXN.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        mauKetQuaXNProvider
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
                dispatch.mauKetQuaXN.updateData({ listAllData: data });
                if (!size && page == 0)
                  cacheUtils.save(userId, `DATA_MAU_KET_QUA_XN`, data, false);
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
    getDataTongHop: ({ page = 0, size = 10, ...payload }, state) => {
      mauKetQuaXNProvider
        .searchTongHop({
          page: 0,
          size,
        })
        .then((s) => {
          dispatch.mauKetQuaXN.updateData({
            listDataTongHop: s?.data,
          });
        });
    },
  }),
};
