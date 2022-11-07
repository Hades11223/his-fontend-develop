import { cloneDeep } from "lodash";
import { message } from "antd";
import { combineSort } from "utils";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";

const initData = {
  listData: [],

  totalElements: 0,
  page: 0,
  dataSearch: {
    dsTrangThai: [30, 50, 100, 120],
    dsHuongDieuTri: [15, 50, 60],
  },
  dataSortColumn: {},
};

export default {
  state: cloneDeep(initData),
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData(state, payload = {}) {
      return { ...cloneDeep(initData), ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }) => {
      dispatch.nbRaVien.updateData({
        page: 0,
        ...rest,
      });
      dispatch.nbRaVien.onSearch({ ...rest });
    },

    searchNbRaVienByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        dataSearch: {
          ...state.nbRaVien.dataSearch,
          ...payload,
        },
      };

      dispatch.nbRaVien.updateData({
        page: 0,
        ...obj,
      });
      dispatch.nbRaVien.onSearch({ ...obj });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.nbRaVien.dataSortColumn,
        ...payload,
      };
      dispatch.nbRaVien.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nbRaVien.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.nbRaVien.updateData(newState);
      let size = payload.size || state.nbRaVien.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.nbRaVien.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.nbRaVien.dataSearch || {};

      nbDotDieuTriProvider
        .getNbRaVien({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.nbRaVien.updateData({
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
          dispatch.nbRaVien.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    dayPhieuRaVienById: (id, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .dayPhieuRaVienById(id)
          .then((s) => {
            const { code, message: messageInfo } = s;
            if (code === 0) {
              message.success("Đẩy phiếu ra viện thành công");
              resolve(s.data);
            } else {
              message.error(messageInfo.toString());
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    dayPhieuRaVien: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .dayPhieuRaVien(payload)
          .then((s) => {
            const { code, message: messageInfo } = s;
            if (code === 0) {
              message.success("Đẩy phiếu ra viện thành công");
              resolve(s.data);
            } else {
              message.error(messageInfo.toString());
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    huyPhieuRaVienById: (id, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .huyPhieuRaVienById(id)
          .then((s) => {
            const { code, message: messageInfo } = s;
            if (code === 0) {
              message.success("Hủy phiếu ra viện thành công");
              resolve(s.data);
            } else {
              message.error(messageInfo.toString());
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  }),
};
