import dmDoiTacProvider from "data-access/categories/dm-doi-tac-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "data-access/api-base";

export default {
  state: {
    listServicesPack: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataLichSuTongHop: [],
    listDataTongHop: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: dmDoiTacProvider.searchAll,
      KEY_CACHE: "DATA_ALL_DOI_TAC",
      model: "doiTac",
      fieldName: "DoiTac",
    }),
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: dmDoiTacProvider.searchAll,
      KEY_CACHE: "DATA_ALL_NHA_SAN_XUAT",
      model: "doiTac",
      fieldName: "NhaSanXuat",
    }),
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: dmDoiTacProvider.searchAll,
      KEY_CACHE: "DATA_ALL_NHA_CUNG_CAP",
      model: "doiTac",
      fieldName: "NhaCungCap",
    }),
    onSizeChange: ({ size }, state) => {
      dispatch.doiTac.updateData({
        size,
        page: 0,
      });
      dispatch.doiTac.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.doiTac.updateData(newState);
      let size = payload.size || state.doiTac.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.doiTac.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.doiTac.dataSearch || {};

      dmDoiTacProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.doiTac.updateData({
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
          dispatch.doiTac.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.doiTac.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.doiTac.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.doiTac.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.doiTac.dataSearch || {}),
        ...payload,
      };
      dispatch.doiTac.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.doiTac.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            dmDoiTacProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu đối tác!");

                let data = (state.doiTac.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.doiTac.updateData({
                  currentItem: s?.data || [],
                  listData: data,
                });
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          } else {
            dmDoiTacProvider
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu đối tác!");
                dispatch.doiTac.updateData({
                  currentItem: null,
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                dispatch.doiTac.onSearch({
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
    onDelete: async (payload, state) => {
      const {
        doiTac: { page, size },
      } = state;
      const response = await dmDoiTacProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.doiTac.getListServicesPack({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },

    getLichSuTongHop: ({ page = 0, ...payload }, state) => {
      let size = payload.size || 500;

      dmDoiTacProvider
        .getListLichSuTongHop({ page, size, ...payload })
        .then((s) => {
          dispatch.doiTac.updateData({
            dataLichSuTongHop: s?.data || [],
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.doiTac.updateData({
            dataLichSuTongHop: [],
          });
        });
    },

    getListTongHop: ({ page = 0, ...payload }, state) => {
      let size = payload.size || 500;

      dmDoiTacProvider
        .searchAll({ page, size, ...payload })
        .then((s) => {
          dispatch.doiTac.updateData({
            listDataTongHop: s?.data || [],
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.doiTac.updateData({
            listDataTongHop: [],
          });
        });
    },

    getListTongHopNhaSanXuat: ({ page = 0, ...payload }, state) => {
      let size = payload.size || 500;

      dmDoiTacProvider
        .searchAll({ page, size, dsLoaiDoiTac: [10], ...payload })
        .then((s) => {
          dispatch.doiTac.updateData({
            listTongHopNhaSanXuat: s?.data || [],
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.doiTac.updateData({
            listTongHopNhaSanXuat: [],
          });
        });
    },

    getListTongHopNhaCungCap: ({ page = 0, ...payload }, state) => {
      let size = payload.size || "";

      dmDoiTacProvider
        .searchAll({ page, size, dsLoaiDoiTac: [20], ...payload })
        .then((s) => {
          dispatch.doiTac.updateData({
            listTongHopNhaCungCap: s?.data || [],
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.doiTac.updateData({
            listTongHopNhaCungCap: [],
          });
        });
    },
  }),
};
