import { cloneDeep } from "lodash";
import nbBienBanKiemDiemTuVongProvider from "data-access/nb-bien-ban-kiem-diem-tu-vong-provider";
import { message } from "antd";
import { combineSort } from "utils";

const initData = {
  listData: [],

  totalElements: 0,
  page: 0,
  dataSearch: {},
  dataSortColumn: {},
};

export default {
  state: cloneDeep(initData),
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData(state, payload = {}) {
      return { ...cloneDeep(initData), ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }) => {
      dispatch.nbTuVong.updateData({
        page: 0,
        ...rest,
      });
      dispatch.nbTuVong.onSearch({ ...rest });
    },

    searchNbTuVongByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        dataSearch: {
          ...state.nbTuVong.dataSearch,
          ...payload,
        },
      };

      dispatch.nbTuVong.updateData({
        page: 0,
        ...obj,
      });
      dispatch.nbTuVong.onSearch({ ...obj });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.nbTuVong.dataSortColumn,
        ...payload,
      };
      dispatch.nbTuVong.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nbTuVong.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.nbTuVong.updateData(newState);
      let size = payload.size || state.nbTuVong.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.nbTuVong.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.nbTuVong.dataSearch || {};

      nbBienBanKiemDiemTuVongProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.nbTuVong.updateData({
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
          dispatch.nbTuVong.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
  }),
};
