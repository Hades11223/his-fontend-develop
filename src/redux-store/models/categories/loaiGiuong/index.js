import { message } from "antd";
import loaiGiuongProvider from "data-access/categories/dm-loai-giuong-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: loaiGiuongProvider,
    storeName: "loaiGiuong",
    title: "Loại giường",
    initState: {
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      listLoaiGiuong: [],
      dataSortColumn: { active: 2, ma: 2 },
    },
    customEffect: ({ dispatch }) => ({
      onSizeChange: ({ size }, state) => {
        dispatch.loaiGiuong.updateData({
          size,
          page: 0,
        });
        dispatch.loaiGiuong.onSearch({ page: 0, size });
      },
      onSearch: ({ page = 0, ...payload }, state) => {
        let newState = { isLoading: true, page };
        dispatch.loaiGiuong.updateData(newState);
        let size = payload.size || state.loaiGiuong.size || 10;
        const sort = combineSort(
          payload.dataSortColumn || state.loaiGiuong.dataSortColumn || {}
        );
        const dataSearch =
          payload.dataSearch || state.loaiGiuong.dataSearch || {};

        loaiGiuongProvider
          .search({ page, size, ...dataSearch, sort })
          .then((s) => {
            dispatch.loaiGiuong.updateData({
              listLoaiGiuong: (s?.data || []).map((item, index) => {
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
            dispatch.loaiGiuong.updateData({
              listLoaiGiuong: [],
              isLoading: false,
            });
          });
      },

      onSortChange: ({ ...payload }, state) => {
        const dataSortColumn = {
          ...state.loaiGiuong.dataSortColumn,
          ...payload,
        };
        delete dataSortColumn.createdAt;
        dispatch.loaiGiuong.updateData({
          page: 0,
          dataSortColumn,
        });
        dispatch.loaiGiuong.onSearch({
          page: 0,
          dataSortColumn,
        });
      },

      onChangeInputSearch: ({ ...payload }, state) => {
        const dataSearch = {
          ...(state.loaiGiuong.dataSearch || {}),
          ...payload,
        };
        dispatch.loaiGiuong.updateData({
          page: 0,
          dataSearch,
        });
        dispatch.loaiGiuong.onSearch({
          page: 0,
          dataSearch,
        });
      },

      getById: (id) => {
        loaiGiuongProvider
          .get(id)
          .then((s) => {
            dispatch.loaiGiuong.updateData({
              currentKiosk: s?.data,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.loaiGiuong.updateData({
              currentKiosk: {},
            });
          });
      },

      onDelete: async (payload, state) => {
        const {
          xuatXu: { page, size },
        } = state;
        const response = await loaiGiuongProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.loaiGiuongProvider.search({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },

      createOrEdit: (payload = {}, state) => {
        return new Promise((resolve, reject) => {
          try {
            if (payload.id) {
              loaiGiuongProvider
                .put(payload)
                .then((s) => {
                  message.success("Cập nhật dữ liệu thành công !");
                  let data = (state.loaiGiuong.listLoaiGiuong || []).map(
                    (item) => {
                      if (item.id === s.data?.id) {
                        s.data.index = item.index;
                        return s.data;
                      }
                      return item;
                    }
                  );
                  dispatch.loaiGiuong.updateData({
                    listLoaiGiuong: data,
                  });
                  resolve(s?.data);
                })
                .catch((e) => {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
                  reject(e);
                });
            } else {
              loaiGiuongProvider
                .post(payload)
                .then((s) => {
                  dispatch.loaiGiuong.updateData({
                    dataSortColumn: {
                      createdAt: 2,
                    },
                  });
                  message.success("Thêm mới dữ liệu thành công!");
                  dispatch.loaiGiuong.onSearch({
                    page: 0,
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
