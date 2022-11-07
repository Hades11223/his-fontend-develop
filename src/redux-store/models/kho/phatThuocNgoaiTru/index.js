import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import thuocChiTietProvider from "data-access/kho/thuoc-chi-tiet-provider";

export default {
  state: {
    listDonThuocNgoaiTru: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: { },
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ page = 0, dsKhoId, ...rest }) => {
      dispatch.phatThuocNgoaiTru.updateData({
        page,
        ...rest,
      });
      dispatch.phatThuocNgoaiTru.getListDonThuocNgoaiTru({ page, ...rest });
    },
    getListDonThuocNgoaiTru: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.phatThuocNgoaiTru.size || 10;
      const sort = combineSort(
        payload.sort
          ? { [payload.sort.key]: payload.sort.value }
          : state.phatThuocNgoaiTru.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.phatThuocNgoaiTru.dataSearch || {};

      phieuNhapXuatProvider
        .getDanhSachDonThuoc({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.phatThuocNgoaiTru.updateData({
            listDonThuocNgoaiTru: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements || 0,
            page,
            size,
            sort: payload.sort,
            dataSearch,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          dispatch.phatThuocNgoaiTru.updateData({
            sort: payload.sort,
            dataSearch,
          });
        });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.phatThuocNgoaiTru.dataSearch || {}),
        ...payload,
      };
      dispatch.phatThuocNgoaiTru.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.phatThuocNgoaiTru.getListDonThuocNgoaiTru({
        page: 0,
        dataSearch,
      });
    },
    postDuyet: ({ ...rest }, state) => {
      return new Promise((resolve, reject) => {
        thuocChiTietProvider
          .postThanhToan(rest)
          .then((s) => {
            message.success(" Phát đơn thành công");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    postHuyDuyet: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { id, lyDo } = payload;
        phieuNhapXuatProvider
          .huyDuyet({ id, lyDo })
          .then((res) => {
            if (res && res.code === 0) {
              message.success("Hủy phát đơn thành công");
            }
            resolve(res.data);
          })
          .catch((res) => {
            message.error(res?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
  }),
};
