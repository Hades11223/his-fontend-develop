import nhanVienProvider from "data-access/categories/dm-nhan-vien-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import apiBase from "../../../../data-access/api-base";
export default {
  state: {
    listNhanVien: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listDieuDuong: [],
    listBacSi: [],
    dsKhoa: [],
  },

  reducers: {
    updateData(state, payload = {}) {
      // console.log("redux - update data", state.dsKhoa, { ...state, ...payload })
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: nhanVienProvider.searchAll,
      KEY_CACHE: "DATA_ALL_NHAN_VIEN",
      model: "nhanVien",
      fieldName: "NhanVien",
    }),
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: nhanVienProvider.searchAll,
      KEY_CACHE: "DATA_ALL_NHAN_VIEN_PTV",
      model: "nhanVien",
      fieldName: "PhauThuatVien",
    }),
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: nhanVienProvider.searchAll,
      KEY_CACHE: "DATA_ALL_NHAN_VIEN_DD",
      model: "nhanVien",
      fieldName: "DieuDuong",
    }),
    ...apiBase.initReduxGetListAll({
      dispatch,
      api: nhanVienProvider.searchAll,
      KEY_CACHE: "DATA_ALL_NHAN_VIEN_KTY",
      model: "nhanVien",
      fieldName: "KyThuatY",
    }),
    getListNhanVien: async (payload = {}, state) => {
      // console.log("redux", state.nhanVien);
      try {
        const response = await nhanVienProvider.search(payload);
        let {
          code,
          data: listNhanVien,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (code !== 0) throw new Error(messageInfo);

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nhanVien.getListNhanVien({
            page: page - 1,
            size,
          });
        }

        return dispatch.nhanVien.updateData({
          listNhanVien,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    getListNhanVienTongHop: async (payload = {}, state) => {
      try {
        const response = await nhanVienProvider.searchAll(payload);
        let {
          code,
          data: listNhanVien,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (code !== 0) throw new Error(messageInfo);

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nhanVien.getListNhanVienTongHop({
            page: page - 1,
            size,
          });
        }

        return dispatch.nhanVien.updateData({
          listNhanVien,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    getListDieuDuong: async (payload = {}, state) => {
      // console.log("payload", payload);
      try {
        const response = await nhanVienProvider.searchAll(payload);
        let {
          code,
          data: listDieuDuong,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (code !== 0) throw new Error(messageInfo);

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nhanVien.getListDieuDuong({
            page: page - 1,
            size,
          });
        }

        return dispatch.nhanVien.updateData({
          listDieuDuong,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },

    getListBacSi: async (payload = {}, state) => {
      try {
        const response = await nhanVienProvider.searchAll(payload);
        let {
          code,
          data: listBacSi,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (code !== 0) throw new Error(messageInfo);

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nhanVien.getListBacSi({
            page: page - 1,
            size,
          });
        }

        return dispatch.nhanVien.updateData({
          listBacSi,
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
      // console.log(payload);
      try {
        let response = {};
        if (payload.id) {
          response = await nhanVienProvider.put(payload);
          dispatch.nhanVien.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công!");
        } else {
          response = await nhanVienProvider.post(payload);
          dispatch.nhanVien.updateData({
            dataEditDefault: response.data,
          });
          message.success("Thêm mới thành công!");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        nhanVien: { page, size },
      } = state;
      const response = await nhanVienProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công!");
        dispatch.nhanVien.getListNhanVien({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    searchId: async (payload, state) => {
      return new Promise((resolve, reject) => {
        const { nhanVienId: id } = payload;
        nhanVienProvider
          .searchId(id)
          .then(({ code, data }) => {
            if (code == 0) {
              dispatch.nhanVien.updateData({
                nhanVienHienTai: { ...data },
                listKhoTheoNhanVien: [
                  ...(data?.dsKho?.map((i) => i?.kho) || []),
                ],
              });
              dispatch.phieuNhapDuTru.updateData({
                pnDanhSachKho: data?.dsKho?.map((i) => i?.kho),
              }); // ?.filter(k => k?.active)
              resolve(data);
            } else reject();
          })
          .catch((e) => {
            message.error(e?.message?.toString());
            reject(e);
          });
      });
    },
  }),
};
