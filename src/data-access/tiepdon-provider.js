import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_DOT_DIEU_TRI, NB_THE_BAO_HIEM } from "client/api";

export default {
  onSaveData: (payload) => {
    return new Promise((resolve, reject) => {
      if (payload?.id) {
        client
          .patch(`${dataPath}${NB_DOT_DIEU_TRI}/${payload?.id}`, payload?.data)
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => reject(e));
      } else {
        client
          .post(`${dataPath}${NB_DOT_DIEU_TRI}`, payload?.data)
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => reject(e));
      }
    });
  },
  searchSoThe: (soThe) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_THE_BAO_HIEM}?soThe=${soThe}`)
        .then((s) => {
          if (s.data.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  giamDinhThe: ({ hoTen = "", maThe = "", ngaySinh }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_THE_BAO_HIEM}/kiem-tra`, {
          hoTen,
          maThe,
          ngaySinh,
        })
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
