import { combineUrlParams } from "utils";
import { client, dataPath, formPath } from "client/request";
import {
  DU_LIEU_MAU,
  FORM_SIGN_STATUS,
  NB_PHIEU_DANG_KY_KHAM,
} from "client/api";
export default {
  getTemplateAPI: ({ api }) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${api}`)
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  getFormDataEMR: ({ api, id, queries }) => {
    return new Promise((resolve, reject) => {
      // if (!nbHsBaId)
      //   resolve({
      //     data: {},
      //   });
      // else
      let url = api;
      if (id) url = url + "/" + id;

      client
        .get(combineUrlParams(`${url}`, queries))
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  onSaveForm: ({ file, data }) => {
    return new Promise((resolve, reject) => {
      const { id, ...payload } = data || {};
      let url = file.api;
      if (id) {
        url = url + "/" + id;
      }
      let request = id
        ? client.put(`${url}`, {
            ...payload,
          })
        : client.post(`${url}`, {
            ...payload,
          });

      request
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  searchFormDataEMR: ({ api, payload = {} }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${formPath}${api}`, {
            ...payload,
          })
        )
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getFormDataEMR: ({ api, id, queries }) => {
    return new Promise((resolve, reject) => {
      // if (!nbHsBaId)
      //   resolve({
      //     data: {},
      //   });
      // else
      let url = api;
      if (id) url = url + "/" + id;

      client
        .get(combineUrlParams(`${url}`, queries))
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  // getFormDataHIS: ({ api, patientDocument, recordId }) => {
  //   return new Promise((resolve, reject) => {
  //     client
  //       .get(
  //         combineUrlParams(`${formPath}${api}/his`, {
  //           patientDocument: patientDocument,
  //           recordId: recordId,
  //         })
  //       )
  //       .then((res) => {
  //         if (res?.data?.code === 0) {
  //           resolve(res?.data);
  //         } else reject(res?.data);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //       });
  //   });
  // },

  updateFileSignStatus: ({ formId, nbHoSoBaId, trangThai }) => {
    return new Promise((resolve, reject) => {
      client
        .put(
          combineUrlParams(`${formPath}${FORM_SIGN_STATUS}`, {
            formId,
            nbHoSoBaId,
          }),
          {
            trangThai: trangThai,
          }
        )
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getTemplateBieuMau: ({ api, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${api}${DU_LIEU_MAU}`, payload))
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  createTemplateBieuMau: ({ api, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${api}${DU_LIEU_MAU}`, payload)
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  updateTemplateBieuMau: ({ api, id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${api}${DU_LIEU_MAU}/${id}`, payload)
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  deleteTemplateBieuMua: ({ api, id }) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${api}${DU_LIEU_MAU}/${id}`)
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
