import { client, dataPath } from "client/request";
import { NB_DV_THUOC } from "client/api";
import { combineUrlParams } from "utils";

export default {
  searchTongHop: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DV_THUOC}/tong-hop`, payload))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  post: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_THUOC}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  tamTinhTien: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_THUOC}/tinh-tien`, payload)
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
        .delete(`${dataPath}${NB_DV_THUOC}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onDeleteMultiDichVu: ({ id, listDeletingId }) => {
    if (id)
      return new Promise((resolve, reject) => {
        client
          .delete(`${dataPath}${NB_DV_THUOC}/${id}`)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_THUOC}`, {
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
  themThongTin: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DV_THUOC}/them-thong-tin`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onDeleteAll: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_THUOC}`, {
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
  getDonChiDinh: ({
    nbDotDieuTriId,
    soPhieuId,
    phieuNhapXuatId,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_THUOC}/don-thuoc`, {
            nbDotDieuTriId,
            soPhieuId,
            phieuNhapXuatId,
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
  getDonThuocTongHop: ({
    nbDotDieuTriId,
    soPhieuId,
    phieuNhapXuatId,
    ...payload
  }) => {
    // api/his/v1/nb-dv-thuoc/don-thuoc?nbDotDieuTriId=
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_THUOC}/don-thuoc-tong-hop`, {
            nbDotDieuTriId,
            soPhieuId,
            phieuNhapXuatId,
            ...payload,
          })
        )
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  postDsDvThuocTraKho: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_THUOC}/tra-kho`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  postDsDvThuocTraKhoTatCa: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_THUOC}/tra-kho-tat-ca`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  putDsDvThuocTraKho: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_DV_THUOC}/tra-kho`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  deleteDsDvThuocTraKho: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_THUOC}/tra-kho`, { data: payload })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  deleteDsDvThuocPhieuLinh: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_THUOC}/phieu-linh`, { data: payload })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  xoaPhieuTraKho: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_THUOC}/phieu-tra-kho`, { data: payload })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
