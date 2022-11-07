import danhSachNguoiBenhChoTaoHoSoQuyetToanBhytProvider from "data-access/quyetToanBHYT/danh-sach-phieu-nb-cho-tao-ho-so-quyet-toan-bhyt-provider";
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
    loadingTaoHoSoHangLoat: false
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.updateData({
        page: 0,
        dataSearch: { ...state?.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT?.dataSearch, ...rest },
        ...rest,
      });
      dispatch.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.getList({ ...rest });
    },
    getList: ({ page = 0, dataSortColumn, ...payload }, state) => {
      let size = payload?.size || state.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.size || 10;
      const sort = combineSort(
        dataSortColumn || state.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.dataSortColumn || {}
      );
      // const dataSearch = payload.dataSearch || state.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.dataSearch || {};
      const dataSearch = {
        ...state.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.dataSearch,
        ...payload,
      };
      danhSachNguoiBenhChoTaoHoSoQuyetToanBhytProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.updateData({
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
      danhSachNguoiBenhChoTaoHoSoQuyetToanBhytProvider
        .searchById({ id, ...payload })
        .then((s) => {
          dispatch.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.updateData({
            dataCurrent: s.data
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    searchByParams: ({ page = 0, ...payload }, state) => {
      console.log('payload: ', payload);
      const obj = {
        ...payload,
      };
      dispatch.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.updateData({
        page: 0,
        dataSearch: { ...state?.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT?.dataSearch, ...payload },
        ...obj,
      });
      dispatch.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.getList({ ...obj });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.getList({
        page: 0,
        dataSortColumn,
      });
    },
    postTaoHangLoat: ({ ...payload }, state) => {
      dispatch.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.updateData({
        loadingTaoHoSoHangLoat: true,
      });
      return new Promise((resolve, reject) => {
        danhSachNguoiBenhChoTaoHoSoQuyetToanBhytProvider
          .post(payload)
          .then((s) => {
            s.message && message.success(s.message)
            dispatch.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.updateData({
              loadingTaoHoSoHangLoat: false,
            });
            return resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
            dispatch.danhSachNguoiBenhChoTaoHoSoQuyetToanBHYT.updateData({
              loadingTaoHoSoHangLoat: false,
            });
          });
      });
    },
    postTaoHoSoDuyet: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        danhSachNguoiBenhChoTaoHoSoQuyetToanBhytProvider
          .post(payload)
          .then((s) => {
            s.message && message.success(s.message)
            return resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },

  }),
};
