import { client, dataPath } from "client/request";
import { combineUrlParams } from "utils";
import {
  NB_CHI_SO_SONG,
  VITAL_SIGNS_CATEGORY,
  VITAL_SIGNS_SURGERY,
} from "client/api";
export default {
  updateChiSoSong: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_CHI_SO_SONG}/ngoai-tru`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  getChiSoSongByNb: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_CHI_SO_SONG}/ngoai-tru`, params))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getPatientVitalSigns: ({ nbDotDieuTriId }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_CHI_SO_SONG}`, {
            nbDotDieuTriId,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getDataVitalSigns: ({ nbDotDieuTriId }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_CHI_SO_SONG}`, {
            nbDotDieuTriId,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onCreate: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_CHI_SO_SONG}`, {
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onUpdate: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_CHI_SO_SONG}/${id}`, {
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onDelete(id) {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_CHI_SO_SONG}/${id}`)
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
  getCurrentTime: () => {
    return new Promise((resolve, reject) => {
      // client
      //   .get(`${dataPath}${CURRENT_TIME_CNS}`)
      //   .then((s) => {
      //     if (s?.data?.code == 0 && s?.data?.data) {
      //       resolve(s?.data);
      //     } else {
      //       reject(s?.data);
      //     }
      //   })
      //   .catch((e) => {
      //     reject(e);
      //   });
    });
  },
};
