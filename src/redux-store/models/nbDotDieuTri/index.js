import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import nbGoiDvProvider from "data-access/nb-goi-dv-provider";
import { message } from "antd";
import { t } from "i18next";
import { cloneDeep } from "lodash";
import nbTuVongProvider from "data-access/nb-tu-vong-provider";
import nbChiSoSongProvider from "data-access/nb-chi-so-song-provider";
const initialState = {
  data: {},
  thongTinBenhNhan: {},
  chiPhiKb_Cb: {},
  listAllNbDotDieuTri: [],
  nbThongTinTuVong: {},
  thongTinHoSo: {},
  dsNbGoiDv: [],
  thongTinChiSoSong: {},
  chiTietNb: {},
  coTheRaVien: true,
};

export default {
  state: cloneDeep(initialState),
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData(state, payload = {}) {
      return { ...cloneDeep(initialState), ...payload };
    },
  },
  effects: (dispatch) => ({
    resetData: () => {
      dispatch.nbDotDieuTri.updateData(cloneDeep(initialState));
    },

    getById: (id, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .getNbDotDieuTriTongHopTheoId(id)
          .then((s) => {
            dispatch.nbDotDieuTri.updateData({ thongTinBenhNhan: s?.data });
            resolve(s);
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    getChiTietById: (id, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .getById(id)
          .then((s) => {
            dispatch.nbDotDieuTri.updateData({ chiTietNb: s?.data });
            resolve(s);
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    tongTienDieuTri: ({ id }, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .tongTienDieuTri(id)
          .then((s) => {
            dispatch.nbDotDieuTri.updateData({
              tienDieuTri: s.data,
              data: s.data,
            });
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    getThongTinNb: ({ nbThongTinId, ...param }) => {
      if (!nbThongTinId) {
        dispatch.nbDotDieuTri.updateData({
          thongTinBenhNhan: {},
        });
        return;
      }
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .searchNBDotDieuTriTongHop({ nbThongTinId, ...param })
          .then((s) => {
            dispatch.hoSoBenhAn.updateData({
              nbDotDieuTriId: s?.data[0].id,
              selectedMaHs: s?.data[0].maHoSo,
              lichSuKham: s?.data,
              soDotDieuTri: s?.data?.length,
            });
            resolve(s?.data[0]);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            dispatch.nbDotDieuTri.updateData({
              thongTinBenhNhan: [],
            });
            reject(e);
          });
      });
    },
    searchNBDotDieuTri: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .searchNBDotDieuTri(payload)
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    searchNBDotDieuTriTongHop: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .searchNBDotDieuTriTongHop(payload)
          .then((s) => {
            resolve(s);
            dispatch.nbDotDieuTri.updateData({
              listAllNbDotDieuTri: s.data,
            });
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    onUpdate: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .capNhatDotDieuTri(payload)
          .then((s) => {
            if (s?.code === 0) {
              dispatch.nbDotDieuTri.updateData({
                thongTinBenhNhan: s.data,
              });
              resolve(s);
            } else {
              resolve(s);
              if (s?.code !== 7950 && s?.code !== 7920)
                message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    getBangKeChiPhiKb_Cb: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .getBangKeChiPhiKb_Cb(payload)
          .then((s) => {
            if (s?.code === 0) {
              dispatch.nbDotDieuTri.updateData({
                chiPhiKb_Cb: s.data,
              });
              resolve(s);
            } else {
              resolve(s);
              if (s?.code !== 7950 && s?.code !== 7920)
                message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    mienGiam: (payload, state) => {
      let { id } = payload;

      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .mienGiam(id, { ...payload, id: null })
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success(t("common.suaThongTinThanhCong"));
            } else {
              resolve(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    updateThongTinRaVien: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .updateThongTinRaVien(payload)
          .then((s) => {
            message.success(t("common.capNhatThanhCong"));
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    putPhieuRaVien: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .putPhieuRaVien(payload)
          .then((s) => {
            if (s?.code == 0) {
              message.success(t("common.capNhatThanhCong"));
              resolve(s?.data);
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    getThongTinRaVien: (id) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .getThongTinRaVien(id)
          .then((s) => {
            dispatch.nbDotDieuTri.updateData({ nbThongTinRaVien: s?.data });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    getThongTinTuVong: (id) => {
      return new Promise((resolve, reject) => {
        nbTuVongProvider
          .getById(id)
          .then((s) => {
            dispatch.nbDotDieuTri.updateData({ nbThongTinTuVong: s?.data });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    updateThongTinTuVong: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbTuVongProvider
          .put(payload)
          .then((s) => {
            message.success(t("common.capNhatThanhCong"));
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    kiemTraRaVien: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .kiemTraRaVien(payload)
          .then((s) => {
            dispatch.nbDotDieuTri.updateData({ thongTinHoSo: s?.data });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    getChiSoSong: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbChiSoSongProvider
          .getChiSoSongByNb(payload)
          .then((s) => {
            console.log("s", s);
            if (s?.code === 0) {
              dispatch.nbDotDieuTri.updateData({
                thongTinChiSoSong: s?.data,
              });
              resolve(s.data);
            } else {
              reject(s);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  }),
};
