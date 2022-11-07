import baoCaoDaInProvider from "data-access/bao-cao-da-in-provider";
import cacheUtils from "utils/cache-utils";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listAllData: [],
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getBcDsNbKhamChiTiet: (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoDaInProvider
          .getBcDsNbKhamChiTiet(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getBaoCao: ({ payload, callApi }, state) => {
      return new Promise((resolve, reject) => {
        callApi(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getBc01: (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoDaInProvider
          .getBc01(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getBc02: (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoDaInProvider
          .getBc02(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getBc03: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getBc03,
        payload,
      }),
    getBc04: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getBc04,
        payload,
      }),
    getBc05: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getBc05,
        payload,
      }),
    getBc06: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getBc06,
        payload,
      }),
    getBc07: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getBc07,
        payload,
      }),
    getBc08: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getBc08,
        payload,
      }),
    getBc09: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getBc09,
        payload,
      }),
    getBc10: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getBc10,
        payload,
      }),
    getBc11: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getBc11,
        payload,
      }),
    getTc01: (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoDaInProvider
          .getTc01(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getTc02: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc02,
        payload,
      }),
    getTc03: (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoDaInProvider
          .getTc03(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getTc04: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc04,
        payload,
      }),
    getTc05: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc05,
        payload,
      }),
    getTc06: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc06,
        payload,
      }),
    getTc08: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc08,
        payload,
      }),
    getTc07: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc07,
        payload,
      }),
    getTc09: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc09,
        payload,
      }),
    getTc10: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc10,
        payload,
      }),
    getTc11: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc11,
        payload,
      }),
    getTc12: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc12,
        payload,
      }),
    getTc13: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc13,
        payload,
      }),
    getTc14: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc14,
        payload,
      }),
    getTc15: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc15,
        payload,
      }),
    getTc16: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc16,
        payload,
      }),
    getTc17: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc17,
        payload,
      }),
    getTc17_1: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc17_1,
        payload,
      }),
    getTc18: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc18,
        payload,
      }),
    getTc20: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc20,
        payload,
      }),
    getTc20_1: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc20_1,
        payload,
      }),
    getTc21: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc21,
        payload,
      }),
    getTc22: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc22,
        payload,
      }),
    getTc23: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc23,
        payload,
      }),
    getTc24: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getTc24,
        payload,
      }),

    getPk02: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getPk02,
        payload,
      }),
    getPk03: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getPk03,
        payload,
      }),
    getk01: (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoDaInProvider
          .getK01(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getk01_1: (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoDaInProvider
          .getK01_1(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getk01_2: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getK01_2,
        payload,
      }),
    getK02: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getK02,
        payload,
      }),
    getK02_1: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getK02_1,
        payload,
      }),
    getK03: (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoDaInProvider
          .getK03(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getK04: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getK04,
        payload,
      }),
    getK05: (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoDaInProvider
          .getK05(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getK07: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getK07,
        payload,
      }),

    getK08: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getK08,
        payload,
      }),
    getK10: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getK10,
        payload,
      }),
    getK11: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getK11,
        payload,
      }),
    getK12: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getK12,
        payload,
      }),
    getK13: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getK13,
        payload,
      }),
    getK14: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getK14,
        payload,
      }),

    getKnt01: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKnt01,
        payload,
      }),
    getKnt02: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKnt02,
        payload,
      }),
    getKnt03: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKnt03,
        payload,
      }),
    getKnt04: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKnt04,
        payload,
      }),
    getKnt05: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKnt05,
        payload,
      }),
    getKnt06: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKnt06,
        payload,
      }),
    getKnt07: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKnt07,
        payload,
      }),
    getKvt02: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKvt02,
        payload,
      }),
    getKvt03: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKvt03,
        payload,
      }),

    getKsk01: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKsk01,
        payload,
      }),
    getKsk02: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKsk02,
        payload,
      }),
    getKsk04: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKsk04,
        payload,
      }),
    getKsk05: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKsk05,
        payload,
      }),
    getKsk12: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKsk12,
        payload,
      }),
    getG01: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getG01,
        payload,
      }),
    getG02: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getG02,
        payload,
      }),
    getG03: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getG03,
        payload,
      }),
    getG04: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getG04,
        payload,
      }),
    getKhth01: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKhth01,
        payload,
      }),
    getKhth02: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKhth02,
        payload,
      }),
    getKhth03: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKhth03,
        payload,
      }),
    getKhth04: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKhth04,
        payload,
      }),
    getKhth05: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKhth05,
        payload,
      }),
    getKhth06: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKhth06,
        payload,
      }),
    getKhth07: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getKhth07,
        payload,
      }),
    getPttt01: (payload, state) =>
      dispatch.baoCaoDaIn.getBaoCao({
        callApi: baoCaoDaInProvider.getPttt01,
        payload,
      }),  
  }),
};
