import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_DV_KY_THUAT, NB_SO_PHIEU_CLS } from "client/api";

export default {
  tamTinhTien: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KY_THUAT}/tinh-tien`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getDsDichVu: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DV_KY_THUAT}/tong-hop`, payload))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getNBSoPhieuCLS: ({ page = 0, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_SO_PHIEU_CLS}`, {
            page,
            ...payload,
          })
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onDeleteDichVu: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_KY_THUAT}/${payload.id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getDvPhieuChiDinh: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_KY_THUAT}/dv-phieu-chi-dinh`,
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
  inPhieuHdKskHopDong: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_KY_THUAT}/phieu-huong-dan`,
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
  getPhieuChiDinhTongHop: ({
    nbDotDieuTriId,
    chiDinhTuDichVuId,
    dsChiDinhTuLoaiDichVu,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_KY_THUAT}/phieu-chi-dinh`, {
            nbDotDieuTriId,
            chiDinhTuDichVuId,
            dsChiDinhTuLoaiDichVu,
            ...payload,
          })
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
  getPhieuXacNhanThucHienDichVu: ({ nbDotDieuTriId, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_KY_THUAT}/phieu-xac-nhan-thuc-hien`,
            {
              nbDotDieuTriId,
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
