import donViChiNhanhProvider from "data-access/categories/dm-don-vi-chi-nhanh-provider";
import { message } from "antd";
import { SIZE_DEFAULT, PAGE_DEFAULT } from "constants/index";
import { SORT_DEFAULT } from "constants/index";
import apiBase from "../../../../data-access/api-base";

export default {
  state: {
    listAllDonViChiNhanh: [],
    listDonViChiNhanh: [],
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
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: donViChiNhanhProvider.searchAll,
      KEY_CACHE: "DATA_ALL_DON_VI_CHI_NHANH",
      model: "chiNhanh",
      fieldName: "DonViChiNhanh",
    }),
    getListDonViChiNhanh: async (payload = {}, state) => {
      try {
        const response = await donViChiNhanhProvider.search(payload);
        let {
          data: listDonViChiNhanh,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.chiNhanh.getListDonViChiNhanh({
            ...payload,
            page: page - 1,
            size: size,
          });
        }

        return dispatch.chiNhanh.updateData({
          listDonViChiNhanh,
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
          response = await donViChiNhanhProvider.put(payload);
          dispatch.chiNhanh.updateData({
            dataEditTinhDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu đơn vị chi nhánh!");
        } else {
          dispatch.chiNhanh.updateData({
            dataSort: {
              createdAt: 2,
            },
          });
          response = await donViChiNhanhProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu đơn vị chi nhánh!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
  }),
};
