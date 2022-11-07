import nbToDieuTriProvider from "data-access/nb-to-dieu-tri-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import nbDichVuProvider from "data-access/nb-dich-vu-provider";
import { t } from "i18next";

export default {
  state: {
    listToDieuTri: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: {},
    listDvKt: [],
    currentToDieuTri: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getToDieuTri: ({ ...payload }) => {
      nbToDieuTriProvider
        .getNbToDieuTri(payload)
        .then((s) => {
          if (s?.code === 0) {
            dispatch.toDieuTri.updateData({ listToDieuTri: s?.data });
          }
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    getToDieuTriById: (id) => {
      nbToDieuTriProvider
        .getNbToDieuTriById(id)
        .then((s) => {
          if (s?.code === 0) {
            dispatch.toDieuTri.updateData({ currentToDieuTri: s?.data });
          }
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    onDelete: (id) => {
      return new Promise((resolve, reject) => {
        nbToDieuTriProvider
          .delete(id)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            nbToDieuTriProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật dữ liệu thành công !");
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            nbToDieuTriProvider
              .post(payload)
              .then((s) => {
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    patch: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbToDieuTriProvider
          .patch(payload)
          .then((s) => {
            message.success("Cập nhật dữ liệu thành công !");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    saoChepThuoc: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbDichVuProvider
          .saoChepThuocVT(payload)
          .then((s) => {
            if (
              Object.values(s?.data).every(
                (x) => x == null || (x && x.length == 0)
              )
            ) {
              message.error("Không tồn tại dịch vụ sao chép");
              reject();
            } else if (
              Object.values(s?.data).every((ds) =>
                (ds || []).every((x) => x.code == 0)
              )
            ) {
              message.success(
                t("quanLyNoiTru.toDieuTri.saoChepDichVuThanhCong")
              );
              resolve(s?.data);
            } else {
              const dsError = Object.values(s?.data).filter((x) => x.code != 0);

              dsError.forEach((element) => {
                message.error(
                  element?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                );
              });

              reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
