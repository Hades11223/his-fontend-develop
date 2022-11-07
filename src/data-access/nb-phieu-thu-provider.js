import { message } from "antd";
import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_PHIEU_THU } from "client/api";

export default {
  searchById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_PHIEU_THU}/${id}`, {}))
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
        .put(`${dataPath}${NB_PHIEU_THU}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  addOrUpdateDiscount: (payload, id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_THU}/mien-giam/${id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
            message.success("Thêm mới thành công dữ liệu miễn giảm!");
          } else {
            message.error(s?.data?.message.toString());
            reject(s?.data);
          }
        })
        .catch((e) => reject(e));
    });
  },

  addOrUpdateVoucher: (payload, id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_THU}/giam-gia/${id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
            if (s?.data?.data?.maGiamGiaId === null) {
              message.success("Xóa thành công voucher giảm giá!");
            } else {
              message.success("Thêm mới thành công dữ liệu giảm giá!");
            }
          } else {
            message.error(s?.data?.message.toString());
            reject(s?.data);
          }
        })
        .catch((e) => reject(e));
    });
  },
  huyThanhToan: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_THU}/huy-thanh-toan/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  exportExcel: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_PHIEU_THU}/export`, params))
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
        .patch(`${dataPath}${NB_PHIEU_THU}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  getInPhieuThu: (phieuThuId) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_PHIEU_THU}/phieu-thu/${phieuThuId}`)
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  searchByIdTongHop: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_PHIEU_THU}/tong-hop/${id}`, {}))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  searchTongHopKSK: (hopDongKskId) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${NB_PHIEU_THU}/tong-hop?hopDongKskId=${hopDongKskId}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  thanhToanKSK: ({ hopDongKskId, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_THU}/thanh-toan-ksk/${hopDongKskId}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  thanhToan: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_THU}/thanh-toan/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  xoaPhieu: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_PHIEU_THU}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch(reject);
    });
  },
};
