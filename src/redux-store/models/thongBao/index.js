import thongBaoProvider from "data-access/nv-thong-bao-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import baseStore from "../base-store";

export default {
  ...baseStore({
    initState: {
      listThongBao: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    fetchProvider: thongBaoProvider,
    storeName: "thongBao",
    title: "Thông báo",
    customEffect: ({ dispatch }) => ({
      getListThongBao: async (payload = {}, state) => {
        const response = await thongBaoProvider.search({
          sort: "createdAt,asc",
          ...payload,
        });
        let {
          code,
          data: listThongBao,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;
        if (code !== 0) throw new Error(messageInfo);

        if (page > 0 && numberOfElements === 0) {
          return dispatch.thongBao.getListThongBao({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.thongBao.updateData({
          listThongBao,
          totalElements,
          page,
          size,
        });
      },

      searchThongBao: async (payload = {}, state) => {
        const response = await thongBaoProvider.search({
          sort: "createdAt,asc",
          ...payload,
        });
        let {
          code,
          data: listThongBao,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (code !== 0) throw new Error(messageInfo);

        if (page > 0 && numberOfElements === 0) {
          return dispatch.thongBao.getListThongBao({
            ...payload,
            page: page - 1,
            size,
          });
        }
        switch (payload.loaiThongBao) {
          case 10:
            dispatch.thongBao.updateData({
              listThongBaoKhanCap: listThongBao,
              totalElements10: totalElements,
              page,
              size,
            });
            return;
          case 20:
            let data = state.thongBao.listThongBaoHangNgay;
            dispatch.thongBao.updateData({
              listThongBaoHangNgay: payload.isLoadMore
                ? [...data, ...listThongBao]
                : listThongBao,
              totalElements20: totalElements,
              page,
              size,
            });
            return;
          case 30:
            dispatch.thongBao.updateData({
              listThongBaoThoiGianThuc: listThongBao,
              totalElements30: totalElements,
              page,
              size,
            });
            return;
          default:
            dispatch.thongBao.updateData({
              listThongBao,
              totalElements,
              page,
              size,
            });
        }
      },

      createOrEdit: async (payload = {}, state) => {
        try {
          let response = {};
          if (payload.id) {
            response = await thongBaoProvider.put(payload);
            if (response.code === 0) {
              dispatch.thongBao.updateData({
                dataEditDefault: response.data,
              });
              message.success("Cập nhật thành công dữ liệu thông báo");
            }
          } else {
            response = await thongBaoProvider.post(payload);
            if (response.code === 0) {
              message.success("Thêm mới thành công dữ liệu thông báo");
            }
          }

          const { code, message: messageInfo } = response;
          if (code !== 0) {
            message.error(messageInfo.toString());
          }
        } catch (err) {
          message.error(err.message.toString());
        }
      },
      onDelete: async (payload, state) => {
        const {
          thongBao: { page, size },
        } = state;
        const response = await thongBaoProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.thongBao.getListThongBao({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
