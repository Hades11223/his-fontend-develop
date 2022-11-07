import nbDichVuTamUngProvider from "data-access/nb-goi-dv-tam-ung-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { t } from "i18next";
import nbGoiDvProvider from "data-access/nb-goi-dv-provider";

export default {
  state: {
    listThanhToanGoi: [],
    // page: 0,
    // size: 0,
    // totalElements: 0,
    dataSortColumn: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.thanhToanGoi.updateData({
        // page: 0,
        ...rest,
      });
      dispatch.thanhToanGoi.onSearch({ ...rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = {
        isLoading: true,
        // page
      };
      dispatch.thanhToanGoi.updateData(newState);
      // let size = payload.size || state.thanhToanGoi.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.thanhToanGoi.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.thanhToanGoi.dataSearch || {};
      return new Promise((resolve, reject) => {
        nbDichVuTamUngProvider
          .search({
            page: "",
            size: "",
            sort,
            ...dataSearch,
          })
          .then((s) => {
            const listThanhToanGoi = (s?.data || []).map((item, index) => {
              item.index =
                // page * size +
                index + 1;
              return item;
            });
            dispatch.thanhToanGoi.updateData({
              listThanhToanGoi,
              isLoading: false,
              // totalElements: s?.totalElements || 0,
              // page,
              // size,
              dataSearch,
            });
            resolve(listThanhToanGoi);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            dispatch.thanhToanGoi.updateData({
              listThanhToanGoi: [],
              isLoading: false,
            });
            reject([]);
          });
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.thanhToanGoi.dataSortColumn,
        ...payload,
      };
      dispatch.thanhToanGoi.updateData({
        // page: 0,
        dataSortColumn,
      });
      dispatch.thanhToanGoi.onSearch({
        // page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.thanhToanGoi.dataSearch || {}),
        ...payload,
      };
      dispatch.thanhToanGoi.updateData({
        // page: 0,
        dataSearch,
      });
      dispatch.thanhToanGoi.onSearch({
        // page: 0,
        dataSearch,
      });
    },
    onTaoThanhToan: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { nbDotDieuTriId, nbGoiDvId, dsPhuongThucTt, tongTien } = payload;
        nbDichVuTamUngProvider
          .thanhToanGoi({
            nbDotDieuTriId,
            nbGoiDvId,
            tongTien,
            dsPhuongThucTt,
          })
          .then((s) => {
            dispatch.nbGoiDv.getById(s.data?.nbGoiDvId);
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    onHuyThanhToan: ({ id, lyDo, nbGoiDvId, ...payload }) => {
      return new Promise((resolve, reject) => {
        nbDichVuTamUngProvider
          .huyThanhToan({ id, lyDo, ...payload })
          .then((s) => {
            dispatch.nbGoiDv.getById(nbGoiDvId);
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    onPhieuThu: (id) => {
      return new Promise((resolve, reject) => {
        nbDichVuTamUngProvider
          .phieuThu(id)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },

    onPhieuHoan: ({ nbGoiDvId }) => {
      return new Promise((resolve, reject) => {
        nbGoiDvProvider
          .getPhieuHoan({ nbGoiDvId })
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
  }),
};
