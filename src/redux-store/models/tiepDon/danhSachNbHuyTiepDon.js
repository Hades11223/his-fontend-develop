import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { t } from "i18next";

export default {
  state: {
    listNguoiBenhTiepDon: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: {},
    dataSearch: {},
    listDichVuTiepDon: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.danhSachNbHuyTiepDon.updateData({
        page: 0,
        size,
      });
      dispatch.danhSachNbHuyTiepDon.getListNguoiBenhTiepDon({ size });
    },
    getListNguoiBenhTiepDon: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.danhSachNbHuyTiepDon.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.danhSachNbHuyTiepDon.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.danhSachNbHuyTiepDon.dataSearch || {};

      nbDotDieuTriProvider
        .searchNBDotDieuTriTongHop({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.danhSachNbHuyTiepDon.updateData({
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
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.danhSachNbHuyTiepDon.dataSearch || {}),
        ...payload,
      };
      dispatch.danhSachNbHuyTiepDon.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.danhSachNbHuyTiepDon.getListNguoiBenhTiepDon({
        page: 0,
        dataSearch,
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachNbHuyTiepDon.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachNbHuyTiepDon.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachNbHuyTiepDon.getListNguoiBenhTiepDon({
        page: 0,
        dataSortColumn,
      });
    },
    huyTiepDon: (payload) => {
      nbDotDieuTriProvider.huyTiepDon(payload).then((s) => {
        if(s?.code === 0) {
        dispatch.danhSachNbHuyTiepDon.getListNguoiBenhTiepDon({})
        } else {
          message.error(s?.message);
        }
      }).catch((e) => {
        message.error(e?.message);
      });
    },
  }),
};
