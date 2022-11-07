import dmLoaiCapCuuProvider from "data-access/categories/dm-loai-cap-cuu-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: dmLoaiCapCuuProvider,
    storeName: "loaiCapCuu",
    title: "Loại cấp cứu",
    initState: {
      listLoaiCapCuu: [],
      listAllLoaiCapCuu: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListLoaiCapCuu: async (payload = {}, state) => {
        try {
          const response = await dmLoaiCapCuuProvider.search(payload);
          let {
            code,
            data: listLoaiCapCuu,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (code !== 0) throw new Error(messageInfo);

          if (page > 0 && numberOfElements === 0) {
            return dispatch.loaiCapCuu.getListLoaiCapCuu({
              page: page - 1,
              size,
            });
          }

          return dispatch.loaiCapCuu.updateData({
            listLoaiCapCuu,
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
        try {
          let response = {};
          if (payload.id) {
            response = await dmLoaiCapCuuProvider.put(payload);
            dispatch.loaiCapCuu.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu loại cấp cứu");
          } else {
            response = await dmLoaiCapCuuProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu loại cấp cứu");
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          loaiCapCuu: { page, size },
        } = state;
        const response = await dmLoaiCapCuuProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.loaiCapCuu.getListLoaiCapCuu({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
