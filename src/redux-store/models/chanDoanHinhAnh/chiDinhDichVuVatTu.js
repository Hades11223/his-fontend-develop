import tonKhoProvider from "data-access/kho/ton-kho-provider";
import nbDvVatTuProvider from "data-access/nb-dv-vat-tu-provider";
import dichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider";
import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
export default {
  state: {
    listDvKho: [],
    loaiDichVu: null,
    listLoaiDichVu: [],
    listDvTonKho: [],
    neededUpdateRecord: [],
    listGoiDv: [],
    listDvVatTu: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    searchDv: async ({ bacSiChiDinhId, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dichVuKhoProvider
          .searchAll({ ...payload })
          .then((s) => {
            let data = s?.data || [];
            dispatch.chiDinhDichVuVatTu.updateData({
              listDvKho: data,
              page: s.pageNumber || 0,
              size: s.pageSize || data?.length || 0,
              totalElements: s.totalElements || data?.length || 0,
            });
            resolve(s);
          })
          .catch((e) => {
            dispatch.chiDinhDichVuVatTu.updateData({
              listDvKyThuat: [],
              page: 0,
              size: 0,
              totalElements: 0,
            });
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
              dispatch.chiDinhDichVuVatTu.updateData({
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
      let { listLoaiDichVu } = state.chiDinhDichVuVatTu;
      let listUpdatedLoaiDichVu = payload.map(
        (item) => item.nbDichVu?.loaiDichVu
      );
      let chiDinhTuDichVuId = payload[0]?.chiDinhTuDichVuId;
      let chiDinhTuLoaiDichVu = payload[0]?.chiDinhTuLoaiDichVu;
      listUpdatedLoaiDichVu = [
        ...new Set([...listLoaiDichVu, ...listUpdatedLoaiDichVu]),
      ];

      if (!listUpdatedLoaiDichVu.length) return;
      dispatch.chiDinhDichVuVatTu.updateData({
        listLoaiDichVu: listUpdatedLoaiDichVu,
      });

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
                message: item?.message
              };
            });
            dataTamTinhTien = [...dataTamTinhTien, ...tinhTien];
          });

          dispatch.chiDinhDichVuVatTu.updateData({
            dataTamTinhTien,
          });
          return dataTamTinhTien;
        })
        .catch((e) => {});
    },
    chiDinhDichVu: (payload, state) => {
      const { listLoaiDichVu } = state.chiDinhDichVuVatTu;
      let dataTamTinhTien = state.chiDinhDichVuVatTu.dataTamTinhTien;

      let data = payload.map((item) => {
        return {
          ...item,
          thanhTien: dataTamTinhTien.find(
            (x) => x.nbDichVu.dichVuId === item.nbDichVu.dichVuId
          )?.nbDichVu?.thanhTien,
        };
      });
      const chiDinhDVKho = new Promise((resolve, reject) => {
        return nbDvVatTuProvider
          .post(data)
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
      });

      return Promise.all([chiDinhDVKho])
        .then((response) => {
          let neededUpdateRecord = [];
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
            errMessage = [...listMessages];
            neededUpdateRecord = [...neededUpdateRecord, ...updatingRecord];
          });
          errMessage = [...new Set(errMessage)];

          dispatch.chiDinhDichVuVatTu.updateData({
            neededUpdateRecord,
          });
          if (!neededUpdateRecord.length) {
            message.success("Cập nhật thành công dữ liệu!");
          }
          return {
            code: 0,
            listLoaiDichVu,
            neededUpdateRecord,
          };
        })
        .catch((e) => {});
    },

    chiDinhDichVuKho: (payload, state) => {
      const body = payload.map((item) => {
        return {
          nbDotDieuTriId: item.nbDotDieuTriId,
          nbDichVu: {
            dichVu: item?.nbDichVu?.dichVu,
            dichVuId: item.nbDichVu.dichVuId,
            soLuong: item.nbDichVu.soLuong,
            ghiChu: item?.nbDichVu?.ghiChu,
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
    
    getListDichVuTonKho: (payload, state) => {
      return new Promise((resolve, reject) => {
        tonKhoProvider
          .getTongHop(payload)
          .then((s) => {
            if (s.code === 0) {
              let cloneData = s.data.map((item) => {
                item.soLuong = null;
                return item;
              });
              dispatch.chiDinhDichVuVatTu.updateData({
                listDvTonKho: cloneData,
                pageTonKho: payload.page,
                sizeTonKho: payload.size,
                totalElementVatTu : s?.data?.length
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
