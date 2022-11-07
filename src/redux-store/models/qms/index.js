import nbDichVuKhamProvider from "data-access/nb-dv-kham-provider";
import nbDvCLSProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import nbXetNghiemProvider from "data-access/nb-dv-xet-nghiem-provider";
import goiSoProvider from "data-access/goi-so-provider";

import { message } from "antd";
export default {
  state: {
    listNbKham: [],
    listNbCls: [],
    listNbXetNghiem: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    checkInKham: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDichVuKhamProvider
          .checkIn(payload)
          .then((s) => {
            if (s?.code == 0) {
              
              resolve(s);
            } else {
              message.error(s.message || "Không tìm thấy thông tin bệnh nhân");
            }
          })
          .catch((e) => {
            message.error(e.message || "Không tìm thấy thông tin bệnh nhân");
            reject(e);
          });
      });
    },
    getDsNguoiBenhKhamQms: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDichVuKhamProvider
          .getDsNguoiBenhQms(payload)
          .then((s) => {
            dispatch.qms.updateData({ listNbKham: s?.data });
          })
          .catch((e) => {
            message.error(e.message || "Không tìm thấy thông tin bệnh nhân");
            reject(e);
          });
      });
    },
    checkInCLS: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvCLSProvider
          .checkIn(payload)
          .then((s) => {
            if (s?.code == 0) {
              
              resolve(s);
            } else {
              message.error(s.message || "Không tìm thấy thông tin bệnh nhân");
            }
          })
          .catch((e) => {
            message.error(e.message || "Không tìm thấy thông tin bệnh nhân");
            reject(e);
          });
      });
    },
    getDsNguoiBenhCLSQms: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvCLSProvider
          .getDsNguoiBenhQms(payload)
          .then((s) => {
            dispatch.qms.updateData({ listNbCls: s?.data });
          })
          .catch((e) => {
            message.error(e.message || "Không tìm thấy thông tin bệnh nhân");
            reject(e);
          });
      });
    },
    checkInXetNghiem: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbXetNghiemProvider
          .checkIn(payload)
          .then((s) => {
            if (s?.code == 0) {
              
              resolve(s);
            } else {
              message.error(s.message || "Không tìm thấy thông tin bệnh nhân");
            }
          })
          .catch((e) => {
            message.error(e.message || "Không tìm thấy thông tin bệnh nhân");
            reject(e);
          });
      });
    },
    getDsNguoiBenhXetNghiemQms: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbXetNghiemProvider
          .getDsNguoiBenhQms(payload)
          .then((s) => {
            dispatch.qms.updateData({ listNbXetNghiem: s?.data });
          })
          .catch((e) => {
            message.error(e.message || "Không tìm thấy thông tin bệnh nhân");
            reject(e);
          });
      });
    },
    getDsNguoiBenhTiepDon: (payload, state) => {
      return new Promise((resolve, reject) => {
        goiSoProvider
          .getDsNguoiBenhQms(payload)
          .then((s) => {
            dispatch.qms.updateData({ listNbTiepDon: s?.data });
          })
          .catch((e) => {
            message.error(e.message || "Không tìm thấy thông tin bệnh nhân");
            reject(e);
          });
      });
    },
  }),
};
