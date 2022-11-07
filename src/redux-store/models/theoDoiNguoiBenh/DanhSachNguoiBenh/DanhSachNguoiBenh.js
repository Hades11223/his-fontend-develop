import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listNguoiBenh: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: { },
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.danhSachCovid.updateData({
        page: 0,
        size,
      });
      dispatch.danhSachCovid.getListNguoiBenh({ size });
    },
    getListNguoiBenh: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.danhSachCovid.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.danhSachCovid.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.danhSachCovid.dataSearch || {};

      nbDotDieuTriProvider
        .searchNBDotDieuTriTongHop({ page, size, sort, ...dataSearch, covid: true })
        .then((s) => {
          dispatch.danhSachCovid.updateData({
            listNguoiBenh: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.danhSachCovid.dataSearch || {}),
        ...payload,
      };
      dispatch.danhSachCovid.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.danhSachCovid.getListNguoiBenh({
        page: 0,
        dataSearch,
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachCovid.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachCovid.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachCovid.getListNguoiBenh({
        page: 0,
        dataSortColumn,
      });
    },
  }),
};
