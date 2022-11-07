import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import {
  BAO_CAO_DA_IN,
  BC_PK,
  BAO_CAO_KHO,
  BAO_CAO_NHA_THUOC,
} from "client/api";
import currentProvider from "data-access/bao-cao-da-in-provider.js";

export default {
  searchAll: () => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${BAO_CAO_DA_IN}/tong-hop`, {
            active: true,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  search: ({ page = 0, active, sort, size = 2000, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${BAO_CAO_DA_IN}`, {
            page: page + "",
            active,
            sort,
            size,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  post: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${BAO_CAO_DA_IN}`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  put: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${BAO_CAO_DA_IN}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${BAO_CAO_DA_IN}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getBcDsNbKhamChiTiet: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${BC_PK}/pk-01`, {
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getBaoCao: (payload, path) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(path, {
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getBc01: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${BC_PK}/dv-01`, {
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getBc02: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${BC_PK}/bc-02`, {
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getBc03: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/bc-03`),
  getBc04: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/bc-04`),
  getBc05: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/bc-05`),
  getBc06: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/bc-06`),
  getBc07: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/bc-07`),
  getBc08: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/bc-08`),
  getBc09: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/bc-09`),
  getBc10: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/bc-10`),
  getBc11: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/bc-11`),
  getTc01: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${BC_PK}/tc-01`, {
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getTc02: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-02`),
  getTc03: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${BC_PK}/tc-03`, {
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getTc04: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-04`),
  getTc05: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-05`),
  getTc06: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-06`),
  getTc08: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-08`),
  getTc07: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-07`),
  getTc09: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-09`),
  getTc10: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-10`),
  getTc11: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-11`),
  getTc12: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-12`),
  getTc13: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-13`),
  getTc14: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-14`),
  getTc15: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-15`),
  getTc16: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-16`),
  getTc17: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-17`),
  getTc17_1: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-17.1`),
  getTc18: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-18`),
  getTc20: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-20`),
  getTc20_1: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-20.1`),
  getTc21: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-21`),
  getTc22: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-22`),
  getTc23: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-23`),
  getTc24: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/tc-24`),

  getPk02: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/pk-02`),
  getPk03: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/pk-03`),
  getK01: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${BAO_CAO_KHO}/k01`, {
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getK01_1: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${BAO_CAO_KHO}/k01.1`, {
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getK01_2: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k01.2`),
  getK02: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k02`),
  getK02_1: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k02.1`),
  getK03: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k03`),
  getK04: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k04`),
  getK05: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k05`),
  getK07: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k07`),
  getK08: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k08`),
  getK10: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k10`),
  getK11: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k11`),
  getK12: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k12`),
  getK13: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k13`),
  getK14: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/k14`),

  getKnt01: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/nt01`),
  getKnt02: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/nt02`),
  getKnt03: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/nt03`),
  getKnt04: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/nt04`),
  getKnt05: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/nt05`),
  getKnt06: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/nt06`),
  getKnt07: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/nt07`),

  getKvt02: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/kvt02`),
  getKvt03: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BAO_CAO_KHO}/kvt03`),

  getKsk01: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/ksk-01`),
  getKsk02: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/ksk-02`),
  getKsk04: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/ksk-04`),
  getKsk05: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/ksk-05`),
  getKsk12: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/ksk-12`),

  getG01: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/g01`),
  getG02: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/g02`),
  getG03: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/g03`),
  getG04: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/g04`),
  getKhth01: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/khth-01`),
  getKhth02: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/khth-02`),
  getKhth03: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/khth-03`),
  getKhth04: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/khth-04`),
  getKhth05: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/khth-05`),
  getKhth06: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/khth-06`),
  getKhth07: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/khth-07`),
  getPttt01: (payload) =>
    currentProvider.getBaoCao(payload, `${dataPath}${BC_PK}/pttt-01`),  
};
