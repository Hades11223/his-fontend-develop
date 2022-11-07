import dmThietLapProvider from "data-access/dm-thiet-lap-provider";
import { message } from "antd";
// import cacheUtils from "utils/cache-utils";
// import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
// import orderBy from "lodash/orderBy";

export default {
  state: {
    dataEditDefault: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    post: async (payload, state) => {
      return new Promise((resolve, reject) => {
        dmThietLapProvider
          .tichDiem(payload)
          .then((s) => {
            const { code, data, message: messageInfo } = s;
            if (code == 0) {
              dispatch.thietLapTichDiem.updateData({ dataEditDefault: data });
              message.success("Thêm mới thành công dữ liệu thiết lập tích điểm");
              resolve(s?.data);
            }
            else reject(s);
          })
          .catch((e) => {
            message.error(e?.message?.toString());
            reject(e);
          });
      });
    },
    get: async (payload, state) => {
      return new Promise((resolve, reject) => {
        dmThietLapProvider
          .getTichDiem(payload)
          .then((s) => {
            const { code, data, message: messageInfo } = s;
            if (code == 0) {
              dispatch.thietLapTichDiem.updateData({ dataEditDefault: data });
              // message.success("Thêm mới thành công dữ liệu thiế lập tích điểm");
              resolve(s?.data);
            }
            else reject(s);
          })
          .catch((e) => {
            message.error(e?.message?.toString());
            reject(e);
          });
      });
    },
  }),
};
