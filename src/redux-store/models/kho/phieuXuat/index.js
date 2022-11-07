import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { cloneDeep } from "lodash";

export default {
  state: {
    listPhieuXuat: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: {},
    dataSearch: {},
    chiTiet: true,
    isTrungSoHoaDon: false,
    hoaDonBiTrung: {},
    thongTinPhieuNhap: {},

    listSoPhieu: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ page = 0, ...rest }) => {
      dispatch.phieuXuat.updateData({
        page,
        ...rest,
      });
      dispatch.phieuXuat.getListPhieuXuat({ page, ...rest });
    },
    getSoPhieuByKhoId: (payload, state) => {
      const { listPhieuXuat } = state.phieuXuat;

      const listPhieu = listPhieuXuat.filter((i) => i.khoId === payload);

      const mapSoPhieu = new Set();
      for (let i = 0; i < listPhieu?.length; i++) {
        mapSoPhieu.add(listPhieu[i]?.soPhieu);
      }

      dispatch.phieuXuat.updateData({
        listSoPhieu: Array.from(mapSoPhieu).map((item) => ({
          id: item,
          ten: item,
        })),
      });
    },
    getListPhieuXuat: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.phieuXuat.size || 10;
      const sort = combineSort(
        payload.sort
          ? { [payload.sort.key]: payload.sort.value }
          : state.phieuXuat.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.phieuXuat.dataSearch || {};

      phieuNhapXuatProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          const mapSoPhieu = new Set();
          for (let i = 0; i < s?.data?.length; i++) {
            mapSoPhieu.add(s?.data[i].soPhieu);
          }
          dispatch.phieuXuat.updateData({
            listPhieuXuat: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            listSoPhieu: Array.from(mapSoPhieu).map((item) => ({
              id: item,
              ten: item,
            })),
            listPhieuXuatSelect: s.data.map((item) => ({
              ten: item.soPhieu,
              id: item.id,
            })),
            totalElements: s?.totalElements || 0,
            page,
            size,
            sort: payload.sort,
            dataSearch,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          dispatch.phieuXuat.updateData({
            sort: payload.sort,
            dataSearch,
          });
        });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.phieuXuat.dataSearch || {}),
        ...payload,
      };
      dispatch.phieuXuat.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.phieuXuat.getListPhieuXuat({
        page: 0,
        dataSearch,
      });
    },
  }),
};
