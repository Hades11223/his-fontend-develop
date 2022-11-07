import { message } from "antd";
import templateQmsProvider from "data-access/categories/dm-template-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: templateQmsProvider,
    storeName: "template",
    title: "mẫu QMS",
    initState: {
      listAllTemplate: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      listTemplate: [],
      dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
    },
    customEffect: ({ dispatch }) => ({
      onSizeChange: ({ size }, state) => {
        dispatch.template.updateData({
          size,
          page: 0,
        });
        dispatch.template.onSearch({ page: 0, size });
      },
      onSearch: ({ page = 0, ...payload }, state) => {
        let newState = { isLoading: true, page };
        dispatch.template.updateData(newState);
        let size = payload.size || state.template.size || 10;
        const sort = combineSort(
          payload.dataSortColumn || state.template.dataSortColumn || {}
        );
        const dataSearch =
          payload.dataSearch || state.template.dataSearch || {};

        templateQmsProvider
          .search({ page, size, active: true, ...dataSearch, sort })
          .then((s) => {
            dispatch.template.updateData({
              listTemplate: (s?.data || []).map((item, index) => {
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
            dispatch.template.updateData({
              listTemplate: [],
              isLoading: false,
            });
          });
      },

      onSortChange: ({ ...payload }, state) => {
        const dataSortColumn = {
          ...state.template.dataSortColumn,
          ...payload,
        };
        delete dataSortColumn.createdAt;
        dispatch.template.updateData({
          page: 0,
          dataSortColumn,
        });
        dispatch.template.onSearch({
          page: 0,
          dataSortColumn,
        });
      },

      onChangeInputSearch: ({ ...payload }, state) => {
        const dataSearch = {
          ...(state.template.dataSearch || {}),
          ...payload,
        };
        dispatch.template.updateData({
          page: 0,
          dataSearch,
        });
        dispatch.template.onSearch({
          page: 0,
          dataSearch,
        });
      },
      onDelete: (id) => {
        return new Promise((resolve, reject) => {
          templateQmsProvider
            .delete(id)
            .then((s) => {
              if (s.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        });
      },
      createOrEdit: (payload = {}, state) => {
        return new Promise((resolve, reject) => {
          try {
            if (payload.id) {
              templateQmsProvider
                .put(payload)
                .then((s) => {
                  message.success("Cập nhật thành công dữ liệu thành công!");

                  let data = (state.thietLap.listTemplate || []).map((item) => {
                    if (item.id === s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  });
                  dispatch.template.updateData({
                    listTemplate: data,
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
              templateQmsProvider
                .post(payload)
                .then((s) => {
                  message.success(
                    "Thêm mới thành công dữ liệu thiết lập chung!"
                  );
                  dispatch.template.updateData({
                    dataSortColumn: { createdAt: 2 },
                  });
                  dispatch.template.onSearch({
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
