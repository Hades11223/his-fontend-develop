import toaNhaProvider from "data-access/categories/dm-toa-nha-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { t } from "i18next";
import baseStore from "../base-store";

export default {
  ...baseStore({
    fetchProvider: toaNhaProvider,
    storeName: "toaNha",
    title: "tòa nhà",
    initState: {
      listToaNha: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      listNhaTheoTaiKhoan: [],
    },
    customEffect: ({ dispatch }) => ({
      getListToaNha: async (payload = {}, state) => {
        try {
          const response = await toaNhaProvider.search(payload);
          let {
            code,
            data: listToaNha,
            totalElements,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.toaNha.getListToaNha({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.toaNha.updateData({
            listToaNha,
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
        let response = {};
        try {
          if (payload.id) {
            response = await toaNhaProvider.put(payload);
            dispatch.toaNha.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu tòa nhà!");
          } else {
            response = await toaNhaProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu tòa nhà!");
          }
          return response?.data;
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          toaNha: { page, size },
        } = state;
        const response = await toaNhaProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.toaNha.getListToaNha({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
      getNhaTheoTaiKhoan: (payload = {}, state, paramCheck) => {
        toaNhaProvider
          .getTheoTaiKhoan(payload)
          .then((s) => {
            let data = s?.data || [];
            dispatch.toaNha.updateData({
              listNhaTheoTaiKhoan: data,
            });
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            dispatch.toaNha.updateData({
              listNhaTheoTaiKhoan: [],
            });
            dispatch.toaNha.onSizeChange({
              size: 10,
            });
          });
      },
    }),
  }),
};
