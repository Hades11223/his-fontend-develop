import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import nbDvCdhaProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

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
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.dashboardCDHA.updateData({
        page: 0,
        ...rest,
      });
      dispatch.dashboardCDHA.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      console.log("payload: ", payload);
      let newState = { isLoading: true, page };
      dispatch.dashboardCDHA.updateData(newState);
      let size = payload.size || state.dashboardCDHA.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.dashboardCDHA.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dashboardCDHA.dataSearch || {};

      nbDvCdhaProvider
        .getDashboardTheoBacSi({
          page,
          size,
          sort,
          ...dataSearch,
          loaiThoiGian: payload.loaiThoiGian,
          tuThoiGian: payload.tuThoiGian,
          denThoiGian: payload.denThoiGian,
          dsPhongThucHienId: payload.dsPhongThucHienId,
        })
        .then((s) => {
          dispatch.dashboardCDHA.updateData({
            listTheoBacSi: (s?.data || []).map((item, index) => {
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
          dispatch.dashboardCDHA.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dashboardCDHA.dataSortColumn,
        ...payload,
      };
      dispatch.dashboardCDHA.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dashboardCDHA.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dashboardCDHA.dataSearch || {}),
        ...payload,
      };
      dispatch.dashboardCDHA.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dashboardCDHA.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getNbNoiTruById: (id) => {
      nbDotDieuTriProvider.getNbNoiTruById(id).then((s) => {
        if (s?.code === 0) {
          dispatch.dashboardCDHA.updateData({ infoPatient: s?.data });
        } else {
          dispatch.dashboardCDHA.updateData({ infoPatient: {} });
        }
      });
    },
    getDashboard: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .getDashboard(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              dispatch.dashboardCDHA.updateData({
                data: s.data,
              });
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
    getDashboardTheoNguonNb: (payload) => {
      return new Promise((resolve, reject) => {
        let promiseTheoNguonNb = nbDvCdhaProvider
          .getDashboardTheoNguonNb(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              dispatch.dashboardCDHA.updateData({
                listNguonNb: s.data,
              });
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
    getDashboardTheoThoiGian: (payload) => {
      return new Promise((resolve, reject) => {
        let promiseTheoNguonNb = nbDvCdhaProvider
          .getDashboardTheoThoiGian(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              dispatch.dashboardCDHA.updateData({
                listTheoThoiGian: s.data,
              });
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
    // getDashboardTheoBacSi: (payload) => {
    //   return new Promise((resolve, reject) => {
    //     let promiseTheoNguonNb = nbDvCdhaProvider
    //       .getDashboardTheoBacSi(payload)
    //       .then((s) => {
    //         if (s?.code === 0) {
    //           resolve(s);
    //           dispatch.dashboardCDHA.updateData({
    //             listTheoBacSi: s.data.map((item,index) => {
    //               item.index = index + 1
    //               return item
    //             }),
    //           });
    //         } else {
    //           reject(s);
    //           message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
    //         }
    //       })
    //       .catch((e) => {
    //         message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
    //         reject(e);
    //       });
    //   });
    // },
  }),
};
