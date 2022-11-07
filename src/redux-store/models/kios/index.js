import goiSoProvider from "data-access/goi-so-provider";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { message } from "antd";
export default {
  state: {
    uuTien: false,
    step: 0,
    infoGetNumber: {},
    doiTuong: 1,
    data: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getNumber: async (payload = {}) => {
      try {
        const { callback, ...restPayload } = payload;
        const response = await goiSoProvider.laySo(restPayload);
        if (response.code === 0) {
          dispatch.kios.updateData({
            infoGetNumber: response.data,
          });
          callback();
        } else {
          message.error(response.message.toString());
        }
      } catch (err) {
        message.error(err.message.toString());
      }
    },
    searchMaNbKiosk: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .kiemTraThanhToan(payload)
          .then((s) => {
            dispatch.kios.updateData({ data: s?.data });
          })
          .catch((e) => {
            message.error(e.message || "Không tìm thấy thông tin bệnh nhân");
          });
      });
    },
  }),
};
