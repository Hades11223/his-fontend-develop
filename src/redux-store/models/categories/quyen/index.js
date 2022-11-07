import { message } from "antd";
import danhMucQuyenProvider from "data-access/categories/dm-quyen-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "../../../../data-access/api-base";
import dmMauDuLieuProvider from "data-access/dm-mau-du-lieu-provider";
import fileUtils from "utils/file-utils";
import dmQuyenProvider from "data-access/categories/dm-quyen-provider";

export default {
  state: {
    listAllQuyen: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: danhMucQuyenProvider.search,
      KEY_CACHE: "DATA_ALL_QUYEN",
      model: "quyen",
      fieldName: "Quyen",
      modifyData: (data, payload, state) => {
        return (data || []).map((item) => ({
          ...item,
          tenNhomTinhNang: item?.nhomTinhNang?.ten,
        }));
      },
    }),
    onSizeChange: (size, state) => {
      dispatch.quyen.updateData({
        size,
        page: 0,
      });
      dispatch.quyen.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.quyen.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.quyen.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.quyen.dataSearch || {};

      danhMucQuyenProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.quyen.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.quyen.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.quyen.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.quyen.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.quyen.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.quyen.dataSearch || {}),
        ...payload,
      };
      dispatch.quyen.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.quyen.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            danhMucQuyenProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu quyền!");
                dispatch.quyen.onSearch({
                  page: 0,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          } else {
            danhMucQuyenProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu quyền!");
                dispatch.quyen.updateData({
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                dispatch.quyen.onSearch({
                  page: 0,
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    exportData: () => {
      return new Promise((resolve, reject) => {
        dmMauDuLieuProvider
          .get({ dsBang: "dm_quyen" })
          .then((res) => {
            if (res && res.code === 0) {
              fileUtils.downloadFile(res.data?.data, "Danh mục quyền.xlsx");
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
      apiBase.onImport(payload, dmQuyenProvider.import).then((res) => {
        dispatch.quyen.onSearch({});
      });
    },
  }),
};
