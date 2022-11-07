import danhSachDichVuKhoProvider from "data-access/kho/danh-sach-dich-vu-kho-provider.js";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import khoTonKhoProvider from "data-access/kho/kho-ton-kho-provider";

export default {
  state: {
    cachXem: "1",
    selectedHangHoa: null,
    listDanhSachDichVuKho: [],
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},
    totalElements: null,
    dataSortColumn: {},
    selectedItem: null,
    listPhieuNhapChiTiet: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }) => {
      dispatch.danhSachDichVuKho.updateData({
        page: 0,
        // dataSearch,
        ...rest,
      });
      dispatch.danhSachDichVuKho.getListDanhSachDichVuKho({ rest });
    },
    searchByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        ...payload,
      };
      dispatch.danhSachDichVuKho.updateData({
        page: 0,
        dataSearch: { ...state?.danhSachDichVuKho?.dataSearch, ...payload },
        ...obj,
      });
      dispatch.danhSachDichVuKho.search({ ...obj });
    },
    search: ({ page = 0, dataSortColumn, ...payload }, state) => {
      let size = payload.size || state.danhSachDichVuKho.size || 10;
      const sort = combineSort(
        dataSortColumn || state.danhSachDichVuKho.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.danhSachDichVuKho.dataSearch || {};
      const theoLo = payload.theoLo;
      danhSachDichVuKhoProvider
        // .search({ page, size, sort,theoLo, ...dataSearch })
        .search({ page, size, sort, theoLo, ...dataSearch, ...payload })
        .then((s) => {
          const listCustom = (s?.data || []).map((item, index) => {
            item.index = page * size + index + 1;
            return item;
          });
          dispatch.danhSachDichVuKho.updateData({
            listDanhSachDichVuKho: listCustom,
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    getListDanhSachDichVuKho: ({ page = 0, dsKhoId, ...payload }, state) => {
      let size = payload.size || state.danhSachDichVuKho.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.danhSachDichVuKho.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.danhSachDichVuKho.dataSearch || {};
      const theoLo = payload.theoLo;
      debugger;
      danhSachDichVuKhoProvider
        .search({ page, size, sort, theoLo, ...dataSearch })
        // .search({ page, size, sort, theoLo, dsKhoId })
        .then((s) => {
          const listCustom = (s?.data || []).map((item, index) => {
            item.index = page * size + index + 1;
            return item;
          });
          dispatch.danhSachDichVuKho.updateData({
            listDanhSachDichVuKho: listCustom,
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    getChiTietDanhSachDichVuKho: (
      { page = 0, notUseParamsSearch = false, ...payload },
      state
    ) => {
      let size = payload.size || state.danhSachDichVuKho.size || 10;
      let sort = combineSort(
        payload.dataSortColumn || state.danhSachDichVuKho.dataSortColumn || {}
      );
      if (notUseParamsSearch) {
        sort = null;
      }
      // const dataSearch = payload.dataSearch || state.danhSachDichVuKho.dataSearch || {};
      const id = payload.id;
      const dichVuId = payload.dichVuId;
      danhSachDichVuKhoProvider
        // .search({ page, size, sort,theoLo, ...dataSearch })
        .search({ page, size, sort, khoId: id, dichVuId })
        .then((s) => {
          const listCustom = (s?.data || []).find((item, index) => {
            item.index = page * size + index + 1;
            return item;
          });
          dispatch.danhSachDichVuKho.updateData({
            selectedItem: listCustom,
            // totalElements: s?.totalElements || 0,
            // page,
            // size,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    onSortChange: ({ theoLo, ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachDichVuKho.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachDichVuKho.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachDichVuKho.search({
        page: 0,
        dataSortColumn,
        theoLo,
      });
    },

    capNhatGia: (payload, state) => {
      return new Promise((resolve, reject) => {
        khoTonKhoProvider
          .capNhatGia(payload)
          .then((s) => {
            message.success("Cập nhật giá thành công!");
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
