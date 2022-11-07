import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import {
  NB_DICH_VU,
  NB_DV_KY_THUAT,
  DM_DV_KY_THUAT,
  VONG_TAY_NGUOI_BENH,
  NB_DICH_VU_XET_NGHIEM,
  NB_DV_KHAM_BENH,
  NB_PHIEU_THU,
} from "client/api";
import { NB_DOT_DIEU_TRI } from "../client/api";

export default {
   getDvKsk: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${DM_DV_KY_THUAT}`, params))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  searchDvTiepDon: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DV_KY_THUAT}/tiep-don`, {
            sort: "ma",
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

  searchDvKhamSucKhoe: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DV_KY_THUAT}/tong-hop`, {
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

  createMore: (payload) => {
    return new Promise((resolve, reject) => {
      if (payload?.id) {
        client
          .patch(`${dataPath}${NB_DV_KY_THUAT}`, payload?.data)
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch((e) => reject(e));
      } else {
        client
          .post(`${dataPath}${NB_DV_KY_THUAT}`, payload?.data)
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch((e) => {
            reject(e);
          });
      }
    });
  },
  searchNbDvTongHop: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DICH_VU}/tong-hop`, payload))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  tamTinhTien: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KY_THUAT}/tinh-tien`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getCamKetDieuTriCovid: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          `${dataPath}${NB_DOT_DIEU_TRI}/phieu-cam-ket-dtri-covid-tu-xa/${id}`,
          {}
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getPhieuGiuTheBHYT: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DOT_DIEU_TRI}/giay-giu-the-bhyt/${id}`, {})
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getVongTayNguoiBenh: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${VONG_TAY_NGUOI_BENH}/${id}`, {})
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },  
  getPhieuKetLuan: (id, payload) => {
    // /api/his/v1/nb-dv-kham/xuat-toan-bo-phieu-ket-luan/38065
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_KHAM_BENH}/xuat-toan-bo-phieu-ket-luan/${id}`,
            { ...payload }
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getNbPhieuThu: ({ phieuThuId }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_PHIEU_THU}/phieu-thu/${phieuThuId}`)
        )
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getPhieuKhamBenhKetLuan: (id, payload) => {
    // /api/his/v1/nb-dv-kham/phieu-ket-luan/38065
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/phieu-ket-luan/${id}`)
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getPhieuKhamBenhKetLuanParams: (payload) => {
    // /api/his/v1/nb-dv-kham/phieu-ket-luan/38065
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/phieu-ket-luan/`, {
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
  getPhieuHuongDan: (payload) => {
    // /api/his/v1/nb-dv-kham/phieu-ket-luan/38065
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_KY_THUAT}/phieu-huong-dan/`, {
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
};
