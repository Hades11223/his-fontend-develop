import danTocProvider from "data-access/categories/dm-dan-toc-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import apiBase from "../../../../data-access/api-base";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: danTocProvider,
    storeName: "danToc",
    title: "Dân tộc",
    initState: {
      listDanToc: [],
      listAllDanToc: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: danTocProvider.searchAll,
        KEY_CACHE: "DATA_ALL_DAN_TOC",
        model: "danToc",
        fieldName: "DanToc",
      }),
      getListDanToc: async (payload = {}, state) => {
        try {
          const response = await danTocProvider.search(payload);
          let {
            code,
            data: listDanToc,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.danToc.getListDanToc({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.danToc.updateData({
            listDanToc,
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
            response = await danTocProvider.put(payload);
            dispatch.danToc.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu dân tộc!");
          } else {
            response = await danTocProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu dân tộc!");
          }
          return response?.data;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          danToc: { page, size },
        } = state;
        const response = await danTocProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.danToc.getListDanToc({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
