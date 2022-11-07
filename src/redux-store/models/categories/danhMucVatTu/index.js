import dmDichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider.js";
import { message } from "antd";
import { LOAI_DICH_VU } from "constants/index";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: { "dichVu.loaiDichVu": LOAI_DICH_VU.VAT_TU },
    dataSortColumn: { active: 2, "dichVu.ma": 1 },
    listDataVatTuBo: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.danhMucVatTu.updateData({
        size,
        page: 0,
      });
      dispatch.danhMucVatTu.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.danhMucVatTu.updateData(newState);
      let size = payload.size || state.danhMucVatTu.size;
      // let page = state.danhMucVatTu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.danhMucVatTu.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.danhMucVatTu.dataSearch || {};

      dmDichVuKhoProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.danhMucVatTu.updateData({
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
          dispatch.danhMucVatTu.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhMucVatTu.dataSortColumn,
        ...payload,
      };
      dispatch.danhMucVatTu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhMucVatTu.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.danhMucVatTu.dataSearch || {}),
        ...payload,
      };
      dispatch.danhMucVatTu.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.danhMucVatTu.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        if (payload.id) {
          dmDichVuKhoProvider
            .update(payload)
            .then((s) => {
              message.success("Cập nhật thành công dữ liệu vật tư!");

              let data = (state.danhMucVatTu.listData || []).map((item) => {
                if (item.id == s.data?.id) {
                  s.data.index = item.index;
                  return s.data;
                }
                return item;
              });
              dispatch.danhMucVatTu.updateData({
                listData: data,
              });
              resolve(s.data);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        } else {
          dmDichVuKhoProvider
            .create(payload)
            .then((s) => {
              message.success("Thêm mới thành công dữ liệu vật tư!");
              // dispatch.danhMucVatTu.updateData({ currentItem: null });
              // dispatch.danhMucVatTu.onSearch({
              //   page: 0,
              // });
              resolve(s.data);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        }
      });
    },
    onDelete: async (payload, state) => {
      const {
        danhMucVatTu: { page, size },
      } = state;
      const response = await dmDichVuKhoProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        // dispatch.danhMucVatTu.getListServicesPack({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getListVatTuBo: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.danhMucVatTu.size || 0;
      dmDichVuKhoProvider
        .search({ ...payload })
        .then((s) => {
          const data = {
            listDataVatTuBo: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
          };
          dispatch.danhMucVatTu.updateData({
            ...data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.danhMucVatTu.updateData({
            listDataVatTuBo: [],
            isLoading: false,
          });
        });
    },
    createBatch: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        dmDichVuKhoProvider
          .createBatch(payload)
          .then((s) => {
            message.success("Thêm mới thành công dữ liệu vật tư!");
            dispatch.danhMucVatTu.updateData({ currentItem: null });
            dispatch.danhMucVatTu.onSearch({
              page: 0,
            });
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
