import nbDichVuXN from "data-access/nb-dv-xet-nghiem-provider";
import phongProvider from "data-access/categories/dm-phong-provider";
import { message } from "antd";
import { t } from "i18next";

export default {
  state: {
    listNoiLayBenhPham: [],
    listNbTiepTheo: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getPhongLayMau: (payload = {}, state, paramCheck) => {
      phongProvider
        .getPhongTheoTaiKhoan(payload)
        .then((s) => {
          let data = s?.data || [];
          dispatch.xetNghiem.updateData({
            listNoiLayBenhPham: data,
          });
        })
        .catch((e) => {
          message.error(
            e?.message || t("common.xayRaLoiVuiLongThuLaiSau")
          );
          dispatch.xetNghiem.updateData({
            listNoiLayBenhPham: [],
          });
          dispatch.nbXetNghiem.onSizeChange({
            size: 10,
          });
        });
    },
    updateKetQuaXetNghiem: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .updateXN(payload)
          .then((res) => {
            message.success(
              t("xetNghiem.capNhatKetQuaThanhCong")
            );
            resolve(res?.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getDsNguoiBenhQms: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .getDsNguoiBenhQms(payload)
          .then((s) => {
            let data = s?.data || [];
            dispatch.xetNghiem.updateData({
              listNbTiepTheo: data,
            });
          })
          .catch((e) => {
            message.error(
              e?.message || t("common.xayRaLoiVuiLongThuLaiSau")
            );
          });
      });
    },
  }),
};
