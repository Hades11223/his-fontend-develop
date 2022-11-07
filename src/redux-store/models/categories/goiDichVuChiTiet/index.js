import goiDichVuChiTietProvider from "data-access/categories/dm-goi-dich-vu-chi-tiet";
import dmBoChiDinhChiTietProvider from "data-access/categories/dm-bo-chi-dinh-chi-tiet-provider.js";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import dmDichVuProvider from "data-access/categories/dm-dich-vu-provider";
export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: {},
    listAllDichVu: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.goiDichVuChiTiet.updateData({
        size,
        page: 0,
      });
      dispatch.goiDichVuChiTiet.onSearch({ page: 0, size });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        let newState = { isLoading: true, page };
        dispatch.goiDichVuChiTiet.updateData(newState);
        let size = payload.size || state.goiDichVuChiTiet.size || 10;
        // let page = state.goiDichVuChiTiet.page || 0;
        const sort = combineSort(
          payload.dataSortColumn || state.goiDichVuChiTiet.dataSortColumn || {}
        );
        const dataSearch =
          payload.dataSearch || state.goiDichVuChiTiet.dataSearch || {};
        const goiDichVu = state.goiDichVu.currentItem || {};

        dmBoChiDinhChiTietProvider
          .search({
            page,
            size,
            sort,
            ...dataSearch,
            boChiDinhId: goiDichVu?.id,
          })
          .then((s) => {
            dispatch.goiDichVuChiTiet.updateData({
              listData: (s?.data || []).map((item, index) => {
                item.index = page * size + index + 1;
                return item;
              }),
              isLoading: false,
              totalElements: s?.totalElements || 0,
              page,
            });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.goiDichVuChiTiet.updateData({
              listData: [],
              isLoading: false,
            });
            reject(e);
          });
      });
    },

    getListServicesPackDetail: async (payload = {}, state) => {
      try {
        const response = await dmBoChiDinhChiTietProvider.search(payload);
        let {
          data: listServicesPackDetail,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.goiDichVuChiTiet.getListServicesPackDetail({
            ...payload,
            page: page - 1,
            size,
          });
        }
        return dispatch.goiDichVuChiTiet.updateData({
          listServicesPackDetail: (listServicesPackDetail || []).map(
            (item, index) => {
              return { ...item, stt: page * size + index + 1 };
            }
          ),
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err?.message.toString());
        return Promise.reject(err);
      }
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.goiDichVuChiTiet.dataSortColumn,
        ...payload,
      };
      dispatch.goiDichVuChiTiet.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.goiDichVuChiTiet.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.goiDichVuChiTiet.dataSearch || {}),
        ...payload,
      };
      dispatch.goiDichVuChiTiet.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.goiDichVuChiTiet.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            dmBoChiDinhChiTietProvider
              .update(payload)
              .then((s) => {
                message.success(
                  "Cập nhật thành công dữ liệu chi tiết gói dịch vụ!"
                );

                let data = (state.goiDichVuChiTiet.listData || []).map(
                  (item) => {
                    if (item.id == s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  }
                );
                dispatch.goiDichVuChiTiet.updateData({
                  currentItem: null,
                  listData: data,
                });
                resolve(s.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            dmBoChiDinhChiTietProvider
              .create(payload)
              .then((s) => {
                message.success(
                  "Thêm mới thành công dữ liệu chi tiết gói dịch vụ!"
                );
                dispatch.goiDichVuChiTiet.updateData({ currentItem: null });
                dispatch.goiDichVuChiTiet.onSearch({
                  page: 0,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },

    createBatch: (payload, state) => {
      return new Promise((resolve, reject) => {
        try {
          dmBoChiDinhChiTietProvider
            .batch(payload)
            .then((s) => {
              message.success(
                "Cập nhật thành công dữ liệu chi tiết gói dịch vụ!"
              );

              let data = (state.goiDichVuChiTiet.listData || []).map((item) => {
                if (item.id == s.data?.id) {
                  s.data.index = item.index;
                  return s.data;
                }
                return item;
              });
              dispatch.goiDichVuChiTiet.updateData({
                currentItem: null,
                listData: data,
              });
              resolve(s.data);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },

    onDelete: async (payload, state) => {
      const {
        goiDichVuChiTiet: { page, size },
      } = state;
      const response = await dmBoChiDinhChiTietProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.goiDichVuChiTiet.getListServicesPackDetail({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },

    getDSDichVuTheoLoai: (payload, state) => {
      return new Promise((resolve, reject) => {
        dmDichVuProvider
          .searchAll({
            page: "",
            size: "",
            ...payload,
          })
          .then((s) => {
            dispatch.goiDichVuChiTiet.updateData({
              listAllDichVu: s?.data || [],
            });
            resolve(s?.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getListDichVuSaoChep: (payload) => {
      dmBoChiDinhChiTietProvider
        .search({
          ...payload,
        })
        .then((s) => {
          dispatch.goiDichVuChiTiet.updateData({
            listDichVuSaoChep: s?.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.goiDichVuChiTiet.updateData({
            listDichVuSaoChep: [],
          });
        });
    },
  }),
};
