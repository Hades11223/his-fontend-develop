import nbDichVuXN from "data-access/nb-dv-xet-nghiem-provider";
import { combineSort } from "utils";
import { message } from "antd";
import { t } from "i18next";

export default {
  state: {
    dataSearch: {},
    dataSortColumn: {},
    listData: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.nbXetNghiem.updateData({
        page: 0,
        dataSearch,
        ...rest,
      });
      dispatch.nbXetNghiem.getBNXetNghiem(rest);
    },
    getBNXetNghiem: ({ page = 0, ...payload }, state) => {
      const { dataSortColumn, dataSearch, ...rest } = payload;
      const phongLayMauId =
        rest.phongLayMauId || state.nbXetNghiem.phongLayMauId;
      const phongThucHienId =
        rest.phongThucHienId || state.nbXetNghiem.phongThucHienId;
      const size = rest.size || state.nbXetNghiem.size;
      const sort = combineSort(
        dataSortColumn || state.nbXetNghiem.dataSortColumn || {}
      );
      let dsNhomDichVuCap2Id = null;
      const dataSearchBN = dataSearch || state.nbXetNghiem.dataSearch || {};
      if (window.location.pathname.includes("/sinh-hoa-huyet-hoc")) {
        dsNhomDichVuCap2Id =
          state?.xnHuyetHocSinhHoa.dsNhomDichVuCap2Id || null;
      } else if (
        window.location.pathname.includes("/giai-phau-benh-vi-ky-sinh")
      ) {
        dsNhomDichVuCap2Id =
          state?.xnGiaiPhauBenhViSinh.dsNhomDichVuCap2Id || null;
      }
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .getBNXetNghiem({
            page,
            size,
            sort,
            phongLayMauId,
            phongThucHienId,
            dsNhomDichVuCap2Id,
            ...dataSearchBN,
            ...rest,
          })
          .then((s) => {
            resolve(s?.data);
            dispatch.nbXetNghiem.updateData({
              listData: (s?.data || []).map((item, index) => {
                item.index = page * size + index + 1;
                return item;
              }),
              totalElements: s?.totalElements || 0,
              page,
              size,
            });
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            dispatch.nbXetNghiem.updateData({
              listData: [],
            });
            dispatch.layMauXN.updateData({
              nbDotDieuTriId: null,
            });
            reject(e);
          });
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.nbXetNghiem.dataSortColumn,
        ...payload,
      };
      dispatch.nbXetNghiem.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nbXetNghiem.getBNXetNghiem({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const { phongLayMauId, dsTrangThai } = state.nbXetNghiem;
      const updatedDsTrangThai =
        (payload["dsTrangThai"]?.length && payload["dsTrangThai"]) ||
        (dsTrangThai?.length && dsTrangThai) ||
        state.nbXetNghiem.dataSearch?.dsTrangThai ||
        null;
      const dataSearch = {
        ...(state.nbXetNghiem.dataSearch || {}),
        phongLayMauId,
        dsTrangThai: updatedDsTrangThai,
        ...payload,
      };
      dispatch.nbXetNghiem.updateData({
        page: 0,
        dataSearch: dataSearch,
      });
      dispatch.layMauXN.updateData({
        dsTrangThai: updatedDsTrangThai,
      });
      return new Promise((resolve, reject) => {
        dispatch.nbXetNghiem
          .getBNXetNghiem({
            page: 0,
            dataSearch,
          })
          .then((s) => {
            resolve(s);
          });
      });
    },
  }),
};
