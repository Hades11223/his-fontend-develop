import { NB_GIAY_NGHI_BAO_HIEM } from "client/api";
import apiBase from "./api-base";
import { client, dataPath } from "client/request";

export default {
  ...apiBase.init({ API: NB_GIAY_NGHI_BAO_HIEM }),

  dayGiayNghiBaoHiemHangLoat: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(
          `${dataPath}${NB_GIAY_NGHI_BAO_HIEM}/day-giay-nghi-bao-hiem`,
          payload
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  dayGiayNghiBaoHiem: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(
          `${dataPath}${NB_GIAY_NGHI_BAO_HIEM}/day-giay-nghi-bao-hiem/${id}`
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  huyGiayNghiBaoHiem: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(
          `${dataPath}${NB_GIAY_NGHI_BAO_HIEM}/huy-giay-nghi-bao-hiem/${id}`
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
