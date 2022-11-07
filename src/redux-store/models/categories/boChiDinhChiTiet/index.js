import boChiDinhChiTietProvider from "data-access/categories/dm-bo-chi-dinh-chi-tiet-provider";
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
    getData: ({ boChiDinhId, page = 0, size = 10, ...payload }, state) => {
      dispatch.boChiDinhChiTiet.updateData({
        page: 0,
        size,
        boChiDinhId,
      });
      dispatch.boChiDinhChiTiet.onSearch({
        page: 0,
        size,
        dataSearch: {
          boChiDinhId,
        },
      });
    },

    onSizeChange: ({ size }, state) => {
      dispatch.boChiDinhChiTiet.updateData({
        size,
        page: 0,
      });
      dispatch.boChiDinhChiTiet.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.boChiDinhChiTiet.updateData(newState);
      let size = payload.size || state.boChiDinhChiTiet.size || 10;
      // let page = state.boChiDinhChiTiet.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.boChiDinhChiTiet.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.boChiDinhChiTiet.dataSearch || {};

      const boChiDinhId = payload.hasOwnProperty("boChiDinhId")
        ? payload.boChiDinhId
        : state.boChiDinhChiTiet.boChiDinhId;

      boChiDinhChiTietProvider
        .search({
          page,
          size,
          sort,
          boChiDinhId,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.boChiDinhChiTiet.updateData({
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
          dispatch.boChiDinhChiTiet.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.boChiDinhChiTiet.dataSortColumn,
        ...payload,
      };
      dispatch.boChiDinhChiTiet.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.boChiDinhChiTiet.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.boChiDinhChiTiet.dataSearch || {}),
        ...payload,
      };
      dispatch.boChiDinhChiTiet.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.boChiDinhChiTiet.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            boChiDinhChiTietProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ bộ chỉ định chi tiết!");

                let data = (state.boChiDinhChiTiet.listData || []).map(
                  (item) => {
                    if (item.id === s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  }
                );
                dispatch.boChiDinhChiTiet.updateData({
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
            boChiDinhChiTietProvider
              .post(payload)
              .then((s) => {
                message.success(
                  "Thêm mới thành công dữ liệu bộ chỉ định chi tiết!"
                );
                dispatch.boChiDinhChiTiet.updateData({ currentItem: null });
                dispatch.boChiDinhChiTiet.onSearch({
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
    batch: (payload, state) => {
      return new Promise((resolve, reject) => {
        try {
          boChiDinhChiTietProvider
            .batch(payload)
            .then((s) => {
              message.success(
                "Thêm mới thành công dữ liệu bộ chỉ định chi tiết!"
              );
              dispatch.boChiDinhChiTiet.updateData({ currentItem: null });
              dispatch.boChiDinhChiTiet.onSearch({
                page: 0,
              });
              resolve(s?.data);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    onDelete: async (payload, state) => {
      const {
        boChiDinhChiTiet: { page, size, boChiDinhId },
      } = state;
      const response = await boChiDinhChiTietProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.boChiDinhChiTiet.getData({
          page,
          size,
          boChiDinhId: boChiDinhId,
        });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
