import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import nbDichVuProvider from "data-access/nb-dich-vu-provider";
import { t } from "i18next";

const initState = {
  listNguoiBenhKSK: [],
  listChooseNbKSK: [],
  totalElements: null,
  page: PAGE_DEFAULT,
  size: PAGE_SIZE,
  dataEditDefault: {},
  dataSortColumn: {},
  dataSearch: {},
  listDichVuTiepDon: [],
  nbChiTiet: {},
};

export default {
  state: initState,
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData(state, payload = {}) {
      return { ...initState, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.danhSachNbKSK.updateData({
        page: 0,
        size,
      });
      dispatch.danhSachNbKSK.getListNguoiBenhKSK({ size });
    },

    getListNguoiBenhKSK: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.danhSachNbKSK.size || 10;
      const sort = combineSort(payload.dataSortColumn || {});
      const active = payload?.active || true;
      const dataSearch =
        payload.dataSearch || state.danhSachNbKSK.dataSearch || {};

      nbDotDieuTriProvider
        .searchNBDotDieuTriTongHop({ page, size, sort, active, ...dataSearch })
        .then((s) => {
          dispatch.danhSachNbKSK.updateData({
            listNguoiBenhKSK: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
        });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.danhSachNbKSK.dataSearch || {}),
        ...payload,
      };
      dispatch.danhSachNbKSK.updateData({
        page: 0,
        dataSearch,
      });

      dispatch.danhSachNbKSK.getListNguoiBenhKSK({
        page: 0,
        dataSearch,
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachNbKSK.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachNbKSK.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachNbKSK.getListNguoiBenhKSK({
        page: 0,
        dataSortColumn,
      });
    },
    searchDichVuTiepDon: (payload) => {
      nbDichVuProvider.searchAll(payload).then((s) => {
        let size = payload.size || 0;
        let page = payload.page || 0;
        dispatch.danhSachNbKSK
          .updateData({
            listDichVuTiepDon: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },

    getAllListNbKSK: (payload, state) => {
      const size = state.danhSachNbKSK.totalElements;
      const dataSearch = state.danhSachNbKSK.dataSearch || {};

      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .searchNBDotDieuTriTongHop({
            page: 0,
            size,
            active: true,
            ...dataSearch,
          })
          .then((s) => {
            resolve(s?.data || []);
          })
          .catch((e) => {
            reject();
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
  }),
};
