import { client, dataPath } from "client/request";
import { NGOAI_VIEN } from "client/api";
import { combineUrlParams } from "utils";

export default {
  get: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NGOAI_VIEN}/nv-nb-dot-dieu-tri`, payload))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
