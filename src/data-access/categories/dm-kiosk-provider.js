import { client, dataPath } from "client/request";
import { DM_KIOSK } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_KIOSK }),    
  postVideo: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_KIOSK}/tai-len/video`, formData)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
