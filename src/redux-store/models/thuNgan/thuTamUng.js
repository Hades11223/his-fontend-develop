import nbTamUngProvider from "data-access/nb-tam-ung-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { t } from "i18next";
export default {
  state: {
    listDsThuTamUng: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.thuTamUng.updateData({
        page: 0,
        ...rest,
      });
      dispatch.thuTamUng.onSearch({ rest });
    },
    onSearch: ({ page = 0, nbThongTinId, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.thuTamUng.updateData(newState);
      let size = payload.size || state.thuTamUng.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.thuTamUng.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.thuTamUng.dataSearch || {};

      nbTamUngProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
          nbThongTinId,
        })
        .then((s) => {
          dispatch.thuTamUng.updateData({
            listDsThuTamUng: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          dispatch.thuTamUng.updateData({
            listDsThuTamUng: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.thuTamUng.dataSortColumn,
        ...payload,
      };
      dispatch.thuTamUng.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.thuTamUng.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.thuTamUng.dataSearch || {}),
        ...payload,
      };
      dispatch.thuTamUng.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.thuTamUng.onSearch({
        page: 0,
        dataSearch,
      });
    },
    postNbTamUng: (payload) => {
      return new Promise((resolve, reject) => {
        nbTamUngProvider
          .post(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    huyTamUng: (id) => {
      return new Promise((resolve, reject) => {
        nbTamUngProvider
          .huyTamUng(id)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success(t("thuNgan.quanLyTamUng.xoaPhieuThuTamUngThanhCong"));
            } else {
              reject(s);
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    hoanUng: (payload) => {
      return new Promise((resolve, reject) => {
        nbTamUngProvider
          .hoanUng(payload)
          .then((s) => {
            if (s?.code === 0) {
              message.success(t("thuNgan.quanLyTamUng.hoanTamUngThanhCong"));
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    inPhieuTamUng: (id) => {
      return new Promise((resolve, reject) => {
        nbTamUngProvider
          .inPhieuTamUng(id)
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
  }),
};
