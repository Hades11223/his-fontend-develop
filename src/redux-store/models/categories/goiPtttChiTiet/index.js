import { message } from "antd";
import fetchProvider from "data-access/pttt/dm-goi-pt-tt-chi-tiet-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "goiPtttChiTiet",
    title: "gói phẫu thuật thủ thuật chi tiết",
    customEffect: ({ dispatch }) => ({
      themDvChung: (payload, state) => {
        return new Promise((resolve, reject) => {
          fetchProvider
            .batch(payload)
            .then((s) => {
              message.success("Thêm dịch vụ thành công!");
              resolve(s?.data);
            })
            .catch((e) => {
              reject(e);
            });
        });
      },
    }),
  }),
};
