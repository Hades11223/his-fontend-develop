import dichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider";
import tonKhoProvider from "data-access/kho/ton-kho-provider";
import nbDvThuocProvider from "data-access/nb-dv-thuoc-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";

export default {
  state: {
    listDvKho: [],
    loaiDichVu: null,
    listLoaiDichVu: [],
    listDvTonKho: [],
    neededUpdateRecord: [],
    listGoiDv: [],
    listDvThuoc: [],
    listDvThuocKeNgoai: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    searchDv: async ({ notCallBoChiDinh, ...payload }, state) => {
      const userId = state.auth.auth?.nhanVienId;
      const { loaiDichVu } = payload;
      const listDvKho = await cacheUtils.read(
        userId,
        `DATA_DICH_VU_KHAM_NGOAI_TRU_${loaiDichVu}`,
        [],
        false
      );
      dispatch.chiDinhDichVuTuTruc.updateData({ listDvKho, loaiDichVu });
      if (loaiDichVu && loaiDichVu === 150) {
      } else {
          dispatch.boChiDinh.getBoChiDinh({ dsLoaiDichVu: loaiDichVu, bacSiChiDinhId : userId });
      }
      return new Promise((resolve, reject) => {
        dichVuKhoProvider
          .searchAll({ ...payload, size: 9999 })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              if (JSON.stringify(data) !== JSON.stringify(listDvKho)) {
                if (loaiDichVu === 150) {
                  dispatch.chiDinhDichVuTuTruc.updateData({
                    listGoiDv: data,
                  });
                } else {
                  dispatch.chiDinhDichVuTuTruc.updateData({
                    listDvKho: data,
                  });
                }
              }
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
    getListDichVuThuoc: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .searchTongHop({ ...payload, size: "" })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.chiDinhDichVuTuTruc.updateData({
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
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    tamTinhTien: (payload, state) => {
      let { listLoaiDichVu } = state.chiDinhDichVuTuTruc;
      let listUpdatedLoaiDichVu = payload.map(
        (item) => item.nbDichVu?.loaiDichVu
      );
      let chiDinhTuDichVuId = payload[0]?.chiDinhTuDichVuId;
      let chiDinhTuLoaiDichVu = payload[0]?.chiDinhTuLoaiDichVu;
      listUpdatedLoaiDichVu = [
        ...new Set([...listLoaiDichVu, ...listUpdatedLoaiDichVu]),
      ];

      if (!listUpdatedLoaiDichVu.length) return;
      dispatch.chiDinhDichVuTuTruc.updateData({
        listLoaiDichVu: listUpdatedLoaiDichVu,
      });

      const tamTinhTienKho = new Promise((resolve, reject) => {
        return nbDvThuocProvider
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
                lieuDungId: item.lieuDungId,
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
              };
            });
            dataTamTinhTien = [...dataTamTinhTien, ...tinhTien];
          });

          dispatch.chiDinhDichVuTuTruc.updateData({
            dataTamTinhTien,
          });
          return dataTamTinhTien;
        })
        .catch((e) => {});
    },
    chiDinhDichVu: (payload, state) => {
      const { listLoaiDichVu } = state.chiDinhDichVuTuTruc;
      let dataTamTinhTien = state.chiDinhDichVuTuTruc.dataTamTinhTien;

      let data = payload.map((item) => {
        return {
          ...item,
          thanhTien: dataTamTinhTien.find(
            (x) => x.nbDichVu.dichVuId === item.nbDichVu.dichVuId
          )?.nbDichVu?.thanhTien,
        };
      });
      const chiDinhDVKho = new Promise((resolve, reject) => {
        return nbDvThuocProvider
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

          dispatch.chiDinhDichVuTuTruc.updateData({
            neededUpdateRecord,
          });
          if (!neededUpdateRecord.length) {
            message.success("Cập nhật thành công dữ liệu!");
          }
          if(errMessage.length){
            message.error(errMessage);
          }
          return {
            code: 0,
            listLoaiDichVu,
            neededUpdateRecord,
          };
        })
        .catch((e) => {
          message.error(e?.message);
        });
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
          lieuDungId: item?.lieuDungId,
          dotDung: item?.dotDung,
          ngayThucHienTu: item?.ngayThucHienTu,
          ngayThucHienDen: item?.ngayThucHienDen,
        };
      });

      return new Promise((resolve, reject) => {
        nbDvThuocProvider
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
              dispatch.chiDinhDichVuTuTruc.updateData({
                listDvTonKho: s.data,
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
        nbDvThuocProvider
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
        nbDvThuocProvider
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
        nbDvThuocProvider
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
