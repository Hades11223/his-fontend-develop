import huyenTongHopProvider from "data-access/categories/dm-huyen-tong-hop-provider";
import { message } from "antd";
import { SORT_DEFAULT } from "constants/index";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: SORT_DEFAULT,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getData: ({ page = 0, size = 10, ...payload }, state) => {
      dispatch.huyenTongHop.updateData({
        page: 0,
        size,
      });
      dispatch.huyenTongHop.onSearch({
        page: 0,
        size,
      });
    },
    onSizeChange: ({ size }, state) => {
      dispatch.huyenTongHop.updateData({
        size,
        page: 0,
      });
      dispatch.huyenTongHop.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.huyenTongHop.updateData(newState);
      let size = payload.size || state.huyenTongHop.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.huyenTongHop.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.huyenTongHop.dataSearch || {};
      huyenTongHopProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.huyenTongHop.updateData({
            listData: (s?.data || []).map((item, index) => {
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
          dispatch.huyenTongHop.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.huyenTongHop.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.huyenTongHop.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.huyenTongHop.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.huyenTongHop.dataSearch || {}),
        ...payload,
      };
      dispatch.huyenTongHop.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.huyenTongHop.onSearch({
        page: 0,
        dataSearch,
      });
    },
  }),
};
