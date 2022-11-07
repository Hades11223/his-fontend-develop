import { message } from "antd";
import nhanVienKhoProvider from "data-access/kho/nhan-vien-kho-provider";
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
      dispatch.nhanVienKho.updateData({
        size,
        page: 0,
      });
      dispatch.nhanVienKho.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, nhanVienId, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.nhanVienKho.updateData(newState);
      let size = payload.size || state.nhanVienKho.size || 10;
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.nhanVienKho.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.nhanVienKho.dataSearch || {};
      const khoId = payload.khoId || "";
      nhanVienKhoProvider
        .search({ page, size, sort, nhanVienId, khoId, ...dataSearch })
        .then((s) => {
          dispatch.nhanVienKho.updateData({
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
          dispatch.nhanVienKho.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.nhanVienKho.dataSortColumn,
        ...payload,
      };
      dispatch.nhanVienKho.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nhanVienKho.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.nhanVienKho.dataSearch || {}),
        ...payload,
      };
      dispatch.nhanVienKho.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.nhanVienKho.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            nhanVienKhoProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu báo cáo!");

                let data = (state.nhanVienKho.listData || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.nhanVienKho.updateData({
                  currentItem: null,
                  listData: data,
                  dataEditDefault: {
                    ...state.nhanVienKho.dataEditDefault,
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
            nhanVienKhoProvider
              .create(payload)
              .then((s) => {
                message.success(
                  "Thêm mới thành công dữ liệu nhân viên quản trị kho!"
                );
                // dispatch.nhanVienKho.updateData({ currentItem: null });
                dispatch.nhanVienKho.onSearch({
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
    createMultiple: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nhanVienKhoProvider
            .createMultiple(payload)
            .then((s) => {
              message.success(
                "Thêm mới thành công dữ liệu nhân viên quản trị kho!"
              );
              // dispatch.nhanVienKho.updateData({ currentItem: null });
              dispatch.nhanVienKho.onSearch({
                page: 0,
                khoId: payload[0]?.khoId,
              });
              resolve();
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject();
            });
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
        dispatch.nhanVienKho.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        nhanVienKhoProvider
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
                dispatch.nhanVienKho.updateData({ listAllData: data });
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
        dispatch.nhanVienKho.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        nhanVienKhoProvider
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
                dispatch.nhanVienKho.updateData({ listAllData: data });
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
        nhanVienKhoProvider
          .tongHop()
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.nhanVienKho.updateData({
                listPhieu: data,
              });
              return resolve(s);
            } else {
              return reject(s);
              // message.error(
              //   s?.message == "Network Error"
              //     ? "Đang cập nhật hệ thống"
              //     : s?.message || "Xảy ra lỗi, vui lòng thử lại sau"
              // );
            }
          })
          .catch((e) => {
            return reject(e);
          });
      });
    },
    deleteNhanVienKho: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        try {
          nhanVienKhoProvider
            .delete({ id })
            .then((s) => {
              message.success("Xóa nhân viên quản lý kho thành công!");
              // dispatch.nhanVienKho.updateData({ currentItem: null });
              dispatch.nhanVienKho.onSearch({
                page: 0,
              });
              resolve();
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject();
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
  }),
};
