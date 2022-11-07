import { cloneDeep } from "lodash";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { message } from "antd";
import { combineSort } from "utils";
import nbChiSoSongProvider from "data-access/nb-chi-so-song-provider";
import { t } from "i18next";

const initData = {
  //list phieu
  listData: [],

  //search
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
      dispatch.sinhHieu.updateData({
        page: 0,
        ...rest,
      });
      dispatch.sinhHieu.onSearch({ ...rest });
    },

    searchSinhHieuByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        dataSearch: {
          ...state.sinhHieu.dataSearch,
          ...payload,
        },
      };

      dispatch.sinhHieu.updateData({
        page: 0,
        ...obj,
      });
      dispatch.sinhHieu.onSearch({ ...obj });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.sinhHieu.dataSortColumn,
        ...payload,
      };
      dispatch.sinhHieu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.sinhHieu.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.sinhHieu.updateData(newState);
      let size = payload.size || state.sinhHieu.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.sinhHieu.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.sinhHieu.dataSearch || {};

      nbChiSoSongProvider
        .getChiSoSongByNb({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.sinhHieu.updateData({
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
          dispatch.sinhHieu.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    updateChiSoSong: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbChiSoSongProvider
          .updateChiSoSong(payload)
          .then((s) => {
            if (s?.code == 0) {
              message.success(t("common.capNhatThanhCong"));
              resolve(s?.data);
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
  }),
};
