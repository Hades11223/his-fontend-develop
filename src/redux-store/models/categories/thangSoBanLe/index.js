import thangSoBanLeProvider from "data-access/categories/dm-thang-so-ban-le-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "../../../../data-access/api-base";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: thangSoBanLeProvider,
    storeName: "thangSoBanLe",
    title: "thặng số bán lẻ",
    initState: {
      listThangSoBanLe: [],
      listAllThangSoBanLe: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      dataSortColumn: { active: 2 },
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: thangSoBanLeProvider.searchAll,
        KEY_CACHE: "DATA_ALL_THANG_SO_BAN_LE",
        model: "thangSoBanLe",
        fieldName: "ThangSoBanLe",
      }),
      getListThangSoBanLe: ({ page = 0, ...payload }, state) => {
        let size = payload.size || state.dichVuKyThuat.size || 10;
        const sort = combineSort(
          payload.dataSortColumn || state.thangSoBanLe.dataSortColumn || {}
        );
        const dataSearch =
          payload.dataSearch || state.dichVuKyThuat.dataSearch || {};

        thangSoBanLeProvider
          .search({ page, size, sort, ...dataSearch })
          .then((response) => {
            dispatch.thangSoBanLe.updateData({
              listThangSoBanLe: (response?.data || []).map((item, index) => {
                item.index = page * size + index + 1;
                return item;
              }),
              totalElements: response?.totalElements,
              page,
              size,
            });
          })
          .catch((e) => {
            message.error(e?.message.toString());
            dispatch.thangSoBanLe.updateData({ listThangSoBanLe: [] });
          });
      },

      onSortChange: ({ ...payload }, state) => {
        const dataSortColumn = {
          ...state.thangSoBanLe.dataSortColumn,
          ...payload,
        };
        dispatch.thangSoBanLe.updateData({
          page: 0,
          dataSortColumn,
        });
        dispatch.thangSoBanLe.getListThangSoBanLe({
          page: 0,
          dataSortColumn,
        });
      },

      onChangeInputSearch: ({ ...payload }, state) => {
        const dataSearch = {
          ...(state.thangSoBanLe.dataSearch || {}),
          ...payload,
        };
        dispatch.thangSoBanLe.updateData({
          page: 0,
          dataSearch,
        });
        dispatch.thangSoBanLe.getListThangSoBanLe({
          page: 0,
          dataSearch,
        });
      },

      createOrEdit: async (payload = {}, state) => {
        try {
          let response = {};
          if (payload.id) {
            response = await thangSoBanLeProvider.put(payload);
            dispatch.thangSoBanLe.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu thặng số bán lẻ!");
          } else {
            response = await thangSoBanLeProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu thặng số bán lẻ!");
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          thangSoBanLe: { page, size },
        } = state;
        const response = await thangSoBanLeProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.thangSoBanLe.search({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
