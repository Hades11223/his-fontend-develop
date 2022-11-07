import { message } from "antd";
import thietLapProvider from "data-access/dm-thiet-lap-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import cacheUtils from "utils/cache-utils";

export default {
  state: {
    listData: {},
    dataEditDefault: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getTachGopPhieuDVKT: async (payload = {}, state) => {
      try {
        const response = await thietLapProvider.getTachGopPhieuDVKT(payload);
        let { data: listData } = response;

        return dispatch.tachGopPhieuDVKT.updateData({
          listData,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    tachGopPhieuDVKT: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          thietLapProvider
            .tachGopPhieuDVKT(payload)
            .then((s) => {
              message.success("Thêm mới thành công dữ liệu thiết lập chung!");
              resolve();
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject();
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
  }),
};
