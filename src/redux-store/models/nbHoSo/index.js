import nbHoSoProvider from "data-access/nb-ho-so-provider";
import { message } from "antd";
import nbDichVuXN from "data-access/nb-dv-xet-nghiem-provider";

export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getFilePdf: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbHoSoProvider
          .search(payload)
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getKetQuaXNPdf: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .getPhieuKetQua(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s?.data);
            } else {
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
