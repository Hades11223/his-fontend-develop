import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_KHOA } from "client/api";
import apiBase from "data-access/api-base";

export default {
  getKhoaTheoTaiKhoan: ({
    page = 0,
    active,
    sort,
    size = 500,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_KHOA}/theo-tai-khoan`, {
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
  ...apiBase.init({ API: DM_KHOA }),
};
