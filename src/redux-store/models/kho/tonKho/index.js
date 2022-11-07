import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import tonKhoProvider from "data-access/kho/kho-ton-kho-provider";
import cacheUtils from "utils/cache-utils";
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
    onSizeChange: ({ size, khoQuanLyId, fromTongHop, theoLo }, state) => {
      dispatch.tonKho.updateData({
        size,
        page: 0,
      });
      dispatch.tonKho.onSearch({
        page: 0,
        size,
        khoQuanLyId,
        fromTongHop,
        theoLo,
      });
    },

    onSearch: (
      { page = 0, khoQuanLyId, fromTongHop, theoLo, ...payload },
      state
    ) => {
      return new Promise((resolve, reject) => {
        let newState = { isLoading: true, page };
        dispatch.tonKho.updateData(newState);
        let size = payload.size || state.tonKho.size || 10;
        // let page = state.kho.page || 0;
        const sort = combineSort(
          payload.dataSortColumn || state.tonKho.dataSortColumn || {}
        );
        const dataSearch = payload.dataSearch || state.tonKho.dataSearch || {};

        tonKhoProvider[
          theoLo ? "theoLo" : fromTongHop ? "searchAll" : "search"
        ]({
          page,
          size,
          sort,
          khoQuanLyId,
          ...dataSearch,
        })
          .then((s) => {
            dispatch.tonKho.updateData({
              listData: (s?.data || []).map((item, index) => {
                item.index = page * size + index + 1;
                return item;
              }),
              isLoading: false,
              totalElements: s?.totalElements || 0,
              page,
            });
            resolve(s?.data || []);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.tonKho.updateData({
              listData: [],
              isLoading: false,
            });
            reject(e);
          });
      });
    },

    onSortChange: ({ fromTongHop, theoLo, ...payload }, state, khoQuanLyId) => {
      const dataSortColumn = {
        ...state.tonKho.dataSortColumn,
        ...payload,
      };
      dispatch.tonKho.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.tonKho.onSearch({
        page: 0,
        dataSortColumn,
        khoQuanLyId,
        fromTongHop,
        theoLo,
      });
    },

    onChangeInputSearch: (
      { fromTongHop, theoLo, ...payload },
      state,
      khoQuanLyId
    ) => {
      const dataSearch = {
        ...(state.kho.dataSearch || {}),
        ...payload,
      };
      dispatch.tonKho.updateData({
        page: 0,
        dataSearch,
        khoQuanLyId,
      });
      dispatch.tonKho.onSearch({
        page: 0,
        dataSearch,
        khoQuanLyId,
        fromTongHop,
        theoLo,
      });
    },

    createOrEdit: ({ ...payload }, state, khoQuanLyId) => {
      const {
        kho: { dataSortColumn },
      } = state;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            tonKhoProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu kho trực thuộc!");
                let data = (state.tonKho.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.tonKho.updateData({
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
            tonKhoProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu kho trực thuộc");
                dispatch.tonKho.updateData({
                  currentItem: null,
                  dataSortColumn: { active: 2 },
                });
                dispatch.tonKho.onSearch({
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
      const response = await tonKhoProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.tonKho.getListServicesPackDetail({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },

    onSearchAllDichVuTonKho: ({ page = 0, khoQuanLyId, ...payload }, state) => {
      let newState = { isLoading: true, page };
      let size = payload.size || state.tonKho.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.tonKho.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.tonKho.dataSearch || {};
      dispatch.tonKho.updateData({ ...newState, dataSearch });
      return new Promise(async (resolve, reject) => {
        dispatch.tonKho.updateData({ isLoading: true });
        tonKhoProvider
          .searchAll({
            page,
            size,
            sort,
            khoQuanLyId,
            ...dataSearch,
          })
          .then(async (s) => {
            let listAllDichVuTonKho = (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            });
            const setMap = {};
            for (let i = 0; i < listAllDichVuTonKho.length; i++) {
              setMap[listAllDichVuTonKho[i].dichVuId] = listAllDichVuTonKho[i];
            }
            dispatch.tonKho.updateData({
              listAllDichVuTonKho,
              listAllHangHoa: Object.values(setMap).map((item) => ({
                id: item.dichVuId,
                ten: item.ten,
              })),
              isLoading: false,
              totalElements: s?.totalElements || 0,
              page,
            });
            resolve(listAllDichVuTonKho);
          })
          .catch((e) => {
            message.error(e?.message?.toString());
            dispatch.tonKho.updateData({
              listAllDichVuTonKho: [],
              isLoading: false,
            });
            reject(e);
          });
      });
    },
  }),
};
