import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import nbTheBaoHiemProvider from "data-access/nb-the-bao-hiem-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { t } from "i18next";
import tiepDonProvider from "data-access/tiepdon-provider";
import { THIET_LAP_CHUNG } from "constants/index";
export default {
  state: {
    listDsGiaHanThe: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},
    dataSortColumn: {},
    listDanhSachThe: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ ...rest }, state) => {
      dispatch.giaHanTheChuyenDoiTuong.updateData({
        page: 0,
        ...rest,
      });
      dispatch.giaHanTheChuyenDoiTuong.onSearch({ ...rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.giaHanTheChuyenDoiTuong.updateData(newState);
      let size = payload.size || state.giaHanTheChuyenDoiTuong.size || 10;
      const sort = combineSort(
        payload.dataSortColumn ||
          state.giaHanTheChuyenDoiTuong.dataSortColumn ||
          {}
      );
      const dataSearch =
        payload.dataSearch || state.giaHanTheChuyenDoiTuong.dataSearch || {};

      nbDotDieuTriProvider
        .getNbNoiTru({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.giaHanTheChuyenDoiTuong.updateData({
            listDsGiaHanThe: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          dispatch.giaHanTheChuyenDoiTuong.updateData({
            listDsGiaHanThe: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.giaHanTheChuyenDoiTuong.dataSortColumn,
        ...payload,
      };
      dispatch.giaHanTheChuyenDoiTuong.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.giaHanTheChuyenDoiTuong.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.giaHanTheChuyenDoiTuong.dataSearch || {}),
        ...payload,
      };
      dispatch.giaHanTheChuyenDoiTuong.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.giaHanTheChuyenDoiTuong.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getDanhSachThe: ({ ...payload }, state) => {
      nbTheBaoHiemProvider
        .search({ ...payload })
        .then((s) => {
          dispatch.giaHanTheChuyenDoiTuong.updateData({
            listDanhSachThe: s?.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          dispatch.giaHanTheChuyenDoiTuong.updateData({
            listDanhSachThe: [],
            isLoading: false,
          });
        });
    },
    deleteGiaHanThe: (id) => {
      return new Promise((resolve, reject) => {
        nbTheBaoHiemProvider
          .delete(id)
          .then((s) => {
            resolve(s);
            message.success(t("common.xoaDuLieuThanhCong"));
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    giamDinhThe: (payload, state) => {
      return new Promise((resolve, reject) => {
        tiepDonProvider.giamDinhThe(payload).then((s) => {
          const dsMaLoi = (
            state.thietLap["data" + THIET_LAP_CHUNG.MA_LOI_BH_DUOC_TIEP_DON] ||
            ""
          ).split(",");
          if ((s.code === 0 && s.data) || dsMaLoi.includes(s.data?.maKetQua)) {
            s.code = 0;
            resolve(s);
          } else {
            resolve(s);
          }
        }).catch((e) => {
          message.error(e?.message);
          reject(e);
        });
      }).catch((e) => {
        message.error(e?.message);
      });
    },
    createOrEditAssurance: (payload) => {
      return new Promise((resolve, reject) => {
        nbTheBaoHiemProvider
          .post(payload)
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
  }),
};
