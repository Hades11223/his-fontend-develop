import { message } from "antd";
import taiKhoanProvider from "data-access/dm-tai-khoan-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "data-access/api-base";

export default {
  state: {
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listAccount: [],
    // dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
    dataSortColumn: { active: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: taiKhoanProvider.searchAll,
      KEY_CACHE: "DATA_ALL_TAI_KHOAN_HE_THONG",
      model: "adminTaiKhoanHeThong",
      fieldName: "TaiKhoanHeThong",
    }),
    onSizeChange: (size, state) => {
      dispatch.adminTaiKhoanHeThong.updateData({
        size,
        page: 0,
      });
      dispatch.adminTaiKhoanHeThong.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, noSize, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.adminTaiKhoanHeThong.updateData(newState);
      let size = payload.size;
      if (size === null || size === undefined)
        size = state.adminTaiKhoanHeThong.size || 10;
      const sort = combineSort(
        payload.dataSortColumn ||
          state.adminTaiKhoanHeThong.dataSortColumn ||
          {}
      );
      const dataSearch =
        payload.dataSearch || state.adminTaiKhoanHeThong.dataSearch || {};
      if (noSize) {
        size = null;
      }
      taiKhoanProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.adminTaiKhoanHeThong.updateData({
            listAccount: (s?.data || []).map((item, index) => {
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
          dispatch.adminTaiKhoanHeThong.updateData({
            listAccount: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.adminTaiKhoanHeThong.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.adminTaiKhoanHeThong.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.adminTaiKhoanHeThong.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.adminTaiKhoanHeThong.dataSearch || {}),
        ...payload,
      };
      dispatch.adminTaiKhoanHeThong.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.adminTaiKhoanHeThong.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            taiKhoanProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu!");
                dispatch.adminTaiKhoanHeThong.onSearch({
                  page: 0,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          } else {
            taiKhoanProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu!");
                dispatch.adminTaiKhoanHeThong.updateData({
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                dispatch.adminTaiKhoanHeThong.onSearch({
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
    resetMatKhau: ({ id }) => {
      return new Promise((resolve, reject) => {
        taiKhoanProvider
          .resetMatKhau({ id })
          .then((s) => {
            message.success("Bạn đã reset mật khẩu thành công");
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject();
          });
      });
    },
  }),
};
