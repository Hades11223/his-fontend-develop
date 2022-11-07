import danhSachHoSoBaoHiem79A46QD4201Provider from "data-access/quyetToanBHYT/danh-sach-ho-so-bao-hiem-39a-42-qd4201-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { t } from "i18next";
export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: {},
    dataSearch: {},
    chiTiet: true,
    // dsTrangThai: [10], // trạng thái tạo mới , mặc định
    dataCurrent: {},
    loadingXoaHoSoHangLoat: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.danhSachHoSoBaoHiem79A46QD4201.updateData({
        page: 0,
        dataSearch: {
          ...state?.danhSachHoSoBaoHiem79A46QD4201?.dataSearch,
          ...rest,
        },
        ...rest,
      });
      dispatch.danhSachHoSoBaoHiem79A46QD4201.getList({ ...rest });
    },
    getList: ({ page = 0, dataSortColumn, ...payload }, state) => {
      let size =
        payload?.size || state.danhSachHoSoBaoHiem79A46QD4201.size || 10;
      const sort = combineSort(
        dataSortColumn ||
          state.danhSachHoSoBaoHiem79A46QD4201.dataSortColumn ||
          {}
      );
      // const dataSearch = payload.dataSearch || state.danhSachHoSoBaoHiem79A46QD4201.dataSearch || {};
      const dataSearch = {
        ...state.danhSachHoSoBaoHiem79A46QD4201.dataSearch,
        ...payload,
      };
      danhSachHoSoBaoHiem79A46QD4201Provider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.danhSachHoSoBaoHiem79A46QD4201.updateData({
            listData: (s?.data || []).map((item, index) => {
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
    searchById: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        danhSachHoSoBaoHiem79A46QD4201Provider
          .searchById({ id, ...payload })
          .then((s) => {
            dispatch.danhSachHoSoBaoHiem79A46QD4201.updateData({
              dataXml1: s.data,
            });
            return resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
    searchByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        ...payload,
      };
      dispatch.danhSachHoSoBaoHiem79A46QD4201.updateData({
        page: 0,
        dataSearch: {
          ...state?.danhSachHoSoBaoHiem79A46QD4201?.dataSearch,
          ...payload,
        },
        ...obj,
      });
      dispatch.danhSachHoSoBaoHiem79A46QD4201.getList({ ...obj });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachHoSoBaoHiem79A46QD4201.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachHoSoBaoHiem79A46QD4201.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachHoSoBaoHiem79A46QD4201.getList({
        page: 0,
        dataSortColumn,
      });
    },
    putXml1: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        danhSachHoSoBaoHiem79A46QD4201Provider
          .putXml1(payload)
          .then((s) => {
            dispatch.danhSachHoSoBaoHiem79A46QD4201.updateData({
              dataXml1: s.data,
            });
            return resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
    searchXml: ({ activeKeyTab, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        danhSachHoSoBaoHiem79A46QD4201Provider
          .searchXml({
            activeKeyTab,
            ...payload,
          })
          .then((s) => {
            dispatch.danhSachHoSoBaoHiem79A46QD4201.updateData({
              [`dataXml${activeKeyTab}`]: s.data,
            });
            return resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
    xoaHoSoHangLoat: ({ ...payload }, state) => {
      dispatch.danhSachHoSoBaoHiem79A46QD4201.updateData({
        loadingXoaHoSoHangLoat: true,
      });
      return new Promise((resolve, reject) => {
        danhSachHoSoBaoHiem79A46QD4201Provider
          .delete({
            ...payload,
          })
          .then((s) => {
            dispatch.danhSachHoSoBaoHiem79A46QD4201.updateData({
              loadingXoaHoSoHangLoat: false,
            });
            return resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
            dispatch.danhSachHoSoBaoHiem79A46QD4201.updateData({
              loadingXoaHoSoHangLoat: false,
            });
          });
      });
    },
    deleteById: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        danhSachHoSoBaoHiem79A46QD4201Provider
          .deleteById({
            id,
          })
          .then((s) => {
            return resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
    dayHoSoBaoHiem: (id) => {
      return new Promise((resolve, reject) => {
        danhSachHoSoBaoHiem79A46QD4201Provider
          .postQuyetToan(id)
          .then((s) => {
            message.success(t("quyetToanBhyt.dayQuyetToanBaoHiemThanhCong"));
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
    dayHoSoBaoHiemHangLoat: (payload) => {
      return new Promise((resolve, reject) => {
        danhSachHoSoBaoHiem79A46QD4201Provider
          .postMultipleQuyetToan(payload)
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
            reject(e);
          });
      });
    },
  }),
};
