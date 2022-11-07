import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import {
  NB_CHI_SO_SONG,
  PATIENT_LIST,
  VITAL_SIGNS,
  VITAL_SIGNS_CATEGORY,
  VITAL_SIGNS_SURGERY,
} from "client/api";
export default {
  getPatientVitalSigns: ({ nbDotDieuTriId }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${PATIENT_LIST}`, {
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
        .post(`${dataPath}${VITAL_SIGNS}`, {
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
  onUpdate: ({
    id,
    temperature,
    pulse,
    weight,
    huyetApTamTruong,
    huyetApTamThu,
    respiratory,
    resuscitationMask,
    nursing,
    actDate,
    patientDocument,
    medicalRecordNo,
    patientName,
    birthday,
    bed,
    room,
    gender,
    diagnostic,
    dsChiSoSongKhac,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${VITAL_SIGNS}/${id}`, {
          temperature,
          pulse,
          weight,
          huyetApTamTruong,
          huyetApTamThu,
          respiratory,
          resuscitationMask,
          nursing,
          actDate,
          patientDocument,
          medicalRecordNo,
          patientName,
          birthday,
          bed,
          room,
          gender,
          diagnostic,
          dsChiSoSongKhac,
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
        .delete(`${dataPath}${VITAL_SIGNS}/${id}`)
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
  onDeleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${VITAL_SIGNS_CATEGORY}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  searchCategory: ({
    page = 0,
    size = 10,
    sort = "ten",
    active,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${VITAL_SIGNS_CATEGORY}`, {
            page: page === 0 ? "0" : page,
            size,
            active,
            sort,
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
  updateCategory: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${VITAL_SIGNS_CATEGORY}/${id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  createCategory: ({ ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${VITAL_SIGNS_CATEGORY}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  updateSurgery: ({ id, bacSy, phuongPhapPhauThuat }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${VITAL_SIGNS_SURGERY}/${id}`, {
          bacSy,
          phuongPhapPhauThuat,
        })
        .then((s) => {
          if (s?.data?.code === 0) {
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
  deleteSurgery: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${VITAL_SIGNS_SURGERY}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) {
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
  createSurgery: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${VITAL_SIGNS_SURGERY}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) {
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
};
