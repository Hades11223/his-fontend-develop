import { NB_CHUYEN_VIEN, PHIEU_CHUYEN_VIEN } from "client/api";
import { client, dataPath } from "client/request";
import apiBase from "../api-base";
import { combineUrlParams } from "utils";

export default {
  ...apiBase.init({ API: NB_CHUYEN_VIEN }),
  getPhieuChuyenVien: ({ nbDotDieuTriId }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          `${dataPath}${NB_CHUYEN_VIEN}${PHIEU_CHUYEN_VIEN}/${nbDotDieuTriId}`
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getPhieuChuyenVienById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_CHUYEN_VIEN}${PHIEU_CHUYEN_VIEN}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getDsGiayChuyenTuyen: ({ nbDotDieuTriId }) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_CHUYEN_VIEN}?nbDotDieuTriId=${nbDotDieuTriId}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
