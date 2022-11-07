import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_THONG_TIN } from "client/api";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NB_THONG_TIN }),
  searchTrungThongTin: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_THONG_TIN}/trung-thong-tin`,
            payload
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
