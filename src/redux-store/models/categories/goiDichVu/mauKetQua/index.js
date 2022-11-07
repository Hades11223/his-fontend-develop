import khoaChiDinhDichVuProvider from "data-access/categories/dm-khoa-chi-dinh-dich-vu-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
export default {
  state: {
    listData: [],
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
    getData: ({ dichVuId, page = 0, size = 10, ...payload }, state) => {
      dispatch.mauKetQua.updateData({
        page: 0,
        size,
        dichVuId,
      });
      dispatch.mauKetQua.onSearch({
        page: 0,
        size,
        dichVuId,
      });
    },
    onSizeChange: ({ size }, state) => {
      dispatch.mauKetQua.updateData({
        size,
        page: 0,
      });
      dispatch.mauKetQua.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.mauKetQua.updateData(newState);
      let size = payload.size || state.mauKetQua.size || 10;
      // let page = state.mauKetQua.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.mauKetQua.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.mauKetQua.dataSearch || {};
      const dichVuId = payload.hasOwnProperty("dichVuId")
        ? payload.dichVuId
        : state.phongThucHien.dichVuId;

      khoaChiDinhDichVuProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
          dichVuId,
        })
        .then((s) => {
          dispatch.mauKetQua.updateData({
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
          dispatch.mauKetQua.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.mauKetQua.dataSortColumn,
        ...payload,
      };
      dispatch.mauKetQua.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.mauKetQua.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.mauKetQua.dataSearch || {}),
        ...payload,
      };
      dispatch.mauKetQua.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.mauKetQua.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            khoaChiDinhDichVuProvider
              .update(payload)
              .then((s) => {
                message.success(
                  "Cập nhật thành công dữ liệu chi tiết gói dịch vụ!"
                );

                let data = (state.mauKetQua.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.mauKetQua.updateData({
                  currentItem: null,
                  listData: data,
                });
                resolve(s.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            khoaChiDinhDichVuProvider
              .create(payload)
              .then((s) => {
                message.success(
                  "Thêm mới thành công dữ liệu chi tiết gói dịch vụ!"
                );
                dispatch.mauKetQua.updateData({ currentItem: null });
                dispatch.mauKetQua.onSearch({
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

    onDelete: async (payload, state) => {
      const {
        mauKetQua: { page, size },
      } = state;
      const response = await khoaChiDinhDichVuProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.mauKetQua.getListServicesPackDetail({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
