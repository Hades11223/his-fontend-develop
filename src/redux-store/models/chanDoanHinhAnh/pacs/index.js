import pacsProvider from "data-access/pacs-provider";
import { message } from "antd";

export default {
  state: {
    pacsUrl: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getUrl: (payload) => {
      return new Promise((resolve, reject) => {
        pacsProvider
          .search(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s?.data);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Có lỗi xảy ra");
            reject(e);
          });
      });
    },
  }),
};
