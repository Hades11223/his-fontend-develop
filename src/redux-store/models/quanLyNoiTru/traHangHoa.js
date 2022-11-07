import { message } from "antd";
import { LOAI_DICH_VU } from "constants/index";
import nbDvThuocProvider from "data-access/nb-dv-thuoc-provider";
import nbDvVatTuProvider from "data-access/nb-dv-vat-tu-provider";
import { t } from "i18next";

export default {
  state: {
    listHangHoaTra: [],
    loaiHangHoa: LOAI_DICH_VU.THUOC,
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListHangHoa: (payload, state) => {
      const loaiHangHoa = payload?.loaiHangHoa || state.traHangHoa.loaiHangHoa;

      if (loaiHangHoa == LOAI_DICH_VU.THUOC)
        return new Promise((resolve, reject) => {
          nbDvThuocProvider
            .searchTongHop({
              nbDotDieuTriId: payload.nbDotDieuTriId,
            })
            .then((s) => {
              dispatch.traHangHoa.updateData({
                listHangHoaTra: (s?.data || []).map((item, index) => {
                  item.index = index + 1;
                  return item;
                }),
                loaiHangHoa,
              });
              resolve(s);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              dispatch.traHangHoa.updateData({
                listData: [],
              });
              reject(e);
            });
        });

      if (loaiHangHoa == LOAI_DICH_VU.VAT_TU)
        return new Promise((resolve, reject) => {
          nbDvVatTuProvider
            .searchTongHop({
              nbDotDieuTriId: payload.nbDotDieuTriId,
            })
            .then((s) => {
              dispatch.traHangHoa.updateData({
                listHangHoaTra: (s?.data || []).map((item, index) => {
                  item.index = index + 1;
                  item.tenDichVu = item.ten || "";
                  item.dsTra = item.dsTra || [];
                  return item;
                }),
                loaiHangHoa,
              });

              resolve(s);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              dispatch.traHangHoa.updateData({
                listData: [],
              });
              reject(e);
            });
        });
    },

    postDsDvThuocTraKhoTatCa: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .postDsDvThuocTraKhoTatCa(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success(s?.message || t("common.themMoiThanhCongDuLieu"));
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
  }),
};
