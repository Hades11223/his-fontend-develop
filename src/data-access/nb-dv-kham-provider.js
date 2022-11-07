import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_DV_KHAM_BENH } from "client/api";

export default {
  getNbDvKham: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/${id}`, {}))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  updateNbDvKham: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_DV_KHAM_BENH}/kham-benh/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  ketLuanKham: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_DV_KHAM_BENH}/ket-luan/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  ketThucKham: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KHAM_BENH}/ket-luan/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  huyKetLuan: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KHAM_BENH}/huy-ket-luan/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  huyKetLuanGetMethod: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DV_KHAM_BENH}/huy-ket-luan/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getStatisticsRoom: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/tong-hop-sl`, payload)
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getHistory: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/lich-su`, payload))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getDanhSachBN: ({ page = 0, sort, size = 500, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/tong-hop`, {
            page: page + "",
            sort,
            size,
            ...payload,
          })
        )
        .then((s) => {
          if (s.data.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getHanhTrinhKham: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/hanh-trinh-kham`, {
            ...payload,
          })
        )
        .then((s) => {
          if (s.data.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  chiDinhDVKham: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KHAM_BENH}`, payload)
        .then((s) => {
          if (s.data.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  tamTinhTienDVKham: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KHAM_BENH}/tinh-tien`, payload)
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
          .delete(`${dataPath}${NB_DV_KHAM_BENH}/${id}`)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_KHAM_BENH}`, {
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
  getDsDichVuChiDinhKham: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/tong-hop`, payload)
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
          `${dataPath}${NB_DV_KHAM_BENH}/them-thong-tin/so-phieu/${id}`,
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
  themThongTinDV: (payload, id) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DV_KHAM_BENH}/them-thong-tin/${id}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  dangKham: (id, payload = {}) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KHAM_BENH}/dang-kham/${id}`, payload)
        .then((s) => {
          if (s?.data?.code == 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  dangKetLuan: (id, payload = {}) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KHAM_BENH}/dang-ket-luan/${id}`, payload)
        .then((s) => {
          if (s?.data?.code == 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  daKetLuan: (id, payload = {}) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KHAM_BENH}/da-ket-luan/${id}`, payload)
        .then((s) => {
          if (s?.data?.code == 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  boQuaKham: (id, payload = {}) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KHAM_BENH}/bo-qua/${id}`, payload)
        .then((s) => {
          if (s?.data?.code == 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  boQuaKetLuan: (id, payload = {}) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KHAM_BENH}/bo-qua-ket-luan/${id}`, payload)
        .then((s) => {
          if (s?.data?.code == 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  // updateNbCovid: ({ id, ...rest }) => {
  //   return new Promise((resolve, reject) => {
  //     client
  //       .put(`${dataPath}${NB_DV_KHAM_BENH}/kham-covid/${id}`, rest)
  //       .then((s) => {
  //         if (s?.data?.code === 0) resolve(s?.data);
  //         else reject(s?.data);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //       });
  //   });
  // },
  checkIn: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KHAM_BENH}/check-in`, payload)
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
        .get(combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/qms/${payload}`))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  loiDan: (payload, id) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DV_KHAM_BENH}/loi-dan/${id}`, payload)
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
          combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/phieu-chi-dinh`, {
            nbDotDieuTriId,
            soPhieuId,
            phieuChiDinhId,
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
  getPhieuChiDinhKetLuan: ({
    nbDotDieuTriId,
    soPhieuId,
    phieuChiDinhId,
    id,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_KHAM_BENH}/phieu-ket-luan/${id}`,
            {
              nbDotDieuTriId,
              soPhieuId,
              phieuChiDinhId,
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
  getNbTiepTheo: ({ phongThucHienId, nbTiepTheoId, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(
          `${dataPath}${NB_DV_KHAM_BENH}/tiep-theo/${phongThucHienId}`,
          nbTiepTheoId ? { nbTiepTheoId } : ""
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
  doiTrangThai: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KHAM_BENH}/doi-trang-thai`, payload)
        .then((s) => {
          if (s?.data?.code == 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  phieuKhamBenh: ({ nbDotDieuTriId, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/phieu-kham-benh`, {
            nbDotDieuTriId,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.data !== null) {
            resolve(s?.data);
          } else {
            reject();
          }
        })
        .catch((e) => reject(e));
    });
  },
  phieuKhamBenhTheoId: ({ nbDvKhamId }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_KHAM_BENH}/phieu-kham-benh/${nbDvKhamId}`
          )
        )
        .then((s) => {
          if (s?.data?.data !== null) {
            resolve(s?.data);
          } else {
            reject();
          }
        })
        .catch((e) => reject(e));
    });
  },
  inGiayKskHopDong: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/giay-ksk`, payload)
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  inGiayKskNb: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      const url = id
        ? `${dataPath}${NB_DV_KHAM_BENH}/giay-ksk/${id}`
        : `${dataPath}${NB_DV_KHAM_BENH}/giay-ksk`;
      client
        .get(combineUrlParams(url, rest))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  inPhieuKskNb: ({ ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DV_KHAM_BENH}/phieu-ksk`, rest))
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
        .patch(`${dataPath}${NB_DV_KHAM_BENH}/them-thong-tin`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
