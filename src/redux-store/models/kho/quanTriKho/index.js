import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import khoTrucThuocProvider from "data-access/kho/dm-kho-truc-thuoc-provider";
import { combineSort } from "utils";

export default {
  state: {
    listData: [],
    listKhoTrucThuoc: [], // list kho trực thuộc kho xuất chỉ gồm id + tên
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
    getData: ({ khoQuanLyId, page = 0, size = 10, ...payload }, state) => {
      dispatch.quanTriKho.updateData({
        page: 0,
        size,
      });
      dispatch.quanTriKho.onSearch({
        page: 0,
        size,
        khoQuanLyId,
      });
    },
    onSizeChange: ({ size, khoQuanLyId }, state) => {
      dispatch.quanTriKho.updateData({
        size,
        page: 0,
      });
      dispatch.quanTriKho.onSearch({
        page: 0,
        size,
        khoQuanLyId,
      });
    },

    onSearch: ({ page = 0, khoQuanLyId, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.quanTriKho.updateData(newState);
      let size = payload.size || state.kho.size || 10;
      // let page = state.kho.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.kho.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.kho.dataSearch || {};

      khoTrucThuocProvider
        .search({
          page,
          size,
          sort,
          khoQuanLyId,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.quanTriKho.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            listKhoTrucThuoc: (s?.data || []).map((item, index) => ({
              id: item.khoTrucThuoc?.id,
              ten: item.khoTrucThuoc?.ten,
            })),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.quanTriKho.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state, khoQuanLyId) => {
      const dataSortColumn = {
        ...state.quanTriKho.dataSortColumn,
        ...payload,
      };
      dispatch.quanTriKho.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.quanTriKho.onSearch({
        page: 0,
        dataSortColumn,
        khoQuanLyId,
      });
    },

    onChangeInputSearch: ({ ...payload }, state, khoQuanLyId) => {
      const dataSearch = {
        ...(state.kho.dataSearch || {}),
        ...payload,
      };
      dispatch.quanTriKho.updateData({
        page: 0,
        dataSearch,
        khoQuanLyId,
      });
      dispatch.quanTriKho.onSearch({
        page: 0,
        dataSearch,
        khoQuanLyId,
      });
    },

    createOrEdit: ({ ...payload }, state, khoQuanLyId) => {
      const {
        kho: { dataSortColumn },
      } = state;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            khoTrucThuocProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu kho trực thuộc!");
                let data = (state.quanTriKho.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.quanTriKho.updateData({
                  currentItem: null,
                  listData: data.sort((a, b) => b.active - a.active),
                  dataSortColumn,
                });
                resolve(s.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            khoTrucThuocProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu kho trực thuộc");
                dispatch.quanTriKho.updateData({
                  currentItem: null,
                  dataSortColumn: { active: 2 },
                });
                dispatch.quanTriKho.onSearch({
                  page: 0,
                  khoQuanLyId,
                  dataSortColumn: { active: 2 },
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

    onDelete: async (payload, state) => {
      const {
        kho: { page, size },
      } = state;
      const response = await khoTrucThuocProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.quanTriKho.getListServicesPackDetail({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
