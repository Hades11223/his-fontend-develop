import { client, dataPath } from "client/request";
import {
  DM_CHUYEN_KHOA,
  DM_KHOA,
  NB_DOT_DIEU_TRI,
  NB_THE_BAO_HIEM,
  DM_NHAN_VIEN,
  DM_BENH_VIEN,
  DM_HANG_THE,
  DM_HUONG_DAN_SU_DUNG,
  NB_DV_CLS_PT_TT,
} from "client/api";
const upload = (file, type, api) => {
  let url = "";
  if (api) {
    url = api + "/tai-len";
  } else if (type === "chuyenKhoa") {
    url += `${dataPath}${DM_CHUYEN_KHOA}/tai-len/logo`;
  } else if (type === "khoa") {
    url += `${dataPath}${DM_KHOA}/tai-len/logo`;
  } else if (type === "anhDaiDien") {
    url += `${dataPath}${NB_DOT_DIEU_TRI}/tai-len/anh-dai-dien`;
  } else if (type === "giayChuyenTuyen") {
    url += `${dataPath}${NB_THE_BAO_HIEM}/tai-len/giay-chuyen-tuyen`;
  } else if (type === "giayHenKham") {
    url += `${dataPath}${NB_THE_BAO_HIEM}/tai-len/giay-hen-kham`;
  } else if (type === "nhanVien") {
    url += `${dataPath}${DM_NHAN_VIEN}/tai-len/anh-dai-dien`;
  } else if (type === "benhVien") {
    url += `${dataPath}${DM_BENH_VIEN}/tai-len/logo`;
  } else if (type === "anhMatTruoc") {
    url += `${dataPath}${NB_DOT_DIEU_TRI}/tai-len/anh-can-cuoc`;
  } else if (type === "anhMatSau") {
    url += `${dataPath}${NB_DOT_DIEU_TRI}/tai-len/anh-can-cuoc`;
  } else if (type === "hangThe") {
    url += `${dataPath}${DM_HANG_THE}/tai-len/icon`;
  } else if (type === "anhKyNhanVien") {
    url += `${dataPath}${DM_NHAN_VIEN}/tai-len/anh-ky`;
  } else if (type === "huongDanSuDung") {
    url += `${dataPath}${DM_HUONG_DAN_SU_DUNG}/tai-len/hdsd`;
  } else if (type === "hdsdVideo") {
    url += `${dataPath}${DM_HUONG_DAN_SU_DUNG}/tai-len/video`;
  } else if (type === "giayMienCungChiTra") {
    url += `${dataPath}${NB_THE_BAO_HIEM}/tai-len/giay-mien-cung-chi-tra`;
  } else if (type === "ptttLuocDo") {
    url += `${dataPath}${NB_DV_CLS_PT_TT}/pt-tt/tai-len/luoc-do`;
  }

  const formData = new FormData();
  formData.append("file", file);
  return new Promise((resolve, reject) => {
    client
      .post(url, formData)
      .then((s) => {
        resolve(s?.data);
      })
      .catch((e) => reject(e));
  });
};
export default {
  upload,
  uploadImage: ({ file, api, type, ...payload }) => {
    return upload(file, type, api);
  },
  uploadMultilImage: ({ files, api, type, ...payload }) => {
    return new Promise((resolve, reject) => {
      let promise = [];

      files.forEach((image) => {
        const file = image.originFileObj || image;
        promise.push(upload(file, type, api));
      });
      Promise.all(promise)
        .then((s) => {
          resolve({ data: s });
        })
        .catch((e) => {
          resolve({ data: [] });
        });
    });
  },
};
