import nhomDichVuKhoCap1Provider from "data-access/categories/nhom-dich-vu-kho-cap-1-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT, LOAI_DICH_VU } from "constants/index";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: nhomDichVuKhoCap1Provider,
    storeName: "nhomHoatChat",
    title: "nhóm hóa chất",
    initState: {
      listSuppliesGroup: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      _dataSearch: {
        loaiDichVu: LOAI_DICH_VU.HOA_CHAT,
      },
    },
    customEffect: ({ dispatch }) => ({
      getListSuppliesGroup: async (payload = {}, state) => {
        payload = { ...payload };
        try {
          const response = await nhomDichVuKhoCap1Provider.search(payload);
          let {
            data: listSuppliesGroup,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.nhomHoatChat.getListSuppliesGroup({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.nhomHoatChat.updateData({
            listSuppliesGroup,
            totalElements,
            page,
            size,
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      createOrEdit: async (payload = {}, state) => {
        payload = { ...payload, loaiDichVu: 110 };
        let response = {};
        try {
          if (payload.id) {
            response = await nhomDichVuKhoCap1Provider.put(payload);
            dispatch.nhomHoatChat.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu nhóm hóa chất!");
          } else {
            response = await nhomDichVuKhoCap1Provider.post(payload);
            message.success("Thêm mới thành công dữ liệu nhóm hóa chất!");
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          nhomHoatChat: { page, size },
        } = state;
        const response = await nhomDichVuKhoCap1Provider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.thoiGianCapCuu.getListSuppliesGroup({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
