import { client, dataPath } from "client/request";
import { DM_QUAY_TIEP_DON } from "client/api";
import apiBase from "../api-base";

export default {
  ...apiBase.init({ API: DM_QUAY_TIEP_DON }),
  quayTheoTaiKhoan: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${DM_QUAY_TIEP_DON}/theo-tai-khoan`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
