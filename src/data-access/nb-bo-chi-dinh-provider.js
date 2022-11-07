import { NB_BO_CHI_DINH } from "client/api";
import { client, dataPath } from "client/request";
import { combineUrlParams } from "utils";

export default {
  getGoiDichVu: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_BO_CHI_DINH}`, params))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  chiDinhGoiDV: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_BO_CHI_DINH}`, payload)
        .then((s) => {
          if (s.data.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_BO_CHI_DINH}/${id}`)
        .then((s) => {
          if (s.data.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
