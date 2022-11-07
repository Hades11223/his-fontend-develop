import nbDichVuProvider from "data-access/nb-dich-vu-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import nbDvXetNghiemProvider from "data-access/nb-dv-xet-nghiem-provider";

export default {
  state: {
    listDvNgoaiTru: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},
    listData: [],
    dataSortColumn: {},
    listChiSoCon: []
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.dvNgoaiTru.updateData({
        page: 0,
        ...rest,
      });
      dispatch.dvNgoaiTru.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dvNgoaiTru.updateData(newState);
      let size = payload.size || state.dvNgoaiTru.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.dvNgoaiTru.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dvNgoaiTru.dataSearch || {};

      nbDichVuProvider
        .searchAll({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.dvNgoaiTru.updateData({
            listDvNgoaiTru: (s?.data || []).map((item, index) => {
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
          dispatch.dvNgoaiTru.updateData({
            listDvNgoaiTru: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dvNgoaiTru.dataSortColumn,
        ...payload,
      };
      dispatch.dvNgoaiTru.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dvNgoaiTru.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dvNgoaiTru.dataSearch || {}),
        ...payload,
      };
      dispatch.dvNgoaiTru.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dvNgoaiTru.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getChiSoConDvXetNghiem: ({...payload}) => {
      nbDvXetNghiemProvider
        .getChiSoCon(payload)
        .then((s) => {
          dispatch.dvNgoaiTru.updateData({
            listChiSoCon: s?.data,
          });
        })
        .catch(() => {
          dispatch.dvNgoaiTru.updateData({
            listChiSoCon: [],
          });
        });
    },
  }),
};
