import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_DV_THUOC_DIEU_TRI_COVID } from "client/api";

export default {
  search: ({ page = 0, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_THUOC_DIEU_TRI_COVID}`, {
            page,
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
  donThuocCovid: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DV_THUOC_DIEU_TRI_COVID}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
