import nbDichVuProvider from "data-access/nb-dich-vu-provider";
import { message } from "antd";
import { LOAI_DICH_VU } from "constants/index";

export default {
  state: {
    dsDichVu: [],
    dsThuoc: [],
    dsVatTu: [],
    dsSuatAn: [],
    mau: [],
    hoaChat: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSearch: (payload, state) => {
      nbDichVuProvider
        .searchAll({
          ...payload,
        })
        .then((s) => {
          function addIndex(data) {
            return (data || []).map((item, index) => {
              item.index = index + 1;
              return item;
            });
          }
          const listData = s?.data || [];

          dispatch.dvNoiTru.updateData({
            dsDichVu: addIndex(
              listData.filter((x) =>
                [
                  LOAI_DICH_VU.KHAM,
                  LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
                  LOAI_DICH_VU.CDHA,
                  LOAI_DICH_VU.XET_NGHIEM,
                ].includes(x.loaiDichVu)
              )
            ),
            dsThuoc: addIndex(
              listData.filter((x) => x.loaiDichVu == LOAI_DICH_VU.THUOC)
            ),
            dsVatTu: addIndex(
              listData.filter((x) => x.loaiDichVu == LOAI_DICH_VU.VAT_TU)
            ),
            dsSuatAn: addIndex(
              listData.filter((x) => x.loaiDichVu == LOAI_DICH_VU.SUAT_AN)
            ),
            mau: addIndex(
              listData.filter((x) => x.loaiDichVu == LOAI_DICH_VU.CHE_PHAM_MAU)
            ),
            hoaChat: addIndex(
              listData.filter((x) => x.loaiDichVu == LOAI_DICH_VU.HOA_CHAT)
            ),
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.dvNoiTru.updateData({
            dsDichVu: [],
          });
        });
    },
  }),
};
