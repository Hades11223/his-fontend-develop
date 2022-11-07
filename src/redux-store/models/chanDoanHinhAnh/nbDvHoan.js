import nbDvHoanProvider from "data-access/nb-dv-hoan-provider";
import nbDvCdhaTdcnPtTtProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import { message } from "antd";

export default {
  state: {
    listDvKho: [],
    loaiDichVu: null,
    listLoaiDichVu: [],
    listDvTonKho: [],
    neededUpdateRecord: [],
    listGoiDv: [],
    listDvVatTu: [],
    listData: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    traDichVu: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvHoanProvider
          .traDichVu(payload)
          .then((s) => {
            if (s?.code === 0) {
              message.success("Hoàn dịch vụ thành công");
              resolve(s);
            } else {
              message.error(s?.message);
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e.message || "Hoàn dịch vụ thất bại");
            reject(e);
          });
      });
    },
    doiDichVu: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvHoanProvider
          .doiDichVu(payload)
          .then((s) => {
            if (s?.code === 0) {
              message.success("Hoàn dịch vụ thành công");
              resolve(s);
            } else {
              message.error(s?.message);
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e.message || "Hoàn dịch vụ thất bại");
            reject(e);
          });
      });
    },

    doiDichVuChuaTT: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaTdcnPtTtProvider
          .doiDichVuChuaTT(payload)
          .then((s) => {
            if (s?.code === 0) {
              message.success("Đổi dịch vụ thành công");
              resolve(s);
            } else {
              message.error(s?.message);
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e.message || "Đổi dịch vụ thất bại");
            reject(e);
          });
      });
    },

    getDsDichVu: (id) => {
      nbDvHoanProvider
        .get(id)
        .then((s) => {
          dispatch.nbDvHoan.updateData({ listData: s?.data });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    huyYeuCau: (id, state, payload) => {
      return new Promise((resolve, reject) => {
        nbDvHoanProvider
          .huyYeuCau(id, payload)
          .then((s) => {
            if (s?.code === 0) {
              message.success("Hủy hoàn dịch vụ thành công");
              resolve(s);
            } else {
              message.error(s?.message);
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e.message || "Hủy hoàn dịch vụ thất bại");
            reject(e);
          });
      });
    },
    inPhieuHoanDoiTra: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvHoanProvider
          .inPhieuHoanDoiTra(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s?.data);
            } else {
              message.error(s?.message);
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    traNhaThuoc: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvHoanProvider
          .traNhaThuoc(payload)
          .then((s) => {
            if (s?.code === 0) {
              message.success("Hoàn dịch vụ thành công");
              resolve(s);
            } else {
              message.error(s?.message);
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e.message || "Hoàn dịch vụ thất bại");
            reject(e);
          });
      });
    },
  }),
};
