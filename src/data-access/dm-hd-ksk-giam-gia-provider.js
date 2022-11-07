import { client, dataPath } from "client/request";
import { DM_HOP_DONG_KSK_GIAM_GIA } from "client/api";
import { combineUrlParams } from "utils";

export default {
  post: ({ ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK_GIAM_GIA}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  tongHop: ({ ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_HOP_DONG_KSK_GIAM_GIA}/tong-hop`, {
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

  patch: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${DM_HOP_DONG_KSK_GIAM_GIA}/${id}`, rest)
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
        .delete(
          combineUrlParams(`${dataPath}${DM_HOP_DONG_KSK_GIAM_GIA}/${id}`)
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  postBatch: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK_GIAM_GIA}/batch`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  postKetLuanKham: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK_GIAM_GIA}/ket-luan-kham`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
