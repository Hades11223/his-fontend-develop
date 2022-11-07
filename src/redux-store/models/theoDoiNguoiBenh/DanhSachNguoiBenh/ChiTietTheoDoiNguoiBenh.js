import { message } from "antd";
import theoDoiNguoiBenhProvider from "data-access/theoDoiNguoiBenh/chi-tiet-theo-doi-nguoi-benh-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";

export default {
  state: {
    listChiTietTheoDoiNguoiBenh: [],
    // lichSuKham: [],
    totalElements: null,
    // selectedMaHs: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    searchByParams: (payload = {}, state) => {
      theoDoiNguoiBenhProvider
        .search({
          page: payload.page || 0,
          // size: payload.size || 9999,
          ...payload,
        })
        .then((s) => {
          dispatch.chiTietTheoDoiNguoiBenh.updateData({
            listChiTietTheoDoiNguoiBenh: s?.data || [],
            totalElements: s?.totalElements,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    themThongTinNgayDieuTri: (payload = {}, state) => {
      theoDoiNguoiBenhProvider
        .post({
          ...payload,
        })
        .then((s) => {
          // dispatch.chiTietTheoDoiNguoiBenh.updateData({
          //     listChiTietTheoDoiNguoiBenh: s?.data || [],
          //     totalElements: s?.totalElements,
          // });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    updateThongTin: (payload = {}, state) => {
      theoDoiNguoiBenhProvider
        .put({
          ...payload,
        })
        .then((s) => {
          // dispatch.chiTietTheoDoiNguoiBenh.updateData({
          //     listChiTietTheoDoiNguoiBenh: s?.data || [],
          //     totalElements: s?.totalElements,
          // });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    getNbCovid: (payload = {}, state) => {
      theoDoiNguoiBenhProvider
        .getNbCovid({
          ...payload,
        })
        .then((s) => {
          dispatch.chiTietTheoDoiNguoiBenh.updateData({
            nbDaKetThuc: s?.data || [],
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    postKetThuc: (payload = {}, state) => {
      theoDoiNguoiBenhProvider
        .postKetThuc({
          ...payload,
        })
        .then((s) => {
          message.success("Đã kết thúc theo dõi");
          dispatch.chiTietTheoDoiNguoiBenh.updateData({
            nbDaKetThuc: s?.data || [],
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    donThuocCovid: (payload) => {
      return new Promise((resolve, reject) => {
        theoDoiNguoiBenhProvider
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
        theoDoiNguoiBenhProvider
          .search({ ...payload, size: "" })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.chiDinhDichVuKho.updateData({
                listDvThuoc: data,
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
