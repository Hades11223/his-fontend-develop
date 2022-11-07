import nguonNguoiBenhProvider from "data-access/categories/dm-nguon-nguoi-benh-provider";
import { message } from "antd";
import { SIZE_DEFAULT, PAGE_DEFAULT } from "constants/index";
import { SORT_DEFAULT } from "constants/index";
import apiBase from "../../../../data-access/api-base";

export default {
  state: {
    listAllNguonNguoiBenh: [],
    listNguonNguoiBenh: [],
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
      api: nguonNguoiBenhProvider.searchAll,
      KEY_CACHE: "DATA_NGUON_NGUOI_BENH",
      model: "nguonNguoiBenh",
      fieldName: "NguonNguoiBenh",
    }),
    search: async (payload = {}, state) => {
      try {
        const response = await nguonNguoiBenhProvider.search(payload);
        let {
          data: listNguonNguoiBenh,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nguonNguoiBenh.search({
            ...payload,
            page: page - 1,
            size: size,
          });
        }

        return dispatch.nguonNguoiBenh.updateData({
          listNguonNguoiBenh,
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
          response = await nguonNguoiBenhProvider.put(payload);
          dispatch.nguonNguoiBenh.updateData({
            dataEditTinhDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu nguồn người bệnh!");
        } else {
          dispatch.nguonNguoiBenh.updateData({
            dataSort: {
              createdAt: 2,
            },
          });
          response = await nguonNguoiBenhProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu nguồn người bệnh!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
  }),
};
