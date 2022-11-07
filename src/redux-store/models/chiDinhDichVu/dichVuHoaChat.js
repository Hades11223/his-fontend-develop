import tonKhoProvider from "data-access/kho/ton-kho-provider";
import nbDvHoaChatProvider from "data-access/nb-dv-hoa-chat-provider";
import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
export default {
  state: {
    listDvTonKho: [],
    listDvHoaChat: [],
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
        ...(blur ? {} : state.chiDinhHoaChat.dataSearch),
        ...rest,
      };
      dispatch.chiDinhHoaChat.updateData({ dataSearch: paramSearch });
    },
    getListDichVuTonKho: ({ page, size, blur, ...rest } = {}, state) => {
      let _page = page === 0 ? 0 : page || state.chiDinhHoaChat.page || 0;
      let _size = size || state.chiDinhHoaChat.size || 10;
      const paramSearch = {
        ...(blur ? {} : state.chiDinhHoaChat.dataSearch),
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
              dispatch.chiDinhHoaChat.updateData({
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
    getListDichVuHoaChat: (payload, state) => {
      // console.log("payload", payload);
      return new Promise((resolve, reject) => {
        nbDvHoaChatProvider
          .searchTongHop({
            ...state.chiDinhHoaChat.dataSearch,
            ...payload,
            page: "",
            size: "",
          })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.chiDinhHoaChat.updateData({
                listDvHoaChat: data,
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
        return nbDvHoaChatProvider
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
                  loaiDichVu: item.nbDichVu?.loaiDichVu,
                  thanhTien: item.nbDichVu?.thanhTien,
                },
                message: item?.message,
              };
            });
            dataTamTinhTien = [...dataTamTinhTien, ...tinhTien];
          });

          dispatch.chiDinhHoaChat.updateData({
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
        };
      });

      return new Promise((resolve, reject) => {
        nbDvHoaChatProvider
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
        nbDvHoaChatProvider
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
        nbDvHoaChatProvider
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
        nbDvHoaChatProvider
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
