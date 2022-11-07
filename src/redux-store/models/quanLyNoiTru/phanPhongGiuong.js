import dmPhongProvider from "data-access/categories/dm-phong-provider";
import dmSoHieuGiuongProvider from "data-access/categories/dm-so-hieu-giuong-provider";
import dmDichVuGiuongProvider from "data-access/categories/dm-dich-vu-giuong-provider";
import nbChuyenKhoaProvider from "data-access/noiTru/nb-chuyen-khoa-provider";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import dmTuyChonGiaProvider from "data-access/categories/dm-tuy-chon-gia-provider";
import { message } from "antd";
import { combineSort } from "utils";

export default {
  state: {
    dsPhong: [],
    dsGiuong: [],
    dsDVGiuong: [],
    dsNb: [],
    dsGiuongCuaNB: [],
    dsMucDichSuDung: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getDsPhongTheoKhoa: (params, state) => {
      return new Promise((resolve, reject) => {
        dmPhongProvider
          .searchAll(params)
          .then((s) => {
            dispatch.phanPhongGiuong.updateData({ dsPhong: s?.data || [] });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getSoHieuGiuongByPhong: (params, state) => {
      return new Promise((resolve, reject) => {
        dmSoHieuGiuongProvider
          .search(params)
          .then((s) => {
            dispatch.phanPhongGiuong.updateData({
              dsGiuong: (s?.data || []).map((x) => ({ ...x, ten: x.soHieu })),
            });
            resolve(s?.data || []);
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
            dispatch.phanPhongGiuong.updateData({
              dsDVGiuong: (s?.data || []).map((x) => ({
                ...x,
                ten: x.ten,
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

    getDsMucDichSuDungByDVGiuong: (params, state) => {
      return new Promise((resolve, reject) => {
        dmTuyChonGiaProvider
          .search(params)
          .then((s) => {
            const data = (s?.data || []).filter((x) => x.mucDich != null);

            dispatch.phanPhongGiuong.updateData({
              dsMucDichSuDung: data.map((x) => ({
                ...x,
                id: x.id,
                ten: x.mucDich,
              })),
            });

            resolve(data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getDsNbTheoKhoa: (params, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .getNbNoiTru(params)
          .then((s) => {
            dispatch.phanPhongGiuong.updateData({
              dsNb: s?.data || [],
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getPhongGiuongTheoNB: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbChuyenKhoaProvider.search(payload).then((s) => {
          dispatch.phanPhongGiuong.updateData({
            dsGiuongCuaNB: s.data || [],
          });
        });
      });
    },

    phanGiuong: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbChuyenKhoaProvider
          .phanGiuong(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success("Thêm mới thành công phòng giường");
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

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.phanPhongGiuong.updateData(newState);
      let size = payload.size || state.phanPhongGiuong.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.phanPhongGiuong.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.phanPhongGiuong.dataSearch || {};

      nbChuyenKhoaProvider
        .search({ page, size, ...dataSearch, sort })
        .then((s) => {
          dispatch.phanPhongGiuong.updateData({
            dsGiuongCuaNB: (s?.data || []).map((item, index) => {
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
          dispatch.phanPhongGiuong.updateData({
            dsGiuongCuaNB: [],
            isLoading: false,
          });
        });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.phanPhongGiuong.dataSearch || {}),
        ...payload,
      };
      dispatch.phanPhongGiuong.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.phanPhongGiuong.onSearch({
        page: 0,
        dataSearch,
      });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.phanPhongGiuong.dataSortColumn,
        ...payload,
      };
      dispatch.phanPhongGiuong.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.phanPhongGiuong.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
  }),
};
