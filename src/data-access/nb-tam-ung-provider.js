import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_TAM_UNG } from "client/api";

export default {
  search: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_TAM_UNG}`, {
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
  getById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_TAM_UNG}/nguoi-benh/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  post: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_TAM_UNG}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_TAM_UNG}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  postDeNghiTamUng: ({ ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_TAM_UNG}/de-nghi-tam-ung`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  searchNb: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_TAM_UNG}/nguoi-benh`, {
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
  huyTamUng: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_TAM_UNG}/huy-tam-ung/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  hoanUng: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_TAM_UNG}/hoan-ung/${payload.id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  duyetDeNghiTamUng: ({ ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_TAM_UNG}/duyet-de-nghi-tam-ung/${rest?.id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  suaDeNghiTamUng: ({ ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_TAM_UNG}/${rest?.id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },  
  inPhieuTamUng: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_TAM_UNG}/phieu-tam-ung/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
