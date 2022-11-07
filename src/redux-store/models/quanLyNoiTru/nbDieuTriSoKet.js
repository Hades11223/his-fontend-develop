import nbPhieuSoKetProvider from "data-access/nb-phieu-so-ket-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { t } from "i18next";
export default {
  state: {
    listDsPhieuSoKet: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    dataSortColumn: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.nbDieuTriSoKet.updateData({
        page: 0,
        ...rest,
      });
      dispatch.nbDieuTriSoKet.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.nbDieuTriSoKet.updateData(newState);
      let size = payload.size || state.nbDieuTriSoKet.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.nbDieuTriSoKet.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.nbDieuTriSoKet.dataSearch || {};

      nbPhieuSoKetProvider
        .searchAll({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.nbDieuTriSoKet.updateData({
            listDsPhieuSoKet: (s?.data || []).map((item, index) => {
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
          dispatch.nbDieuTriSoKet.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.nbDieuTriSoKet.dataSortColumn,
        ...payload,
      };
      dispatch.nbDieuTriSoKet.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nbDieuTriSoKet.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.nbDieuTriSoKet.dataSearch || {}),
        ...payload,
      };
      dispatch.nbDieuTriSoKet.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.nbDieuTriSoKet.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getById: (id, state) => {
      return new Promise((resolve, reject) => {
        nbPhieuSoKetProvider
          .getById(id)
          .then((s) => {
            dispatch.nbDieuTriSoKet.updateData({ nbPhieuSoKet: s.data });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            nbPhieuSoKetProvider
              .put(payload)
              .then((s) => {
                message.success(t("common.capNhatThanhCong"));
                dispatch.nbDieuTriSoKet.onSearch({
                  page: 0,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(
                  e?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                );
                reject();
              });
          } else {
            nbPhieuSoKetProvider
              .post(payload)
              .then((s) => {
                message.success(t("common.themMoiThanhCongDuLieu"));
                dispatch.nbDieuTriSoKet.onSearch({
                  page: 0,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(
                  e?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                );
                reject();
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    phieuSoKet: (id, state) => {
      return new Promise((resolve, reject) => {
        nbPhieuSoKetProvider
          .phieuSoKet(id)
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    onDelete: (id) => {
      return new Promise((resolve, reject) => {
        nbPhieuSoKetProvider
          .delete(id)
          .then((s) => {
            resolve(s);
            message.success(t("common.xoaDuLieuThanhCong"));
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    }
  }),
};
