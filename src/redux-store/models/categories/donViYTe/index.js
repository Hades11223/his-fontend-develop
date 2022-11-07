import cacheUtils from "utils/cache-utils";
import donViYTeProvider from "data-access/categories/dm-don-vi-y-te-provider";
import { message } from "antd";
import { SIZE_DEFAULT, PAGE_DEFAULT } from "constants/index";
import { SORT_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listAllDonViYTe : [],
    listDonViYTe : [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: SIZE_DEFAULT,
    dataSearch: {},
    dataSort: SORT_DEFAULT,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    searchAll: async ({ page = 0, size = 9999, ...payload }, state) => {
      try {
        let listAllDonViYTe = await cacheUtils.read(
          "",
          "DATA_ALL_DON_VI_Y_TE",
          [],
          false
        );
        dispatch.donViYTe.updateData({
          listAllDonViYTe,
        });
        const response = await donViYTeProvider.searchAll({
          page,
          size,
          ...payload,
        });
        let { data } = response;
        data = orderBy(data, "ten", "asc");
        if (JSON.stringify(data) !== JSON.stringify(listAllDonViYTe)) {
          cacheUtils.save("", "DATA_ALL_DON_VI_Y_TE", data, false);
          return dispatch.donViYTe.updateData({
            listAllDonViYTe: data,
          });
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    search: async (payload = {}, state) => {
      try {
        const response = await donViYTeProvider.search(payload);
        let {
          data: listDonViYTe,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.donViYTe.search({
            ...payload,
            page: page - 1,
            size: size,
          });
        }

        return dispatch.donViYTe.updateData({
          listDonViYTe,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    searchTongHop: async (payload = {}, state) => {
      try {
        const response = await donViYTeProvider.searchAll(payload);
        let {
          data: listDonViYTe,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.donViYTe.searchTongHop({
            ...payload,
            page: page - 1,
            size: size,
          });
        }

        return dispatch.donViYTe.updateData({
          listDonViYTe,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await donViYTeProvider.update(payload);
          dispatch.donViYTe.updateData({
            dataEditTinhDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu đơn vị y tế!");
        } else {
          dispatch.donViYTe.updateData({
            dataSort: {
              createdAt: 2,
            },
          });
          response = await donViYTeProvider.create(payload);
          message.success("Thêm mới thành công dữ liệu đơn vị y tế!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
  }),
};
