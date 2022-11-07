import nhomDichVuCap3Provider from "data-access/categories/dm-nhom-dich-vu-cap3-provider";
import { message } from "antd";
import { SORT_DEFAULT } from "constants/index";
import apiBase from "data-access/api-base";
export default {
  state: {
    listGroupService3: [],
    totalElements: null,
    pageGroupService3: 0,
    sizeGroupService3: 10,
    dataEditDefault: {},
    dataSearch: {},
    dataSortGroupService3: SORT_DEFAULT,
    listAllNhomDichVuCap3: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: nhomDichVuCap3Provider.searchAll,
      KEY_CACHE: "DATA_NHOM_DV_CAP_3",
      model: "nhomDichVuCap3",
      fieldName: "NhomDichVuCap3",
    }),
    getAllDichVuCap3: async (payload = {}, state) => {
      let nhomDichVuCap1Id =
        state.nhomDichVuCap2.dataSearchAll?.nhomDichVuCap1Id || null;
      const response = await nhomDichVuCap3Provider.search({
        size: 9999,
        nhomDichVuCap1Id,
        active: true,
        ...payload,
      });
      let { data: listAllNhomDichVuCap3 } = response;
      return dispatch.nhomDichVuCap3.updateData({
        listAllNhomDichVuCap3,
        dataSearchAll: { ...payload },
      });
    },
    getAllTongHopDichVuCap3: async (payload = {}, state) => {
      let nhomDichVuCap1Id =
        state.nhomDichVuCap2.dataSearchAll?.nhomDichVuCap1Id || null;
      const response = await nhomDichVuCap3Provider.searchAll({
        size: 9999,
        nhomDichVuCap1Id,
        active: true,
        ...payload,
      });
      let { data: listAllNhomDichVuCap3 } = response;
      return dispatch.nhomDichVuCap3.updateData({
        listAllNhomDichVuCap3,
        dataSearchAll: { ...payload },
      });
    },
    searchDichVuCap3: async (payload = {}, state) => {
      try {
        const {
          pageGroupService3: page,
          sizeGroupService3: size,
          ...rest
        } = payload;
        payload = { page, size, ...rest };
        const response = await nhomDichVuCap3Provider.search(payload);
        let {
          data: listGroupService3,
          totalElements: totalGroupService3,
          pageNumber: pageGroupService3,
          pageSize: sizeGroupService3,
          numberOfElements,
        } = response;

        if (pageGroupService3 > 0 && numberOfElements === 0) {
          return dispatch.nhomDichVuCap3.searchDichVuCap3({
            ...payload,
            pageGroupService3: pageGroupService3 - 1,
            sizeGroupService3,
          });
        }

        return dispatch.nhomDichVuCap3.updateData({
          listGroupService3,
          totalGroupService3,
          pageGroupService3,
          sizeGroupService3,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    searchTongHopDichVuCap3: async (payload = {}, state) => {
      try {
        const {
          pageGroupService3: page,
          sizeGroupService3: size,
          ...rest
        } = payload;
        payload = { page, size, ...rest };
        const response = await nhomDichVuCap3Provider.searchAll(payload);
        let {
          data: listGroupService3,
          totalElements: totalGroupService3,
          pageNumber: pageGroupService3,
          pageSize: sizeGroupService3,
          numberOfElements,
        } = response;

        if (pageGroupService3 > 0 && numberOfElements === 0) {
          return dispatch.nhomDichVuCap3.searchTongHopDichVuCap3({
            ...payload,
            pageGroupService3: pageGroupService3 - 1,
            sizeGroupService3,
          });
        }

        return dispatch.nhomDichVuCap3.updateData({
          listGroupService3,
          totalGroupService3,
          pageGroupService3,
          sizeGroupService3,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEditGroupService3: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await nhomDichVuCap3Provider.put(payload);
          dispatch.nhomDichVuCap3.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu nhóm dv cấp 3!");
        } else {
          response = await nhomDichVuCap3Provider.post(payload);
          message.success("Thêm mới thành công dữ liệu nhóm dv cấp 3!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        nhomDichVuCap3: { pageGroupService3, sizeGroupService3 },
      } = state;
      const response = await nhomDichVuCap3Provider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.nhomDichVuCap3.searchDichVuCap3({
          pageGroupService3,
          sizeGroupService3,
        });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
