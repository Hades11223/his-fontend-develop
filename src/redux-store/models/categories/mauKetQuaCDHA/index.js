import mauKetQuaCDHAProvider from "data-access/categories/mau-ket-qua-cdha-tdcn-pt-tt-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/index";
import cacheUtils from "utils/cache-utils";
import apiBase from "../../../../data-access/api-base";
export default {
  state: {
    listAllMauKetQuaCDHA: [],
    listMauKetQuaCDHA: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: SORT_DEFAULT,
    currentData: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: mauKetQuaCDHAProvider.searchAll,
      KEY_CACHE: "DATA_ALL_MAU_KET_QUA_CDHA",
      model: "mauKetQuaCDHA",
      fieldName: "MauKetQuaCDHA",
    }),
    onSizeChange: ({ size }, state) => {
      dispatch.mauKetQuaCDHA.updateData({
        size,
        page: 0,
      });
      dispatch.mauKetQuaCDHA.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.mauKetQuaCDHA.updateData(newState);
      let size = payload.size || state.mauKetQuaCDHA.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.mauKetQuaCDHA.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.mauKetQuaCDHA.dataSearch || {};
      mauKetQuaCDHAProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.mauKetQuaCDHA.updateData({
            listMauKetQuaCDHA: (s?.data || []).map((item, index) => {
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
          dispatch.mauKetQuaCDHA.updateData({
            listMauKetQuaCDHA: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.mauKetQuaCDHA.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.mauKetQuaCDHA.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.mauKetQuaCDHA.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.mauKetQuaCDHA.dataSearch || {}),
        ...payload,
      };
      dispatch.mauKetQuaCDHA.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.mauKetQuaCDHA.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: ({ ...payload }, state) => {
      const {
        mauKetQuaCDHA: { dataSortColumn },
      } = state;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            mauKetQuaCDHAProvider
              .put(payload)
              .then((s) => {
                message.success(
                  "Cập nhật thành công dữ liệu mẫu kết quả xét nghiệm!"
                );

                let data = (state.mauKetQuaCDHA.listMauKetQuaCDHA || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.mauKetQuaCDHA.updateData({
                  currentItem: null,
                  listMauKetQuaCDHA: data.sort((a, b) => b.active - a.active),
                  dataSortColumn,
                });
                resolve(s.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            mauKetQuaCDHAProvider
              .post(payload)
              .then((s) => {
                message.success(
                  "Thêm mới thành công dữ liệu mẫu kết quả chẩn hình ảnh!"
                );
                dispatch.mauKetQuaCDHA.updateData({
                  currentItem: null,
                  dataSortColumn: { createdAt: 2 },
                });
                dispatch.mauKetQuaCDHA.onSearch({
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
    getById: (id) => {
      mauKetQuaCDHAProvider.getById(id).then((s) => {
        dispatch.mauKetQuaCDHA.updateData({
          currentData: s?.data,
        });
      });
    },
  }),
};
