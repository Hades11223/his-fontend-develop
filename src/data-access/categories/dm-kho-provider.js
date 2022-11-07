import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_KHO } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_KHO }),
  searchTheoTaiKhoan: (payload = {}) => {
    return new Promise((resolve, reject) => {
      const { nhaThuoc, ...rest } = payload;
      client
        .get(
          combineUrlParams(`${dataPath}${DM_KHO}/theo-tai-khoan`, {
            nhaThuoc,
            ...rest,
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
