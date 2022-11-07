import nbTamUngProvider from "data-access/nb-tam-ung-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { t } from "i18next";

export default {
  state: {
    listDsDeNghiTamUng: [],
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
      dispatch.deNghiTamUng.updateData({
        page: 0,
        ...rest,
      });
      dispatch.deNghiTamUng.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.deNghiTamUng.updateData(newState);
      let size = payload.size || state.deNghiTamUng.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.deNghiTamUng.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.deNghiTamUng.dataSearch || {};

      nbTamUngProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.deNghiTamUng.updateData({
            listDsDeNghiTamUng: (s?.data || []).map((item, index) => {
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
          dispatch.deNghiTamUng.updateData({
            listDsDeNghiTamUng: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ dataSearch, ...payload }, state) => {
      const dataSortColumn = {
        ...state.deNghiTamUng.dataSortColumn,
        ...payload,
      };
      dispatch.deNghiTamUng.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.deNghiTamUng.onSearch({
        page: 0,
        dataSortColumn,
        dataSearch,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.deNghiTamUng.dataSearch || {}),
        ...payload,
      };
      dispatch.deNghiTamUng.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.deNghiTamUng.onSearch({
        page: 0,
        dataSearch,
      });
    },
    postDeNghiTamUng: (payload) => {
      return new Promise((resolve, reject) => {
        nbTamUngProvider
          .postDeNghiTamUng(payload)
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
    duyetDeNghiTamUng: (payload) => {
      return new Promise((resolve, reject) => {
        nbTamUngProvider
          .duyetDeNghiTamUng(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    suaDeNghiTamUng: (payload) => {
      return new Promise((resolve, reject) => {
        nbTamUngProvider
          .suaDeNghiTamUng(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success(t("common.suaThongTinThanhCong"));
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
  }),
};
