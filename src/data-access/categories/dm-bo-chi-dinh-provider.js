import { DM_BO_CHI_DINH } from "client/api";
import apiBase from "../api-base";
import { client, dataPath } from "client/request";
import { combineUrlParams } from "utils";

export default {
  ...apiBase.init({ API: DM_BO_CHI_DINH }),

  createGoiDVKSK: (payload) => {
    return new Promise((resolve, reject) => {
      const obj = {
        ...payload,
        dsDoiTuongSuDung: [40],
        dsLoaiDichVu: [10, 20, 30, 40],
      };

      client
        .post(`${dataPath}${DM_BO_CHI_DINH}`, obj)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  getGoiDVKSK: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${DM_BO_CHI_DINH}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  patchGoiDVKSK: (id, payload) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${DM_BO_CHI_DINH}/${id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  deleteGoiDVKSK: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${DM_BO_CHI_DINH}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
