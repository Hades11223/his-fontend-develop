import donViTinhProvider from "data-access/categories/dm-don-vi-tinh-provider";
import nhomDonViTinhProvider from "data-access/categories/dm-nhom-don-vi-tinh-provider";
import { message } from "antd";
import apiBase from "../../../../data-access/api-base";

export default {
  state: {
    listGroupUnit: [],
    totalUnit: null,
    pageUnit: 0,
    sizeUnit: 10,
    totalGroupUnit: null,
    pageGroupUnit: 0,
    sizeGroupUnit: 10,
    dataEditGroupUnitDefault: {},
    dataEditUnitDefault: {},
    dataSearchGroupUnit: {},
    dataSortGroupUnit: null,
    dataSearchUnit: {},
    dataSortUnit: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: donViTinhProvider.searchAll,
      KEY_CACHE: "DATA_ALL_DON_VI_TIH",
      model: "donViTinh",
      fieldName: "DonViTinh",
      getKeyCache: (key, payload = {}) => {
        return key + payload.loaiDichVu;
      },
    }),

    getListDonViTinh: async (payload = {}, state) => {
      const { pageUnit: page, sizeUnit: size, ...rest } = payload;
      const response = await donViTinhProvider.search({
        ...rest,
        page,
        size,
      });
      let {
        code,
        data: listDonViTinh,
        totalElements: totalUnit,
        message: messageInfo,
        pageNumber: pageUnit,
        pageSize: sizeUnit,
        numberOfElements,
      } = response;

      if (code !== 0) throw new Error(messageInfo);
      if (page > 0 && numberOfElements === 0) {
        return dispatch.donViTinh.getListDonViTinh({
          ...payload,
          pageUnit: pageUnit - 1,
          sizeUnit,
        });
      }
      listDonViTinh = listDonViTinh.map((item, index) => ({
        ...item,
        action: item,
        stt: pageUnit * sizeUnit + index + 1,
      }));
      return dispatch.donViTinh.updateData({
        listDonViTinh,
        totalUnit,
        pageUnit,
        sizeUnit,
      });
    },
    getListNhomDonViTinh: async (payload = {}, state) => {
      const { pageGroupUnit: page, sizeGroupUnit: size, ...rest } = payload;
      const response = await nhomDonViTinhProvider.search({
        ...rest,
        page,
        size,
      });
      let {
        code,
        data: listGroupUnit,
        totalElements: totalGroupUnit,
        message: messageInfo,
        pageNumber: pageGroupUnit,
        pageSize: sizeGroupUnit,
        numberOfElements,
      } = response;
      if (code !== 0) throw new Error(messageInfo);

      if (pageGroupUnit > 0 && numberOfElements === 0) {
        return dispatch.donViTinh.getListNhomDonViTinh({
          ...payload,
          pageGroupUnit: pageGroupUnit - 1,
          sizeGroupUnit,
        });
      }

      listGroupUnit = listGroupUnit.map((item, index) => ({
        ...item,
        action: item,
        stt: pageGroupUnit * sizeGroupUnit + index + 1,
      }));
      return dispatch.donViTinh.updateData({
        listGroupUnit,
        totalGroupUnit,
        pageGroupUnit,
        sizeGroupUnit,
      });
    },


    createOrEditNhomDonViTinh: async (payload = {}, state) => {
      try {
        let response = {};
        if (payload.id) {
          response = await nhomDonViTinhProvider.put(payload);
          dispatch.donViTinh.updateData({
            dataEditGroupUnitDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu nhóm đơn vị tính!");
        } else {
          response = await nhomDonViTinhProvider.post(payload);
          if (response.code === 0) {
            message.success("Thêm mới thành công dữ liệu nhóm đơn vị tính!");
          }
        }

        const { code, message: messageInfo } = response;
        if (code !== 0) {
          message.error(messageInfo.toString());
        }
      } catch (err) {
        message.error(err.message.toString());
      }
    },
    createOrEditDonViTinh: async (info = {}, state) => {
      try {
        const { callback, ...payload } = info;
        let response = {};
        if (payload.id) {
          response = await donViTinhProvider.put(payload);
          dispatch.donViTinh.updateData({
            dataEditUnitDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu đơn vị tính!");
        } else {
          response = await donViTinhProvider.post({
            ...payload,
          });
          if (response.code === 0) {
            message.success("Thêm mới thành công dữ liệu đơn vị tính!");
          }
        }

        const { code, message: messageInfo } = response;
        if (code !== 0) {
          message.error(messageInfo.toString());
        }
        callback();
      } catch (err) {
        message.error(err.message.toString());
      }
    },
  }),
};
