import { client, dataPath } from "client/request";
import { combineUrlParams } from "utils";

const getUrl = (type, pdf) => {
  switch (type) {
    case 1:
      return `${dataPath}/files/${pdf}`;
    default:
      return;
  }
};

export default {
  // getPdf(pdf, type) {
  //   return clientUtils.requestApiFiles("get", `${type === 2
  //     ? clientUtils.EMR_SIGNER_SERVICE
  //     : clientUtils.FILE_RESULT}files/${pdf}`, {});
  // },
  getPdf(pdf, type) {
    const url = getUrl(type, pdf);

    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(url, {}),{
          responseType: 'blob',
        })
        .then((s) => {
          if (s?.status === 200) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
