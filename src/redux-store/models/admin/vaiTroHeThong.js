import { message } from "antd";
import vaiTroProvider from "data-access/categories/dm-vai-tro-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import baseStore from "../base-store";
import apiBase from "../../../data-access/api-base";
import dmMauDuLieuProvider from "data-access/dm-mau-du-lieu-provider";
import fileUtils from "utils/file-utils";

export default {
  ...baseStore({
    fetchProvider: vaiTroProvider,
    storeName: "adminVaiTroHeThong",
    title: "Vai trò hệ thống",
    initState: {
      listAllVaiTroHeThong: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      listData: [],
      dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: vaiTroProvider.searchAll,
        KEY_CACHE: "DATA_ALL_VAI_TRO_HE_THONG",
        model: "adminVaiTroHeThong",
        fieldName: "VaiTroHeThong",
      }),
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: vaiTroProvider.searchAll,
        KEY_CACHE: "DATA_ALL_VAI_TRO_HE_THONG",
        model: "adminVaiTroHeThong",
        fieldName: "AdminVaiTroHeThong",
      }),
      onSizeChange: (size, state) => {
        dispatch.adminVaiTroHeThong.updateData({
          size,
          page: 0,
        });
        dispatch.adminVaiTroHeThong.onSearch({ page: 0, size });
      },
      onSearch: ({ page = 0, ...payload }, state) => {
        let newState = { isLoading: true, page };
        dispatch.adminVaiTroHeThong.updateData(newState);
        let size = payload.size || state.adminVaiTroHeThong.size || 10;
        const sort = combineSort(
          payload.dataSortColumn ||
            state.adminVaiTroHeThong.dataSortColumn ||
            {}
        );
        const dataSearch =
          payload.dataSearch || state.adminVaiTroHeThong.dataSearch || {};

        vaiTroProvider
          .search({ page, size, sort, active: true, ...dataSearch })
          .then((s) => {
            dispatch.adminVaiTroHeThong.updateData({
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
            dispatch.adminVaiTroHeThong.updateData({
              listData: [],
              isLoading: false,
            });
          });
      },
      onSortChange: ({ ...payload }, state) => {
        const dataSortColumn = {
          ...state.adminVaiTroHeThong.dataSortColumn,
          ...payload,
        };
        delete dataSortColumn.createdAt;
        dispatch.adminVaiTroHeThong.updateData({
          page: 0,
          dataSortColumn,
        });
        dispatch.adminVaiTroHeThong.onSearch({
          page: 0,
          dataSortColumn,
        });
      },
      onChangeInputSearch: ({ ...payload }, state) => {
        const dataSearch = {
          ...(state.adminVaiTroHeThong.dataSearch || {}),
          ...payload,
        };
        dispatch.adminVaiTroHeThong.updateData({
          page: 0,
          dataSearch,
        });
        dispatch.adminVaiTroHeThong.onSearch({
          page: 0,
          dataSearch,
        });
      },

      createOrEdit: (payload = {}, state) => {
        return new Promise((resolve, reject) => {
          try {
            if (payload.id) {
              vaiTroProvider
                .put(payload)
                .then((s) => {
                  message.success(
                    "Cập nhật thành công dữ liệu vai trò hệ thống!"
                  );
                  dispatch.adminVaiTroHeThong.onSearch({
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
              vaiTroProvider
                .post(payload)
                .then((s) => {
                  message.success(
                    "Thêm mới thành công dữ liệu vai trò hệ thống!"
                  );
                  dispatch.adminVaiTroHeThong.updateData({
                    dataSortColumn: {
                      createdAt: 2,
                    },
                  });
                  dispatch.adminVaiTroHeThong.onSearch({
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

      onExport: () => {
        return new Promise((resolve, reject) => {
          dmMauDuLieuProvider
            .get({ dsBang: "dm_vai_tro" })
            .then((res) => {
              if (res && res.code === 0) {
                fileUtils.downloadFile(
                  res.data?.data,
                  "Danh mục vai trò hệ thống.xlsx"
                );
              }
              resolve(res);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        });
      },
      onImport: async (payload, state) => {
        apiBase.onImport(payload, vaiTroProvider.import).then((res) => {
          dispatch.quyen.onSearch({});
        });
      },
    }),
  }),
};
