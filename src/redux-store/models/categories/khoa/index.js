import khoaProvider from "data-access/categories/dm-khoa-provider";
import { message } from "antd";
import apiBase from "data-access/api-base";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: khoaProvider,
    storeName: "khoa",
    title: "Khoa",
    initState: {
      listKhoa: [],
      listAllKhoa: [],
      listDataTongHop: [],
      listKhoaTheoTaiKhoan: [],
      listAllMaTenKhoa: [],
      dataEditDefault: {},
      dataSearch: { page: 0, size: 10 },
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: khoaProvider.searchAll,
        KEY_CACHE: "DATA_ALL_KHOA",
        model: "khoa",
        fieldName: "Khoa",
        onSaveState: (data) => {
          return {
            listAllMaTenKhoa: data.map((item) => ({
              ...item,
              ten: `${item.ma} - ${item.ten}`,
            })),
          };
        },
      }),

      getListKhoa: async (payload = {}, state) => {
        const response = await khoaProvider.search({
          ...payload,
        });
        let {
          code,
          data: listKhoa,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (code !== 0) throw new Error(messageInfo);

        if (page > 0 && numberOfElements === 0) {
          return dispatch.khoa.getListKhoa({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.khoa.updateData({
          listKhoa,
          totalElements,
          page,
          size,
        });
      },
      getListKhoaTongHop: async (payload = {}, state) => {
        const response = await khoaProvider.searchAll({
          sort: "active,desc&createdAt,desc&ma,asc",
          ...payload,
        });
        let {
          code,
          data: listDataTongHop,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (code !== 0) throw new Error(messageInfo);

        if (page > 0 && numberOfElements === 0) {
          return dispatch.khoa.getListKhoaTongHop({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.khoa.updateData({
          listDataTongHop,
          totalElements,
          page,
          size,
        });
      },
      createOrEdit: async (payload = {}, state) => {
        let response = {};
        try {
          if (payload.id) {
            response = await khoaProvider.put(payload);
            dispatch.khoa.updateData({
              dataEditDefault: response.data,
            });
            message.success("C???p nh???t th??nh c??ng d??? li???u khoa!");
          } else {
            response = await khoaProvider.post(payload);
            message.success("Th??m m???i th??nh c??ng d??? li???u khoa!");
          }
          return response?.data;
        } catch (err) {
          if (payload.id) {
            message.error(
              err.message.toString() ||
                "C???p nh???t kh??ng th??nh c??ng d??? li???u khoa!"
            );
          } else {
            message.error(
              err.message.toString() ||
                "Th??m m???i kh??ng th??nh c??ng d??? li???u khoa!"
            );
          }
          return Promise.reject();
        }
      },
      onDelete: async (payload, state) => {
        const {
          khoa: { page, size },
        } = state;
        const response = await khoaProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("X??a b???n ghi th??nh c??ng");
          dispatch.khoa.getListKhoa({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },

      getKhoaTheoTaiKhoan: (payload = {}, state) => {
        khoaProvider
          .getKhoaTheoTaiKhoan(payload)
          .then((s) => {
            let data = s?.data || [];
            dispatch.khoa.updateData({
              listKhoaTheoTaiKhoan: data,
            });
          })
          .catch((e) => {
            message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
          });
      },
    }),
  }),
};
