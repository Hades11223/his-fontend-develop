import nbPhieuThuProvider from "data-access/nb-phieu-thu-provider";
import nbPhieuThuThanhToanProvider from "data-access/nb-phieu-thu-thanh-toan-provider";
import nbTachPhieuThuProvider from "data-access/nb-tach-phieu-thu-provider";
import { message } from "antd";
import printProvider from "data-access/print-provider";
import danhSachHoSoBaoHiem79A46QD4201 from "../quyetToanBHYT/danhSachHoSoBaoHiem79A46QD4201";
import danhSachHoSoBaoHiem39a42Qd4201Provider from "data-access/quyetToanBHYT/danh-sach-ho-so-bao-hiem-39a-42-qd4201-provider";

export default {
  state: {
    dsDichVu: [],
    dsPhieuThu: [],
    chiTietPhieuThu: {},
    thongTinBenhNhan: {},
    thongTinPhieuThu: {},
    tienThanhToanDv: 0,
    tienDaNhan: 0,
    infoPrice: {},
    formPhieuThu: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getThongTinPhieuThu: (id) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuProvider
          .searchByIdTongHop(id)
          .then((s) => {
            dispatch.thuNgan.updateData({
              thongTinPhieuThu: s.data,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e?.message);
          });
      });
    },
    thanhToanPhieuThu: (
      {
        nbDotDieuTriId,
        dsPhuongThucTt,
        tongTien,
        tongTienPTTT,
        nbGoiDvId,
        tamUngLieuTrinh,
        inPhieuHoanKhiThanhToan,
        inPhieuThuKhiThanhToan,
        ...rest
      },
      state
    ) => {
      return new Promise(async (resolve, reject) => {
        try {
          let s = await nbPhieuThuThanhToanProvider.post({
            dsPhuongThucTt,
            ...rest,
          });
          message.success("Thanh toán phiếu thu thành công");
          dispatch.thuNgan.updateData({
            thongTinPhieuThu: s?.data || {},
          });

          dispatch.danhSachPhieuThu.onSearch({
            dataSearch: { nbDotDieuTriId },
            nbDotDieuTriId,
          });

          let tienThanhToanGoi = 0;
          if (tongTien < tongTienPTTT) {
            tienThanhToanGoi = tongTienPTTT - tongTien;
          }
          let promise = null;
          //tạo ra 1 biến để gom tất cả các phiếu in lại
          const pdfFiles = [];
          //in phieu hoàn khi thanh toán
          if (inPhieuHoanKhiThanhToan) {
            promise = new Promise((resolve, reject) => {
              dispatch.thuNgan
                .getThongTinPhieuThu(rest.id)
                .then((s) => {
                  resolve({
                    code: 0,
                    data: s.data,
                  });
                })
                .catch((e) => {
                  resolve({ code: 1, data: e });
                });
            });

            s = await promise;
            if (s.code == 0 && s?.data?.hoanUngId) {
              promise = new Promise((resolve, reject) => {
                dispatch.thuTamUng
                  .inPhieuTamUng(s?.data.hoanUngId)
                  .then((s) => {
                    resolve({ code: 0, data: s.data });
                  })
                  .catch((e) => {
                    resolve({ code: 1 });
                  });
              });
              s = await promise;
              if (s.code == 0 && s.data?.file) {
                pdfFiles.push(s?.data.file.pdf);
              }
            }
          }
          //in phieu thu khi thanh toán
          if (inPhieuThuKhiThanhToan) {
            promise = new Promise((resolve, reject) => {
              dispatch.danhSachPhieuThu
                .getPhieuInThuNgan({ phieuThuId: rest.id })
                .then((s) => {
                  resolve({
                    code: 0,
                    data: s,
                  });
                })
                .catch((e) => {
                  resolve({ code: 1, data: e });
                });
            });

            s = await promise;
            if (s?.data?.length) {
              pdfFiles.push(s?.data[0].filePdf);
            }
          }
          //thanh toán gói và in phiếu thu khi thanh toán
          if (tienThanhToanGoi && tamUngLieuTrinh) {
            const tienMatObj = (
              state.phuongThucTT.listAllPhuongThucThanhToan || []
            ).find((item) => item?.tienMat);
            promise = new Promise(async (resolve, reject) => {
              try {
                s = await dispatch.thanhToanGoi.onTaoThanhToan({
                  nbDotDieuTriId: nbDotDieuTriId,
                  nbGoiDvId: nbGoiDvId,
                  tongTien: tienThanhToanGoi,
                  dsPhuongThucTt: [
                    {
                      phuongThucTtId: tienMatObj?.id || 1,
                      tongTien: tienThanhToanGoi,
                    },
                  ],
                });

                s = await dispatch.thanhToanGoi.onPhieuThu(s?.id);
                resolve({ code: 0, data: s });
              } catch (error) {
                resolve({ code: 1, data: error });
              }
            });
            s = await promise;
            if (s.code == 0 && s.data?.file?.pdf) {
              pdfFiles.push(s.data?.file?.pdf);
            }

            message.success("Tạo thanh toán gói thành công");
          }

          printProvider.printMergePdf(pdfFiles);
          resolve(s.data);
        } catch (e) {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          reject(e);
        }
      });
    },
    postPhieuThuThanhToan: ({ nbDotDieuTriId, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuThanhToanProvider
          .post(rest)
          .then((s) => {
            message.success("Thanh toán phiếu thu thành công");

            dispatch.thuNgan.updateData({
              thongTinPhieuThu: s?.data || {},
            });

            dispatch.danhSachPhieuThu.onSearch({
              dataSearch: { nbDotDieuTriId },
              nbDotDieuTriId,
            });

            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    tachPhieuThu: (payload) => {
      const { nbDotDieuTriId, ...rest } = payload;
      return new Promise((resolve, reject) => {
        nbTachPhieuThuProvider
          .post(rest)
          .then((s) => {
            message.success("Chuyển phiếu thu thành công");
            resolve(s);
          })
          .catch((e) => {
            message.error(
              e?.code == 9210
                ? "Vui lòng chọn ít nhất 1 dịch vụ để chuyển phiếu thu"
                : e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
            );
            reject(e);
          });
      });
    },
    huyThanhToan: (id, state) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuProvider
          .huyThanhToan(id)
          .then((s) => {
            if (s?.code === 0) {
              message.success("Hủy thanh toán phiếu thu thành công");
              dispatch.thuNgan.updateData({
                thongTinPhieuThu: s?.data || {},
              });

              resolve(s.data);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    updateThoiGianTT: ({ id, ...rest }) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuProvider
          .patch({ id, ...rest })
          .then((s) => {
            if (s?.code === 0) {
              message.success("Cập nhật thời gian thanh toán thành công");

              resolve(s.data);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    kiemTraQuyetToanBH: (nbDotDieuTriId) => {
      return new Promise((resolve, reject) => {
        danhSachHoSoBaoHiem39a42Qd4201Provider
          .kiemTraQuyetToanXml1(nbDotDieuTriId)
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e?.message);
          });
      });
    },

    taoDayHoSo: (nbDotDieuTriId) => {
      return new Promise((resolve, reject) => {
        danhSachHoSoBaoHiem39a42Qd4201Provider
          .taoDayHoSoXml1(nbDotDieuTriId)
          .then((s) => {
            message.success("Đẩy quyết toán thành công");
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
