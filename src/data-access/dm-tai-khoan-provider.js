import { client, dataPath } from "client/request";
import { DM_TAI_KHOAN, RESET_MAT_KHAU } from "client/api";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: DM_TAI_KHOAN }),
  resetMatKhau: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${DM_TAI_KHOAN}${RESET_MAT_KHAU}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
