import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_NOI_LAY_BENH_PHAM } from "client/api";
import apiBase from "../api-base";

export default {
  ...apiBase.init({ API: DM_NOI_LAY_BENH_PHAM }),
  getPhongLayMau: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${DM_NOI_LAY_BENH_PHAM}/theo-tai-khoan`,
            {
              ...payload,
            }
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
