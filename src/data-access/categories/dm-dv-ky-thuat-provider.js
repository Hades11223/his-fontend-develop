import { DM_DV_KY_THUAT } from "client/api";
import { client, dataPath } from "client/request";
import { combineUrlParams } from "utils";
import apiBase from "../api-base";

export default {
  ...apiBase.init({ API: DM_DV_KY_THUAT }),
  searchDMDichVuTachPhong: ({ dsDoiTuongSuDung = 10, ...payload } = {}) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DV_KY_THUAT}/tach-phong`, {
            dsDoiTuongSuDung,
            ...payload,
          })
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  postImport: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_DV_KY_THUAT}/import`, payload, {
          responseType: "arraybuffer",
        })
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  getDichVuKSK: ({ hopDongKskId, ...rest } = {}) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DV_KY_THUAT}`, {
            hopDongKskId,
            ...rest,
          })
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
