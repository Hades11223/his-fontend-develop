import nbTamUngProvider from "data-access/nb-tam-ung-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { t } from "i18next";

export default {
  state: {
    listNbTamUng: [],
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
      dispatch.quanLyTamUng.updateData({
        page: 0,
        ...rest,
      });
      dispatch.quanLyTamUng.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.quanLyTamUng.updateData(newState);
      let size = payload.size || state.quanLyTamUng.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.quanLyTamUng.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.quanLyTamUng.dataSearch || {};

      nbTamUngProvider
        .searchNb({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.quanLyTamUng.updateData({
            listNbTamUng: (s?.data || []).map((item, index) => {
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
          dispatch.quanLyTamUng.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.quanLyTamUng.dataSortColumn,
        ...payload,
      };
      dispatch.quanLyTamUng.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.quanLyTamUng.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.quanLyTamUng.dataSearch || {}),
        ...payload,
      };
      dispatch.quanLyTamUng.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.quanLyTamUng.onSearch({
        page: 0,
        dataSearch,
      });
    },    
    onDelete: (id) => {
      return new Promise((resolve, reject) => {
        nbTamUngProvider
          .delete(id)
          .then((s) => {
            resolve(s);
            message.success(t("common.xoaDuLieuThanhCong"));
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    }
  }),
};
