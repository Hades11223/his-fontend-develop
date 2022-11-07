import nbThongTinProvider from "data-access/nb-thong-tin-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { t } from "i18next";

export default {
  state: {
    listNbThongTin: [],
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
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.nbThongTin.updateData({
        page: 0,
        ...rest,
      });
      dispatch.nbThongTin.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.nbThongTin.updateData(newState);
      let size = payload.size || state.nbThongTin.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.nbThongTin.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.nbThongTin.dataSearch || {};

      nbThongTinProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.nbThongTin.updateData({
            listNbThongTin: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          dispatch.nbThongTin.updateData({
            listNbThongTin: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.nbThongTin.dataSortColumn,
        ...payload,
      };
      dispatch.nbThongTin.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nbThongTin.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.nbThongTin.dataSearch || {}),
        ...payload,
      };
      dispatch.nbThongTin.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.nbThongTin.onSearch({
        page: 0,
        dataSearch,
      });
    },
  }),
};
