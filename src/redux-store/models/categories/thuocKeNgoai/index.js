import { message } from "antd";
import thuocKeNgoaiProvider from "data-access/kho/thuoc-ke-ngoai-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import apiBase from "../../../../data-access/api-base";

export default {
  state: {
    listThuocKeNgoai: [],
    listAllThuocKeNgoai: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: thuocKeNgoaiProvider.searchAll,
      KEY_CACHE: "DATA_ALL_THUOC_KE_NGOAI",
      model: "thuocKeNgoai",
      fieldName: "ThuocKeNgoai",
    }),
    getListThuocKeNgoai: async (payload = {}, state) => {
      try {
        const response = await thuocKeNgoaiProvider.search(payload);
        let {
          data: listThuocKeNgoai,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.thuocKeNgoai.getListThuocKeNgoai({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.thuocKeNgoai.updateData({
          listThuocKeNgoai,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },

    onSizeChange: (
      { size, page = 0, fromTongHop = false, ...payload },
      state
    ) => {
      dispatch.thuocKeNgoai.updateData({
        size,
        page: page,
      });
      return dispatch.thuocKeNgoai.onSearch({
        page,
        size,
        fromTongHop,
        ...payload,
      });
    },
    onSearch: (
      {
        page = 0,
        ten,
        khoaChiDinhId,
        boChiDinhId,
        active,
        fromTongHop,
        ...payload
      },
      state
    ) => {
      let newState = { isLoading: true, page };
      dispatch.thuocKeNgoai.updateData(newState);
      let size = payload.size || state.thuocKeNgoai.size || "";
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.thuocKeNgoai.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.thuocKeNgoai.dataSearch || {};
      return new Promise((resolve, reject) => {
        thuocKeNgoaiProvider[fromTongHop ? "searchAll" : "search"]({
          page,
          size,
          sort,
          ten,
          khoaChiDinhId,
          boChiDinhId,
          active,
          ...dataSearch,
        })
          .then((s) => {
            const listThuocKeNgoai = (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            });
            dispatch.thuocKeNgoai.updateData({
              listThuocKeNgoai,
              isLoading: false,
              totalElements: s?.totalElements || 0,
              page,
              size,
            });
            resolve(listThuocKeNgoai);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.thuocKeNgoai.updateData({
              listThuocKeNgoai: [],
              isLoading: false,
            });
          });
      });
    },
    onSortChange: ({ fromTongHop, ...payload }, state) => {
      const dataSortColumn = {
        ...state.thuocKeNgoai.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.thuocKeNgoai.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.thuocKeNgoai.onSearch({
        page: 0,
        fromTongHop,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ fromTongHop, ...payload }, state) => {
      const dataSearch = {
        ...(state.thuocKeNgoai.dataSearch || {}),
        ...payload,
      };
      dispatch.thuocKeNgoai.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.thuocKeNgoai.onSearch({
        page: 0,
        fromTongHop,
        dataSearch,
      });
    },

    createOrEdit: (options = {}, state) => {
      const { turnOfErrorMessage, ...payload } = options;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            thuocKeNgoaiProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu thuốc kê ngoài!");

                let data = (state.thuocKeNgoai.listThuocKeNgoai || []).map(
                  (item) => {
                    if (item.id === s.data?.id) {
                      s.data.index = item.index;
                      return s.data;
                    }
                    return item;
                  }
                );
                dispatch.thuocKeNgoai.updateData({
                  currentItem: null,
                  listThuocKeNgoai: data,
                  dataEditDefault: {
                    ...state.thuocKeNgoai.dataEditDefault,
                    ...payload,
                  },
                });
                return resolve(s);
              })
              .catch((e) => {
                !turnOfErrorMessage &&
                  message.error(
                    e?.message == "Network Error"
                      ? "Đang cập nhật hệ thống"
                      : e?.message || "Xảy ra lỗi, vui lòng thử lại sau",
                    3
                  );
                return reject(e?.message);
              });
          } else {
            thuocKeNgoaiProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu thuốc kê ngoài!");
                dispatch.thuocKeNgoai.updateData({
                  currentItem: null,
                  dataSortColumn: {
                    createdAt: 2,
                    ...state.thuocKeNgoai.dataSortColumn,
                  },
                });
                dispatch.thuocKeNgoai.onSearch({
                  page: 0,
                });
                return resolve(s);
              })
              .catch((e) => {
                !turnOfErrorMessage &&
                  message.error(
                    e?.message == "Network Error"
                      ? "Đang cập nhật hệ thống"
                      : e?.message || "Xảy ra lỗi, vui lòng thử lại sau",
                    3
                  );
                return reject(e?.message);
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
  }),
};
