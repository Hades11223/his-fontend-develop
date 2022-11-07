import { message } from "antd";
import nhomTinhNangProvider from "data-access/categories/dm-nhom-tinh-nang-provider";
import cacheUtils from "utils/cache-utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "../../../../data-access/api-base";
import fileUtils from "utils/file-utils";
import dmMauDuLieuProvider from "data-access/dm-mau-du-lieu-provider";
import dmNhomTinhNangProvider from "data-access/categories/dm-nhom-tinh-nang-provider";

export default {
  state: {
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
    listAllData: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onGetAll: async (payload, state) => {
      let listAllData = await cacheUtils.read(
        "DM_NHOM_TINH_NANG",
        "",
        [],
        false
      );
      dispatch.nhomTinhNang.updateData({ listAllData });
      nhomTinhNangProvider.search({ size: 9999, ...payload }).then((s) => {
        let data = s?.data || [];
        if (JSON.stringify(data) !== JSON.stringify(listAllData)) {
          dispatch.nhomTinhNang.updateData({ listAllData: data });
          cacheUtils.save("DM_NHOM_TINH_NANG", "", data, false);
        }
      });
    },
    onSizeChange: ({ size }, state) => {
      dispatch.nhomTinhNang.updateData({
        size,
        page: 0,
      });
      dispatch.nhomTinhNang.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.nhomTinhNang.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.nhomTinhNang.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.nhomTinhNang.dataSearch || {};

      nhomTinhNangProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.nhomTinhNang.updateData({
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
          dispatch.nhomTinhNang.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.nhomTinhNang.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.nhomTinhNang.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nhomTinhNang.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.nhomTinhNang.dataSearch || {}),
        ...payload,
      };
      dispatch.nhomTinhNang.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.nhomTinhNang.onSearch({
        page: 0,
        dataSearch,
      });
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            nhomTinhNangProvider
              .patch(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu nhóm tính năng!");
                dispatch.nhomTinhNang.onSearch({
                  page: 0,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          } else {
            nhomTinhNangProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu nhóm tính năng!");
                dispatch.nhomTinhNang.updateData({
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                dispatch.nhomTinhNang.onSearch({
                  page: 0,
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
    onExport: () => {
      return new Promise((resolve, reject) => {
        dmMauDuLieuProvider
          .get({ dsBang: "dm_nhom_tinh_nang" })
          .then((res) => {
            if (res && res.code === 0) {
              fileUtils.downloadFile(
                res.data?.data,
                "Danh mục nhóm tính năng.xlsx"
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
      apiBase.onImport(payload, dmNhomTinhNangProvider.import).then((res) => {
        dispatch.quyen.onSearch({});
      });
    },
  }),
};
