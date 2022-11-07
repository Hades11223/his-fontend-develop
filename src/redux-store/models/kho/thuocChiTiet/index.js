import thuocChiTietProvider from "data-access/kho/thuoc-chi-tiet-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import tonKhoProvider from "data-access/kho/kho-ton-kho-provider";
import danhSachPhuongThucTtProvider from "data-access/categories/dm-phuong-thuc-tt-provider";
import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provider";
import { message } from "antd";
import printProvider from "data-access/print-provider";
import nbDvThuocProvider from "data-access/nb-dv-thuoc-provider";
import { combineSort } from "utils";
import moment from "moment";
import { cloneDeep } from "lodash";
import stringUtils from "mainam-react-native-string-utils";
const initData = {
  infoPatient: { dsThuoc: [] },
  isAdvised: false,
  nguoiBenhId: null,
  dsThuocEdit: [],
  selectedDonThuoc: [],
  listAllDichVuTonKho: [],
  page: PAGE_DEFAULT,
  size: PAGE_SIZE,
  dataSearch: {},
  totalElements: null,
  // search table
  pageDvSearch: PAGE_DEFAULT,
  sizeDvSearch: PAGE_SIZE,
  totalElementsDvSearch: null,

  dsThuocTamThoi: [],
  dataSearchModal: {},
};
export default {
  state: cloneDeep(initData),
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData(state, payload = {}) {
      return { ...cloneDeep(initData), ...payload };
      // return {};
    },
  },
  effects: (dispatch) => ({
    searchDonThuoc: async (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          thuocChiTietProvider
            .searchDonThuoc(payload)
            .then((s) => {
              if (s?.code === 0) {
                (s?.data.dsThuoc || []).forEach((item, index) => {
                  // item.index = page * size + index + 1;
                  item.index = index + 1;
                  return item;
                });
                dispatch.thuocChiTiet.updateData({
                  infoPatient: s?.data,
                  nguoiBenhId: payload,
                });
                // message.success("Thêm mới thành công dữ liệu đơn thuốc");
                resolve(s?.data);
              }
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
            });
          // }
        } catch (error) {
          message.error(error?.message.toString());
          return Promise.reject(error);
        }
      });
    },
    onSearch: async (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          thuocChiTietProvider
            .searchAll(payload)
            .then((s) => {
              if (s?.code === 0) {
                // dispatch.thuocChiTiet.updateData({
                //   infoPatient: s?.data
                // })
                // message.success("Thêm mới thành công dữ liệu đơn thuốc");
                resolve(s?.data);
              }
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
            });
          // }
        } catch (error) {
          message.error(error?.message.toString());
          return Promise.reject(error);
        }
      });
    },
    onSaveDsThuoc: ({ statusDelete = false, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        try {
          thuocChiTietProvider
            .put(payload)
            .then((s) => {
              if (s?.code === 0) {
                // if (statusDelete) {
                (s?.data.dsThuoc || []).forEach((item, index) => {
                  // item.index = page * size + index + 1;
                  item.index = index + 1;
                  return item;
                });
                dispatch.thuocChiTiet.updateData({
                  infoPatient: s?.data,
                });
                // }
                // message.success("Cập nhật thành công dữ liệu đơn thuốc");
                return resolve(s?.data);
              } else {
                message.error(s?.message || "Xảy ra lỗi vui lòng thử lại sau");
                reject(s?.message || "Xảy ra lỗi vui lòng thử lại sau");
              }
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
              reject(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
            });
          // }
        } catch (error) {
          message.error(error?.message.toString());
          return Promise.reject(error);
        }
      });
    },
    onSaveVangLai: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        const {
          themMoiThuoc: { nbDotDieuTri, thangTuoi, tuoi, ngaySinh, phieuXuat },
          thuocChiTiet: { dsThuocEdit, dsPhuongThucTt },
        } = state;
        const {
          themMoiThuoc: {
            createOrEdit,
            updateData: updateDataThemMoiThuoc,
            clearData,
          },
          thuocChiTiet: { updateData },
        } = dispatch;
        let objCustom = {
          nbDotDieuTri: {
            ...nbDotDieuTri,
            tuoi: tuoi,
            ngaySinh: ngaySinh?.date
              ? moment(ngaySinh?.date).toISOString()
              : null,
          },
          // nbDotDieuTri,
          // ngaySinh: ngaySinh?.date ? moment(ngaySinh?.date).toISOString() : null,
          // soDienThoai,
          // tenNb,
          thangTuoi,
          // tuoi,
          khoId: state.thuocChiTiet.khoId,
          dsThuoc: dsThuocEdit,
          phieuXuat: {
            ...phieuXuat,
            ghiChu: state?.ghiChu,
          },
        };
        if (!phieuXuat?.dsBacSiNgoaiVienId && !phieuXuat?.bacSiChiDinhId) {
          message.error(
            "Vui lòng chọn Bác sĩ ngoại viện hoặc Bác sĩ chỉ định!"
          );
          reject();
          return;
        }
        try {
          let res = await createOrEdit(objCustom);

          if (res.phieuXuatId) {
            clearData({
              dsPhuongThucTt,
            });
            updateDataThemMoiThuoc({
              nbDotDieuTri: {
                nbDiaChi: {
                  quocGiaId: 1,
                  quocTichId: 1,
                },
              },
            });
          }
          updateData({ dsThuocTamThoi: [] });
          resolve(res.phieuXuatId);
        } catch (e) {
          reject(e);
        }
      });
    },
    onSaveDonThuoc: (
      { isThemMoi, history, isVangLai, ...payload } = {},
      state
    ) => {
      return new Promise(async (resolve, reject) => {
        const {
          thuocChiTiet: { onSaveVangLai, onSaveDsThuoc, updateData },
        } = dispatch;

        const {
          thuocChiTiet: { infoPatient, dsThuocEdit, isAdvised, nguoiBenhId },
        } = state;
        let thanMoreSoLuongKhaDung = infoPatient?.dsThuoc?.some(
          (item, index) => {
            return (
              dsThuocEdit[index]?.nbDichVu?.soLuong >
              (item?.nbDvKho?.soLuongKhaDung || 0) +
                (item?.nbDichVu?.soLuong || 0)
            );
          }
        );
        if (thanMoreSoLuongKhaDung) {
          message.error("Không thể thêm số lượng > số lượng khả dụng");
          reject();
          return;
        }
        if (isThemMoi) {
          onSaveVangLai()
            .then((id) => {
              history.push(`/nha-thuoc/chi-tiet/${id}`);
              resolve(id);
            })
            .catch((e) => {
              reject(e);
            });
        } else if (isAdvised) {
          let res = await onSaveDsThuoc({
            id: nguoiBenhId,
            dsThuoc: dsThuocEdit,
          });
          if (res) {
            message.success("Cập nhật thành công dữ liệu dịch vụ");
            resolve(res);
          } else {
            reject();
          }
        } else if (isVangLai) {
          let res = await onSaveDsThuoc({
            id: nguoiBenhId,
            dsThuoc: dsThuocEdit,
            phieuXuat: {
              dsBacSiNgoaiVienId: infoPatient?.phieuXuat?.dsBacSiNgoaiVienId,
            },
          });
          if (res) {
            message.success("Cập nhật thành công dữ liệu dịch vụ");
            resolve(res);
          } else {
            reject();
          }
        } else {
          resolve();
        }
        updateData({ isAdvised: false });
      });
    },
    onAddThuocVaoDon: ({ isThemMoi, thuoc = {}, ...payload } = {}, state) => {
      return new Promise((resolve, reject) => {
        const { dsThuocTamThoi, dsThuocEdit, nguoiBenhId } = state.thuocChiTiet;
        // chức năng này nếu search ra 1 thì sẽ thêm vào luôn
        if (isThemMoi) {
          const { listSelectedKeys } = payload;

          let _key = stringUtils.guid();
          if (listSelectedKeys) {
            while (listSelectedKeys.includes(_key)) {
              _key = stringUtils.guid();
            }
          }
          // người bệnh thêm mới , lưu bảng tạm , custom lại dữ liệu giống với chi tiết trả về
          let obj = {
            key: _key,
            index: dsThuocTamThoi.length + 1,
            nbDichVu: {
              dichVuId: thuoc.dichVuId,
              soLuong: null,
              giaKhongBaoHiem: thuoc.giaKhongBaoHiem,
              dichVu: {
                ...thuoc,
              },
            },
            nbDvKho: {
              soLuongKhaDung: thuoc.soLuongKhaDung,
            },
          };
          let objGuiDi = {
            id: null,
            nbDichVu: {
              dichVuId: thuoc.dichVuId,
              soLuong: 0,
            },
          };
          dispatch.thuocChiTiet.updateData({
            dsThuocTamThoi: [...dsThuocTamThoi, obj],
            dsThuocEdit: [...dsThuocEdit, objGuiDi],
          });
          resolve(obj.key);
        } else {
          //thêm mới thuốc vào đơn thuốc đã tạo trước đó thì cần gọi api để lưu luôn đơn thuốc
          let obj = {
            id: null,
            nbDichVu: {
              dichVuId: thuoc.dichVuId,
              soLuong: 0, // sửa theo chuyên viên Oanh Tran , luôn để số lượng là 0
              // soLuong: thuoc.soLuongKhaDung,
            },
          };
          dispatch.thuocChiTiet
            .onSaveDsThuoc({
              id: nguoiBenhId,
              dsThuoc: [...dsThuocEdit, obj],
            })
            .then((s) => {
              resolve(s?.dsThuoc?.[s?.dsThuoc?.length - 1]?.id);
            });
        }
      });
    },
    onRemoveThuocTrongDon: ({ isThemMoi, id, index }, state) => {
      const { dsThuocEdit, nguoiBenhId, dsThuocTamThoi } = state.thuocChiTiet;
      if (isThemMoi) {
        dsThuocEdit.splice(index, 1);
        dsThuocTamThoi.splice(index, 1);
        dispatch.thuocChiTiet.updateData({
          dsThuocEdit: [...dsThuocEdit],
          dsThuocTamThoi: [...dsThuocTamThoi],
        });
      } else {
        const itemDeleteIndex = dsThuocEdit.findIndex((item) => item.id === id);
        if (itemDeleteIndex >= 0) {
          dsThuocEdit.splice(itemDeleteIndex, 1);
          dispatch.thuocChiTiet.onSaveDsThuoc({
            id: nguoiBenhId,
            dsThuoc: dsThuocEdit,
            statusDelete: true,
          });
        }
      }
    },
    onSearchAllDichVuTonKho: (
      { page = 0, dataSortColumnModal, ...payload },
      state
    ) => {
      let size = payload?.size || state.thuocChiTiet.size || 10;
      const sort = combineSort(dataSortColumnModal || {});
      return new Promise(async (resolve, reject) => {
        tonKhoProvider
          .searchAll({ page, size, sort, ...payload })
          .then(async (s) => {
            const { data: listAllDichVuTonKho } = s;
            dispatch.thuocChiTiet.updateData({
              listAllDichVuTonKho: listAllDichVuTonKho.map((item, index) => {
                item.index = page * size + index + 1;
                return item;
              }),
              isLoading: false,
              totalElements: s?.totalElements || 0,
              page: page,
              size: size,
            });
            resolve(s?.data || []);
          })
          .catch((e) => {
            message.error(e?.message?.toString());
            dispatch.thuocChiTiet.updateData({
              listAllDichVuTonKho: [],
              isLoading: false,
            });
            reject(e);
          });
      });
    },

    getPhuongThucTT: (payload) => {
      danhSachPhuongThucTtProvider
        .search(payload)
        .then((s) => {
          dispatch.thuocChiTiet.updateData({
            dsPhuongThucTt: s.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    postThanhToan: ({ ...rest }, state) => {
      return new Promise((resolve, reject) => {
        thuocChiTietProvider
          .postThanhToan(rest)
          .then((s) => {
            message.success("Thanh toán đơn thuốc thành công");
            let cloneInfoPatient = { ...state.thuocChiTiet.infoPatient };
            cloneInfoPatient.phieuXuat = s?.data;
            cloneInfoPatient.phieuThu.thanhToan = true; // BE chỉ trả về phiếu xuất

            dispatch.thuocChiTiet.searchDonThuoc(
              state.thuocChiTiet.nguoiBenhId
            );

            // dispatch.thuocChiTiet.updateData({
            //   infoPatient: cloneInfoPatient || {},
            // });

            // dispatch.danhSachPhieuThu.onSearch({
            //   dataSearch: { nbDotDieuTriId },
            // });

            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    updateGhiChuDonThuocById: ({ ...rest }, state) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider
          .updateGhiChuDonThuocById(rest)
          .then((s) => {
            message.success("Cập nhật ghi chú thành công");
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    inDonThuoc: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider.getDonChiDinh({ ...payload }).then((s) => {
          if (s.data) {
            printProvider.printMergePdf(s.data.map((item) => item?.file?.pdf));
          }
        });
      });
    },
    inPhieuThuNhaThuoc: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { id } = payload;
        phieuNhapXuatProvider.getPhieuThuNhaThuoc({ id }).then((s) => {
          if (s.data) {
            printProvider.printPdf(s.data);
          }
        });
      });
    },
    postHuyDuyet: ({ ...rest }, state) => {
      return new Promise((resolve, reject) => {
        thuocChiTietProvider
          .postHuyDuyet(rest)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    postHuyThanhToan: ({ ...rest }, state) => {
      return new Promise((resolve, reject) => {
        thuocChiTietProvider
          .postHuyThanhToan(rest)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    deleteDonThuoc: (id, state) => {
      return new Promise((resolve, reject) => {
        thuocChiTietProvider
          .delete(id)
          .then((s) => {
            message.success("Xóa thành công");
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getDsNb: ({ phieuLinhId, page = 0, size = 500, ...rest } = {}, state) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .searchTongHop({
            phieuLinhId,
            page,
            size,
            ...rest,
          })
          .then((s) => {
            if (s && s.code === 0 && s.data) {
              const {
                totalElements: totalElementNb,
                page: pageNb,
                size: sizeNb,
              } = s;

              dispatch.thuocChiTiet.updateData({
                totalElementNb,
                pageNb,
                sizeNb,
                listNb: s.data,
              });
            }
          });
      });
    },
    updateThoiGianPhat: ({ ...rest }, state) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider
          .thoiGianPhat(rest)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
