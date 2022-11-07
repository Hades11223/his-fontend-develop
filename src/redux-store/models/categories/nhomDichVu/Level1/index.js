import nhomDichVuCap1Provider from "data-access/categories/dm-nhom-dich-vu-cap1-provider";
import { message } from "antd";
import { SORT_DEFAULT } from "constants/index";
import cacheUtils from "utils/cache-utils";
import apiBase from "data-access/api-base";
export default {
  state: {
    listGroupService1: [],
    totalElements: null,
    pageGroupService1: 0,
    sizeGroupService1: 10,
    dataEditDefault: {},
    dataSearch: {},
    listAllNhomDichVuCap1: [],
    dataSortGroupService1: SORT_DEFAULT,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: nhomDichVuCap1Provider.searchAll,
      KEY_CACHE: "DATA_NHOM_DV_CAP_1",
      model: "nhomDichVuCap1",
      fieldName: "NhomDichVuCap1",
    }),
    getAllDichVuCap1: async (payload = {}, state) => {
      let userId = state.auth.auth?.id;
      let listAllNhomDichVuCap1 = await cacheUtils.read(
        userId,
        `DATA_NHOM_DV_CAP_1`,
        [],
        false
      );
      dispatch.nhomDichVuCap1.updateData({ listAllNhomDichVuCap1 });
      return new Promise((resolve, reject) => {
        nhomDichVuCap1Provider
          .search({ active: true, ...payload })
          .then((s) => {
            if (s?.code === 0) {
              let data = (s?.data || []).map((item) => ({
                id: item.id,
                ten: item.ten,
                ma: item.ma,
              }));
              if (
                JSON.stringify(data) !== JSON.stringify(listAllNhomDichVuCap1)
              ) {
                dispatch.nhomDichVuCap1.updateData({
                  listAllNhomDichVuCap1: data,
                });
                cacheUtils.save(userId, `DATA_NHOM_DV_CAP_1`, data, false);
              }
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getAllTongHopDichVuCap1: async (payload = {}, state) => {
      let userId = state.auth.auth?.id;
      let listAllNhomDichVuCap1 = await cacheUtils.read(
        userId,
        `DATA_NHOM_DV_CAP_1`,
        [],
        false
      );
      dispatch.nhomDichVuCap1.updateData({ listAllNhomDichVuCap1 });
      return new Promise((resolve, reject) => {
        nhomDichVuCap1Provider
          .searchTongHop({ active: true, ...payload })
          .then((s) => {
            if (s?.code === 0) {
              let data = (s?.data || []).map((item) => ({
                id: item.id,
                ten: item.ten,
                ma: item.ma,
              }));
              if (
                JSON.stringify(data) !== JSON.stringify(listAllNhomDichVuCap1)
              ) {
                dispatch.nhomDichVuCap1.updateData({
                  listAllNhomDichVuCap1: data,
                });
                cacheUtils.save(userId, `DATA_NHOM_DV_CAP_1`, data, false);
              }
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    searchDichVuCap1: async (payload = {}, state) => {
      try {
        const {
          pageGroupService1: page,
          sizeGroupService1: size,
          ...rest
        } = payload;
        payload = { page, size, ...rest };
        const response = await nhomDichVuCap1Provider.search(payload);
        let {
          data: listGroupService1,
          totalElements: totalGroupService1,
          pageNumber: pageGroupService1,
          pageSize: sizeGroupService1,
          numberOfElements,
        } = response;

        if (pageGroupService1 > 0 && numberOfElements === 0) {
          return dispatch.nhomDichVuCap1.searchDichVuCap1({
            ...payload,
            pageGroupService1: pageGroupService1 - 1,
            sizeGroupService1,
          });
        }

        return dispatch.nhomDichVuCap1.updateData({
          listGroupService1,
          totalGroupService1,
          pageGroupService1,
          sizeGroupService1,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    searchTongHopDichVuCap1: async (payload = {}, state) => {
      try {
        const {
          pageGroupService1: page,
          sizeGroupService1: size,
          ...rest
        } = payload;
        payload = { page, size, ...rest };
        const response = await nhomDichVuCap1Provider.searchTongHop(payload);
        let {
          data: listGroupService1,
          totalElements: totalGroupService1,
          pageNumber: pageGroupService1,
          pageSize: sizeGroupService1,
          numberOfElements,
        } = response;

        if (pageGroupService1 > 0 && numberOfElements === 0) {
          return dispatch.nhomDichVuCap1.searchTongHopDichVuCap1({
            ...payload,
            pageGroupService1: pageGroupService1 - 1,
            sizeGroupService1,
          });
        }

        return dispatch.nhomDichVuCap1.updateData({
          listGroupService1,
          totalGroupService1,
          pageGroupService1,
          sizeGroupService1,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEditGroupService1: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await nhomDichVuCap1Provider.put(payload);
          dispatch.nhomDichVuCap1.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu nhóm dv cấp 1!");
        } else {
          response = await nhomDichVuCap1Provider.post(payload);
          message.success("Thêm mới thành công dữ liệu nhóm dv cấp 1!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        nhomDichVuCap1: { pageGroupService1, sizeGroupService1 },
      } = state;
      const response = await nhomDichVuCap1Provider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.nhomDichVuCap1.searchDichVuCap1({
          pageGroupService1,
          sizeGroupService1,
        });
      } else {
        message.error(messageInfo.toString());
      }
    },
    filter: (payload) => {
      return new Promise((resolve, reject) => {
        nhomDichVuCap1Provider
          .filter(payload)
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  }),
};
