import baseReduxStore from "../baseReduxStore";
import chiPhiHapSayProvider from "data-access/categories/dm-chi-phi-hap-say-vtyt-provider";

export default {
  ...baseReduxStore({
    fetchProvider: chiPhiHapSayProvider.initVTYT,
    storeName: "chiPhiHapSayVTYT",
    title: "chi phí hấp sấy VTYT",

    initState: {
      totalElements: null,
    },

    customEffect: ({ dispatch }) => ({
      // onSearchDmChiPhiHapSayVTYT: (payload, state) => {
      //   chiPhiHapSayProvider
      //     .getDmChiPhiHapSayVTYT(payload)
      //     .then((response) => {
      //       const { page, state, listData, totalElements } = response;
      //       dispatch.chiPhiHapSay.updateData({
      //         page,
      //         state,
      //         listData,
      //         totalElements,
      //       });
      //     })
      //     .catch((e) => message.error(e.message));
      // },
    }),
  }),
};
