import nhomDichVuKhoCap1Provider from "data-access/categories/nhom-dich-vu-kho-cap-1-provider";
import { message } from "antd";
import { LOAI_DICH_VU } from "constants/index";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: nhomDichVuKhoCap1Provider,
    storeName: "nhomVatTu",
    title: "nhóm vật tư",
    initState: {
      listSuppliesGroup: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      _dataSearch: {
        loaiDichVu: LOAI_DICH_VU.VAT_TU,
      },
    },
    customEffect: ({ dispatch }) => ({
      getListSuppliesGroup: async (payload = {}, state) => {
        payload = { loaiDichVu: LOAI_DICH_VU.VAT_TU, ...payload };
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
            return dispatch.nhomVatTu.getListSuppliesGroup({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.nhomVatTu.updateData({
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
      getListSuppliesGroupTongHop: async (payload = {}, state) => {
        payload = { loaiDichVu: LOAI_DICH_VU.VAT_TU, ...payload };
        try {
          const response = await nhomDichVuKhoCap1Provider.searchAll(payload);
          let {
            data: listSuppliesGroup,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.nhomVatTu.getListSuppliesGroupTongHop({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.nhomVatTu.updateData({
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
        payload = { ...payload, loaiDichVu: 100 };
        let response = {};
        try {
          if (payload.id) {
            response = await nhomDichVuKhoCap1Provider.put(payload);
            dispatch.nhomVatTu.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu nhóm vật tư!");
          } else {
            response = await nhomDichVuKhoCap1Provider.post(payload);
            message.success("Thêm mới thành công dữ liệu nhóm vật tư!");
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          nhomVatTu: { page, size },
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
