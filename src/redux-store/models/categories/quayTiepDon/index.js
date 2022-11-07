import cacheUtils from "utils/cache-utils";
import quayTiepDonProvider from "data-access/categories/dm-quay-tiep-don-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";
import apiBase from "data-access/api-base";
export default {
  state: {
    listQuayTiepDon: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: quayTiepDonProvider.searchAll,
      KEY_CACHE: "DATA_ALL_QUAY_TIEP_DON",
      model: "quayTiepDon",
      fieldName: "QuayTiepDon",
      getKeyCache: (key, payload = {}) => {
        return key + payload.loaiPhong;
      },
    }),
    getAllQuayTiepDon: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let userId = state.auth.auth?.id;
          let listAllQuayTiepDon = await cacheUtils.read(
            userId,
            "DATA_ALL_QUAY_TIEP_DON",
            [],
            false
          );
          dispatch.quayTiepDon.updateData({ listAllQuayTiepDon });
          quayTiepDonProvider.quayTheoTaiKhoan().then((s) => {
            dispatch.quayTiepDon.updateData({
              listAllQuayTiepDonTaiKhoan: s?.data,
            });
            let data = (s?.data || []).map((item) => {
              const { ma, ten, id } = item;
              return {
                ma,
                ten,
                id,
              };
            });

            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllQuayTiepDon)) {
              cacheUtils.save(userId, "DATA_ALL_QUAY_TIEP_DON", data, false);
              dispatch.quayTiepDon.updateData({
                listAllQuayTiepDon: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    searchQuayTiepDon: async (payload = {}, state) => {
      try {
        const response = await quayTiepDonProvider.search(payload);
        let {
          code,
          data: listQuayTiepDon,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.quayTiepDon.searchQuayTiepDon({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.quayTiepDon.updateData({
          listQuayTiepDon,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    getListTongHop: (payload = {}, state) => {
      quayTiepDonProvider
        .searchTongHop(payload)
        .then((s) => {
          dispatch.quayTiepDon.updateData({
            listQuayTiepDonTongHop: s?.data,
          });
        })
        .catch((e) => {
          dispatch.quayTiepDon.updateData({
            listQuayTiepDonTongHop: [],
          });
        });
    },
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await quayTiepDonProvider.put(payload);
          dispatch.quayTiepDon.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu quầy tiếp đón!");
        } else {
          response = await quayTiepDonProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu quầy tiếp đón!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        quayTiepDon: { page, size },
      } = state;
      const response = await quayTiepDonProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.quayTiepDon.searchQuayTiepDon({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
