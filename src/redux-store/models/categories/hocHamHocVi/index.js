import hocHamHocViProvider from "data-access/categories/dm-hoc-ham-hoc-vi-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import apiBase from "../../../../data-access/api-base";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: hocHamHocViProvider,
    storeName: "hocHamHocVi",
    title: "Học hàm học vị",
    initState: {
      listHocHamHocVi: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: hocHamHocViProvider.searchAll,
        KEY_CACHE: "DATA_ALL_HOC_HAM_HOC_VI",
        model: "hocHamHocVi",
        fieldName: "HocHamHocVi",
      }),
      getListHocHamHocVi: async (payload = {}, state) => {
        try {
          const response = await hocHamHocViProvider.search(payload);
          let {
            data: listHocHamHocVi,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.hocHamHocVi.getListHocHamHocVi({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.hocHamHocVi.updateData({
            listHocHamHocVi,
            totalElements,
            page,
            size,
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      createOrEdit: async (payload = {}, state) => {
        try {
          let response = {};
          if (payload.id) {
            response = await hocHamHocViProvider.put(payload);
            if (response.code === 0) {
              dispatch.hocHamHocVi.updateData({
                dataEditDefault: response.data,
              });
              message.success("Cập nhật thành công dữ liệu học hàm học vị!");
            }
          } else {
            response = await hocHamHocViProvider.post(payload);
            if (response.code === 0) {
              message.success("Thêm mới thành công dữ liệu học hàm học vị!");
            }
          }
        } catch (err) {
          return Promise.reject(err);
          message.error(err.message.toString());
        }
      },
      onDelete: async (payload, state) => {
        const {
          hocHamHocVi: { page, size },
        } = state;
        const response = await hocHamHocViProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.hocHamHocVi.getListHocHamHocVi({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
