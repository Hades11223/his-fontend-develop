import dichVuXNProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvCLSProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import { message } from "antd";
import printProvider from "data-access/print-provider";
import { t } from "i18next";

export default {
  state: {
    dsKetQuaXN: [],
    dsKetQuaDichVuCLS: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    getDsKetQuaXN: (payload, state) => {
      return new Promise((resolve, reject) => {
        const thongTinChiTiet = state.khamBenh.thongTinChiTiet || {};
        const payload = {
          chiDinhTuDichVuId: thongTinChiTiet.id,
          nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
          chiDinhTuLoaiDichVu: 10,
        };
        dichVuXNProvider
          .searchTongHop(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.ketQuaKham.updateData({
                dsKetQuaXN: s.data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    getDsKetQuaDichVuCLS: (payload, state) => {
      return new Promise((resolve, reject) => {
        const thongTinChiTiet = state.khamBenh.thongTinChiTiet || {};
        const payload = {
          chiDinhTuDichVuId: thongTinChiTiet.id,
          nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
          chiDinhTuLoaiDichVu: 10,
        };
        nbDvCLSProvider
          .getTongHopDichVuCLS(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.ketQuaKham.updateData({
                dsKetQuaDichVuCLS: s.data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    inPhieuKetLuanKham: ({
      loaiDonThuoc,
      nbDotDieuTriId,
      soPhieuId,
      phieuNhapXuatId,
      id,
      ...payload
    }) => {
      return new Promise((resolve, reject) => {
        nbDvKhamProvider
          .getPhieuChiDinhKetLuan({
            nbDotDieuTriId,
            soPhieuId,
            phieuNhapXuatId,
            id,
          })
          .then((s) => {
            printProvider
              .printPdf(s.data)
              .then(() => {
                console.info("Print success");
              })
              .catch((err) => {
                message.error(
                  err?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                );
              });
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
  }),
};
