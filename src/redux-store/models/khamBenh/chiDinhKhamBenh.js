import nbDvKTProvider from "data-access/nb-dv-ky-thuat-provider";
import nbDvXNProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import nbDvNgoaiDieuTriProvider from "data-access/nb-dv-ngoai-dieu-tri-provider";
import nbBoChiDinhProvider from "data-access/nb-bo-chi-dinh-provider";
import dmBoChiDinhProvider from "data-access/categories/dm-bo-chi-dinh-provider";
import nbDvCLSProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import nbGoiDvProvider from "data-access/nb-goi-dv-provider";
import nbGoiDvChiTietProvider from "data-access/nb-goi-dv-chi-tiet-provider";
import { message } from "antd";
// import cacheUtils from "utils/cache-utils";
import printProvider from "data-access/print-provider";
import dichVuKyThuatProvider from "data-access/categories/dm-dv-ky-thuat-provider";
import { t } from "i18next";
import { LOAI_DICH_VU } from "constants/index.js";
import { groupBy } from "lodash";

export default {
  state: {
    configData: null,
    listDvKham: [],
    loaiDichVu: null,
    listLoaiDichVu: [],
    dsDichVuChiDinhXN: [],
    dsDichVuChiDinhKham: [],
    dsDichVuNgoaiDieuTri: [],
    dsDichVuChiDinhCls: [],
    dataPhieu: {},
    neededUpdateRecord: [],
    listGoiDv: [],
    collapseDichVuTemp: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    updateConfigData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    searchDvKSK: async ({ bacSiChiDinhId, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dichVuKyThuatProvider
          .searchDMDichVuTachPhong({ ...payload, dsDoiTuongSuDung: 40 })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.chiDinhKhamBenh.updateData({
                listDvKham: data,
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
    onSearchDichVu: async (
      { bacSiChiDinhId, dsDoiTuongSuDung, ...payload },
      state
    ) => {
      return new Promise((resolve, reject) => {
        dichVuKyThuatProvider
          .searchAll({ ...payload, dsDoiTuongSuDung })
          .then((s) => {
            let data = s?.data || [];
            dispatch.chiDinhKhamBenh.updateData({
              listDvKham: data,
              page: s.pageNumber || 0,
              size: s.pageSize || data?.length || 0,
              totalElements: s.totalElements || data?.length || 0,
            });
            resolve(s);
          })
          .catch((e) => {
            dispatch.chiDinhKhamBenh.updateData({
              listDvKham: [],
              page: 0,
              size: 0,
              totalElements: 0,
            });
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    onSearchGoiDichVu: async (
      { dsDoiTuongSuDung = 20, dsLoaiDichVu = [10, 20, 30, 40], ...payload },
      state
    ) => {
      try {
        const s = await dmBoChiDinhProvider.searchTongHop({
          ...payload,
          dsDoiTuongSuDung,
          dsLoaiDichVu,
        });
        let data = s?.data || [];

        dispatch.chiDinhKhamBenh.updateData({
          listGoiDv: data,
          pageGoiDv: s.pageNumber,
          sizeGoiDv: s.pageSize,
          totalElementsGoiDv: s.totalElements,
        });
      } catch (error) {
        dispatch.chiDinhKhamBenh.updateData({
          listGoiDv: [],
          pageGoiDv: 0,
          sizeGoiDv: 0,
          totalElementsGoiDv: 0,
        });
        message.error(error?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
      }
    },
    tamTinhTien: (
      {
        khoaChiDinhId,
        chiDinhTuDichVuId,
        nbDotDieuTriId,
        chiDinhTuLoaiDichVu = 10,
        dsDichVu = [],
        ...payload
      },
      state
    ) => {
      let { listLoaiDichVu } = state.chiDinhKhamBenh;
      let listUpdatedLoaiDichVu = dsDichVu.map(
        (item) => item.nbDichVu?.loaiDichVu
      );
      listUpdatedLoaiDichVu = [
        ...new Set([...listLoaiDichVu, ...listUpdatedLoaiDichVu]),
      ];

      if (!listUpdatedLoaiDichVu.length) return;
      dispatch.chiDinhKhamBenh.updateData({
        listLoaiDichVu: listUpdatedLoaiDichVu,
      });

      const tamTinhTienDVKham = new Promise((resolve, reject) => {
        const body = dsDichVu.filter(
          (item) => item.nbDichVu.loaiDichVu === LOAI_DICH_VU.KHAM
        );
        if (body.length)
          return nbDvKhamProvider
            .tamTinhTienDVKham(body)
            .then((s) => {
              if (s?.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        else resolve(0);
      });

      const tamTinhTienDVXN = new Promise((resolve, reject) => {
        const body = dsDichVu.filter(
          (item) => item.nbDichVu.loaiDichVu === LOAI_DICH_VU.XET_NGHIEM
        );
        if (body.length)
          return nbDvXNProvider
            .tamTinhTienDVXN(body)
            .then((s) => {
              if (s?.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        else resolve(0);
      });
      const tamTinhTienDVCLS = new Promise((resolve, reject) => {
        const body = dsDichVu.filter(
          (item) =>
            item.nbDichVu.loaiDichVu === LOAI_DICH_VU.CDHA ||
            item.nbDichVu.loaiDichVu === LOAI_DICH_VU.PHAU_THUAT_THU_THUAT
        );
        if (body.length)
          return nbDvCLSProvider
            .tamTinhTienDVCLS(body)
            .then((s) => {
              if (s?.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        else resolve(0);
      });

      const tamTinhTienDVNgoaiDieuTri = new Promise((resolve, reject) => {
        const body = dsDichVu.filter(
          (item) => item.nbDichVu.loaiDichVu === LOAI_DICH_VU.NGOAI_DIEU_TRI
        );
        if (body.length)
          return nbDvNgoaiDieuTriProvider
            .tamTinhTienDVNgoaiDieuTri(body)
            .then((s) => {
              if (s?.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        else resolve(0);
      });

      return Promise.all([
        tamTinhTienDVKham,
        tamTinhTienDVXN,
        tamTinhTienDVCLS,
        tamTinhTienDVNgoaiDieuTri,
      ])
        .then((response) => {
          let dataTamTinhTien = [];
          response.forEach((res) => {
            if (res === 0) return;
            const tinhTien = res.data.map((item) => {
              const _findDv = dsDichVu.find(
                (x) => x.nbDichVu?.dichVuId === item.nbDichVu?.dichVuId
              );
              return {
                nbDotDieuTriId: nbDotDieuTriId,
                nbDichVu: {
                  dichVu: item.nbDichVu?.dichVu,
                  dichVuId: item.nbDichVu?.dichVuId,
                  soLuong: item.nbDichVu?.soLuong,
                  chiDinhTuDichVuId: chiDinhTuDichVuId,
                  chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
                  khoaChiDinhId: khoaChiDinhId,
                  loaiDichVu:
                    item.nbDichVu?.loaiDichVu || _findDv.nbDichVu?.loaiDichVu,
                  thanhTien: item.nbDichVu?.thanhTien,
                  nbGoiDvId: item.nbDichVu?.nbGoiDvId || undefined,
                  nbGoiDvChiTietId:
                    item.nbDichVu?.nbGoiDvChiTietId || undefined,
                  loaiHinhThanhToanId: item?.nbDichVu?.loaiHinhThanhToanId,
                  tyLeTtDv: _findDv?.nbDichVu?.tyLeTtDv,
                },
                nbDvKyThuat: {
                  phongId: item.nbDvKyThuat?.phongId,
                  tuVanVienId: item.nbDvKyThuat?.tuVanVienId,
                },
                nbChanDoan: {
                  cdSoBo: "",
                },
                boChiDinhId: _findDv ? _findDv.boChiDinhId : undefined,
              };
            });
            dataTamTinhTien = [...dataTamTinhTien, ...tinhTien];
          });
          dispatch.chiDinhKhamBenh.updateData({
            dataTamTinhTien,
          });
          return dataTamTinhTien;
        })
        .catch((e) => {
          message.error(e?.message);
        });
    },
    chiDinhDichVu: async (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { listLoaiDichVu } = state.chiDinhKhamBenh;

        let { dsDichVuCanBoSung = [], dataTamTinhTien } = payload;

        const chiDinhGoiDV = new Promise((resolve, reject) => {
          const body = dataTamTinhTien.filter((item) => item.boChiDinhId);
          const groupedBody = groupBy(body, "boChiDinhId");
          let sendBody = [];
          Object.keys(groupedBody).forEach((element) => {
            sendBody.push({
              nbDotDieuTriId: groupedBody[element][0].nbDotDieuTriId,
              boChiDinhId: element,
              dsKham:
                groupedBody[element].filter(
                  (item) => item.nbDichVu.loaiDichVu === LOAI_DICH_VU.KHAM
                ) || null,
              dsXetNghiem:
                groupedBody[element].filter(
                  (item) => item.nbDichVu.loaiDichVu === LOAI_DICH_VU.XET_NGHIEM
                ) || null,
              dsCdhaTdcnPtTt:
                groupedBody[element].filter(
                  (item) =>
                    item.nbDichVu.loaiDichVu === LOAI_DICH_VU.CDHA ||
                    item.nbDichVu.loaiDichVu ===
                      LOAI_DICH_VU.PHAU_THUAT_THU_THUAT
                ) || null,
              dsNgoaiDieuTri:
                groupedBody[element].filter(
                  (item) =>
                    item.nbDichVu.loaiDichVu === LOAI_DICH_VU.NGOAI_DIEU_TRI
                ) || null,
              dsThuoc:
                groupedBody[element].filter(
                  (item) => item.nbDichVu.loaiDichVu === LOAI_DICH_VU.THUOC
                ) || null,
              dsVatTu:
                groupedBody[element].filter(
                  (item) => item.nbDichVu.loaiDichVu === LOAI_DICH_VU.VAT_TU
                ) || null,
              dsHoaChat:
                groupedBody[element].filter(
                  (item) => item.nbDichVu.loaiDichVu === LOAI_DICH_VU.HOA_CHAT
                ) || null,
              dsChePhamMau:
                groupedBody[element].filter(
                  (item) =>
                    item.nbDichVu.loaiDichVu === LOAI_DICH_VU.CHE_PHAM_MAU
                ) || null,
            });
          });

          if (sendBody.length)
            return nbBoChiDinhProvider
              .chiDinhGoiDV(sendBody)
              .then((s) => {
                if (s.code === 0) {
                  resolve(s);
                } else {
                  reject(s);
                }
              })
              .catch((e) => {
                reject(e);
              });
          else resolve(0);
        });

        const chiDinhDVKham = new Promise((resolve, reject) => {
          const body = dataTamTinhTien.filter(
            (item) =>
              item.nbDichVu.loaiDichVu === LOAI_DICH_VU.KHAM &&
              !item.boChiDinhId
          );
          if (body.length)
            return nbDvKhamProvider
              .chiDinhDVKham(body)
              .then((s) => {
                if (s.code === 0) {
                  resolve(s);
                } else {
                  reject(s);
                }
              })
              .catch((e) => {
                reject(e);
              });
          else resolve(0);
        });

        const chiDinhDVXN = new Promise((resolve, reject) => {
          const body = dataTamTinhTien.filter(
            (item) =>
              item.nbDichVu.loaiDichVu === LOAI_DICH_VU.XET_NGHIEM &&
              !item.boChiDinhId
          );
          if (body.length)
            return nbDvXNProvider
              .chiDinhXN(body)
              .then((s) => {
                if (s.code === 0) {
                  resolve(s);
                } else {
                  reject(s);
                }
              })
              .catch((e) => {
                reject(e);
              });
          else resolve(0);
        });

        const chiDinhDVCLS = new Promise((resolve, reject) => {
          const body = dataTamTinhTien.filter(
            (item) =>
              (item.nbDichVu.loaiDichVu === LOAI_DICH_VU.CDHA ||
                item.nbDichVu.loaiDichVu ===
                  LOAI_DICH_VU.PHAU_THUAT_THU_THUAT) &&
              !item.boChiDinhId
          );
          if (body.length)
            nbDvCLSProvider
              .chiDinhCLS(body)
              .then((s) => {
                if (s.code === 0) {
                  resolve(s);
                } else {
                  reject(s);
                }
              })
              .catch((e) => {
                reject(e);
              });
          else resolve(0);
        });

        const chiDinhNgoaiDieuTri = new Promise((resolve, reject) => {
          const body = dataTamTinhTien
            .filter(
              (item) =>
                item.nbDichVu.loaiDichVu === LOAI_DICH_VU.NGOAI_DIEU_TRI &&
                !item.boChiDinhId
            )
            .map((item) => ({
              ...item,
              phongThucHienId: item.nbDvKyThuat?.phongThucHienId,
            }));
          if (body.length)
            nbDvNgoaiDieuTriProvider
              .chiDinhNgoaiDieuTri(body)
              .then((s) => {
                if (s.code === 0) {
                  resolve(s);
                } else {
                  reject(s);
                }
              })
              .catch((e) => {
                reject(e);
              });
          else resolve(0);
        });

        Promise.all([
          chiDinhDVKham,
          chiDinhDVXN,
          chiDinhDVCLS,
          chiDinhGoiDV,
          chiDinhNgoaiDieuTri,
        ])
          .then((response) => {
            let errMessage = [];
            response.forEach((res) => {
              if (res === 0) return;
              const updatingRecord = res.data.filter(
                (item) => item.code && item.code !== 0
              );
              const listMessages = res.data
                .filter((item) => item.code && item.code !== 0)
                .map(
                  (item2) =>
                    `(${item2?.nbDichVu?.dichVu?.ten} - ${item2.message})`
                );
              errMessage = [...errMessage, ...listMessages];
              dsDichVuCanBoSung = [...dsDichVuCanBoSung, ...updatingRecord];
            });

            errMessage = [...new Set(errMessage)];
            if (errMessage.length) {
              message.error(errMessage.join());
            } else {
              message.success(t("common.capNhatThanhCong"));
            }
            resolve({
              code: 0,
              dsDichVuCanBoSung,
              response,
              errMessage,
            });
            let listDichVu = [];
            response.forEach((item) => {
              if (item?.data) {
                listDichVu = [...listDichVu, ...item?.data];
              }
            });
            dispatch.chiDinhKhamBenh.getDsDichVuChiDinh({
              listLoaiDichVu,
              listDichVu,
              dsDichVuCanBoSung,
            });
          })
          .catch((e) => {
            message.error(e?.message);
            reject(e);
          });
      });
    },
    getDsDichVuChiDinhXN: (payload, state) => {
      return new Promise((resolve, reject) => {
        const {
          chiDinhTuDichVuId,
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          thongTinNguoiBenh,
        } = state.chiDinhKhamBenh.configData;
        const isKsk =
          thongTinNguoiBenh?.khamSucKhoe || thongTinNguoiBenh?.loaiDoiTuongKsk;
        const payload = {
          chiDinhTuDichVuId: isKsk ? undefined : chiDinhTuDichVuId,
          nbDotDieuTriId: nbDotDieuTriId,
          chiDinhTuLoaiDichVu: isKsk ? undefined : chiDinhTuLoaiDichVu,
          dsTrangThaiHoan: [0, 10, 20],
          page: "",
          size: "",
        };
        nbDvXNProvider
          .searchTongHop(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhKhamBenh.updateData({
                dsDichVuChiDinhXN: s.data,
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
    getDsDichVuChiDinh: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        const {
          listLoaiDichVu,
          listDichVu = [],
          dsDichVuCanBoSung = [],
        } = payload; //dsDichVuCanBoSung là các dịch vụ lỗi, dịch vụ chưa được kê
        //danh sách các mã phiếu đang active
        let activeKey = [...(state.chiDinhKhamBenh.collapseDichVuTemp || [])];
        let listPhieuIds = null;

        if (listLoaiDichVu.includes(LOAI_DICH_VU.KHAM)) {
          let res = await dispatch.chiDinhKhamBenh.getDsDichVuChiDinhKham();
          listPhieuIds = res.data
            .filter((item) => listDichVu.some((item1) => item1.id === item.id))
            .map(
              (itemLast) =>
                `${itemLast.soPhieu}-${itemLast.tenPhieuChiDinh}-${itemLast.diaDiemPhongThucHien}`
            );
          activeKey = [...activeKey, ...listPhieuIds];
        }
        if (listLoaiDichVu.includes(LOAI_DICH_VU.XET_NGHIEM)) {
          let res = await dispatch.chiDinhKhamBenh.getDsDichVuChiDinhXN();
          listPhieuIds = res.data
            .filter((item) => listDichVu.some((item1) => item1.id === item.id))
            .map(
              (itemLast) =>
                `${itemLast.soPhieu}-${itemLast.tenPhieuChiDinh}-${itemLast.diaDiemPhongThucHien}`
            );
          activeKey = [...activeKey, ...listPhieuIds];
        }
        if (
          listLoaiDichVu.includes(LOAI_DICH_VU.CDHA) ||
          listLoaiDichVu.includes(LOAI_DICH_VU.PHAU_THUAT_THU_THUAT)
        ) {
          let res = await dispatch.chiDinhKhamBenh.getDsDichVuChiDinhCLS();
          listPhieuIds = res.data
            .filter((item) => listDichVu.some((item1) => item1.id === item.id))
            .map(
              (itemLast) =>
                `${itemLast.soPhieu}-${itemLast.tenPhieuChiDinh}-${itemLast.diaDiemPhongThucHien}`
            );
          activeKey = [...activeKey, ...listPhieuIds];
        }
        if (listLoaiDichVu.includes(LOAI_DICH_VU.NGOAI_DIEU_TRI)) {
          let res = await dispatch.chiDinhKhamBenh.getDsDichVuNgoaiDieuTri();
          listPhieuIds = res.data
            .filter((item) => listDichVu.some((item1) => item1.id === item.id))
            .map(
              (itemLast) =>
                `${itemLast.soPhieu}-${itemLast.tenPhieuChiDinh}-${itemLast.diaDiemPhongThucHien}`
            );
          activeKey = [...activeKey, ...listPhieuIds];
        }
        dispatch.chiDinhKhamBenh.updateData({
          collapseDichVu: activeKey, //set activeKey vào collapseDichVu
          collapseDichVuTemp: dsDichVuCanBoSung?.length ? activeKey : [], //khi đang còn dịch vụ pending thì vẫn giữ lại danh sách các activeKey
        });
      });
    },
    getDsDichVuChiDinhKham: (payload, state) => {
      return new Promise((resolve, reject) => {
        const {
          chiDinhTuDichVuId,
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          thongTinNguoiBenh,
        } = state.chiDinhKhamBenh.configData;
        const isKsk =
          thongTinNguoiBenh?.khamSucKhoe || thongTinNguoiBenh?.loaiDoiTuongKsk;
        const payload = {
          chiDinhTuDichVuId: isKsk ? undefined : chiDinhTuDichVuId,
          nbDotDieuTriId: nbDotDieuTriId,
          chiDinhTuLoaiDichVu: isKsk ? undefined : chiDinhTuLoaiDichVu,
          dsTrangThaiHoan: [0, 10, 20],
        };
        nbDvKhamProvider
          .getDsDichVuChiDinhKham(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhKhamBenh.updateData({
                dsDichVuChiDinhKham: s.data,
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
    getDsDichVuChiDinhCLS: (payload, state) => {
      return new Promise((resolve, reject) => {
        const {
          chiDinhTuDichVuId,
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          thongTinNguoiBenh,
        } = state.chiDinhKhamBenh.configData;
        const payload = {
          chiDinhTuDichVuId: thongTinNguoiBenh?.khamSucKhoe
            ? undefined
            : chiDinhTuDichVuId,
          nbDotDieuTriId: nbDotDieuTriId,
          chiDinhTuLoaiDichVu: thongTinNguoiBenh?.khamSucKhoe
            ? undefined
            : chiDinhTuLoaiDichVu,
          dsTrangThaiHoan: [0, 10, 20],
        };
        nbDvCLSProvider
          .getDsDichVuChiDinhCLS(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhKhamBenh.updateData({
                dsDichVuChiDinhCls: s.data,
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
    getDsDichVuNgoaiDieuTri: (payload, state) => {
      return new Promise((resolve, reject) => {
        const {
          chiDinhTuDichVuId,
          nbDotDieuTriId,
          chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu,
        } = state.chiDinhKhamBenh.configData;
        const payload = {
          chiDinhTuDichVuId: chiDinhTuDichVuId,
          nbDotDieuTriId: nbDotDieuTriId,
          chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
          dsChiDinhTuLoaiDichVu: dsChiDinhTuLoaiDichVu,
          dsTrangThaiHoan: [0, 10, 20],
          page: "",
          size: "",
        };
        nbDvNgoaiDieuTriProvider
          .searchTongHop(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhKhamBenh.updateData({
                dsDichVuNgoaiDieuTri: s.data,
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
    getNBSoPhieuCLS: ({ page, loaiDichVu }, state) => {
      return new Promise((resolve, reject) => {
        const { nbDotDieuTriId } = state.chiDinhKhamBenh.configData;
        const data = {
          nbDotDieuTriId: nbDotDieuTriId,
          page,
          loaiDichVu,
        };
        nbDvKTProvider
          .getNBSoPhieuCLS(data)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhKhamBenh.updateData({
                soPhieuCls: s.data.map((item) => ({
                  id: item.id,
                  ten: item.soPhieu,
                })),
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
    getDsSoPhieuCLS: ({ page, loaiDichVu, nbDotDieuTriId }, state) => {
      return new Promise((resolve, reject) => {
        const data = {
          nbDotDieuTriId,
          page,
          loaiDichVu,
        };
        nbDvKTProvider
          .getNBSoPhieuCLS(data)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhKhamBenh.updateData({
                soPhieuCls: s.data.map((item) => ({
                  id: item.id,
                  ten: item.soPhieu,
                })),
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
    onDeleteDichVu: ({ id, loaiDichVu, listDeletingId }, state) => {
      return new Promise((resolve, reject) => {
        let provider = null;
        switch (loaiDichVu) {
          case LOAI_DICH_VU.KHAM: //kham
            provider = nbDvKhamProvider;
            break;
          case LOAI_DICH_VU.XET_NGHIEM: //xet nghiem
            provider = nbDvXNProvider;
            break;
          case LOAI_DICH_VU.CDHA:
          case LOAI_DICH_VU.PHAU_THUAT_THU_THUAT:
            provider = nbDvCLSProvider;
            break;
          case LOAI_DICH_VU.NGOAI_DIEU_TRI:
            provider = nbDvNgoaiDieuTriProvider;
            break;
          default:
            break;
        }
        if (provider && provider.onDeleteDichVu) {
          provider
            .onDeleteDichVu({ id, listDeletingId })
            .then((s) => {
              if (s.code === 0) {
                const resultError =
                  s?.data?.filter((item) => item.code !== 0) || [];
                resultError.forEach((item) =>
                  message.error(
                    item?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                  )
                );
                if (resultError.length) {
                } else {
                  message.success(
                    t("khamBenh.xoaThanhCongDuLieuChiDinhDichVu")
                  );
                }
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        }
      });
    },
    themThongTinDV: ({ body, id, loaiDichVu }, state) => {
      if (loaiDichVu === 10)
        return new Promise((resolve, reject) => {
          nbDvKhamProvider
            .themThongTinDV(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success(t("common.capNhatThanhCong"));
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        });
      if (loaiDichVu === 20)
        return new Promise((resolve, reject) => {
          nbDvXNProvider
            .themThongTinDV(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success(t("common.capNhatThanhCong"));
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        });
      if (loaiDichVu === 30 || loaiDichVu === 40)
        return new Promise((resolve, reject) => {
          nbDvCLSProvider
            .themThongTinDV(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success(t("common.capNhatThanhCong"));
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        });

      if (loaiDichVu === 60)
        return new Promise((resolve, reject) => {
          nbDvNgoaiDieuTriProvider
            .patchDVNgoaiDieuTri(body)
            .then((s) => {
              if (s?.code === 0) {
                resolve(s);
                message.success("Chỉnh sửa thành công");
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
    themThongTinPhieu: ({ body, id, loaiDichVu }, state) => {
      if (loaiDichVu === 10)
        return new Promise((resolve, reject) => {
          nbDvKhamProvider
            .themThongTinPhieu(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success(t("common.capNhatThanhCong"));
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        });
      if (loaiDichVu === 20)
        return new Promise((resolve, reject) => {
          nbDvXNProvider
            .themThongTinPhieu(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success(t("common.capNhatThanhCong"));
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        });
      if (loaiDichVu === 30)
        return new Promise((resolve, reject) => {
          nbDvCLSProvider
            .themThongTinPhieu(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success(t("common.capNhatThanhCong"));
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        });
    },
    inPhieu: (
      {
        loaiDichVu,
        nbDotDieuTriId,
        soPhieuId,
        dsSoPhieuId,
        phieuChiDinhId,
        chiDinhTuLoaiDichVu,
        chiDinhTuDichVuId,
        dsChiDinhTuLoaiDichVu,
      },
      state
    ) => {
      return new Promise(async (resolve, reject) => {
        let api = "";
        switch (loaiDichVu) {
          case 10:
            api = nbDvKhamProvider;
            break;
          case 20:
            api = nbDvXNProvider;
            break;
          case 30:
          case 40:
            api = nbDvCLSProvider;
            break;
          case 60:
            api = nbDvNgoaiDieuTriProvider;
            break;
          default:
            break;
        }
        try {
          if (!api) reject();
          const s = await api.getPhieuChiDinh({
            nbDotDieuTriId,
            soPhieuId,
            dsSoPhieuId,
            phieuChiDinhId,
            chiDinhTuLoaiDichVu,
            dsChiDinhTuLoaiDichVu,
            chiDinhTuDichVuId,
          });
          await printProvider.printPdfWithConditionInNhanh(s.data);
          console.info("Print success");
          resolve();
        } catch (error) {
          message.error(error?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          reject(error);
        }
      });
    },
    inPhieuKetQua: (
      {
        loaiDichVu,
        nbDotDieuTriId,
        soPhieuId,
        dsSoPhieuId,
        phieuChiDinhId,
        chiDinhTuLoaiDichVu,
        chiDinhTuDichVuId,
        dsSoKetNoi,
      },
      state
    ) => {
      return new Promise(async (resolve, reject) => {
        let api = "";
        switch (loaiDichVu) {
          case LOAI_DICH_VU.XET_NGHIEM:
            api = nbDvXNProvider;
            break;
          case LOAI_DICH_VU.CDHA:
          case LOAI_DICH_VU.PHAU_THUAT_THU_THUAT:
            api = nbDvCLSProvider;
            break;
          default:
            break;
        }
        if (!api) {
          reject();
          return;
        }
        try {
          const s = await api.getPhieuKetQua({
            nbDotDieuTriId,
            soPhieuId,
            dsSoPhieuId,
            phieuChiDinhId,
            chiDinhTuLoaiDichVu,
            chiDinhTuDichVuId,
            dsSoKetNoi,
          });

          let data = [
            ...(s?.data?.dsPhieuHis || []).map((item) => {
              return item.file.pdf;
            }),
            ...(s?.data?.dsPhieuLis || []).map((item) => {
              return item.duongDan;
            }),
          ];

          //chỉ hiển thị kq mới nhất mà pacs trả về
          const _dsPhieuPacsSort = (s?.data?.dsPhieuPacs || []).sort((a, b) =>
            new Date(a.thoiGianCoKetQua) < new Date(b.thoiGianCoKetQua) ? 1 : -1
          );
          if (_dsPhieuPacsSort.length > 0) {
            data.push(_dsPhieuPacsSort[0].duongDan);
          }

          await printProvider.printMergePdf(data);
          console.info("Print success");
          resolve();
        } catch (e) {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          reject();
        }
      });
    },

    loiDan: ({ body, id, loaiDichVu }, state) => {
      return new Promise((resolve, reject) => {
        nbDvKhamProvider
          .loiDan(body, id)
          .then((s) => {
            if (s.code === 0) {
              dispatch.khamBenh.updateData({ thongTinChiTiet: s?.data });
              // message.success("Cập nhật thành công dữ liệu dịch vụ!");
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

    getDsGoiDvChiTiet: (params) => {
      return new Promise((resolve, reject) => {
        nbGoiDvChiTietProvider
          .search(params)
          .then((s) => {
            if (s?.code === 0) {
              let data = (s?.data || []).map((x) => ({
                ...x,
                ten: x.tenDichVu,
                ma: x.maDichVu,
                id: undefined,
                nbGoiDvChiTietId: x.id,
              }));
              dispatch.chiDinhKhamBenh.updateData({
                listDvKham: data,
                page: s.pageNumber || 0,
                size: s.pageSize || data?.length || 0,
                totalElements: s.totalElements || data?.length || 0,
              });
              resolve(s);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    postNbGoiDv: (params) => {
      return new Promise((resolve, reject) => {
        nbGoiDvProvider
          .post(params)
          .then((s) => {
            if (s?.code === 0) {
              message.success("Thêm mới thành công gói dịch vụ cho người bệnh");
              resolve(s);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  }),
};
