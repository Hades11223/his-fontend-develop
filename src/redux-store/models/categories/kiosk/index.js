import { message } from "antd";
import kioskProvider from "data-access/categories/dm-kiosk-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "data-access/api-base";

export default {
  state: {
    listAllKiosk: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listKiosk: [],
    dataSortColumn: { active: 2, mac: 2 },
    currentKiosk: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: kioskProvider.searchAll,
      model: "kiosk",
      fieldName: "Kiosk",
      KEY_CACHE: "DATA_ALL_KIOSK",
      getKeyCache: (key, payload) => {
        return key + payload.quayTiepDonId + payload.loaiQms;
      },
    }),
    onSizeChange: ({ size }, state) => {
      dispatch.kiosk.updateData({
        size,
        page: 0,
      });
      dispatch.kiosk.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.kiosk.updateData(newState);
      let size = payload.size || state.kiosk.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.kiosk.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.kiosk.dataSearch || {};

      kioskProvider
        .search({ page, size, ...dataSearch, sort })
        .then((s) => {
          dispatch.kiosk.updateData({
            listKiosk: (s?.data || []).map((item, index) => {
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
          dispatch.kiosk.updateData({
            listKiosk: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.kiosk.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.kiosk.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.kiosk.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.kiosk.dataSearch || {}),
        ...payload,
      };
      dispatch.kiosk.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.kiosk.onSearch({
        page: 0,
        dataSearch,
      });
    },

    getById: (id) => {
      return new Promise((resolve, reject) => {
        kioskProvider
          .getById(id)
          .then((s) => {
            dispatch.kiosk.updateData({
              currentKiosk: s?.data,
            });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.kiosk.updateData({
              currentKiosk: {},
            });
          });
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            kioskProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu thiết lập chung!");
                let data = (state.thietLap.listKiosk || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.kiosk.updateData({
                  listKiosk: data,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            kioskProvider
              .post(payload)
              .then((s) => {
                dispatch.kiosk.updateData({
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                message.success("Thêm mới thành công dữ liệu thiết lập chung!");
                dispatch.kiosk.onSearch({
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
    postVideo: (file) => {
      return new Promise((resolve, reject) => {
        kioskProvider
          .postVideo(file)
          .then((s) => {
            message.success("Upload video thành công");
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
