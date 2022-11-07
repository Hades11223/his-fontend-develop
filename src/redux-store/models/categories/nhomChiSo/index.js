import dmNhomChiSoProvider from "data-access/categories/dm-nhom-chi-so-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import cacheUtils from "utils/cache-utils";
import baseStore from "redux-store/models/base-store";
export default {
  ...baseStore({
    fetchProvider: dmNhomChiSoProvider,
    storeName: "nhomChiSo",
    title: "nhóm chỉ số",
    initState: {
      listNhomChiSo: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
    },
    customEffect: ({ dispatch }) => ({
      getListNhomChiSo: async (payload = {}, state) => {
        try {
          const response = await dmNhomChiSoProvider.search(payload);
          let {
            code,
            data: listNhomChiSo,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (code !== 0) throw new Error(messageInfo);

          if (page > 0 && numberOfElements === 0) {
            return dispatch.nhomChiSo.getListNhomChiSo({
              page: page - 1,
              size,
            });
          }

          return dispatch.nhomChiSo.updateData({
            listNhomChiSo,
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
        try {
          let response = {};
          if (payload.id) {
            response = await dmNhomChiSoProvider.put(payload);
            dispatch.nhomChiSo.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu nhóm chỉ số");
          } else {
            response = await dmNhomChiSoProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu nhóm chỉ số");
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          nhomChiSo: { page, size },
        } = state;
        const response = await dmNhomChiSoProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.nhomChiSo.getListNhomChiSo({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
      getAll: async ({ page = 0, size, active = true, ...payload }, state) => {
        let userId = state.auth.auth?.id;
        let list = [];
        if (!size && page == 0) {
          list = await cacheUtils.read(userId, `DATA_NHOM_CHI_SO`, [], false);
          dispatch.nhomChiSo.updateData({ listAllData: list });
        }
        return new Promise((resolve, reject) => {
          dmNhomChiSoProvider
            .search({
              page,
              size: size || 99999,
              sort: "ten,asc",
              active,
              ...payload,
            })
            .then((s) => {
              if (s?.code === 0) {
                let data = s?.data || [];
                if (JSON.stringify(data) !== JSON.stringify(list)) {
                  dispatch.nhomChiSo.updateData({ listAllData: data });
                  if (!size && page == 0)
                    cacheUtils.save(userId, `DATA_NHOM_CHI_SO`, data, false);
                }
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        });
      },
      getAllTongHop: async (
        { page = 0, size, active = true, ...payload },
        state
      ) => {
        let userId = state.auth.auth?.id;
        let list = [];
        if (!size && page == 0) {
          list = await cacheUtils.read(
            userId,
            `DATA_NHOM_CHI_SO_TONG_HOP`,
            [],
            false
          );
          dispatch.nhomChiSo.updateData({ listAllData: list });
        }
        return new Promise((resolve, reject) => {
          dmNhomChiSoProvider
            .searchTongHop({
              page,
              size: size || 99999,
              sort: "ten,asc",
              active,
              ...payload,
            })
            .then((s) => {
              if (s?.code === 0) {
                let data = s?.data || [];
                if (JSON.stringify(data) !== JSON.stringify(list)) {
                  dispatch.nhomChiSo.updateData({ listAllData: data });
                  if (!size && page == 0)
                    cacheUtils.save(
                      userId,
                      `DATA_NHOM_CHI_SO_TONG_HOP`,
                      data,
                      false
                    );
                }
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        });
      },
    }),
  }),
};
