import dmDichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider.js";
import { message } from "antd";
import { combineSort } from "utils";
import orderBy from "lodash/orderBy";
import cacheUtils from "utils/cache-utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: { ["dichVu.loaiDichVu"]: 110 },
    dataSortColumn: { active: 2, ["dichVu.ma"]: 1 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.danhMucHoaChat.updateData({
        size,
        page: 0,
      });
      dispatch.danhMucHoaChat.onSearch({ page: 0, size });
    },
    onSearchAll: ({ page, size, ...payload }) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllData = await cacheUtils.read(
            "",
            "DATA_ALL_DM_HOACHAT",
            [],
            false
          );
          dispatch.danhMucHoaChat.updateData({ listAllData });
          dmDichVuKhoProvider.searchAll({ page, size }).then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllData)) {
              cacheUtils.save("", "DATA_ALL_DM_HOACHAT", data, false);
              dispatch.danhMucHoaChat.updateData({
                listAllData: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.danhMucHoaChat.updateData(newState);
      let size = payload.size || state.danhMucHoaChat.size;
      // let page = state.danhMucHoaChat.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.danhMucHoaChat.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.danhMucHoaChat.dataSearch || {};

      dmDichVuKhoProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.danhMucHoaChat.updateData({
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
          dispatch.danhMucHoaChat.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhMucHoaChat.dataSortColumn,
        ...payload,
      };
      dispatch.danhMucHoaChat.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhMucHoaChat.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.danhMucHoaChat.dataSearch || {}),
        ...payload,
      };
      dispatch.danhMucHoaChat.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.danhMucHoaChat.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            dmDichVuKhoProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu hóa chất!");

                let data = (state.danhMucHoaChat.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.danhMucHoaChat.updateData({
                  currentItem: s.data,
                  listData: data,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          } else {
            dmDichVuKhoProvider
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu hóa chất!");
                dispatch.danhMucHoaChat.updateData({ currentItem: null });
                dispatch.danhMucHoaChat.onSearch({
                  page: 0,
                  dataSortColumn: { createdAt: 2 },
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
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
        danhMucHoaChat: { page, size },
      } = state;
      const response = await dmDichVuKhoProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.danhMucHoaChat.getListServicesPack({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
