import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT, LOAI_DICH_VU } from "constants/index";
import { combineSort } from "utils";
import nbDvThuocProvider from "data-access/nb-dv-thuoc-provider";
import nbDvVatTuProvider from "data-access/nb-dv-vat-tu-provider";
import nbDvHoaChatProvider from "data-access/nb-dv-hoa-chat-provider";
import nbDvSuatAnProvider from "data-access/nb-dv-suat-an-provider";

export default {
  state: {
    listPhieuNhap: [],
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
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearPhieuNhap(state, payload = {}) {
      return { ...state, thongTinPhieuNhap: {} };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ ...rest }) => {
      dispatch.nhapKho.updateData({
        page: 0,
        ...rest,
      });
      dispatch.nhapKho.getListPhieuNhap({ rest });
    },
    getListPhieuNhap: ({ page = 0, dataSortColumn, ...payload }, state) => {
      let size = payload.size || state.nhapKho.size || 10;
      const sort = combineSort(
        dataSortColumn || state.nhapKho.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.nhapKho.dataSearch || {};
      dispatch.nhapKho.updateData({
        dataSortColumn,
      });

      phieuNhapXuatProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.nhapKho.updateData({
            listPhieuNhap: (s?.data || []).map((item, index) => {
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
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.nhapKho.dataSearch || {}),
        ...payload,
      };
      dispatch.nhapKho.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.nhapKho.getListPhieuNhap({
        page: 0,
        dataSearch,
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.nhapKho.dataSortColumn,
        ...payload,
      };
      dispatch.nhapKho.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nhapKho.getListPhieuNhap({
        page: 0,
        dataSortColumn,
      });
    },
    kiemTraSoHoaDon: (payload, state) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider
          .kiemTraSoHoaDon(payload)
          .then((s) => {
            const { code, data, _ } = s;
            dispatch.nhapKho.updateData({
              isTrungSoHoaDon: code == 0 ? false : true,
              //TODO: update hoa don bi trung
              hoaDonBiTrung: { ...data },
            });
            if (code != 0) {
              message.warning(`Trùng số hóa đơn ${payload?.soHoaDon}`);
            }
            resolve(s);
          })
          .catch((e) => {
            if (!payload.ngayHoaDon) {
              message.warning(`Trùng số hóa đơn ${payload?.soHoaDon}`);
            } else {
              message.error(e?.message?.toString());
            }
            return reject(e);
          });
      });
    },
    getAllSoHoaDon: ({ page = 0, size = 9999, ...payload }, state) => {
      const sort = combineSort(
        payload.dataSortColumn || state.nhapKho.dataSortColumn || {}
      );
      const dataSearch = { ...state.nhapKho.dataSearch, ...payload };

      phieuNhapXuatProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          const setMap = new Set();
          const dataFilter = s?.data.filter((i) => i.soHoaDon);
          for (let i = 0; i < dataFilter?.length; i++)
            setMap.add(dataFilter[i].soHoaDon);

          dispatch.nhapKho.updateData({
            listAllSoHoaDon: Array.from(setMap).map((item, index) => ({
              id: item,
              ten: item,
            })),
            totalElements: s?.totalElements || 0,
            page,
            size,
            dataSearch,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    getPhieuNhapXuat: ({ page = 0, size = 9999, ...payload }, state) => {
      const sort = combineSort(
        payload.dataSortColumn || state.nhapKho.dataSortColumn || {}
      );
      const dataSearch = { ...state.nhapKho.dataSearch, ...payload };

      phieuNhapXuatProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          const { data } = s;

          const _soHoaDon = new Set();
          const dataFilter = data.filter((i) => i.soHoaDon);
          for (let i = 0; i < dataFilter?.length; i++)
            _soHoaDon.add(dataFilter[i].soHoaDon);

          const _quyetDinhThau = {};
          for (let i = 0; i < data.length; i++) {
            _quyetDinhThau[data[i].quyetDinhThau?.id] = data[i].quyetDinhThau;
          }

          dispatch.nhapKho.updateData({
            listSoHoaDon: Array.from(_soHoaDon).map((item, index) => ({
              id: item,
              ten: item,
            })),
            listQuyetDinhThau: Object.values(_quyetDinhThau)
              .filter((o) => o)
              .map((item) => ({
                id: item.id,
                ten: item.goiThau,
              })),
            totalElements: s?.totalElements || 0,
            page,
            size,
            dataSearch,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    taoPhieuLinhBu: (payload) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider
          .taoPhieuLinhBu(payload)
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    taoPhieuTraBu: (payload) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider
          .taoPhieuTraBu(payload)
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    chinhSuaDichVuLe: ({ payload, loaiDichVu }) => {
      return new Promise(async (resolve, reject) => {
        let api = "";
        switch (loaiDichVu) {
          case LOAI_DICH_VU.THUOC:
            api = nbDvThuocProvider;
            break;
          case LOAI_DICH_VU.VAT_TU:
            api = nbDvVatTuProvider;
            break;
          case LOAI_DICH_VU.SUAT_AN:
            api = nbDvSuatAnProvider;
            break;
          default:
            break;
        }
        try {
          if (!api) reject();
          api.themThongTin(payload).then((s) => resolve(s));
        } catch (error) {
          // message.error(error?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          reject(error);
        }
      });
    },
  }),
};
