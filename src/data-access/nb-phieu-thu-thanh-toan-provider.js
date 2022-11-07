import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_PHIEU_THU_TT } from "client/api";

export default {
  post: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_THU_TT}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
