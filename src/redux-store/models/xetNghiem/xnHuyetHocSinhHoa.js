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
      dispatch.xnHuyetHocSinhHoa.updateData(initialState);
    },
    updateKetQuaXetNghiem: (payload, state) => {
      nbDichVuXN
        .updateXN(payload)
        .then((res) => {
          message.success(t("common.capNhatThanhCong"));
        })
        .catch((e) => {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
        });
    },
    getDsDichVuChiDinhXN: (payload, state) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.xnHuyetHocSinhHoa?.nbDotDieuTriId;
      const sort = combineSort(
        payload.dataSortColumnDSDV ||
          state.xnHuyetHocSinhHoa.dataSortColumnDSDV ||
          {}
      );
      const currentDsTrangThai =
        payload.dataSearchDSDV?.dsTrangThai ||
        state.xnHuyetHocSinhHoa.dsTrangThai;
      const dataSearch =
        payload.dataSearchDSDV || state.xnHuyetHocSinhHoa.dataSearchDSDV || {};
      const dsNhomDichVuCap2Id =
        state?.xnHuyetHocSinhHoa.dsNhomDichVuCap2Id || null;
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .searchTongHop({
            sort,
            ...dataSearch,
            nbDotDieuTriId,
            dsNhomDichVuCap2Id,
            ...(currentDsTrangThai?.length
              ? { dsTrangThai: currentDsTrangThai }
              : {}),
          })
          .then((s) => {
            dispatch.xnHuyetHocSinhHoa.updateData({
              listServices: s?.data || [],
            });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            dispatch.xnHuyetHocSinhHoa.updateData({
              listServices: [],
            });
          });
      });
    },

    onChangeInputSearchDSDV: (payload, state) => {
      const dataSearchDSDV = {
        nbDotDieuTriId: state.xnHuyetHocSinhHoa.nbDotDieuTriId,
        ...(state.xnHuyetHocSinhHoa.dataSearchDSDV || {}),
        ...payload,
      };
      dispatch.xnHuyetHocSinhHoa.updateData({
        dataSearchDSDV,
        dsTrangThai: payload?.dsTrangThai,
      });
      dispatch.xnHuyetHocSinhHoa.getDsDichVuChiDinhXN({ dataSearchDSDV });
    },
    onSortChangeDSDV: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.xnHuyetHocSinhHoa.dataSortColumnDSDV,
        ...payload,
      };
      dispatch.xnHuyetHocSinhHoa.updateData({
        dataSortColumnDSDV: dataSortColumn,
      });
      dispatch.xnHuyetHocSinhHoa.getDsDichVuChiDinhXN({
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
                message.success(t("common.capNhatThanhCong"));
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
              if (s.code === 0) {
                message.success(
                  status === "accept"
                    ? t("xetNghiem.duyetKetQuaThanhCong")
                    : t("xetNghiem.huyDuyetKetQuaThanhCong")
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
    getTongHopDichVu: (payload, state) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.xnHuyetHocSinhHoa?.nbDotDieuTriId;
      const sort = combineSort(
        payload.dataSortColumnDSDV ||
          state.xnHuyetHocSinhHoa.dataSortColumnDSDV ||
          {}
      );
      const currentDsTrangThai =
        payload.dataSearch || state.xnHuyetHocSinhHoa.dsTrangThai;
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .searchTongHop({
            nbDotDieuTriId,
            sort,
            ...payload,
            ...(currentDsTrangThai.length
              ? { dsTrangThai: currentDsTrangThai }
              : {}),
          })
          .then((s) => {
            resolve(s?.data[0]?.nbDotDieuTriId);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    getPhieuKetQua: (payload, state) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.xnHuyetHocSinhHoa?.nbDotDieuTriId;

      const currentDsTrangThai =
        payload.dataSearch || state.xnHuyetHocSinhHoa.dsTrangThai;
      const dsNhomDichVuCap2Id =
        state?.xnHuyetHocSinhHoa.dsNhomDichVuCap2Id || null;
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
