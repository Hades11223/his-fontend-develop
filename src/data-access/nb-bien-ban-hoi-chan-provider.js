import { NB_BIEN_BAN_HOI_CHAN } from "client/api";
import { client, dataPath } from "client/request";
import { combineUrlParams } from "utils";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NB_BIEN_BAN_HOI_CHAN }),
  macDinh: ({ payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_BIEN_BAN_HOI_CHAN}/mac-dinh`, {
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
  getPhieu: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_BIEN_BAN_HOI_CHAN}${payload.path}/${payload.id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
