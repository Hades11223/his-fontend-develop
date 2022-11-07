import nbGoiDvChiTietProvider from "data-access/nb-goi-dv-chi-tiet-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { t } from "i18next";
import nbGoiDvProvider from "data-access/nb-goi-dv-provider";

export default {
  state: {
    listDvTrongGoi: [],
    page: 0,
    size: 0,
    totalElements: 0,
    dataSortColumn: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ isGetAll, dataSearch, ...rest }, state) => {
      dispatch.dichVuTrongGoi.updateData({
        page: 0,
        ...rest,
      });
      dispatch.dichVuTrongGoi.onSearch({ isGetAll, ...rest });
    },
    onSearch: ({ page = 0, isGetAll, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dichVuTrongGoi.updateData(newState);
      let size = payload.size || state.dichVuTrongGoi.size || 10;
      if (isGetAll) {
        size = "";
        page = "";
      }
      const sort = combineSort(
        payload.dataSortColumn || state.dichVuTrongGoi.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dichVuTrongGoi.dataSearch || {};

      nbGoiDvChiTietProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.dichVuTrongGoi.updateData({
            listDvTrongGoi: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
            size,
            dataSearch,
          });
        })
        .catch((e) => {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          dispatch.dichVuTrongGoi.updateData({
            listDvTrongGoi: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ isGetAll, ...payload }, state) => {
      const dataSortColumn = {
        ...state.dichVuTrongGoi.dataSortColumn,
        ...payload,
      };
      dispatch.dichVuTrongGoi.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dichVuTrongGoi.onSearch({
        isGetAll,
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ isGetAll, ...payload }, state) => {
      const dataSearch = {
        ...(state.dichVuTrongGoi.dataSearch || {}),
        ...payload,
      };
      dispatch.dichVuTrongGoi.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dichVuTrongGoi.onSearch({
        isGetAll,
        page: 0,
        dataSearch,
      });
    },

    deleteDvTrongGoi: (id, state) => {
      return new Promise(async (resolve, reject) => {
        nbGoiDvChiTietProvider
          .delete(id)
          .then((s) => {
            if (s.code === 0) {
              message.success(t("common.xoaDuLieuThanhCong"));
              resolve();
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    themDvVaoGoi: ({ nbGoiDvId, dsDv }) => {
      return new Promise(async (resolve, reject) => {
        nbGoiDvProvider
          .themDvVaoGoi({ nbGoiDvId, dsDv })
          .then((s) => {
            if (s.code === 0) {
              message.success("Thêm dịch vụ vào gói thành công!");
              resolve();
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    traDichVu: ({ id, ...rest }) => {
      return new Promise(async (resolve, reject) => {
        nbGoiDvChiTietProvider
          .traDichVu({ id, ...rest })
          .then((s) => {
            if (s.code === 0) {
              message.success("Cập nhật thành công!");
              resolve();
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    traNhieuDichVu: (payload) => {
      return new Promise(async (resolve, reject) => {
        nbGoiDvChiTietProvider
          .traNhieuDichVu(payload)
          .then((s) => {
            if (s.code === 0) {
              message.success("Cập nhật thành công!");
              resolve();
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject();
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
