import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_DV_GIUONG } from "client/api";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NB_DV_GIUONG }),

  getChiTietDVGiuong: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DV_GIUONG}/tong-hop`, payload))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  chinhSuaChiTietDVGiuong: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DV_GIUONG}/them-thong-tin`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  tinhTienDVGiuong: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_GIUONG}/tinh-tien`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
