import ngoaiVienProvider from "data-access/ngoai-vien-provider";
import { message } from "antd";
import { t } from "i18next";

export default {
  state: {
    listNbNgoaiVien: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSearch: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        ngoaiVienProvider
          .get({ ...payload })
          .then((s) => {
            dispatch.ngoaiVien.updateData({
              // listNbNgoaiVien: s?.data,
            });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
  }),
};
