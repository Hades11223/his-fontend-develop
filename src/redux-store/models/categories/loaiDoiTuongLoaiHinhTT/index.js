import { message } from "antd";
import loaiDoiTuongLoaiHinhTTProvider from "data-access/categories/dm-loai-doi-tuong-loai-hinh-tt-provider";

export default {
  state: {
    listLoaiHinhThanhToanCuaDoiTuong: [],
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    // uniqueKey: 0
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListLoaiDoiTuongTT: async (payload = {}, state) => {
      try {
        const response = await loaiDoiTuongLoaiHinhTTProvider.search(payload);

        dispatch.loaiDoiTuongLoaiHinhTT.updateData({
          listLoaiHinhThanhToanCuaDoiTuong: response.data,
          // uniqueKey: Math.random(),
          totalElements: response.totalElements,
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
        });
      } catch (error) {}
    },
    createOrUpdate: async (payload = {}, state) => {
      try {
        const cloneData = [
          ...state.loaiDoiTuongLoaiHinhTT.listLoaiHinhThanhToanCuaDoiTuong,
        ];
        if (payload.id) {
          const response = await loaiDoiTuongLoaiHinhTTProvider.put(payload);
          if (response.data) {
            cloneData[cloneData.findIndex((item) => item.id === payload.id)] =
              response.data;
            dispatch.loaiDoiTuongLoaiHinhTT.updateData({
              listLoaiHinhThanhToanCuaDoiTuong: cloneData,
            });
          }
        } else {
          const response = await loaiDoiTuongLoaiHinhTTProvider.post(payload);
          if (response.data)
            dispatch.loaiDoiTuongLoaiHinhTT.updateData({
              listLoaiHinhThanhToanCuaDoiTuong: [...cloneData, response.data],
            });
        }
        message.success(
          `${
            payload.id ? "Cập nhật" : "Thêm mới"
          } loại hình thanh toán thành công!`
        );
      } catch (error) {
        message.error(error.message.toString());
        dispatch.loaiDoiTuongLoaiHinhTT.getListLoaiDoiTuongTT({
          loaiDoiTuongId: payload.loaiDoiTuongId,
        });
      }
    },
  }),
};
