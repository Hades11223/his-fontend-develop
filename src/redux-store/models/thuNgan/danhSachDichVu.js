import nbDichVuProvider from "data-access/nb-dich-vu-provider";
import { message } from "antd";
import { PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listAllService: [],
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: 10,
    dataSearch: {},
    dataSortColumn: {},
    listAllData: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    searchAll: ({ page = 0, ...payload }, state) => {
      const newState = { isLoading: true };
      dispatch.danhSachDichVu.updateData({
        ...newState,
      });
      const nbDotDieuTriId = payload.nbDotDieuTriId;
      const phieuThuId = payload.phieuThuId;
      const size = payload.size || 10000;
      const sort = combineSort(
        payload.dataSortColumn || state.danhSachDichVu.dataSortColumn || {}
      );
      nbDichVuProvider
        .searchAll({ page, size, sort, nbDotDieuTriId, phieuThuId })
        .then((s) => {
          dispatch.danhSachDichVu.updateData({
            listAllService: (s?.data || []).map((item, index) => {
              item.stt = page * size + index + 1;
              item.index = page * size + index + 1;
              item.thaotac = item;
              return { ...item, key: index + 1 };
            }),
            isLoading: false,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.danhSachDichVu.updateData({
            listAllService: [],
            isLoading: false,
          });
        });
    },
    onSizeChange: (payload, state) => {
      dispatch.danhSachDichVu.updateData({
        page: 0,
        ...payload,
      });
      dispatch.danhSachDichVu.onSearch(payload);
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      const newState = { isLoading: true, page };
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.danhSachDichVu.nbDotDieuTriId;
      const phieuThuId = payload.phieuThuId || state.danhSachDichVu.phieuThuId;
      dispatch.danhSachDichVu.updateData({
        ...newState,
        nbDotDieuTriId,
        phieuThuId,
      });
      const size = payload.size || state.danhSachDichVu.size;
      const sort = combineSort(
        payload.dataSortColumn || state.danhSachDichVu.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.danhSachDichVu.dataSearch || {};

      nbDichVuProvider
        .searchAll({
          page,
          size,
          sort,
          nbDotDieuTriId,
          phieuThuId,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.danhSachDichVu.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.stt = page * size + index + 1;
              item.index = page * size + index + 1;
              item.thaotac = item;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.danhSachDichVu.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachDichVu.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachDichVu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachDichVu.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const { nbDotDieuTriId, phieuThuId } = state.danhSachDichVu;
      const dataSearch = {
        nbDotDieuTriId,
        phieuThuId,
        ...(state.danhSachDichVu.dataSearch || {}),
        ...payload,
      };
      dispatch.danhSachDichVu.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.danhSachDichVu.onSearch({
        page: 0,
        dataSearch,
      });
    },
  }),
};
