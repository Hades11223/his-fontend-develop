import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { KY_SO_THIET_LAP_QUYEN_KY } from "client/api";

export default {
  get: () => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${KY_SO_THIET_LAP_QUYEN_KY}`)
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  searchBaoCao: ({ page = 0, sort, size = 500, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${KY_SO_THIET_LAP_QUYEN_KY}/tong-hop`, {
            page: page + "",
            sort,
            // size,
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




  search: ({ page = 0, active, sort, size = 1000, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${KY_SO_THIET_LAP_QUYEN_KY}`, {
            page: page + "",
            active,
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
  create: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KY_SO_THIET_LAP_QUYEN_KY}`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  update: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${KY_SO_THIET_LAP_QUYEN_KY}/${id}`, rest)
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
        .delete(`${dataPath}${KY_SO_THIET_LAP_QUYEN_KY}/${id}`)
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
        .post(`${dataPath}${KY_SO_THIET_LAP_QUYEN_KY}/tai-len/mau-bao-cao`, formData)
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
