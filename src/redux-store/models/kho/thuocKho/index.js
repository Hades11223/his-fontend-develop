import thuocProvider from "data-access/kho/thuoc-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { t } from "i18next";
import cacheUtils from "utils/cache-utils";
export default {
  state: {
    listThuoc: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: {},
    dataSearch: { dsKhoId: [] },
    chiTiet: true,
    dsTrangThai: [], // trạng thái tạo mới , mặc định
    dsKhoId: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }) => {
      dispatch.thuocKho.updateData({
        page: 0,
        // dataSearch: dataSearch || {},
        ...rest,
      });
      dispatch.thuocKho.getListThuoc({ ...rest });
    },
    readTrangThai: async (payload, state) => {
      let userId = state.auth.auth?.id;
      let data = await cacheUtils.read(
        userId,
        "TRANG_THAI_DON_THUOC",
        null,
        false
      );

      dispatch.thuocKho.updateData({ dsTrangThai: data });
    },
    saveTrangThai: (payload, state) => {
      let userId = state.auth.auth?.id;
      cacheUtils.save(userId, "TRANG_THAI_DON_THUOC", payload, false);
      dispatch.thuocKho.updateData({ dsTrangThai: payload });
    },
    getListThuoc: ({ page = 0, dataSortColumn, ...payload }, state) => {
      let size = payload?.size || state.thuocKho.size || 10;
      const sort = combineSort(
        dataSortColumn || state.thuocKho.dataSortColumn || {}
      );
      // const dataSearch = payload.dataSearch || state.thuocKho.dataSearch || {};
      const dsKho = state.kho.listKhoUser.map((x) => {
        return x.id;
      });
      const dataSearch = {
        maNb: state.thuocKho.maNb,
        soPhieu: state.thuocKho.soPhieu,
        nguoiDuyetId: state.thuocKho.nguoiDuyetId,
        tenNb: state.thuocKho.tenNb,
        dsTrangThai: state.thuocKho.dsTrangThai,
        maHoSo: state.thuocKho.maHoSo,
        tuThoiGianDuyet: state.thuocKho.tuThoiGianDuyet,
        denThoiGianDuyet: state.thuocKho.denThoiGianDuyet,
        tuThoiGianTaoPhieu: state.thuocKho.tuThoiGianTaoPhieu,
        denThoiGianTaoPhieu: state.thuocKho.denThoiGianTaoPhieu,
        loaiNhapXuat: state.thuocKho.loaiNhapXuat,
        ...payload,
        dsKhoId: state.thuocKho.dsKhoId.length
          ? state.thuocKho.dsKhoId
          : dsKho.length
          ? dsKho
          : [0],
      };
      for (let i in dataSearch) {
        // xóa param search bằng null hoặc không có
        if (!dataSearch[i] || dataSearch[i]?.length === 0) {
          delete dataSearch[i];
        }
      }
      thuocProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.thuocKho.updateData({
            listThuoc: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    searchThuocByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        ...payload,
      };
      dispatch.thuocKho.updateData({
        page: 0,
        ...obj,
      });
      dispatch.thuocKho.getListThuoc({ ...obj });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.thuocKho.dataSortColumn,
        ...payload,
      };
      dispatch.thuocKho.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.thuocKho.getListThuoc({
        page: 0,
        dataSortColumn,
      });
    },
    postTaoMoi: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        thuocProvider
          .post(payload)
          .then((s) => {
            dispatch.thuocChiTiet.updateData({
              infoPatient: s?.data,
              nguoiBenhId: s?.data.phieuXuatId,
            });
            return resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
    onDelete: (id) => {
      return new Promise((resolve, reject) => {
        thuocProvider
          .delete(id)
          .then((s) => {
            resolve(s);
            dispatch.thuocKho.getListThuoc({});
            message.success(t("common.xoaDuLieuThanhCong"));
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
  }),
};
