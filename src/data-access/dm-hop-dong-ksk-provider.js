import { client, dataPath } from "client/request";
import { DM_HOP_DONG_KSK } from "client/api";
import { combineUrlParams } from "utils";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: DM_HOP_DONG_KSK }),

  search: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_HOP_DONG_KSK}/tong-hop`, {
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

  taoMoiHopDong: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK}/tao-moi-hop-dong/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  taoMoiHopDongTuDS: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK}/tao-moi-hop-dong`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  postBaoGiaThanhCong: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK}/bao-gia-thanh-cong/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  postBaoGiaThatBai: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK}/bao-gia-that-bai/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  saoChepPhieu: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK}/sao-chep-bao-gia/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  thanhLyHD: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK}/thanh-ly-hd/${id}`)
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  xacNhanThanhLyHD: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK}/xac-nhan-thanh-ly-hd/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  huyThanhLyHD: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK}/huy-thanh-ly-hd/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  mienGiam: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_HOP_DONG_KSK}/mien-giam/${id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
