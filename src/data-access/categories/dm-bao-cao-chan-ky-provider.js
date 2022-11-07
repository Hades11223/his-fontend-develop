import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_BAO_CAO_CHAN_KY } from "client/api";

export default {
    create: (params) => {
        return new Promise((resolve, reject) => {
            client
                .post(`${dataPath}${DM_BAO_CAO_CHAN_KY}`, params)
                .then((s) => {
                    if (s?.data?.code === 0) resolve(s?.data);
                    else reject(s?.data);
                })
                .catch((e) => reject(e));
        });
    },
    getByBaoCaoId: (id) => {
        return new Promise((resolve, reject) => {
            client
                .get(`${dataPath}${DM_BAO_CAO_CHAN_KY}/${id}`)
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
                .patch(`${dataPath}${DM_BAO_CAO_CHAN_KY}/${id}`, rest)
                .then((s) => {
                    if (s?.data?.code === 0) resolve(s?.data);
                    else reject(s?.data);
                })
                .catch((e) => reject(e));
        });
    },
};
