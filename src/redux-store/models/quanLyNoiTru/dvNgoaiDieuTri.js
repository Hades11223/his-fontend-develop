import nbDichVuProvider from "data-access/nb-dich-vu-provider";
import nbDvNgoaiDieuTriProvider from "data-access/nb-dv-ngoai-dieu-tri-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import dmPhongThucHienProvider from "data-access/categories/dm-phong-thuc-hien-provider";

export default {
  state: {
    listDvNgoaiDieuTri: [],
    listChooseDv: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},

    dsDvNgoaiDieuTri: [],
    dataSortColumn: {},
    dsPhongThucHien: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.dvNgoaiDieuTri.updateData({
        page: 0,
        ...rest,
      });
      dispatch.dvNgoaiDieuTri.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dvNgoaiDieuTri.updateData(newState);
      let size = payload.size || state.dvNgoaiDieuTri.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.dvNgoaiDieuTri.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dvNgoaiDieuTri.dataSearch || {};

      nbDichVuProvider
        .searchAll({
          page,
          size,
          sort,
          loaiDichVu: 60,
          // dsChiDinhTuLoaiDichVu: 200,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.dvNgoaiDieuTri.updateData({
            listDvNgoaiDieuTri: (s?.data || []).map((item, index) => {
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
          dispatch.dvNgoaiDieuTri.updateData({
            listDvNgoaiDieuTri: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dvNgoaiDieuTri.dataSortColumn,
        ...payload,
      };
      dispatch.dvNgoaiDieuTri.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dvNgoaiDieuTri.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dvNgoaiDieuTri.dataSearch || {}),
        ...payload,
      };
      dispatch.dvNgoaiDieuTri.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dvNgoaiDieuTri.onSearch({
        page: 0,
        dataSearch,
      });
    },

    updateNgoaiDieuTri: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvNgoaiDieuTriProvider
          .patchDVNgoaiDieuTri(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success("Chỉnh sửa thành công");
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    deleteDvNgoaiDieuTri: (id) => {
      return new Promise((resolve, reject) => {
        nbDvNgoaiDieuTriProvider
          .onDeleteDichVu({ id })
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              message.success("Xóa thành công");
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    getDsPhongTheoDv: (payload) => {
      return new Promise((resolve, reject) => {
        dmPhongThucHienProvider
          .getDanhSachPhong(payload)
          .then((s) => {
            dispatch.dvNgoaiDieuTri.updateData({
              dsPhongThucHien: (s?.data || []).map((x) => ({
                ...x,
                id: x.phongId,
                ten: x.ten,
              })),
            });
            resolve(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    getPhieuChiDinhTheoDv: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvNgoaiDieuTriProvider
          .getPhieuChiDinhTheoDv(payload)
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  }),
};
