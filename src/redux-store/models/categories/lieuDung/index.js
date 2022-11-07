import lieuDungProvider from "data-access/categories/dm-lieu-dung-provider";
import { message } from "antd";
import orderBy from "lodash/orderBy";
import cacheUtils from "utils/cache-utils";
import { combineSort } from "utils";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider: lieuDungProvider,
    storeName: "lieuDung",
    title: "Liều dùng",
    initState: {
      listAllLieuDung: [],
      listLieuDung: [],
      totalElements: null,
      page: 0,
      size: 10,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      onSizeChange: ({ size }, state) => {
        dispatch.lieuDung.updateData({
          size,
          page: 0,
        });
        dispatch.lieuDung.onSearch({ page: 0, size });
      },
      onSearch: ({ page = 0, ...payload }, state) => {
        let newState = { isLoading: true, page };
        dispatch.lieuDung.updateData(newState);
        let size = payload.size || state.lieuDung.size || 10;
        // let page = state.lieuDung.page || 0;
        const sort = combineSort(
          payload.dataSortColumn || state.lieuDung.dataSortColumn || {}
        );
        const dataSearch =
          payload.dataSearch || state.lieuDung.dataSearch || {};

        lieuDungProvider
          .search({
            page,
            size,
            sort,
            ...dataSearch,
          })
          .then((s) => {
            dispatch.lieuDung.updateData({
              listLieuDung: (s?.data || []).map((item, index) => {
                item.index = page * size + index + 1;
                return item;
              }),
              isLoading: false,
              totalElements: s?.totalElements || 0,
              page,
              dataSearch,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
            dispatch.lieuDung.updateData({
              listLieuDung: [],
              isLoading: false,
            });
          });
      },

      onSortChange: ({ ...payload }, state) => {
        const dataSortColumn = {
          ...payload,
          ...state.lieuDung.dataSortColumn,
          ...payload,
        };
        dispatch.lieuDung.updateData({
          page: 0,
          dataSortColumn,
        });
        dispatch.lieuDung.onSearch({
          page: 0,
          dataSortColumn,
        });
      },

      onChangeInputSearch: ({ ...payload }, state) => {
        const dataSearch = {
          ...(state.lieuDung.dataSearch || {}),
          ...payload,
        };
        dispatch.lieuDung.updateData({
          page: 0,
          dataSearch,
        });
        dispatch.lieuDung.onSearch({
          page: 0,
          dataSearch,
        });
      },
      getListAllLieuDung: () => {
        return new Promise(async (resolve, reject) => {
          try {
            let listAllLieuDung = await cacheUtils.read(
              "",
              "DATA_ALL_LIEU_DUNG",
              [],
              false
            );
            dispatch.lieuDung.updateData({ listAllLieuDung });
            lieuDungProvider.searchAll({active: true, page: "", size: ""}).then((s) => {
              let { data } = s;
              data = orderBy(data, "ten", "asc");
              if (JSON.stringify(data) !== JSON.stringify(listAllLieuDung)) {
                cacheUtils.save("", "DATA_ALL_LIEU_DUNG", data, false);
                dispatch.lieuDung.updateData({
                  listAllLieuDung: data,
                });
              }
            });
          } catch (err) {
            message.error(err.message.toString());
            return Promise.reject(err);
          }
        });
      },
      getListLieuDung: async (payload = {}, state) => {
        try {
          const response = await lieuDungProvider.search(payload);
          let {
            code,
            data: listLieuDung,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.lieuDung.getListLieuDung({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.lieuDung.updateData({
            listLieuDung,
            totalElements,
            page,
            size,
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      createOrEdit: async (payload = {}, state) => {
        let response = {};
        try {
          if (payload.id) {
            response = await lieuDungProvider.put(payload);
            let data = (state.lieuDung.listLieuDung || []).map((item) => {
              if (item.id === response.data?.id) {
                response.data.index = item.index;
                return response.data;
              }
              return item;
            });
            dispatch.lieuDung.updateData({
              currentItem: null,
              listLieuDung: data,
              dataEditDefault: {
                ...state.lieuDung.dataEditDefault,
                ...payload,
              },
            });
            message.success("Cập nhật thành công dữ liệu liều dùng!");
          } else {
            response = await lieuDungProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu liều dùng!");
          }
          return response?.data;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          lieuDung: { page, size },
        } = state;
        const response = await lieuDungProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.lieuDung.getListChucVu({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
