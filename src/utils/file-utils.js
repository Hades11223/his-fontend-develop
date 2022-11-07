import { client } from "client/request";
import { FILE } from "client/api";
import { HOST } from "client/request";
import { message } from "antd";
import { combineUrlParams } from "utils";

export default {
  absoluteFileUrl: (item) => {
    if (
      item?.indexOf("http") === 0 ||
      item?.indexOf("https") === 0 ||
      item?.indexOf("blob") === 0 ||
      item?.indexOf("data:") === 0
    )
      return this;
    return HOST + "/api/his/v1/files/" + item + "";
  },
  urltoFile: async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
  },
  getFromUrl: ({ prefix, url = "" }) => {
    return new Promise((resolve, reject) => {
      let file = "";
      if (url.indexOf("blob:") == 0) {
        resolve(url);
        return;
      }
      if (url.indexOf("http") == 0) {
        file = url;
      } else {
        if (prefix) file = `${prefix}${FILE}/${url}`;
        else {
          file = `${FILE}/${url}`;
        }
      }

      file = file.replaceAll("//api/", "/api/");
      client
        .get(file, {
          responseType: "arraybuffer",
        })
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  // mở file html trả về sang tab mới
  // nếu file response trả về là html
  openHtmlResponseToNewTab: function (url) {
    return new Promise((resolve, reject) => {
      this.getFromUrl({
        url: this.absoluteFileUrl(url),
      })
        .then((s) => {
          var enc = new TextDecoder("utf-8");
          var data = enc.decode(s);

          // var myWindow = window.open(
          //   "/home",
          //   "response",
          //   // "status=1,toolbar=0,resizable=yes"
          // );
          // myWindow.document.write(data);
          resolve(data);
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          reject(e);
        });
    });
  },
  // download file
  downloadFile: function (url, nameFile) {
    return new Promise((resolve, reject) => {
      this.getFromUrl({
        url: this.absoluteFileUrl(url),
      })
        .then((s) => {
          const blob = new Blob([new Uint8Array(s)], {});
          const blobUrl = window.URL.createObjectURL(blob);
          const arrSplit = url.split("/");
          const nameFileDownLoad = nameFile || arrSplit[arrSplit.length - 1];
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = nameFileDownLoad;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          resolve(s);
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          reject(e);
        });
    });
  },
  downloadFileZip: function (url, params, nameFile) {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(url, {
            ...params,
          }),
          {
            responseType: "arraybuffer",
          }
        )
        .then((s) => {
          let obj = {};
          function IsJsonString(str) {
            try {
              obj = JSON.parse(new TextDecoder().decode(str));
            } catch (e) {
              return false;
            }
            return true;
          }
          // const obj = JSON.parse(new TextDecoder().decode(s.data));
          IsJsonString(s.data);
          if (obj.message) {
            message.error(`${obj.message}`);
            return null;
          }
          const blob = new Blob([new Uint8Array(s.data)], {
            type: "application/octet-stream",
          });
          const blobUrl = window.URL.createObjectURL(blob);
          const arrSplit = s?.config?.url?.split("/");
          const nameFileDownLoad =
            `${nameFile}.zip` || `${arrSplit[arrSplit.length - 1]}.zip`;
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = nameFileDownLoad;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((e) => {
          console.log("e: ", e);
          reject(e);
        });
    });
  },
  base64ToFile: (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  },
  isExternalUrl: (url = "") => {
    if (url?.indexOf("http") == 0) {
      return true;
    }
    return false;
  },
  getImg: function ({ src, type }) {
    return new Promise((resolve, reject) => {
      this.getFromUrl({
        url: `${HOST}/api/his/v1/files/${src}`,
      })
        .then((res) => {
          const url = URL.createObjectURL(
            new Blob([res], {
              type: type || "application/pdf",
            })
          );
          resolve(url);
        })
        .catch(reject);
    });
  },
};
