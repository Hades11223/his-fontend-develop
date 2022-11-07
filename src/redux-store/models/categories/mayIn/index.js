import { message } from "antd";
import mayInProvider from "data-access/categories/dm-may-in-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    dataSortColumn: { active: 2, maSo: 1, updatedAt: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.mayIn.updateData({
        size,
        page: 0,
      });
      dispatch.mayIn.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.mayIn.updateData(newState);
      let size = payload.size || state.mayIn.size || 10;
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.mayIn.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.mayIn.dataSearch || {};

      mayInProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.mayIn.updateData({
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
          dispatch.mayIn.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.mayIn.dataSortColumn,
        ...payload,
      };
      dispatch.mayIn.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.mayIn.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.mayIn.dataSearch || {}),
        ...payload,
      };
      dispatch.mayIn.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.mayIn.onSearch({
        page: 0,
        dataSearch,
      });
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          mayInProvider
            .update(payload)
            .then((s) => {
              message.success("Cập nhật thành công dữ liệu máy in!");
              resolve();
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject();
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
  }),
};
