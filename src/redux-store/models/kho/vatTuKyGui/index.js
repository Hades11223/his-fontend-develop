import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import nbDvVatTuProvider from "data-access/nb-dv-vat-tu-provider";
import { combineSort } from "utils";

export default {
  state: {
    listVatTuKyGui: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
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
      dispatch.vatTuKyGui.updateData({
        ...rest,
      });
      dispatch.vatTuKyGui.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true };
      dispatch.vatTuKyGui.updateData(newState);
      const sort = combineSort(
        payload.dataSortColumn || state.vatTuKyGui.dataSortColumn || {}
      );
      let size = payload.size || state.vatTuKyGui.size || 10;
      const dataSearch =
        payload.dataSearch || state.vatTuKyGui.dataSearch || {};
      nbDvVatTuProvider
        .searchVatTuKyGui({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.vatTuKyGui.updateData({
            listVatTuKyGui: (s?.data || []).map((item, index) => {
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
          dispatch.vatTuKyGui.updateData({
            listVatTuKyGui: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.vatTuKyGui.dataSortColumn,
        ...payload,
      };
      dispatch.vatTuKyGui.updateData({
        dataSortColumn,
      });
      dispatch.vatTuKyGui.onSearch({
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.vatTuKyGui.dataSearch || {}),
        ...payload,
      };
      dispatch.vatTuKyGui.updateData({
        dataSearch,
      });
      dispatch.vatTuKyGui.onSearch({
        dataSearch,
      });
    },
  }),
};
