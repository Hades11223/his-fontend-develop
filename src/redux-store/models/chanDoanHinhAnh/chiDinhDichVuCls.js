import dichVuKTProvider from "data-access/nb-dv-ky-thuat-provider";
import dichVuXNProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import nbDvCLSProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import dichVuKyThuatProvider from "data-access/categories/dm-dv-ky-thuat-provider";

export default {
  state: {
    listDvKham: [],
    loaiDichVu: null,
    listLoaiDichVu: [],
    dsDichVuChiDinhXN: [],
    dsDichVuChiDinhKham: [],
    dsDichVuChiDinhCls: [],
    dataPhieu: {},
    neededUpdateRecord: [],
    listGoiDv: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    searchDv: async (payload = {}, state) => {
      const userId = state.auth.auth?.nhanVienId;
      const { loaiDichVu } = payload;
      const listDvKham = await cacheUtils.read(
        userId,
        `DATA_DICH_VU_KHAM_NGOAI_TRU_${loaiDichVu}`,
        [],
        false
      );

      dispatch.chiDinhDichVuCls.updateData({ listDvKham, loaiDichVu });
      if (loaiDichVu && loaiDichVu === 150) {
      } else {
        dispatch.boChiDinh.getBoChiDinh({
          dsLoaiDichVu: loaiDichVu,
          bacSiChiDinhId: userId,
        });
      }
      return new Promise((resolve, reject) => {
        dichVuKyThuatProvider
          .searchAll({ ...payload, dsDoiTuongSuDung: 20 })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              if (JSON.stringify(data) !== JSON.stringify(listDvKham)) {
                if (loaiDichVu === 200) {
                  dispatch.chiDinhDichVuCls.updateData({
                    listGoiDv: data,
                  });
                } else {
                  dispatch.chiDinhDichVuCls.updateData({
                    listDvKham: data,
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
    tamTinhTien: (payload, state) => {
      let { listLoaiDichVu } = state.chiDinhDichVuCls;
      let listUpdatedLoaiDichVu = payload.map(
        (item) => item.nbDichVu?.loaiDichVu
      );
      let chiDinhTuDichVuId = payload[0]?.chiDinhTuDichVuId;
      let chiDinhTuLoaiDichVu = payload[0]?.chiDinhTuLoaiDichVu;
      listUpdatedLoaiDichVu = [
        ...new Set([...listLoaiDichVu, ...listUpdatedLoaiDichVu]),
      ];

      if (!listUpdatedLoaiDichVu.length) return;
      dispatch.chiDinhDichVuCls.updateData({
        listLoaiDichVu: listUpdatedLoaiDichVu,
      });

      const tamTinhTienDVKham = listUpdatedLoaiDichVu.includes(10)
        ? new Promise((resolve, reject) => {
            const body = payload.filter(
              (item) => item.nbDichVu.loaiDichVu === 10
            );
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
          })
        : 0;

      const tamTinhTienDVXN = listUpdatedLoaiDichVu.includes(20)
        ? new Promise((resolve, reject) => {
            const body = payload.filter(
              (item) => item.nbDichVu.loaiDichVu === 20
            );
            return dichVuXNProvider
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
          })
        : 0;
      const tamTinhTienDVCLS = listUpdatedLoaiDichVu.includes(30)
        ? new Promise((resolve, reject) => {
            const body = payload.filter(
              (item) => item.nbDichVu.loaiDichVu === 30
            );
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
          })
        : 0;

      return Promise.all([tamTinhTienDVKham, tamTinhTienDVXN, tamTinhTienDVCLS])
        .then((response) => {
          let dataTamTinhTien = [];
          response.forEach((res) => {
            const khoaChiDinhId = state.auth?.auth?.dsKhoaPhuTrachId?.[0];
            if (res === 0) return;
            const tinhTien = res.data.map((item) => {
              return {
                nbDotDieuTriId: item?.nbDotDieuTriId,
                nbDichVu: {
                  dichVu: item.nbDichVu?.dichVu,
                  dichVuId: item.nbDichVu?.dichVuId,
                  soLuong: 1,
                  chiDinhTuDichVuId,
                  chiDinhTuLoaiDichVu,
                  khoaChiDinhId,
                  loaiDichVu: item.nbDichVu?.loaiDichVu,
                  thanhTien: item.nbDichVu?.thanhTien,
                },
                nbChanDoan: {
                  cdSoBo: "",
                },
              };
            });
            dataTamTinhTien = [...dataTamTinhTien, ...tinhTien];
          });

          dispatch.chiDinhDichVuCls.updateData({
            dataTamTinhTien,
          });
          return dataTamTinhTien;
        })
        .catch((e) => {
          message.error(e?.message);
        });
    },
    chiDinhDichVu: (payload, state) => {
      const { listLoaiDichVu } = state.chiDinhDichVuCls;
      let dataTamTinhTien = state.chiDinhDichVuCls.dataTamTinhTien;
      if (payload?.isUpdateInfo) {
        dataTamTinhTien = payload.dataTable;
      }

      const chiDinhDVKham = listLoaiDichVu.includes(10)
        ? new Promise((resolve, reject) => {
            const body = dataTamTinhTien.filter(
              (item) => item.nbDichVu.loaiDichVu === 10
            );
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
          })
        : 0;

      const chiDinhDVXN = listLoaiDichVu.includes(20)
        ? new Promise((resolve, reject) => {
            const body = dataTamTinhTien.filter(
              (item) => item.nbDichVu.loaiDichVu === 20
            );
            return dichVuXNProvider
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
          })
        : 0;

      const chiDinhDVCLS = listLoaiDichVu.includes(30)
        ? new Promise((resolve, reject) => {
            const body = dataTamTinhTien.filter(
              (item) => item.nbDichVu.loaiDichVu === 30
            );
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
          })
        : 0;
      return Promise.all([chiDinhDVKham, chiDinhDVXN, chiDinhDVCLS])
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
          if (errMessage.length) {
            message.error(errMessage.join());
          }
          dispatch.chiDinhDichVuCls.updateData({
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
        .catch((e) => {
          message.error(e?.message);
        });
    },
    getDsDichVuChiDinhXN: (payload, state) => {
      return new Promise((resolve, reject) => {
        dichVuXNProvider
          .getDsDichVuChiDinhXN(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhDichVuCls.updateData({
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
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getDsDichVuChiDinhKham: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvKhamProvider
          .getDsDichVuChiDinhKham(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhDichVuCls.updateData({
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
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getDsDichVuChiDinhCLS: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvCLSProvider
          .getDsDichVuChiDinhCLS(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhDichVuCls.updateData({
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
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getNBSoPhieuCLS: ({ page, loaiDichVu }, state) => {
      return new Promise((resolve, reject) => {
        const data = {
          nbDotDieuTriId: state.choTiepDonDV.nbDotDieuTriId,
          page,
          loaiDichVu,
        };
        dichVuKTProvider
          .getNBSoPhieuCLS(data)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhDichVuCls.updateData({
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
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    onDeleteDichVu: ({ id, loaiDichVu, listDeletingId }, state) => {
      return new Promise((resolve, reject) => {
        if (loaiDichVu === 10)
          nbDvKhamProvider
            .onDeleteDichVu({ id, listDeletingId })
            .then((s) => {
              if (s.code === 0) {
                message.success("Xoá thành công dữ liệu chỉ định dịch vụ!");
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
        if (loaiDichVu === 20)
          dichVuXNProvider
            .onDeleteDichVu({ id, listDeletingId })
            .then((s) => {
              if (s.code === 0) {
                message.success("Xoá thành công dữ liệu chỉ định dịch vụ!");
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
        if (loaiDichVu === 30)
          nbDvCLSProvider
            .onDeleteDichVu({ id, listDeletingId })
            .then((s) => {
              if (s.code === 0) {
                message.success("Xoá thành công dữ liệu chỉ định dịch vụ!");
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
    themThongTinDV: ({ body, id, loaiDichVu }, state) => {
      if (loaiDichVu === 10)
        return new Promise((resolve, reject) => {
          nbDvKhamProvider
            .themThongTinDV(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");
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
          dichVuXNProvider
            .themThongTinDV(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");
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
            .themThongTinDV(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");
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
    themThongTinPhieu: ({ body, id, loaiDichVu }, state) => {
      if (loaiDichVu === 10)
        return new Promise((resolve, reject) => {
          nbDvKhamProvider
            .themThongTinPhieu(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");
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
          dichVuXNProvider
            .themThongTinPhieu(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");
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
                message.success("Cập nhật thành công dữ liệu dịch vụ!");
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
  }),
};
