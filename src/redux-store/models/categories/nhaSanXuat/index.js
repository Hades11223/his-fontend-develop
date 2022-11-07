import nhaSanXuatProvider from "data-access/categories/dm-nha-san-xuat-provider";
import dmDoiTacLichSuProvider from "data-access/categories/dm-doi-tac-lich-su-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listNhaSanXuat: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listNCC: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.nhaSanXuat.updateData({
        size,
        page: 0,
      });
      dispatch.nhaSanXuat.getListNhaSanXuat({ page: 0, size });
    },
    getListNhaSanXuat: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.nhaSanXuat.size || 10;
      nhaSanXuatProvider
        .search({
          page,
          size,
          ...payload,
        })
        .then((s) => {
          let dataNsx = (s?.data || []).map((item, index) => {
            item.index = page * size + index + 1;
            return item;
          });
          if (payload?.loaiNhaSanXuat === 10) {
            dispatch.nhaSanXuat.updateData({
              listNSX: dataNsx,
            });
          } else if (payload?.loaiNhaSanXuat === 20) {
            dispatch.nhaSanXuat.updateData({
              listNCC: dataNsx,
            });
          }
          return dispatch.nhaSanXuat.updateData({
            listNhaSanXuat: dataNsx,
            totalElements: s?.totalElements,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e.message.toString());
        });
    },
    getListTongHopNhaSanXuat: async (payload = {}, state) => {
      try {
        const response = await nhaSanXuatProvider.searchTongHop(payload);
        let {
          code,
          data,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;
        let dataNsx = (data || []).map((item, index) => {
          item.index = page * size + index + 1;
          return item;
        });
        if (payload?.loaiNhaSanXuat === 10) {
          dispatch.nhaSanXuat.updateData({
            listNSX: dataNsx,
          });
        } else if (payload?.loaiNhaSanXuat === 20) {
          dispatch.nhaSanXuat.updateData({
            listNCC: dataNsx,
          });
        }
        return dispatch.nhaSanXuat.updateData({
          listNhaSanXuat: dataNsx,
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
          response = await nhaSanXuatProvider.put(payload);
          dispatch.nhaSanXuat.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu đối tác!");
        } else {
          response = await nhaSanXuatProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu đối tác!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        nhaSanXuat: { page, size },
      } = state;
      const response = await nhaSanXuatProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.nhaSanXuat.getListNhaSanXuat({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getDetail: (id, state) => {
      return new Promise((resolve, reject) => {
        nhaSanXuatProvider
          .detail(id)
          .then((s) => {
            if (s?.code == 0) resolve(s?.data);
            else reject(s);
          })
          .catch((e) => {
            console.log(e);
            reject(e);
          });
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.nhaSanXuat.dataSortColumn,
        ...payload,
      };
      dispatch.nhaSanXuat.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nhaSanXuat.getListNhaSanXuat({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.nhaSanXuat.dataSearch || {}),
        ...payload,
      };
      dispatch.nhaSanXuat.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.nhaSanXuat.getListNhaSanXuat({
        page: 0,
        dataSearch,
      });
    },
    createOrEditDoiTacLichSu: async ({ id, values, isEdit }, state) => {
      let response = {};
      try {
        if (!isEdit) {
          delete values.id;
          response = await dmDoiTacLichSuProvider.create({
            id,
            params: values,
          });
        } else {
          response = await dmDoiTacLichSuProvider.update({ id, ...values });
        }
        return Promise.resolve();
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    editDoiTacLichSu: async (payload = {}, state) => {
      let response = {};
      try {
        response = await dmDoiTacLichSuProvider.update(payload);
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },

    getListLichSuThayDoi: async ({ page = 0, ...payload }, state) => {
      try {
        const response = await dmDoiTacLichSuProvider.search(payload);
        let {
          code,
          data,
          totalElements,
          pageNumber: page,
          pageSize: size,
        } = response;
        let dataLichSuThayDoi = (data || [])
          .filter((x) => x.createdAt !== x.updatedAt)
          .map((item, index) => {
            item.index = page * size + index + 1;
            return item;
          });
        dispatch.nhaSanXuat.updateData({
          listLichSuThayDoi: dataLichSuThayDoi,
        });
        return Promise.resolve({
          listLichSuThayDoi: dataLichSuThayDoi,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
  }),
};
