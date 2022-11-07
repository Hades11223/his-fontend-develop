import nbPhieuDoiTra from "data-access/nb-phieu-doi-tra-provider";
import utils from "data-access/utils-provider";
import { message } from "antd";
import { PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listData: [],
    chuaThanhToan: 0,
    daThanhToan: 0,
    tongSo: 0,
    totalElements: 0,
    page: PAGE_DEFAULT,
    size: 10,
    dataSearch: { dsTrangThai: [20] },
    dataSortColumn: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getStatistical: (dataSearch) => {
      nbPhieuDoiTra
        .getStatistical(dataSearch)
        .then((s) => {
          dispatch.danhSachPhieuYeuCauHoan.updateData(s.data);
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    onSizeChange: ({ size, ...rest }, state) => {
      dispatch.danhSachPhieuYeuCauHoan.updateData({
        size,
        page: 0,
      });
      dispatch.danhSachPhieuYeuCauHoan.onSearch({
        page: 0,
        size,
        ...rest
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.danhSachPhieuYeuCauHoan.updateData(newState);
      let size = payload?.size || state.danhSachPhieuYeuCauHoan?.size;
      const sort = combineSort(
        payload?.dataSortColumn ||
          state.danhSachPhieuYeuCauHoan?.dataSortColumn ||
          {}
      );
      const nbDotDieuTriId =
        payload?.nbDotDieuTriId ||
        state?.danhSachPhieuYeuCauHoan?.nbDotDieuTriId;

      const dataSearch =
        payload?.dataSearch || state?.danhSachPhieuYeuCauHoan?.dataSearch || {};

      return new Promise((resolve, reject) => {
        nbPhieuDoiTra
          .search({
            page,
            size,
            sort,
            ...dataSearch,
            nbDotDieuTriId,
            dsTrangThai: dataSearch?.dsTrangThai?.length
              ? dataSearch?.dsTrangThai
              : [20, 40],
          })
          .then((s) => {
            dispatch.danhSachPhieuYeuCauHoan.updateData({
              listData: (s?.data || []).map((item, index) => {
                item.stt = page * size + index + 1;
                item.tongDichVuTraLai = 0;
                item.tienNbTraThem = 0;
                const rangeTien = item.thanhTienCu - item.thanhTienMoi;
                if (rangeTien >= 0) {
                  item.tongDichVuTraLai = rangeTien;
                } else {
                  item.tienNbTraThem = rangeTien * -1;
                }
                return item;
              }),
              isLoading: false,
              totalElements: s?.totalElements || 0,
              page,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.danhSachPhieuYeuCauHoan.updateData({
              listData: [],
              isLoading: false,
            });
          });
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachPhieuThu.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachPhieuYeuCauHoan.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachPhieuYeuCauHoan.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.danhSachPhieuYeuCauHoan.dataSearch || {}),
        ...payload,
      };
      dispatch.danhSachPhieuYeuCauHoan.updateData({
        page: 0,
        dataSearch: dataSearch,
      });
      dispatch.danhSachPhieuYeuCauHoan.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getTrangThaiHoan: () => {
      return new Promise((resolve, reject) => {
        utils
          .search({ name: "trangThaiPhieuDoiTra" })
          .then((s) => {
            const trangThai = s?.data.map(
              (item) => item.name == "Chờ hoàn" || item.name == "Hoàn thành"
            );
            dispatch.danhSachPhieuYeuCauHoan({
              listTrangThai: trangThai,
            });
            resolve(trangThai);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.danhSachPhieuYeuCauHoan.updateData({
              listTrangThai: [],
            });
          });
      });
    },
    getChiTietPhieuDoiTra: ({ id }) => {
      return new Promise((resolve, reject) => {
        nbPhieuDoiTra
          .getChiTietPhieuDoiTra({ id })
          .then((s) => {
            if (s.code == 0) {
              const dsDichVuHoan = s?.data.dsDichVuHoan?.length
                ? s?.data?.dsDichVuHoan
                : [];
              const dsDichVuMoi = s?.data?.dsDichVuMoi?.length
                ? s?.data?.dsDichVuMoi
                : [];
              const tongThanhTienDvHoan = dsDichVuHoan.reduce((a, b) => {
                // return a?.thanhTien || 0 + b?.thanhTien || 0;
                return (a +=
                  s?.data.loai === 40 ? b?.thanhTienCu : b?.thanhTien);
              }, 0);
              const tongChiPhiHoanThuoc = dsDichVuHoan.reduce((a, b) => {
                // return a?.thanhTien || 0 + b?.thanhTien || 0;
                return (a += b?.tienPhiTra);
              }, 0);
              const slDsDichVuHoan = dsDichVuHoan.reduce((a, b) => {
                return a?.soLuong || 0 + b?.soLuong || 0;
              }, 0);
              const tongThanhTienDvMoi = dsDichVuMoi.reduce((a, b) => {
                return a?.thanhTien || 0 + b?.thanhTien || 0;
              }, 0);
              const slDsDichVuMoi = dsDichVuMoi.reduce((a, b) => {
                return a?.soLuong || 0 + b?.soLuong || 0;
              }, 0);
              const newData = {
                ...s.data,
                tongThanhTienDvHoan,
                slDsDichVuHoan,
                tongThanhTienDvMoi,
                slDsDichVuMoi,
                dsDichVuMoi,
                dsDichVuHoan,
                tongChiPhiHoanThuoc,
              };
              dispatch.danhSachPhieuYeuCauHoan.updateData({
                chiTietPhieuDoiTra: newData,
              });
              resolve(newData);
            } else {
              message.error(s.message, 5);
              resolve({});
            }
          })
          .catch((e) => {
            message.error(e.message, 5);
            reject();
          });
      });
    },
    confirmPhieuYeuCauHoan: ({ id }, state) => {
      return new Promise((resolve, reject) => {
        nbPhieuDoiTra
          .confirmPhieuDoiTra({ id })
          .then((s) => {
            if (s?.code == 0) {
              const dsDichVuHoan = s?.data.dsDichVuHoan?.length
                ? s?.data?.dsDichVuHoan
                : [];
              const dsDichVuMoi = s?.data?.dsDichVuMoi?.length
                ? s?.data?.dsDichVuMoi
                : [];
              const tongThanhTienDvHoan = dsDichVuHoan.reduce((a, b) => {
                return a?.thanhTien || 0 + b?.thanhTien || 0;
              }, 0);
              const slDsDichVuHoan = dsDichVuHoan.reduce((a, b) => {
                return a?.soLuong || 0 + b?.soLuong || 0;
              }, 0);
              const tongThanhTienDvMoi = dsDichVuMoi.reduce((a, b) => {
                return a?.thanhTien || 0 + b?.thanhTien || 0;
              }, 0);
              const slDsDichVuMoi = dsDichVuMoi.reduce((a, b) => {
                return a?.soLuong || 0 + b?.soLuong || 0;
              }, 0);
              const newData = {
                ...s.data,
                tongThanhTienDvHoan,
                slDsDichVuHoan,
                tongThanhTienDvMoi,
                slDsDichVuMoi,
                dsDichVuMoi,
                dsDichVuHoan,
              };
              dispatch.danhSachPhieuYeuCauHoan.updateData({
                chiTietPhieuDoiTra: newData,
              });
              resolve(newData);
            } else {
              message.error(s?.message, 5);
              reject(s.message);
            }
          })
          .catch((e) => {
            message.error(e?.message);
            reject();
          });
      });
    },
    getThongTinBenhNhan: ({ soPhieu, maHoSo }) => {
      return new Promise((resolve, reject) => {
        nbPhieuDoiTra
          .search({ soPhieu, maHoSo })
          .then((s) => {
            if (s.code == 0) {
              resolve(s.data[0]);
            } else {
              message.error(s.message, 5);
            }
          })
          .catch((e) => {
            message.error(e?.message);
          });
      });
    },
    onSearchChiTietPhieuHoan: ({ soPhieu }) => {
      return new Promise((resolve, reject) => {
        nbPhieuDoiTra
          .search({ soPhieu })
          .then((s) => {
            if (s.code == 0) {
              resolve(s.data);
            } else {
              message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message);
          });
      });
    },
    sinhPhieuChi: ({ lyDo } = {}, { nbDotDieuTri: { thongTinBenhNhan } }) => {
      dispatch.danhSachPhieuThu
        .onSearch({
          dataSearch: { thanhToan: true, maNb: thongTinBenhNhan.maNb },
        })
        .then((res) => {
          dispatch.danhSachPhieuYeuCauHoan.chiPhieuThu({
            dsPhieuThuId: res.data?.map((i) => i.id),
            lyDo,
          });
        });
    },
    chiPhieuThu: ({ ...payload }) => {
      return new Promise((resolve, reject) => {
        nbPhieuDoiTra
          .chiPhieuThu({ payload })
          .then((s) => {
            if (s.code === 0) {
              resolve(s.data);
              message.success("Sinh phiếu chi thành công");
            } else {
              message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message);
          });
      });
    },
    phieuChi: (id) => {
      return new Promise((resolve, reject) => {
        nbPhieuDoiTra
          .phieuChi(id)
          .then((s) => {
            if (s.code === 0) {
              resolve(s.data);
            } else {
              message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message);
          });
      });
    },
  }),
};
