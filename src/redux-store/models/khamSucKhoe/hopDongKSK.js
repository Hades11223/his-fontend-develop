import { cloneDeep } from "lodash";
import dmHopDongKskProvider from "data-access/dm-hop-dong-ksk-provider";
import dmHopDongKskTrangThaiTTProvider from "data-access/dm-hd-ksk-trang-thai-tt-provider";
import danhSachPhuongThucTtProvider from "data-access/categories/dm-phuong-thuc-tt-provider";
import nbPhieuThuKSKProvider from "data-access/nb-phieu-thu-ksk-provider";
import nbPhieuThuThanhToanProvider from "data-access/nb-phieu-thu-thanh-toan-provider";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import nbDvKyThuatProvider from "data-access/nb-dv-ky-thuat-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { t } from "i18next";
import nbPhieuThuProvider from "data-access/nb-phieu-thu-provider";

const initData = {
  //list hop dong
  listData: [],
  listDataTongHop: [],
  chiTietHopDong: {},
  ttHopDong: {
    ten: "",
    doiTacId: null,
  },
  validTTHopDong: {
    ten: true,
    doiTacId: true,
  },

  //search
  totalElements: 0,
  page: 0,
  dataSearch: {},
  dataSortColumn: {
    thoiGianTao: "desc",
  },

  isLoading: false,

  listTrangThaiTT: [
    {
      key: "1",
      ten: "Khám bệnh",
      loaiDichVu: 10,
      trangThai: 150,
    },
    {
      key: "2",
      ten: "Xét nghiệm",
      loaiDichVu: 20,
      trangThai: 155,
    },
    {
      key: "3",
      ten: "CĐHA-TDCN",
      loaiDichVu: 30,
      trangThai: 155,
    },
  ],

  dsPhuongThucTt: [],

  dsPhieuThu: [],

  selectedPhieuThu: null,
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
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.hopDongKSK.updateData({
        page: 0,
        dataSearch: { ...state.hopDongKSK.dataSearch, ...dataSearch },
        ...rest,
      });
      dispatch.hopDongKSK.onSearch({ ...rest });
    },

    searchHopDongByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        dataSearch: {
          ...state.hopDongKSK.dataSearch,
          ...payload,
        },
      };

      dispatch.hopDongKSK.updateData({
        page: 0,
        ...obj,
      });
      dispatch.hopDongKSK.onSearch({ ...obj });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.hopDongKSK.dataSortColumn,
        ...payload,
      };
      dispatch.hopDongKSK.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.hopDongKSK.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.hopDongKSK.updateData(newState);
      let size = payload.size || state.hopDongKSK.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.hopDongKSK.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.hopDongKSK.dataSearch || {};

      dmHopDongKskProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.hopDongKSK.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.hopDongKSK.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    taoMoiHopDong: (payload) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .taoMoiHopDong(payload)
          .then((s) => {
            message.success("Tạo mới thành công hợp đồng khám sức khỏe");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Có lỗi xảy ra!");
            reject(e);
          });
      });
    },

    taoMoiHopDongTuDS: (payload) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .taoMoiHopDongTuDS(payload)
          .then((s) => {
            message.success("Tạo mới thành công hợp đồng khám sức khỏe");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Có lỗi xảy ra!");
            reject(e);
          });
      });
    },

    getHopDong: (id) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .getById(id)
          .then((s) => {
            dispatch.hopDongKSK.updateData({ chiTietHopDong: s.data });
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    deleteHopDong: (id) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .delete(id)
          .then((s) => {
            message.success("Xóa thành công hợp đồng");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e.message);
            reject(e);
          });
      });
    },

    updateHopDong: ({ id, ...payload }) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .patch({ id, ...payload })
          .then((s) => {
            message.success("Cập nhật thành công hợp đồng");
            dispatch.hopDongKSK.getHopDong(id);
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e.message);
            reject(e);
          });
      });
    },

    //phieu thu
    getPhieuThu: (id) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuKSKProvider
          .get(id)
          .then((s) => {
            dispatch.hopDongKSK.updateData({
              dsPhieuThu: s.data.map((item, index) => {
                return {
                  index: index + 1,
                  ...item,
                };
              }),
            });
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    getDsPhieuThu: (id) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuProvider
          .searchTongHopKSK(id)
          .then((s) => {
            dispatch.hopDongKSK.updateData({
              dsPhieuThu: s.data.map((item, index) => {
                return {
                  index: index + 1,
                  ...item,
                };
              }),
            });
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    huyThanhToanPhieuThu: (id) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuProvider
          .huyThanhToan(id)
          .then((s) => {
            message.success("Hủy thanh toán phiếu thu thành công!");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    xoaPhieuThu: (id) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuProvider
          .xoaPhieu(id)
          .then((s) => {
            message.success("Hủy thanh toán phiếu thu thành công!");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    thanhToanPhieuThu: ({ id, ...rest }) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuProvider
          .thanhToan({ id, ...rest })
          .then((s) => {
            message.success("Thanh toán phiếu thu thành công!");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    postThanhToan: ({ nbDotDieuTriId, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuThanhToanProvider
          .post(rest)
          .then((s) => {
            message.success("Thanh toán phiếu thu thành công");

            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    thanhToanKSK: ({ nbDotDieuTriId, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuProvider
          .thanhToanKSK(rest)
          .then((s) => {
            message.success("Thanh toán phiếu thu thành công");

            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    //trang thai thanh toan DV
    postTrangThaiTTDV: ({ ...rest }) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskTrangThaiTTProvider
          .post(rest)
          .then((s) => {
            message.success("Thêm mới thành công trạng thái");
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    getTrangThaiTT: (payload, state) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskTrangThaiTTProvider.get(payload).then((s) => {
          let listTrangThaiTT = cloneDeep(state.hopDongKSK.listTrangThaiTT);

          if (s.data != null) {
            const index = listTrangThaiTT.findIndex(
              (x) => x.loaiDichVu === s.data.loaiDichVu
            );

            if (index !== -1) {
              listTrangThaiTT[index] = { ...listTrangThaiTT[index], ...s.data };
              dispatch.hopDongKSK.updateData({
                listTrangThaiTT,
              });
            }
          }
          resolve(s.data);
        });
      });
    },

    updateTrangThaiTT: (payload) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskTrangThaiTTProvider
          .patch(payload)
          .then((s) => {
            message.success("Cập nhật thành công trạng thái");
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    //thanh toan
    getPhuongThucTT: (payload) => {
      danhSachPhuongThucTtProvider
        .search(payload)
        .then((s) => {
          dispatch.hopDongKSK.updateData({
            dsPhuongThucTt: s.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },

    //validate
    validateTTHopdong: (payload, state) => {
      return new Promise((resolve, reject) => {
        let _validTTHopDong = {
          ten: true,
          doiTacId: true,
        };

        if (state.hopDongKSK.ttHopDong.ten == "") {
          _validTTHopDong = {
            ..._validTTHopDong,
            ten: false,
          };
        }

        dispatch.hopDongKSK.updateData({
          validTTHopDong: _validTTHopDong,
        });

        const areTrue = Object.values(_validTTHopDong).every(
          (value) => value === true
        );

        if (areTrue) resolve();
        else reject();
      });
    },

    searchMaNb: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .kiemTraThanhToan(payload)
          .then((s) => {
            if (
              s.code == 0 ||
              s.code == 7925 ||
              s.code == 7924 ||
              s.code == 7922
            )
              resolve(s);
            else {
              if (s.message) {
                message.error(s.message);
              }
              console.log("s.data", s.data);
              // dispatch.hopDongKSK.updateData(s.data);
            }
          })
          .catch((e) => {
            message.error(
              e.message || t("tiepDon.khongTimThayThongTinBenhNhan")
            );
          });
      });
    },

    thanhLyHD: (id, state) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .thanhLyHD(id)
          .then((s) => {
            if (s?.code == 0) {
              message.success("Thanh lý thành công hợp đồng");
            }
            resolve(s);
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    xacNhanThanhLyHD: (id, state) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .xacNhanThanhLyHD(id)
          .then((s) => {
            message.success("Thanh lý thành công hợp đồng");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    huyThanhLyHD: (id, state) => {
      return new Promise((resolve, reject) => {
        dmHopDongKskProvider
          .huyThanhLyHD(id)
          .then((s) => {
            message.success("Hủy thanh lý thành công hợp đồng");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    inGiayKskHopDong: ({ id, tuSo, denSo }, state) => {
      return new Promise((resolve, reject) => {
        nbDvKhamProvider
          .inGiayKskHopDong({ hopDongKskId: id, tuSo, denSo })
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    inPhieuHdKskHopDong: ({ id, tuSo, denSo }, state) => {
      return new Promise((resolve, reject) => {
        nbDvKyThuatProvider
          .inPhieuHdKskHopDong({ hopDongKskId: id, tuSo, denSo })
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getListTongHop: ({ page = 0, ...payload }, state) => {
      let size = payload.size || 500;

      dmHopDongKskProvider
        .searchAll({ page, size, ...payload })
        .then((s) => {
          dispatch.hopDongKSK.updateData({
            listDataTongHop: s?.data || [],
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.hopDongKSK.updateData({
            listDataTongHop: [],
          });
        });
    },
    inPhieuXacNhanThucHienDichVu: ({ id, tuSo, denSo }, state) => {
      return new Promise((resolve, reject) => {
        nbDvKyThuatProvider
          .getPhieuXacNhanThucHienDichVu({ hopDongKskId: id, tuSo, denSo })
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
