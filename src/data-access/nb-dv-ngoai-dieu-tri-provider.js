import { client, dataPath } from "client/request";
import { NB_DV_NGOAI_DIEU_TRI } from "client/api";
import { combineUrlParams } from "utils";

export default {
  searchTongHop: ({ page = 0, active, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_NGOAI_DIEU_TRI}/tong-hop`, {
            page: page + "",
            active,
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

  chiDinhNgoaiDieuTri: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_NGOAI_DIEU_TRI}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  tamTinhTienDVNgoaiDieuTri: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_NGOAI_DIEU_TRI}/tinh-tien`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  patchDVNgoaiDieuTri: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DV_NGOAI_DIEU_TRI}/them-thong-tin`, payload)
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
          .delete(`${dataPath}${NB_DV_NGOAI_DIEU_TRI}/${id}`)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_NGOAI_DIEU_TRI}`, {
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
  getPhieuChiDinh: ({
    nbDotDieuTriId,
    soPhieuId,
    phieuChiDinhId,
    ...payload
  }) => {
    // api/his/v1/nb-dv-cdha-tdcn-pt-tt/phieu-chi-dinh?nbDotDieuTriId=
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_NGOAI_DIEU_TRI}/phieu-chi-dinh`,
            {
              nbDotDieuTriId,
              soPhieuId,
              phieuChiDinhId,
              ...payload,
            }
          )
        )
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  getPhieuChiDinhTheoDv: ({
    nbDotDieuTriId,
    chiDinhTuLoaiDichVu,
    dsNbDichVuId,
    ...payload
  }) => {
    // api/his/v1/nb-dv-ngoai-dieu-tri/phieu-chi-dinh?nbDotDieuTriId=&chiDinhTuLoaiDichVu=&dsNbDichVuId=
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_NGOAI_DIEU_TRI}/phieu-chi-dinh`,
            {
              nbDotDieuTriId,
              chiDinhTuLoaiDichVu,
              dsNbDichVuId,
              ...payload,
            }
          )
        )
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
