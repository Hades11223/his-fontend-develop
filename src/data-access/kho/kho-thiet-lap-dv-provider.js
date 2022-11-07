import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { KHO_THIET_LAP_DV } from "client/api";

export default {
  put: (params) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${KHO_THIET_LAP_DV}/khoa-dv`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
