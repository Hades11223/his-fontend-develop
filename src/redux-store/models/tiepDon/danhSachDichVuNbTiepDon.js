import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import nbDichVuProvider from "data-access/nb-dich-vu-provider";
import { t } from "i18next";

export default {
  state: {
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
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.dsBenhNhan.updateData({
        page: 0,
        ...rest,
      });
      dispatch.danhSachDichVuNbTiepDon.searchDichVuTiepDon(rest);
    },
    searchDichVuTiepDon: (payload, state) => {
      let size = payload.size || 10;
      let page = payload.page || 0;
      const dataSearch =
        payload.dataSearch || state.danhSachDichVuNbTiepDon.dataSearch || {};
      // console.log({ ...payload, ...dataSearch });
      nbDichVuProvider
        .searchAll({ ...payload, ...dataSearch })
        .then((s) => {
          // console.log(s?.data);
          dispatch.danhSachDichVuNbTiepDon.updateData({
            listDichVuTiepDon: (s?.data || []).map((item, index) => {
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
        ...(state.danhSachDichVuNbTiepDon.dataSearch || {}),
        ...payload,
      };
      dispatch.danhSachDichVuNbTiepDon.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.danhSachDichVuNbTiepDon.searchDichVuTiepDon({
        page: 0,
        dataSearch,
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSearch = {
        ...state.danhSachDichVuNbTiepDon.dataSearch,
        ...payload,
      };
      dispatch.danhSachDichVuNbTiepDon.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.danhSachDichVuNbTiepDon.searchDichVuTiepDon({
        page: 0,
        dataSearch,
      });
    },
  }),
};
