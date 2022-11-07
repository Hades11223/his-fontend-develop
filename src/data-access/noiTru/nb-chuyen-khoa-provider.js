import { NB_CHUYEN_KHOA } from "client/api";
import { client, dataPath } from "client/request";
import apiBase from "../api-base";
import { combineUrlParams } from "utils";

export default {
  ...apiBase.init({ API: NB_CHUYEN_KHOA }),

  chuyenKhoa: (payoad) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_CHUYEN_KHOA}/chuyen-khoa`, payoad)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  searchPhongGiuong: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_CHUYEN_KHOA}`, params))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  getNbSlTheoKhoa: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_CHUYEN_KHOA}/nb-sl-theo-khoa`,
            params
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  getNbSlTheoGiuong: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_CHUYEN_KHOA}/nb-sl-theo-giuong`,
            params
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  phanGiuong: (payoad) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_CHUYEN_KHOA}/phan-giuong`, payoad)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  getGiuongTheoNB: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_CHUYEN_KHOA}`, payload))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  }
};
