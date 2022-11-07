import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import nbDichVuProvider from "data-access/nb-dich-vu-provider";
import { t } from "i18next";

export default {
  state: {
    listNguoiBenhTiepDon: [],
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
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.danhSachNbTiepDon.updateData({
        page: 0,
        size,
      });
      dispatch.danhSachNbTiepDon.getListNguoiBenhTiepDon({ size });
    },    
    getListNguoiBenhTiepDon: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.danhSachNbTiepDon.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.danhSachNbTiepDon.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.danhSachNbTiepDon.dataSearch || {};
      const active = payload?.active || true;
      nbDotDieuTriProvider
        .searchNBDotDieuTriTongHop({ page, size, sort, active, ...dataSearch })
        .then((s) => {
          dispatch.danhSachNbTiepDon.updateData({
            listNguoiBenhTiepDon: (s?.data || []).map((item, index) => {
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
    getListNguoiBenhKSK: ({ page = 0, ...payload }, state) => {
      let size = payload.size || 500;
      const sort = combineSort(payload.dataSortColumn || {});
      const active = payload?.active || true;
      nbDotDieuTriProvider
        .searchNBDotDieuTriTongHop({ page, size, sort, active, ...payload })
        .then((s) => {
          dispatch.danhSachNbTiepDon.updateData({
            listNguoiBenhKSK: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
          });
        })
        .catch((e) => {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
        });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.danhSachNbTiepDon.dataSearch || {}),
        ...payload,
      };
      dispatch.danhSachNbTiepDon.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.danhSachNbTiepDon.getListNguoiBenhTiepDon({
        page: 0,
        dataSearch,
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachNbTiepDon.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachNbTiepDon.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachNbTiepDon.getListNguoiBenhTiepDon({
        page: 0,
        dataSortColumn,
      });
    },
    searchDichVuTiepDon: (payload) => {
      nbDichVuProvider.searchAll(payload).then((s) => {
        let size = payload.size || 0;
        let page = payload.page || 0;
        dispatch.danhSachNbTiepDon
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
  }),
};
