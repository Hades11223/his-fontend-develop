import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_DON_VI_Y_TE } from "client/api";
export default {
  searchAll: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DON_VI_Y_TE}/tong-hop`, {
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
      let url = `${combineUrlParams(`${dataPath}${DM_DON_VI_Y_TE}`, {
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
        .post(`${dataPath}${DM_DON_VI_Y_TE}`, params)
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
        .put(`${dataPath}${DM_DON_VI_Y_TE}/${id}`, rest)
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
        .delete(`${dataPath}${DM_DON_VI_Y_TE}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
