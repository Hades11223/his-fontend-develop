import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_MAU_DU_LIEU } from "client/api";

export default {
  get: ({ dsBang } = {}) => {
    return new Promise((resolve, reject) => {
      if (!dsBang) {
        reject(false);
        return;
      }
      client
        .get(
          combineUrlParams(`${dataPath}${DM_MAU_DU_LIEU}`, {
            dsBang,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  // post: (params) => {
  //   return new Promise((resolve, reject) => {
  //     client
  //       .post(`${dataPath}${DM_MAU_DU_LIEU}`, params)
  //       .then((s) => {
  //         if (s?.data?.code === 0) resolve(s?.data);
  //         else reject(s?.data);
  //       })
  //       .catch((e) => reject(e));
  //   });
  // },
};
