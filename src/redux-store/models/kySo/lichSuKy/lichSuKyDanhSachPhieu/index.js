import lichSuKyDanhSachPhieuProvider from "data-access/kySo/danh-sach-phieu-cho-ky-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import fileUtils from "utils/file-utils";
import signProvider from "data-access/sign-provider";
export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: {},
    dataSearch: {},
    chiTiet: true,
    // dsTrangThai: [10], // trạng thái tạo mới , mặc định
    dsKhoId: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.lichSuKyDanhSachPhieu.updateData({
        page: 0,
        dataSearch: { ...state?.lichSuKyDanhSachPhieu?.dataSearch, ...rest },
        ...rest,
      });
      dispatch.lichSuKyDanhSachPhieu.getList({ ...rest });
    },
    getList: ({ page = 0, dataSortColumn, ...payload }, state) => {
      let size = payload?.size || state.lichSuKyDanhSachPhieu.size || 10;
      const sort = combineSort(
        dataSortColumn || state.lichSuKyDanhSachPhieu.dataSortColumn || {}
      );
      // const dataSearch = payload.dataSearch || state.lichSuKyDanhSachPhieu.dataSearch || {};
      const dataSearch = {
        ...state.lichSuKyDanhSachPhieu.dataSearch,
        ...payload,
      };
      lichSuKyDanhSachPhieuProvider
        .searchWithPhieuMoiNhat({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.lichSuKyDanhSachPhieu.updateData({
            listData: (s?.data || []).map((item, index) => {
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
    searchByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        ...payload,
      };
      dispatch.lichSuKyDanhSachPhieu.updateData({
        page: 0,
        dataSearch: { ...state?.lichSuKyDanhSachPhieu?.dataSearch, ...payload },
        ...obj,
      });
      dispatch.lichSuKyDanhSachPhieu.getList({ ...obj });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.lichSuKyDanhSachPhieu.dataSortColumn,
        ...payload,
      };
      dispatch.lichSuKyDanhSachPhieu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.lichSuKyDanhSachPhieu.getList({
        page: 0,
        dataSortColumn,
      });
    },
    getFilePdf: (payload, rootState) => {
      return new Promise((resolve, reject) => {
        fileUtils
          .getFromUrl({
            // prefix: "/api/file/v1",
            url: fileUtils.absoluteFileUrl(payload),
          })
          .then((s) => {
            const blob = new Blob([new Uint8Array(s)], {
              type: "application/pdf",
            });
            const blobUrl = window.URL.createObjectURL(blob);
            resolve(blobUrl);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    generateFileSignForPatient: (
      {
        file,
        maBieuMau,
        maHoSo,
        chuKySo = 1,
        soPhieu,
        ngayThucHien,
        khoaChiDinhId,
        ...payload
      },
      state
    ) => {
      return new Promise((resolve, reject) => {
        signProvider
          .generateFileToSign({
            file,
            maBieuMau,
            maHoSo,
            chuKySo,
            soPhieu,
            ngayThucHien,
            khoaChiDinhId,
          })
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
