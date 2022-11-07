import nbDvKhamKSKProvider from "data-access/nb-dv-kham-ksk-provider";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { message } from "antd";
import { cloneDeep } from "lodash";
import { t } from "i18next";

const initState = {
  thongTinKSK: {},
};

export default {
  state: cloneDeep(initState),
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData(state, payload = {}) {
      return { ...cloneDeep(initState), ...payload };
    },
  },
  effects: (dispatch) => ({
    getNbDichVuKhamKSK: (id, state) => {
      return new Promise((resolve, reject) => {
        nbDvKhamKSKProvider
          .getNbDvKhamKSK(id)
          .then((s) => {
            dispatch.nbDichVuKhamKSK.updateData({
              thongTinKSK: s?.data || {},
            });
            resolve(s);
          })
          .catch((err) => {
            message.error(err?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(err);
          });
      });
    },

    updateKhamKSK: ({ nbDotDieuTriId, ...rest }) => {
      return new Promise((resolve, reject) => {
        nbDvKhamKSKProvider
          .updateNbDvKhamKSK({
            nbDotDieuTriId,
            ...rest,
          })
          .then((s) => {
            if (s?.code === 0) {
              message.success("Cập nhật thành công khám sức khỏe");
              dispatch.nbDichVuKhamKSK.getNbDichVuKhamKSK(nbDotDieuTriId);
              resolve(s);
            } else {
              reject(s?.message);
            }
          })
          .catch((err) => {
            message.error(err?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(err);
          });
      });
    },

    hoanThanhKSK: ({ id, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .hoanThanhKSK({
            id,
            ...rest,
          })
          .then(async (s) => {
            if (s?.code === 0) {
              message.success("Hoàn thành thành công khám sức khỏe");
              const infoNb =
                await nbDotDieuTriProvider.getNbDotDieuTriTongHopTheoId(
                  state.khamBenh.thongTinChiTiet?.nbDotDieuTriId
                );

              dispatch.khamBenh.updateData({
                infoNb: infoNb.data,
              });
              resolve(s);
            } else {
              reject(s?.message);
            }
          })
          .catch((err) => {
            message.error(err?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(err);
          });
      });
    },

    huyHoanThanhKSK: ({ id, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .huyHoanThanhKSK({
            id,
            ...rest,
          })
          .then(async (s) => {
            if (s?.code === 0) {
              message.success("Hủy hoàn thành thành công khám sức khỏe");
              const infoNb =
                await nbDotDieuTriProvider.getNbDotDieuTriTongHopTheoId(
                  state.khamBenh.thongTinChiTiet?.nbDotDieuTriId
                );

              dispatch.khamBenh.updateData({
                infoNb: infoNb.data,
              });
              resolve(s);
            } else {
              reject(s?.message);
            }
          })
          .catch((err) => {
            message.error(err?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(err);
          });
      });
    },
  }),
};
