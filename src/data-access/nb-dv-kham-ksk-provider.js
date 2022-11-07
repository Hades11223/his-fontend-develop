import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_DV_KHAM_SUC_KHOE } from "client/api";

export default {
  getNbDvKhamKSK: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DV_KHAM_SUC_KHOE}/${id}`, {}))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  updateNbDvKhamKSK: ({ nbDotDieuTriId, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DV_KHAM_SUC_KHOE}/${nbDotDieuTriId}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
