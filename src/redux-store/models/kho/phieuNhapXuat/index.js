import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provider";
import { message } from "antd";
import { cloneDeep, forEach, get, reject } from "lodash";
import printProvider from "data-access/print-provider";
import moment from "moment";
import nbDvThuocProvider from "data-access/nb-dv-thuoc-provider";

const initialState = {
  thongTinPhieu: {},
  nhapKhongTheoThau: false,
  dsPhieuNhapXuat: [],
};
export default {
  state: initialState,
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData: (state) => {
      return initialState;
    },
  },
  effects: (dispatch) => ({
    getDetail: (payload = {}, state) => {
      console.log("payload", payload);
      return new Promise((resolve, reject) => {
        const { id } = payload;

        phieuNhapXuatProvider
          .detail(id)
          .then((res) => {
            if (res.data) {
              const thongTinPhieu = res.data || {};
              const dsNhapXuatChiTiet = (
                thongTinPhieu.dsNhapXuatChiTiet || []
              ).map((item, index) => {
                item.index = index + 1;
                const { id, ...dichVu } = item.dichVu || {};
                return { ...item, ...dichVu };
              });
              dispatch.phieuNhapXuat.updateData({
                thongTinPhieu: thongTinPhieu,
                dsNhapXuatChiTiet,
                dsNhapXuatChiTietFull: cloneDeep(dsNhapXuatChiTiet),
              });
              resolve(res.data);
            } else {
              reject(res);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    guiDuyetPhieu: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { id, onSucess, final = () => {} } = payload;
        phieuNhapXuatProvider
          .guiDuyet(id)
          .then((res) => {
            if (res && res.code === 0) {
              message.success(payload.message || "Gửi duyệt thành công");
              dispatch.phieuNhapXuat.updateData({
                thongTinPhieu: res.data,
              });
              if (onSucess) onSucess();
            }
          })
          .catch((res) => {
            message.error(res?.message || "Xảy ra lỗi vui lòng thử lại");
          })
          .finally(final);
      });
    },
    duyetPhieu: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { id } = payload;
        phieuNhapXuatProvider
          .duyetPhieu(id)
          .then((res) => {
            if (res && res.code === 0) {
              message.success("Duyệt thành công");
              dispatch.phieuNhapXuat.updateData({
                thongTinPhieu: res.data,
              });
            }
          })
          .catch((res) => {
            message.error(res?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
    huyDuyet: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { id, lyDo } = payload;
        phieuNhapXuatProvider
          .huyDuyet({ id, lyDo })
          .then((res) => {
            if (res && res.code === 0) {
              message.success("Hủy duyệt thành công");
              dispatch.phieuNhapXuat.updateData({
                thongTinPhieu: res.data,
              });
            }
          })
          .catch((res) => {
            message.error(res?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
    tuChoiDuyet: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { id, lyDo } = payload;
        phieuNhapXuatProvider
          .tuChoiDuyet({ id, lyDo })
          .then((res) => {
            if (res && res.code === 0) {
              message.success("Hủy gửi duyệt thành công");
              dispatch.phieuNhapXuat.updateData({
                thongTinPhieu: res.data,
              });
            }
          })
          .catch((res) => {
            message.error(res?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
    xoaPhieu: (payload = {}) => {
      return new Promise((resolve, reject) => {
        const { id } = payload;
        phieuNhapXuatProvider
          .delete(id)
          .then((s) => {
            message.success("Xóa phiếu thành công!");
            resolve(s);
          })
          .catch((res) => {
            message.error(res?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
    getDataPhieuNhapDuTru: ({ id, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        const thongTinPhieu = state.phieuNhapXuat.thongTinPhieu || {};
        const { khoDoiUngId, thangDuTru, khoId, ghiChu } = thongTinPhieu;
        const { dsNhapXuatChiTiet = [] } = state.phieuNhapXuat;
        let check = await dispatch.phieuNhapDuTru.isValidData({
          khoDoiUngId,
          thangDuTru,
          khoId,
          khoDoiUngId,
        });
        if (check) {
          check = await dispatch.phieuNhapDuTru.checkSoLuongDuTru();
          if (check) {
            dispatch.phieuNhapXuat.updateData({ checkValidate: false });
            let payload = {
              loaiNhapXuat: 20,
              khoDoiUngId,
              thangDuTru,
              khoId,
              ghiChu,
              dsNhapXuatChiTiet,
            };
            if (!id) {
              payload.dsNhapXuatChiTiet = dsNhapXuatChiTiet.map((item) => ({
                dichVuId: item?.dichVuId,
                soLuongSoCap: item?.soLuongSoCapYeuCau,
                soLuongSoCapYeuCau: item?.soLuongSoCapYeuCau,
                ghiChu: item?.ghiChu,
              }));
            } else {
              payload = { ...thongTinPhieu, ...payload };
              payload.dsNhapXuatChiTiet = dsNhapXuatChiTiet.map((item) => {
                return {
                  ...item,
                  soLuongSoCap: item?.soLuongSoCapYeuCau,
                };
              });
            }
            resolve(payload);
            return;
          }
        }
        dispatch.phieuNhapXuat.updateData({ checkValidate: true });
        resolve(null);
      });
    },
    getDataPhieuXuat: ({ id, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        const thongTinPhieu = state.phieuNhapXuat.thongTinPhieu || {};
        const {
          loaiNhapXuat,
          khoDoiUngId,
          khoId,
          hinhThucNhapXuatId,
          ghiChu,
          nhaCungCapId,
          phieuNhapId,
        } = thongTinPhieu;
        if (loaiNhapXuat == 30) {
          if (!hinhThucNhapXuatId || !khoId) {
            dispatch.phieuNhapXuat.updateData({ checkValidate: true });
            resolve(null);
            return;
          }
        } else {
          if (loaiNhapXuat == 40) {
            if (!hinhThucNhapXuatId || !khoId || !nhaCungCapId) {
              dispatch.phieuNhapXuat.updateData({ checkValidate: true });
              resolve(null);
              return;
            }
          } else {
            if (loaiNhapXuat == 90) {
              if (!hinhThucNhapXuatId || !khoId) {
                dispatch.phieuNhapXuat.updateData({ checkValidate: true });
                resolve(null);
                return;
              }
            }
          }
        }

        const { dsNhapXuatChiTiet = [] } = state.phieuNhapXuat;
        let payload = {
          loaiNhapXuat,
          khoDoiUngId,
          hinhThucNhapXuatId,
          khoId,
          ghiChu,
          dsNhapXuatChiTiet,
          nhaCungCapId,
          phieuNhapId,
        };
        if (!id) {
          payload.dsNhapXuatChiTiet = dsNhapXuatChiTiet.map((item) => ({
            dichVuId: item?.dichVuId,
            soLuongSoCap: item?.soLuongSoCap,
            soLuongSoCapYeuCau: item?.soLuongSoCapYeuCau,
            ghiChu: item?.ghiChu,
          }));
        } else {
          payload = { ...thongTinPhieu, ...payload };
          payload.dsNhapXuatChiTiet = dsNhapXuatChiTiet.map((item) => {
            return {
              ...item,
              soLuongSoCap: item?.soLuongSoCap || 1,
            };
          });
        }
        resolve(payload);
      });
    },
    createOrUpdate: ({ id, guiDuyet, loaiPhieu, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let data = { nhapKho: true };
          if (loaiPhieu == 1) {
            //dự trù
            data = await dispatch.phieuNhapXuat.getDataPhieuNhapDuTru({ id });
            if (!data) {
              reject();
              return;
            }
          } else if (loaiPhieu == 3) {
            data = await dispatch.phieuNhapXuat.getDataPhieuXuat({ id });
            if (!data) {
              reject();
              return;
            }
            data.nhapKho = false;
          }
          if (!id) {
            phieuNhapXuatProvider
              .post({ ...data, ...payload })
              .then((s) => {
                if (guiDuyet) {
                  dispatch.phieuNhapXuat.guiDuyetPhieu({
                    id: s?.data?.id,
                    message: "Thêm mới và gửi duyệt thành công",
                  });
                  resolve(s?.data);
                } else {
                  message.success("Thêm mới thành công");
                  dispatch.phieuNhapXuat.updateData({
                    thongTinPhieu: s.data,
                  });
                  resolve(s?.data);
                }
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
                reject(e);
              });
          } else {
            phieuNhapXuatProvider
              .put({
                id,
                ...data,
                ...payload,
              })
              .then((s) => {
                message.success("Cập nhật thành công");
                dispatch.phieuNhapXuat.updateData({
                  thongTinPhieu: s.data,
                });
                resolve(s.data);
              })
              .catch((res) => {
                message.error(res?.message || "Xảy ra lỗi vui lòng thử lại");
                reject(res);
              });
          }
        } catch (res) {
          message.error(res?.message || "Xảy ra lỗi vui lòng thử lại");
          reject(res);
        }
      });
    },
    setEdit: ({ isEdit = false, clone = true }, state) => {
      const thongTinPhieu = state.phieuNhapXuat.thongTinPhieu || {};
      let thongTinPhieuClone = "";
      if (isEdit) {
        if (clone) thongTinPhieuClone = cloneDeep(thongTinPhieu);
        dispatch.phieuNhapXuat.updateData({
          thongTinPhieu: { ...thongTinPhieu, editMode: isEdit },
          thongTinPhieuClone,
        });
      } else {
        const thongTinPhieuClone = state.phieuNhapXuat.thongTinPhieuClone || {};
        dispatch.phieuNhapXuat.updateData({
          thongTinPhieu: { ...thongTinPhieuClone },
        });
      }
    },
    resetData: (state, payload = {}) => {
      dispatch.phieuNhapXuat.clearData();
    },
    inPhieuLinh: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { id } = payload;
        phieuNhapXuatProvider
          .inPhieuLinh({ id })
          .then((s) => {
            if (s.data) {
              if (payload.printMerge)
                printProvider.printMergePdf([s.data?.file?.pdf]);
              else printProvider.printPdf(s.data);

              resolve();
            } else {
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message)
            reject();
          });
      });
    },
    inPhieuNhapXuat: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { id, phieuNhapKho } = payload;
        phieuNhapXuatProvider
          .inPhieuNhapXuat({ id, phieuNhapKho })
          .then((s) => {
            if (s.data) {
              printProvider.printPdf(s.data);
            }
          });
      });
    },
    inPhieuTra: (id, state) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider.inPhieuLinh({ id }).then((s) => {
          if (s.data) {
            printProvider.printPdf(s.data);
          }
        });
      });
    },
    onSelectItemDuTru: ({ item }, state) => {
      const dsNhapXuatChiTiet = state.phieuNhapXuat.dsNhapXuatChiTiet || [];
      dispatch.phieuNhapXuat.updateData({
        dsNhapXuatChiTiet: [
          ...dsNhapXuatChiTiet,
          {
            ...item,
            soLuongSoCap: 0,
            index: dsNhapXuatChiTiet.length + 1,
          },
        ],
      });
    },
    onSelectItem: ({ item }, state) => {
      const dsNhapXuatChiTiet = state.phieuNhapXuat.dsNhapXuatChiTiet || [];
      dispatch.phieuNhapXuat.updateData({
        dsNhapXuatChiTiet: [
          ...dsNhapXuatChiTiet,
          {
            ...item,
            soLuong: item.soLuongKhaDung,
            index: dsNhapXuatChiTiet.length + 1,
          },
        ],
      });
    },
    onSelectMultiItem: ({ data = [] }, state) => {
      const dsNhapXuatChiTiet = state.phieuNhapXuat.dsNhapXuatChiTiet || [];
      dsNhapXuatChiTiet.forEach((item) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === item.id) {
            item.soLuongSoCapYeuCau = (item.soLuongSoCapYeuCau || 0) + 1;
            item.soLuongSoCap = item.soLuongSoCapYeuCau;
            data.splice(i, 1);
            break;
          }
        }
      });
      dispatch.phieuNhapXuat.updateData({
        dsNhapXuatChiTiet: [
          ...dsNhapXuatChiTiet,
          ...data.map((item, index) => {
            return {
              ...item,
              soLuongSoCap: 1,
              soLuongSoCapYeuCau: 1,
              index: dsNhapXuatChiTiet.length + 1 + index,
            };
          }),
        ],
      });
    },
    onRemoveItem: ({ item }, state) => {
      const thongTinPhieu = state.phieuNhapXuat.thongTinPhieu || {};
      let dsNhapXuatChiTiet = state.phieuNhapXuat.dsNhapXuatChiTiet || [];
      if ([10, 15].includes(thongTinPhieu.trangThai || 10)) {
        dsNhapXuatChiTiet = dsNhapXuatChiTiet
          .filter((it) => it.id != item?.id)
          .map((item, index) => {
            item.index = index + 1;
            return item;
          });
        dispatch.phieuNhapXuat.updateData({
          dsNhapXuatChiTiet,
        });
      }
    },
    onSizeChange: ({ dataSearch, ...rest }) => {
      dispatch.phieuNhapXuat.updateData({
        page: 0,
        dataSearch,
        ...rest,
      });
      dispatch.phieuNhapXuat.onSearch({ ...rest });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.phieuNhapXuat.dataSortColumn,
        ...payload,
      };
      dispatch.phieuNhapXuat.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.phieuNhapXuat.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onSearch: ({ page = 0, size = 20, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let timKiem = payload.dataSearch?.timKiem;
          const dataSortColumn = payload.dataSortColumn || {};
          const dsNhapXuatChiTietFull =
            state.phieuNhapXuat.dsNhapXuatChiTietFull || [];
          let dsNhapXuatChiTiet = Object.keys(dataSortColumn).length
            ? cloneDeep(dsNhapXuatChiTietFull).sort((a, b) => {
                const keys = Object.keys(dataSortColumn);
                for (let i = 0; i < keys.length; i++) {
                  const key = keys[i];
                  if (dataSortColumn[key] == 0) continue;
                  const a1 = get(a, key);
                  const b1 = get(b, key);
                  if (a1 != b1) {
                    return dataSortColumn[key] == 1 ? b1 - a1 : a1 - b1;
                  }
                }
                return 0;
              })
            : dsNhapXuatChiTietFull;

          timKiem = timKiem?.toLowerCase().createUniqueText() || "";

          dsNhapXuatChiTiet = dsNhapXuatChiTiet.filter((item) => {
            return (
              item.dichVu?.ten
                ?.toLowerCase()
                .createUniqueText()
                .indexOf(timKiem) !== -1 ||
              item.dichVu?.ma
                ?.toLowerCase()
                .createUniqueText()
                .indexOf(timKiem) !== -1
            );
          });
          const totalElements = dsNhapXuatChiTiet.length;

          dsNhapXuatChiTiet = dsNhapXuatChiTiet.slice(
            page * size,
            (page + 1) * size
          );
          dispatch.phieuNhapXuat.updateData({
            dsNhapXuatChiTiet,
            totalElements,
            page,
            size,
          });
          resolve(dsNhapXuatChiTiet);
        } catch (error) {
          message.error(error?.message?.toString());
          reject(error);
        }
      });
    },
    suaSoLuongDuyet: (id, state) => {
      return new Promise(async (resolve, reject) => {
        let data = await dispatch.phieuNhapXuat.getDataPhieuXuat({ id });
        let dsNhapXuatChiTiet = (data.dsNhapXuatChiTiet || []).map((item) => {
          return { id: item.id, soLuongSoCap: item.soLuongSoCap };
        });
        phieuNhapXuatProvider
          .suaSoLuongDuyet(id, dsNhapXuatChiTiet)
          .then((res) => {
            if (res && res.code === 0) {
              message.success("Sửa só lượng  duyệt thành công");
              dispatch.phieuNhapXuat.updateData({
                thongTinPhieu: res.data,
              });
              resolve(res?.data);
            } else {
              reject(res);
            }
          })
          .catch((res) => {
            message.error(res?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      }).catch((e) => {
        message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        reject(e);
      });
    },
    xuatPhieuNhapXuat: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { id } = payload;
        phieuNhapXuatProvider.inPhieuNhapXuat({ id }).then((s) => {
          resolve(s?.data);
        });
      });
    },
    getListPhieu: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider.search(payload).then((s) => {
          const { totalElements, page, size } = s;
          dispatch.phieuNhapXuat.updateData({
            dsPhieuNhapXuat: s.data,
            totalElements,
            page,
            size,
          });
          resolve(s?.data);
        });
      });
    },
    patch: ({ ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        const { nguoiDuyetId, thoiGianDuyet, ...rest } = payload;

        await dispatch.thuocChiTiet.updateThoiGianPhat({
          id: payload.id,
          thoiGianDuyet,
          nguoiDuyetId,
        });
        phieuNhapXuatProvider
          .patch(rest)
          .then((s) => {
            message.success("Cập nhật thành công");
            dispatch.phieuNhapXuat.updateData({
              thongTinPhieu: s.data,
            });
            resolve(s.data);
          })
          .catch((res) => {
            message.error(res?.message || "Xảy ra lỗi vui lòng thử lại");
            reject(res);
          });
      });
    },

    xoaHangHoaPhieuTra: (payload = {}) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .xoaPhieuTraKho(payload)
          .then((s) => {
            message.success("Xóa hàng hóa thành công!");
            resolve(s);
          })
          .catch((res) => {
            message.error(res?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      });
    },
    inPhieuLinhChiTiet: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { id } = payload;
        phieuNhapXuatProvider
          .inPhieuLinhChiTiet({ id })
          .then((s) => {
            if (s.data) {
              if (payload.printMerge)
                printProvider.printMergePdf([s.data?.file?.pdf]);
              else printProvider.printPdf(s.data);

              resolve();
            } else {
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message)
            reject();
          });
      });
    },
  }),
};
