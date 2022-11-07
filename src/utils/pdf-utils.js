import { PDF_HOST } from "client/request";
import { GENERATE_PDF, GET_EXTERNAL_PDF } from "client/api";
import axios from "axios";
import { PDFDocument } from "pdf-lib";

export default {
  htmlToPdf: (html, options = {}) => {
    return new Promise((resolve, reject) => {
      let urlPdf = PDF_HOST;
      // let urlPdf = "http://localhost:2200";
      const client = axios.create({
        timeout: 240000,
        headers: {
          "Content-Type": "application/json",
        },
      });
      client
        .request({
          url: `${urlPdf}/${GENERATE_PDF}`,
          responseType: "blob",
          method: "post",
          timeout: 1000 * 300, // Wait for 5 seconds
          data: {
            html: html,
            options: options,
          },
        })
        .then((response) => resolve(response.data))
        .catch((e) => {
          reject(e);
        });
    });
  },
  mergePdf: (urls) => {
    return new Promise(async (resolve, reject) => {
      try {
        const mergedPdf = await PDFDocument.create();
        for (const pdfCopyDoc of urls) {
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
        resolve(window.URL.createObjectURL(blob));
      } catch (error) {
        resolve(null);
      }
    });
  },
  getExtenalPdfUrl: (url) => {
    return `${PDF_HOST}/${GET_EXTERNAL_PDF}?url=${encodeURIComponent(url)}`;
  },
};
