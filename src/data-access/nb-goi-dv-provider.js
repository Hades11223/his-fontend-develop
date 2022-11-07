import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_GOI_DICH_VU } from "client/api";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NB_GOI_DICH_VU }),
  themNguoiBenh: ({ nbDotDieuTriId, goiDvId }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_DICH_VU}`, {
          nbDotDieuTriId,
          goiDvId,
        })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getTongHopId: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_GOI_DICH_VU}/tong-hop/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  huySuDung: ({ nbGoiDvId, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_DICH_VU}/huy-su-dung/${nbGoiDvId}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  dungSuDung: ({ nbGoiDvId, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_DICH_VU}/dung-su-dung/${nbGoiDvId}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  ketThucGoi: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_DICH_VU}/ket-thuc/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  mienGiam: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_DICH_VU}/mien-giam/${id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getPhieuTongHop: ({ nbGoiDvId, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_GOI_DICH_VU}/phieu-tong-hop/${nbGoiDvId}`,
            {
              ...payload,
            }
          )
        )
        .then((s) => {
          if (s?.data?.code == 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  themDvVaoGoi: ({ nbGoiDvId, dsDv = [] }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_DICH_VU}/them-dich-vu/${nbGoiDvId}`, dsDv)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  chotPhiPhi: ({ nbGoiDvId, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_DICH_VU}/chot-chi-phi/${nbGoiDvId}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getPhieuHoan: ({ nbGoiDvId, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_GOI_DICH_VU}/phieu-hoan/${nbGoiDvId}`,
            {
              ...payload,
            }
          )
        )
        .then((s) => {
          if (s?.data?.code == 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
