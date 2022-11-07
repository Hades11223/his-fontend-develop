import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import dmDvKyThuatProvider from "data-access/categories/dm-dv-ky-thuat-provider";
import nbDvSuatAnProvider from "data-access/nb-dv-suat-an-provider";

export default {
  state: {
    listDvSuatAn: [],
    listDvTonKho: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},
    listChooseDv: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    getListDichVuSuatAn: ({ page = 0, size, ...payload }, state) => {
      let _size = size || state.chiDinhSuatAn.size || 10;
      const paramSearch = {
        ...state.chiDinhSuatAn.dataSearch,
        ...payload,
      };
      dispatch.chiDinhSuatAn.updateData({ dataSearch: paramSearch });

      dmDvKyThuatProvider
        .searchTongHop({
          page,
          size: _size,
          ...paramSearch,
        })
        .then((s) => {
          dispatch.chiDinhSuatAn.updateData({
            listDvTonKho: s?.data || [],
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },

    tamTinhTien: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvSuatAnProvider
          .tamTinhTienDVSuatAn(payload)
          .then((s) => {
            resolve(s?.data || []);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    chiDinhDichVu: (payload) => {
      const body = payload.map((item) => {
        return {
          loaiBuaAnId: item.loaiBuaAnId,
          dotXuat: item.dotXuat,
          nbDotDieuTriId: item.nbDotDieuTriId,
          nbDichVu: {
            dichVuId: item.nbDichVu.dichVuId,
            soLuong: item.nbDichVu.soLuong,
            ghiChu: item?.nbDichVu?.ghiChu,
            tuTra: item?.nbDichVu?.tuTra,
            khongTinhTien: item?.nbDichVu?.khongTinhTien,
            chiDinhTuDichVuId: item?.nbDichVu?.chiDinhTuDichVuId,
            chiDinhTuLoaiDichVu: item?.nbDichVu?.chiDinhTuLoaiDichVu,
            khoaChiDinhId: item?.nbDichVu?.khoaChiDinhId,
            thoiGianThucHien: item?.nbDichVu?.thoiGianThucHien,
          },
        };
      });

      return new Promise((resolve, reject) => {
        nbDvSuatAnProvider
          .chiDinhDichVu(body)
          .then((s) => {
            if ((s?.data || []).every((x) => x.code === 0)) {
              message.success("Thêm mới thành công dịch vụ suất ăn!");
              resolve(s?.data);
            } else {
              reject(s);
              message.error(s.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    getDsSuatAn: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvSuatAnProvider
          .searchTongHop(payload)
          .then((s) => {
            dispatch.chiDinhSuatAn.updateData({
              listDvSuatAn: s?.data || [],
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    xoaSuatAn: (id, state) => {
      return new Promise((resolve, reject) => {
        nbDvSuatAnProvider
          .delete(id)
          .then((s) => {
            if (s?.code === 0) {
              message.success("Xóa thành công dịch vụ suất ăn!");
              resolve();
            } else {
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    deleteAllSuatAn: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvSuatAnProvider
          .onDeleteDichVu({ listDeletingId: payload })
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    themThongTin: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvSuatAnProvider
          .themThongTin(payload)
          .then((s) => {
            resolve(s);
            message.success("Thêm thông tin thành công");
          })
          .catch((e) => message.error(e?.message || "Thêm thông tin thất bại"));
      });
    },

    traSuatAn: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvSuatAnProvider
          .traSuatAn(payload)
          .then((s) => {
            resolve(s);
            message.success("Trả suất ăn thành công");
          })
          .catch((e) => message.error(e?.message || "Trả suất ăn thất bại"));
      });
    },

    huyTraSuatAn: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvSuatAnProvider
          .huyTraSuatAn(payload)
          .then((s) => {
            resolve(s);
            message.success("Hủy trả suất ăn thành công");
          })
          .catch((e) =>
            message.error(e?.message || "Hủy trả suất ăn thất bại")
          );
      });
    },
  }),
};
