import nbChuyenKhoaProvider from "data-access/noiTru/nb-chuyen-khoa-provider";
import dmSoHieuGiuongProvider from "data-access/categories/dm-so-hieu-giuong-provider";
import dmDichVuGiuongProvider from "data-access/categories/dm-dich-vu-giuong-provider";
import { message } from "antd";
import moment from "moment";
import { MODE_FILTER_GIUONG } from "constants/index";

export default {
  state: {
    dataSearch: {
      khoaId: null,
      phongId: null,
      giuongId: null,
      loaiPhong: null,
      tuThoiGian: moment().startOf("day"),
      denThoiGian: moment().endOf("day").add(1, "days"),
      filterMode: MODE_FILTER_GIUONG.ALL, //1: all, 2: giường trống, 3: giường có người bệnh
    },
    dataSortColumn: {},

    dsSoHieuGiuong: [],
    dsDVGiuong: [],

    nbSlTheoKhoa: {
      slGiuong: 0,
      slPhong: 0,
      slGiuongTrong: 0,
      slNb: 0,
    },

    nbSlTheoGiuong: [],

    dsNguoiBenh: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    updateDataSearch: (params, state) => {
      const newDataSearch = { ...state.soDoPhongGiuong.dataSearch, ...params };

      dispatch.soDoPhongGiuong.updateData({ dataSearch: newDataSearch });
    },

    resetDataSearch: (params, state) => {
      dispatch.soDoPhongGiuong.updateData({
        dataSearch: {
          khoaId: null,
          phongId: null,
          giuongId: null,
          loaiPhong: null,
          tuThoiGian: moment().startOf("day"),
          denThoiGian: moment().endOf("day").add(1, "days"),
          filterMode: MODE_FILTER_GIUONG.ALL, //1: all, 2: giường trống, 3: giường có người bệnh
        },
      });
    },

    getSoHieuGiuongByPhong: (params, state) => {
      return new Promise((resolve, reject) => {
        dmSoHieuGiuongProvider
          .search(params)
          .then((s) => {
            dispatch.soDoPhongGiuong.updateData({
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
          .search(params)
          .then((s) => {
            dispatch.soDoPhongGiuong.updateData({
              dsDVGiuong: (s?.data || []).map((x) => ({
                ...x,
                ten: x.dichVu?.ten,
              })),
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getNbSlTheoKhoa: (params, state) => {
      return new Promise((resolve, reject) => {
        nbChuyenKhoaProvider
          .getNbSlTheoKhoa(params)
          .then((s) => {
            dispatch.soDoPhongGiuong.updateData({
              nbSlTheoKhoa: {
                ...state.noiTruPhongGiuong.nbSlTheoKhoa,
                ...s?.data,
              },
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getNbSlTheoGiuong: (params, state) => {
      return new Promise((resolve, reject) => {
        nbChuyenKhoaProvider
          .getNbSlTheoGiuong(params)
          .then((s) => {
            dispatch.soDoPhongGiuong.updateData({
              nbSlTheoGiuong: s?.data || [],
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getDsNbTheoGiuong: (params, state) => {
      return new Promise((resolve, reject) => {
        nbChuyenKhoaProvider
          .searchPhongGiuong(params)
          .then((s) => {
            console.log("s", s);
            dispatch.soDoPhongGiuong.updateData({
              dsNguoiBenh: s?.data || {},
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
