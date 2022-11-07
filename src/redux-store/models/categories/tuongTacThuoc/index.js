import fetchProvider from "data-access/categories/dm-tuong-tac-thuoc-provider";
import baseStore from "../../base-store";
import hoatChatProvider from "data-access/categories/dm-hoat-chat-provider";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "tuongTacThuoc",
    title: "tương tác thuốc",
    initState: { listHoatChat1: [], listHoatChat2: [] },
    customEffect: ({ dispatch }) => ({
      searchHoatChatTongHop1: (payload = {}, state) => {
        hoatChatProvider
          .searchAll({
            ...payload,
          })
          .then((s) => {
            dispatch.tuongTacThuoc.updateData({
              listHoatChat1: s?.data || [],
            });
          });
      },
      searchHoatChatTongHop2: (payload = {}, state) => {
        hoatChatProvider
          .searchAll({
            ...payload,
          })
          .then((s) => {
            dispatch.tuongTacThuoc.updateData({
              listHoatChat2: s?.data || [],
            });
          });
      },
    }),
  }),
};
