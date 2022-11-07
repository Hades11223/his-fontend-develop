import { NB_PHIEU_SO_KET } from "client/api";
import { client, dataPath } from "client/request";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NB_PHIEU_SO_KET }),
  phieuSoKet: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_PHIEU_SO_KET}/phieu-so-ket/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
