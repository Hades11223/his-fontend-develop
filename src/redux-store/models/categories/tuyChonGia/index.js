import tuyChonGiaProvider from "data-access/categories/dm-tuy-chon-gia-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: { active: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getData: ({ dichVuId, page = 0, size = 10, ...payload }, state) => {
      dispatch.tuyChonGia.updateData({
        page: 0,
        size,
        dichVuId,
      });
      dispatch.tuyChonGia.onSearch({
        page: 0,
        size,
        dichVuId,
      });
    },

    onSizeChange: ({ size }, state) => {
      dispatch.tuyChonGia.updateData({
        size,
        page: 0,
      });
      dispatch.tuyChonGia.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.tuyChonGia.updateData(newState);
      let size = payload.size || state.tuyChonGia.size || 10;
      // let page = state.tuyChonGia.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.tuyChonGia.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.tuyChonGia.dataSearch || {};

      const dichVuId = payload.hasOwnProperty("dichVuId")
        ? payload.dichVuId
        : state.tuyChonGia.dichVuId;

      tuyChonGiaProvider
        .search({
          page,
          size,
          sort,
          dichVuId,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.tuyChonGia.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.tuyChonGia.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.tuyChonGia.dataSortColumn,
        ...payload,
      };
      dispatch.tuyChonGia.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.tuyChonGia.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.tuyChonGia.dataSearch || {}),
        ...payload,
      };
      dispatch.tuyChonGia.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.tuyChonGia.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            tuyChonGiaProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu giá dịch vụ!");

                let data = (state.tuyChonGia.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.tuyChonGia.updateData({
                  currentItem: null,
                  listData: data.sort((a, b) => b.active - a.active),
                });
                resolve(s.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            tuyChonGiaProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu giá dịch vụ!");
                dispatch.tuyChonGia.updateData({ currentItem: null });
                dispatch.tuyChonGia.onSearch({
                  page: 0,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
  }),
};
