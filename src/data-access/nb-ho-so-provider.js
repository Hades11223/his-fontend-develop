import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_HO_SO } from "client/api";

export default {
  search: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_HO_SO}`, payload))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
