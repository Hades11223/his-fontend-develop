import { DASHBOARD } from "client/api";
import { client, dataPath } from "client/request";
import { combineUrlParams } from "utils";

export default {
  getDataSoLieu: ({ the, params }) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${DASHBOARD}/${the}`, params))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
