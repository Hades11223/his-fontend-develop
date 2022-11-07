import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { UTILS } from "client/api";

export default {
  search: ({ name = "", ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${UTILS}/enums`, {
            name,
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
  getBranhCode: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${UTILS}/commitId`)
        .then((s) => {
          resolve(s);
        })
        .catch((e) => reject(e));
    });
  },
  getDb: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${UTILS}/db`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getLog: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${UTILS}/log`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  doawnloadLog: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${UTILS}/log/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
