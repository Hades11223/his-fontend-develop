import { client, signerPath, scanPath, hisPath, HOST } from "client/request";
import { combineUrlParams } from "utils";
import { getState } from "redux-store/stores";
import {
  // PATIENT_SIGN,
  // SIGN_FILE,
  // FILE,
  // SIGN,
  // SIGN_TOKEN_PDF,
  // // DOCUMENTS_SCAN,
  // // HISTORY,
  // USER,
} from "client/api";
export default {
  generateFileToSign: ({
    file,
    maBieuMau,
    maHoSo,
    chuKySo = 1,
    soPhieu,
    khoaChiDinhId,
    ngayThucHien,
  }) => {
    return new Promise((resolve, reject) => {
      const dataForm = new FormData();
      dataForm.append("maBieuMau", maBieuMau);
      dataForm.append("maHoSo", maHoSo);
      dataForm.append("chuKySo", chuKySo);
      dataForm.append("soPhieu", soPhieu);
      dataForm.append("file", file);
      dataForm.append("ngayThucHien", ngayThucHien);
      dataForm.append("khoaChiDinhId", khoaChiDinhId);

      // dataForm.append("anhKy", anhKy);
      dataForm.append("user", "hubot");
      for (const name in file) {
        dataForm.append(name, file[name]);
      }
      // client
      //   .post(`${signerPath}${PATIENT_SIGN}`, dataForm, {
      //     headers: { "Content-Type": undefined },
      //   })
      //   .then((s) => {
      //     if (s?.data?.code === 0) {
      //       resolve(s?.data);
      //     } else reject(s?.data);
      //   })
      //   .catch(reject);
    });
  },
};
