import { client, dataPath } from "client/request";
import { combineUrlParams } from "utils";
import { DM_BAO_CAO, DM_BAO_CAO_LICH_SU } from "client/api";
import apiBase from "../api-base";

export default {
  ...apiBase.init({ API: DM_BAO_CAO }),
  getMauBaoCao: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${DM_BAO_CAO}/mau-bao-cao`, payload))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getMauBaoCaoById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${DM_BAO_CAO}/${id}`))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  upload: (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_BAO_CAO}/tai-len/mau-bao-cao`, formData)
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getLichSuBaoCao: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_BAO_CAO_LICH_SU}`, { ...payload })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  deleteLichSuBaoCao: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(combineUrlParams(`${dataPath}${DM_BAO_CAO_LICH_SU}/${id}`))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  createLichSuBaoCao: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_BAO_CAO_LICH_SU}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
