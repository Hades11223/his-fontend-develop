import { cloneDeep } from "lodash";
import dmBoChiDinhChiTietProvider from "data-access/categories/dm-bo-chi-dinh-chi-tiet-provider";
import dmBoChiDinhProvider from "data-access/categories/dm-bo-chi-dinh-provider";
import { message } from "antd";
import dichVuProvider from "data-access/dich-vu-provider";
import dmHopDongKskGiamGiaProvider from "data-access/dm-hd-ksk-giam-gia-provider";
import dmHopDongKskProvider from "data-access/dm-hop-dong-ksk-provider";
import { t } from "i18next";

const initListGiamGiaByNhomDV = [
  { index: 1, ten: "Khám bệnh", loaiDichVu: 10, phanTramGiamGiaKhongBh: 0 },
  { index: 2, ten: "Xét nghiệm", loaiDichVu: 20, phanTramGiamGiaKhongBh: 0 },
  { index: 3, ten: "CDHA- TDCN", loaiDichVu: 30, phanTramGiamGiaKhongBh: 0 },
];

const initData = {
  //goi dich vu
  ttGoi: {
    ma: "",
    ten: "",
  },
  validGoi: {
    ma: true,
    ten: true,
  },
  chiTietGoi: {},

  //search
  totalElements: 0,
  page: 0,
  dataSearch: {},

  isLoading: false,

  listSearchDV: [], //tìm kiếm dịch vụ miễn giảm

  //tab list
  listDVChiTiet: [],
  listDVLe: [],
  listDVKSK: [],
  listGoi: {},
  listAllDV: [],

  dsGoi: [],
  dsDichVu: [],
  dsDichVuLe: [],

  listGoiDVKSK: [],
  listChooseDV: [],

  //danh sách dịch vụ miễn giảm ngoài hợp đồng
  listGiamGiaByNhomDV: initListGiamGiaByNhomDV,
  listGiamGiaByDV: [],
};

