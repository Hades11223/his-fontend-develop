import nbBienBanHoiChanProvider from "data-access/nb-bien-ban-hoi-chan-provider";
import nbBienBanHoiChanTuVanProvider from "data-access/nb-bien-ban-hoi-chan-tu-van-provider";

import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { t } from "i18next";
export default {
  state: {
    listDsBienBanHoiChan: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    dataSortColumn: {},
    listDsBienBanHoiChanTuVan: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.nbBienBanHoiChan.updateData({
        page: 0,
        ...rest,
      });
      dispatch.nbBienBanHoiChan.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.nbBienBanHoiChan.updateData(newState);
      let size = payload.size || state.nbBienBanHoiChan.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.nbBienBanHoiChan.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.nbBienBanHoiChan.dataSearch || {};

      nbBienBanHoiChanProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.nbBienBanHoiChan.updateData({
            listDsBienBanHoiChan: (s?.data || []).map((item, index) => {
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
          dispatch.nbBienBanHoiChan.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.nbBienBanHoiChan.dataSortColumn,
        ...payload,
      };
      dispatch.nbBienBanHoiChan.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nbBienBanHoiChan.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.nbBienBanHoiChan.dataSearch || {}),
        ...payload,
      };
      dispatch.nbBienBanHoiChan.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.nbBienBanHoiChan.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getById: (id, state) => {
      return new Promise((resolve, reject) => {
        nbBienBanHoiChanProvider
          .getById(id)
          .then((s) => {
            dispatch.nbBienBanHoiChan.updateData({ nbBienBanHoiChan: s.data });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            nbBienBanHoiChanProvider
              .put(payload)
              .then((s) => {
                message.success(t("common.capNhatThanhCong"));
                dispatch.nbBienBanHoiChan.onSearch({
                  page: 0,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(
                  e?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                );
                reject();
              });
          } else {
            nbBienBanHoiChanProvider
              .post(payload)
              .then((s) => {
                message.success(t("common.themMoiThanhCongDuLieu"));
                dispatch.nbBienBanHoiChan.onSearch({
                  page: 0,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(
                  e?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                );
                reject();
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    onDelete: (id) => {
      return new Promise((resolve, reject) => {
        nbBienBanHoiChanProvider
          .delete(id)
          .then((s) => {
            resolve(s);
            message.success(t("common.xoaDuLieuThanhCong"));
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    macDinh: ({ ...payload }) => {
      return new Promise((resolve, reject) => {
        nbBienBanHoiChanProvider
          .macDinh({ payload })
          .then((s) => {
            dispatch.nbBienBanHoiChan.updateData({
              nbBienBanHoiChanMacDinh: s.data,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    getPhieu: ({ id, ...payload }) => {
      return new Promise((resolve, reject) => {
        nbBienBanHoiChanProvider
          .getPhieu({ id, ...payload })
          .then((s) => {
            if (s.code === 0) {
              resolve(s.data);
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    tuVanDichVu: (payload) => {
      return new Promise((resolve, reject) => {
        nbBienBanHoiChanTuVanProvider
          .batch(payload)
          .then((s) => {
            resolve(s);
            message.success(t("common.themMoiThanhCongDuLieu"));
          })
          .catch((e) => {
            message.error(e?.message);
            reject(e);
          });
      });
    },
    getBienBanHoiChanTuVan: ({ ...payload }) => {
      nbBienBanHoiChanTuVanProvider
        .search(payload)
        .then((s) => {
          dispatch.nbBienBanHoiChan.updateData({
            listDsBienBanHoiChanTuVan: s?.data,
          });
        })
        .catch((e) => {
          dispatch.nbBienBanHoiChan.updateData({
            listDsBienBanHoiChanTuVan: []
          });
        });
    },
    onDeleteTuVan: (id) => {
      return new Promise((resolve, reject) => {
        nbBienBanHoiChanTuVanProvider
          .delete(id)
          .then((s) => {
            resolve(s);
            message.success(t("common.xoaDuLieuThanhCong"));
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
  }),
};
