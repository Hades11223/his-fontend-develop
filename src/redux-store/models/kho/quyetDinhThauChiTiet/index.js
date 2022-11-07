import quyetDinhThauChiTietProvider from "data-access/kho/quyet-dinh-thau-chi-tiet-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { LOAI_CHIET_KHAU } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";

export default {
  state: {
    listQuyetDinhThauChiTiet: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},
    listDataVatTuBo: [],
    dataSortColumn: {},
    dataEditDefault: {}
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        if (payload.id) {
          quyetDinhThauChiTietProvider
            .put({ ...payload, id: payload.id })
            .then((s) => {
              if (s?.code === 0) {
                message.success("Cập nhật thành công dữ liệu quyết định thầu!");

                dispatch.quyetDinhThauChiTiet.updateData({
                  dataEditDefault: s.data,
                });
                resolve(s.data);
              } else {
                message(s?.message);
                reject(s?.data);
              }
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        } else {
          quyetDinhThauChiTietProvider
            .post(payload)
            .then((s) => {
              message.success("Thêm mới thành công dữ liệu quyết định thầu!");
              resolve(s.data);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        }
      });
    },
    onDelete: async (payload, state) => {
      const {
        quyetDinhThauChiTiet: { page, size },
      } = state;
      const response = await quyetDinhThauChiTietProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.quyetDinhThauChiTiet.onSearch({
          page,
          size,
        });
      } else {
        message.error(messageInfo.toString());
      }
    },

    onSearch: ({ page = 0, fromTongHop, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.quyetDinhThauChiTiet.updateData(newState);
      let size = payload.size || state.quyetDinhThauChiTiet.size || 10;
      const sort = combineSort(
        payload.dataSortColumn ||
          state.quyetDinhThauChiTiet.dataSortColumn ||
          {}
      );
      const dataSearch =
        payload.dataSearch || state.quyetDinhThauChiTiet.dataSearch || {};
      quyetDinhThauChiTietProvider[fromTongHop ? "searchAll" : "search"]({
        page,
        size,
        sort,
        ...dataSearch,
        nhaCungCapId: !state?.phieuNhapXuat?.thongTinPhieu?.quyetDinhThauId
          ? null
          : dataSearch.nhaCungCapId,
      })
        .then((s) => {
          dispatch.quyetDinhThauChiTiet.updateData({
            listQuyetDinhThauChiTiet: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
            size,
            dataSearch,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.quyetDinhThauChiTiet.updateData({
            listQuyetDinhThauChiTiet: [],
            isLoading: false,
            dataSearch,
          });
        });
    },

    onSortChange: ({ fromTongHop, ...payload }, state) => {
      const dataSortColumn = {
        ...state.quyetDinhThauChiTiet.dataSortColumn,
        ...payload,
      };
      dispatch.quyetDinhThauChiTiet.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.quyetDinhThauChiTiet.onSearch({
        page: 0,
        fromTongHop,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ fromTongHop, ...payload }, state) => {
      const dataSearch = {
        ...(state.quyetDinhThauChiTiet.dataSearch || {}),
        ...payload,
      };
      dispatch.quyetDinhThauChiTiet.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.quyetDinhThauChiTiet.onSearch({
        page: 0,
        fromTongHop,
        dataSearch,
      });
    },
    onSizeChange: ({ size, fromTongHop }, state) => {
      dispatch.quyetDinhThauChiTiet.updateData({
        size,
        page: 0,
      });
      dispatch.quyetDinhThauChiTiet.onSearch({
        page: 0,
        size,
        fromTongHop,
      });
    },
    getDetail: (id, state) => {
      return new Promise((resolve, reject) => {
        quyetDinhThauChiTietProvider
          .detail(id)
          .then(({ code, data, message: messageInfo }) => {
            if (code == 0) {
              resolve(data);
            } else reject(data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    addItemToList: async (data, state) => {
      try {
        const khoHienTai = state.kho.currentItem;
        const thongTinPhieu = state.phieuNhapXuat.thongTinPhieu;
        const dsNhapXuatChiTiet = state.phieuNhapXuat.dsNhapXuatChiTiet;
        let chiTietThau, nhaSanXuat, xuatXu;
        const list = await dispatch.thangSoBanLe.getListAllThangSoBanLe({});
        let vatTuCon = [];
        const res = list.filter(
          (x) =>
            x.giaNhapNhoNhat < (data?.giaNhapSauVat || 0) &&
            (data?.giaNhapSauVat || 0) < x.giaNhapLonNhat &&
            x.khoId === khoHienTai?.id
        );
        if (data?.quyetDinhThauChiTietId) {
          chiTietThau = await dispatch.quyetDinhThauChiTiet.getDetail(
            data?.quyetDinhThauChiTietId
          );
        }
        if (chiTietThau?.nhaSanXuatId) {
          nhaSanXuat = await dispatch.nhaSanXuat.getDetail(
            chiTietThau?.nhaSanXuatId
          );
        }
        if (chiTietThau?.xuatXuId) {
          xuatXu = await dispatch.xuatXu.getDetail(chiTietThau?.xuatXuId);
        }

        const nhapKhongTheoThau = state.phieuNhapXuat.nhapKhongTheoThau;
        let item = {
          ...data,
          chiTietThau,
          dichVu: chiTietThau?.dichVu || {},
          soVisa: chiTietThau?.soVisa,
          quyCach: chiTietThau?.quyCach,
          tenDuongDung: chiTietThau?.dichVu?.tenDuongDung,
          goiThau: chiTietThau?.goiThau,
          soLuongConLai: chiTietThau?.soLuongConLai,
          hamLuong: chiTietThau?.dichVu?.hamLuong,
          xuatXu,
          nhaSanXuat,
        };
        item = {
          ...item,
          detachId: stringUtils.guid(),
          loaiChietKhau: LOAI_CHIET_KHAU.PHAN_TRAM,
          loNhap: {
            giaBaoHiem:
              data?.tyLeBhTt === 0
                ? 0
                : nhapKhongTheoThau
                ? data?.giaNhapSauVat
                : data?.giaBaoHiem,
            giaNhapSauVat: data?.giaNhapSauVat,
            giaNhapTruocVat: data?.giaNhapSauVat
              ? (data.giaNhapSauVat / (1 + 5 / 100)).toFixed(2)
              : 0,
            thangSoBanLe: (!res ? 0 : res[0]?.thangSoBanLe) || 0,
            vat: 5,
            xuatXuId: data?.xuatXuId,
            giaPhuThu: data?.giaPhuThu,
            giaKhongBaoHiem:
              data?.giaNhapSauVat * (1 + (data?.thangSoBanLe || 0) / 100),
            dvtSoCapId: data.dvtSoCapId,
            nhaSanXuatId: data?.nhaSanXuatId,
            kichCoVtId: data.kichCoVtId
          },
          isFocus: true,
        };
        if (data?.dsNhapXuatChiTiet?.length) {
          vatTuCon = await dispatch.quyetDinhThauChiTiet.addItemVatTuBoToList(
            data?.dsNhapXuatChiTiet
          );
          vatTuCon = (vatTuCon || []).map((item) => {
            return {
              ...item,
              xuatXu: xuatXu,
              nhaSanXuat: nhaSanXuat,
              loNhap: {
                ...item.loNhap,
                xuatXuId: data?.xuatXuId,
                nhaSanXuatId: data?.nhaSanXuatId,
              },
            };
          });
        }
        dispatch.phieuNhapXuat.updateData({
          thongTinPhieu: {
            ...thongTinPhieu,
            quyetDinhThauId: item?.quyetDinhThauId,
            nhaCungCapId: nhapKhongTheoThau
              ? thongTinPhieu?.nhaCungCapId
              : item?.nhaCungCapId,
          },
          dsNhapXuatChiTiet: [
            ...(dsNhapXuatChiTiet?.map((item) => {
              return { ...item, isFocus: false };
            }) || []),
            { ...item, dsNhapXuatChiTiet: vatTuCon },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    },
    onSelectQDTChiTiet: (payload = {}, state) => {
      return new Promise(async (resolve, reject) => {
        const { data } = payload;
        const listQuyetDinhThau = state.quyetDinhThau.listQuyetDinhThau || [];
        const thongTinPhieu = state.phieuNhapXuat.thongTinPhieu || {};
        if (data.quyetDinhThauId && !thongTinPhieu.quyetDinhThauId) {
          let existQDT,
            ds = listQuyetDinhThau || [];
          existQDT = ds?.find((item) => item?.id === data?.quyetDinhThauId);

          if (!existQDT) {
            const res = await dispatch.quyetDinhThau.searchById({
              id: data.quyetDinhThauId,
            });
            ds = [...ds, { ...res }];
            dispatch.quyetDinhThau.updateData({ listQuyetDinhThau: ds });
          }
        }
        dispatch.quyetDinhThauChiTiet.addItemToList(data);
      });
    },

    addItemVatTuCon: async (data, state) => {
      try {
        let vatTuCon = await dispatch.quyetDinhThauChiTiet.addItemVatTuBoToList(
          data
        );
        const dsNhapXuatChiTiet = state.phieuNhapXuat.dsNhapXuatChiTiet;
        let vatTuBo = dsNhapXuatChiTiet.find(
          (x) => x.vatTuBo && x.dichVuId === vatTuCon[0].vatTuBoId
        );
        dispatch.phieuNhapXuat.updateData({
          dsNhapXuatChiTiet: [
            ...(dsNhapXuatChiTiet.filter((item) => item !== vatTuBo) || []),
            {
              ...vatTuBo,
              dsNhapXuatChiTiet: [
                ...(vatTuBo.dsNhapXuatChiTiet || []),
                ...vatTuCon,
              ],
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    },

    addItemVatTuBoToList: async (data, state) => {
      const khoHienTai = state.kho.currentItem;
      const nhapKhongTheoThau = state.phieuNhapXuat.nhapKhongTheoThau;
      const list = await dispatch.thangSoBanLe.getListAllThangSoBanLe({});
      let newData = [];
      const length = (data || []).length;
      for (let i = 0; i < length; i++) {
        const item = data[i];
        const res = list.filter(
          (x) =>
            x.giaNhapNhoNhat < (item?.giaNhapSauVat || 0) &&
            (item?.giaNhapSauVat || 0) < x.giaNhapLonNhat &&
            x.khoId === khoHienTai?.i
        );
        const chiTietThau = item?.quyetDinhThauChiTietId
          ? await dispatch.quyetDinhThauChiTiet.getDetail(
              item?.quyetDinhThauChiTietId
            )
          : null;
        const dataItem = {
          ...item,
          chiTietThau,
          dichVu: chiTietThau?.dichVu || {},
          soVisa: chiTietThau?.soVisa,
          quyCach: chiTietThau?.quyCach,
          tenDuongDung: chiTietThau?.dichVu?.tenDuongDung,
          goiThau: chiTietThau?.goiThau,
          soLuongConLai: chiTietThau?.soLuongConLai,
          hamLuong: chiTietThau?.dichVu?.hamLuong,
          detachId: stringUtils.guid(),
          loaiChietKhau: LOAI_CHIET_KHAU.PHAN_TRAM,
          loNhap: {
            giaBaoHiem:
              item?.tyLeBhTt === 0
                ? 0
                : nhapKhongTheoThau
                ? item?.giaNhapSauVat
                : item?.giaBaoHiem,
            giaNhapSauVat: item?.giaNhapSauVat,
            giaNhapTruocVat: item?.giaNhapSauVat
              ? (item?.giaNhapSauVat / (1 + 5 / 100)).toFixed(2)
              : 0,
            thangSoBanLe: (!res ? 0 : res[0]?.thangSoBanLe) || 0,
            vat: 5,
            xuatXuId: item?.xuatXuId,
            giaPhuThu: item?.giaPhuThu,
            giaKhongBaoHiem:
              item?.giaNhapSauVat * (1 + (item?.thangSoBanLe || 0) / 100),
            dvtSoCapId: item?.dvtSoCapId,
            nhaSanXuatId: item?.nhaSanXuatId,
          },
          isFocus: true,
        };
        newData.push(dataItem);
      }
      return newData;
    },

    getListVatTuBo: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.quyetDinhThauChiTiet.size || 10;
      quyetDinhThauChiTietProvider
        .search({
          page,
          size,
          ...payload,
        })
        .then((s) => {
          dispatch.quyetDinhThauChiTiet.updateData({
            listDataVatTuBo: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.quyetDinhThauChiTiet.updateData({
            listDataVatTuBo: [],
            isLoading: false,
          });
        });
    },
    createBatch: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        quyetDinhThauChiTietProvider
          .createBatch(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s.data);
            } else {
              message(s?.message);
              reject(s?.data);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
