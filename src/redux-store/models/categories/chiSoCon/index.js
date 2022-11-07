import chiSoConProvider from "data-access/categories/dm-chi-so-con-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/index";
export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: SORT_DEFAULT,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getData: (
      { dichVuId, mauKetQuaXnId, page = 0, size = 10, ...payload },
      state
    ) => {
      dispatch.chiSoCon.updateData({
        page: 0,
        size,
        mauKetQuaXnId,
        dichVuId,
      });
      dispatch.chiSoCon.onSearch({
        page: 0,
        size,
        dichVuId,
        mauKetQuaXnId,
      });
    },
    onSizeChange: ({ size }, state) => {
      dispatch.chiSoCon.updateData({
        size,
        page: 0,
      });
      dispatch.chiSoCon.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.chiSoCon.updateData(newState);
      let size = payload.size || state.chiSoCon.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.chiSoCon.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.chiSoCon.dataSearch || {};
      const dichVuId = payload.hasOwnProperty("dichVuId")
        ? payload.dichVuId
        : state.chiSoCon.dichVuId;
      const mauKetQuaXnId = payload.hasOwnProperty("mauKetQuaXnId")
        ? payload.mauKetQuaXnId
        : state.chiSoCon.mauKetQuaXnId;

      chiSoConProvider
        .search({
          page,
          size,
          sort,
          dichVuId,
          mauKetQuaXnId,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.chiSoCon.updateData({
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
          dispatch.chiSoCon.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.chiSoCon.dataSortColumn,
        ...payload,
      };
      dispatch.chiSoCon.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.chiSoCon.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.chiSoCon.dataSearch || {}),
        ...payload,
      };
      dispatch.chiSoCon.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.chiSoCon.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: ({ ...payload }, state) => {
      const {
        chiSoCon: { dataSortColumn },
      } = state;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            chiSoConProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu chỉ số con!");

                let data = (state.chiSoCon.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.chiSoCon.updateData({
                  listData: data.sort((a, b) => b.active - a.active),
                  currentItem: null,
                  dataSortColumn,
                });
                resolve(s.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            chiSoConProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu chỉ số con!");
                const { data } = s;
                dispatch.chiSoCon.updateData({
                  currentItem: null,
                  dichVuId: data?.dichVuId,
                  mauKetQuaXnId: data?.mauKetQuaXnId,
                  dataSortColumn: SORT_DEFAULT,
                });
                dispatch.chiSoCon.onSearch({
                  page: 0,
                  dichVuId: data?.dichVuId,
                  mauKetQuaXnId: data?.mauKetQuaXnId,
                  dataSortColumn: SORT_DEFAULT,
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
        chiSoCon: { page, size },
      } = state;
      const response = await chiSoConProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.chiSoCon.getListServicesPackDetail({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
