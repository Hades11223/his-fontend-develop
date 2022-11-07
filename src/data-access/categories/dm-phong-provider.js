import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_PHONG } from "client/api";
import apiBase from "../api-base";
export default {
  ...apiBase.init({ API: DM_PHONG }),
  getPhongTheoTaiKhoan: ({
    page = 0,
    active,
    sort,
    size = 500,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_PHONG}/theo-tai-khoan`, {
            page: page + "",
            active,
            sort,
            size,
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
