import loaiBenhAnProvider from "data-access/categories/dm-loai-benh-an-provider";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import nbToDieuTriProvider from "data-access/nb-to-dieu-tri-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT, LOAI_DICH_VU } from "constants/index";
import { t } from "i18next";
import nbMuonNbProvider from "data-access/nb-muon-nb-provider";
import nbDvCdhaTdcnPtTtProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import nbDvXetNghiemProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvThuocProvider from "data-access/nb-dv-thuoc-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import nbDvVatTuProvider from "data-access/nb-dv-vat-tu-provider";

export default {
  state: {
    listNbLapBenhAn: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    dataSortColumn: {},
    thongTinBenhNhan: [],
    listNbTiepTheo: [],
    nbLapBenhAn: {},
    thongTinNb: {},
    listDsMuonNb: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.danhSachNguoiBenhNoiTru.updateData({
        page: 0,
        ...rest,
      });
      dispatch.danhSachNguoiBenhNoiTru.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.danhSachNguoiBenhNoiTru.updateData(newState);
      let size = payload.size || state.danhSachNguoiBenhNoiTru.size || 10;
      const sort = combineSort(
        payload.dataSortColumn ||
          state.danhSachNguoiBenhNoiTru.dataSortColumn ||
          {}
      );
      const dataSearch =
        payload.dataSearch || state.danhSachNguoiBenhNoiTru.dataSearch || {};

      nbDotDieuTriProvider
        .getNbNoiTru({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.danhSachNguoiBenhNoiTru.updateData({
            listNbLapBenhAn: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.danhSachNguoiBenhNoiTru.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachNguoiBenhNoiTru.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachNguoiBenhNoiTru.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachNguoiBenhNoiTru.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.danhSachNguoiBenhNoiTru.dataSearch || {}),
        ...payload,
      };
      dispatch.danhSachNguoiBenhNoiTru.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.danhSachNguoiBenhNoiTru.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getNbNoiTruById: (id) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider.getNbNoiTruById(id).then((s) => {
          if (s?.code === 0) {
            dispatch.danhSachNguoiBenhNoiTru.updateData({
              infoPatient: s?.data,
            });
            resolve(s?.data);
          } else {
            dispatch.danhSachNguoiBenhNoiTru.updateData({ infoPatient: {} });
          }
        });
      });
    },
    postLapBenhAn: (payload) => {
      const id = payload.id;
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .postLapBenhAn(id, { ...payload, id: null })
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success("Lập bệnh án thành công");
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    postNbToDieuTri: (payload) => {
      const id = payload.id;
      return new Promise((resolve, reject) => {
        nbToDieuTriProvider
          .postNbToDieuTri(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success("Tạo thành công");
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    tiepNhanVaoKhoa: (payload) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .tiepNhanVaoKhoa(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    tuChoiVaoKhoa: (payload) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .tuChoiVaoKhoa(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    huyTiepNhanVaoKhoa: (payload) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .huyTiepNhanVaoKhoa(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    choVaoVienLai: (payload) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .choVaoVienLai(payload)
          .then((s) => {
            if (s?.code === 0) {
              message.success("Cho vào viện lại thành công");
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    ketThucDieuTri: (payload) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .ketThucDieuTri(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            if (e?.code === 7987) {
              return dispatch.nbDotDieuTri.updateData({ coTheRaVien: false });
            }
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    duKienRaVien: (payload) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .duKienRaVien(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success(s?.message || t("common.capNhatThanhCong"));
            } else {
              reject(s);
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    nbMuonNb: (payload) => {
      return new Promise((resolve, reject) => {
        nbMuonNbProvider
          .post(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success(s?.message || t("common.capNhatThanhCong"));
            } else {
              reject(s);
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    getDanhSachMuonNb: ({ ...payload }) => {
      nbMuonNbProvider
        .search(payload)
        .then((s) => {
          if (s?.code === 0) {
            if (Array.isArray(s?.data)) {
              dispatch.danhSachNguoiBenhNoiTru.updateData({
                listDsMuonNb: s?.data,
              });
            } else {
              dispatch.danhSachNguoiBenhNoiTru.updateData({
                nbDaChuyenKhoa: s?.data,
              });
            }
          } else {
            message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          }
        })
        .catch((e) => {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
        });
    },
    duyetYeuCauMuonNb: (payload) => {
      return new Promise((resolve, reject) => {
        nbMuonNbProvider
          .duyetYeuCauMuonNb(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success(s?.message || t("common.capNhatThanhCong"));
            } else {
              reject(s);
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    ngatDieuTri: (payload) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .ngatDieuTri(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    deleteDichVu: (payload) => {
      return new Promise(async (resolve, reject) => {
        try {
          let resAll = [];

          const dsKham = payload.filter(
            (x) => x.loaiDichVu === LOAI_DICH_VU.KHAM
          );

          if (dsKham && dsKham.length > 0) {
            const resKham = await nbDvKhamProvider.onDeleteDichVu({
              listDeletingId: dsKham.map((x) => x.id),
            });

            resAll = [...resAll, ...resKham.data];
          }

          const dsCdhaTdcnPtTt = payload.filter(
            (x) =>
              x.loaiDichVu === LOAI_DICH_VU.CDHA ||
              x.loaiDichVu === LOAI_DICH_VU.PHAU_THUAT_THU_THUAT
          );

          if (dsCdhaTdcnPtTt && dsCdhaTdcnPtTt.length > 0) {
            const resCdha = await nbDvCdhaTdcnPtTtProvider.onDeleteDichVu({
              listDeletingId: dsCdhaTdcnPtTt.map((x) => x.id),
            });

            resAll = [...resAll, ...resCdha.data];
          }

          const dsXetNghiem = payload.filter(
            (x) => x.loaiDichVu === LOAI_DICH_VU.XET_NGHIEM
          );

          if (dsXetNghiem && dsXetNghiem.length > 0) {
            const resXetNghiem = await nbDvXetNghiemProvider.onDeleteDichVu({
              listDeletingId: dsXetNghiem.map((x) => x.id),
            });
            resAll = [...resAll, ...resXetNghiem.data];
          }

          const dsThuoc = payload.filter(
            (x) => x.loaiDichVu === LOAI_DICH_VU.THUOC
          );

          if (dsThuoc && dsThuoc.length > 0) {
            const resThuoc = await nbDvThuocProvider.onDeleteMultiDichVu({
              listDeletingId: dsThuoc.map((x) => x.id),
            });
            resAll = [...resAll, ...resThuoc.data];
          }

          const dsVatTu = payload.filter(
            (x) => x.loaiDichVu === LOAI_DICH_VU.VAT_TU
          );

          if (dsVatTu && dsVatTu.length > 0) {
            const resThuoc = await nbDvVatTuProvider.onDeleteMultiDichVu({
              listDeletingId: dsVatTu.map((x) => x.id),
            });
            resAll = [...resAll, ...resThuoc.data];
          }

          if (resAll.every((x) => x.code == 0)) {
            resolve();
          } else {
            reject(resAll);
          }
        } catch (e) {
          message.error(e?.message || "Có lỗi xảy ra");
          reject();
        }
      });
    },

    getDsDv: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .searchTongHop({ ...payload, size: "" })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.chiDinhDichVuThuoc.updateData({
                listDvThuoc: data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },

    postDsDvThuocTraKho: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .postDsDvThuocTraKho(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success(s?.message || t("common.themMoiThanhCongDuLieu"));
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },

    putDsDvThuocTraKho: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .putDsDvThuocTraKho(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success(s?.message || t("common.capNhatThanhCong"));
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },

    deleteDsDvThuocTraKho: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .deleteDsDvThuocTraKho(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success(s?.message || t("common.xoaDuLieuThanhCong"));
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    deleteDsDvThuocPhieuLinh: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .deleteDsDvThuocPhieuLinh(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success(s?.message || t("common.xoaDuLieuThanhCong"));
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    deleteDsDvVatTuPhieuLinh: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvVatTuProvider
          .deleteDsDvVatTuPhieuLinh(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success(s?.message || t("common.xoaDuLieuThanhCong"));
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
  }),
};
