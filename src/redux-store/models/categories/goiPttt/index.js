import { message } from "antd";
import dmGoiPtTtChiTietProvider from "data-access/pttt/dm-goi-pt-tt-chi-tiet-provider";
import fetchProvider from "data-access/pttt/dm-goi-pt-tt-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    initState: {
      dsDichVuTrongGoi: [],
    },
    fetchProvider,
    storeName: "goiPttt",
    title: "gói phẫu thuật thủ thuật",
    customEffect: ({ dispatch }) => ({
      getDSDichVuTrongGoi: (payload, state) => {
        return new Promise((resolve, reject) => {
          dmGoiPtTtChiTietProvider
            .search({
              page: 0,
              size: "",
              ...payload,
            })
            .then((s) => {
              dispatch.goiPttt.updateData({
                dsDichVuTrongGoi: (s?.data || []).map((item, idx) => ({
                  ...item,
                  index: idx + 1,
                })),
              });
              resolve(s?.data);
            })
            .catch((e) => {
              reject(e);
            });
        });
      },

      deleteDichVuTrongGoi: (id, state) => {
        return new Promise((resolve, reject) => {
          dmGoiPtTtChiTietProvider
            .delete(id)
            .then((s) => {
              message.success("Xóa dịch vụ trong gói thành công!");
              resolve(s?.data);
            })
            .catch((e) => {
              reject(e);
            });
        });
      },

      createOrEditDvTrongGoi: (payload, state) => {
        return new Promise((resolve, reject) => {
          if (payload?.id) {
            dmGoiPtTtChiTietProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật dịch vụ trong gói thành công!");
                resolve(s?.data);
              })
              .catch((e) => {
                reject(e);
              });
          } else {
            dmGoiPtTtChiTietProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm dịch vụ vào gói thành công!");
                resolve(s?.data);
              })
              .catch((e) => {
                reject(e);
              });
          }
        });
      },
    }),
  }),
};
