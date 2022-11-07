import quyetDinhThauProvider from "data-access/kho/quyet-dinh-thau-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "data-access/api-base";

export default {
  state: {
    listQuyetDinhThau: [],
    listAllQuyetDinhThau: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},
    dataSortColumn: {},
    trangThai: 10,
    listDataTongHop: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: quyetDinhThauProvider.searchAll,
      KEY_CACHE: "DATA_QUYET_DINH_THAU",
      model: "quyetDinhThau",
      fieldName: "QuyetDinhThau",
    }),
    onSizeChange: ({ ...rest }) => {
      dispatch.quyetDinhThau.updateData({
        page: 0,
        ...rest,
      });
      dispatch.quyetDinhThau.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.quyetDinhThau.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.quyetDinhThau.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.quyetDinhThau.dataSearch || {};
      quyetDinhThauProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.quyetDinhThau.updateData({
            listQuyetDinhThau: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.quyetDinhThau.dataSearch || {}),
        ...payload,
      };
      dispatch.quyetDinhThau.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.quyetDinhThau.onSearch({
        page: 0,
        dataSearch,
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.quyetDinhThau.dataSortColumn,
        ...payload,
      };
      dispatch.quyetDinhThau.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.quyetDinhThau.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    searchById: async ({ id, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          quyetDinhThauProvider.getById(id).then((s) => {
            let { data } = s;
            resolve(data);
          });
        } catch (err) {
          message.error(err.message.toString());
          reject(err);
        }
      });
    },
    searchTongHop: ({ ...payload }) => {
      quyetDinhThauProvider.searchAll({ ...payload }).then((s) => {
        dispatch.quyetDinhThau.updateData({ listDataTongHop: s?.data });
      });
    },
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            quyetDinhThauProvider
              .put(payload)
              .then((s) => {
                if (s?.code === 0) {
                  dispatch.quyetDinhThau.updateData({
                    dataEditDefault: response.data,
                  });
                  resolve(s?.data);
                }
                message.success("Cập nhật thành công dữ liệu quyết định thầu");
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
              });
          } else {
            quyetDinhThauProvider
              .post(payload)
              .then((s) => {
                if (s?.code === 0) {
                  message.success(
                    "Thêm mới thành công dữ liệu quyết định thầu"
                  );
                  resolve(s?.data);
                }
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
              });
          }
        } catch (error) {
          message.error(error?.message.toString());
          return Promise.reject(error);
        }
      });
    },
    onDelete: async (payload, state) => {
      const {
        quyetDinhThau: { page, size },
      } = state;
      const response = await quyetDinhThauProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.quyetDinhThau.getListQuyetDinhThau({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },

    onComplete: async (id, state) => {
      return new Promise((resolve, reject) => {
        quyetDinhThauProvider
          // .complete(payload)
          .complete(id)
          .then((response) => {
            dispatch.quyetDinhThau.updateData({
              dataEditDefault: response.data,
            });
            message.success("Hoàn thành quyết định thầu thành công!");
            resolve(response.data);
          })
          .catch((e) => {
            message.error(e.message || "Xảy ra lỗi vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    onUndoComplete: async (id, state) => {
      return new Promise((resolve, reject) => {
        quyetDinhThauProvider
          // .undoComplete(payload)
          .undoComplete(id)
          .then((response) => {
            dispatch.quyetDinhThau.updateData({
              dataEditDefault: response.data,
            });
            message.success("Hủy hoàn thành quyết định thầu thành công!");
            resolve(response.data);
          })
          .catch((e) => {
            message.error(e.message || "Xảy ra lỗi vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    onVerify: async (id, state) => {
      return new Promise((resolve, reject) => {
        quyetDinhThauProvider
          // .verify(payload)
          .verify(id)
          .then((response) => {
            dispatch.quyetDinhThau.updateData({
              dataEditDefault: response.data,
            });
            message.success("Duyệt quyết định thầu thành công!");
            resolve(response.data);
          })
          .catch((e) => {
            message.error(e.message || "Xảy ra lỗi vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    onUndoVerify: async (id, state) => {
      return new Promise((resolve, reject) => {
        quyetDinhThauProvider
          .undoVerify(id)
          .then((response) => {
            dispatch.quyetDinhThau.updateData({
              dataEditDefault: response.data,
            });
            message.success("Hủy duyệt quyết định thầu thành công!");
            resolve(response.data);
          })
          .catch((e) => {
            message.error(e.message || "Xảy ra lỗi vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
