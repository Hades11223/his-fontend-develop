import { client, dataPath } from "client/request";
import { DM_NHAN_VIEN } from "client/api";
import apiBase from "../api-base";

export default {
  ...apiBase.init({ API: DM_NHAN_VIEN }),
  searchId: (id) => {
    return new Promise((resolve, reject) => {
      client.get(`${dataPath}${DM_NHAN_VIEN}/${id}`).then((s) => {
        if (s?.data?.code === 0) resolve(s?.data);
        else reject(s?.data);
      });
    });
  },
};
