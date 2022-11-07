import { cloneDeep } from "lodash";
import nbGiayNghiBaoHiemProvider from "data-access/nb-giay-nghi-bao-hiem-provider";
import { message } from "antd";
import { combineSort } from "utils";
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
      dispatch.giayNghiHuong.updateData({
        page: 0,
        ...rest,
      });
      dispatch.giayNghiHuong.onSearch({ ...rest });
    },

    searchGiayNghiHuongByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        dataSearch: {
          ...state.giayNghiHuong.dataSearch,
          ...payload,
        },
      };

      dispatch.giayNghiHuong.updateData({
        page: 0,
        ...obj,
      });
      dispatch.giayNghiHuong.onSearch({ ...obj });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.giayNghiHuong.dataSortColumn,
        ...payload,
      };
      dispatch.giayNghiHuong.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.giayNghiHuong.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.giayNghiHuong.updateData(newState);
      let size = payload.size || state.giayNghiHuong.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.giayNghiHuong.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.giayNghiHuong.dataSearch || {};

      nbGiayNghiBaoHiemProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.giayNghiHuong.updateData({
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
          dispatch.giayNghiHuong.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    dayGiayNghiBaoHiemById: (id, state) => {
      return new Promise((resolve, reject) => {
        nbGiayNghiBaoHiemProvider
          .dayGiayNghiBaoHiem(id)
          .then((s) => {
            message.success(
              t("giayDayCong.message.dayGiayNghiViecHuongBHThanhCong")
            );
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Có lỗi xảy ra!");
            reject(e);
          });
      });
    },

    dayGiayNghiBaoHiem: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbGiayNghiBaoHiemProvider
          .dayGiayNghiBaoHiemHangLoat(payload)
          .then((s) => {
            message.success(
              t("giayDayCong.message.dayGiayNghiViecHuongBHThanhCong")
            );
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Có lỗi xảy ra!");
            reject(e);
          });
      });
    },

    huyGiayNghiBaoHiemById: (id, state) => {
      return new Promise((resolve, reject) => {
        nbGiayNghiBaoHiemProvider
          .huyGiayNghiBaoHiem(id)
          .then((s) => {
            message.success(
              t("giayDayCong.message.huyGiayNghiViecHuongBHThanhCong")
            );
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Có lỗi xảy ra!");
            reject(e);
          });
      });
    },
  }),
};
