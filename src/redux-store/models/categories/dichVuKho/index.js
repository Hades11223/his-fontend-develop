import dichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT, SORT_DEFAULT_DICH_VU } from "constants/index";
import { combineSort } from "utils";
import cacheUtils from "utils/cache-utils";
import { orderBy, reject } from "lodash";
import dmMauDuLieuProvider from "data-access/dm-mau-du-lieu-provider";
import fileUtils from "utils/file-utils";
import apiBase from "data-access/api-base";

export default {
  state: {
    listDichVuKho: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: SORT_DEFAULT_DICH_VU,
    isLoading: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    searchAll: async (payload = {}, state) => {
      try {
        let listAllDichVuKho = await cacheUtils.read(
          "",
          "DATA_ALL_DICH_VU_KHO",
          [],
          false
        );
        dispatch.dichVuKho.updateData({ isLoading: true, listAllDichVuKho });
        const response = await dichVuKhoProvider.searchAll({
          ...payload,
          active: true,
        });
        let { data } = response;
        data = orderBy(data, "ten", "asc");
        if (JSON.stringify(data) !== JSON.stringify(listAllDichVuKho)) {
          cacheUtils.save("", "DATA_ALL_DICH_VU_KHO", data, false);
          return dispatch.dichVuKho.updateData({
            listAllDichVuKho: data,
            isLoading: false,
          });
        }
        return dispatch.dichVuKho.updateData({
          listAllDichVuKho,
          isLoading: false,
        });
      } catch (err) {
        dispatch.dichVuKho.updateData({ isLoading: false });
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onSizeChange: (
      { size, dataSortColumn = SORT_DEFAULT_DICH_VU, ...rest },
      state
    ) => {
      dispatch.dichVuKho.updateData({
        size,
        page: 0,
        dataSortColumn,
        ...rest,
      });
      dispatch.dichVuKho.onSearch({ page: 0, size, ...rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dichVuKho.updateData(newState);
      let size = payload.size || state.dichVuKho.size || 10;
      const loaiDichVu =
        payload.loaiDichVu || state.dichVuKho.loaiDichVu || null;
      const dataSearch = payload.dataSearch || state.dichVuKho.dataSearch || {};
      const active = payload.active || null;
      return new Promise((resolve, reject) => {
        dichVuKhoProvider
          .searchAll({
            page,
            size,
            "dichVu.loaiDichVu": loaiDichVu,
            ...dataSearch,
            active,
          })
          .then((s) => {
            dispatch.dichVuKho.updateData({
              listDichVuKho: (s?.data || []).map((item, index) => {
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
            dispatch.dichVuKho.updateData({
              listDichVuKho: [],
              isLoading: false,
            });
          });
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dichVuKho.dataSortColumn,
        ...payload,
      };
      dispatch.dichVuKho.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dichVuKho.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dichVuKho.dataSearch || {}),
        ...payload,
      };
      dispatch.dichVuKho.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dichVuKho.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        if ((payload.body || payload).id) {
          dichVuKhoProvider
            .put(payload.body || payload)
            .then((s) => {
              message.success(
                `Cập nhật thành công dữ liệu ${
                  payload.nameService || "dịch vụ"
                }!`
              );

              let data = (state.dichVuKho.listDichVuKho || []).map((item) => {
                if (item.id == s.data?.id) {
                  s.data.index = item.index;
                  return s.data;
                }
                return item;
              });
              dispatch.dichVuKho.updateData({
                currentItem: null,
                listDichVuKho: data,
              });
              resolve(s);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        } else {
          dichVuKhoProvider
            .post(payload.body || { ...payload })
            .then((s) => {
              message.success(
                `Thêm mới thành công dữ liệu ${
                  payload.nameService || "dịch vụ"
                } !`
              );
              dispatch.dichVuKho.updateData({ currentItem: null });
              dispatch.dichVuKho.onSearch({
                page: 0,
              });
              resolve(s);
            })
            .catch((e) => {
              if (e.code === 1004) {
                message.error(
                  payload.nameService
                    ? `Đã tồn tại mã ${
                        "= " + payload.body?.dichVu?.ma || ""
                      }, trong DM ${payload.nameService}!`
                    : e.message
                );
              } else {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              }
            });
        }
      });
    },
    getDetail: (id, state) => {
      return new Promise((resolve, reject) => {
        dichVuKhoProvider
          .detail(id)
          .then((data) => {
            if (data) {
              resolve(data);
            }
            reject();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    onExport: ({ id, ten }) => {
      return new Promise((resolve, reject) => {
        dmMauDuLieuProvider
          .get({ dsBang: `dm_dv_kho_${id}` })
          .then((res) => {
            if (res && res.code === 0) {
              fileUtils.downloadFile(res.data?.data, `${ten}.xlsx`);
            }
            resolve(res);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    onImport: async (payload, state) => {
      apiBase.onImport(payload, dichVuKhoProvider.import).then((res) => {
        dispatch.quyen.onSearch({});
      });
    },
  }),
};
