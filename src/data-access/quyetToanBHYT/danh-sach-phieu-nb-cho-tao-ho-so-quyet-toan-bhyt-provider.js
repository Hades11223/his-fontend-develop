import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DANH_SACH_PHIEU_CHO_KY, NB_79A_XML1, NB_CHO_TAO_HO_SO } from "client/api";

export default {
    search: ({ page = 0, sort, size = 10, ...payload }) => {
        return new Promise((resolve, reject) => {
            client
                .get(
                    combineUrlParams(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}`, {
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
    searchById: ({ page = 0, sort, size = 10, id, ...payload }) => {
        return new Promise((resolve, reject) => {
            client
                .get(
                    combineUrlParams(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}/${id}`, {
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
                    combineUrlParams(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}`, {
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
                .post(`${dataPath}${NB_79A_XML1}`, payload)
                // .post(
                //     combineUrlParams(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}/don-thuoc`, {
                //         // page: page + "",
                //         // sort,
                //         // size,
                //         payload,
                //     }))
                .then((s) => {
                    if (s?.data?.code === 0) resolve(s?.data);
                    else reject(s?.data);
                })
                .catch((e) => reject(e))
        })
    },
    sign: ({ page = 0, sort, size = 10, ...payload }) => {
        return new Promise((resolve, reject) => {
            client
                .post(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}`, payload)
                .then((s) => {
                    if (s?.data?.code === 0) resolve(s?.data);
                    else reject(s?.data);
                })
                .catch((e) => reject(e))
        })
    },
    // search: ({ page = 0, sort, size = 10, theoLo = false,...payload }) => {
    //   const pathEndPoint = theoLo ? "theo-lo" : "tong-hop"
    //   return new Promise((resolve, reject) => {
    //     client
    //       .get(
    //         combineUrlParams(`${dataPath}${TON_KHO}/${pathEndPoint}`, {
    //           page: page + "",
    //           sort,
    //           size,
    //           ...payload,
    //         }))
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e))
    //   })
    // },
    // post: (params) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .post(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}/don-thuoc-ngoai-vien`, params)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // put: ({ id, ...rest }) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .put(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}/${id}`, rest)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // delete: (id) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .delete(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}/${id}`)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // detail: (id) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .get(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}/${id}`)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // approved: (id) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .post(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}/duyet/${id}`)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // unApproved: (id) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .post(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}/huy-duyet/${id}`)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // sendApproved: (id) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .post(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}/gui-duyet/${id}`)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // unSendApproved: (id) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .post(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}/huy-gui-duyet/${id}`)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // kiemTraSoHoaDon: (payload) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .post(`${dataPath}${NB_79A_XML1}${NB_CHO_TAO_HO_SO}/so-hoa-don/${payload?.id}`, { soHoaDon: payload?.soHoaDon })
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // }
};

