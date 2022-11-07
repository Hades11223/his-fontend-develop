import nbChuyenKhoaProvider from "data-access/noiTru/nb-chuyen-khoa-provider";
import dmSoHieuGiuongProvider from "data-access/categories/dm-so-hieu-giuong-provider";
import dmDichVuGiuongProvider from "data-access/categories/dm-dich-vu-giuong-provider";
import nbDvGiuongProvider from "data-access/nb-dv-giuong-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    dsPhongGiuong: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataTinhTien: [],
    dataSearch: {},
    dataSortColumn: {},
    dsSoHieuGiuong: [],
    dsDVGiuong: [],

    nbSlTheoKhoa: {
      slGiuong: 0,
      slPhong: 0,
      slGiuongTrong: 0,
      slNb: 0,
    },

    nbSlTheoGiuong: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.noiTruPhongGiuong.updateData({
        page: 0,
        size,
      });
      dispatch.noiTruPhongGiuong.onSearch({ size, page: 0 });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        let size = payload.size || state.noiTruPhongGiuong.size || 10;

        nbChuyenKhoaProvider
          .searchPhongGiuong(payload)
          .then((s) => {
            if (s?.code === 0) {
              dispatch.noiTruPhongGiuong.updateData({
                dsPhongGiuong: (s?.data || []).map((item, index) => {
                  item.index = page * size + index + 1;
                  return item;
                }),
                totalElements: s?.totalElements || 0,
                page,
              });

              resolve(s);
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.noiTruPhongGiuong.dataSortColumn,
        ...payload,
      };
      dispatch.noiTruPhongGiuong.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.noiTruPhongGiuong.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.noiTruPhongGiuong.dataSearch || {}),
        ...payload,
      };
      dispatch.noiTruPhongGiuong.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.noiTruPhongGiuong.onSearch({
        page: 0,
        dataSearch,
      });
    },

    getSoHieuGiuongByPhong: (params, state) => {
      return new Promise((resolve, reject) => {
        dmSoHieuGiuongProvider
          .search(params)
          .then((s) => {
            dispatch.noiTruPhongGiuong.updateData({
              dsSoHieuGiuong: s?.data || [],
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getDsDVGiuong: (params, state) => {
      return new Promise((resolve, reject) => {
        dmDichVuGiuongProvider
          .searchTongHop(params)
          .then((s) => {
            dispatch.noiTruPhongGiuong.updateData({
              dsDVGiuong: (s?.data || []).map((x) => ({
                ...x,
                id: x.dichVuId,
                ten: x.ten,
              })),
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    updatePhongGiuong: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbChuyenKhoaProvider
          .put(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success("Cập nhật thành công phòng giường");
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getChiTietDvGiuong: (params, state) => {
      return new Promise((resolve, reject) => {
        nbDvGiuongProvider
          .getChiTietDVGiuong(params)
          .then((s) => {
            dispatch.noiTruPhongGiuong.updateData({
              dsChiTietGiuong: (s?.data || []).map((item, idx) => ({
                ...item,
                index: idx + 1,
              })),
            });
            resolve(s?.data || []);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    postChiTietDvGiuong: (body, state) => {
      return new Promise((resolve, reject) => {
        nbDvGiuongProvider
          .post(body)
          .then((s) => {
            if ((s?.data || []).every((x) => x.code === 0)) {
              resolve(s?.data);
              message.success("Thêm mới thành công chi tiết giường");
            } else {
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    patchChiTietDvGiuong: (body, state) => {
      return new Promise((resolve, reject) => {
        nbDvGiuongProvider
          .chinhSuaChiTietDVGiuong(body)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s?.data);
              message.success("Chỉnh sửa thành công chi tiết giường");
            } else {
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    tinhTienDvGiuong: (body, state) => {
      return new Promise((resolve, reject) => {
        nbDvGiuongProvider
          .tinhTienDVGiuong(body)
          .then((s) => {
            resolve(s?.data);
            dispatch.noiTruPhongGiuong.updateData({
              dataTinhTien: s?.data,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    deleteChiTietDvGiuong: (id, state) => {
      return new Promise((resolve, reject) => {
        nbDvGiuongProvider
          .delete(id)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success("Xóa thành công dịch vụ giường");
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    deletePhongGiuong: (id, state) => {
      return new Promise((resolve, reject) => {
        nbChuyenKhoaProvider
          .delete(id)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success("Xóa thành công phòng giường");
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
