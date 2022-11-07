import cacheUtils from "utils/cache-utils";
import quyenKyProvider from "data-access/categories/dm-quyen-ky-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "data-access/api-base";


export default {
  state: {
    listAllQuyenKy: [],
    listQuyenKy: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: quyenKyProvider.searchAll,
      KEY_CACHE: "DATA_ALL_QUYEN_KY",
      model: "quyenKy",
      fieldName: "QuyenKy",
    }),

    onSizeChange: ({ size }, state) => {
      dispatch.quyenKy.updateData({
        size,
        page: 0,
      });
      dispatch.quyenKy.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.quyenKy.updateData(newState);
      let size = payload.size || state.quyenKy.size || 10;
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.quyenKy.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.quyenKy.dataSearch || {};

      quyenKyProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.quyenKy.updateData({
            listQuyenKy: (s?.data || []).map((item, index) => {
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
          dispatch.quyenKy.updateData({
            listQuyenKy: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.quyenKy.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.quyenKy.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.quyenKy.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.quyenKy.dataSearch || {}),
        ...payload,
      };
      dispatch.quyenKy.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.quyenKy.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            quyenKyProvider
              .patch(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu báo cáo!");

                let data = (state.quyenKy.listQuyenKy || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.quyenKy.updateData({
                  currentItem: null,
                  listQuyenKy: data,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          } else {
            quyenKyProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu báo cáo!");
                dispatch.quyenKy.updateData({
                  currentItem: null,
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                dispatch.quyenKy.onSearch({
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
    delete: (id) => {
      return new Promise((resolve, reject) => {
        quyenKyProvider
          .delete(id)
          .then((s) => {
            console.log("s: ", s);
            message.success("Xóa bản ghi thành công");
            dispatch.quyenKy.updateData({
              currentItem: null,
              listQuyenKy: s.data,
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
