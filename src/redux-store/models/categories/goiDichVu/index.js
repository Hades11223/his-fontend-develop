import dmBoChiDinhProvider from "data-access/categories/dm-bo-chi-dinh-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listServicesPack: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listDataAll: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size, ...payload }, state) => {
      dispatch.goiDichVu.updateData({
        size,
        page: 0,
      });
      dispatch.goiDichVu.onSearch({ page: 0, size, ...payload });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.goiDichVu.updateData(newState);
      let size = payload.size || state.goiDichVu.size || 10;
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.goiDichVu.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.goiDichVu.dataSearch || {};

      dmBoChiDinhProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.goiDichVu.updateData({
            listData: (s?.data || []).map((item, index) => {
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
          dispatch.goiDichVu.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSearchAll: ({ ...payload }, state) => {
      dmBoChiDinhProvider
        .searchAll({ ...payload })
        .then((s) => {
          dispatch.goiDichVu.updateData({
            listDataAll: s?.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.goiDichVu.updateData({
            listDataAll: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.goiDichVu.dataSortColumn,
        ...payload,
      };
      dispatch.goiDichVu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.goiDichVu.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.goiDichVu.dataSearch || {}),
        ...payload,
      };
      dispatch.goiDichVu.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.goiDichVu.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            dmBoChiDinhProvider
              .patch(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu gói dịch vụ!");

                let data = (state.goiDichVu.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.goiDichVu.updateData({
                  currentItem: s?.data,
                  listData: data,
                });
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          } else {
            dmBoChiDinhProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu gói dịch vụ!");
                dispatch.goiDichVu.updateData({ currentItem: s?.data || null });
                dispatch.goiDichVu.onSearch({
                  page: 0,
                });
                resolve(s?.data)
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    onDelete: async (payload, state) => {
      const {
        goiDichVu: { page, size },
      } = state;
      const response = await dmBoChiDinhProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.goiDichVu.getListServicesPack({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
