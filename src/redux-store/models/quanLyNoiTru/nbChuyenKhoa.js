import nbChuyenKhoaProvider from "data-access/noiTru/nb-chuyen-khoa-provider";
import { message } from "antd";

export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    chuyenKhoa: (payload) => {
      return new Promise((resolve, reject) => {
        nbChuyenKhoaProvider
          .chuyenKhoa(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success("Chuyển khoa thành công");
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
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
