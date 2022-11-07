import nbDichVuXN from "data-access/nb-dv-xet-nghiem-provider";
import { combineSort } from "utils";
import { message } from "antd";
import { t } from "i18next";

export default {
  state: {
    nbDotDieuTriId: null,
    listServices: [],
    infoDichVu: {},
    dataSearchDSDV: {},
    dataSortColumnDSDV: {},
    dsTrangThai: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getDsDichVuChiDinhXN: (payload, state) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.xnGiaiPhauBenhViSinh?.nbDotDieuTriId;
      const sort = combineSort(
        payload.dataSortColumnDSDV ||
          state.xnGiaiPhauBenhViSinh.dataSortColumnDSDV ||
          {}
      );
      const dsTrangThai =
        payload.dataSearchDSDV?.dsTrangThai ||
        state.xnGiaiPhauBenhViSinh.dsTrangThai;
      const dataSearch =
        payload.dataSearchDSDV ||
        state.xnGiaiPhauBenhViSinh.dataSearchDSDV ||
        {};
      const dsNhomDichVuCap2Id =
        state?.xnGiaiPhauBenhViSinh.dsNhomDichVuCap2Id || null;
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .searchTongHop({
            sort,
            dsNhomDichVuCap2Id,
            ...dataSearch,
            nbDotDieuTriId,
            ...(dsTrangThai.length ? { dsTrangThai } : {}),
          })
          .then((s) => {
            dispatch.xnGiaiPhauBenhViSinh.updateData({
              listServices: s?.data || [],
            });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            dispatch.xnGiaiPhauBenhViSinh.updateData({
              listServices: [],
            });
          });
      });
    },
    onChangeInputSearchDSDV: (payload, state) => {
      const dataSearchDSDV = {
        nbDotDieuTriId: state.xnGiaiPhauBenhViSinh.nbDotDieuTriId,
        ...(state.xnGiaiPhauBenhViSinh.dataSearchDSDV || {}),
        ...payload,
      };
      dispatch.xnGiaiPhauBenhViSinh.updateData({
        dataSearchDSDV,
        dsTrangThai: payload?.dsTrangThai,
      });
      dispatch.xnGiaiPhauBenhViSinh.getDsDichVuChiDinhXN({ dataSearchDSDV });
    },
    onSortChangeDSDV: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.xnGiaiPhauBenhViSinh.dataSortColumnDSDV,
        ...payload,
      };
      dispatch.xnGiaiPhauBenhViSinh.updateData({
        dataSortColumnDSDV: dataSortColumn,
      });
      dispatch.xnGiaiPhauBenhViSinh.getDsDichVuChiDinhXN({
        dataSortColumnDSDV: dataSortColumn,
      });
    },
    xacNhanKetQua: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .xacNhanKetQua(payload)
            .then((s) => {
              if (s.code === 0) {
                message.success(
                  payload?.status === "accept"
                    ? t("xetNghiem.coKetQuaThanhCong")
                    : t("xetNghiem.huyCoKetQuaThanhCong")
                );
              } else {
                message.error(
                  s?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                );
              }
              resolve(s);
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
    capNhatKetQua: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .capNhatKetQua(payload)
            .then((s) => {
              if (s.code === 0) {
                message.success(
                  payload?.status
                    ? t("xetNghiem.coKetQuaThanhCong")
                    : t("xetNghiem.huyCoKetQuaThanhCong")
                );
              } else {
                message.error(
                  s?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                );
              }
              resolve(s);
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
    duyetKetQua: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          const { status } = payload;
          nbDichVuXN
            .duyetKetQua(payload)
            .then((s) => {
              message.success(
                status === "accept"
                  ? t("xetNghiem.duyetKetQuaThanhCong")
                  : t("xetNghiem.huyDuyetKetQuaThanhCong")
              );
              resolve(s);
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
    xacNhanTiepNhanMau: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .xacNhanTiepNhanMau(payload)
            .then((s) => {
              if (s.code === 0) {
                message.success(
                  payload?.status === "accept"
                    ? t("xetNghiem.tiepNhanMauThanhCong")
                    : t("xetNghiem.huyTiepNhanMauThanhCong")
                );
              } else {
                message.error(
                  s?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                );
              }
              resolve(s);
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
    getPhieuKetQua: (payload, state) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.xnGiaiPhauBenhViSinh?.nbDotDieuTriId;

      const currentDsTrangThai =
        payload.dataSearch || state.xnGiaiPhauBenhViSinh.dsTrangThai;
      const dsNhomDichVuCap2Id =
        state?.xnGiaiPhauBenhViSinh.dsNhomDichVuCap2Id || null;
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .getPhieuKetQua({
            nbDotDieuTriId,
            dsNhomDichVuCap2Id,
            ...payload,
            ...(currentDsTrangThai.length
              ? { dsTrangThai: currentDsTrangThai }
              : {}),
          })
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
  }),
};
