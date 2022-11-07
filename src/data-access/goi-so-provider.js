import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_LAY_SO, IVISITOR_QRCODE } from "client/api";

export default {
  laySo: (data) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_LAY_SO}`, data)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  search: ({ page = 0, active = "true", size = 1, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_LAY_SO}`, {
            page,
            active,
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
  dongQuay: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_LAY_SO}/dong-quay/${id}`, {})
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_LAY_SO}/${id}`, {})
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getListGoiNho: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_LAY_SO}/nb-goi-nho`, payload))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getListDaTiepDon: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_LAY_SO}/nb-da-tiep-don`, payload)
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getListSlTheoPhong: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_LAY_SO}/nb-sl-theo-phong`, payload)
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getNbTiepTheo: ({ isGet, id, ...payload }) => {
    return new Promise((resolve, reject) => {
      (isGet
        ? client.get(`${dataPath}${NB_LAY_SO}/nb-tiep-theo/${id}`)
        : client.post(
          `${dataPath}${NB_LAY_SO}/nb-tiep-theo/${id}`,
          payload?.data
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
  huyTiepDon: (quayTiepDonId) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_LAY_SO}/nb-goi-nho/${quayTiepDonId}`, {})
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getStt: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_LAY_SO}/phieu-stt/${payload?.id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getInfoFromQr: ({ qrText, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${IVISITOR_QRCODE}`, {
          qr: qrText,
        })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getDsNguoiBenhQms: (quayTiepDonId) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_LAY_SO}/qms/${quayTiepDonId}`))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
