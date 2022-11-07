import { NB_MUON_NB } from "client/api";
import { client, dataPath } from "client/request";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NB_MUON_NB }),
  duyetYeuCauMuonNb: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_MUON_NB}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
