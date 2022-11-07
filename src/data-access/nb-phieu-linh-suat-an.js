import { NB_PHIEU_LINH_SUAT_AN } from "client/api";
import { client, dataPath } from "client/request";
import { combineUrlParams } from "utils";

export default {
  search: ({ page = 0, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_PHIEU_LINH_SUAT_AN}`, {
            ...payload,
            page,
            size,
          })
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch(reject);
    });
  },
  detail: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_PHIEU_LINH_SUAT_AN}/${id}`, {}))
        .then((s) => {
          resolve(s.data);
        })
        .catch(reject);
    });
  },
  post: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_LINH_SUAT_AN}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch(reject);
    });
  },
  chiTiet: ({ page = 0, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_PHIEU_LINH_SUAT_AN}/chi-tiet`, {
            ...payload,
            page,
            size,
          })
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch(reject);
    });
  },
  phat: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_LINH_SUAT_AN}/phat/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch(reject);
    });
  },
  huyPhat: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_LINH_SUAT_AN}/huy-phat/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch(reject);
    });
  },
  duyet: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_LINH_SUAT_AN}/duyet/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch(reject);
    });
  },
  huyDuyet: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_LINH_SUAT_AN}/huy-duyet/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch(reject);
    });
  },
  xoaPhieu: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_PHIEU_LINH_SUAT_AN}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch(reject);
    });
  },
  phieuLinhSuatAn: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_PHIEU_LINH_SUAT_AN}/phieu/${id}`,
            rest
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
