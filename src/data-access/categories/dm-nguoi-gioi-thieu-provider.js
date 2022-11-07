import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_NGUOI_GIOI_THIEU } from "client/api";

export default {
  searchAll: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_NGUOI_GIOI_THIEU}/tong-hop`, {
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
  search: ({ page = 0, sort, size = 500, sameParamString, ...payload }) => {
    return new Promise((resolve, reject) => {
      let url = `${combineUrlParams(`${dataPath}${DM_NGUOI_GIOI_THIEU}`, {
        page: page + "",
        sort,
        size,
        ...payload,
      })}`;
      if (sameParamString) {
        url = `${url}&${sameParamString}`;
      }
      client
        .get(encodeURI(url))
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
        .post(`${dataPath}${DM_NGUOI_GIOI_THIEU}`, params)
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
        .put(`${dataPath}${DM_NGUOI_GIOI_THIEU}/${id}`, rest)
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
        .delete(`${dataPath}${DM_NGUOI_GIOI_THIEU}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
