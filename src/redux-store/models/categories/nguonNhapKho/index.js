import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import nguonNhapKhoProvider from "data-access/categories/dm-nguon-nhap-kho-provider";
import baseStore from "redux-store/models/base-store";
import { combineSort } from "utils";

export default {
  ...baseStore({
    fetchProvider: nguonNhapKhoProvider,
    storeName: "nguonNhapKho",
    title: "nguồn nhập kho",

    initState: {
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      listData: [],
      dataSortColumn: { active: 2 },
    },
    customEffect: ({ dispatch }) => ({
      onSizeChange: (size, state) => {
        dispatch.nguonNhapKho.updateData({
          size,
          page: 0,
        });
        dispatch.nguonNhapKho.onSearch({ page: 0, size });
      },
      onSearch: ({ page = 0, ...payload }, state) => {
        let newState = { isLoading: true, page };
        dispatch.nguonNhapKho.updateData(newState);
        let size = payload.size || state.nguonNhapKho.size || 10;
        const sort = combineSort(
          payload.dataSortColumn || state.nguonNhapKho.dataSortColumn || {}
        );
        const dataSearch =
          payload.dataSearch || state.nguonNhapKho.dataSearch || {};

        nguonNhapKhoProvider
          .search({ page, size, sort, active: true, ...dataSearch })
          .then((s) => {
            dispatch.nguonNhapKho.updateData({
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
            dispatch.nguonNhapKho.updateData({
              listData: [],
              isLoading: false,
            });
          });
      },
      onSortChange: ({ ...payload }, state) => {
        const dataSortColumn = {
          ...state.nguonNhapKho.dataSortColumn,
          ...payload,
        };
        dispatch.nguonNhapKho.updateData({
          page: 0,
          dataSortColumn,
        });
        dispatch.nguonNhapKho.onSearch({
          page: 0,
          dataSortColumn,
        });
      },
      onChangeInputSearch: ({ ...payload }, state) => {
        const dataSearch = {
          ...(state.nguonNhapKho.dataSearch || {}),
          ...payload,
        };
        dispatch.nguonNhapKho.updateData({
          page: 0,
          dataSearch,
        });
        dispatch.nguonNhapKho.onSearch({
          page: 0,
          dataSearch,
        });
      },

      createOrEdit: (payload = {}, state) => {
        return new Promise((resolve, reject) => {
          try {
            if (payload.id) {
              nguonNhapKhoProvider
                .update(payload)
                .then((s) => {
                  message.success(
                    "Cập nhật thành công dữ liệu nguồn nhập kho!"
                  );
                  dispatch.nguonNhapKho.onSearch({
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
              nguonNhapKhoProvider
                .create(payload)
                .then((s) => {
                  message.success(
                    "Thêm mới thành công dữ liệu nguồn nhập kho!"
                  );
                  dispatch.nguonNhapKho.onSearch({
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
    }),
  }),
};
