import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import nbChuyenVienProvider from "data-access/noiTru/nb-chuyen-vien-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { t } from "i18next";

export default {
  state: {
    listNbLapBenhAn: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    dataSortColumn: {},
    thongTinBenhNhan: [],
    listNbTiepTheo: [],
    nbLapBenhAn: {},
    thongTinNb: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ ...rest }, state) => {
      dispatch.quanLyNoiTru.updateData({
        page: 0,
        ...rest,
      });
      dispatch.quanLyNoiTru.onSearch({ ...rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.quanLyNoiTru.updateData(newState);
      let size = payload.size || state.quanLyNoiTru.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.quanLyNoiTru.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.quanLyNoiTru.dataSearch || {};

      nbDotDieuTriProvider
        .getNbLapBenhAn({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.quanLyNoiTru.updateData({
            listNbLapBenhAn: (s?.data || []).map((item, index) => {
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
          dispatch.quanLyNoiTru.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.quanLyNoiTru.dataSortColumn,
        ...payload,
      };
      dispatch.quanLyNoiTru.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.quanLyNoiTru.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.quanLyNoiTru.dataSearch || {}),
        ...payload,
      };
      dispatch.quanLyNoiTru.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.quanLyNoiTru.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getNbLapBenhAnById: (id) => {
      nbDotDieuTriProvider.getNbLapBenhAnById(id).then((s) => {
        if (s?.code === 0) {
          dispatch.quanLyNoiTru.updateData({ nbLapBenhAn: s?.data });
        } else {
          dispatch.quanLyNoiTru.updateData({ nbLapBenhAn: {} });
        }
      });
    },
    postLapBenhAn: (payload) => {
      const id = payload.id;
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .postLapBenhAn(id, { ...payload, id: null })
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success("Lập bệnh án thành công");
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
    xoaBenhAn: (id) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .xoaBenhAn(id)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success("Xóa bệnh án thành công");
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

    huyBenhAn: (id) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .huyBenhAn(id)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success("Hủy bệnh án thành công");
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
    getGiayChuyenVienById: (id) => {
      return new Promise((resolve, reject) => {
        nbChuyenVienProvider
          .getById(id)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s.data);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    updateGiayChuyenVien: (data) => {
      return new Promise((resolve, reject) => {
        nbChuyenVienProvider
          .put(data)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s.data);
              message.success(t("common.capNhatThanhCong"));
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    getPhieuChuyenVien: ({ nbDotDieuTriId }) => {
      return new Promise((resolve, reject) => {
        nbChuyenVienProvider
          .getPhieuChuyenVien({ nbDotDieuTriId })
          .then((s) => {
            if (s?.code === 0) {
              resolve(s.data);
            } else {
              reject(s);
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
