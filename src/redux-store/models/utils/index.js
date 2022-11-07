import cacheUtils from "utils/cache-utils";
import utilsProvider from "data-access/utils-provider";

export default {
  state: {
    listLog: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getUtils: async (payload = {}, state) => {
      const { name = "", reload, ...rest } = payload;
      let userId = state.auth.auth?.id;
      let dataCache = await cacheUtils.read(
        userId,
        `DATA_UTILS_${name}`,
        {},
        false
      );
      if (
        //Nếu dữ liệu hiện tại khác dữ liệu trong redux
        JSON.stringify(dataCache?.data || []) !==
        JSON.stringify(state.utils[`list${name}`])
      ) {
        console.log("cache utils", `list${name}`);
        dispatch.utils.updateData({
          [`list${name}`]: dataCache?.data || [],
        });
      }
      const syncTime = localStorage.getItem("TIME_RELOAD");
      if (
        reload ||
        !dataCache?.date ||
        !dataCache?.data ||
        new Date().getTime() - dataCache.date > 600000 ||
        syncTime - dataCache.date > 0
      ) {
        utilsProvider.search({ name, ...rest }).then((s) => {
          let data = (s?.data || []).map((item) => ({
            id: item.value,
            ten: item.name,
          }));
          cacheUtils.save(
            userId,
            `DATA_UTILS_${name}`,
            { data: data, date: new Date().getTime() },
            false
          );
          if (JSON.stringify(data) !== JSON.stringify(dataCache.data)) {
            dispatch.utils.updateData({ [`list${name}`]: data });
          }
        });
      }
    },
    getBranch: () => {
      utilsProvider.getBranhCode().then((s) => {
        dispatch.utils.updateData({ branchCode: s?.data });
      });
    },
    getDb: () => {
      utilsProvider.getDb().then((s) => {
        dispatch.utils.updateData({ db: s?.data });
      });
    },
    getLog: () => {
      utilsProvider.getLog().then((s) => {
        dispatch.utils.updateData({ listLog: s?.data });
      });
    },
  }),
};
