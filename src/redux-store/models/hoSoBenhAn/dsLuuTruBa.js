import nbLuuTruBaProvider from "data-access/hsba/nb-luu-tru-ba-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import nbLuuTruPhimProvider from "data-access/hsba/nb-luu-tru-phim-provider";

export default {
  state: {
    listDsLuuTru: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},
    dataSortColumn: {},
    chiTietLuuTru: {},

    selectedDichVu: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.dsLuuTruBa.updateData({
        ...rest,
      });
      dispatch.dsLuuTruBa.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      let size = payload.size || state.dsLuuTruBa.size || 10;
      dispatch.dsLuuTruBa.updateData(newState);
      const sort = combineSort(
        payload.dataSortColumn || state.dsLuuTruBa.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dsLuuTruBa.dataSearch || {};

      nbLuuTruBaProvider
        .search({
          page,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.dsLuuTruBa.updateData({
            listDsLuuTru: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements,
            isLoading: false,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.dsLuuTruBa.updateData({
            listDsLuuTru: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dsLuuTruBa.dataSortColumn,
        ...payload,
      };
      dispatch.dsLuuTruBa.updateData({
        dataSortColumn,
      });
      dispatch.dsLuuTruBa.onSearch({
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dsLuuTruBa.dataSearch || {}),
        ...payload,
      };
      dispatch.dsLuuTruBa.updateData({
        dataSearch,
      });
      dispatch.dsLuuTruBa.onSearch({
        dataSearch,
      });
    },

    getChiTietLuuTruBA: (id, state) => {
      return new Promise((resolve, reject) => {
        nbLuuTruBaProvider
          .getById(id)
          .then((s) => {
            dispatch.dsLuuTruBa.updateData({
              chiTietLuuTru: s?.data,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    xoaLuuTruPhim: (id, state) => {
      return new Promise((resolve, reject) => {
        nbLuuTruPhimProvider
          .delete(id)
          .then((s) => {
            resolve(s);
            message.success("Xóa lưu trữ phim thành công");
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    createOrEditLuuTruPhim: (payload, state) => {
      return new Promise((resolve, reject) => {
        if (!payload?.id) {
          nbLuuTruPhimProvider
            .post(payload)
            .then((s) => {
              resolve(s);
              message.success("Thêm mới lưu trữ phim thành công");
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        } else {
          nbLuuTruPhimProvider
            .put(payload)
            .then((s) => {
              resolve(s);
              message.success("Cập nhật lưu trữ phim thành công");
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        }
      });
    },

    doiTrangThaiBA: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbLuuTruBaProvider
          .post(payload)
          .then((s) => {
            resolve(s);
            message.success("Đổi trạng thái bệnh án thành công");
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    hoanThanhBA: ({ id, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        nbLuuTruBaProvider
          .doiTrangThai({ id, ...rest })
          .then((s) => {
            resolve(s);
            message.success("Đổi trạng thái bệnh án thành công");
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
