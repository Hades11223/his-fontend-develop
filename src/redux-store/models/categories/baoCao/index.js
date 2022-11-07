import { message } from "antd";
import baoCaoProvider from "data-access/categories/dm-bao-cao-provider";
import baoCaoChanKyProvider from "data-access/categories/dm-bao-cao-chan-ky-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "../../../../data-access/api-base";
import { t } from "i18next";
export default {
  state: {
    listAllBaoCao: [],
    listBaoCao: [],
    listPhieu: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: baoCaoProvider.searchAll,
      KEY_CACHE: "DATA_ALL_BAO_CAO",
      model: "baoCao",
      fieldName: "BaoCao",
    }),

    onSizeChange: ({ size }, state) => {
      dispatch.baoCao.updateData({
        size,
        page: 0,
      });
      dispatch.baoCao.onSearch({ page: 0, size });
    },
    onSearch: async ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.baoCao.updateData(newState);
      let size = payload.size || state.baoCao.size || 10;
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.baoCao.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.baoCao.dataSearch || {};

      baoCaoProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          const listBaoCao = (s?.data || []).map((item, index) => {
            item.index = page * size + index + 1;
            return item;
          });
          dispatch.baoCao.updateData({
            listBaoCao,
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.baoCao.updateData({
            listBaoCao: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.baoCao.dataSortColumn,
        ...payload,
      };
      dispatch.baoCao.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.baoCao.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.baoCao.dataSearch || {}),
        ...payload,
      };
      dispatch.baoCao.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.baoCao.onSearch({
        page: 0,
        dataSearch,
      });
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            baoCaoProvider
              .patch(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu báo cáo!", 20);

                let data = (state.baoCao.listBaoCao || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.baoCao.updateData({
                  currentItem: null,
                  listBaoCao: data,
                  dataEditDefault: { ...state.baoCao.dataEditDefault, payload },
                });
                resolve();
              })
              .catch((e) => {
                console.log(e.message);
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          } else {
            baoCaoProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu báo cáo!", 20);
                dispatch.baoCao.updateData({ currentItem: null });
                dispatch.baoCao.onSearch({
                  page: 0,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    createThietLapChanKy: async (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoChanKyProvider
          .create(payload)
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.baoCao.updateData({
                dataChanKy: data,
              });
              message.success("Thêm mới thành công dữ liệu thiết lập chân ký!");
              return resolve(s);
            } else {
              message.error(s?.message);
              return reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            return reject(e);
          });
      });
    },
    patchThietLapChanKy: async (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoChanKyProvider
          .patch(payload)
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              message.success("Cập nhật thành công dữ liệu thiết lập chân ký!");
              dispatch.baoCao.updateData({
                dataChanKy: data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getByBaoCaoId: async (id, state) => {
      return new Promise((resolve, reject) => {
        baoCaoChanKyProvider
          .getByBaoCaoId(id)
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.baoCao.updateData({
                dataChanKy: data,
              });
              return resolve(s);
            } else {
              dispatch.baoCao.updateData({
                dataChanKy: null,
              });
              return reject(s);
              // message.error(
              //   s?.message == "Network Error"
              //     ? "Đang cập nhật hệ thống"
              //     : s?.message || "Xảy ra lỗi, vui lòng thử lại sau"
              // );
            }
          })
          .catch((e) => {
            dispatch.baoCao.updateData({
              dataChanKy: null,
            });
            return reject(e);
            // message.error(e?.message);
          });
      });
    },
    tongHop: async (id, state) => {
      return new Promise((resolve, reject) => {
        baoCaoProvider
          .searchTongHop()
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.baoCao.updateData({
                listPhieu: data,
              });
              return resolve(s);
            } else {
              return reject(s);
              // message.error(
              //   s?.message == "Network Error"
              //     ? "Đang cập nhật hệ thống"
              //     : s?.message || "Xảy ra lỗi, vui lòng thử lại sau"
              // );
            }
          })
          .catch((e) => {
            return reject(e);
          });
      });
    },
    getById: (payload) => {
      return new Promise((resolve, reject) => {});
    },
    getLichSuBaoCao: (payload) => {
      return new Promise((resolve, reject) => {
        baoCaoProvider
          .getLichSuBaoCao(payload)
          .then((s) => {
            if (s?.code === 0) {
              const listLichSuBaoCao = s.data
                .map((item) => {
                  return {
                    ...item,
                    bieuMauGoc: item.ten.includes("V0"),
                  };
                })
                .sort(
                  (a, b) =>
                    new Date(a.thoiGianTao).getTime() -
                    new Date(b.thoiGianTao).getTime()
                );

              dispatch.baoCao.updateData({
                listLichSuBaoCao,
              });
              return resolve(s);
            } else {
              return reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            return reject(e);
          });
      });
    },
    deleteLichSuBaoCao: (id, state) => {
      return new Promise((resolve, reject) => {
        baoCaoProvider
          .deleteLichSuBaoCao(id)
          .then((s) => {
            const listLichSuBaoCao = state.baoCao.listLichSuBaoCao.filter(
              (item) => item.id !== id
            );
            dispatch.baoCao.updateData({
              listLichSuBaoCao,
            });
            message.success(t("common.xoaDuLieuThanhCong"));
            return resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            return reject(e);
          });
      });
    },
    createLichSuBaoCao: (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoProvider
          .createLichSuBaoCao(payload)
          .then((s) => {
            message.success(t("common.themMoiThanhCongDuLieu"));
            return resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            return reject(e);
          });
      });
    },
  }),
};
