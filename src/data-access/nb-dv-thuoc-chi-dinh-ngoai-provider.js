import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_DV_THUOC_CHI_DINH_NGOAI } from "client/api";

export default {
  search: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_THUOC_CHI_DINH_NGOAI}`, payload)
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  searchTongHop: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_THUOC_CHI_DINH_NGOAI}/tong-hop`,
            payload
          )
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  postBatch: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_THUOC_CHI_DINH_NGOAI}/batch`, payload)
        .then((s) => {
          if (s?.data?.code == 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onDeleteAll: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_THUOC_CHI_DINH_NGOAI}/batch`, {
          data: payload,
        })
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onDeleteDichVu: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_THUOC_CHI_DINH_NGOAI}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  put: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_DV_THUOC_CHI_DINH_NGOAI}/${id}`, { ...rest })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getDonChiDinh: ({
    nbDotDieuTriId,
    soPhieuId,
    phieuNhapXuatId,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_THUOC_CHI_DINH_NGOAI}/don-thuoc`,
            {
              nbDotDieuTriId,
              soPhieuId,
              phieuNhapXuatId,
              ...payload,
            }
          )
        )
        .then((s) => {
          if (s?.data?.code == 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
