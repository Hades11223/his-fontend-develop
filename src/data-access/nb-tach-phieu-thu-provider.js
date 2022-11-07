import { client, dataPath } from "client/request";
import { NB_TACH_PHIEU_THU } from "client/api";

export default {
  post: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_TACH_PHIEU_THU}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
