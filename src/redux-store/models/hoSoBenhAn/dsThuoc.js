import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import nbDvThuocProvider from "data-access/nb-dv-thuoc-provider";
import { combineSort } from "utils";

export default {
  state: {
    listDsThuoc: [],
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
      dispatch.dsThuoc.updateData({
        ...rest,
      });
      dispatch.dsThuoc.onSearch({ rest });
    },
    onSearch: ({  ...payload }, state) => {
      let newState = { isLoading: true };
      dispatch.dsThuoc.updateData(newState);
      const sort = combineSort(
        payload.dataSortColumn || state.dsThuoc.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dsThuoc.dataSearch || {};

        nbDvThuocProvider
        .searchTongHop({
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.dsThuoc.updateData({
            listDsThuoc: (s?.data || []).map((item, index) => {
              item.index = index + 1;
              return item;
            }),
            isLoading: false,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.dsThuoc.updateData({
            listDsThuoc: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dsThuoc.dataSortColumn,
        ...payload,
      };
      dispatch.dsThuoc.updateData({
        dataSortColumn,
      });
      dispatch.dsThuoc.onSearch({
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dsThuoc.dataSearch || {}),
        ...payload,
      };
      dispatch.dsThuoc.updateData({
        dataSearch,
      });
      dispatch.dsThuoc.onSearch({
        dataSearch,
      });
    },
  }),
};
