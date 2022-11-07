import cacheUtils from "utils/cache-utils";
import loaiDoiTuongProvider from "data-access/categories/dm-loai-doi-tuong-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: loaiDoiTuongProvider,
    storeName: "loaiDoiTuong",
    title: "Loại đối tượng",
    initState: {
      listLoaiDoiTuong: [],
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      dataSortColumn: {}
    },
    customEffect: ({ dispatch }) => ({
      getListAllLoaiDoiTuong: (payload = {}, state) => {
        return new Promise(async (resolve, reject) => {
          const syncTime = localStorage.getItem("TIME_RELOAD");
          let dataCache = await cacheUtils.read(
            "",
            `DATA_LOAI_DOI_TUONG_${payload.doiTuong}`,
            {},
            false
          );
          dispatch.loaiDoiTuong.updateData({
            listAllLoaiDoiTuong: dataCache?.data || [],
          });
          if (
            !dataCache.data ||
            !Number.isInteger(dataCache?.date) ||
            new Date().getTime() - dataCache.date > 600000 ||
            syncTime - dataCache.date > 0
          ) {
            loaiDoiTuongProvider
              .searchAll({ ...payload, doiTuong: payload.doiTuong })
              .then((s) => {
                let { data } = s;
                data = orderBy(data, "ten", "asc");
                cacheUtils.save(
                  "",
                  `DATA_LOAI_DOI_TUONG_${payload.doiTuong}`,
                  { data, date: new Date().getTime() },
                  false
                );
                if (JSON.stringify(data) !== JSON.stringify(dataCache.data)) {
                  dispatch.loaiDoiTuong.updateData({
                    listAllLoaiDoiTuong: data,
                  });
                }
                resolve(data || []);
              })
              .catch((e) => {
                reject([]);
              });
          } else {
            resolve(dataCache?.data || []);
          }
        });
      },
      getListLoaiDoiTuong: async (payload = {}, state) => {
        try {
          const response = await loaiDoiTuongProvider.search(payload);
          let {
            data: listLoaiDoiTuong,
            totalElements,
            message: messageInfo,
            pageNumber: page,
            pageSize: size,
            numberOfElements,
          } = response;

          if (page > 0 && numberOfElements === 0) {
            return dispatch.loaiDoiTuong.getListLoaiDoiTuong({
              ...payload,
              page: page - 1,
              size,
            });
          }

          return dispatch.loaiDoiTuong.updateData({
            listLoaiDoiTuong,
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
            response = await loaiDoiTuongProvider.put(payload);
            dispatch.loaiDoiTuong.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu loại đối tượng!");
          } else {
            response = await loaiDoiTuongProvider.post(payload);
            message.success("Thêm mới thành công dữ liệu loại đối tượng!");
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },
      onDelete: async (payload, state) => {
        const {
          loaiDoiTuong: { page, size },
        } = state;
        const response = await loaiDoiTuongProvider.delete(payload);
        const { code, message: messageInfo } = response;
        if (code === 0) {
          message.success("Xóa bản ghi thành công");
          dispatch.loaiDoiTuong.getListLoaiDoiTuong({ page, size });
        } else {
          message.error(messageInfo.toString());
        }
      },
    }),
  }),
};
