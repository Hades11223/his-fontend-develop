import { message } from "antd";
import { PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import xuatXuProvider from "data-access/categories/dm-xuat-xu-provider";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: xuatXuProvider,
    storeName: "xuatXu",
    title: "xuất xứ",
    initState: {
      listXuatXu: [],
      listAllXuatXu: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListXuatXu: async (payload = {}, state) => {
        try {
          const response = await xuatXuProvider.search(payload);
          let {
            data: listXuatXu,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.xuatXu.search({
              page: page - 1,
              size,
            });
          }

          return dispatch.xuatXu.updateData({
            listXuatXu,
            totalElements,
            page,
            size,
          });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      },
      createOrEdit: async (payload = {}, state) => {
        try {
          let response = {};
          if (payload.id) {
            response = await xuatXuProvider.put(payload);
            dispatch.xuatXu.updateData({ dataEditDefault: response.data });
            message.success("Cập nhật thành công dữ liệu xuất xứ!");
          } else {
            response = await xuatXuProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu xuất xứ!");
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          xuatXu: { page, size },
        } = state;
        const response = await xuatXuProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.xuatXu.search({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
      getDetail: async (id, state) => {
        return new Promise((resolve, reject) => {
          xuatXuProvider
            .getById(id)
            .then((s) => {
              if (s?.code == 0) {
                resolve(s?.data);
              } else reject(s);
            })
            .catch((e) => {
              console.log(e);
              reject(e);
            });
        });
      },
    }),
  }),
};
