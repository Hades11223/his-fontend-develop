import dichVuKhoLieuDungProvider from "data-access/categories/dm-dich-vu-kho-lieu-dung-provider.js";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},
    dataSortColumn: { active: true },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.lieuDungThuoc.updateData({
        size,
        page: 0,
      });
      dispatch.lieuDungThuoc.onSearch({ page: 0, size });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.lieuDungThuoc.updateData(newState);
      let size = payload.size || state.lieuDungThuoc.size || 10;
      // let page = state.lieuDungThuoc.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.lieuDungThuoc.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.lieuDungThuoc.dataSearch || {};
      const danhMucThuoc = state.danhMucThuoc.currentItem || {};

      dichVuKhoLieuDungProvider
        .search({
          page,
          size,
          lieuDungBacSi: false,
          sort,
          ...dataSearch,
          dichVuId: danhMucThuoc?.id,
        })
        .then((s) => {
          dispatch.lieuDungThuoc.updateData({
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
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
          dispatch.lieuDungThuoc.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...payload,
        ...state.lieuDungThuoc.dataSortColumn,
        ...payload,
      };
      dispatch.lieuDungThuoc.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.lieuDungThuoc.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.lieuDungThuoc.dataSearch || {}),
        ...payload,
      };
      dispatch.lieuDungThuoc.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.lieuDungThuoc.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            dichVuKhoLieuDungProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu liều dùng!");

                let data = (state.lieuDungThuoc.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.lieuDungThuoc.updateData({
                  currentItem: null,
                  listData: data,
                });
                resolve(s.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            dichVuKhoLieuDungProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu liều dùng!");
                dispatch.lieuDungThuoc.updateData({ currentItem: null });
                dispatch.lieuDungThuoc.onSearch({
                  page: 0,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
                reject(e);
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },

    create: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dichVuKhoLieuDungProvider
          .post(payload)
          .then((s) => {
            message.success("Thêm mới thành công dữ liệu liều dùng!");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
