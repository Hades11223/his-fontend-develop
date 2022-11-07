import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { THEO_DOI_NGUOI_BENH_COVID, NB_COVID } from "client/api";

export default {
  search: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${THEO_DOI_NGUOI_BENH_COVID}`, {
            page: page + "",
            sort,
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
  post: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${THEO_DOI_NGUOI_BENH_COVID}`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  postKetThuc: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_COVID}/ket-thuc`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getNbCovid: ({ nbDotDieuTriId, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_COVID}/${nbDotDieuTriId}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  put: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${THEO_DOI_NGUOI_BENH_COVID}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
