import { DM_DOI_TAC } from "client/api";
import apiBase from "../api-base";
import { client, dataPath } from "client/request";
import { combineUrlParams } from "utils";

export default {
  ...apiBase.init({ API: DM_DOI_TAC }),

  getListLichSuTongHop: ({
    page = 0,
    active,
    sort,
    size = 500,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DOI_TAC}/lich-su/tong-hop`, {
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
