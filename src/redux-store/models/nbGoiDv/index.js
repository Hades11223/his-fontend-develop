import nbGoiDvProvider from "data-access/nb-goi-dv-provider";
import dmGoiDvProvider from "data-access/categories/dm-goi-dv-provider";
import nbDichVuTamUngProvider from "data-access/nb-goi-dv-tam-ung-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { t } from "i18next";

export default {
  state: {
    listNbGoiDv: [],
    listGoiDv: [],
    page: 0,
    size: 0,
    totalElements: 0,
    dataSortColumn: [],
    dataSortColumnChiTiet: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.nbGoiDv.updateData({
        page: 0,
        ...rest,
      });
      dispatch.nbGoiDv.onSearch({ ...rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.nbGoiDv.updateData(newState);
      let size = payload.size || state.nbGoiDv.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.nbGoiDv.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.nbGoiDv.dataSearch || {};

      nbGoiDvProvider
        .searchAll({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.nbGoiDv.updateData({
            listNbGoiDv: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          dispatch.nbGoiDv.updateData({
            listNbGoiDv: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.nbGoiDv.dataSortColumn,
        ...payload,
      };
      dispatch.nbGoiDv.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nbGoiDv.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.nbGoiDv.dataSearch || {}),
        ...payload,
      };
      dispatch.nbGoiDv.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.nbGoiDv.onSearch({
        page: 0,
        dataSearch,
      });
    },
    onThemNguoiBenh: ({ nbDotDieuTriId, goiDvId }, state) => {
      return new Promise((resolve, reject) => {
        if (!nbDotDieuTriId || !goiDvId) {
          if (!goiDvId) {
            message.error(t("goiDichVu.vuiLongChonGoiApDung"));
            reject();
          } else {
            message.error(t("goiDichVu.vuiLongChonNguoiBenh"));
            reject();
          }
          return;
        }
        nbGoiDvProvider
          .themNguoiBenh({ goiDvId, nbDotDieuTriId })
          .then((s) => {
            dispatch.nbGoiDv.onSearch({ page: 0 });
            resolve(s);
            message.success(t("common.themMoiThanhCongDuLieu"));
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    getGoiDvById: (id) => {
      return new Promise((resolve, reject) => {
        dmGoiDvProvider
          .getById(id)
          .then((s) => {
            dispatch.nbGoiDv.updateData({
              thongTinGoiDichVu: s.data,
            });
          })
          .catch((e) => {
            dispatch.nbGoiDv.updateData({
              thongTinGoiDichVu: null,
            });
          });
      });
    },
    getListGoiDv: (payload) => {
      return new Promise((resolve, reject) => {
        dmGoiDvProvider
          .searchAll(payload)
          .then((s) => {
            dispatch.nbGoiDv.updateData({
              listGoiDv: s.data,
            });
          })
          .catch((e) => {
            dispatch.nbGoiDv.updateData({
              listGoiDv: [],
            });
          });
      });
    },
    getById: (id, state) => {
      return new Promise((resolve, reject) => {
        nbGoiDvProvider
          .getTongHopId(id)
          .then((s) => {
            dispatch.nbGoiDv.updateData({
              thongTinNbGoiDv: s.data,
            });
            // dispatch.nbGoiDv.getGoiDvById(s.data?.goiDvId);
            dispatch.nbDotDieuTri.getById(s.data.nbDotDieuTriId);
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    getByNbThongTinId: ({ nbThongTinId }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.nbGoiDv.updateData({
          listNbGoiDv: [],
        });
        nbGoiDvProvider
          .searchAll({ nbThongTinId })
          .then((s) => {
            dispatch.nbGoiDv.updateData({
              listNbGoiDv: s.data,
            });
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    onHuySuDungGoi: (
      { nbDotDieuTriId, nbGoiDvId, lyDo, soTienTraLai },
      state
    ) => {
      return new Promise(async (resolve, reject) => {
        try {
          let res = null;
          if (soTienTraLai > 0) {
            res = await nbDichVuTamUngProvider.traLaiTienThua({
              nbDotDieuTriId,
              nbGoiDvId,
              tongTien: soTienTraLai,
            });
            dispatch.nbGoiDv.getById(nbGoiDvId);
          }
          res = await nbGoiDvProvider.huySuDung({ nbGoiDvId, lyDo });
          message.success(t("goiDichVu.huySuDungGoiThanhCong"));
          resolve(res.data);
        } catch (e) {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          reject(e);
        }
      });
    },
    onDungSuDungGoi: ({ nbGoiDvId, lyDo }, state) => {
      return new Promise(async (resolve, reject) => {
        nbGoiDvProvider
          .dungSuDung({ nbGoiDvId, lyDo })
          .then((s) => {
            if (s.code === 0) {
              message.success(t("goiDichVu.dungSuDungGoiThanhCong"));
              resolve(s?.data);
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    traLaiTienThua: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        nbDichVuTamUngProvider.traLaiTienThua(payload).then((s) => {
          if (s.code === 0) {
            resolve(s?.data);
          } else {
            message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          }
        });
      });
    },
    deleteGoiDv: (id, state) => {
      return new Promise(async (resolve, reject) => {
        nbGoiDvProvider
          .delete(id)
          .then((s) => {
            if (s.code === 0) {
              message.success(t("common.xoaDuLieuThanhCong"));
              dispatch.nbGoiDv.onSearch({
                dataSearch: state.nbGoiDv.dataSearch,
              });
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    onKetThucGoi: (id) => {
      return new Promise(async (resolve, reject) => {
        try {
          let res = null;
          res = await nbGoiDvProvider.ketThucGoi(id);
          dispatch.nbGoiDv.getById(id);
          message.success(t("goiDichVu.ketThucSuDungGoiThanhCong"));
          resolve(res.data);
        } catch (e) {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          reject(e);
        }
      });
    },
    onMienGiam: (payload) => {
      return new Promise(async (resolve, reject) => {
        nbGoiDvProvider
          .mienGiam(payload)
          .then((s) => {
            if (s.code === 0) {
              message.success(t("goiDichVu.taoMienGiamThanhCong"));
              dispatch.nbGoiDv.getById(payload.id);
              resolve(s.data);
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    onChotChiPhi: ({ id }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await nbGoiDvProvider.chotPhiPhi({ nbGoiDvId: id });
          dispatch.nbGoiDv.getById(id);
          message.success(t("goiDichVu.chotChiPhiGoiThanhCong"));
          resolve(res.data);
        } catch (e) {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          reject(e);
        }
      });
    },
  }),
};
