import choTiepDonDVProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import { combineSort } from "utils";
import { message } from "antd";
import { t } from "i18next";

const initialState = {
  nbDotDieuTriId: null,
  listServices: [],
  dataSearch: {},
  dataSortColumn: {},
  listBNXetNghiem: [],
  dataSearchDSDV: {},
  dataSortColumnDSDV: {},
  dsTrangThai: [],
};

export default {
  state: initialState,
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    resetData: () => {
      dispatch.choTiepDonDV.updateData(initialState);
    },
    getTongHopDichVuCLS: (payload, state, paramCheck) => {
      return new Promise(async (resolve, reject) => {
        dispatch.choTiepDonDV.updateData({ listServices: [] });
        try {
          const nbDotDieuTriId =
            payload.nbDotDieuTriId || state.choTiepDonDV?.nbDotDieuTriId;
          const currentDsTrangThai =
            payload.dataSearchDSDV?.dsTrangThai ||
            state.choTiepDonDV.dsTrangThai;
          const sort = combineSort(
            payload.dataSortColumnDSDV ||
              state.choTiepDonDV.dataSortColumnDSDV ||
              {}
          );
          const dataSearch =
            payload.dataSearchDSDV || state.choTiepDonDV.dataSearchDSDV || {};
          const dsPhongThucHienId =
            (paramCheck && state.dsBenhNhan.dsPhongThucHienId) || "";
          const s = await choTiepDonDVProvider.getTongHopDichVuCLS({
            sort,
            ...dataSearch,
            nbDotDieuTriId,
            ...(currentDsTrangThai?.length
              ? { dsTrangThai: paramCheck ? currentDsTrangThai : 15 }
              : {}),
            dsPhongThucHienId,
          });

          dispatch.choTiepDonDV.updateData({
            listServices: s?.data || [],
          });
          resolve(s?.data);
        } catch (e) {
          reject(e);
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.choTiepDonDV.updateData({
            listServices: [],
          });
        }
      });
    },
    onChangeInputSearch: (payload, state, paramCheck) => {
      const dataSearchDSDV = {
        nbDotDieuTriId: state.choTiepDonDV.nbDotDieuTriId,
        ...(state.choTiepDonDV.dataSearchDSDV || {}),
        ...payload,
      };
      dispatch.choTiepDonDV.updateData({
        dataSearchDSDV,
        dsTrangThai: payload?.dsTrangThai,
      });
      dispatch.choTiepDonDV.getTongHopDichVuCLS({ dataSearchDSDV }, paramCheck);
    },
    onSortChangeDSDV: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.choTiepDonDV.dataSortColumnDSDV,
        ...payload,
      };
      dispatch.choTiepDonDV.updateData({
        dataSortColumnDSDV: dataSortColumn,
      });
      dispatch.choTiepDonDV.getTongHopDichVuCLS({
        dataSortColumnDSDV: dataSortColumn,
      });
    },
    getTongHopDichVu: (payload, state, paramCheck) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.choTiepDonDV?.nbDotDieuTriId;
      const sort = combineSort(
        payload.dataSortColumnDSDV ||
          state.choTiepDonDV.dataSortColumnDSDV ||
          {}
      );
      const currentDsTrangThai =
        payload.dataSearch || state.choTiepDonDV.dsTrangThai;
      return new Promise((resolve, reject) => {
        choTiepDonDVProvider
          .getTongHopDichVuCLS({
            nbDotDieuTriId,
            sort,
            ...payload,
            ...(currentDsTrangThai?.length
              ? { dsTrangThai: paramCheck ? currentDsTrangThai : 15 }
              : {}),
          })
          .then((s) => {
            resolve(s?.data[0]?.nbDotDieuTriId);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    phanPhongDv: (payload) => {
      return new Promise((resolve, reject) => {
        try {
          choTiepDonDVProvider
            .phanPhong(payload)
            .then((s) => {
              message.success("Thêm mới dữ liệu thành công");
              resolve(s?.data);
            })
            .catch((e) => {
              // message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");

              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    tiepNhanDv: (payload, state) => {
      if (!state.dsBenhNhan.dsPhongThucHienId) {
        message.error("Chưa chọn phòng thực hiện");
        return;
      }
      return new Promise((resolve, reject) => {
        try {
          choTiepDonDVProvider
            .tiepNhan(state.dsBenhNhan.dsPhongThucHienId, payload)
            .then((s) => {
              message.success("Tiếp nhận DV thành công");
              resolve(s?.data);
            })
            .catch((e) => {
              console.log(e);
              if (e?.code !== 7609) {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              }
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    huyTiepNhanDv: (payload) => {
      return new Promise((resolve, reject) => {
        try {
          choTiepDonDVProvider
            .huyTiepNhan(payload)
            .then((s) => {
              if (s?.code === 0) {
                message.success("Hủy tiếp nhận DV thành công!");
                resolve(s?.data);
              } else {
                reject(s);
              }
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    coKetQuaDv: (payload) => {
      return new Promise((resolve, reject) => {
        try {
          choTiepDonDVProvider
            .coKetQua(payload)
            .then((s) => {
              message.success(t("common.traKetQuaDvThanhCong"));
              if (s?.code === 0) {
                resolve(s?.data);
              } else {
                reject(s);
              }
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    huyKetQuaDv: (payload) => {
      return new Promise((resolve, reject) => {
        try {
          choTiepDonDVProvider
            .huyKetQua(payload)
            .then((s) => {
              if (s?.code === 0) {
                message.success("Hủy kết quả DV thành công!");
                resolve(s?.data);
              } else {
                reject(s);
              }
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    updateKetQua: (payload) => {
      return new Promise((resolve, reject) => {
        try {
          choTiepDonDVProvider
            .nhapKetQua(payload)
            .then((s) => {
              message.success(t("common.luuKetQuaDvThanhCong"));
              resolve(s?.data);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    boQua: (payload) => {
      return new Promise((resolve, reject) => {
        try {
          choTiepDonDVProvider
            .boQua(payload)
            .then((s) => {
              message.success(t("common.luuKetQuaDvThanhCong"));
              resolve(s?.data);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    phieuKetQua: (payload) => {
      return new Promise((resolve, reject) => {
        try {
          choTiepDonDVProvider
            .phieuKetQua(payload)
            .then((s) => {
              resolve(s?.data);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },

    getPhieuKetQua: (payload) => {
      return new Promise((resolve, reject) => {
        try {
          choTiepDonDVProvider
            .getPhieuKetQua(payload)
            .then((s) => {
              resolve(s?.data);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
  }),
};
