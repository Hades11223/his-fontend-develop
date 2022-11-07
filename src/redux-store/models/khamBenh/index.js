import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import nbDvXNProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvCLSProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import phongProvider from "data-access/categories/dm-phong-provider";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { message } from "antd";
import { TRANG_THAI_DICH_VU, LOAI_PHONG } from "constants/index";
import nhomDichVuCap3Provider from "data-access/categories/dm-nhom-dich-vu-cap3-provider";
import cacheUtils from "utils/cache-utils";
import { cloneDeep, isEqual } from "lodash";
import { t } from "i18next";

const initState = {
  infoNb: {},
  statisticsRoom: {},
  listHistory: [],
  listPhongkham: [],
  thongTinChiTiet: {},
  thongTinKhamBN: {},
  elementKey: 0,
  dangKhamError: "",
  listThietLapTrangThai: [],
};
export default {
  state: cloneDeep(initState),
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData(state, payload = {}) {
      return { ...cloneDeep(initState), ...payload };
    },
  },

  effects: (dispatch) => ({
    getStatisticsRoom: (payload = [], state) => {
      const phongThucHienId =
        payload.phongThucHienId || state.nbKhamBenh.phongThucHienId;
      nbDvKhamProvider
        .getStatisticsRoom({
          dsPhongId: [phongThucHienId],
        })
        .then((s) => {
          const data = s?.data || [];
          const statisticsRoom = data[0] || {};

          dispatch.khamBenh.updateData({
            statisticsRoom,
          });
        })
        .catch((err) => {
          message.error(err?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
        });
    },
    getNbDvKham: ({ dichVuId, chuyenTrangThai, isShowMessage }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          const thongTinChiTiet = state.khamBenh.thongTinChiTiet || {};
          //kiểm tra xem nb-dv-kham hiện tại có giống với id truyền vào không
          if (thongTinChiTiet.id != dichVuId || chuyenTrangThai) {
            // nếu không giống thì reset
            dispatch.khamBenh.updateData({ thongTinChiTiet: {} });

            if (dichVuId) {
              //sau đó load thông tin nbDichVuKham theo Id
              const res = await nbDvKhamProvider.getNbDvKham(dichVuId);
              const data = res?.data || {};
              dispatch.khamBenh.updateData({
                thongTinChiTiet: data,
                nbCovid: data?.nbCovid,
              });
              if (chuyenTrangThai) {
                //nếu flag chuyenTrangThai ==true thì cho phép chuyển trạng thái dịch vụ khám sau khi load dịch vụ khám
                dispatch.khamBenh.dangKham({ isShowMessage });
              }
              resolve(data);
            } else {
              resolve({});
            }
          }
        } catch (error) {
          message.error(error?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          reject(error);
        }
      });
    },
    updateNbDvKham: ({ isShowMessage, ...payload }) => {
      return new Promise((resolve, reject) => {
        if (!payload.id) {
          dispatch.khamBenh.updateData({ thongTinChiTiet: {} });
          resolve(true);
          return;
        }
        nbDvKhamProvider
          .updateNbDvKham(payload)
          .then((s) => {
            const thongTinChiTiet = s?.data || {};
            if (isShowMessage) {
              message.success(t("common.daLuuDuLieu"));
            }
            dispatch.khamBenh.updateData({
              dangKhamError: "",
              thongTinChiTiet,
            });
            resolve(s);
          })
          .catch((err) => {
            reject(err);
            message.error(err?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    ketLuanKham: (payload, state, ketThuc) => {
      //lưu kết luận khám
      return new Promise((resolve, reject) => {
        const thongTinChiTiet = {
          ...(state.khamBenh.thongTinChiTiet || {}),
        };
        //khi truyền vào là kết thúc thì gọi function kết thúc khám, ngược lại gọi function lưu kết luận
        nbDvKhamProvider[ketThuc ? "ketThucKham" : "ketLuanKham"](payload)
          .then(async (s) => {
            //kết thúc và kết luận trả về body giống nhau.
            const data = s?.data || {};
            thongTinChiTiet.nbKetLuan = data.nbKetLuan; //sau khi response thì cập nhật lại thông tin chi tiết
            thongTinChiTiet.nbChuyenVien = data.nbChuyenVien;
            thongTinChiTiet.nbNhapVien = data.nbNhapVien;
            thongTinChiTiet.nbKhamXet = data.nbKhamXet;
            thongTinChiTiet.nbHoiBenh = data.nbHoiBenh;
            thongTinChiTiet.nbChiSoSong = data.nbChiSoSong;
            thongTinChiTiet.nbChanDoan = data.nbChanDoan;

            const infoNb =
              await nbDotDieuTriProvider.getNbDotDieuTriTongHopTheoId(
                state.khamBenh.thongTinChiTiet?.nbDotDieuTriId
              );
            if (ketThuc)
              //nếu gọi api kết thúc thì cập nhật lại trạng thái dịch vụ khám
              thongTinChiTiet.nbDvKyThuat.trangThai =
                TRANG_THAI_DICH_VU.DA_KET_LUAN;
            if (!thongTinChiTiet.nbChanDoan) thongTinChiTiet.nbChanDoan = {}; //cập nhật lại trường nbChanDoan

            dispatch.khamBenh.updateData({
              thongTinChiTiet,
              infoNb: infoNb.data,
            });
            dispatch.khamBenh.getHanhTrinhKham({
              nbDotDieuTriId: thongTinChiTiet?.nbDotDieuTriId,
            });

            let phongThucHienId = state.nbKhamBenh.phongThucHienId;
            if (phongThucHienId)
              dispatch.khamBenh.getStatisticsRoom(phongThucHienId);

            message.success(
              ketThuc
                ? t("khamBenh.daKetThucKham")
                : t("khamBenh.daLuuDuLieuKetLuanKham")
            );
            resolve(s);
          })
          .catch((err) => {
            message.error(err?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(err);
          });
      });
    },
    huyKetLuanKham: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvKhamProvider
          .huyKetLuan(payload)
          .then((s) => {
            const thongTinChiTiet = {
              ...(state.khamBenh.thongTinChiTiet || {}),
            };
            thongTinChiTiet.nbDvKyThuat.trangThai =
              TRANG_THAI_DICH_VU.DANG_KET_LUAN; //sau khi huỷ kết luận thì update trạng thái dịch vụ khám về đang kết luận
            dispatch.khamBenh.updateData({
              thongTinChiTiet: { ...thongTinChiTiet },
            });
            dispatch.khamBenh.getHanhTrinhKham({
              nbDotDieuTriId: thongTinChiTiet?.nbDotDieuTriId,
            });

            message.success(t("khamBenh.daHuyDuLieuKetLuanKham"));
            resolve(true);
          })
          .catch((err) => {
            message.error(err?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(err);
          });
      });
    },
    huyKetLuanGetMethod: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvKhamProvider
          .huyKetLuanGetMethod(payload)
          .then((s) => {
            resolve(s);
          })
          .catch((err) => {
            message.error(err?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(err);
          });
      });
    },
    getHistory: (payload = {}, state) => {
      nbDvKhamProvider
        .getHistory(payload)
        .then((s) => {
          const data = s?.data || [];

          dispatch.khamBenh.updateData({
            listHistory: data,
            totalElementsLichSuKham: s?.totalElements,
          });
        })
        .catch((err) => {
          message.error(err?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
        });
    },
    getPhongTheoTaiKhoan: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          const authId = state.auth.auth?.id;
          let dataCache = await cacheUtils.read(
            //kiểm tra cache
            "",
            "PHONG_KHAM_THEO_TAI_KHOAN" + "_" + authId,
            {},
            false
          );
          if (
            //Nếu dữ liệu hiện tại khác dữ liệu trong redux
            JSON.stringify(dataCache?.data || []) !==
            JSON.stringify(state.khamBenh.listPhongKham)
          ) {
            dispatch.khamBenh.updateData({
              listPhongKham: dataCache?.data || [], //thì đẩy cache vào redux
            });
          }
          if (dataCache?.data) {
            //nếu có dữ liệu
            resolve(dataCache?.data); //thì resolve luôn dữ liệu đó
          }
          const syncTime = localStorage.getItem("TIME_RELOAD");
          if (
            !dataCache.data ||
            !Number.isInteger(dataCache?.date) ||
            new Date().getTime() - dataCache.date > 600000 ||
            syncTime - dataCache.date > 0
          ) {
            const response = await phongProvider.getPhongTheoTaiKhoan(payload); //lấy danh sách phòng theo tài khoản
            const listPhongKham = (response?.data || []).map((item) => {
              return {
                id: item.id,
                ten: `${item.ten} - ${item.khoa}`,
              };
            });
            cacheUtils.save(
              //lưu vào cache
              "",
              "PHONG_KHAM_THEO_TAI_KHOAN" + "_" + authId,
              { data: listPhongKham, date: new Date().getTime() },
              false
            );
            if (
              JSON.stringify(listPhongKham) !==
              JSON.stringify(dataCache?.data || []) //Nếu dữ liệu hiện tại khác dữ liệu trong redux
            ) {
              dispatch.khamBenh.updateData({
                //thì đẩy vào redux
                listPhongKham,
              });
            }
            if (!dataCache.data) {
              //nếu trước đấy chưa resolve
              resolve(listPhongKham); //thì resolve về ds phòng khám mới
            }
          }
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getHanhTrinhKham: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbDvKhamProvider
          .getHanhTrinhKham(payload)
          .then((s) => {
            let thongTinKhamBN = s?.data;
            dispatch.khamBenh.updateData({ thongTinKhamBN });
            resolve(s?.data);
          })
          .catch((err) => {
            message.error(err?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    setElementKey: (key) => {
      dispatch.khamBenh.updateData({
        elementKey: key,
      });
    },
    onLoadNb: (
      {
        dichVuId,
        infoNb,
        chuyenTrangThai,
        isShowMessage,
        isLoadNbDvKham = true,
      },
      state
    ) => {
      return new Promise(async (resolve, reject) => {
        if (!isEqual(infoNb, state.khamBenh.infoNb))
          dispatch.khamBenh.updateData({ infoNb });
        if (isLoadNbDvKham) {
          dispatch.khamBenh.getNbDvKham({
            dichVuId: dichVuId,
            chuyenTrangThai,
            isShowMessage,
          });
        }
      });
    },
    loadNbTiepTheo: (payload, state) => {
      return new Promise((resolve, reject) => {
        const { phongThucHienId } = state.nbKhamBenh;
        let obj = {
          phongThucHienId,
          isSingleSearch: true,
          size: 10,
          chuyenTrangThai: true,
        };
        dispatch.nbKhamBenh.onSizeChange(obj);
      });
    },
    dangKham: ({ isShowMessage }, state) => {
      return new Promise((resolve, reject) => {
        const { id } = state.khamBenh.thongTinChiTiet || {};
        const { trangThai } = state.khamBenh.thongTinChiTiet?.nbDvKyThuat || {};
        const phongThucHienId = state.nbKhamBenh.phongThucHienId || null;

        if (
          trangThai == TRANG_THAI_DICH_VU.CHO_KHAM ||
          trangThai == TRANG_THAI_DICH_VU.DA_CHECKIN_KHAM ||
          trangThai == TRANG_THAI_DICH_VU.CHUAN_BI_KHAM ||
          trangThai == TRANG_THAI_DICH_VU.DANG_THUC_HIEN_DICH_VU ||
          trangThai == TRANG_THAI_DICH_VU.BO_QUA
        ) {
          nbDvKhamProvider
            .dangKham(id)
            .then((s) => {
              dispatch.khamBenh.updateData({
                dangKhamError: "",
                thongTinChiTiet: s.data || {},
              });
              dispatch.khamBenh.getStatisticsRoom(phongThucHienId);
            })
            .catch((e) => {
              dispatch.khamBenh.updateData({ dangKhamError: e?.message });
              if (!isShowMessage) {
                message.error(
                  e?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                );
              }
            });
          resolve(true);
        } else if (trangThai == TRANG_THAI_DICH_VU.CHO_KET_LUAN) {
          dispatch.khamBenh
            .nguoiBenhTiepTheo({})
            .then((s) => {
              resolve(s);
            })
            .catch((e) => {
              reject(e);
            });
        } else {
          dispatch.khamBenh
            .dangKetLuan({})
            .then((s) => {
              resolve(s);
            })
            .catch((e) => {
              reject(e);
            });
        }
      });
    },
    dangKetLuan: ({ ketThucKham, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const { id } = state.khamBenh.thongTinChiTiet;
        const { trangThai } = state.khamBenh.thongTinChiTiet?.nbDvKyThuat || {};
        switch (trangThai) {
          case TRANG_THAI_DICH_VU.CHO_KHAM:
          case TRANG_THAI_DICH_VU.DANG_KHAM:
          case TRANG_THAI_DICH_VU.DANG_THUC_HIEN_DICH_VU:
          case TRANG_THAI_DICH_VU.DA_KET_LUAN:
            if (!ketThucKham) break;
          case TRANG_THAI_DICH_VU.CHO_KET_LUAN:
          case TRANG_THAI_DICH_VU.DA_CHECKIN_KET_LUAN:
          case TRANG_THAI_DICH_VU.CHUAN_BI_KET_LUAN:
          case TRANG_THAI_DICH_VU.BO_QUA_KET_LUAN:
            nbDvKhamProvider
              .dangKetLuan(id, payload)
              .then((s) => {
                const { nbChiSoSong, ...rest } = s.data;
                dispatch.khamBenh.updateData({
                  thongTinChiTiet:
                    { ...state.khamBenh.thongTinChiTiet, ...rest } || {},
                });
                resolve(s);
              })
              .catch((e) => {
                message.error(
                  e?.message || t("common.xayRaLoiVuiLongThuLaiSau")
                );
                reject(e);
              });
            break;
          case TRANG_THAI_DICH_VU.DANG_KET_LUAN:
            resolve(true);
            break;
          default:
            resolve(true);
        }
      });
    },
    boQuaKham: (
      { loadNbTiepTheo, id, trangThai, isShowMessage, ...payload },
      state
    ) => {
      return new Promise((resolve, reject) => {
        if (!id) {
          id = state.khamBenh.thongTinChiTiet?.id;
        }
        if (!trangThai) {
          trangThai = state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai;
        }
        let phongThucHienId = state.nbKhamBenh.phongThucHienId;
        if (phongThucHienId)
          dispatch.khamBenh.getStatisticsRoom(phongThucHienId);

        switch (trangThai) {
          case TRANG_THAI_DICH_VU.CHO_KHAM:
          case TRANG_THAI_DICH_VU.CHUAN_BI_KHAM:
          case TRANG_THAI_DICH_VU.DANG_KHAM:
            nbDvKhamProvider
              .boQuaKham(id)
              .then((s) => {
                if (isShowMessage) {
                  message.success("Đã bỏ qua bệnh nhân");
                }
                if (loadNbTiepTheo) {
                  dispatch.khamBenh.loadNbTiepTheo();
                }
                resolve(s);
              })
              .catch((e) => {
                message.error(e?.message);
                reject(e);
              });
            break;
          case TRANG_THAI_DICH_VU.CHO_KET_LUAN:
          case TRANG_THAI_DICH_VU.CHUAN_BI_KET_LUAN:
          case TRANG_THAI_DICH_VU.DANG_KET_LUAN:
            return dispatch.khamBenh.boQuaKetLuan({
              loadNbTiepTheo,
              id,
              trangThai,
              isShowMessage,
            });
            break;
          default:
            if (loadNbTiepTheo) {
              dispatch.khamBenh.loadNbTiepTheo();
            }
        }
      });
    },
    boQuaKetLuan: (
      { loadNbTiepTheo, id, trangThai, isShowMessage, ...payload },
      state
    ) => {
      return new Promise((resolve, reject) => {
        if (!id) {
          id = state.khamBenh.thongTinChiTiet?.id;
        }
        if (!trangThai) {
          trangThai = state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai;
        }
        nbDvKhamProvider
          .boQuaKetLuan(id)
          .then((s) => {
            if (isShowMessage) {
              message.success("Đã bỏ qua bệnh nhân");
            }
            if (loadNbTiepTheo) {
              dispatch.khamBenh.loadNbTiepTheo();
            }
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    nguoiBenhTiepTheo: (payload, state) => {
      return new Promise((resove, reject) => {
        const {
          khamBenh: { thongTinChiTiet },
          nbKhamBenh: { phongThucHienId },
        } = state;
        nbDvKhamProvider
          .getNbTiepTheo({ phongThucHienId, nbTiepTheoId: thongTinChiTiet?.id })
          .then((s) => {
            let nbTiepTheo = (s.data || [])[0];
            if (nbTiepTheo) {
              dispatch.khamBenh.getDsDichVuById({
                dichVuId: nbTiepTheo.id,
                phongThucHienId: phongThucHienId,
                loaiPhong: LOAI_PHONG.PHONG_KHAM,
                chuyenTrangThai: true,
                nbDotDieuTriId: nbTiepTheo.nbDotDieuTriId,
              });
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
            reject(e);
          });
      });
    },
    getDsDichVuById: (payload = {}, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          const {
            dichVuId,
            phongThucHienId,
            loaiPhong,
            chuyenTrangThai,
            nbDotDieuTriId,
            isLoadNbDvKham = true, //default sẽ gọi api load nbDvKham
          } = payload;
          let infoNb = state.khamBenh.infoNb || {};
          // kiểm tra xem phòng thực hiện hiện tại có khác với phòng của người bệnh không, nếu khác thì cậpnhaajt lại
          if (phongThucHienId != state.nbKhamBenh.phongThucHienId) {
            dispatch.nbKhamBenh.updateData({ phongThucHienId });
          }
          // get danh sách phòng theo tài khoản
          await dispatch.khamBenh.getPhongTheoTaiKhoan({
            loaiPhong: loaiPhong,
          });

          // kiểm tra thông tin bệnh nhân hiện tại có khác với bệnh nhân mới không
          if (infoNb?.nbDotDieuTriId != nbDotDieuTriId) {
            //nếu khác thì reset thông tin bệnh nhân hiện tại
            dispatch.khamBenh.updateData({ infoNb: {} });
            //đồng thời load thông tin bệnh nhân mới
            const res = await nbDotDieuTriProvider.getNbDotDieuTriTongHopTheoId(
              nbDotDieuTriId
            );
            if (res?.code == 602) {
              message.error(res.message);
              reject(res);
              return;
            }
            infoNb = res.data || {};
          }
          dispatch.khamBenh.onLoadNb({
            dichVuId,
            infoNb,
            chuyenTrangThai,
            isLoadNbDvKham,
          });
        } catch (e) {
          message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          reject(e);
        }
      });
    },
    // updateNbCovid: ({ changeStatus, ...payload }, state) => {
    //   const { nbCovid } = payload;
    //   return new Promise((resolve, reject) => {
    //     nbDvKhamProvider
    //       .updateNbCovid({ ...nbCovid })
    //       .then((s) => {
    //         let cloneThongTinChiTiet = { ...state.khamBenh.thongTinChiTiet };
    //         cloneThongTinChiTiet.nbCovid = s?.data;
    //         dispatch.khamBenh.updateData({
    //           thongTinChiTiet: cloneThongTinChiTiet,
    //         });
    //         if (s?.code === 0 && changeStatus) {
    //           dispatch.khamBenh.dangKham();
    //         }
    //         message.success("Đã lưu dữ liệu!");
    //         resolve(s);
    //       })
    //       .catch((e) => {
    //         message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
    //         reject(e);
    //       });
    //   });
    // },
    kiemTraTrangThaiLoadNguoiBenh: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { chuyenTrangThai, forceUpdate, dichVuId, nbDotDieuTriId } =
          payload;
        const { tenNb, maHoSo } = state.khamBenh.infoNb || {};
        //khi forceUpdate là khi người dùng đã xác muốn chuyển sang bệnh nhân khác.
        const trangThaiKham = forceUpdate
          ? null
          : state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai;
        switch (trangThaiKham) {
          case TRANG_THAI_DICH_VU.DANG_KHAM:
            reject(
              t(
                "khamBenh.nguoiBenhDangThucHienKhamBanCoChacChanGoiNguoiBenhTiepTheo"
              ).replace("{0}", `${maHoSo} - ${tenNb}`)
            );
            break;
          case TRANG_THAI_DICH_VU.DANG_KET_LUAN:
            reject(
              t(
                "khamBenh.nguoiBenhChuaDuocKetLuanBanCoChacChanGoiNguoiBenhTiepTheo"
              ).replace("{0}", `${maHoSo} - ${tenNb}`)
            );
            break;
          default:
            if (nbDotDieuTriId && dichVuId) {
              nbDotDieuTriProvider
                .getNbDotDieuTriTongHopTheoId(nbDotDieuTriId)
                .then((s) => {
                  dispatch.khamBenh.onLoadNb({
                    dichVuId: dichVuId,
                    infoNb: s.data || {},
                    chuyenTrangThai,
                    isShowMessage: true,
                  });
                });
            }
            resolve(true);
        }
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
          nbDvXNProvider
            .getPhieuChiDinh({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 10,
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
          nbDvCLSProvider
            .getPhieuChiDinh({
              nbDotDieuTriId,
              chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 10,
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
              chiDinhTuLoaiDichVu: 10,
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
    thietLapTrangThai: (payload, state) => {
      return new Promise((resolve, reject) => {
        nhomDichVuCap3Provider
          .thietLapTrangThai()
          .then((s) => {
            dispatch.khamBenh.updateData({ listThietLapTrangThai: s?.data });
            resolve(s);
          })
          .catch((err) => {});
      });
    },
    doiTrangThai: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbDvKhamProvider
          .doiTrangThai(payload)
          .then((s) => {
            console.log("s: ", s);
            resolve(s?.data);
          })
          .catch((err) => {
            message.error(err?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
  }),
};
