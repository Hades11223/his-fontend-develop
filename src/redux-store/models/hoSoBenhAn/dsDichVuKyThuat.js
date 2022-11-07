import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import dvKyThuatProvider from "data-access/nb-dv-ky-thuat-provider";
import { combineSort } from "utils";

export default {
  state: {
    listDichVuKyThuat: [],
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
      dispatch.dsDichVuKyThuat.updateData({
        ...rest,
      });
      dispatch.dsDichVuKyThuat.onSearch({ rest });
    },
    onSearch: ({  ...payload }, state) => {
      let newState = { isLoading: true };
      dispatch.dsDichVuKyThuat.updateData(newState);
      const sort = combineSort(
        payload.dataSortColumn || state.dsDichVuKyThuat.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dsDichVuKyThuat.dataSearch || {};

      dvKyThuatProvider
        .getDsDichVu({
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.dsDichVuKyThuat.updateData({
            listDichVuKyThuat: (s?.data || []).map((item, index) => {
              item.index =  index + 1;
              return item;
            }),
            isLoading: false,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.dsDichVuKyThuat.updateData({
            listDichVuKyThuat: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dsDichVuKyThuat.dataSortColumn,
        ...payload,
      };
      dispatch.dsDichVuKyThuat.updateData({
        dataSortColumn,
      });
      dispatch.dsDichVuKyThuat.onSearch({
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dsDichVuKyThuat.dataSearch || {}),
        ...payload,
      };
      dispatch.dsDichVuKyThuat.updateData({
        dataSearch,
      });
      dispatch.dsDichVuKyThuat.onSearch({
        dataSearch,
      });
    },
  }),
};
