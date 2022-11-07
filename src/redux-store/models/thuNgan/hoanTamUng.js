import nbTamUngProvider from "data-access/nb-tam-ung-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listDsHoanTamUng: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
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
      dispatch.hoanTamUng.updateData({
        page: 0,
        ...rest,
      });
      dispatch.hoanTamUng.onSearch({ rest });
    },
    onSearch: ({ page = 0, nbThongTinId, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.hoanTamUng.updateData(newState);
      let size = payload.size || state.hoanTamUng.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.hoanTamUng.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.hoanTamUng.dataSearch || {};

        nbTamUngProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch
        })
        .then((s) => {
          dispatch.hoanTamUng.updateData({
            listDsHoanTamUng: (s?.data || []).map((item, index) => {
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
          dispatch.hoanTamUng.updateData({
            listDsHoanTamUng: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.hoanTamUng.dataSortColumn,
        ...payload,
      };
      dispatch.hoanTamUng.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.hoanTamUng.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.hoanTamUng.dataSearch || {}),
        ...payload,
      };
      dispatch.hoanTamUng.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.hoanTamUng.onSearch({
        page: 0,
        dataSearch,
      });
    },
  }),
};
