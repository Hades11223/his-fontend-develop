import cacheUtils from "utils/cache-utils";
import thietLapQuyenKyProvider from "data-access/kySo/thiet-lap-quyen-ky-provider.js";
import orderBy from "lodash/orderBy";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listThietLapQuyenKy: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    dataSortColumn: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.thietLapQuyenKy.updateData({
        size,
        page: 0,
      });
      dispatch.thietLapQuyenKy.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.thietLapQuyenKy.updateData(newState);
      let size = payload.size || state.thietLapQuyenKy.size || 10;
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.thietLapQuyenKy.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.thietLapQuyenKy.dataSearch || {};

      thietLapQuyenKyProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.thietLapQuyenKy.updateData({
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
          dispatch.thietLapQuyenKy.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.thietLapQuyenKy.dataSortColumn,
        ...payload,
      };
      dispatch.thietLapQuyenKy.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.thietLapQuyenKy.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.thietLapQuyenKy.dataSearch || {}),
        ...payload,
      };
      dispatch.thietLapQuyenKy.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.thietLapQuyenKy.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            thietLapQuyenKyProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu !");

                let data = (state.thietLapQuyenKy.listData || []).map(
                  (item) => {
                    if (item.id === s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  }
                );
                dispatch.thietLapQuyenKy.updateData({
                  currentItem: null,
                  listData: data,
                  dataEditDefault: s?.data,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          } else {
            thietLapQuyenKyProvider
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu!");
                dispatch.thietLapQuyenKy.updateData({ currentItem: null });
                dispatch.thietLapQuyenKy.onSearch({
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
        list = await cacheUtils.read(userId, `DATA_QUYEN_KY`, [], false);
        dispatch.thietLapQuyenKy.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        thietLapQuyenKyProvider
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
                dispatch.thietLapQuyenKy.updateData({ listAllData: data });
                if (!size && page === 0)
                  cacheUtils.save(userId, `DATA_QUYEN_KY`, data, false);
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
    delete: (id, state) => {
      return new Promise((resolve, reject) => {
        const {
          thietLapQuyenKy: { page, size },
        } = state;
        thietLapQuyenKyProvider
          .delete(id)
          .then((s) => {
            message.success("Xóa bản ghi thành công");
            if (s.code === 0) {
              dispatch.thietLapQuyenKy.onSizeChange({ page, size });
              dispatch.thietLapQuyenKy.updateData({
                currentItem: null,
              });
            }
            resolve();
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject();
          });
      });
    },
  }),
};
