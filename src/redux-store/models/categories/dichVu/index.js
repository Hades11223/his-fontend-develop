import dichVuProvider from "data-access/categories/dm-dich-vu-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "data-access/api-base";

export default {
  state: {
    listDichVu: [],
    listAllDichVu: [],
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
      api: dichVuProvider.searchAll,
      KEY_CACHE: "DATA_ALL_DICH_VU",
      model: "dichVu",
      fieldName: "DichVu",
    }),
    getAllDichVu: async ({ dsLoaiDichVu = [], ...payload }, state) => {
      let userId = state.auth.auth?.id;
      let list = await cacheUtils.read(
        userId + dsLoaiDichVu,
        `DATA_ALL_DICH_VU`,
        [],
        false
      );
      dispatch.dichVu.updateData({ listAllDichVu: list });
      return new Promise((resolve, reject) => {
        dichVuProvider
          .searchAll({
            dsLoaiDichVu: dsLoaiDichVu.length ? dsLoaiDichVu : "",
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
                dispatch.dichVu.updateData({ listAllDichVu: data, totalElements: s?.totalElements || 0 });
                cacheUtils.save(
                  userId + dsLoaiDichVu,
                  `DATA_ALL_DICH_VU`,
                  data,
                  false
                );
              } else {
                dispatch.dichVu.updateData({ totalElements: s?.totalElements || 0 });
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
    onSizeChange: (
      { size, ...rest },
      state
    ) => {
      dispatch.dichVu.updateData({
        size,
        page: 0,
        ...rest,
      });
      dispatch.dichVu.onSearch({ page: 0, size, ...rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dichVu.updateData(newState);
      let size = payload.size || state.dichVu.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.dichVu.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.dichVu.dataSearch || {};
      dichVuProvider
        .searchAll({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.dichVu.updateData({
            listAllDichVu: (s?.data || []).map((item, index) => {
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
          dispatch.dichVu.updateData({
            listDichVu: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dichVu.dataSortColumn,
        ...payload,
      };
      dispatch.dichVu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dichVu.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dichVu.dataSearch || {}),
        ...payload,
      };
      dispatch.dichVu.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dichVu.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            dichVuProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");

                let data = (state.dichVu.listDichVu || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.dichVu.updateData({
                  currentItem: null,
                  listDichVu: data,
                });
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          } else {
            dichVuProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu dịch vụ!");
                dispatch.dichVu.updateData({ currentItem: null });
                dispatch.dichVu.onSearch({
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
  }),
};
