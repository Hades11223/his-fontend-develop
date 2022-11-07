import { NB_DICH_VU } from "client/api";
import apiBase from "./api-base";
import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";

export default {
  ...apiBase.init({ API: NB_DICH_VU }),

  searchTongHop: ({ page = 0, active, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DICH_VU}/tong-hop`, {
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
  tongTien: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DICH_VU}/tong-tien`, payload))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  saoChepThuocVT: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DICH_VU}/sao-chep`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  inPhieuCongKhai: ({ ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DICH_VU}/phieu-cong-khai`, rest))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
