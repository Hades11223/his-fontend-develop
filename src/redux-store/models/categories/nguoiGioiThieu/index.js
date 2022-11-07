import cacheUtils from "utils/cache-utils";
import nguoiGioiThieuProvider from "data-access/categories/dm-nguoi-gioi-thieu-provider";
import { message } from "antd";
import { SIZE_DEFAULT, PAGE_DEFAULT } from "constants/index";
import { SORT_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listAllNguoiGioiThieu: [],
    listNguoiGioiThieu: [],
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
    getListAllNguoiGioiThieu: (
      { page = 0, size = 9999, active = true, dsNguonNbId, ...payload },
      state
    ) => {
      return new Promise(async (resolve, reject) => {
        let dataCache = await cacheUtils.read(
          "",
          `DATA_NGUOI_GIOI_THIEU_` + dsNguonNbId,
          {},
          false
        );
        if (
          //Nếu dữ liệu hiện tại khác dữ liệu trong redux
          JSON.stringify(dataCache?.data || []) !==
          JSON.stringify(state.nguoiGioiThieu.listAllNguoiGioiThieu)
        ) {
          dispatch.nguoiGioiThieu.updateData({
            listAllNguoiGioiThieu: dataCache?.data || [],
          });
        }

        const syncTime = localStorage.getItem("TIME_RELOAD");
        if (
          !dataCache.data ||
          !Number.isInteger(dataCache?.date) ||
          new Date().getTime() - dataCache.date > 600000 ||
          syncTime - dataCache.date > 0
        ) {
          nguoiGioiThieuProvider
            .searchAll({ page, size, active, dsNguonNbId, ...payload })
            .then((s) => {
              let { data } = s;
              data = orderBy(data, "ten", "asc");
              cacheUtils.save(
                "",
                `DATA_NGUOI_GIOI_THIEU_` + dsNguonNbId,
                { data, date: new Date().getTime() },
                false
              );
              if (JSON.stringify(data) !== JSON.stringify(dataCache.data)) {
                dispatch.nguoiGioiThieu.updateData({
                  listAllNguoiGioiThieu: data,
                });
              }
              resolve(data || []);
            })
            .catch((e) => {
              reject([]);
            });
        } else {
          resolve(dataCache?.data || []);
        }
      });
    },
    search: async (payload = {}, state) => {
      try {
        const response = await nguoiGioiThieuProvider.search(payload);
        let {
          data: listNguoiGioiThieu,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nguoiGioiThieu.search({
            ...payload,
            pageNumber: page - 1,
            pageSize: size,
          });
        }
        return dispatch.nguoiGioiThieu.updateData({
          listNguoiGioiThieu,
          totalElements,
          pageNumber: page,
          pageSize: size,
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
          response = await nguoiGioiThieuProvider.update(payload);
          dispatch.nguoiGioiThieu.updateData({
            dataEditTinhDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu người giới thiệu!");
        } else {
          dispatch.nguoiGioiThieu.updateData({
            dataSort: {
              createdAt: 2,
            },
          });
          response = await nguoiGioiThieuProvider.create(payload);
          message.success("Thêm mới thành công dữ liệu người giới thiệu!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
  }),
};
