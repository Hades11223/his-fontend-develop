
import nbDvVatTuProvider from "data-access/nb-dv-vat-tu-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
export default {
  state: {
    listDsVatTu: [],
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
      dispatch.dsVatTu.updateData({
        ...rest,
      });
      dispatch.dsVatTu.onSearch({ rest });
    },
    onSearch: ({  ...payload }, state) => {
      let newState = { isLoading: true };
      dispatch.dsVatTu.updateData(newState);
      const sort = combineSort(
        payload.dataSortColumn || state.dsVatTu.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dsVatTu.dataSearch || {};

        nbDvVatTuProvider
        .searchTongHop({
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.dsVatTu.updateData({
            listDsVatTu: (s?.data || []).map((item, index) => {
              item.index =  index + 1;
              return item;
            }),
            isLoading: false,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.dsVatTu.updateData({
            listDsVatTu: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dsVatTu.dataSortColumn,
        ...payload,
      };
      dispatch.dsVatTu.updateData({
        dataSortColumn,
      });
      dispatch.dsVatTu.onSearch({
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dsVatTu.dataSearch || {}),
        ...payload,
      };
      dispatch.dsVatTu.updateData({
        dataSearch,
      });
      dispatch.dsVatTu.onSearch({
        dataSearch,
      });
    },
  }),
};
