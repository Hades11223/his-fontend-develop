import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { TON_KHO } from "client/api";

export default {
  search: ({
    page = 0,
    sort,
    size = 10,
    theoLo = false,
    thau = false,
    ...payload
  }) => {
    const pathEndPoint = theoLo
      ? "theo-lo"
      : thau
      ? "quyet-dinh-thau"
      : "tong-hop";
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${TON_KHO}/${pathEndPoint}`, {
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

  searchTheoLoConTon: ({
    page = 0,
    size = 10,
    theoSoLuongTonKho = 10,
    ...rest
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${TON_KHO}/theo-lo`, {
            page: page + "",
            size,
            theoSoLuongTonKho,
            ...rest,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
