import { client, dataPath } from "client/request";
import { DM_HOP_DONG_KSK_TRANG_THAI_TT } from "client/api";
import { combineUrlParams } from "utils";

export default {
  post: ({ ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK_TRANG_THAI_TT}`, rest)
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
        .patch(`${dataPath}${DM_HOP_DONG_KSK_TRANG_THAI_TT}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  get: ({ ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_HOP_DONG_KSK_TRANG_THAI_TT}`, {
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
};
