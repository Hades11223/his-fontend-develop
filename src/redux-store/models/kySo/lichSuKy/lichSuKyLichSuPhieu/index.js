import lichSuKyLichSuPhieuProvider from "data-access/kySo/danh-sach-phieu-cho-ky-provider";
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
      dispatch.lichSuKyLichSuPhieu.updateData({
        page: 0,
        dataSearch: { ...state?.lichSuKyLichSuPhieu?.dataSearch, ...rest },
        ...rest,
      });
      dispatch.lichSuKyLichSuPhieu.getList({ ...rest });
    },
    getList: ({ page = 0, dataSortColumn, ...payload }, state) => {
      let size = payload?.size || state.lichSuKyLichSuPhieu.size || 10;
      const sort = combineSort(
        dataSortColumn || state.lichSuKyLichSuPhieu.dataSortColumn || {}
      );
      // const dataSearch = payload.dataSearch || state.lichSuKyLichSuPhieu.dataSearch || {};
      const dataSearch = {
        ...state.lichSuKyLichSuPhieu.dataSearch,
        ...payload,
      };
      lichSuKyLichSuPhieuProvider
        .searchWithPhieuMoiNhat({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.lichSuKyLichSuPhieu.updateData({
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
      dispatch.lichSuKyLichSuPhieu.updateData({
        page: 0,
        dataSearch: { ...state?.lichSuKyLichSuPhieu?.dataSearch, ...payload },
        ...obj,
      });
      dispatch.lichSuKyLichSuPhieu.getList({ ...obj });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.lichSuKyLichSuPhieu.dataSortColumn,
        ...payload,
      };
      dispatch.lichSuKyLichSuPhieu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.lichSuKyLichSuPhieu.getList({
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
    sign: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        lichSuKyLichSuPhieuProvider
          .sign(payload)
          .then((s) => {
            console.log("s: ", s);
            return resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
  }),
};
