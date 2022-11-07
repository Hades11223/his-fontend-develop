import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_TO_DIEU_TRI } from "client/api";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NB_TO_DIEU_TRI }),
  postNbToDieuTri: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_TO_DIEU_TRI}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getNbToDieuTri: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_TO_DIEU_TRI}/tong-hop`, payload))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getNbToDieuTriById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_TO_DIEU_TRI}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
