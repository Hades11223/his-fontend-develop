import phongProvider from "data-access/categories/dm-phong-provider";
import { message } from "antd";
import khoaProvider from "data-access/categories/dm-khoa-provider";
import nhomDichVuCap2Provider from "data-access/categories/dm-nhom-dich-vu-cap2-provider";
export default {
  state: {
    listPhongChanDoan: [],
    listKhoa: [],
    listNhomDichVu: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getPhongChanDoan: (payload = {}, state, paramCheck) => {
      phongProvider
        .getPhongTheoTaiKhoan(payload)
        .then((s) => {
          let data = (s?.data || []).map((item, index) => {
            return {
              id: item.id,
              ten: `${item.ma} - ${item.ten} - ${item.toaNha} - ${item.khoa}`,
              khoaId: item?.khoaId
            };
          });
          dispatch.chanDoanHinhAnh.updateData({
            listPhongChanDoan: data,
          });
          let phongThucHienId = (data.length && data[0].id) || "";
          dispatch.dsBenhNhan.onSizeChange({
            phongThucHienId,
            size: 10,
            dataSearch: {
              dsTrangThai: paramCheck ? [25, 35, 43] : 15,
            },
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.chanDoanHinhAnh.updateData({
            listPhongChanDoan: [],
          });
          dispatch.dsBenhNhan.onSizeChange({
            size: 10,
          });
        });
    },
    getKhoaAll: (payload = {}, state) => {
      khoaProvider
        .getKhoaTheoTaiKhoan(payload)
        .then((s) => {
          let data = s?.data || [];
          dispatch.chanDoanHinhAnh.updateData({
            listKhoa: data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.chanDoanHinhAnh.updateData({
            listKhoa: [],
          });
        });
    },

    getNhomDichVuAll: (payload = {}, state) => {
      nhomDichVuCap2Provider
        .searchAll(payload)
        .then((s) => {
          let data = s?.data || [];
          dispatch.chanDoanHinhAnh.updateData({
            listNhomDichVu: data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.chanDoanHinhAnh.updateData({
            listNhomDichVu: [],
          });
        });
    },
  }),
};
