import nbHoaDonDienTu from "data-access/nb-hoa-don-dien-tu-provider";
import nbDichVuProvider from "data-access/dich-vu-provider";
import { message } from "antd";
import { PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { t } from "i18next";

export default {
  state: {
    listData: [],
    chuaThanhToan: 0,
    daThanhToan: 0,
    tongSo: 0,
    totalElements: 0,
    page: PAGE_DEFAULT,
    size: 10,
    dataSearch: {},
    dataSortColumn: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getStatistical: (dataSearch) => {
      nbHoaDonDienTu
        .getStatistical(dataSearch)
        .then((s) => {
          dispatch.dsHoaDonDienTu.updateData(s.data);
        })
        .catch((e) => {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
        });
    },
    onSizeChange: ({ size }, state) => {
      dispatch.dsHoaDonDienTu.updateData({
        size,
        page: 0,
      });
      dispatch.dsHoaDonDienTu.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dsHoaDonDienTu.updateData(newState);
      let size = payload?.size || state.dsHoaDonDienTu?.size;
      const sort = combineSort(
        payload?.dataSortColumn || state.dsHoaDonDienTu?.dataSortColumn || {}
      );
      const dataSearch =
        payload?.dataSearch || state?.dsHoaDonDienTu?.dataSearch || {};
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .search({ page, size, sort, ...dataSearch })
          .then((s) => {
            dispatch.dsHoaDonDienTu.updateData({
              listData: s.data,
              totalElements: s?.totalElements || 0,
              page,
            });
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            dispatch.dsHoaDonDienTu.updateData({
              listData: [],
              isLoading: false,
            });
          });
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dsHoaDonDienTu.dataSortColumn,
        ...payload,
      };
      dispatch.dsHoaDonDienTu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dsHoaDonDienTu.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dsHoaDonDienTu.dataSearch || {}),
        ...payload,
      };
      dispatch.dsHoaDonDienTu.updateData({
        page: 0,
        dataSearch: dataSearch,
      });
      dispatch.dsHoaDonDienTu.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getDsDichVuDefault: ({ id, phieuThuId }) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .getDsDichVuDefault({ nbDotDieuTriId: id, phieuThuId })
          .then((s) => {
            resolve(s);
          })
          .catch((s) => {
            reject("");
          });
      });
    },
    getDsDichVu: ({ listId = [], nbDotDieuTriId }) => {
      return new Promise((resolve, reject) => {
        const promises = listId.map((id) => {
          return new Promise((resolve, reject) => {
            nbDichVuProvider
              .searchNbDvTongHop({ phieuThuId: id, nbDotDieuTriId })
              .then((s) => {
                if (s.code === 0) {
                  resolve(s.data);
                } else {
                  resolve({});
                }
              })
              .catch((s) => {
                reject({});
              });
          });
        });
        Promise.all(promises).then((s) => {
          const newData = s.filter((el) => el);

          resolve(newData);
        });
      });
    },
    getDsPhieuThu: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .getDsPhieuThu(payload)
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject("");
          });
      });
    },
    xuatHoaDon: (payload) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .xuatHoaDon(payload)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
              message.success(t("thuNgan.xuatHoaDonThanhCong"));
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    luuNhapHoaDon: (payload) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .luuNhapHoaDon(payload)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
              message.success(t("thuNgan.taoMoiHoaDonThanhCong"));
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    xuatHoaDonNhap: ({ id }) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .xuatHoaDonNhap({ id })
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
              message.success(t("thuNgan.xuatHoaDonThanhCong"));
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    getDsDichVuChiTiet: ({ hoaDonId }) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .getDsDichVuChiTiet({ hoaDonId })
          .then((s) => {
            if (s.code === 0) {
              const newData = s.data.map((item) => ({
                ...item,
                soPhieuThu: item.soPhieu,
              }));
              resolve(newData);
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    getFileHoaDon: ({ id, lanGoi = 1, soLanGoi = 1 }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const hoaDon = await nbHoaDonDienTu.getFileHoaDon({ id });
          if (hoaDon?.code == 1017) {
            //{code: 1017, message: 'Lỗi xem hóa đơn: Mã 12: Lỗi không xác định', data: null}
            if (lanGoi < soLanGoi) {
              setTimeout(() => {
                dispatch.dsHoaDonDienTu
                  .getFileHoaDon({
                    id,
                    lanGoi: lanGoi + 1,
                    soLanGoi,
                  })
                  .then((s) => {
                    resolve(s);
                  })
                  .catch((e) => {
                    reject(e);
                  });
              }, 2000);
            } else {
              message.error(
                hoaDon?.message || t("common.xayRaLoiVuiLongThuLaiSau")
              );
              reject(hoaDon);
            }
          } else {
            resolve(hoaDon);
          }
        } catch (error) {
          message.error(error?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          reject(error);
        }
      });
    },
    deleteHoaDon: ({ id, lyDo }) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .deleteHoaDon({ id, lyDo })
          .then((s) => {
            if (s.code === 0) {
              message.success(t("thuNgan.xoaHoaDonThanhCong"));
              resolve(s.data);
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject({});
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    getChiTietHoaDon: ({ id }) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .getChiTietHoaDon({ id })
          .then((s) => {
            if (s.code === 0) {
              resolve(s.data);
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject({});
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    getBangKeKemHDDT: ({ id }) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .getBangKeKemHDDT({ id })
          .then((s) => {
            if (s.code === 0) {
              resolve(s?.data?.file?.pdf);
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject({});
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    getBienBanDieuChinh: ({ id }) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .getBienBanDieuChinh({ id })
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    dieuChinhHoaDon: ({ id }) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .dieuChinhHoaDon({ id })
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
              message.success(t("thuNgan.dieuChinhHoaDonThanhCong"));
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    capNhatHoaDon: (payload) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .capNhatHoaDon(payload?.hoaDonId, payload)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
              message.success(t("thuNgan.capNhatHoaDonThanhCong"));
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
  }),
};
