import { NB_PHIEU_THU_KSK } from "client/api";
import { client, dataPath } from "client/request";

export default {
  get: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_PHIEU_THU_KSK}?hopDongKskId=${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
