import maGiamGiaProvider from "data-access/categories/dm-ma-giam-gia-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import apiBase from "data-access/api-base";

export default {
  state: {
    listMaGiamGia: [],
    listAllMaGiamGia: [],
    listTongHop: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSort: {},
    totalTongHop: null,
    pageTongHop: PAGE_DEFAULT,
    sizeTongHop: PAGE_SIZE,
    dataSearchTongHop: {},
    dataSortTongHop: {},
    listMaGiamGiaDaSuDung:[]
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: maGiamGiaProvider.searchAll,
      model: "maGiamGia",
      fieldName: "MaGiamGia",
      KEY_CACHE: "DATA_ALL_MA_GIAM_GIA",
      allowCaching: false,
    }),
    getTongHop: async (payload = {}, state) => {
      try {
        const response = await maGiamGiaProvider.searchTongHop(payload);
        let {
          code,
          data: listTongHop,
          totalElements: totalTongHop,
          numberOfElements,
          message: messageInfo,
          pageNumber: pageTongHop,
          pageSize: sizeTongHop,
        } = response;
        if (code !== 0) throw new Error(messageInfo);
        if (pageTongHop > 0 && numberOfElements === 0) {
          return dispatch.maGiamGia.getTongHop({
            ...payload,
            page: pageTongHop - 1,
            size: sizeTongHop,
          });
        }

        return dispatch.maGiamGia.updateData({
          listTongHop,
          totalTongHop,
          pageTongHop,
          sizeTongHop,
        });
      } catch (err) {
        message.error(err?.message.toString());
        return Promise.reject(err);
      }
    },
    getListMaGiamGia: async (payload = {}, state) => {
      try {
        const response = await maGiamGiaProvider.search(payload);
        let {
          code,
          data: listMaGiamGia,
          totalElements,
          numberOfElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
        } = response;
        if (code !== 0) throw new Error(messageInfo);
        if (page > 0 && numberOfElements === 0) {
          return dispatch.maGiamGia.getListMaGiamGia({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.maGiamGia.updateData({
          listMaGiamGia,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err?.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await maGiamGiaProvider.put(payload);
          dispatch.maGiamGia.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu voucher!");
        } else {
          response = await maGiamGiaProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu voucher!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },

    createMultiple: async (payload = [], state) => {
      let response = {};
      try {
        response = await maGiamGiaProvider.batch(payload);
        message.success("Thêm mới thành công dữ liệu voucher!");
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },

    onDelete: async (payload, state) => {
      const {
        maGiamGia: { page, size },
      } = state;
      const response = await maGiamGiaProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.maGiamGia.getListChuongTrinhGiamGia({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getListMaGiamGiaDaSuDung: (payload) => {
      dispatch.maGiamGia.updateData({
        listMaGiamGiaDaSuDung:[]
      })
      maGiamGiaProvider
        .daSuDung(payload)
        .then((s) => {
          dispatch.maGiamGia.updateData({
            listMaGiamGiaDaSuDung: s.data
          })
        })
        .catch((e) => {});
    },
  }),
};
