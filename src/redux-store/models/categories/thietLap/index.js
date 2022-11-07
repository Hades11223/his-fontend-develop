import { message } from "antd";
import thietLapProvider from "data-access/dm-thiet-lap-provider";
import cacheUtils from "utils/cache-utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import baseStore from "redux-store/models/base-store";

export default {
  ...baseStore({
    fetchProvider: thietLapProvider,
    title: "Thiết lập chung",
    storeName: "thietLap",
    initState: {
      dataTIEU_DE_TRAI_1: "",
      dataTAI_KHOAN_BHXH: "",
      totalElements: null,
      page: PAGE_DEFAULT,
      size: PAGE_SIZE,
      dataEditDefault: {},
      dataSearch: {},
      listData: [],
      dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
      benhVien: {},
      phieuLinhTra: {},
    },
    customEffect: ({ dispatch }) => ({
      getThietLap: (payload, state) => {
        return new Promise(async (resolve, reject) => {
          const { ma, reload } = payload;
          let dataCache = await cacheUtils.read(
            "",
            `DATA_THIET_LAP_${ma}`,
            {},
            false
          );
          if (
            //Nếu dữ liệu hiện tại khác dữ liệu trong redux
            dataCache?.data !== state.thietLap[`data${ma}`]
          ) {
            console.log("cache thietLap", `data${ma}`);
            dispatch.thietLap.updateData({
              [`data${ma}`]: dataCache?.data,
            });
            resolve(dataCache?.data);
          }

          const syncTime = localStorage.getItem("TIME_RELOAD");
          if (
            reload ||
            !Number.isInteger(dataCache?.date) ||
            new Date().getTime() - dataCache.date > 600000 ||
            syncTime - dataCache.date > 0
          ) {
            thietLapProvider.getGiaTri({ ma, active: true }).then((s) => {
              if (dataCache?.data != s.data)
                dispatch.thietLap.updateData({ [`data${ma}`]: s.data });
              cacheUtils.save(
                "",
                `DATA_THIET_LAP_${ma}`,
                { data: s.data, date: new Date().getTime() },
                false
              );
              resolve(s.data);
            });
          } else resolve([]);
        });
      },
      onSizeChange: ({ size }, state) => {
        dispatch.thietLap.updateData({
          size,
          page: 0,
        });
        dispatch.thietLap.onSearch({ page: 0, size });
      },
      onSearch: ({ page = 0, ...payload }, state) => {
        let newState = { isLoading: true, page };
        dispatch.thietLap.updateData(newState);
        let size = payload.size || state.thietLap.size || 10;
        const sort = combineSort(
          payload.dataSortColumn || state.thietLap.dataSortColumn || {}
        );
        const dataSearch =
          payload.dataSearch || state.thietLap.dataSearch || {};

        thietLapProvider
          .search({ page, size, sort, ...dataSearch })
          .then((s) => {
            dispatch.thietLap.updateData({
              listData: (s?.data || []).map((item, index) => {
                item.index = page * size + index + 1;
                return item;
              }),
              isLoading: false,
              totalElements: s?.totalElements || 0,
              page,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.thietLap.updateData({
              listData: [],
              isLoading: false,
            });
          });
      },
      getNhomDichVuCap1: async (payload = {}, state) => {
        try {
          const response = await thietLapProvider.get(payload);
          let { code, data: nhomDichVuCap1, message: messageInfo } = response;
          if (code !== 0) throw new Error(messageInfo);
          return dispatch.thietLap.updateData({
            nhomDichVuCap1,
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      },

      onSortChange: ({ ...payload }, state) => {
        const dataSortColumn = {
          ...state.thietLap.dataSortColumn,
          ...payload,
        };
        dispatch.thietLap.updateData({
          page: 0,
          dataSortColumn,
        });
        dispatch.thietLap.onSearch({
          page: 0,
          dataSortColumn,
        });
      },

      onChangeInputSearch: ({ ...payload }, state) => {
        const dataSearch = {
          ...(state.thietLap.dataSearch || {}),
          ...payload,
        };
        dispatch.thietLap.updateData({
          page: 0,
          dataSearch,
        });
        dispatch.thietLap.onSearch({
          page: 0,
          dataSearch,
        });
      },

      createOrEdit: (payload = {}, state) => {
        return new Promise((resolve, reject) => {
          try {
            if (payload.id) {
              thietLapProvider
                .update(payload)
                .then((s) => {
                  message.success(
                    "Cập nhật thành công dữ liệu thiết lập chung!"
                  );

                  let data = (state.thietLap.listData || []).map((item) => {
                    if (item.id === s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  });
                  dispatch.thietLap.updateData({
                    listData: data,
                  });
                  resolve();
                })
                .catch((e) => {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
                  reject();
                });
            } else {
              thietLapProvider
                .create(payload)
                .then((s) => {
                  message.success(
                    "Thêm mới thành công dữ liệu thiết lập chung!"
                  );
                  dispatch.thietLap.onSearch({
                    page: 0,
                  });
                  resolve();
                })
                .catch((e) => {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
                  reject();
                });
            }
          } catch (err) {
            message.error(err?.message.toString());
            return Promise.reject(err);
          }
        });
      },
      getBenhVien: () => {
        thietLapProvider.getBenhVien().then((s) => {
          dispatch.thietLap.updateData({ benhVien: s.data });
        });
      },
      getPhieuLinhTra: async (payload, state) => {
        return new Promise((resolve, reject) => {
          thietLapProvider
            .getPhieuLinhTra(payload)
            .then((s) => {
              const { code, data, message: messageInfo } = s;
              if (code == 0) {
                dispatch.thietLap.updateData({ phieuLinhTra: data });
                resolve(s?.data);
              } else reject(s);
            })
            .catch((e) => {
              message.error(e?.message?.toString());
              reject(e);
            });
        });
      },
      postPhieuLinhTra: async (payload, state) => {
        return new Promise((resolve, reject) => {
          thietLapProvider
            .postPhieuLinhTra(payload)
            .then((s) => {
              const { code, data, message: messageInfo } = s;
              if (code == 0) {
                dispatch.thietLap.updateData({ phieuLinhTra: data });
                message.success(
                  "Thêm mới thành công dữ liệu thiết lập phiếu lĩnh trả"
                );
                resolve(s?.data);
              } else reject(s);
            })
            .catch((e) => {
              message.error(e?.message?.toString());
              reject(e);
            });
        });
      },
    }),
  }),
};
