import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import {
  NB_DV_PHAT_HANH_HOA_DON,
  NB_HOA_DON_TONG_HOP,
  NB_PHIEU_THU_TONG_HOP,
  NB_HOA_DON,
  NB_HOA_DON_CHI_TIET_TONG_HOP,
  PHAT_HANH_HOA_DON,
  BANG_KE_KEM_HDDT_XUAT_GOP,
  BIEN_BAN_DIEU_CHINH,
} from "../client/api";

export default {
  search: ({ page = 0, active, sort, size = 1000, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_HOA_DON_TONG_HOP}`, {
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

  getStatistical: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_HOA_DON_TONG_HOP}`, params))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getChiTietHoaDonDienTu: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_HOA_DON_TONG_HOP}/${id}`))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getDsDichVuDefault: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DV_PHAT_HANH_HOA_DON}`, params))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  getDsPhieuThu: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_PHIEU_THU_TONG_HOP}`, params))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },  
  getDsDichVuChiTiet: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_HOA_DON_CHI_TIET_TONG_HOP}`, params)
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  xuatHoaDon: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_HOA_DON}${PHAT_HANH_HOA_DON}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  luuNhapHoaDon: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_HOA_DON}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getFileHoaDon: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_HOA_DON}/${id}`))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  deleteHoaDon: ({ id, lyDo = "" }) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_HOA_DON}/${id}`, { data: { lyDo } })
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getChiTietHoaDon: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_HOA_DON_TONG_HOP}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  xuatHoaDonNhap: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_HOA_DON}${PHAT_HANH_HOA_DON}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getBangKeKemHDDT: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_HOA_DON}${BANG_KE_KEM_HDDT_XUAT_GOP}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getBienBanDieuChinh: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_HOA_DON}${BIEN_BAN_DIEU_CHINH}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  dieuChinhHoaDon: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_HOA_DON}/dieu-chinh-hoa-don/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  capNhatHoaDon: (id, payload) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_HOA_DON}/${id}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
