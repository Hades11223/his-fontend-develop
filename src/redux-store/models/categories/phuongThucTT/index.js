import phuongThucTTProvider from "data-access/categories/dm-phuong-thuc-tt-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/index";
import apiBase from "../../../../data-access/api-base";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: phuongThucTTProvider,
    storeName: "phuongThucTT",
    title: "phương thức thanh toán",
    initState: {
      listAllPhuongThucThanhToan: [],
      listData: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      dataSortColumn: SORT_DEFAULT,
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: phuongThucTTProvider.searchAll,
        KEY_CACHE: "DATA_ALL_PHUONG_THUC_THANH_TOAN",
        model: "phuongThucTT",
        fieldName: "PhuongThucThanhToan",
      }),

      getData: ({ page = 0, size = 10, ...payload }, state) => {
        dispatch.phuongThucTT.updateData({
          page: 0,
          size,
        });
        dispatch.phuongThucTT.onSearch({
          page: 0,
          size,
        });
      },

      onSizeChange: ({ size }, state) => {
        dispatch.phuongThucTT.updateData({
          size,
          page: 0,
        });
        dispatch.phuongThucTT.onSearch({
          page: 0,
          size,
        });
      },

      onSearch: ({ page = 0, ...payload }, state) => {
        let newState = { isLoading: true, page };
        dispatch.phuongThucTT.updateData(newState);
        let size = payload.size || state.phuongThucTT.size || 10;
        const sort = combineSort(
          payload.dataSortColumn || state.phuongThucTT.dataSortColumn || {}
        );
        const dataSearch =
          payload.dataSearch || state.phuongThucTT.dataSearch || {};
        phuongThucTTProvider
          .search({
            page,
            size,
            sort,
            ...dataSearch,
          })
          .then((s) => {
            dispatch.phuongThucTT.updateData({
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
            dispatch.phuongThucTT.updateData({
              listData: [],
              isLoading: false,
            });
          });
      },

      onSortChange: ({ ...payload }, state) => {
        const dataSortColumn = {
          ...state.phuongThucTT.dataSortColumn,
          ...payload,
        };
        dispatch.phuongThucTT.updateData({
          page: 0,
          dataSortColumn,
        });
        dispatch.phuongThucTT.onSearch({
          page: 0,
          dataSortColumn,
        });
      },

      onChangeInputSearch: ({ ...payload }, state) => {
        const dataSearch = {
          ...(state.phuongThucTT.dataSearch || {}),
          ...payload,
        };
        dispatch.phuongThucTT.updateData({
          page: 0,
          dataSearch,
        });
        dispatch.phuongThucTT.onSearch({
          page: 0,
          dataSearch,
        });
      },

      createOrEdit: ({ ...payload }, state) => {
        const {
          phuongThucTT: { dataSortColumn },
        } = state;
        return new Promise((resolve, reject) => {
          try {
            if (payload.id) {
              phuongThucTTProvider
                .put(payload)
                .then((s) => {
                  message.success("Cập nhật thành công dữ liệu PTTT!");

                  let data = (state.phuongThucTT.listData || []).map((item) => {
                    if (item.id == s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  });
                  dispatch.phuongThucTT.updateData({
                    currentItem: null,
                    listData: data.sort((a, b) => b.active - a.active),
                    dataSortColumn,
                  });
                  resolve(s.data);
                })
                .catch((e) => {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
                  reject(e);
                });
            } else {
              phuongThucTTProvider
                .post(payload)
                .then((s) => {
                  message.success("Thêm mới thành công dữ liệu PTTT!");
                  dispatch.phuongThucTT.updateData({
                    currentItem: null,
                    dataSortColumn: SORT_DEFAULT,
                  });
                  dispatch.phuongThucTT.onSearch({
                    page: 0,
                    dataSortColumn: SORT_DEFAULT,
                  });
                  resolve(s?.data);
                })
                .catch((e) => {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
                  reject(e);
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
