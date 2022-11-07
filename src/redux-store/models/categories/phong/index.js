import phongProvider from "data-access/categories/dm-phong-provider";
import { message } from "antd";
import apiBase from "../../../../data-access/api-base";

export default {
  state: {
    listAllPhong: [],
    listAllDefaultPhong: [],
    listRoom: [],
    totalElements: null,
    page: 0,
    size: 10,
    dataEditDefault: {},
    dataSearch: {},
    currentRoom: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: phongProvider.searchAll,
      KEY_CACHE: "DATA_ALL_PHONG",
      model: "phong",
      fieldName: "Phong",
      getKeyCache: (key, payload = {}) => {
        return key + payload.loaiPhong;
      },
    }),
    getListPhong: async (payload = {}, state) => {
      try {
        const response = await phongProvider.search(payload);
        let {
          data: listRoom,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.phong.getListPhong({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.phong.updateData({
          listRoom,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    getListPhongTongHop: async (payload = {}, state) => {
      try {
        const response = await phongProvider.searchAll(payload);
        let {
          data: listRoom,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.phong.getListPhong({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.phong.updateData({
          listRoom,
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
          response = await phongProvider.put(payload);
          dispatch.phong.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu phòng!");
        } else {
          response = await phongProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu phòng!");
        }
        return response;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        phong: { page, size },
      } = state;
      const response = await phongProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.phong.getListPhong({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getById: (payload = {}, state) => {
      phongProvider
        .getById(payload)
        .then((s) => {
          dispatch.phong.updateData({ currentRoom: s?.data });
        })
        .catch((e) => dispatch.phong.updateData({ currentRoom: {} }));
    },
    filterListAll: (
      { dsKhoaId = [] } = {},
      { phong: { listAllDefaultPhong } }
    ) => {
      dispatch.phong.updateData({
        listAllPhong: listAllDefaultPhong.filter(
          (i) => dsKhoaId?.some((j) => j === i.khoaId) || dsKhoaId?.length === 0
        ),
      });
    },
    getPhongTheoTaiKhoan: (payload = {}, state) => {
      phongProvider
        .getPhongTheoTaiKhoan(payload)
        .then((s) => {
          let data = s?.data || [];
          dispatch.phong.updateData({
            listPhongTheoTaiKhoan: data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
  }),
};
