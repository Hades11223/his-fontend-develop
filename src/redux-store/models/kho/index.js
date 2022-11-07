import cacheUtils from "utils/cache-utils";
import khoProvider from "data-access/categories/dm-kho-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "data-access/api-base";

export default {
  state: {
    listKho: [],
    listKhoUser: [],
    listKhoCha: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: khoProvider.searchAll,
      KEY_CACHE: "DATA_ALL_KHO",
      model: "kho",
      fieldName: "Kho",
    }),
    getAllTongHop: async (
      { page = 0, size, active = true, ...payload },
      state
    ) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page == 0) {
        list = await cacheUtils.read(userId, `DATA_ALL_KHO`, [], false);
        dispatch.kho.updateData({ listAllKho: list });
      }
      return new Promise((resolve, reject) => {
        khoProvider
          .searchAll({
            page,
            size: size,
            sort: "ten,asc",
            active,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              if (JSON.stringify(s?.data) !== JSON.stringify(list)) {
                dispatch.kho.updateData({ listAllKho: s?.data });
                if (!size && page == 0)
                  cacheUtils.save(userId, `DATA_ALL_KHO`, s?.data, false);
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
    onSizeChange: ({ size }, state) => {
      dispatch.kho.updateData({
        size,
        page: 0,
      });
      dispatch.kho.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.kho.updateData(newState);
      let size = payload.size || state.kho.size || 10;
      // let page = state.kho.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.kho.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.kho.dataSearch || {};

      khoProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.kho.updateData({
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
          dispatch.kho.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.kho.dataSortColumn,
        ...payload,
      };
      dispatch.kho.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.kho.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.kho.dataSearch || {}),
        ...payload,
      };
      dispatch.kho.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.kho.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getTheoTaiKhoan: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { ignoreSetState = false, nhaThuoc, ...rest } = payload;
        khoProvider
          .searchTheoTaiKhoan({ nhaThuoc, ...rest })
          .then((s) => {
            if (s?.code === 0) {
              if (!ignoreSetState)
                dispatch.kho.updateData({ listKhoUser: s?.data });
              resolve(s?.data);
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
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            khoProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu kho!");

                let data = (state.kho.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.kho.updateData({
                  currentItem: null,
                  listData: data,
                });
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          } else {
            khoProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu kho!");
                dispatch.kho.updateData({ currentItem: null });
                dispatch.kho.onSearch({
                  page: 0,
                });
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },

    searchById: (id, state) => {
      return new Promise((resolve, reject) => {
        khoProvider
          .getById(id)
          .then((s) => {
            dispatch.kho.updateData({ currentItem: s?.data });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message.toString());
            reject(e);
          });
      });
    },

    getListKhoCha: (payload, state) => {
      if (!payload.khoTrucThuocId) {
        console.error("Vui lòng truyền khoTrucThuocId");
        return;
      }
      return new Promise((resolve, reject) => {
        khoProvider
          .searchAll({
            page: 0,
            size: 2000,
            active: true,
            ...payload,
          })
          .then((s) => {
            dispatch.kho.updateData({ listKhoCha: s?.data });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message.toString());
            reject(e);
          });
      });
    },
  }),
};
