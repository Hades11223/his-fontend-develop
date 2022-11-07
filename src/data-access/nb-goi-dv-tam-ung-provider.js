import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_GOI_DICH_VU_TAM_UNG } from "client/api";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NB_GOI_DICH_VU_TAM_UNG }),
  thanhToanGoi: ({
    nbDotDieuTriId,
    goiDvId,
    dsPhuongThucTt,
    tongTien,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_DICH_VU_TAM_UNG}`, {
          nbDotDieuTriId,
          goiDvId,
          dsPhuongThucTt,
          tongTien,
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  traLaiTienThua: ({ nbDotDieuTriId, goiDvId, tongTien, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_DICH_VU_TAM_UNG}/hoan-ung`, {
          nbDotDieuTriId,
          goiDvId,
          tongTien,
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  huyThanhToan: ({ id, lydo, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_GOI_DICH_VU_TAM_UNG}/hoan-ung/${id}`, {
          lydo,
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  phieuThu: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_GOI_DICH_VU_TAM_UNG}/phieu-thu/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
