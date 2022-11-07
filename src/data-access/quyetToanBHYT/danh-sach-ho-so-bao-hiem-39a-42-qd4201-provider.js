import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import {
  NB_79A_XML1,
  NB_79A_XML2,
  NB_79A_XML3,
  NB_79A_XML4,
  NB_79A_XML5,
} from "client/api";

export default {
  search: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_79A_XML1}`, {
            page: page + "",
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
  searchById: ({ page = 0, sort, size = 10, id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_79A_XML1}/${id}`, {
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
  searchXml: ({ page = 0, sort, size = 10, id, activeKeyTab, ...payload }) => {
    let api = NB_79A_XML1;
    switch (activeKeyTab) {
      case "2":
        api = NB_79A_XML2;
        break;
      case "3":
        api = NB_79A_XML3;
        break;
      case "4":
        api = NB_79A_XML4;
        break;
      case "5":
        api = NB_79A_XML5;
        break;
      default:
        break;
    }
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${api}`, {
            page: page + "",
            sort,
            size,
            nb79aXml1Id: id,
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
  searchWithPhieuMoiNhat: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_79A_XML1}`, {
            phieuMoiNhat: true,
            page: page + "",
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
  post: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_79A_XML1}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  delete: ({ ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_79A_XML1}/theo-thoi-gian`, { data: payload })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  deleteById: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_79A_XML1}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  putXml1: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_79A_XML1}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  putXml2: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_79A_XML2}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  putXml3: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_79A_XML3}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  putXml4: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_79A_XML4}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  putXml5: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_79A_XML5}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  postQuyetToan: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_79A_XML1}/day-ho-so-bao-hiem/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  postMultipleQuyetToan: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_79A_XML1}/day-ho-so-bao-hiem`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  kiemTraQuyetToanXml1: (nbDotDieuTriId) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_79A_XML1}/kiem-tra-quyet-toan-bao-hiem/${nbDotDieuTriId}`
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  taoDayHoSoXml1: (nbDotDieuTriId) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_79A_XML1}/tao-day-ho-so/${nbDotDieuTriId}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
