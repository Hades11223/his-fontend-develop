import { message } from "antd";
import thietLapHangDoiProvider from "data-access/categories/dm-thiet-lap-hang-doi-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: thietLapHangDoiProvider,
    storeName: "thietLapHangDoi",
    title: "Thiết lập hàng đợi",
    initState: {
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      listData: [],
      dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
      currentData: {},
    },
    customEffect: ({ dispatch }) => ({
      onSizeChange: ({ size }, state) => {
        dispatch.thietLapHangDoi.updateData({
          size,
          page: 0,
        });
        dispatch.thietLapHangDoi.onSearch({ page: 0, size });
      },
      onSearch: ({ page = 0, ...payload }, state) => {
        let newState = { isLoading: true, page };
        dispatch.thietLapHangDoi.updateData(newState);
        let size = payload.size || state.thietLapHangDoi.size || 10;
        const sort = combineSort(
          payload.dataSortColumn || state.thietLapHangDoi.dataSortColumn || {}
        );
        const dataSearch =
          payload.dataSearch || state.thietLapHangDoi.dataSearch || {};

        thietLapHangDoiProvider
          .search({ page, size, ...dataSearch })
          .then((s) => {
            dispatch.thietLapHangDoi.updateData({
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
            dispatch.thietLapHangDoi.updateData({
              listData: [],
              isLoading: false,
            });
          });
      },

      onSortChange: ({ ...payload }, state) => {
        const dataSortColumn = {
          ...state.thietLapHangDoi.dataSortColumn,
          ...payload,
        };
        dispatch.thietLapHangDoi.updateData({
          page: 0,
          dataSortColumn,
        });
        dispatch.thietLapHangDoi.onSearch({
          page: 0,
          dataSortColumn,
        });
      },

      onChangeInputSearch: ({ ...payload }, state) => {
        const dataSearch = {
          ...(state.thietLapHangDoi.dataSearch || {}),
          ...payload,
        };
        dispatch.thietLapHangDoi.updateData({
          page: 0,
          dataSearch,
        });
        dispatch.thietLapHangDoi.onSearch({
          page: 0,
          dataSearch,
        });
      },

      createOrEdit: (payload = {}, state) => {
        return new Promise((resolve, reject) => {
          try {
            if (payload.id) {
              thietLapHangDoiProvider
                .put(payload)
                .then((s) => {
                  message.success(
                    "Cập nhật thành công dữ liệu thiết lập chung!"
                  );

                  let data = (state.thietLap.listData || []).map((item) => {
                    if (item.id === s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  });
                  dispatch.thietLapHangDoi.updateData({
                    listData: data,
                  });
                  dispatch.thietLapHangDoi.onSearch({
                    page: 0,
                  });
                  resolve();
                })
                .catch((e) => {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
                  reject();
                });
            } else {
              thietLapHangDoiProvider
                .post(payload)
                .then((s) => {
                  message.success(
                    "Thêm mới thành công dữ liệu thiết lập chung!"
                  );
                  dispatch.thietLapHangDoi.onSearch({
                    page: 0,
                  });
                  resolve();
                })
                .catch((e) => {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
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
      deleteData: (payload) => {
        new Promise((resolve, reject) => {
          thietLapHangDoiProvider
            .delete(payload)
            .then((s) => {
              message.success("Xóa thành công");
            })
            .catch((e) => {
              message.error(e.message || "Vui lòng thử lại");
            });
        });
      },
      getById: (payload) => {
        thietLapHangDoiProvider.getById(payload).then((s) => {
          dispatch.thietLapHangDoi.updateData({ currentData: s.data });
        });
      },
    }),
  }),
};
