import { client, dataPath } from "client/request";
import { NB_DV_CLS_PT_TT } from "client/api";
import { combineUrlParams } from "utils";

export default {
  getTongHopDichVuCLS: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_CLS_PT_TT}/tong-hop`, payload)
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
  chiDinhCLS: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_CLS_PT_TT}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  tamTinhTienDVCLS: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_CLS_PT_TT}/tinh-tien`, payload)
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
          .delete(`${dataPath}${NB_DV_CLS_PT_TT}/${id}`)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_CLS_PT_TT}`, {
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
  getDsDichVuChiDinhCLS: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_CLS_PT_TT}/tong-hop`, payload)
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
          `${dataPath}${NB_DV_CLS_PT_TT}/them-thong-tin/so-phieu/${id}`,
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
        .patch(`${dataPath}${NB_DV_CLS_PT_TT}/them-thong-tin/${id}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getDanhSachBNCLS: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_CLS_PT_TT}/nguoi-benh`, payload)
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  phanPhong: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_CLS_PT_TT}/phan-phong`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  tiepNhan: (phongThucHienId, payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(
          `${dataPath}${NB_DV_CLS_PT_TT}/tiep-nhan/${phongThucHienId}`,
          payload
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
  huyTiepNhan: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_CLS_PT_TT}/huy-tiep-nhan`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  coKetQua: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_CLS_PT_TT}/co-ket-qua`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  huyKetQua: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_CLS_PT_TT}/huy-co-ket-qua`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  nhapKetQua: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_DV_CLS_PT_TT}/ket-qua`, [payload])
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  khongThucHien: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_CLS_PT_TT}/pt-tt/khong-thuc-hien/${id}`, {})
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
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
          combineUrlParams(`${dataPath}${NB_DV_CLS_PT_TT}/phieu-chi-dinh`, {
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
  checkIn: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_CLS_PT_TT}/check-in`, payload)
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
        .get(combineUrlParams(`${dataPath}${NB_DV_CLS_PT_TT}/qms/${payload}`))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getNbTiepTheo: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_CLS_PT_TT}/tiep-theo/${payload}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  boQua: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_CLS_PT_TT}/bo-qua`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  phieuKetQua: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DV_CLS_PT_TT}/phieu-ket-qua-cdha-tdcn/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
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
            `${dataPath}${NB_DV_CLS_PT_TT}/phieu-ket-qua`,
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
  getDashboard: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_CLS_PT_TT}/dashboard/theo-trang-thai`,
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
  getDashboardTheoNguonNb: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_CLS_PT_TT}/dashboard/theo-nguon-nb`,
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
  getDashboardTheoThoiGian: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_CLS_PT_TT}/dashboard/theo-thoi-gian`,
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
  getDashboardTheoBacSi: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_CLS_PT_TT}/dashboard/theo-bac-si`,
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
  getDashboardTheoTrangThai: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_CLS_PT_TT}/dashboard/pt-tt/theo-trang-thai`,
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
  getDsPttt: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DV_CLS_PT_TT}/pt-tt`, payload))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getChiTietPTTT: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DV_CLS_PT_TT}/pt-tt/${id}`, {}))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  updateThongTinPTTT: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_DV_CLS_PT_TT}/pt-tt/${payload.id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  doiDichVu: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .put(
          `${dataPath}${NB_DV_CLS_PT_TT}/pt-tt/doi-dich-vu/${payload.id}`,
          payload
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
  getNguoiThucHien: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DV_CLS_PT_TT}/pt-tt/nguoi-thuc-hien/${id}`,
            {}
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
  saveNguoiThucHien: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .put(
          `${dataPath}${NB_DV_CLS_PT_TT}/pt-tt/nguoi-thuc-hien/${payload.id}`,
          payload
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

  doiDichVuChuaTT: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DV_CLS_PT_TT}/them-thong-tin/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  giayChungNhanPTTT: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          `${dataPath}${NB_DV_CLS_PT_TT}/pt-tt/giay-chung-nhan-pt-tt/${id}`,
          {}
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
  phieuPTTT: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DV_CLS_PT_TT}/pt-tt/phieu-pt-tt/${id}`, {})
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  bangKeChiPhiVatTuTrongPT: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DV_CLS_PT_TT}/pt-tt/bang-ke-vtyt/${id}`, {})
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  bangKeChiPhiThuocTrongPT: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_DV_CLS_PT_TT}/pt-tt/bang-ke-thuoc/${id}`, {})
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  phieuThanhToanPT: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          `${dataPath}${NB_DV_CLS_PT_TT}/pt-tt/phieu-ghi-thanh-toan/${id}`,
          {}
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
  themThongTin: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DV_CLS_PT_TT}/them-thong-tin`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
