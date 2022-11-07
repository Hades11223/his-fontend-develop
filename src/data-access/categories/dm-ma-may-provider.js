import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_MA_MAY } from "client/api";
import apiBase from "data-access/api-base";

export default {
  create: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_MA_MAY}`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  update: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${DM_MA_MAY}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  ...apiBase.init({ API: DM_MA_MAY }),
};
