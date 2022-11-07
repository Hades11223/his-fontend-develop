import { client, dataPath } from "client/request";
import { KHO_QUYET_DINH_THAU } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: KHO_QUYET_DINH_THAU }),
  complete: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_QUYET_DINH_THAU}/hoan-thanh/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  undoComplete: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_QUYET_DINH_THAU}/huy-hoan-thanh/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  verify: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_QUYET_DINH_THAU}/duyet/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  undoVerify: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_QUYET_DINH_THAU}/huy-duyet/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
