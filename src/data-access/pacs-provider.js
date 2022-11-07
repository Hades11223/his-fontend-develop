import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { PACS } from "client/api";

export default {
  search: (payload) => {
    const { id = "", ...rest } = payload;

    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${PACS}/anh-ket-qua/${id}`, rest))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
