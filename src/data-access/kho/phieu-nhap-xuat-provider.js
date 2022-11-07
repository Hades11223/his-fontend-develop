import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { KHO_PHIEU_NHAP_XUAT } from "client/api";

export default {
  search: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/tong-hop`, {
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
  post: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  taoPhieuLinhBu: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/phieu-linh`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  taoPhieuTraBu: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/phieu-tra`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  put: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  detail: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  duyetPhieu: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/duyet/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  huyDuyet: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/huy-duyet/${id}`, {
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  guiDuyet: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/gui-duyet/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  tuChoiDuyet: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/huy-gui-duyet/${id}`, {
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  kiemTraSoHoaDon: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/so-hoa-don/${payload?.id}`, {
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  updateGhiChuDonThuocById: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/don-thuoc/ghi-chu/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getDanhSachDonThuoc: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/don-thuoc`, {
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
  inPhieuLinh: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${KHO_PHIEU_NHAP_XUAT}/phieu-linh/${id}`,
            {}
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  inPhieuNhapXuat: ({ id, phieuNhapKho }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${KHO_PHIEU_NHAP_XUAT}/phieu-nhap-xuat/${id}`,
            { phieuNhapKho }
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  inPhieuTra: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/phieu-tra/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  getPhieuThuNhaThuoc: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${KHO_PHIEU_NHAP_XUAT}/phieu-thu-nha-thuoc/${id}`,
            {}
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  suaSoLuongDuyet: (id, dsNhapXuatChiTiet) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/sl-duyet/${id}`, {
          dsNhapXuatChiTiet,
        })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  patch: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  thoiGianPhat: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/thoi-gian-phat/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  huyDatTruoc: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/huy-dat-truoc/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  datTruoc: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/dat-truoc/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  inPhieuLinhChiTiet: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${KHO_PHIEU_NHAP_XUAT}/phieu-linh-chi-tiet/${id}`,
            {}
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
