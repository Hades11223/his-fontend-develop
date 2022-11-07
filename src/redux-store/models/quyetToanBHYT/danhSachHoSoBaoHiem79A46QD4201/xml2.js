import danhSachHoSoBaoHiem79A46QD4201Provider from "data-access/quyetToanBHYT/danh-sach-ho-so-bao-hiem-39a-42-qd4201-provider";
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
    dataSortColumn: {},
    dataSearch: {},
    chiTiet: true,
    // dsTrangThai: [10], // trạng thái tạo mới , mặc định
    dataCurrent: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.danhSachHoSoBaoHiem79A46QD4201Xml2.updateData({
        page: 0,
        dataSearch: {
          ...state?.danhSachHoSoBaoHiem79A46QD4201Xml2?.dataSearch,
          ...rest,
        },
        ...rest,
      });
      dispatch.danhSachHoSoBaoHiem79A46QD4201Xml2.getList({ ...rest });
    },
    getList: (
      { page = 0, dataSortColumn,  activeKeyTab = "2", ...payload },
      state
    ) => {
      let size =
        payload?.size || state.danhSachHoSoBaoHiem79A46QD4201Xml2.size || 10;
      const sort = combineSort(
        dataSortColumn ||
          state.danhSachHoSoBaoHiem79A46QD4201Xml2.dataSortColumn ||
          {}
      );
      // const dataSearch = payload.dataSearch || state.danhSachHoSoBaoHiem79A46QD4201Xml2.dataSearch || {};
      const dataSearch = {
        ...state.danhSachHoSoBaoHiem79A46QD4201Xml2.dataSearch,
        ...payload,
      };
      const id =
        payload?.id || state.danhSachHoSoBaoHiem79A46QD4201.dataXml1.id;

      danhSachHoSoBaoHiem79A46QD4201Provider
        .searchXml({
          page,
          size,
          sort,
          activeKeyTab,
          id,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.danhSachHoSoBaoHiem79A46QD4201Xml2.updateData({
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
            dispatch.danhSachHoSoBaoHiem79A46QD4201Xml2.updateData({
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
      dispatch.danhSachHoSoBaoHiem79A46QD4201Xml2.updateData({
        page: 0,
        dataSearch: {
          ...state?.danhSachHoSoBaoHiem79A46QD4201Xml2?.dataSearch,
          ...payload,
        },
        ...obj,
      });
      dispatch.danhSachHoSoBaoHiem79A46QD4201Xml2.getList({ ...obj });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachHoSoBaoHiem79A46QD4201Xml2.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachHoSoBaoHiem79A46QD4201Xml2.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachHoSoBaoHiem79A46QD4201Xml2.getList({
        page: 0,
        dataSortColumn,
      });
    },
    putXml2: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        danhSachHoSoBaoHiem79A46QD4201Provider
          .putXml2(payload)
          .then((s) => {
            dispatch.danhSachHoSoBaoHiem79A46QD4201Xml2.updateData({
              dataXml2: s.data,
            });
            dispatch.danhSachHoSoBaoHiem79A46QD4201Xml2.getList({
              id: state.danhSachHoSoBaoHiem79A46QD4201.dataXml1.id,
              activeKeyTab: "2",
            });
            return resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
  }),
};
