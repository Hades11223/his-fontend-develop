import { message } from "antd";
import nbDocThuocCovidProvider from "data-access/theoDoiNguoiBenh/nb-don-thuoc-covid-provider";

export default {
  state: {
    listDichVuThuocCovid: [],
    totalElements: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    donThuocCovid: (payload) => {
      return new Promise((resolve, reject) => {
        nbDocThuocCovidProvider
          .donThuocCovid(payload)
          .then((s) => {
            resolve(s);
            message.success("Thêm thông tin thành công");
          })
          .catch((e) => message.error(e?.message || "Thêm thông tin thất bại"));
      });
    },
    getListDichVuThuoc: (payload) => {
      return new Promise((resolve, reject) => {
        nbDocThuocCovidProvider
          .search({ ...payload, size: "" })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.nbDocThuocCovid.updateData({
                listDichVuThuocCovid: data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