export default {
  state: cloneDeep(initData),
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData(state, payload = {}) {
      return { ...cloneDeep(initData), ...payload };
    },
  },
  effects: (dispatch) => ({
    //danh sách dịch vụ trong tab gói dv và tab dv lẻ
    getDsDichVuTheoGoi: ({ hopDongKskId, ...rest }) => {
      return new Promise((resolve, reject) => {
        dmBoChiDinhChiTietProvider
          .getListByHopDongKskId({ hopDongKskId, ...rest })
          .then((s) => {
            if (rest?.trongGoi) {
              dispatch.dichVuKSK.updateData({ dsGoi: s.data });
            } else {
              dispatch.dichVuKSK.updateData({ dsDichVuLe: s.data });
            }

            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    //danh sách dịch vụ trong tab dịch vụ
    getDsDichVu: ({ hopDongKskId, ...rest }) => {
      return new Promise((resolve, reject) => {
        dichVuProvider
          .getDvKsk({ hopDongKskId, ...rest })
          .then((s) => {
            dispatch.dichVuKSK.updateData({ dsDichVu: s.data });

            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    insertDichVuChiTiet: (payload, state) => {
      return new Promise((resolve, reject) => {
        dmBoChiDinhChiTietProvider
          .create(payload)
          .then((s) => {
            const { code, message: messageInfo } = s;
            if (code === 0) {
              message.success("Thêm mới dịch vụ thành công");
              resolve(s.data);
            } else {
              message.error(messageInfo.toString());
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    updateDichVuChiTiet: (payload, state) => {
      return new Promise((resolve, reject) => {
        dmBoChiDinhChiTietProvider
          .patch(payload)
          .then((s) => {
            const { code, message: messageInfo } = s;
            if (code === 0) {
              message.success("Cập nhật dịch vụ thành công");
              resolve(s.data);
            } else {
              message.error(messageInfo.toString());
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    deleteDichVuChiTiet: (id, state) => {
      return new Promise((resolve, reject) => {
        dmBoChiDinhChiTietProvider
          .delete(id)
          .then((s) => {
            const { code, message: messageInfo } = s;
            if (code === 0) {
              message.success("Xóa bản ghi thành công");

              resolve(s.data);
            } else {
              message.error(messageInfo.toString());
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    deleteMultiDichVuChiTiet: (dsIds, state) => {
      return new Promise((resolve, reject) => {
        dmBoChiDinhChiTietProvider
          .deleteMultiple(dsIds)
          .then((s) => {
            const { code, message: messageInfo } = s;
            if (code === 0) {
              message.success("Xóa bản ghi thành công");

              resolve(s.data);
            } else {
              message.error(messageInfo.toString());
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    searchDvKSK: async (payload, state) => {
      if (payload?.loaiDichVu == 150) {
        return new Promise((resolve, reject) => {
          dmBoChiDinhProvider
            .searchTongHop(payload)
            .then((s) => {
              if (s?.code === 0) {
                let data = s?.data || [];

                dispatch.dichVuKSK.updateData({
                  listGoiDVKSK: data,
                  listDVKSK: [],
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
      } else {
        return new Promise((resolve, reject) => {
          dichVuProvider
            .searchDvKhamSucKhoe(payload)
            .then((s) => {
              if (s?.code === 0) {
                let data = s?.data || [];

                dispatch.dichVuKSK.updateData({ listDVKSK: data });
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
      }
    },

    postGoiDichVu: ({ ...rest }) => {
      return new Promise((resolve, reject) => {
        dmBoChiDinhProvider
          .createGoiDVKSK(rest)
          .then((s) => {
            message.success("Thêm mới thành công gói dịch vụ");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e.message);
            reject(e);
          });
      });
    },

    updateGoiDichVu: ({ id, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        dmBoChiDinhProvider
          .patchGoiDVKSK(id, rest)
          .then((s) => {
            message.success("Cập nhật thành công gói dịch vụ");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e.message);
            reject(e);
          });
      });
    },

    patchSoLuongGoiDichVu: ({ id, soLuong }, state) => {
      return new Promise((resolve, reject) => {
        dmBoChiDinhProvider
          .patchGoiDVKSK(id, { soLuong })
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e.message);
            reject(e);
          });
      });
    },

    getGoiDichVu: (id) => {
      return new Promise((resolve, reject) => {
        dmBoChiDinhProvider
          .getGoiDVKSK(id)
          .then((s) => {
            dispatch.dichVuKSK.updateData({ chiTietGoi: s.data });
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    deleteGoiDichVu: (id, state) => {
      return new Promise((resolve, reject) => {
        dmBoChiDinhProvider
          .deleteGoiDVKSK(id)
          .then((s) => {
            const { code, message: messageInfo } = s;
            if (code === 0) {
              message.success("Xóa bản ghi thành công");

              resolve(s.data);
            } else {
              message.error(messageInfo.toString());
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    getListDVKT: (payload) => {
      return new Promise((resolve, reject) => {
        dichVuProvider.searchDvKhamSucKhoe(payload).then((s) => {
          dispatch.dichVuKSK.updateData({ listSearchDV: s.data });
          resolve(s.data);
        });
      });
    },

    validateTTGoi: (payload, state) => {
      return new Promise((resolve, reject) => {
        let _validGoi = {
          ma: true,
          ten: true,
        };

        if (state.dichVuKSK.ttGoi.ten == "") {
          message.error("Vui lòng nhập tên gói!");
          _validGoi = {
            ..._validGoi,
            ten: false,
          };
        }

        dispatch.dichVuKSK.updateData({
          validGoi: _validGoi,
        });

        const areTrue = Object.values(_validGoi).every(
          (value) => value === true
        );

        if (areTrue) resolve();
        else reject();
      });
    },
    insertMultipleDichVuChiTiet: (payload, state) => {
      return new Promise((resolve, reject) => {
        dmBoChiDinhChiTietProvider
          .batch(payload)
          .then((s) => {
            const { code, message: messageInfo } = s;
            if (code === 0) {
              message.success("Thêm mới dịch vụ thành công");
              resolve(s.data);
            } else {
              message.error(messageInfo.toString());
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    onMienGiam: ({ id, ...payload }) => {
      return new Promise(async (resolve, reject) => {
        dmHopDongKskProvider
          .mienGiam({ id, ...payload })
          .then((s) => {
            if (s.code === 0) {
              message.success(t("goiDichVu.taoMienGiamThanhCong"));
              dispatch.dichVuKSK.getDsDichVu({ hopDongKskId: id });
              dispatch.dichVuKSK.getDsDichVuTheoGoi({
                hopDongKskId: id,
                trongGoi: true,
              });
              dispatch.dichVuKSK.getDsDichVuTheoGoi({
                hopDongKskId: id,
                trongGoi: false,
              });
              dispatch.hopDongKSK.getHopDong(id);

              resolve(s.data);
            } else {
              message.error(s?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    //giam gia
    postGiamGia: (payload) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .mienGiam(payload)
          .then((s) => {
            message.success("Thêm mới thành công giảm giá");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Có lỗi xảy ra!");
            reject(e);
          });
      });
    },

    getListGiamGia: (payload, state) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskGiamGiaProvider.tongHop(payload).then((s) => {
          let listGiamGiaByNhomDV = cloneDeep(initListGiamGiaByNhomDV);

          const byNhomDV = s.data.filter((x) => x.maDichVu == null);
          const listGiamGiaByDV = s.data.filter((x) => x.loaiDichVu == null);

          byNhomDV.forEach((element) => {
            const index = state.dichVuKSK.listGiamGiaByNhomDV.findIndex(
              (x) => x.loaiDichVu === element.loaiDichVu
            );

            if (index !== -1) {
              listGiamGiaByNhomDV[index] = {
                ...listGiamGiaByNhomDV[index],
                ...element,
              };

              listGiamGiaByNhomDV[index].phanTramGiamGiaKhongBh =
                listGiamGiaByNhomDV[index].phanTramGiamGiaKhongBh || 0;
            }
          });
          dispatch.dichVuKSK.updateData({
            listGiamGiaByNhomDV,
            listGiamGiaByDV,
          });

          resolve(s.data);
        });
      });
    },

    deleteGiamGia: (id) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskGiamGiaProvider
          .delete(id)
          .then((s) => {
            message.success("Xóa thành công giảm giá");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e.message);
            reject(e);
          });
      });
    },

    postKetLuanKham: (payload) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskGiamGiaProvider
          .postKetLuanKham(payload)
          .then((s) => {
            message.success("Cập nhật thành công kết luận khám");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Có lỗi xảy ra!");
            reject(e);
          });
      });
    },
  }),
};
