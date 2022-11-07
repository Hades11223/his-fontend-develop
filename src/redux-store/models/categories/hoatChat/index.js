import hoatChatProvider from "data-access/categories/dm-hoat-chat-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import apiBase from "data-access/api-base";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: hoatChatProvider,
    storeName: "hoatChat",
    title: "Hoạt chất",
    initState: {
      listHoatChat: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: hoatChatProvider.searchAll,
        KEY_CACHE: "DATA_HOAT_CHAT",
        model: "hoatChat",
        fieldName: "HoatChat",
      }),
      searchHoatChat: async (payload = {}, state) => {
        try {
          const response = await hoatChatProvider.search({
            sort: "active,desc&createdAt,desc&ma,asc",
            ...payload,
          });
          let {
            data: listHoatChat,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.hoatChat.searchHoatChat({
              ...payload,
              page: page - 1,
              size,
            });
          }

          dispatch.hoatChat.updateData({
            listHoatChat,
            totalElements,
            page,
            size,
          });
          return response;
        } catch (err) {
          message.error(err.message.toString());
          return err;
        }
      },
      searchHoatChatTongHop: async (payload = {}, state) => {
        try {
          const response = await hoatChatProvider.searchAll({
            sort: "active,desc&createdAt,desc&ma,asc",
            ...payload,
          });
          let {
            data: listHoatChat,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.hoatChat.searchHoatChatTongHop({
              ...payload,
              page: page - 1,
              size,
            });
          }

          dispatch.hoatChat.updateData({
            listHoatChat,
            totalElements,
            page,
            size,
          });
          return response;
        } catch (err) {
          message.error(err.message.toString());
          return err;
        }
      },
      createOrEdit: async (payload = {}, state) => {
        let response = {};
        try {
          if (payload.id) {
            response = await hoatChatProvider.put(payload);
            dispatch.hoatChat.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu hoạt chất!");
          } else {
            response = await hoatChatProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu hoạt chất!");
          }
          return response?.data;
        } catch (err) {
          if (payload.id) {
            message.success(
              err.message.toString() ||
                "Cập nhật không thành công dữ liệu hoạt chất!"
            );
          } else {
            message.success(
              err.message.toString() ||
                "Thêm mới không thành công dữ liệu hoạt chất!"
            );
          }
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          hoatChat: { page, size },
        } = state;
        const response = await hoatChatProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.hoatChat.searchHoatChat({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
