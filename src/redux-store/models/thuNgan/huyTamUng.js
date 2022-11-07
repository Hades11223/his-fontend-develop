import nbTamUngProvider from "data-access/nb-tam-ung-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listDsHuyTamUng: [],
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
      dispatch.huyTamUng.updateData({
        page: 0,
        ...rest,
      });
      dispatch.huyTamUng.onSearch({ rest });
    },
    onSearch: ({ page = 0, nbThongTinId, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.huyTamUng.updateData(newState);
      let size = payload.size || state.huyTamUng.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.huyTamUng.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.huyTamUng.dataSearch || {};

        nbTamUngProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch
        })
        .then((s) => {
          dispatch.huyTamUng.updateData({
            listDsHuyTamUng: (s?.data || []).map((item, index) => {
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
          dispatch.huyTamUng.updateData({
            listDsHuyTamUng: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.huyTamUng.dataSortColumn,
        ...payload,
      };
      dispatch.huyTamUng.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.huyTamUng.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.huyTamUng.dataSearch || {}),
        ...payload,
      };
      dispatch.huyTamUng.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.huyTamUng.onSearch({
        page: 0,
        dataSearch,
      });
    },
  }),
};
