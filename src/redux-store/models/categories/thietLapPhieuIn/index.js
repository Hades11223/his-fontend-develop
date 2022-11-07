import { message } from "antd";
import thietLapProvider from "data-access/dm-thiet-lap-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import cacheUtils from "utils/cache-utils";

export default {
  state: {
    listData: [],
    dataEditDefault: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getDanhSachPhieuIn: async (payload = {}, state) => {
      try {
        const response = await thietLapProvider.getPhieuIn(payload);
        let { data } = response;
        // const funcLevel = (listData, level) => {
        //   listData.forEach((item, index) => {
        //     if (item?.length <= 0) {
        //       return null;
        //     }
        //     let count = index + 1;
        //     if (level) {
        //       count = level + 1; // nếu có children thì cộng thêm level
        //     }
        //     item.level = count;
        //     if (item?.children?.length > 0) {
        //       funcLevel(item.children, count);
        //     }
        //   });
        // };
        // funcLevel(data);
        return dispatch.thietLapPhieuIn.updateData({
          listData: data,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    postDanhSachPhieuIn: async (payload = {}, state) => {
      try {
        const response = await thietLapProvider.postPhieuIn(payload);
        let { data } = response;
        message.success("Lưu thành công");
        console.log("data: ", data);
        return dispatch.thietLapPhieuIn.updateData({
          listData: data,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
  }),
};
