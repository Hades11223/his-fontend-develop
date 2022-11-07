import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_MA_GIAM_GIA } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_MA_GIAM_GIA }),
  daSuDung: ({ maGiamGiaId = 0, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_MA_GIAM_GIA}/da-su-dung`, {
            maGiamGiaId,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch(reject);
    });
  },
};
