import { client, dataPath } from "client/request";
import { PHIEU_NB_PHIEU_DOI_TRA } from "client/api";
import { combineUrlParams } from "utils";

export default {
  get: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${PHIEU_NB_PHIEU_DOI_TRA}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  traDichVu: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${PHIEU_NB_PHIEU_DOI_TRA}/tra-dich-vu`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  doiDichVu: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${PHIEU_NB_PHIEU_DOI_TRA}/doi-dich-vu`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  huyYeuCau: (id, payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${PHIEU_NB_PHIEU_DOI_TRA}/huy-yeu-cau/${id}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  inPhieuHoanDoiTra: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${PHIEU_NB_PHIEU_DOI_TRA}/giay-de-nghi-doi-tra-dv`,
            payload
          )
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  traNhaThuoc: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${PHIEU_NB_PHIEU_DOI_TRA}/tra-nha-thuoc`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
