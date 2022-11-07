import maMayProvider from "data-access/categories/dm-ma-may-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/index";
import cacheUtils from "utils/cache-utils";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: maMayProvider,
    storeName: "maMay",
    title: "mã máy",
    initState: {
      listData: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      dataSortColumn: SORT_DEFAULT,
      listDataTongHop: [],
    },
    customEffect: ({ dispatch }) => ({
      getData: ({ page = 0, size = 10, ...payload }, state) => {
        dispatch.maMay.updateData({
          page: 0,
          size,
        });
        dispatch.maMay.onSearch({
          page: 0,
          size,
        });
      },

      onSizeChange: ({ size }, state) => {
        dispatch.maMay.updateData({
          size,
          page: 0,
        });
        dispatch.maMay.onSearch({
          page: 0,
          size,
        });
      },

      onSearch: ({ page = 0, ...payload }, state) => {
        let newState = { isLoading: true, page };
        dispatch.maMay.updateData(newState);
        let size = payload.size || state.maMay.size || 10;
        const sort = combineSort(
          payload.dataSortColumn || state.maMay.dataSortColumn || {}
        );
        const dataSearch = payload.dataSearch || state.maMay.dataSearch || {};
        maMayProvider
          .search({
            page,
            size,
            sort,
            ...dataSearch,
          })
          .then((s) => {
            dispatch.maMay.updateData({
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
            dispatch.maMay.updateData({
              listData: [],
              isLoading: false,
            });
          });
      },

      onSortChange: ({ ...payload }, state) => {
        const dataSortColumn = {
          ...payload,
        };
        delete dataSortColumn.createdAt;
        dispatch.maMay.updateData({
          page: 0,
          dataSortColumn,
        });
        dispatch.maMay.onSearch({
          page: 0,
          dataSortColumn,
        });
      },

      onChangeInputSearch: ({ ...payload }, state) => {
        const dataSearch = {
          ...(state.maMay.dataSearch || {}),
          ...payload,
        };
        dispatch.maMay.updateData({
          page: 0,
          dataSearch,
        });
        dispatch.maMay.onSearch({
          page: 0,
          dataSearch,
        });
      },
      getDataTongHop: ({ page = 0, size = 10, ...payload }, state) => {
        maMayProvider
          .searchTongHop({
            page: 0,
            size,
          })
          .then((s) => {
            dispatch.maMay.updateData({
              listDataTongHop: s?.data,
            });
          });
      },
      createOrEdit: ({ ...payload }, state) => {
        const {
          maMay: { dataSortColumn },
        } = state;
        return new Promise((resolve, reject) => {
          try {
            if (payload.id) {
              maMayProvider
                .update(payload)
                .then((s) => {
                  message.success("Cập nhật thành công dữ liệu mã máy!");

                  let data = (state.maMay.listData || []).map((item) => {
                    if (item.id === s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  });
                  dispatch.maMay.updateData({
                    currentItem: null,
                    listData: data.sort((a, b) => b.active - a.active),
                    dataSortColumn,
                  });
                  resolve(s.data);
                })
                .catch((e) => {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
                  reject(e);
                });
            } else {
              maMayProvider
                .create(payload)
                .then((s) => {
                  message.success("Thêm mới thành công dữ liệu mã máy!");
                  dispatch.maMay.updateData({
                    currentItem: null,
                    dataSortColumn: SORT_DEFAULT,
                  });
                  dispatch.maMay.onSearch({
                    page: 0,
                    dataSortColumn: SORT_DEFAULT,
                  });
                  resolve(s?.data);
                })
                .catch((e) => {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
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
        if (!size && page === 0) {
          list = await cacheUtils.read(userId, `DATA_MA_MAY`, [], false);
          dispatch.maMay.updateData({ listAllData: list });
        }
        return new Promise((resolve, reject) => {
          maMayProvider
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
                  dispatch.maMay.updateData({ listAllData: data });
                  if (!size && page === 0)
                    cacheUtils.save(userId, `DATA_MA_MAY`, data, false);
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
  }),
};
