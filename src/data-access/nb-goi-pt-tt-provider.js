import { client, dataPath } from "client/request";
import { NB_GOI_PT_TT } from "client/api";
import { combineUrlParams } from "utils";

export default {
  postGoi: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_PT_TT}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  deleteGoi: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_GOI_PT_TT}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getTongHop: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_GOI_PT_TT}/tong-hop`, params))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getDichVu: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_GOI_PT_TT}/dich-vu`, params))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  updateGoiPtTt: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_GOI_PT_TT}/goi-pt-tt`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
