import nhomDichVuKhoCap1Provider from "data-access/categories/nhom-dich-vu-kho-cap-1-provider";
import nhomDichVuKhoCap2Provider from "data-access/categories/nhom-dich-vu-kho-cap-2-provider";
import { message } from "antd";
import { SORT_DEFAULT } from "constants/index";

import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import apiBase from "data-access/api-base";

export default {
  state: {
    listSelectMeGrLv1: [],
    listMeGrLv: [],
    totalMeGrLv: null,
    pageMeGrLv: PAGE_DEFAULT,
    sizeMeGrLv: PAGE_SIZE,
    sortMeGrLv: SORT_DEFAULT,
    listMeGrLv1: [],
    totalMeGrLv1: null,
    pageMeGrLv1: PAGE_DEFAULT,
    sizeMeGrLv1: PAGE_SIZE,
    sortMeGrLv1: SORT_DEFAULT,
    listMeGrLv2: [],
    totalMeGrLv2: null,
    pageMeGrLv2: PAGE_DEFAULT,
    sizeMeGrLv2: PAGE_SIZE,
    sortMeGrLv2: SORT_DEFAULT,
    dataEditMeGrLv1Default: {},
    dataEditMeGrLv2Default: {},
    dataSearchMeGrLv: {},
    dataSearchMeGrLv1: {},
    dataSearchMeGrLv2: {},
    editStatusMeGrLv1: false,
    editStatusMeGrLv2: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: nhomDichVuKhoCap1Provider.searchAll,
      KEY_CACHE: "DATA_ALL_NHOM_DICH_VU_KHO_CAP1",
      model: "nhomDichVuKho",
      fieldName: "NhomDichVuKhoCap1",
    }),
    getListMeGrLv1: async (payload = {}, state) => {
      try {
        const response = await nhomDichVuKhoCap1Provider.search(payload);
        let {
          data: listMeGrLv1,
          totalElements: totalMeGrLv1,
          pageNumber: pageMeGrLv1,
          pageSize: sizeMeGrLv1,
          numberOfElements,
        } = response;

        if (pageMeGrLv1 > 0 && numberOfElements === 0) {
          return dispatch.nhomDichVuKho.getListMeGrLv1({
            ...payload,
            page: pageMeGrLv1 - 1,
            size: sizeMeGrLv1,
          });
        }

        if (payload.isShowSelect) {
          return dispatch.nhomDichVuKho.updateData({
            listSelectMeGrLv1: listMeGrLv1,
          });
        } else {
          dispatch.nhomDichVuKho.updateData({
            listMeGrLv1,
            totalMeGrLv1,
            pageMeGrLv1,
            sizeMeGrLv1,
          });
        }
        return response;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    getListMeGrLv1TongHop: async (payload = {}, state) => {
      try {
        const response = await nhomDichVuKhoCap1Provider.searchAll(
          payload
        );
        let {
          data: listMeGrLv1,
          totalElements: totalMeGrLv1,
          pageNumber: pageMeGrLv1,
          pageSize: sizeMeGrLv1,
          numberOfElements,
        } = response;

        if (pageMeGrLv1 > 0 && numberOfElements === 0) {
          return dispatch.nhomDichVuKho.getListMeGrLv1TongHop({
            ...payload,
            page: pageMeGrLv1 - 1,
            size: sizeMeGrLv1,
          });
        }

        if (payload.isShowSelect) {
          return dispatch.nhomDichVuKho.updateData({
            listSelectMeGrLv1: listMeGrLv1,
          });
        } else {
          dispatch.nhomDichVuKho.updateData({
            listMeGrLv1,
            totalMeGrLv1,
            pageMeGrLv1,
            sizeMeGrLv1,
          });
        }
        return response;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    getListMeGrLv2: async (payload = {}, state) => {
      const { showAll, ...rest } = payload;
      const response = await nhomDichVuKhoCap2Provider.search(rest);
      let {
        data: listMeGrLv2,
        totalElements: totalMeGrLv2,
        pageNumber: pageMeGrLv2,
        pageSize: sizeMeGrLv2,
        numberOfElements,
      } = response;

      if (pageMeGrLv2 > 0 && numberOfElements === 0) {
        return dispatch.nhomDichVuKho.getListMeGrLv1({
          ...rest,
          page: pageMeGrLv2 - 1,
          size: sizeMeGrLv2,
        });
      }

      if (showAll) {
        return dispatch.nhomDichVuKho.updateData({
          listMeGrLv: listMeGrLv2,
          totalMeGrLv: totalMeGrLv2,
          pageMeGrLv: pageMeGrLv2,
          sizeMeGrLv: sizeMeGrLv2,
        });
      } else {
        return dispatch.nhomDichVuKho.updateData({
          listMeGrLv2,
          totalMeGrLv2,
          pageMeGrLv2,
          sizeMeGrLv2,
        });
      }
    },
    getListMeGrLv2TongHop: async (payload = {}, state) => {
      const { showAll, ...rest } = payload;
      const response = await nhomDichVuKhoCap2Provider.searchTongHop(rest);
      let {
        data: listMeGrLv2,
        totalElements: totalMeGrLv2,
        pageNumber: pageMeGrLv2,
        pageSize: sizeMeGrLv2,
        numberOfElements,
      } = response;

      if (pageMeGrLv2 > 0 && numberOfElements === 0) {
        return dispatch.nhomDichVuKho.getListMeGrLv1TongHop({
          ...rest,
          page: pageMeGrLv2 - 1,
          size: sizeMeGrLv2,
        });
      }

      if (showAll) {
        return dispatch.nhomDichVuKho.updateData({
          listMeGrLv: listMeGrLv2,
          totalMeGrLv: totalMeGrLv2,
          pageMeGrLv: pageMeGrLv2,
          sizeMeGrLv: sizeMeGrLv2,
        });
      } else {
        return dispatch.nhomDichVuKho.updateData({
          listMeGrLv2,
          totalMeGrLv2,
          pageMeGrLv2,
          sizeMeGrLv2,
        });
      }
    },
    createOrEditMeGrLv1: async (payload = {}, state) => {
      try {
        let response = {};
        if (payload.id) {
          response = await nhomDichVuKhoCap1Provider.put(payload);
          dispatch.nhomDichVuKho.updateData({
            dataEditMeGrLv1Default: response.data,
          });
          message.success("Cập nhật thành công dữ liệu nhóm thuốc cấp 1!");
        } else {
          response = await nhomDichVuKhoCap1Provider.post(payload);
          message.success("Thêm mới thành công dữ liệu nhóm thuốc cấp 1!");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEditMeGrLv2: async (payload = {}, state) => {
      try {
        let response = {};
        if (payload.id) {
          response = await nhomDichVuKhoCap2Provider.put(payload);
          dispatch.nhomDichVuKho.updateData({
            dataEditMeGrLv2Default: response.data,
          });
          message.success("Cập nhật thành công dữ liệu nhóm thuốc cấp 2!");
        } else {
          response = await nhomDichVuKhoCap2Provider.post(payload);
          message.success("Thêm mới thành công dữ liệu nhóm thuốc cấp 2!");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
  }),
};
