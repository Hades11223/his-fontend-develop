import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import nbPhieuThuTongHop from "data-access/nb-phieu-thu-tong-hop";
import nbPhieuThuProvider from "data-access/nb-phieu-thu-provider";
import dichVuProvider from "data-access/dich-vu-provider";
import cacheUtils from "utils/cache-utils";
import { message } from "antd";
import { PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
export default {
  state: {
    listData: [],
    chuaThanhToan: 0,
    daThanhToan: 0,
    tongSo: 0,
    totalElements: 0,
    page: PAGE_DEFAULT,
    size: 10,
    dataSearch: {},
    dataSortColumn: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getStatistical: (dataSearch) => {
      nbPhieuThuTongHop
        .getStatistical(dataSearch)
        .then((s) => {
          dispatch.danhSachPhieuThu.updateData(s.data);
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    onSizeChange: ({ size, page, dataSearch, dataSortColumn }, state) => {
      dispatch.danhSachPhieuThu.updateData({
        size,
        page: page || 0,
        dataSearch,
        dataSortColumn,
      });
      dispatch.danhSachPhieuThu.onSearch({
        page: page || 0,
        size,
        dataSearch,
        dataSortColumn,
      });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.danhSachPhieuThu.updateData(newState);
      let size = payload.size || state.danhSachPhieuThu.size;
      const sort = combineSort(
        payload.dataSortColumn || state.danhSachPhieuThu.dataSortColumn || {}
      );
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.danhSachPhieuThu?.nbDotDieuTriId;

      const dataSearch =
        payload.dataSearch || state.danhSachPhieuThu.dataSearch || {};
      return new Promise((resolve, reject) => {
        nbPhieuThuTongHop
          .search({ page, size, sort, ...dataSearch, nbDotDieuTriId })
          .then((s) => {
            dispatch.danhSachPhieuThu.updateData({
              listData: (s?.data || []).map((item, index) => {
                item.index = page * size + index + 1;
                return item;
              }),
              isLoading: false,
              totalElements: s?.totalElements || 0,
              page,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.danhSachPhieuThu.updateData({
              listData: [],
              isLoading: false,
            });
          });
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.danhSachPhieuThu.dataSortColumn,
        ...payload,
      };
      dispatch.danhSachPhieuThu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.danhSachPhieuThu.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        nbDotDieuTriId: state.danhSachPhieuThu.nbDotDieuTriId,
        ...(state.danhSachPhieuThu.dataSearch || {}),
        ...payload,
      };
      dispatch.danhSachPhieuThu.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.danhSachPhieuThu.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            nbPhieuThuTongHop
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu thuốc!");

                let data = (state.danhSachPhieuThu.listData || []).map(
                  (item) => {
                    if (item.id == s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  }
                );
                dispatch.danhSachPhieuThu.updateData({
                  currentItem: s.data,
                  listData: data,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          } else {
            nbPhieuThuTongHop
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu thuốc!");
                dispatch.danhSachPhieuThu.updateData({ currentItem: null });
                dispatch.danhSachPhieuThu.onSearch({
                  page: 0,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getAll: async ({ page = 0, size, ...payload }, state) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page == 0) {
        list = await cacheUtils.read(userId, `DATA_DS_PHIEU_THU`, [], false);
        dispatch.danhSachPhieuThu.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        nbPhieuThuTongHop
          .search({
            page,
            size: size || 99999,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                dispatch.danhSachPhieuThu.updateData({
                  listAllData: data,
                });
                if (!size && page == 0)
                  cacheUtils.save(userId, `DATA_DS_PHIEU_THU`, data, false);
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
    getPhieuInThuNgan: ({ nbDotDieuTriId, phieuThuId }) => {
      return new Promise((resolve, reject) => {
        let promises = [];
        promises.push(dichVuProvider.getNbPhieuThu({ phieuThuId }));
        if (nbDotDieuTriId) {
          promises.push(
            nbDotDieuTriProvider.getBangKeChiPhi({ nbDotDieuTriId })
          );
        }
        Promise.all(promises)
          .then((s) => {
            const listPhieu = s?.map((phieu, index) => {
              const item = phieu.data;
              item.key = item?.id;
              item.index = index + 1;
              if (Array.isArray(item?.file?.pdf)) {
                item.filePdf = item?.file?.pdf?.map((x) => x);
              } else {
                item.filePdf = [item?.file?.pdf];
              }
              return item;
            });
            // dispatch.signer.updateData({
            //   listPhieu: s?.map((phieu, index) => {
            //     const item = phieu.data;
            //     item.key = item?.id;
            //     item.index = index + 1;
            //     if (Array.isArray(item?.file?.pdf)) {
            //       item.filePdf = item?.file?.pdf?.map((x) => x);
            //     } else {
            //       item.filePdf = [item?.file?.pdf];
            //     }
            //     return item;
            //   }),
            // });
            resolve(listPhieu);
          })
          .catch((e) => {
            reject([]);
          });
      });
    },

    exportExcel: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuProvider
          .exportExcel(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  }),
};
