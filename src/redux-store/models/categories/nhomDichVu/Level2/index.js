import nhomDichVuCap2Provider from "data-access/categories/dm-nhom-dich-vu-cap2-provider";
import { message } from "antd";
import { SORT_DEFAULT } from "constants/index";
import apiBase from "data-access/api-base";
export default {
  state: {
    listGroupService2: [],
    totalElements: null,
    pageGroupService2: 0,
    sizeGroupService2: 10,
    dataEditDefault: {},
    dataSearch: {},
    listAllNhomDichVuCap2: [],
    dataSortGroupService2: SORT_DEFAULT,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: nhomDichVuCap2Provider.searchAll,
      KEY_CACHE: "DATA_NHOM_DV_CAP_2",
      model: "nhomDichVuCap2",
      fieldName: "NhomDichVuCap2",
    }),
    getAllDichVuCap2: async (payload = {}, state) => {
      const response = await nhomDichVuCap2Provider.search({
        size: 9999,
        active: true,
        ...payload,
      });
      let { data: listAllNhomDichVuCap2 } = response;
      return dispatch.nhomDichVuCap2.updateData({
        listAllNhomDichVuCap2,
        dataSearchAll: { ...payload },
      });
    },
    getAllTongHopDichVuCap2: async (payload = {}, state) => {
      const response = await nhomDichVuCap2Provider.searchAll({
        size: 9999,
        active: true,
        ...payload,
      });
      let { data: listAllNhomDichVuCap2 } = response;
      return dispatch.nhomDichVuCap2.updateData({
        listAllNhomDichVuCap2,
        dataSearchAll: { ...payload },
      });
    },
    searchDichVuCap2: async (payload = {}, state) => {
      try {
        const {
          pageGroupService2: page,
          sizeGroupService2: size,
          ...rest
        } = payload;
        payload = { page, size, ...rest };
        const response = await nhomDichVuCap2Provider.search(payload);
        let {
          data: listGroupService2,
          totalElements: totalGroupService2,
          pageNumber: pageGroupService2,
          pageSize: sizeGroupService2,
          numberOfElements,
        } = response;

        if (pageGroupService2 > 0 && numberOfElements === 0) {
          return dispatch.nhomDichVuCap2.searchDichVuCap2({
            ...payload,
            pageGroupService2: pageGroupService2 - 1,
            sizeGroupService2,
          });
        }

        return dispatch.nhomDichVuCap2.updateData({
          listGroupService2,
          totalGroupService2,
          pageGroupService2,
          sizeGroupService2,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    searchTongHopDichVuCap2: async (payload = {}, state) => {
      try {
        const {
          pageGroupService2: page,
          sizeGroupService2: size,
          ...rest
        } = payload;
        payload = { page, size, ...rest };
        const response = await nhomDichVuCap2Provider.searchAll(payload);
        let {
          data: listGroupService2,
          totalElements: totalGroupService2,
          pageNumber: pageGroupService2,
          pageSize: sizeGroupService2,
          numberOfElements,
        } = response;

        if (pageGroupService2 > 0 && numberOfElements === 0) {
          return dispatch.nhomDichVuCap2.searchTongHopDichVuCap2({
            ...payload,
            pageGroupService2: pageGroupService2 - 1,
            sizeGroupService2,
          });
        }

        return dispatch.nhomDichVuCap2.updateData({
          listGroupService2,
          totalGroupService2,
          pageGroupService2,
          sizeGroupService2,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEditGroupService2: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await nhomDichVuCap2Provider.put(payload);
          dispatch.nhomDichVuCap2.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu nhóm dv cấp 2!");
        } else {
          response = await nhomDichVuCap2Provider.post(payload);
          message.success("Thêm mới thành công dữ liệu nhóm dv cấp 2!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        nhomDichVuCap2: { pageGroupService2, sizeGroupService2 },
      } = state;
      const response = await nhomDichVuCap2Provider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.nhomDichVuCap2.searchDichVuCap2({
          pageGroupService2,
          sizeGroupService2,
        });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getDichVuCDHAChoTiepDon: async (payload = {}, state) => {
      const response = await nhomDichVuCap2Provider.getNhomDichVuTongHop({
        active: true,
        ...payload,
      });
      let { data: listAllNhomDichVuCap2 } = response;
      return dispatch.nhomDichVuCap2.updateData({
        listAllNhomDichVuCap2,
        dataSearchAll: { ...payload },
      });
    },
  }),
};
