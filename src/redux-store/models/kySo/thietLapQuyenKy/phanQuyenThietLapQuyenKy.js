import cacheUtils from "utils/cache-utils";
import phanQuyenThietLapQuyenKyProvider from "data-access/kySo/thiet-lap-quyen-ky-provider.js";
import orderBy from "lodash/orderBy";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listPhanQuyenThietLapQuyenKy: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.phanQuyenThietLapQuyenKy.updateData({
        size,
        page: 0,
      });
      dispatch.phanQuyenThietLapQuyenKy.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.phanQuyenThietLapQuyenKy.updateData(newState);
      let size = payload.size || state.phanQuyenThietLapQuyenKy.size || 10;
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn ||
          state.phanQuyenThietLapQuyenKy.dataSortColumn ||
          {}
      );
      const dataSearch =
        payload.dataSearch || state.phanQuyenThietLapQuyenKy.dataSearch || {};

      phanQuyenThietLapQuyenKyProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.phanQuyenThietLapQuyenKy.updateData({
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
          dispatch.phanQuyenThietLapQuyenKy.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.phanQuyenThietLapQuyenKy.dataSortColumn,
        ...payload,
      };
      dispatch.phanQuyenThietLapQuyenKy.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.phanQuyenThietLapQuyenKy.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.phanQuyenThietLapQuyenKy.dataSearch || {}),
        ...payload,
      };
      dispatch.phanQuyenThietLapQuyenKy.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.phanQuyenThietLapQuyenKy.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            phanQuyenThietLapQuyenKyProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu báo cáo!");

                let data = (state.phanQuyenThietLapQuyenKy.listData || []).map(
                  (item) => {
                    if (item.id === s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  }
                );
                dispatch.phanQuyenThietLapQuyenKy.updateData({
                  currentItem: null,
                  listData: data,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          } else {
            phanQuyenThietLapQuyenKyProvider
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu báo cáo!");
                dispatch.phanQuyenThietLapQuyenKy.updateData({
                  currentItem: null,
                });
                dispatch.phanQuyenThietLapQuyenKy.onSearch({
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
        dispatch.phanQuyenThietLapQuyenKy.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        phanQuyenThietLapQuyenKyProvider
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
                dispatch.phanQuyenThietLapQuyenKy.updateData({
                  listAllData: data,
                });
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
    delete: (id) => {
      return new Promise((resolve, reject) => {
        phanQuyenThietLapQuyenKyProvider
          .delete(id)
          .then((s) => {
            console.log("s: ", s);
            message.success("Xóa bản ghi thành công");
            dispatch.phanQuyenThietLapQuyenKy.updateData({
              currentItem: null,
              listData: s.data,
            });
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
