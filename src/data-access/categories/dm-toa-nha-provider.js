import { DM_TOA_NHA } from "client/api";
import { client, dataPath } from "client/request";
import { combineUrlParams } from "utils";
import apiBase from "../api-base";

export default {
  ...apiBase.init({ API: DM_TOA_NHA }),
  getTheoTaiKhoan: ({ active, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_TOA_NHA}/theo-tai-khoan`, {
            active,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
