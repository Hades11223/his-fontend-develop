import { message } from "antd";
import { cloneDeep } from "lodash";
import khoPhieuNhapXuatGppProvider from "data-access/kho/kho-phieu-nhap-xuat-gpp-provider";
import { combineSort } from "utils";

const initData = {
  dataSearch: { dsLoaiNhapXuat: "120", trangThaiGpp: 10 },
  totalElements: 0,
  page: 0,
  listData: [],
  isLoading: false,

  chiTietLienThong: {},
  dsDayLienThongHangLoat: [],
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
      dispatch.lienThongGpp.updateData({
        page: 0,
        ...rest,
      });
      dispatch.lienThongGpp.onSearch({ ...rest });
    },

    searchLienThongGppByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        dataSearch: {
          ...state.lienThongGpp.dataSearch,
          ...payload,
        },
      };

      dispatch.lienThongGpp.updateData({
        page: 0,
        ...obj,
      });
      dispatch.lienThongGpp.onSearch({ ...obj });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.lienThongGpp.updateData(newState);
      let size = payload.size || state.lienThongGpp.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.lienThongGpp.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.lienThongGpp.dataSearch || {};

      khoPhieuNhapXuatGppProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.lienThongGpp.updateData({
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
          dispatch.lienThongGpp.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    getLienThongGpp: (id) => {
      return new Promise((resolve, reject) => {
        khoPhieuNhapXuatGppProvider
          .detail(id)
          .then((s) => {
            dispatch.lienThongGpp.updateData({ chiTietLienThong: s.data });
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    deleteLienThongGPP: (id, state) => {
      return new Promise((resolve, reject) => {
        khoPhieuNhapXuatGppProvider
          .delete(id)
          .then((s) => {
            const { code, message: messageInfo } = s;
            if (code === 0) {
              message.success("Xóa thành công liên thông");
              dispatch.lienThongGpp.getLienThongGpp(id);
              resolve(s.data);
            } else {
              message.error(messageInfo.toString());
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    dayLienThong: ({ ...rest }) => {
      return new Promise((resolve, reject) => {
        khoPhieuNhapXuatGppProvider
          .post(rest)
          .then((s) => {
            message.success("Đẩy thành công liên thông");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    capNhatLienThong: ({ id, ...rest }) => {
      return new Promise((resolve, reject) => {
        khoPhieuNhapXuatGppProvider
          .put({ id, ...rest })
          .then((s) => {
            dispatch.lienThongGpp.getLienThongGpp(id);
            message.success("Cập nhật thành công liên thông");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getDsLienThongHangLoat: (payload, state) => {
      khoPhieuNhapXuatGppProvider
        .search(payload)
        .then((s) => {
          dispatch.lienThongGpp.updateData({
            dsDayLienThongHangLoat: s?.data || [],
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.lienThongGpp.updateData({
            dsDayLienThongHangLoat: [],
          });
        });
    },
  }),
};
