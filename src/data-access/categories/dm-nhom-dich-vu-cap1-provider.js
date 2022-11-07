import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_NHOM_DICH_VU_CAP_1 } from "client/api";
import apiBase from "../api-base";

export default {
  ...apiBase.init({ API: DM_NHOM_DICH_VU_CAP_1 }),
  filter: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${DM_NHOM_DICH_VU_CAP_1}`, payload))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
