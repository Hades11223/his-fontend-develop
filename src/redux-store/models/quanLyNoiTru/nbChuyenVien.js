import nbChuyenVienProvider from "data-access/noiTru/nb-chuyen-vien-provider";
import { message } from "antd";

export default {
  state: {
    dsGiayChuyenTuyen: [],
    chiTietPhieu: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getDsGiayChuyenTuyen: (nbDotDieuTriId) => {
      return new Promise((resolve, reject) => {
        nbChuyenVienProvider
          .getDsGiayChuyenTuyen({ nbDotDieuTriId })
          .then((s) => {
            dispatch.nbChuyenVien.updateData({
              dsGiayChuyenTuyen: (s?.data || []).map((item, idx) => ({
                ...item,
                index: idx + 1,
              })),
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    inPhieuChuyenVienById: (id) => {
      return new Promise((resolve, reject) => {
        nbChuyenVienProvider
          .getPhieuChuyenVienById(id)
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    xoaGiayChuyenTuyen: (id) => {
      return new Promise((resolve, reject) => {
        nbChuyenVienProvider
          .delete(id)
          .then((s) => {
            resolve(s);
            message.success("Xóa giấy thành công!");
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    taoMoiGiayChuyenTuyen: (payload) => {
      return new Promise((resolve, reject) => {
        nbChuyenVienProvider
          .post(payload)
          .then((s) => {
            resolve(s);
            message.success("Thêm mới giấy thành công!");
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
