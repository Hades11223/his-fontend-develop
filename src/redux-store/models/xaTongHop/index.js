import xaPhuongProvider from "data-access/categories/dm-xa-phuong-provider";
import { message } from "antd";
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
    dataSortColumn: { active: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getData: ({ page = 0, size = 10, ...payload }, state) => {
      dispatch.xaTongHop.updateData({
        page: 0,
        size,
      });
      dispatch.xaTongHop.onSearch({
        page: 0,
        size,
      });
    },
    onSizeChange: ({ size }, state) => {
      dispatch.xaTongHop.updateData({
        size,
        page: 0,
      });
      dispatch.xaTongHop.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.xaTongHop.updateData(newState);
      let size = payload.size || state.xaTongHop.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.xaTongHop.dataSortColumn || {}
      );
      delete sort.createdAt;
      const dataSearch = payload.dataSearch || state.xaTongHop.dataSearch || {};
      xaPhuongProvider
        .searchAll({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.xaTongHop.updateData({
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
          dispatch.xaTongHop.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.xaTongHop.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.xaTongHop.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.xaTongHop.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.xaTongHop.dataSearch || {}),
        ...payload,
      };
      dispatch.xaTongHop.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.xaTongHop.onSearch({
        page: 0,
        dataSearch,
      });
    },
  }),
};
