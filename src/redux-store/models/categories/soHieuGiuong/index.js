import { message } from "antd";
import soHieuGiuongProvider from "data-access/categories/dm-so-hieu-giuong-provider";
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
    listSoHieuGiuong: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: soHieuGiuongProvider.search,
      KEY_CACHE: "DATA_ALL_SO_HIEU_GIUONG",
      model: "soHieuGiuong",
      fieldName: "SoHieuGiuong",
    }),
    onSizeChange: ({ size }, state) => {
      dispatch.soHieuGiuong.updateData({
        size,
        page: 0,
      });
      dispatch.soHieuGiuong.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.soHieuGiuong.updateData(newState);
      let size = payload.size || state.soHieuGiuong.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.soHieuGiuong.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.soHieuGiuong.dataSearch || {};

      soHieuGiuongProvider
        .search({ page, size, ...dataSearch, sort })
        .then((s) => {
          dispatch.soHieuGiuong.updateData({
            listSoHieuGiuong: (s?.data || []).map((item, index) => {
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
          dispatch.soHieuGiuong.updateData({
            listSoHieuGiuong: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.soHieuGiuong.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.soHieuGiuong.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.soHieuGiuong.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.soHieuGiuong.dataSearch || {}),
        ...payload,
      };
      dispatch.soHieuGiuong.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.soHieuGiuong.onSearch({
        page: 0,
        dataSearch,
      });
    },

    getById: (id) => {
      soHieuGiuongProvider
        .get(id)
        .then((s) => {
          dispatch.soHieuGiuong.updateData({
            currentKiosk: s?.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.soHieuGiuong.updateData({
            currentKiosk: {},
          });
        });
    },

    onDelete: async (payload, state) => {
      const {
        xuatXu: { page, size },
      } = state;
      const response = await soHieuGiuongProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.soHieuGiuongProvider.search({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            soHieuGiuongProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật dữ liệu thành công !");
                let data = (state.soHieuGiuong.listSoHieuGiuong || []).map(
                  (item) => {
                    if (item.id === s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  }
                );
                dispatch.soHieuGiuong.updateData({
                  listSoHieuGiuong: data,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            soHieuGiuongProvider
              .post(payload)
              .then((s) => {
                dispatch.soHieuGiuong.updateData({
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                message.success("Thêm mới dữ liệu thành công!");
                dispatch.soHieuGiuong.onSearch({
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
