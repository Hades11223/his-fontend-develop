import { message } from "antd";
import dvMucDichProvider from "data-access/categories/dm-dv-muc-dich-provider";
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
    listMucDichSuDung: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: dvMucDichProvider.searchAll,
      KEY_CACHE: "DATA_ALL_DV_MUC_DICH",
      model: "mucDichSuDung",
      fieldName: "MucDichSuDung",
    }),
    onSizeChange: ({ size }, state) => {
      dispatch.mucDichSuDung.updateData({
        size,
        page: 0,
      });
      dispatch.mucDichSuDung.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.mucDichSuDung.updateData(newState);
      let size = payload.size || state.mucDichSuDung.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.mucDichSuDung.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.mucDichSuDung.dataSearch || {};

      dvMucDichProvider
        .search({ page, size, ...dataSearch, sort })
        .then((s) => {
          dispatch.mucDichSuDung.updateData({
            listMucDichSuDung: (s?.data || []).map((item, index) => {
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
          dispatch.mucDichSuDung.updateData({
            listMucDichSuDung: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.mucDichSuDung.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.mucDichSuDung.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.mucDichSuDung.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.mucDichSuDung.dataSearch || {}),
        ...payload,
      };
      dispatch.mucDichSuDung.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.mucDichSuDung.onSearch({
        page: 0,
        dataSearch,
      });
    },


    onDelete: async (payload, state) => {
      const {
        xuatXu: { page, size },
      } = state;
      const response = await dvMucDichProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.dvMucDichProvider.search({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            dvMucDichProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật dữ liệu thành công !");
                let data = (state.mucDichSuDung.listMucDichSuDung || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.mucDichSuDung.updateData({
                  listMucDichSuDung: data,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            dvMucDichProvider
              .post(payload)
              .then((s) => {
                dispatch.mucDichSuDung.updateData({
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                message.success("Thêm mới dữ liệu thành công!");
                dispatch.mucDichSuDung.onSearch({
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
