import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import {
  NB_DICH_VU_XET_NGHIEM,
  NB_DICH_VU_XET_NGHIEM_CHI_SO_CON,
} from "client/api";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NB_DICH_VU_XET_NGHIEM }),
  xacNhanlayMau: (payload) => {
    const { data, status } = payload;
    return new Promise((resolve, reject) => {
      client
        .post(
          `${dataPath}${NB_DICH_VU_XET_NGHIEM}/${
            status === "accept" ? "lay-mau" : "huy-mau"
          }`,
          data
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  xacNhanTiepNhanMau: (payload) => {
    const { data, status } = payload;
    return new Promise((resolve, reject) => {
      client
        .post(
          `${dataPath}${NB_DICH_VU_XET_NGHIEM}/${
            status === "accept" ? "tiep-nhan-mau" : "huy-tiep-nhan-mau"
          }`,
          data
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  capNhatKetQua: (payload) => {
    const { data } = payload;
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_DICH_VU_XET_NGHIEM}/ket-qua`, data)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  xacNhanKetQua: (payload) => {
    const { data, status } = payload;
    return new Promise((resolve, reject) => {
      client
        .post(
          `${dataPath}${NB_DICH_VU_XET_NGHIEM}/${
            status === "accept" ? "co-ket-qua" : "huy-co-ket-qua"
          }`,
          data
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  duyetKetQua: (payload) => {
    return new Promise((resolve, reject) => {
      const { data, status } = payload;
      client
        .post(
          `${dataPath}${NB_DICH_VU_XET_NGHIEM}/${
            status === "accept" ? "duyet-ket-qua" : "huy-duyet-ket-qua"
          }`,
          data
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getBNXetNghiem: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DICH_VU_XET_NGHIEM}/nguoi-benh`,
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
  updateXN: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_DICH_VU_XET_NGHIEM}/ket-qua`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  themThongTinDV: (payload, id) => {
    return new Promise((resolve, reject) => {
      client
        .patch(
          `${dataPath}${NB_DICH_VU_XET_NGHIEM}/them-thong-tin/${id}`,
          payload
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  themThongTinPhieu: (payload, id) => {
    return new Promise((resolve, reject) => {
      client
        .patch(
          `${dataPath}${NB_DICH_VU_XET_NGHIEM}/them-thong-tin/so-phieu/${id}`,
          payload
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  chiDinhXN: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DICH_VU_XET_NGHIEM}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  tamTinhTienDVXN: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DICH_VU_XET_NGHIEM}/tinh-tien`, payload)
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
          .delete(`${dataPath}${NB_DICH_VU_XET_NGHIEM}/${id}`)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DICH_VU_XET_NGHIEM}`, {
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
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DICH_VU_XET_NGHIEM}/phieu-chi-dinh`,
            { nbDotDieuTriId, soPhieuId, phieuChiDinhId, ...payload }
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
  checkIn: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DICH_VU_XET_NGHIEM}/check-in`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getDsNguoiBenhQms: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DICH_VU_XET_NGHIEM}/qms/${payload}`)
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getPhieuKetQua: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DICH_VU_XET_NGHIEM}/phieu-ket-qua`,
            payload
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  postNbTiepTheo: ({ nbTiepTheoId }, phongLayMauId) => {
    return new Promise((resolve, reject) => {
      client
        .post(
          `${dataPath}${NB_DICH_VU_XET_NGHIEM}/tiep-theo/${phongLayMauId}`,
          { nbTiepTheoId }
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  tiepNhan: (payload) => {
    const { data } = payload;
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DICH_VU_XET_NGHIEM}/tiep-nhan`, data)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  boQua: (payload) => {
    const { data } = payload;
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DICH_VU_XET_NGHIEM}/bo-qua`, data)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getChiSoCon: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DICH_VU_XET_NGHIEM_CHI_SO_CON}`,
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
};
