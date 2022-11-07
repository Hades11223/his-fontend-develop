import fetchProvider from "data-access/categories/dm-nhom-chi-phi-provider";
import dmDvNhomChiPhiProvider from "data-access/categories/dm-dv-nhom-chi-phi-provider";
import baseStore from "../../base-store";
import { combineSort } from "utils";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "nhomChiPhi",
    title: "Nhóm chi phí",
    initState: {
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      dataSortColumn: { active: 2 },
    },
    customEffect: ({ dispatch }) => ({
      getData: ({ dichVuId, page = 0, size = 10, ...payload }, state) => {
        dispatch.nhomChiPhi.updateData({
          page: 0,
          size,
          dichVuId,
        });
        dispatch.nhomChiPhi.onSearch({
          page: 0,
          size,
          dichVuId,
        });
      },

      onSizeChange: ({ size }, state) => {
        dispatch.nhomChiPhi.updateData({
          size,
          page: 0,
        });
        dispatch.nhomChiPhi.onSearch({
          page: 0,
          size,
        });
      },

      onSearch: ({ page = 0, ...payload }, state) => {
        let newState = { isLoading: true, page };
        dispatch.nhomChiPhi.updateData(newState);
        let size = payload.size || state.nhomChiPhi.size || 10;
        // let page = state.tuyChonGia.page || 0;
        const sort = combineSort(
          payload.dataSortColumn || state.nhomChiPhi.dataSortColumn || {}
        );
        const dataSearch =
          payload.dataSearch || state.nhomChiPhi.dataSearch || {};

        const dichVuId = payload.hasOwnProperty("dichVuId")
          ? payload.dichVuId
          : state.nhomChiPhi.dichVuId;

        dmDvNhomChiPhiProvider
          .search({
            page,
            size,
            sort,
            dichVuId,
            ...dataSearch,
          })
          .then((s) => {
            dispatch.nhomChiPhi.updateData({
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
            dispatch.nhomChiPhi.updateData({
              listData: [],
              isLoading: false,
            });
          });
      },

      onSearchTongHop: ({ ...payload }, state) => {
        fetchProvider
          .searchTongHop({
            ...payload,
          })
          .then((s) => {
            dispatch.nhomChiPhi.updateData({
              listDataTongHop: s?.data,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.nhomChiPhi.updateData({
              listDataTongHop: [],
              isLoading: false,
            });
          });
      },
      onSearchTongHopVatTuCon: ({ ...payload }, state) => {
        fetchProvider
          .searchTongHop({
            ...payload,
          })
          .then((s) => {
            dispatch.nhomChiPhi.updateData({
              listDataTongHopVatTuCon: s?.data,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.nhomChiPhi.updateData({
              listDataTongHopVatTuCon: [],
              isLoading: false,
            });
          });
      },

      onSortChange: ({ ...payload }, state) => {
        const dataSortColumn = {
          ...state.nhomChiPhi.dataSortColumn,
          ...payload,
        };
        dispatch.nhomChiPhi.updateData({
          page: 0,
          dataSortColumn,
        });
        dispatch.nhomChiPhi.onSearch({
          page: 0,
          dataSortColumn,
        });
      },

      onChangeInputSearch: ({ ...payload }, state) => {
        const dataSearch = {
          ...(state.nhomChiPhi.dataSearch || {}),
          ...payload,
        };
        dispatch.nhomChiPhi.updateData({
          page: 0,
          dataSearch,
        });
        dispatch.nhomChiPhi.onSearch({
          page: 0,
          dataSearch,
        });
      },

      createOrEdit: ({ ...payload }, state) => {
        return new Promise((resolve, reject) => {
          try {
            if (payload.id) {
              dmDvNhomChiPhiProvider
                .put(payload)
                .then((s) => {
                  if (s?.code === 0) {
                    message.success(
                      "Cập nhật thành công dữ liệu nhóm chi phí!"
                    );

                    let data = (state.nhomChiPhi.listData || []).map((item) => {
                      if (item.id == s.data?.id) {
                        s.data.index = item.index;
                        return s.data;
                      }
                      return item;
                    });
                    dispatch.nhomChiPhi.updateData({
                      currentItem: null,
                      listData: data.sort((a, b) => b.active - a.active),
                    });
                    resolve(s.data);
                  } else {
                    message.error(
                      s?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                    );
                    reject(s);
                  }
                })
                .catch((e) => {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
                  reject(e);
                });
            } else {
              dmDvNhomChiPhiProvider
                .post(payload)
                .then((s) => {
                  if (s?.code === 0) {
                    message.success(
                      "Thêm mới thành công dữ liệu nhóm chi phí!"
                    );
                    dispatch.nhomChiPhi.updateData({ currentItem: null });
                    dispatch.nhomChiPhi.onSearch({
                      page: 0,
                    });
                    resolve(s?.data);
                  } else {
                    message.error(
                      s?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                    );
                    reject(s);
                  }
                })
                .catch((e) => {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
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
  }),
};
