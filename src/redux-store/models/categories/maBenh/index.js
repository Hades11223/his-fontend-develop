import maBenhProvider from "data-access/categories/dm-ma-benh-provider";
import { message } from "antd";
import { SORT_DEFAULT } from "constants/index";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import cacheUtils from "utils/cache-utils";
import orderBy from "lodash/orderBy";
import apiBase from "data-access/api-base";
export default {
  state: {
    listAllMaBenh: [],
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSort: SORT_DEFAULT,
    dataSortTongHop: { active: 2 },
    listAllData: [],
    listAllMaBenhPhu: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: maBenhProvider.searchAll,
      KEY_CACHE: "DATA_ALL_MA_BENH",
      model: "maBenh",
      fieldName: "MaBenh",
    }),

    onSearch: async (payload = {}, state) => {
      try {
        const response = await maBenhProvider.search(payload);
        let {
          data: listData,
          totalElements: total,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.maBenh.onSearch({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.maBenh.updateData({
          listData,
          total,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    getData: (payload, state) => {
      const {
        maBenh: { page, size, dataSearch, dataSort },
      } = state;
      dispatch.maBenh.updateData({
        page,
        size,
        ...dataSearch,
        dataSort,
        ...payload,
      });
      dispatch.maBenh.onSearch({
        page,
        size,
        ...dataSearch,
        sort: combineSort(dataSort),
        ...payload,
      });
    },
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await maBenhProvider.put(payload);
          message.success("Cập nhật thành công dữ liệu tên bệnh!");
          dispatch.maBenh.getData({});
        } else {
          response = await maBenhProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu tên bệnh!");
          dispatch.maBenh.getData({
            page: 0,
          });
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        TenBenh: { page, size },
      } = state;
      const response = await maBenhProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.maBenh.onSearch({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getAll: async ({ page = 0, size, active = true, ...payload }, state) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page === 0) {
        list = await cacheUtils.read(userId, `DATA_TEN_BENH`, [], false);
        dispatch.maBenh.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        maBenhProvider
          .search({
            page,
            size: size || 99999,
            sort: "ten,asc",
            active,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let data = (s?.data || []).map((item, index) => {
                const { ma, ten, id } = item;
                return {
                  ma,
                  ten,
                  id,
                };
              });
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                dispatch.maBenh.updateData({ listAllData: data });
                if (!size && page === 0)
                  cacheUtils.save(userId, `DATA_TEN_BENH`, data, false);
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
    getAllMaBenh: ({ nhomBenhPhu, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        let dataCache = {};
        let DataCache = "MA_BENH_CHINH";
        let DataStore = "MaBenhChinh";
        // switch (nhomBenhPhu) {
        //   case false:
        //     DataCache = "MA_BENH_CHINH";
        //     DataStore = "MaBenhChinh";
        //     break;
        //   case true:
        //     DataCache = "MA_BENH_PHU";
        //     DataStore = "MaBenhPhu";
        //     break;
        // }
        dataCache = await cacheUtils.read("", `DATA_${DataCache}`, [], false);
        dispatch.maBenh.updateData({
          [`listAll${DataStore}`]: dataCache?.data,
        });

        const syncTime = localStorage.getItem("TIME_RELOAD");
        if (
          !Number.isInteger(dataCache?.date) ||
          new Date().getTime() - dataCache.date > 600000 ||
          syncTime - dataCache.date > 0
        ) {
          maBenhProvider
            .searchAll({
              nhomBenhPhu,
              ...payload,
            })
            .then((s) => {
              if (s?.code === 0) {
                let { data } = s;
                data = orderBy(data, "ten", "asc");
                cacheUtils.save(
                  "",
                  `DATA_${DataCache}`,
                  { data: s.data, date: new Date().getTime() },
                  false
                );
                if (JSON.stringify(data) !== JSON.stringify(dataCache.data)) {
                  dispatch.maBenh.updateData({
                    [`listAll${DataStore}`]: data,
                  });
                }
                resolve(data);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        } else {
          resolve(dataCache.data || []);
        }
      });
    },
  }),
};
