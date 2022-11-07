import nbDichVuProvider from "data-access/nb-dich-vu-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { t } from "i18next";

export default {
  state: {
    listDvDaSuDung: [],
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
      dispatch.dichVuDaSuDung.updateData({
        page: 0,
        ...rest,
      });
      dispatch.dichVuDaSuDung.onSearch({ ...rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dichVuDaSuDung.updateData(newState);
      let size = payload.size || state.dichVuDaSuDung.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.dichVuDaSuDung.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dichVuDaSuDung.dataSearch || {};

      nbDichVuProvider
        .searchAll({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.dichVuDaSuDung.updateData({
            listDvDaSuDung: (s?.data || []).map((item, index) => {
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
          dispatch.dichVuDaSuDung.updateData({
            listDvDaSuDung: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dichVuDaSuDung.dataSortColumn,
        ...payload,
      };
      dispatch.dichVuDaSuDung.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dichVuDaSuDung.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dichVuDaSuDung.dataSearch || {}),
        ...payload,
      };
      dispatch.dichVuDaSuDung.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dichVuDaSuDung.onSearch({
        page: 0,
        dataSearch,
      });
    },
  }),
};
