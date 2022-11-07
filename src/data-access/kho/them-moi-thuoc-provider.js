import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { KHO_PHIEU_NHAP_XUAT } from "client/api";

export default {
  post: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/don-thuoc-ngoai-vien`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
