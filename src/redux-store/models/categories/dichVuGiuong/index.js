import { message } from "antd";
import dichVuGiuongProvider from "data-access/categories/dm-dich-vu-giuong-provider";
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
    listDichVuGiuong: [],
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
      api: dichVuGiuongProvider.searchAll,
      KEY_CACHE: "DATA_ALL_DICH_VU_GIUONG",
      model: "dichVuGiuong",
      fieldName: "DichVuGiuong",
    }),
    onSizeChange: ({ size }, state) => {
      dispatch.dichVuGiuong.updateData({
        size,
        page: 0,
      });
      dispatch.dichVuGiuong.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dichVuGiuong.updateData(newState);
      let size = payload.size || state.dichVuGiuong.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.dichVuGiuong.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.dichVuGiuong.dataSearch || {};

      dichVuGiuongProvider
        .search({ page, size, ...dataSearch, sort })
        .then((s) => {
          dispatch.dichVuGiuong.updateData({
            listDichVuGiuong: (s?.data || []).map((item, index) => {
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
          dispatch.dichVuGiuong.updateData({
            listDichVuGiuong: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dichVuGiuong.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.dichVuGiuong.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dichVuGiuong.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dichVuGiuong.dataSearch || {}),
        ...payload,
      };
      dispatch.dichVuGiuong.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dichVuGiuong.onSearch({
        page: 0,
        dataSearch,
      });
    },

    getById: (id) => {
      dichVuGiuongProvider
        .get(id)
        .then((s) => {
          dispatch.dichVuGiuong.updateData({
            currentKiosk: s?.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.dichVuGiuong.updateData({
            currentKiosk: {},
          });
        });
    },

    onDelete: async (payload, state) => {
      const {
        xuatXu: { page, size },
      } = state;
      const response = await dichVuGiuongProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.dichVuGiuongProvider.search({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            dichVuGiuongProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật dữ liệu thành công !");
                let data = (state.dichVuGiuong.listDichVuGiuong || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.dichVuGiuong.updateData({
                  listDichVuGiuong: data,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            dichVuGiuongProvider
              .post(payload)
              .then((s) => {
                dispatch.dichVuGiuong.updateData({
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                message.success("Thêm mới dữ liệu thành công!");
                dispatch.dichVuGiuong.onSearch({
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
  }),
};
