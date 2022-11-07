import nbDichVuXN from "data-access/nb-dv-xet-nghiem-provider";
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
      dispatch.layMauXN.updateData(initialState);
    },
    getDsDichVuChiDinhXN: (payload, state) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.layMauXN?.nbDotDieuTriId;
      const currentDsTrangThai = state.layMauXN.dsTrangThai;
      const sort = combineSort(
        payload.dataSortColumnDSDV || state.layMauXN.dataSortColumnDSDV || {}
      );
      const dataSearch =
        payload.dataSearchDSDV || state.layMauXN.dataSearchDSDV || {};
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .searchTongHop({
            sort,
            ...dataSearch,
            nbDotDieuTriId,
            ...(currentDsTrangThai.length
              ? { dsTrangThai: currentDsTrangThai }
              : {}),
          })
          .then((s) => {
            dispatch.layMauXN.updateData({
              listServices: s?.data || [],
            });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            dispatch.layMauXN.updateData({
              listServices: [],
            });
            reject(e);
          });
      });
    },
    xacNhanlayMau: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .xacNhanlayMau(payload)
            .then((s) => {
              if (s.code === 0) {
                message.success(
                  payload?.status === "accept"
                    ? t("xetNghiem.layMauThanhCong")
                    : t("xetNghiem.huyMauThanhCong")
                );
                resolve(s);
              } else {
                message.error(
                  s?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                );
              }
            })
            .catch((e) => {
              message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    onChangeInputSearchDSDV: (payload, state) => {
      const dataSearchDSDV = {
        nbDotDieuTriId: state.layMauXN.nbDotDieuTriId,
        ...(state.layMauXN.dataSearchDSDV || {}),
        ...payload,
      };

      dispatch.layMauXN.updateData({ dataSearchDSDV });
      dispatch.layMauXN.getDsDichVuChiDinhXN({ dataSearchDSDV });
    },
    onSortChangeDSDV: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.layMauXN.dataSortColumnDSDV,
        ...payload,
      };
      dispatch.layMauXN.updateData({
        dataSortColumnDSDV: dataSortColumn,
      });
      dispatch.layMauXN.getDsDichVuChiDinhXN({
        dataSortColumnDSDV: dataSortColumn,
      });
    },
    tiepNhan: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .tiepNhan(payload)
            .then((s) => {
              if (s?.code == 0) {
                message.success(
                  s?.message ||
                    t("xetNghiem.daTiepNhanDVCuaNguoiBenhVuiLongLayMau")
                );
                resolve(s);
              } else {
                reject(s);
              }
            })
            .catch((e) => {
              message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    postNbTiepTheo: (payload = {}, state) => {
      const { phongLayMauId, nbTiepTheoId } = payload;
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .postNbTiepTheo({ nbTiepTheoId }, phongLayMauId)
            .then((s) => {
              if (s?.code == 0) {
                resolve(s);
              } else {
                reject(s);
              }
            })
            .catch((e) => {
              message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    boQua: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .boQua(payload)
            .then((s) => {
              if (s?.code == 0) {
                resolve(s);
              } else {
                reject(s);
              }
            })
            .catch((e) => {
              message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
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
