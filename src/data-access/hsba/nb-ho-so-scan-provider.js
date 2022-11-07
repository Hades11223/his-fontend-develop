import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_HO_SO, SCAN } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: NB_HO_SO }),
  search: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_HO_SO}`, payload))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  uploadFileScan: ({
    nbDotDieuTriId,
    baoCaoId,
    thoiGianKetQua,
    moTa,
    file,
  }) => {
    return new Promise((resolve, reject) => {
      const dataForm = new FormData();
      dataForm.append("nbDotDieuTriId", nbDotDieuTriId);
      dataForm.append("baoCaoId", baoCaoId);
      dataForm.append("thoiGianKetQua", thoiGianKetQua);
      dataForm.append("moTa", moTa);
      file.forEach((item) => {
        dataForm.append("file", item);
      });
      // dataForm.append("file", file);
      dataForm.append("user", "hubot");

      // for (const name in file) {
      // }
      client
        .post(`${dataPath}${NB_HO_SO}${SCAN}`, dataForm, {
          headers: { "Content-Type": undefined },
        })
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
          } else reject(s?.data);
        })
        .catch(reject);
    });
  },
  updateFileScan: ({
    nbDotDieuTriId,
    baoCaoId,
    thoiGianKetQua,
    moTa,
    file,
    id,
    nhanVienThucHienId,
    duongDanXoa,
  }) => {
    return new Promise((resolve, reject) => {
      const dataForm = new FormData();
      dataForm.append("nhanVienThucHienId", nhanVienThucHienId);
      dataForm.append("nbDotDieuTriId", nbDotDieuTriId);
      dataForm.append("baoCaoId", baoCaoId);
      dataForm.append("thoiGianKetQua", thoiGianKetQua);
      dataForm.append("moTa", moTa);
      file.forEach((item) => {
        dataForm.append("file", item);
      });
      duongDanXoa.forEach((item) => {
        dataForm.append("duongDanXoa", item);
      });
      // dataForm.append("file", file);
      dataForm.append("user", "hubot");

      // for (const name in file) {
      // }
      client
        .put(`${dataPath}${NB_HO_SO}${SCAN}/${id}`, dataForm, {
          headers: { "Content-Type": undefined },
        })
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
          } else reject(s?.data);
        })
        .catch(reject);
    });
  },
  deleteFileScan: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_HO_SO}${SCAN}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch(reject);
    });
  },
};
