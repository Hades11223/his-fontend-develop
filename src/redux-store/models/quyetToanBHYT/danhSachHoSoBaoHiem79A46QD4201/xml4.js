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
      dispatch.danhSachHoSoBaoHiem79A46QD4201Xml4.updateData({
        page: 0,
        dataSearch: {
          ...state?.danhSachHoSoBaoHiem79A46QD4201Xml4?.dataSearch,
          ...rest,
        },
        ...rest,
      });
      dispatch.danhSachHoSoBaoHiem79A46QD4201Xml4.getList({ ...rest });
    },
    getList: (
      { page = 0, dataSortColumn,  activeKeyTab = "4", ...payload },
      state
    ) => {
      let size =
        payload?.size || state.danhSachHoSoBaoHiem79A46QD4201Xml4.size || 10;
      const sort = combineSort(
        dataSortColumn ||
          state.danhSachHoSoBaoHiem79A46QD4201Xml4.dataSortColumn ||
          {}
      );
      const dataSearch = {
        ...state.danhSachHoSoBaoHiem79A46QD4201Xml4.dataSearch,
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
          dispatch.danhSachHoSoBaoHiem79A46QD4201Xml4.updateData({
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
            dispatch.danhSachHoSoBaoHiem79A46QD4201Xml4.updateData({
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
      dispatch.danhSachHoSoBaoHiem79A46QD4201Xml4.updateData({
        page: 0,
        dataSearch: {
          ...state?.danhSachHoSoBaoHiem79A46QD4201Xml4?.dataSearch,
          ...payload,
        },
        ...obj,
      });
      dispatch.danhSachHoSoBaoHiem79A46QD4201Xml4.getList({ ...obj });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachHoSoBaoHiem79A46QD4201Xml4.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachHoSoBaoHiem79A46QD4201Xml4.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachHoSoBaoHiem79A46QD4201Xml4.getList({
        page: 0,
        dataSortColumn,
      });
    },
    putXml4: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        danhSachHoSoBaoHiem79A46QD4201Provider
          .putXml4(payload)
          .then((s) => {
            dispatch.danhSachHoSoBaoHiem79A46QD4201Xml4.updateData({
              dataXml4: s.data,
            });
            dispatch.danhSachHoSoBaoHiem79A46QD4201Xml4.getList({
              id: state.danhSachHoSoBaoHiem79A46QD4201.dataXml1.id,
              activeKeyTab: "4",
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
