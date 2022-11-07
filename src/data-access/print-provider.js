import { ISOFH_TOOL_HOST } from "client/request";
import print from "print-js";
import fileUtils from "utils/file-utils";
import { PDFDocument } from "pdf-lib";
import pdfUtils from "utils/pdf-utils";
import { detectMob } from "utils";

const printPromise = (resolve, reject, promises) => {
  Promise.all(promises)
    .then((s) => {
      s.forEach((item) => {
        const blob = new Blob([new Uint8Array(item)], {
          type: "application/pdf",
        });
        const blobUrl = window.URL.createObjectURL(blob);
        console.log(blobUrl);
        printJS({
          printable: blobUrl,
          type: "pdf",
        });
        // return window.URL.createObjectURL(blob);
      });
      resolve(s);
    })
    .catch((e) => {
      reject(e);
    });
};

const printProvider = {
  printPdf: (payload = {}) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const inThuong = (resolve, reject) => {
      let promises = [];
      if (Array.isArray(payload)) {
        promises = payload.map((item) =>
          fileUtils.getFromUrl({
            url: fileUtils.absoluteFileUrl(item.file?.pdf),
          })
        );
      } else {
        promises = [
          fileUtils.getFromUrl({
            url: fileUtils.absoluteFileUrl(payload?.file?.pdf),
          }),
        ];
      }
      printPromise(resolve, reject, promises);
    };
    return new Promise((resolve, reject) => {
      if (!payload.inNhanh) {
        inThuong(resolve, reject);
      } else
        fetch(`${ISOFH_TOOL_HOST}/api/his/v1/in-pdf/bao-cao`, requestOptions)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            inThuong(resolve, reject);
            // resolve(s.data);
            // reject(e);
          });
    });
  },
  printPdfWithConditionInNhanh: (payload = {}) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    let isArray = Array.isArray(payload) ? true : false;
    let isInNhanhBaoCao = (isArray ? payload : [payload]).some(
      (item) => item.inNhanh
    );
    if (isInNhanhBaoCao) {
      return new Promise((resolve, reject) => {
        fetch(`${ISOFH_TOOL_HOST}/api/his/v1/in-pdf/bao-cao`, requestOptions)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            let promises = [];
            if (Array.isArray(payload)) {
              promises = payload.map((item) =>
                fileUtils.getFromUrl({
                  url: fileUtils.absoluteFileUrl(item.file?.pdf),
                })
              );
            } else {
              promises = [
                fileUtils.getFromUrl({
                  url: fileUtils.absoluteFileUrl(payload?.file?.pdf),
                }),
              ];
            }
            printPromise(resolve, reject, promises);
          });
      });
    }
    return new Promise(async (resolve, reject) => {
      const listPdfs = Array.isArray(payload)
        ? payload.map((item) => item.file?.pdf)
        : [payload?.file?.pdf];
      await printProvider.printMergePdf(listPdfs);
      resolve(true);
    });
  },
  printMergePdf: async (payload = []) => {
    if (payload?.length) {
      let pdfsToMerge = await Promise.all(
        payload?.map(async (item2) => {
          return await fileUtils
            .getFromUrl({ url: fileUtils.absoluteFileUrl(item2) })
            .then((s) => {
              const blob = new Blob([new Uint8Array(s)], {
                type: "application/pdf",
              });
              const blobUrl = window.URL.createObjectURL(blob);
              return String(blobUrl);
            })
            .catch((e) => console.log(e));
        })
      );
      const mergedPdf = await PDFDocument.create();
      for (const pdfCopyDoc of pdfsToMerge) {
        if (!pdfCopyDoc) {
          continue;
        }
        const pdfBytes = await fetch(pdfCopyDoc).then((res) =>
          res.arrayBuffer()
        );
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }
      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      printJS({
        printable: url,
        type: "pdf",
      });
      return url;
    } else return "";
  },
  getMergePdf: async (payload = []) => {
    let pdfsToMerge = await Promise.all(
      payload?.map(async (item2) => {
        if (item2.indexOf("blob") == 0) return item2;
        return await fileUtils
          .getFromUrl({ url: fileUtils.absoluteFileUrl(item2) })
          .then((s) => {
            const blob = new Blob([new Uint8Array(s)], {
              type: "application/pdf",
            });
            const blobUrl = window.URL.createObjectURL(blob);
            return String(blobUrl);
          });
      })
    );

    const mergedPdf = await PDFDocument.create();
    for (const pdfCopyDoc of pdfsToMerge) {
      const pdfBytes = await fetch(pdfCopyDoc).then((res) => res.arrayBuffer());
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }
    const mergedPdfFile = await mergedPdf.save();
    const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    return Promise.resolve(url);
  },
};

export const printJS = ({ printable, type = "pdf" }) => {
  if (detectMob()) {
    window.open(printable);
  } else {
    print({
      printable: printable,
      type,
    });
  }
};

export default printProvider;
