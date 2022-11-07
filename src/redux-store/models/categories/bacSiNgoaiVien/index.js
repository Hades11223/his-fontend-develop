import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import bacSiNgoaiVienProvider from "data-access/categories/dm-bac-si-ngoai-vien-provider";
import baseStore from "redux-store/models/base-store";
import { combineSort } from "utils";

export default {
  ...baseStore({
    fetchProvider: bacSiNgoaiVienProvider,
    storeName: "bacSiNgoaiVien",
    title: "bác sĩ ngoại viện",
    initState: {
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      listBacSiNgoaiVien: [],
    },
    customEffect: ({ dispatch }) => ({
      onSizeChange: ({ size }, state) => {
        dispatch.bacSiNgoaiVien.updateData({
          size,
          page: 0,
        });
        dispatch.bacSiNgoaiVien.onSearch({ page: 0, size });
      },
      onSearch: ({ page = 0, ...payload }, state) => {
        let newState = { isLoading: true, page };
        dispatch.bacSiNgoaiVien.updateData(newState);
        let size = payload.size || state.bacSiNgoaiVien.size || 10;
        const sort = combineSort(
          payload.dataSortColumn || state.bacSiNgoaiVien.dataSortColumn || {}
        );
        const dataSearch =
          payload.dataSearch || state.bacSiNgoaiVien.dataSearch || {};

        bacSiNgoaiVienProvider
          .search({ page, size, ...dataSearch, sort })
          .then((s) => {
            dispatch.bacSiNgoaiVien.updateData({
              listBacSiNgoaiVien: (s?.data || []).map((item, index) => {
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
            dispatch.bacSiNgoaiVien.updateData({
              listBacSiNgoaiVien: [],
              isLoading: false,
            });
          });
      },

      onSortChange: ({ ...payload }, state) => {
        const dataSortColumn = {
          ...state.bacSiNgoaiVien.dataSortColumn,
          ...payload,
        };
        delete dataSortColumn.createdAt;
        dispatch.bacSiNgoaiVien.updateData({
          page: 0,
          dataSortColumn,
        });
        dispatch.bacSiNgoaiVien.onSearch({
          page: 0,
          dataSortColumn,
        });
      },

      onChangeInputSearch: ({ ...payload }, state) => {
        const dataSearch = {
          ...(state.bacSiNgoaiVien.dataSearch || {}),
          ...payload,
        };
        dispatch.bacSiNgoaiVien.updateData({
          page: 0,
          dataSearch,
        });
        dispatch.bacSiNgoaiVien.onSearch({
          page: 0,
          dataSearch,
        });
      },

      getById: (id) => {
        bacSiNgoaiVienProvider
          .get(id)
          .then((s) => {
            dispatch.bacSiNgoaiVien.updateData({
              currentKiosk: s?.data,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.bacSiNgoaiVien.updateData({
              currentKiosk: {},
            });
          });
      },

      onDelete: async (payload, state) => {
        const {
          xuatXu: { page, size },
        } = state;
        const response = await bacSiNgoaiVienProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.bacSiNgoaiVienProvider.search({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },

      createOrEdit: (payload = {}, state) => {
        return new Promise((resolve, reject) => {
          try {
            if (payload.id) {
              bacSiNgoaiVienProvider
                .put(payload)
                .then((s) => {
                  message.success("Cập nhật dữ liệu thành công !");
                  let data = (state.thietLap.listBacSiNgoaiVien || []).map(
                    (item) => {
                      if (item.id === s.data?.id) {
                        s.data.index = item.index;
                        return s.data;
                      }
                      return item;
                    }
                  );
                  dispatch.bacSiNgoaiVien.updateData({
                    listBacSiNgoaiVien: data,
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
              bacSiNgoaiVienProvider
                .post(payload)
                .then((s) => {
                  dispatch.bacSiNgoaiVien.updateData({
                    dataSortColumn: {
                      createdAt: 2,
                    },
                  });
                  message.success("Thêm mới dữ liệu thành công!");
                  dispatch.bacSiNgoaiVien.onSearch({
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
