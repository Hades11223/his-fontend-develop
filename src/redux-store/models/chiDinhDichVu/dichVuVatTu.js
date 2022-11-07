import tonKhoProvider from "data-access/kho/ton-kho-provider";
import nbDvVatTuProvider from "data-access/nb-dv-vat-tu-provider";
import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
export default {
  state: {
    listDvKho: [],
    loaiDichVu: null,
    listDvTonKho: [],
    listGoiDv: [],
    listDvVatTu: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    upgradeParam: ({ blur, ...rest } = {}, state) => {
      const paramSearch = {
        ...(blur ? {} : state.chiDinhVatTu.dataSearch),
        ...rest,
      };
      dispatch.chiDinhVatTu.updateData({ dataSearch: paramSearch });
    },
    getListDichVuTonKho: ({ page, size, blur, ...rest } = {}, state) => {
      let _page = page === 0 ? 0 : page || state.chiDinhVatTu.page || 0;
      let _size = size || state.chiDinhVatTu.size || 10;
      const paramSearch = {
        ...(blur ? {} : state.chiDinhVatTu.dataSearch),
        ...rest,
      };
      return new Promise((resolve, reject) => {
        tonKhoProvider
          .getTongHop({ ...paramSearch, page: _page, size: _size })
          .then((s) => {
            if (s.code === 0) {
              let cloneData = s.data.map((item) => {
                item.soLuong = null;
                return item;
              });
              dispatch.chiDinhVatTu.updateData({
                dataSearch: paramSearch,
                listDvTonKho: cloneData,
                page: _page,
                size: _size,
                totalElements: s?.totalElements,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getListDichVuVatTu: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvVatTuProvider
          .searchTongHop({ ...payload, page: "", size: "" })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.chiDinhVatTu.updateData({
                listDvVatTu: data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    tamTinhTien: (payload, state) => {
      let chiDinhTuDichVuId = payload[0]?.chiDinhTuDichVuId;
      let chiDinhTuLoaiDichVu = payload[0]?.chiDinhTuLoaiDichVu;

      const tamTinhTienKho = new Promise((resolve, reject) => {
        return nbDvVatTuProvider
          .tamTinhTien(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
      return Promise.all([tamTinhTienKho])
        .then((response) => {
          let dataTamTinhTien = [];
          response.forEach((res) => {
            if (res === 0) return;
            const khoaChiDinhId = state.auth?.auth?.dsKhoaPhuTrachId?.[0];
            const tinhTien = res.data.map((item) => {
              return {
                nbDotDieuTriId: item?.nbDotDieuTriId,
                nbDichVu: {
                  dichVu: item.nbDichVu?.dichVu,
                  dichVuId: item.nbDichVu?.dichVuId,
                  soLuong: item?.nbDichVu?.soLuong,
                  chiDinhTuDichVuId,
                  chiDinhTuLoaiDichVu,
                  khoaChiDinhId,
                  loaiDioaCchVu: item.nbDichVu?.loaiDichVu,
                  thanhTien: item.nbDichVu?.thanhTien,
                },
                message: item?.message,
              };
            });
            dataTamTinhTien = [...dataTamTinhTien, ...tinhTien];
          });

          dispatch.chiDinhVatTu.updateData({
            dataTamTinhTien,
          });
          return dataTamTinhTien;
        })
        .catch((e) => {});
    },

    chiDinhDichVu: (payload, state) => {
      const body = payload.map((item) => {
        return {
          nbDotDieuTriId: item.nbDotDieuTriId,
          nbDichVu: {
            dichVu: item?.nbDichVu?.dichVu,
            dichVuId: item.nbDichVu.dichVuId,
            soLuong: item.nbDichVu.soLuong,
            ghiChu: item?.nbDichVu?.ghiChu,
            tuTra: item?.nbDichVu?.tuTra,
            khongTinhTien: item?.nbDichVu?.khongTinhTien,
            chiDinhTuDichVuId: item?.nbDichVu?.chiDinhTuDichVuId,
            chiDinhTuLoaiDichVu: item?.nbDichVu?.chiDinhTuLoaiDichVu,
            khoaChiDinhId: item?.nbDichVu?.khoaChiDinhId,
          },
          nbDvKho: {
            khoId: item?.nbDvKho?.khoId,
          },
          ngayThucHienTu: item?.ngayThucHienTu,
          ngayThucHienDen: item?.ngayThucHienDen,
        };
      });

      return new Promise((resolve, reject) => {
        nbDvVatTuProvider
          .post(body)
          .then((s) => {
            if (s.code === 0) {
              resolve(s?.data);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    themThongTin: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvVatTuProvider
          .themThongTin(payload)
          .then((s) => {
            resolve(s);
            message.success("Thêm thông tin thành công");
          })
          .catch((e) => message.error(e?.message || "Thêm thông tin thất bại"));
      });
    },

    onDeleteDichVu: (id) => {
      return new Promise((resolve, reject) => {
        nbDvVatTuProvider
          .onDeleteDichVu(id)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    onDeleteAll: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvVatTuProvider
          .onDeleteAll(payload)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
