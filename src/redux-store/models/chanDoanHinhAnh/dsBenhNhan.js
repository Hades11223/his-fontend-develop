import dsBenhNhanProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    listDataLimit: [],
    // dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
    dataSortColumn: { active: 2, maHoSo: "desc" },
    dataSortColumn1: { maHoSo: "desc" },
    thongTinBenhNhan: [],
    listNbTiepTheo: [],
    nguoiThucHienId: null,
    dieuDuongId: null,
    listSelectedId: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.dsBenhNhan.updateData({
        page: 0,
        ...rest,
      });

      dispatch.dsBenhNhan.onSearch({ rest });
    },
    onSearch: ({ page = 0, isSelectLimit = false, ...payload }, state) => {
      let paramCheck = ["/chan-doan-hinh-anh/cho-tiep-don"].includes(
        window.location.pathname
      );

      let newState = { isLoading: true, page };
      dispatch.dsBenhNhan.updateData(newState);
      let size = payload.size || state.dsBenhNhan.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.dsBenhNhan.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dsBenhNhan.dataSearch || {};

      let dsNhomDichVuCap2Id = "";
      let dsKhoaThucHienId = "";
      let dsPhongThucHienId = "";
      if (paramCheck) {
        dsNhomDichVuCap2Id =
          payload.dsNhomDichVuCap2Id || state.dsBenhNhan?.dsNhomDichVuCap2Id;
        dsKhoaThucHienId =
          payload.dsKhoaThucHienId || state.dsBenhNhan?.dsKhoaThucHienId;
      } else {
        dsPhongThucHienId =
          payload.dsPhongThucHienId || state.dsBenhNhan?.dsPhongThucHienId;
      }
      return new Promise((resolve, reject) => {
        dsBenhNhanProvider
          .getDanhSachBNCLS({
            page,
            sort,
            dsNhomDichVuCap2Id,
            dsKhoaThucHienId,
            dsPhongThucHienId,
            size,
            ...dataSearch,
          })
          .then((s) => {
            resolve(s?.data);
            if (isSelectLimit) {
              dispatch.dsBenhNhan.updateData({
                listDataLimit: (s?.data || []).map((item, index) => {
                  item.index = page * size + index + 1;
                  return item;
                }),
                isLoading: false,
                // totalElements: s?.totalElements || 0,
                // page,
              });
            } else {
              dispatch.dsBenhNhan.updateData({
                listData: (s?.data || []).map((item, index) => {
                  item.index = page * size + index + 1;
                  return item;
                }),
                isLoading: false,
                totalElements: s?.totalElements || 0,
                page,
              });
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.dsBenhNhan.updateData({
              listData: [],
              isLoading: false,
            });
          });
      });
    },

    onChangeInputSearch: (
      { isSelectLimit = false, khamSucKhoe, size, ...payload },
      state
    ) => {
      // Dont save khamSucKhoe variable in redux store
      const dataSearch = {
        ...(state.dsBenhNhan.dataSearch || {}),
        ...payload,
      };
      dispatch.dsBenhNhan.updateData({
        page: 0,
        dataSearch,
        size:
          (isSelectLimit ? state.dsBenhNhan.size : size) ||
          state.dsBenhNhan.size,
      });
      return new Promise((resolve, reject) => {
        dispatch.dsBenhNhan
          .onSearch({
            page: 0,
            size,
            dataSearch: { ...dataSearch, khamSucKhoe },
            isSelectLimit,
          })
          .then((s) => resolve(s));
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dsBenhNhan.dataSortColumn,
        ...payload,
      };
      dispatch.dsBenhNhan.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dsBenhNhan.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    getTongHopDichVuCLS: (benhNhanID) => {
      if (!benhNhanID) {
        dispatch.dsBenhNhan.updateData({
          thongTinBenhNhan: {},
        });
        return;
      }
      dsBenhNhanProvider
        .getTongHopDichVuCLS(benhNhanID)
        .then((s) => {
          dispatch.dsBenhNhan.updateData({
            thongTinBenhNhan: s?.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.dsBenhNhan.updateData({
            thongTinBenhNhan: [],
          });
        });
    },
    getNbTiepTheo: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        dsBenhNhanProvider
          .getNbTiepTheo(payload)
          .then((s) => {
            let data = s?.data || [];
            dispatch.chanDoanHinhAnh.updateData({
              listNbTiepTheo: data,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getListNb: ({ page = 0, size = 10, ...payload }, state) => {
      const sort = combineSort(
        payload.dataSortColumn1 || state.dsBenhNhan.dataSortColumn1 || {}
      );
      const dataSearch =
        payload.dataSearch || state.dsBenhNhan.dataSearch || {};

      return new Promise((resolve, reject) => {
        dsBenhNhanProvider
          .getTongHopDichVuCLS({ page, size, sort, ...dataSearch })
          .then((s) => {
            dispatch.dsBenhNhan.updateData({
              listData: (s?.data || []).map((item, index) => {
                item.index = page * size + index + 1;
                return item;
              }),
              totalElements: s?.totalElements || 0,
              page,
              size,
            });
          });
      });
    },
    onSortChangeListNb: ({ ...payload }, state) => {
      const dataSortColumn1 = {
        ...state.dsBenhNhan.dataSortColumn1,
        ...payload,
      };
      dispatch.dsBenhNhan.updateData({
        page: 0,
        dataSortColumn1,
      });
      dispatch.dsBenhNhan.getListNb({
        dataSortColumn1,
        page: state.dsBenhNhan.page,
        size: state.dsBenhNhan.size,
      });
    },
    onChangeInputSearchListNb: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dsBenhNhan.dataSearch || {}),
        ...payload,
      };
      dispatch.dsBenhNhan.updateData({
        page: 0,
        dataSearch,
      });
      return new Promise((resolve, reject) => {
        dispatch.dsBenhNhan
          .getListNb({
            page: 0,
            dataSearch,
          })
          .then((s) => resolve(s));
      });
    },
    tiepNhanNbKSK: (payload = {}, state) => {
      let dsPhongThucHienId =
        payload.dsPhongThucHienId || state.dsBenhNhan.dsPhongThucHienId;
      let listNbTiepNhan = (state.dsBenhNhan.listSelectedId || []).map(
        (nbDotDieuTriId) => {
          return {
            nbDotDieuTriId,
            nguoiThucHienId: state.dsBenhNhan.nguoiThucHienId,
            dieuDuongId: state.dsBenhNhan.dieuDuongId,
          };
        }
      );
      return new Promise((resolve, reject) => {
        dsBenhNhanProvider
          .tiepNhan(dsPhongThucHienId, listNbTiepNhan)
          .then((s) => {
            resolve(s);
            message.success(s?.message || "Tiếp nhận thành công");
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    // onSearchKskMaxLimit: (payload = {}, state) => {
    //   const dataSearch = {
    //     ...(state.dsBenhNhan.dataSearch || {}),
    //     ...payload,
    //   };
    //   dispatch.dsBenhNhan.updateData({
    //     page: 0,
    //     ...dataSearch,
    //   });
    //   return new Promise((resolve, reject) => {
    //     dispatch.dsBenhNhan
    //       .onSearch({
    //         page: 0,
    //         dataSearch,
    //       })
    //       .then((s) => resolve(s));
    //   });
    // }
  }),
};
