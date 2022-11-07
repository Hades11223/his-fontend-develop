import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DANH_SACH_PHIEU_CHO_KY } from "client/api";

export default {
  search: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}`, {
            trangThai: 10,
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
  searchWithPhieuMoiNhat: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}`, {
            phieuMoiNhat: true,
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
  post: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}`, payload)
        // .post(
        //     combineUrlParams(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}/don-thuoc`, {
        //         // page: page + "",
        //         // sort,
        //         // size,
        //         payload,
        //     }))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  sign: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
