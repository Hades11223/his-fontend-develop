import { message } from "antd";
import dvKyThuatProvider from "data-access/nb-dv-ky-thuat-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import nbDvVatTuProvider from "data-access/nb-dv-vat-tu-provider";
import nbDvThuocProvider from "data-access/nb-dv-thuoc-provider";
import nbFileTaiLen from "data-access/nb-file-tai-len-provider";
import fileProvider from "data-access/file-provider";
import nbHoSoScanProvider from "data-access/hsba/nb-ho-so-scan-provider";
import { NB_FILE_TAI_LEN } from "client/api";
import { dataPath } from "client/request";
import { t } from "i18next";
import fileUtils from "utils/file-utils";
import pdfUtils from "utils/pdf-utils";
import dmBaoCaoProvider from "data-access/categories/dm-bao-cao-provider";
export default {
  state: {
    dsDvKt: [],
    lichSuKham: [],
    listDvThuoc: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getLichSuKham: (payload = {}, state) => {
      nbDvKhamProvider
        .getDsDichVuChiDinhKham({
          size: "",
          ...payload,
        })
        .then((s) => {
          const mapObj = {};
          (s?.data || []).forEach((item) => {
            mapObj[item.maHoSo] = item;
          });

          dispatch.hoSoBenhAn.updateData({
            lichSuKham: Object.keys(mapObj).map((item) => mapObj[item]),
            selectedMaHs: Object.keys(mapObj)[0],
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    getListDichVuVatTu: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvVatTuProvider
          .searchTongHop({ ...payload, page: "", size: "" })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.hoSoBenhAn.updateData({
                listDvVatTu: data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getListDichVuThuoc: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .searchTongHop({ ...payload, size: "" })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.hoSoBenhAn.updateData({
                listDvThuoc: data,
                totalElementThuoc: data?.length,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getFileAndFolder: (payload) => {
      return new Promise((resolve, reject) => {
        nbFileTaiLen
          .search({ page: 0, size: 999, ...payload })
          .then((s) => {
            if (s.code === 0) {
              resolve(s.data);
            } else {
              reject();
              message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message);
          });
      });
    },
    deleteFileOrFolder: ({ id }) => {
      return new Promise((resolve, reject) => {
        nbFileTaiLen
          .delete(id)
          .then((s) => {
            if (s.code === 0) {
              message.success(t("common.xoaDuLieuThanhCong"));
              resolve(s.data);
            } else {
              reject();
              message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message);
          });
      });
    },
    editFileOrFolder: (payload) => {
      return new Promise((resolve, reject) => {
        nbFileTaiLen
          .patch(payload)
          .then((s) => {
            if (s.code === 0) {
              resolve(s.data);
              message.success(t("common.suaThongTinThanhCong"));
            } else {
              reject();
              message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message);
          });
      });
    },
    createFileOrFolder: (payload) => {
      return new Promise((resolve, reject) => {
        nbFileTaiLen
          .post(payload)
          .then((s) => {
            if (s.code === 0) {
              message.success(t("common.themMoiThanhCongDuLieu"));
              resolve(s.data);
            } else {
              reject();
              message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message);
          });
      });
    },
    uploadImage: ({ file }) => {
      return new Promise((resolve, reject) => {
        fileProvider
          .uploadImage({ file, api: dataPath + NB_FILE_TAI_LEN })
          .then((s) => {
            if (s.code === 0) {
              resolve(s.data);
            } else {
              message.error(s?.message);
            }
          })
          .catch((e) => {});
      });
    },
    uploadMultilImage: ({ files }) => {
      return new Promise((resolve, reject) => {
        fileProvider
          .uploadMultilImage({ files, api: dataPath + NB_FILE_TAI_LEN })
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {});
      });
    },
    imageToPdf: (image) => {
      return new Promise(async (resolve, reject) => {
        try {
          const getBase64 = (file) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                resolve(reader.result);
              };
              reader.onerror = (error) => reject(error);
            });
          };
          const fileBase64 = await getBase64(image);
          let html = `<html><body> 
            <style>
            @media print {
              .image {page-break-after: always;}
            }
            </style>    
            <div class="image"><img src="${fileBase64}" style="max-width: 100%;"/></div>      
            </body></html>`;
          let htmlPdf = await pdfUtils.htmlToPdf(html, {
            format: "A4",
            margin: {
              // top: "0px",
            },
          });
          let name = image.name.split(".");
          name = name.splice(0, name.length - 1).join("_");
          let fileUpload = await fileUtils.urltoFile(
            window.URL.createObjectURL(htmlPdf),
            `${name}.pdf`,
            "application/pdf"
          );
          resolve(fileUpload);
        } catch (error) {}
      });
    },
    uploadScan: ({ id, isPdf, file, duongDanXoa, ...payload }) => {
      return new Promise(async (resolve, reject) => {
        try {
          let files = [];
          files = file.map((item) => {
            if (item.type !== "application/pdf") {
              return dispatch.hoSoBenhAn.imageToPdf(item);
            } else {
              return item;
            }
          });
          const fileUpload = await Promise.all(files);
          if (!id) {
            const res = await dispatch.hoSoBenhAn.uploadScanFile({
              ...payload,
              file: fileUpload,
            });
            resolve(res);
          } else {
            const res = await dispatch.hoSoBenhAn.updateFileScan({
              ...payload,
              file: fileUpload,
              id,
              duongDanXoa,
            });
            resolve(res);
          }
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    },
    uploadScanFile: (payload) => {
      return new Promise((resolve, reject) => {
        nbHoSoScanProvider
          .uploadFileScan(payload)
          .then((s) => {
            resolve(s.data);
            message.success(t("common.themMoiThanhCongDuLieu"));
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    updateFileScan: (payload, state) => {
      const nhanVienThucHienId = state.auth.auth.nhanVienId;
      return new Promise((resolve, reject) => {
        nbHoSoScanProvider
          .updateFileScan({ nhanVienThucHienId, ...payload })
          .then((s) => {
            resolve(s);
            message.success(t("common.capNhatThanhCong"));
            return;
          })
          .catch((e) => {
            message.error(e?.message || t("common.capNhatKhongThanhCong"));
            reject(e);
          });
      });
    },
    getDsScan: (payload) => {
      return new Promise((resolve, reject) => {
        nbHoSoScanProvider
          .search({ loai: 50, ...payload })
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message);
          });
      });
    },
    deleteFileScan: (id) => {
      return new Promise((resolve, reject) => {
        nbHoSoScanProvider
          .delete(id)
          .then((s) => {
            resolve(s);
            message.success(t("common.xoaDuLieuThanhCong"));
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    searchDsBaoCao: async (payload, state) => {
      return new Promise((resolve, reject) => {
        dmBaoCaoProvider
          .searchTongHop(payload)
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.hoSoBenhAn.updateData({
                listPhieuScan: data,
              });
              return resolve(s);
            } else {
              return reject(s);
            }
          })
          .catch((e) => {
            return reject(e);
          });
      });
    },
  }),
};
