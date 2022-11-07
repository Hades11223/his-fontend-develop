import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_GOI_DICH_VU_CHI_TIET } from "client/api";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NB_GOI_DICH_VU_CHI_TIET }),
  traDichVu: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_DICH_VU_CHI_TIET}/tra-dich-vu/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  traNhieuDichVu: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_DICH_VU_CHI_TIET}/tra-dich-vu`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
