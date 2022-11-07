import dmHangTheProvider from "data-access/categories/dm-loai-hang-the-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import cacheUtils from "utils/cache-utils";
import orderBy from "lodash/orderBy";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: dmHangTheProvider,
    storeName: "hangThe",
    title: "Hạng thẻ",
    initState: {
      listHangThe: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListAllHangThe: (payload, state) => {
        return new Promise(async (resolve, reject) => {
          try {
            let listAllHangThe = await cacheUtils.read(
              "",
              "DATA_ALL_HANG_THE",
              [],
              false
            );
            dispatch.hangThe.updateData({ listAllHangThe });
            dmHangTheProvider.searchAll().then((s) => {
              let { data } = s;
              data = orderBy(data, "ten", "asc");
              if (JSON.stringify(data) !== JSON.stringify(listAllHangThe)) {
                cacheUtils.save("", "DATA_ALL_HANG_THE", data, false);
                dispatch.hangThe.updateData({
                  listAllHangThe: data,
                });
              }
            });
          } catch (err) {
            message.error(err.message.toString());
            return Promise.reject(err);
          }
        });
      },
      getListHangThe: async (payload = {}, state) => {
        try {
          const response = await dmHangTheProvider.search(payload);
          let {
            code,
            data: listHangThe,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (code !== 0) throw new Error(messageInfo);

          if (page > 0 && numberOfElements === 0) {
            return dispatch.hangThe.getListHangThe({
              page: page - 1,
              size,
            });
          }

          return dispatch.hangThe.updateData({
            listHangThe,
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
            response = await dmHangTheProvider.put(payload);
            dispatch.hangThe.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu hạng thẻ");
          } else {
            response = await dmHangTheProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu hạng thẻ");
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          hangThe: { page, size },
        } = state;
        const response = await dmHangTheProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.hangThe.getListHangThe({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
