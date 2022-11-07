import { client, dataPath } from "client/request";
import { NB_DV_SUAT_AN } from "client/api";
import { combineUrlParams } from "utils";

export default {
  chiDinhDichVu: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_SUAT_AN}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  tamTinhTienDVSuatAn: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_SUAT_AN}/tinh-tien`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_SUAT_AN}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onDeleteDichVu: ({ id, listDeletingId }) => {
    if (id)
      return new Promise((resolve, reject) => {
        client
          .delete(`${dataPath}${NB_DV_SUAT_AN}/${id}`)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_SUAT_AN}`, {
          data: listDeletingId,
        })
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  searchTongHop: ({ nbDotDieuTriId, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_SUAT_AN}/tong-hop`, {
            nbDotDieuTriId,
            ...payload,
          })
        )
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  themThongTin: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DV_SUAT_AN}/them-thong-tin`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  traSuatAn: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_SUAT_AN}/tra`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  huyTraSuatAn: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_SUAT_AN}/huy-tra`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
