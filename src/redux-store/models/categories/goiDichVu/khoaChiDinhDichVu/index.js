import cacheUtils from "utils/cache-utils";
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
    dataSortColumn: { active: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getData: (
      { dichVuId, boChiDinhId, page = 0, size = 10, ...payload },
      state
    ) => {
      dispatch.khoaChiDinhDichVu.updateData({
        page: 0,
        size,
        dataSearch: {
          ...state.khoaChiDinhDichVu.dataSearch,
          dichVuId,
          boChiDinhId,
        },
      });
      dispatch.khoaChiDinhDichVu.onSearch({
        page: 0,
        size,
        dichVuId,
        boChiDinhId,
      });
    },
    onSizeChange: ({ size, dichVuId, boChiDinhId }, state) => {
      dispatch.khoaChiDinhDichVu.updateData({
        size,
        page: 0,
      });
      dispatch.khoaChiDinhDichVu.onSearch({
        page: 0,
        size,
        dichVuId,
        boChiDinhId,
      });
    },

    onSearch: ({ page = 0, dichVuId, boChiDinhId, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.khoaChiDinhDichVu.updateData(newState);
      let size = payload.size || state.khoaChiDinhDichVu.size || 10;
      // let page = state.khoaChiDinhDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.khoaChiDinhDichVu.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.khoaChiDinhDichVu.dataSearch || {};

      khoaChiDinhDichVuProvider
        .search({
          page,
          size,
          sort,
          dichVuId: dichVuId || undefined,
          boChiDinhId: boChiDinhId || undefined,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.khoaChiDinhDichVu.updateData({
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
          dispatch.khoaChiDinhDichVu.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.khoaChiDinhDichVu.dataSortColumn,
        ...payload,
      };
      dispatch.khoaChiDinhDichVu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.khoaChiDinhDichVu.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.khoaChiDinhDichVu.dataSearch || {}),
        ...payload,
      };
      dispatch.khoaChiDinhDichVu.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.khoaChiDinhDichVu.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: ({ ...payload }, state) => {
      const {
        khoaChiDinhDichVu: { dataSortColumn },
      } = state;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            khoaChiDinhDichVuProvider
              .update(payload)
              .then((s) => {
                message.success(
                  "Cập nhật thành công dữ liệu khoa chỉ định dịch vụ!"
                );

                let data = (state.khoaChiDinhDichVu.listData || []).map(
                  (item) => {
                    if (item.id == s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  }
                );
                dispatch.khoaChiDinhDichVu.updateData({
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
            khoaChiDinhDichVuProvider
              .create(payload)
              .then((s) => {
                message.success(
                  "Thêm mới thành công dữ liệu khoa chỉ định dịch vụ!"
                );
                dispatch.khoaChiDinhDichVu.updateData({
                  currentItem: null,
                  dataSortColumn: { active: 2 },
                });
                const { boChiDinhId, dichVuId } = payload;
                dispatch.khoaChiDinhDichVu.onSearch({
                  page: 0,
                  dichVuId,
                  boChiDinhId,
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
        khoaChiDinhDichVu: { page, size },
      } = state;
      const response = await khoaChiDinhDichVuProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.khoaChiDinhDichVu.getListServicesPackDetail({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
