import dichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider";
import tonKhoProvider from "data-access/kho/ton-kho-provider";
import nbDvThuocProvider from "data-access/nb-dv-thuoc-provider";
import nbDvThuocChiDinhNgoaiProvider from "data-access/nb-dv-thuoc-chi-dinh-ngoai-provider";
import { message } from "antd";
import printProvider from "data-access/print-provider";
import { combineSort } from "utils";
import { t } from "i18next";

export default {
  state: {
    listDvKho: [],
    listDvTonKhoNhaThuoc: [],
    loaiDichVu: null,
    listLoaiDichVu: [],
    listDvTonKho: [],
    neededUpdateRecord: [],
    listGoiDv: [],
    listDvThuoc: [],
    listDvThuocKeNgoai: [],
    dataSortColumnThuoc: { ten: 1 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    searchDv: async (
      { notCallBoChiDinh, bacSiChiDinhId, ...payload },
      state
    ) => {
      const { loaiDichVu, dataSortColumnThuoc } = payload;
      const sort = combineSort(
        dataSortColumnThuoc ||
          state.chiDinhDichVuThuoc.dataSortColumnThuoc ||
          {}
      );
      if (loaiDichVu && loaiDichVu === 150) {
      } else {
        !notCallBoChiDinh &&
          dispatch.boChiDinh.getBoChiDinh({
            dsLoaiDichVu: loaiDichVu,
            bacSiChiDinhId,
          });
      }
      return new Promise((resolve, reject) => {
        dichVuKhoProvider
          .searchAll({ ...payload, sort })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              if (loaiDichVu === 150) {
                dispatch.chiDinhDichVuThuoc.updateData({
                  listGoiDv: data,
                  pageDvKho: payload.page,
                  sizeDvKho: payload.size,
                  totalElementsDvKho: s.totalElements,
                });
              } else {
                dispatch.chiDinhDichVuThuoc.updateData({
                  listDvKho: data,
                  pageDvKho: payload.page,
                  sizeDvKho: payload.size,
                  totalElementsDvKho: s.totalElements,
                });
              }
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
    getListDichVuThuoc: (payload) => {
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
    tamTinhTien: (payload, state) => {
      let { listLoaiDichVu } = state.chiDinhDichVuThuoc;
      const thongTinChiTiet = state.khamBenh.thongTinChiTiet || {};
      let listUpdatedLoaiDichVu = payload.map(
        (item) => item.nbDichVu?.loaiDichVu
      );
      listUpdatedLoaiDichVu = [
        ...new Set([...listLoaiDichVu, ...listUpdatedLoaiDichVu]),
      ];

      if (!listUpdatedLoaiDichVu.length) return;
      dispatch.chiDinhDichVuThuoc.updateData({
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
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
      return Promise.all([tamTinhTienKho])
        .then((response) => {
          let dataTamTinhTien = [];
          response.forEach((res) => {
            const khoaThucHienId = thongTinChiTiet.nbDichVu?.khoaThucHienId;
            if (res === 0) return;
            const tinhTien = res.data.map((item) => {
              return {
                nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
                lieuDungId: item.lieuDungId,
                nbDichVu: {
                  dichVu: item.nbDichVu?.dichVu,
                  dichVuId: item.nbDichVu?.dichVuId,
                  soLuong: item?.nbDichVu?.soLuong,
                  chiDinhTuDichVuId: thongTinChiTiet.id,
                  chiDinhTuLoaiDichVu: 10,
                  khoaChiDinhId: khoaThucHienId,
                  loaiDichVu: item.nbDichVu?.loaiDichVu,
                  thanhTien: item.nbDichVu?.thanhTien,
                },
              };
            });
            dataTamTinhTien = [...dataTamTinhTien, ...tinhTien];
          });

          dispatch.chiDinhDichVuThuoc.updateData({
            dataTamTinhTien,
          });
          return dataTamTinhTien;
        })
        .catch((e) => {});
    },
    chiDinhDichVu: (payload, state) => {
      const { listLoaiDichVu } = state.chiDinhDichVuThuoc;
      let dataTamTinhTien = state.chiDinhDichVuThuoc.dataTamTinhTien;

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
          return {
            code: 0,
            response,
          };
        })
        .catch((e) => {});
    },
    getListDichVuThuocKeNgoai: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocChiDinhNgoaiProvider
          .searchTongHop({ ...payload, size: "", page: "" })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              console.log("data: ", data);
              dispatch.chiDinhDichVuThuoc.updateData({
                listDvThuocKeNgoai: data,
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
    chiDinhDichVuThuocKeNgoai: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvThuocChiDinhNgoaiProvider
          .postBatch(payload)
          .then((s) => {
            const data = s.data || [];
            let neededUpdateRecord = [];
            let errMessage = [];
            data.forEach((item) => {
              if (item.code !== 0) {
                let _message = `${item?.thuocChiDinhNgoai?.ten || ""}`;
                if (_message) _message += " - ";
                _message += `${item.message}`;
                message.error(_message);
                errMessage.push(message);
                neededUpdateRecord.push(item);
              }
            });
            errMessage = [...new Set(errMessage)];

            dispatch.chiDinhDichVuThuoc.updateData({
              neededUpdateRecord,
            });
            if (!neededUpdateRecord.length) {
              message.success(t("common.capNhatThanhCong"));
            }
            resolve({ neededUpdateRecord, code: 0 });
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    getListDichVuTonKho: ({ dataSortColumn, ...payload }, state) => {
      const sort = combineSort(
        dataSortColumn || state.chiDinhDichVuThuoc.dataSortColumn || {}
      );
      return new Promise((resolve, reject) => {
        tonKhoProvider
          .getTongHop({ ...payload, sort })
          .then((s) => {
            if (s.code === 0) {
              console.log("s.data: ", s.data);
              let cloneData = s.data.map((item) => {
                item.soLuong = null;
                return item;
              });
              dispatch.chiDinhDichVuThuoc.updateData({
                listDvTonKho: cloneData,
                pageTonKho: payload.page,
                sizeTonKho: payload.size,
                totalElementsTonKho: s.totalElements,
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
    getListDichVuTonKhoNhaThuoc: ({ dataSortColumn, ...payload }, state) => {
      const sort = combineSort(
        dataSortColumn || state.chiDinhDichVuThuoc.dataSortColumn || {}
      );
      return new Promise((resolve, reject) => {
        tonKhoProvider
          .getTongHopNhaThuoc({ ...payload, sort })
          .then((s) => {
            if (s.code === 0) {
              console.log("s.data: ", s.data);
              let cloneData = s.data.map((item) => {
                item.soLuong = null;
                return item;
              });
              dispatch.chiDinhDichVuThuoc.updateData({
                listDvTonKhoNhaThuoc: cloneData,
                pageTonKhoNhaThuoc: payload.page,
                sizeTonKhoNhaThuoc: payload.size,
                totalElementsTonKhoNhaThuoc: s.totalElements,
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
    chinhSuaChiDinhDichVuKho: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .themThongTin(payload)
          .then((s) => {
            resolve(s);
            if (s.code == 0) {
              message.success(t("common.suaThongTinThanhCong"));
            }
          })
          .catch((e) => message.error(e?.message));
      });
    },
    chinhSuaChiDinhDichVuThuocKeNgoai: (payload, state) => {
      return new Promise((resolve, reject) => {
        const thongTinChiTiet = state.khamBenh.thongTinChiTiet || {};
        nbDvThuocChiDinhNgoaiProvider
          .put({
            ...payload,
            chiDinhTuDichVuId: thongTinChiTiet.id,
            chiDinhTuLoaiDichVu: 10,
          })
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    chiDinhDichVuKho: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .post(payload)
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
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },

    onDeleteDichVuThuocKeNgoai: (id) => {
      return new Promise((resolve, reject) => {
        nbDvThuocChiDinhNgoaiProvider
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
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
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
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    onDeleteAllThuocKeNgoai: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocChiDinhNgoaiProvider
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
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    inPhieu: ({
      loaiDonThuoc,
      nbDotDieuTriId,
      soPhieuId,
      phieuNhapXuatId,
      ...payload
    }) => {
      return new Promise((resolve, reject) => {
        // 10 phiếu khám bệnh
        // 20 xét nghiệm
        // 30 cdha, tdcn
        let moreParams = {};
        if (
          loaiDonThuoc == 10 || // thuốc nhà thuốc
          loaiDonThuoc == 20 || // thuốc tủ trực
          loaiDonThuoc == 30 || //cdha, tdcn
          loaiDonThuoc == 40
        ) {
          let api = nbDvThuocProvider;
          switch (loaiDonThuoc) {
            case 10:
              api = nbDvThuocProvider;
              if (!phieuNhapXuatId) {
                moreParams.nhaThuoc = true;
                moreParams.loaiDonThuoc = loaiDonThuoc;
              }
              break;
            case 20:
              api = nbDvThuocProvider;
              if (!phieuNhapXuatId) {
                moreParams.nhaThuoc = true;
                moreParams.loaiDonThuoc = loaiDonThuoc;
              }
              break;
            case 30:
              api = nbDvThuocProvider;
              if (!phieuNhapXuatId) {
                moreParams.nhaThuoc = true;
                moreParams.loaiDonThuoc = loaiDonThuoc;
              }
              break;
            case 40:
              api = nbDvThuocProvider;
              if (!phieuNhapXuatId) {
                moreParams.nhaThuoc = true;
                moreParams.loaiDonThuoc = loaiDonThuoc;
              }
              break;
            default:
              break;
          }
          api
            .getDonChiDinh({
              nbDotDieuTriId,
              soPhieuId,
              phieuNhapXuatId,
              ...moreParams,
            })
            .then((s) => {
              printProvider
                .printPdfWithConditionInNhanh(s.data)
                .then(() => {
                  console.info("Print success");
                  resolve();
                })
                .catch((err) => {
                  message.error(
                    err?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                  );
                  reject(err);
                });
            })
            .catch((e) => {
              message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            });
        }
      });
    },
    inPhieuThuocKeNgoai: ({
      loaiDonThuoc,
      nbDotDieuTriId,
      soPhieuId,
      phieuNhapXuatId,
      ...payload
    }) => {
      return new Promise((resolve, reject) => {
        nbDvThuocChiDinhNgoaiProvider
          .getDonChiDinh({ nbDotDieuTriId, soPhieuId, phieuNhapXuatId })
          .then((s) => {
            printProvider
              .printPdfWithConditionInNhanh(s.data)
              .then(() => {
                console.info("Print success");
                resolve();
              })
              .catch((err) => {
                reject();
                message.error(
                  err?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                );
              });
          })
          .catch((e) => {
            reject();
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
  }),
};
