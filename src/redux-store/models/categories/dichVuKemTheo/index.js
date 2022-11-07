import dichVuKemTheoProvider from "data-access/categories/dm-dv-kem-theo-provider";
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
    dataSortColumn: { active: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getData: ({ dichVuChinhId, page = 0, size = 10, ...payload }, state) => {
      dispatch.dichVuKemTheo.updateData({
        page: 0,
        size,
        dichVuChinhId,
      });
      dispatch.dichVuKemTheo.onSearch({
        page: 0,
        size,
        dichVuChinhId,
      });
    },
    onSizeChange: ({ size }, state) => {
      dispatch.dichVuKemTheo.updateData({
        size,
        page: 0,
      });
      dispatch.dichVuKemTheo.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dichVuKemTheo.updateData(newState);
      let size = payload.size || state.dichVuKemTheo.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.dichVuKemTheo.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dichVuKemTheo.dataSearch || {};
      const dichVuChinhId = payload.hasOwnProperty("dichVuChinhId")
        ? payload.dichVuChinhId
        : state.dichVuKemTheo.dichVuChinhId;

      dichVuKemTheoProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
          dichVuChinhId,
        })
        .then((s) => {
          dispatch.dichVuKemTheo.updateData({
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
          dispatch.dichVuKemTheo.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dichVuKemTheo.dataSortColumn,
        ...payload,
      };
      dispatch.dichVuKemTheo.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dichVuKemTheo.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dichVuKemTheo.dataSearch || {}),
        ...payload,
      };
      dispatch.dichVuKemTheo.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dichVuKemTheo.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: ({ ...payload }, state) => {
      const {
        dichVuKemTheo: { dataSortColumn },
      } = state;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            dichVuKemTheoProvider
              .put(payload)
              .then((s) => {
                message.success(
                  "Cập nhật thành công dữ liệu dịch vụ kèm theo!"
                );

                let data = (state.dichVuKemTheo.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.dichVuKemTheo.updateData({
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
            dichVuKemTheoProvider
              .post(payload)
              .then((s) => {
                message.success(
                  "Thêm mới thành công dữ liệu dịch vụ kèm theo!"
                );
                const { data } = s;
                dispatch.dichVuKemTheo.updateData({
                  currentItem: null,
                  dichVuChinhId: data?.dichVuChinhId,
                  dataSortColumn: { active: 2 },
                });
                dispatch.dichVuKemTheo.onSearch({
                  page: 0,
                  dichVuChinhId: data?.dichVuChinhId,
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
        dichVuKemTheo: { page, size },
      } = state;
      const response = await dichVuKemTheoProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.dichVuKemTheo.getListServicesPackDetail({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
