import phieuNhapXuatChiTietProvider from "data-access/kho/phieu-nhap-xuat-chi-tiet-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import moment from "moment";
import { LOAI_CHIET_KHAU } from "constants/index";

export default {
  state: {
    listPhieuNhapChiTiet: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: { active: 2 },
    dataSearch: {},
    phieuNhapXuatId: null,

    listSoLo: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }) => {
      dispatch.nhapKhoChiTiet.updateData({
        page: 0,
        dataSearch,
        ...rest,
      });
      dispatch.nhapKhoChiTiet.getListPhieuNhapChiTiet({ rest });
    },
    getListPhieuNhapChiTiet: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.nhapKhoChiTiet.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.nhapKhoChiTiet.dataSortColumn || {}
      );
      const phieuNhapXuatId =
        payload.phieuNhapXuatId || state.nhapKhoChiTiet.phieuNhapXuatId || null;
      const dataSearch =
        payload.dataSearch || state.nhapKhoChiTiet.dataSearch || {};

      return new Promise((resolve, reject) => {
        phieuNhapXuatChiTietProvider
          .search({ phieuNhapXuatId, page, size, sort, ...dataSearch })
          .then((s) => {
            let listPhieuNhapChiTiet = (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            });
            dispatch.nhapKhoChiTiet.updateData({
              listPhieuNhapChiTiet,
              totalElements: s?.totalElements || 0,
              page,
              size,
            });
            resolve(listPhieuNhapChiTiet);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
            reject(e);
          });
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.nhapKhoChiTiet.dataSearch || {}),
        ...payload,
      };
      dispatch.nhapKhoChiTiet.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.nhapKhoChiTiet.getListPhieuNhapChiTiet({
        page: 0,
        dataSearch,
      });
    },
    onDelete: async (payload, state) => {
      const {
        nhapKhoChiTiet: { page, size },
      } = state;
      const response = await phieuNhapXuatChiTietProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.nhapKhoChiTiet.getListPhieuNhapChiTiet({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            phieuNhapXuatChiTietProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu kho!");

                let data = (
                  state.nhapKhoChiTiet.listPhieuNhapChiTiet || []
                ).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.nhapKhoChiTiet.updateData({
                  currentItem: null,
                  listPhieuNhapChiTiet: data,
                });
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          } else {
            phieuNhapXuatChiTietProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu kho!");
                dispatch.nhapKhoChiTiet.updateData({ currentItem: null });
                dispatch.nhapKhoChiTiet.onSearch({
                  page: 0,
                });
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    onSortChange: ({ phieuNhapXuatId, ...payload }, state) => {
      const dataSortColumn = {
        ...state.nhapKhoChiTiet.dataSortColumn,
        ...payload,
      };
      dispatch.nhapKhoChiTiet.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nhapKhoChiTiet.onSearchDetailPhieuNhap({
        page: 0,
        dataSortColumn,
        phieuNhapXuatId,
      });
    },
    onSearchDetailPhieuNhap: ({ page = 0, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let dsNhapXuatChiTiet = [],
            promises = [];
          const listPhieuNhapChiTiet =
            await dispatch.nhapKhoChiTiet.getListPhieuNhapChiTiet({
              page,
              ...payload,
            });
          dsNhapXuatChiTiet = listPhieuNhapChiTiet?.map((item, index) => {
            if (item?.loNhap?.quyetDinhThauChiTietId) {
              promises = [
                ...promises,
                dispatch.quyetDinhThauChiTiet.getDetail(
                  item?.loNhap?.quyetDinhThauChiTietId
                ),
              ];
            }
            return {
              ...item,
              ...item?.loNhap,
              ...item?.dichVu,
              ngaySanXuat: item?.loNhap?.ngaySanXuat
                ? moment(item?.loNhap?.ngaySanXuat)
                : undefined,
              ngayHanSuDung: item?.loNhap?.ngayHanSuDung
                ? moment(item?.loNhap?.ngayHanSuDung)
                : undefined,
              id: item?.id,
              detachId:
                item?.dichVu?.ma +
                "_" +
                item?.giaNhapSauVat +
                "_" +
                item?.loNhap?.soLo +
                "_" +
                item?.dichVu?.xuatXuId,
              loaiChietKhau:
                item?.tienChietKhau == "" ||
                item?.tienChietKhau == null ||
                item?.tienChietKhau == undefined
                  ? LOAI_CHIET_KHAU.PHAN_TRAM
                  : LOAI_CHIET_KHAU.TIEN,
            };
          });
          if (promises?.length > 0) {
            let responses = await Promise.all(promises);
            responses = responses?.filter((item) => item?.id);
            dsNhapXuatChiTiet = dsNhapXuatChiTiet?.map((item, index) => {
              const chiTietThau = responses?.find(
                (item2, index2) =>
                  item2?.id == item?.quyetDinhThauChiTietId &&
                  item2?.dichVuId == item?.dichVuId
              );
              return {
                ...item,
                chiTietThau,
              };
            });
          }
          dispatch.nhapKho.updateData({
            dsNhapXuatChiTiet,
          });
          resolve(dsNhapXuatChiTiet);
        } catch (error) {
          message.error(error?.message?.toString());
          reject(error);
        }
      });
    },
    getListSoLo: (payload = {}) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatChiTietProvider
          .search({ page: 0, size: 9999, active: true, ...payload })
          .then((s) => {
            const setMap = {};
            for (let i = 0; i < s.data.length; i++) {
              setMap[s?.data[i].loNhapId] = s?.data[i].loNhap;
            }
            let listSoLo = Object.values(setMap)
              .filter((o) => o)
              .map((item) => ({
                ten: item.soLo,
                id: item.id,
              }));
            dispatch.nhapKhoChiTiet.updateData({
              listSoLo,
              totalElements: s?.totalElements || 0,
            });
            resolve(listSoLo);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
            reject(e);
          });
      });
    },
  }),
};
