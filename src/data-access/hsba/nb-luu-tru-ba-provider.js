import { NB_LUU_TRU_BA } from "client/api";
import apiBase from "data-access/api-base";
import { client, dataPath } from "client/request";

export default {
  doiTrangThai: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_LUU_TRU_BA}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  ...apiBase.init({ API: NB_LUU_TRU_BA }),
};
