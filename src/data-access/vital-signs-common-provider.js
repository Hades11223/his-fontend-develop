import { combineUrlParams } from "utils";
import { client, formPath } from "client/request";
import { CHI_SO_SONG_CHUNG } from "client/api";
export default {
  delete({ id }) {
    return new Promise((resolve, reject) => {
      client
        .delete(`${formPath}${CHI_SO_SONG_CHUNG}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data?.data);
          }
          reject();
        })
        .catch((e) => {
          reject();
        });
    });
  },
  search: ({ page = 0, size = 10, maHoSo, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${formPath}${CHI_SO_SONG_CHUNG}`, {
            page: page,
            size: 10,
            maHoSo,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  update: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${formPath}${CHI_SO_SONG_CHUNG}/${id}`, {
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
