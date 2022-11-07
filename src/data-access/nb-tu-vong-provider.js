import { client, dataPath } from "client/request";
import { NB_TU_VONG } from "client/api";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NB_TU_VONG }),
  getById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_TU_VONG}/${id}`)
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
        .put(`${dataPath}${NB_TU_VONG}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
