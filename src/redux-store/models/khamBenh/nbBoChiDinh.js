import nbBoChiDinhProvider from "data-access/nb-bo-chi-dinh-provider";
import nbDichVuProvider from "data-access/nb-dich-vu-provider";
import { message } from "antd";
import { t } from "i18next";

export default {
  state: {
    dsGoiDichVu: [],
    dsDichVu: [],

    totalElements: 0,
    page: 0,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    getListGoiDichVu: (payload) => {
      return new Promise((resolve, reject) => {
        nbBoChiDinhProvider
          .getGoiDichVu({ ...payload, size: "" })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.nbBoChiDinh.updateData({
                dsGoiDichVu: data,
              });
              resolve(s);
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

    deleteGoiDichVu: (id) => {
      return new Promise((resolve, reject) => {
        nbBoChiDinhProvider
          .delete(id)
          .then((s) => {
            if (s?.data.every((x) => x.code === 0)) {
              message.success("Xóa thành công gói dịch vụ");
            } else {
              const listTenDvTrangThaiKhac = (s?.data || [])
                .filter((x) => x.code == 7804)
                .map((x) => x.nbDichVu?.dichVu?.ten);

              listTenDvTrangThaiKhac.length > 0 &&
                message.error(
                  `${[...new Set(listTenDvTrangThaiKhac)].join(
                    ", "
                  )} đang ở trạng thái khác Chờ tiếp nhận/ Chờ tiếp đón/ Bỏ qua. Không được phép xóa` ||
                    t("common.xayRaLoiVuiLongThuLaiSau")
                );

              const listTenDvDaThanhToan = (s?.data || [])
                .filter((x) => x.code == 7608)
                .map((x) => x.nbDichVu?.dichVu?.ten);

              listTenDvDaThanhToan.length > 0 &&
                message.error(
                  `${[...new Set(listTenDvDaThanhToan)].join(
                    ", "
                  )} đã được thanh toán. Không thể xóa dịch vụ` ||
                    t("common.xayRaLoiVuiLongThuLaiSau")
                );
            }

            if (s?.data.some((x) => x.code === 0)) {
              resolve(s);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },

    getListDichVuTrongGoi: (payload, state) => {
      return new Promise((resolve, reject) => {
        let size = payload.size || state.nbBoChiDinh.size || 10;
        let page = payload.page || 0;

        nbDichVuProvider
          .searchTongHop({ ...payload, size, page })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.nbBoChiDinh.updateData({
                dsDichVu: data,
                totalElements: s?.totalElements || 0,
                page: payload.page,
                size: size,
              });
              resolve(s);
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
