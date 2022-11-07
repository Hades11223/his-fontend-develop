import boChiDinhProvider from "data-access/categories/dm-bo-chi-dinh-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import apiBase from "../../../../data-access/api-base";
export default {
  state: {
    listBoChiDinh: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    boChiDinh: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: boChiDinhProvider.searchAll,
      KEY_CACHE: "DATA_ALL_BO_CHI_DINH",
      model: "boChiDinh",
      fieldName: "BoChiDinh",
    }),
    getListBoChiDinh: async (payload = {}, state) => {
      console.log("payload: ", payload);
      try {
        const response = await boChiDinhProvider.search(payload);
        let {
          code,
          data: listBoChiDinh,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (code !== 0) throw new Error(messageInfo);

        if (page > 0 && numberOfElements === 0) {
          return dispatch.boChiDinh.getListBoChiDinh({
            page: page - 1,
            size,
          });
        }

        return dispatch.boChiDinh.updateData({
          listBoChiDinh,
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
      try {
        let response = {};
        if (payload.id) {
          response = await boChiDinhProvider.put(payload);
          dispatch.boChiDinh.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công!");
        } else {
          response = await boChiDinhProvider.post(payload);
          message.success("Thêm mới thành công!");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        boChiDinh: { page, size },
      } = state;
      const response = await boChiDinhProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công!");
        dispatch.boChiDinh.getListBoChiDinh({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getBoChiDinh: async (payload, state) => {
      const response = await boChiDinhProvider.searchAll(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        dispatch.boChiDinh.updateData({ boChiDinh: response });
        return response;
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
