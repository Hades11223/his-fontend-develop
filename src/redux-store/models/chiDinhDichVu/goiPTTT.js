import { message } from "antd";
import { LOAI_DICH_VU, PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import nbGoiPtTtProvider from "data-access/nb-goi-pt-tt-provider";
import dmGoiPtTtProvider from "data-access/pttt/dm-goi-pt-tt-provider";
import dmGoiPtTtChiTietProvider from "data-access/pttt/dm-goi-pt-tt-chi-tiet-provider";
import nbDichVuProvider from "data-access/nb-dich-vu-provider";

export default {
  state: {
    listNbGoiPTTT: [],
    listGoiPTTT: [],
    listDvTrongGoi: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,

    totalElementsDvTrongGoi: null,
    pageDvTrongGoi: PAGE_DEFAULT,
    sizeDvTrongGoi: PAGE_SIZE,
    dataSearch: {},
    listChooseDv: [],

    dsDvTrongGoiNb: [],
    dsDvNgoaiGoi: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    getDsNbGoiPTTT: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbGoiPtTtProvider
          .getTongHop(payload)
          .then((s) => {
            dispatch.chiDinhGoiPTTT.updateData({
              listNbGoiPTTT: (s?.data || []).map((item, idx) => ({
                ...item,
                index: idx + 1,
              })),
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    getDsGoiPTTT: ({ page = 0, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        dmGoiPtTtProvider
          .search({ page, ...rest })
          .then((s) => {
            dispatch.chiDinhGoiPTTT.updateData({
              listGoiPTTT: s?.data || [],
              totalElements: s?.totalElements || 0,
              page,
            });

            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    getDsDvTrongGoi: ({ page = 0, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        dmGoiPtTtChiTietProvider
          .searchTongHop({ page, ...rest })
          .then((s) => {
            dispatch.chiDinhGoiPTTT.updateData({
              listDvTrongGoi: s?.data || [],
              totalElementsDvTrongGoi: s?.totalElements || 0,
              pageDvTrongGoi: page,
            });

            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    getAllDvTrongGoi: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        dmGoiPtTtChiTietProvider
          .searchTongHop({
            page: 0,
            size: 500,
            chiDinhCungGoi: true,
            goiPtTtId: payload.goiPtTtId,
            nbDotDieuTriId: payload.nbDotDieuTriId,
          })
          .then((s) => {
            resolve(s?.data || []);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    chiDinhNbGoiPTTT: (
      {
        dsDichVu,
        chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu,
        nbDotDieuTriId,
        goiPtTtId,
        khoaChiDinhId,
      },
      state
    ) => {
      return new Promise((resolve, reject) => {
        const mapDichVu = (dvItem) => ({
          nbDichVu: {
            dichVuId: dvItem.dichVuId,
            soLuong: 1,
            chiDinhTuDichVuId,
            chiDinhTuLoaiDichVu,
            khoaChiDinhId,
          },
          nbDotDieuTriId: nbDotDieuTriId,
          nbDvKyThuat: {
            phongThucHienId: dvItem.phongThucHienId,
          },
          benhPhamId: dvItem.benhPhamId,
        });

        const mapDichVuThuoc = (dvItem) => ({
          dotDung: dvItem.dotDung,
          lieuDungId: dvItem.lieuDungId,

          nbDichVu: {
            dichVuId: dvItem.dichVuId,
            soLuong: dvItem.soLuong || 1,
            chiDinhTuDichVuId,
            chiDinhTuLoaiDichVu,
            khoaChiDinhId,
            ghiChu: dvItem.ghiChu,
          },
          nbDotDieuTriId: nbDotDieuTriId,
          nbDvKho: {
            khoId: null,
          },
          benhPhamId: dvItem.benhPhamId,
          ngayThucHienDen: dvItem.ngayThucHienDen,
          ngayThucHienTu: dvItem.ngayThucHienTu,
        });

        const mapDichVuVatTuHoaChat = (dvItem) => ({
          nbDichVu: {
            dichVuId: dvItem.dichVuId,
            soLuong: 1,
            chiDinhTuDichVuId,
            chiDinhTuLoaiDichVu,
            khoaChiDinhId,
          },
          nbDotDieuTriId: nbDotDieuTriId,
          nbDvKho: {
            khoId: null,
          },
          benhPhamId: dvItem.benhPhamId,
        });

        const chiDinhPayload = {
          nbDotDieuTriId,
          nbDichVu: {
            dichVuId: goiPtTtId,
            chiDinhTuDichVuId,
            chiDinhTuLoaiDichVu,
          },
          dsKham: dsDichVu
            .filter((item) => item.loaiDichVu === LOAI_DICH_VU.KHAM)
            .map((item) => mapDichVu(item)),
          dsXetNghiem: dsDichVu
            .filter((item) => item.loaiDichVu === LOAI_DICH_VU.XET_NGHIEM)
            .map((item) => mapDichVu(item)),
          dsCdhaTdcnPtTt: dsDichVu
            .filter(
              (item) =>
                item?.loaiDichVu === LOAI_DICH_VU.CDHA ||
                item?.loaiDichVu === LOAI_DICH_VU.PHAU_THUAT_THU_THUAT
            )
            .map((item) => mapDichVu(item)),
          dsChePhamMau: dsDichVu
            .filter((item) => item?.loaiDichVu === LOAI_DICH_VU.CHE_PHAM_MAU)
            .map((item) => mapDichVu(item)),
          dsNgoaiDieuTri: dsDichVu
            .filter((item) => item?.loaiDichVu === LOAI_DICH_VU.NGOAI_DIEU_TRI)
            .map((item) => mapDichVu(item)),
          dsThuoc: dsDichVu
            .filter((item) => item?.loaiDichVu === LOAI_DICH_VU.THUOC)
            .map((item) => mapDichVuThuoc(item)),
          dsVatTu: dsDichVu
            .filter((item) => item?.loaiDichVu === LOAI_DICH_VU.VAT_TU)
            .map((item) => mapDichVuVatTuHoaChat(item)),
          dsHoaChat: dsDichVu
            .filter((item) => item?.loaiDichVu === LOAI_DICH_VU.HOA_CHAT)
            .map((item) => mapDichVuVatTuHoaChat(item)),
        };

        nbGoiPtTtProvider
          .postGoi(chiDinhPayload)
          .then((s) => {
            const {
              dsCdhaTdcnPtTt,
              dsChePhamMau,
              dsHoaChat,
              dsKham,
              dsNgoaiDieuTri,
              dsThuoc,
              dsVatTu,
              dsXetNghiem,
            } = s?.data || {};
            const errDs = [
              ...dsCdhaTdcnPtTt,
              ...dsChePhamMau,
              ...dsHoaChat,
              ...dsKham,
              ...dsNgoaiDieuTri,
              ...dsThuoc,
              ...dsVatTu,
              ...dsXetNghiem,
            ].filter((x) => x.code > 0);
            if (errDs.length === 0) {
              resolve(s);
              message.success("Chỉ định thành công");
            } else {
              errDs.forEach((element) => {
                message.error(
                  `${element?.nbDichVu?.dichVu?.ten}: ${element?.message}`
                );
              });
              resolve(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    xoaNbGoiPTTT: (id, state) => {
      return new Promise((resolve, reject) => {
        nbGoiPtTtProvider
          .deleteGoi(id)
          .then((s) => {
            resolve(s);
            message.success("Xóa gói thành công");
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getChiTietDvTrongGoi: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbGoiPtTtProvider
          .getDichVu(payload)
          .then((s) => {
            dispatch.chiDinhGoiPTTT.updateData({
              dsDvTrongGoiNb: s?.data || [],
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    updateDichVuNbGoiPTTT: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbGoiPtTtProvider
          .updateGoiPtTt(payload)
          .then((s) => {
            resolve(s);
            message.success("Cập nhật dịch vụ trong gói thành công");
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getDsDvNgoaiGoi: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDichVuProvider
          .searchTongHop(payload)
          .then((s) => {
            dispatch.chiDinhGoiPTTT.updateData({
              dsDvNgoaiGoi: s?.data || [],
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
