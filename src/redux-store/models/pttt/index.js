import { message } from "antd";
import { LOAI_DICH_VU, PAGE_DEFAULT, PAGE_SIZE } from "constants/index";
import nbDvCdhaProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import { combineSort } from "utils";
import { t } from "i18next";
import moment from "moment";
import nbDvXetNghiemProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";

export default {
  state: {
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},
    listData: [],
    dataSortColumn: {},
    listDsPttt: [],
    listDashboardPttt: [],
    paramTheoTrangThai: {},
    dataDetail: {},
    dataDetailDefault: {},
    disabledSave: true,
    disabledSave2: true,
    nhomDichVuCap1Id: null,
    thongTinNguoiThucHien: {},
    thongTinNguoiThucHienDefault: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: (payload, state) => {
      dispatch.pttt.updateData({
        page: 0,
        ...payload,
      });
      dispatch.pttt.onSearch(payload);
    },
    onSearch: ({ page = 0, param, ...payload }, state) => {
      let size = payload.size || state.pttt.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.pttt.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.pttt.dataSearch || {};
      console.log(dataSearch);

      nbDvCdhaProvider
        .getDsPttt({
          page,
          size,
          sort,
          ...dataSearch,
          loaiThoiGian: payload.loaiThoiGian,
          tuThoiGian: payload.tuThoiGian,
          denThoiGian: payload.denThoiGian,
          ...(param ? param : {}),
          // dsPhongThucHienId: payload.dsPhongThucHienId,
        })
        .then((s) => {
          dispatch.pttt.updateData(
            param
              ? {
                  isLoading: true,
                  listFilter: (s?.data || []).map((item, index) => {
                    item.index = page * size + index + 1;
                    return item;
                  }),
                }
              : {
                  isLoading: true,
                  listDsPttt: (s?.data || []).map((item, index) => {
                    item.index = page * size + index + 1;
                    return item;
                  }),
                  isLoading: false,
                  totalElements: s?.totalElements || 0,
                  page,
                  size,
                  dataSearch,
                }
          );
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.pttt.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.pttt.dataSortColumn,
        ...payload,
      };
      dispatch.pttt.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.pttt.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.pttt.dataSearch || {}),
        ...payload,
      };
      dispatch.pttt.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.pttt.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getDashboard: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .getDashboard(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              dispatch.pttt.updateData({
                data: s.data,
              });
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    getDashboardTheoTrangThai: (payload = {}, state) => {
      const newParamSearch = {
        ...state.pttt.paramTheoTrangThai,
        ...payload,
      };
      dispatch.pttt.updateData({
        paramTheoTrangThai: newParamSearch,
      });
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .getDashboardTheoTrangThai(newParamSearch)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
              dispatch.pttt.updateData({
                listDashboardPttt: s.data,
              });
            } else {
              reject(s);
              message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    getById: (id, state) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .getChiTietPTTT(id)
          .then((s) => {
            dispatch.pttt.updateData({
              dataDetail: s.data,
              dataDetailDefault: s.data,
            });
            // dispatch.nbGoiDv.getGoiDvById(s.data?.goiDvId);
            if (!s.data?.maBenhAn) {
              dispatch.nbDotDieuTri.getById(s.data.nbDotDieuTriId);
              dispatch.danhSachNguoiBenhNoiTru.updateData({
                infoPatient: null,
              });
            } else {
              dispatch.danhSachNguoiBenhNoiTru.getNbNoiTruById(
                s.data.nbDotDieuTriId
              );
              dispatch.nbDotDieuTri.updateData({ thongTinBenhNhan: null });
              dispatch.pttt.getToDieuTriChiDinh({
                id: s.data.id,
                nbDotDieuTriId: s.data.nbDotDieuTriId,
              });
            }
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    updateThongTinPTTT: (
      payload,
      { pttt: { dataDetail, dataDetailDefault } }
    ) => {
      const newData = { ...dataDetail, ...payload };
      dispatch.pttt.updateData({
        dataDetail: newData,
        disabledSave: [
          "dichVuId",
          "phanLoai",
          "thoiGianThucHien",
          "thoiGianKetThuc",
          "phuongPhapGayMeId",
          "chanDoan",
          "phuongPhap",
          "luocDo",
          "cachThuc",
          "ketLuan",
          "danLuu",
          "bac",
          "thoiGianRut",
          "thoiGianCatChi",
          "khac",
          "tyLeTtDv"
        ].every((key) => newData[key] === dataDetailDefault[key]),
      });
    },
    saveThongTinPTTT: (
      payload,
      { pttt: { dataDetail }, toDieuTri: { currentToDieuTri } }
    ) => {
      return new Promise((resolve, reject) => {
        if (
          dataDetail?.maBenhAn &&
          dataDetail.chiDinhTuLoaiDichVu === LOAI_DICH_VU.TO_DIEU_TRI
        ) {
          // nếu là nội trú thì thời gian thực hiện phải > thời gian y
          const thoiGianYLenh = moment(currentToDieuTri?.thoiGianYLenh);
          const thoiGianThucHien = moment(dataDetail?.thoiGianThucHien);
          if (thoiGianYLenh > thoiGianThucHien) {
            message.error("Lỗi: Thời gian bắt đầu PTTT < thời  gian y lệnh");
            reject(false);
            return;
          }
        } else if (
          moment(dataDetail.thoiGianThucHien) <
          moment(dataDetail.thoiGianVaoVien)
        ) {
          message.error("Lỗi: Ngày bắt đầu PTTT < Ngày đăng ký");
          reject(false);
          return;
        }
        if (!dataDetail.thoiGianKetThuc && dataDetail.trangThai === 63) {
          message.error("Vui lòng nhập Thời gian kết thúc PTTT");
          reject(false);
          return;
        }
        delete dataDetail.dsCdChinh;
        nbDvCdhaProvider
          .updateThongTinPTTT(dataDetail)
          .then((s) => {
            dispatch.pttt.updateData({
              disabledSave: true,
              dataDetailDefault: dataDetail,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    doiDichVu: (payload, { pttt: { dataDetail } }) => {
      return new Promise((resolve, reject) => {
        delete dataDetail.dsCdChinh;
        nbDvCdhaProvider
          .doiDichVu(dataDetail)
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    getNguoiThucHien: (id, state) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .getNguoiThucHien(id)
          .then((s) => {
            if (s.data) {
              dispatch.pttt.updateData({
                thongTinNguoiThucHien: {
                  ...s.data,
                  // do bsGayMeNgoaiVienId trả về là string nên select bị lỗi
                  bsGayMeNgoaiVienId: s.data?.bsGayMeNgoaiVienId
                    ? parseInt(s.data?.bsGayMeNgoaiVienId)
                    : null,
                },
                thongTinNguoiThucHienDefault: s.data,
              });
            }
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    checkNguoiThucHien: (
      payload,
      { pttt: { dataDetail, thongTinNguoiThucHien } }
    ) => {
      return new Promise((resolve, reject) => {
        if (![63].some((i) => i === dataDetail.trangThai)) {
          resolve(true);
        } else if (thongTinNguoiThucHien?.id) {
          if (!thongTinNguoiThucHien.nguoiThucHienId) {
            message.error("Vui lòng chọn phẫu thuật viên chính");
            reject(false);
          } else {
            resolve(true);
          }
        } else {
          dispatch.pttt.getNguoiThucHien(dataDetail?.id).then((res) => {
            if (!res.data?.nguoiThucHienId) {
              message.error("Vui lòng chọn phẫu thuật viên chính");
              reject(false);
            } else {
              resolve(true);
            }
          });
        }
      });
    },
    updateThongTinNguoiThucHien: (
      payload,
      { pttt: { thongTinNguoiThucHien, thongTinNguoiThucHienDefault } }
    ) => {
      const newData = { ...thongTinNguoiThucHien, ...payload };
      dispatch.pttt.updateData({
        thongTinNguoiThucHien: newData,
        disabledSave2: [
          "bsNgoaiVienId",
          "bsGayMeNgoaiVienId",
          "nguoiThucHienId",
          "ptv1Id",
          "ptv2Id",
          "ptv3Id",
          "gayMe1Id",
          "gayMe2Id",
          "phuGayMe1Id",
          "phuGayMe2Id",
          "chayMayChinhId",
          "chayMayPhuId",
          "ytaGiupViecId",
          "ytaDungCu1Id",
          "ytaDungCu2Id",
          "ytaDungCu3Id",
          "ytaDungCu4Id",
          "ytaDungCu5Id",
        ].every((key) => newData[key] === thongTinNguoiThucHienDefault[key]),
      });
    },
    saveNguoiThucHien: (payload, { pttt: { thongTinNguoiThucHien } }) => {
      return new Promise((resolve, reject) => {
        if (!thongTinNguoiThucHien.nguoiThucHienId) {
          message.error("Vui lòng chọn phẫu thuật viên chính");
          reject(false);
          return;
        }
        nbDvCdhaProvider
          .saveNguoiThucHien(thongTinNguoiThucHien)
          .then((s) => {
            dispatch.pttt.updateData({
              disabledSave2: true,
              thongTinNguoiThucHienDefault: thongTinNguoiThucHien,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    huyTiepDon: (payload, { pttt: { dataDetail } }) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .huyTiepNhan([dataDetail?.id])
          .then((s) => {
            dispatch.pttt.getById(dataDetail?.id);
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    tiepNhan: (payload, { pttt: { dataDetail } }) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .tiepNhan(dataDetail?.phongThucHienId, [
            {
              id: dataDetail?.id,
            },
          ])
          .then((s) => {
            dispatch.pttt.getById(dataDetail?.id);
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    coKetQua: (payload, { pttt: { dataDetail } }) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .coKetQua([dataDetail?.id])
          .then((s) => {
            dispatch.pttt.getById(dataDetail?.id);
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    hoanThanh: (payload, { pttt: { dataDetail, dataDetailDefault } }) => {
      return new Promise((resolve, reject) => {
        dispatch.pttt
          .checkNguoiThucHien()
          .then(() => {
            dispatch.pttt.saveThongTinPTTT().then((res) => {
              dispatch.pttt.coKetQua().then(resolve).catch(reject);
            });
          })
          .catch(reject);
      });
    },
    huyHoanThanh: (payload, { pttt: { dataDetail } }) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .huyKetQua([dataDetail?.id])
          .then((s) => {
            dispatch.pttt.getById(dataDetail?.id);
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    khongPhauThuat: (payload, { pttt: { dataDetail } }) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .khongThucHien(dataDetail?.id)
          .then((s) => {
            dispatch.pttt.getById(dataDetail?.id);
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    // mục đích: lấy ngày y lệnh từ tờ điều trị để bắt logic
    // thời gian bắt đầu PTTT
    getToDieuTriChiDinh: ({ id, ...rest } = {}) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .getTongHopDichVuCLS(rest)
          .then((s) => {
            const dataToDieuTri = s.data?.find((i) => i.id === id);
            if (
              dataToDieuTri.chiDinhTuLoaiDichVu === LOAI_DICH_VU.TO_DIEU_TRI
            ) {
              dispatch.pttt.updateData({
                dataToDieuTri,
              });
              dispatch.toDieuTri.getToDieuTriById(
                dataToDieuTri.chiDinhTuDichVuId
              );
            }

            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },

    getTatCaGiayChiDinh: (payload = {}, state) => {
      const {
        nbDotDieuTriId,
        chiDinhTuDichVuId,
        inPhieuChiDinh,
        dsNbDichVuId,
      } = payload;
      return new Promise((resolve, reject) => {
        const promises = [
          nbDvXetNghiemProvider
            .getPhieuChiDinh({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 40,
              inPhieuChiDinh,
              dsNbDichVuId,
            })
            .then(
              function (data) {
                return { success: true, ...data };
              },
              function () {
                return { success: false };
              }
            ),
          nbDvCdhaProvider
            .getPhieuChiDinh({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 40,
              inPhieuChiDinh,
              dsNbDichVuId,
            })
            .then(
              function (data) {
                return { success: true, ...data };
              },
              function () {
                return { success: false };
              }
            ),
          nbDvKhamProvider
            .getPhieuChiDinh({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 40,
              inPhieuChiDinh,
              dsNbDichVuId,
            })
            .then(
              function (data) {
                return { success: true, ...data };
              },
              function () {
                return { success: false };
              }
            ),
        ];
        Promise.all(promises)
          .then((s) => {
            let dataCustom = s
              ?.map((phieu, index) => {
                if (phieu.success) {
                  const item = phieu.data;
                  item.key = item?.id;
                  item.index = index + 1;
                  if (Array.isArray(item?.file?.pdf)) {
                    item.filePdf = item?.file?.pdf?.map((x) => x);
                  } else {
                    item.filePdf = [item?.file?.pdf];
                  }
                  return item;
                }
              })
              .filter((item) => item);
            // dispatch.khamBenh.updateData({
            //   listPhieu: dataCustom,
            // });
            resolve(dataCustom);
          })
          .catch((err) => {
            console.log("err: ", err);
          });
      });
    },
    themThongTin: (payload, { pttt: { dataDetail } }) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .themThongTin([payload])
          .then((s) => {
            dispatch.pttt.getById(dataDetail?.id);
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    getDichVuCha: (id, state) => {
      return new Promise((resolve, reject) => {
        nbDvCdhaProvider
          .getChiTietPTTT(id)
          .then((s) => {
            dispatch.pttt.updateData({
              dichVuCha: s.data,
            });
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
  }),
};
