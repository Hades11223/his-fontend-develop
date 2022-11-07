import { message } from "antd";
import { t } from "i18next";
import dmDvKyThuatProvider from "data-access/categories/dm-dv-ky-thuat-provider";
import dmBoChiDinhProvider from "data-access/categories/dm-bo-chi-dinh-provider";
import { LOAI_DICH_VU } from "constants/index";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import nbDvXetNghiemProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvNgoaiDieuTriProvider from "data-access/nb-dv-ngoai-dieu-tri-provider";
import nbDvCdhaTdcnPtTtProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import dmGoiDvProvider from "data-access/categories/dm-goi-dv-provider";
import dmGoiDichVuChiTiet from "data-access/categories/dm-goi-dich-vu-chi-tiet";

export default {
  state: {
    dsDichVuChiDinhKham: [],
    dsDichVuChiDinhXN: [],
    dsDichVuChiDinhCls: [],
    dsDichVuNgoaiDieuTri: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSearchDichVu: async (
      { bacSiChiDinhId, dsDoiTuongSuDung, ...payload },
      state
    ) => {
      return new Promise((resolve, reject) => {
        dmDvKyThuatProvider
          .searchAll({ ...payload, dsDoiTuongSuDung })
          .then((s) => {
            let data = s?.data || [];
            dispatch.chiDinhDvGoi.updateData({
              listDvKham: data,
              page: s.pageNumber || 0,
              size: s.pageSize || data?.length || 0,
              totalElements: s.totalElements || data?.length || 0,
            });
            resolve(s);
          })
          .catch((e) => {
            dispatch.chiDinhDvGoi.updateData({
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

        dispatch.chiDinhDvGoi.updateData({
          listGoiDv: data,
          pageGoiDv: s.pageNumber,
          sizeGoiDv: s.pageSize,
          totalElementsGoiDv: s.totalElements,
        });
      } catch (error) {
        dispatch.chiDinhDvGoi.updateData({
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
          return nbDvXetNghiemProvider
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
          return nbDvCdhaTdcnPtTtProvider
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
                },
                nbDvKyThuat: {
                  phongId: item.nbDvKyThuat?.phongId,
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

    onThemMoiGoi: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        dmGoiDvProvider
          .post(payload)
          .then((s) => {
            if (s.code === 0) {
              message.success(t("goiDichVu.themMoiGoiThanhCong"));
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

    onThemDvVaoGoi: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        dmGoiDichVuChiTiet
          .batch(payload)
          .then((s) => {
            if (s.code === 0) {
              message.success(t("goiDichVu.themDvVaoGoiThanhCong"));
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
  }),
};
