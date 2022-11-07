import tiepDonProvider from "data-access/tiepdon-provider";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { message } from "antd";
import moment from "moment";
import { THIET_LAP_CHUNG, ENUM } from "constants/index";
import { openInNewTab } from "utils";
import cacheUtils from "utils/cache-utils";
import { t } from "i18next";
import { refConfirm } from "app";

export default {
  state: {
    nbDiaChi: {},
    theBaoHiem: {},
    thongTinBenhNhan: {},
    boQuaCheckThe: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData(state, payload = {}) {
      return { ...payload };
    },
  },
  effects: (dispatch) => ({
    onSetCapCuu: (payload, state) => {
      const { capCuu, id } = state.tiepDon;
      const { quayTiepDonId } = state.goiSo;
      const { dataMA_KHOA_CAP_CUU } = state.thietLap;
      const { listAllQuayTiepDonTaiKhoan = [] } = state.quayTiepDon;
      let newCapCuu = false;
      let khoa = listAllQuayTiepDonTaiKhoan?.find(
        (x) => x.id == quayTiepDonId
      )?.khoa;
      if (dataMA_KHOA_CAP_CUU && dataMA_KHOA_CAP_CUU === khoa?.ma) {
        newCapCuu = true;
      } else if (id) {
        // giải quyết vấn đề khi vào dịch vụ => sửa thông tin , capCuu bị set thành false
        newCapCuu = capCuu;
      } else {
        newCapCuu = false;
      }
      if (capCuu != newCapCuu)
        dispatch.tiepDon.updateData({
          capCuu: newCapCuu,
        });
    },
    onCheckIsKhamCapCuu: (payload, state) => {
      const { capCuu, dangKyKhamCc } = state.tiepDon;
      const { quayTiepDonId } = state.goiSo;
      const { dataMA_KHOA_CAP_CUU } = state.thietLap;
      const { listAllQuayTiepDonTaiKhoan = [] } = state.quayTiepDon;
      if (!capCuu || !dataMA_KHOA_CAP_CUU) {
        dispatch.tiepDon.updateData({
          dangKyKhamCc: false,
        });
        return;
      }
      let khoa = listAllQuayTiepDonTaiKhoan?.find(
        (x) => x.id == quayTiepDonId
      )?.khoa;
      if (dangKyKhamCc != !(!khoa?.ma || khoa?.ma != dataMA_KHOA_CAP_CUU)) {
        dispatch.tiepDon.updateData({
          dangKyKhamCc: !(!khoa?.ma || khoa?.ma != dataMA_KHOA_CAP_CUU),
        });
      }
    },
    onSaveData: ({ data = {}, boQuaChuaThanhToan, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const selectedAddress = state.tiepDon.selectedAddress;
        const ngoaiVien = state.tiepDon.ngoaiVien || false;
        if (selectedAddress === false && !ngoaiVien) {
          message.error(t("tiepDon.diaChiHanhChinhKhongCoTrongHeThong"));
          reject(false);
          return;
        }
        dispatch.tiepDon.updateData({
          checkValidate: false,
        });
        const { listAllQuayTiepDonTaiKhoan = [] } = state.quayTiepDon;
        const { quayTiepDonId } = state.goiSo;
        const quayTiepDon = listAllQuayTiepDonTaiKhoan?.find(
          (item) => item.id == quayTiepDonId
        );

        const {
          maHoSo,
          loaiDoiTuongId,
          loaiKcb,
          uuTien,
          danTocId,
          nbMienGiam,
          maNb,
          nbLaySo = {},
          anhDaiDien,
          covid,
          soBaoHiemXaHoi,
          chiNamSinh,
          ngheNghiepId,
          tuoi,
          thangTuoi,
          capCuu,
          dangKyKhamCc,
        } = state.tiepDon;

        tiepDonProvider
          .onSaveData({
            data: {
              ...data,
              maHoSo,
              maNb,
              loaiDoiTuongId,
              loaiKcb,
              uuTien,
              danTocId,
              nbMienGiam,
              nbLaySoId: nbLaySo?.id,
              anhDaiDien,
              covid,
              soBaoHiemXaHoi,
              chiNamSinh,
              ngheNghiepId,
              tuoi,
              thangTuoi,
              capCuu,
              dangKyKhamCc: dangKyKhamCc,
              boQuaChuaThanhToan,
              ...(payload.id
                ? {}
                : { khoaId: quayTiepDon?.khoaId, quayTiepDonId }), //không update khoa và quầy khi chỉnh sửa thông tin
            },
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              dispatch.tiepDon.updateData({
                nbLaySo: s.data?.nbLaySo,
              });
              resolve(s);
            } else {
              resolve(s);
              if (
                s?.code !== 7950 &&
                s?.code !== 7920 &&
                s?.code !== 7922 &&
                s?.code !== 7923 &&
                s?.code !== 7924 &&
                s?.code !== 7940
              )
                message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    searchSoThe: (payload, state) => {
      return new Promise((resolve, reject) => {
        tiepDonProvider.searchSoThe(payload).then((s) => {
          if (s.code === 0 && s.data) {
            let data = s.data || {};
            let obj = {
              maThe: data.maThe,
              mucHuong: data.mucHuong,
              tuNgay: data.tuNgay,
              denNgay: data.denNgay,
              noiDangKyId: data.noiDangKyId,
              noiGioiThieuId: data.noiGioiThieuId,
              thoiGianDu5Nam: data.thoiGianDu5Nam,
              thoiGianMienDongChiTra: data.thoiGianMienDongChiTra,
              giayChuyenTuyen: data.giayChuyenTuyen,
              henKhamLai: data.henKhamLai,
              mienDongChiTra: data.mienDongChiTra,
              dangGiuThe: data.dangGiuThe,
              maKetQua: data.maKetQua,
              boQuaTheLoi: data.boQuaTheLoi,
              noiGioiThieu: data.noiGioiThieu,
              noiDangKy: data.noiDangKy,
            };
            dispatch.tiepDon.updateData({ nbTheBaoHiem: obj });
            resolve(obj);
          } else {
            reject(s);
            message.error(s?.message);
          }
        });
      });
    },
    searchMaNbTiepDon: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .kiemTraThanhToan(payload)
          .then((s) => {
            if (
              s.code == 0 ||
              s.code == 7925 ||
              s.code == 7924 ||
              s.code == 7922
            )
              resolve(s);
            else {
              if (s.message) {
                message.error(s.message);
              }
              dispatch.tiepDon.updateDetail(s.data);
            }
          })
          .catch((e) => {
            message.error(
              e.message || t("tiepDon.khongTimThayThongTinBenhNhan")
            );
          });
      });
    },
    getById: (id, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .getById(id)
          .then((s) => {
            dispatch.tiepDon.updateDetail(s.data);
            dispatch.nbDotDieuTri.getById(id);
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    giamDinhThe: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.tiepDon.updateData({
          verifingCongBaoHiem: true,
        });
        tiepDonProvider.giamDinhThe(payload).then((s) => {
          const dsMaLoi = (
            state.thietLap["data" + THIET_LAP_CHUNG.MA_LOI_BH_DUOC_TIEP_DON] ||
            ""
          ).split(",");
          if ((s.code === 0 && s.data) || dsMaLoi.includes(s.data?.maKetQua)) {
            s.code = 0;
            resolve(s);
          } else {
            resolve(s);
          }
        });
      }).catch((e) => {
        message.error(e?.message);
      });
    },
    hienThiThongTinThe: async (data, state) => {
      const listAllTheBaoHiem = state.theBaoHiem.listAllTheBaoHiem || [];
      const nbTheBaoHiem = state.tiepDon.nbTheBaoHiem;
      const doiTuong = state.tiepDon.doiTuong;
      const auth = state.auth.auth;
      const noiTru = state?.nbDotDieuTri?.thongTinBenhNhan?.noiTru;
      if (data) {
        dispatch.goiSo.updateData({
          daThanhToan: true,
          messageChuaThanhToan: "",
        });
        if (!data?.boQuaTheLoi) {
          let gtTheTu = data?.gtTheTu && data?.gtTheTu.split("/");
          let gtTheDen = data?.gtTheDen && data?.gtTheDen.split("/");
          let ngaySinh = data?.ngaySinh && data?.ngaySinh.split("/");

          let dateLength2 =
            ngaySinh?.length === 2
              ? moment(`${ngaySinh[1]}/${ngaySinh[0]}/01`)
              : ""; // BE trả về tháng và năm , sẽ thêm 01
          let dateLength3 =
            ngaySinh?.length === 3
              ? moment(`${ngaySinh[2]}/${ngaySinh[1]}/${ngaySinh[0]}`)
              : ""; // BE trả về đầy đủ sẽ lấy hết
          let dateLength4 =
            data?.ngaySinh?.length === 4 ? moment(data?.ngaySinh, "YYYY") : ""; // BE chỉ trả năm , sẽ thêm ngày tháng mặc định là 01/01/{YYYY}
          let date = dateLength2 || dateLength3 || dateLength4;
          let mucHuong = data?.maThe?.substr(0, 3);

          let dataCheck = listAllTheBaoHiem?.find(
            (item) => item.ma.toLowerCase() === mucHuong.toLowerCase()
          );
          const newState = {
            nbTheBaoHiem: {
              ...nbTheBaoHiem,
              tuNgay:
                gtTheTu?.length === 3 &&
                moment(`${gtTheTu[2]}/${gtTheTu[1]}/${gtTheTu[0]}`),
              denNgay:
                gtTheDen?.length === 3 &&
                moment(`${gtTheDen[2]}/${gtTheDen[1]}/${gtTheDen[0]}`),
              tuNgayApDung:
                gtTheTu?.length === 3 &&
                moment(`${gtTheTu[2]}/${gtTheTu[1]}/${gtTheTu[0]}`),
              denNgayApDung:
                gtTheDen?.length === 3 &&
                moment(`${gtTheDen[2]}/${gtTheDen[1]}/${gtTheDen[0]}`),
              noiDangKyId: data?.noiDangKy?.id,
              noiDangKy: data?.noiDangKy,
              maThe: data?.maThe,
              thoiGianDu5Nam: data?.thoiGianDu5Nam
                ? moment(data?.thoiGianDu5Nam)
                : "",
              boQuaTheLoi: data?.boQuaTheLoi,
              mucHuong: dataCheck?.mucHuong,
            },
          };
          if (doiTuong != 2) {
            newState.doiTuong = 2; //set đối tượng =2 là bảo hiểm
            // newState.loaiDoiTuongId = null; //loại đối tượng = null để người dùng chọn lại loại đối tương
            const listLoaiDoiTuong =
              await dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
                doiTuong: 2,
              });
            newState.loaiDoiTuongId = listLoaiDoiTuong[0]?.id || null;
          } else {
            if (!newState.loaiDoiTuongId) {
              const listLoaiDoiTuong =
                await dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
                  doiTuong: 2,
                });
              newState.loaiDoiTuongId = listLoaiDoiTuong[0]?.id || null;
            }

            //ngược lại thì giữ nguyên đối tượng và loại đối tượng hiện tại
          }
          dispatch.information.getMaNbByMaBhyt({
            maTheBhyt: data?.maThe,
            id: state.tiepDon?.id,
          });
          //update lại các thông tin
          // let diaChi = (data?.diaChi || "").split(", ");
          // const soNha = diaChi.length > 3 ? diaChi[0] : "";
          // diaChi =
          //   diaChi.length > 3 ? diaChi.slice(1, 4).join(", ") : diaChi.join(", ");
          dispatch.tiepDon.updateData({
            ...newState,
            // nbDiaChi: {
            //   diaChi: diaChi,
            //   soNha: soNha,
            //   quocGiaId: dataMacDinh?.quocGia?.id,
            // },
            soBaoHiemXaHoi: data?.soBaoHiemXaHoi || data?.maSoBHXH,
            ngaySinh: {
              date,
              str:
                data?.ngaySinh?.length === 4
                  ? date?.format("YYYY")
                  : date && date?.format("DD/MM/YYYY"),
            },
            tenNb: data?.hoTen,
            gioiTinh: data?.gioiTinh == "Nam" ? 1 : 2,
            tuoi: date?._d?.getAge(),
            checkNoiGioiThieu:
              noiTru || auth?.benhVien?.id === data?.noiDangKy?.id
                ? false
                : true,
            email: data?.email || "",
            nbTongKetRaVien: {
              ...state.tiepDon.nbTongKetRaVien,
              cdNoiGioiThieu: data?.nbTongKetRaVien?.cdNoiGioiThieu || "",
              lyDoDenKham: data?.nbTongKetRaVien?.lyDoDenKham || "",
            },
          });
        } else {
          let obj = {
            ...nbTheBaoHiem,
            boQuaTheLoi: data?.boQuaTheLoi,
          };
          dispatch.tiepDon.updateData({ nbTheBaoHiem: obj });
        }
      }
    },
    kiemTraThanhToan: (payload, state, data) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .kiemTraThanhToan(payload)
          .then((s) => {
            if (data) {
              dispatch.tiepDon.updateDetail({
                ...s.data,
                nbNgoaiVien: data.nbNgoaiVien,
                dsDichVu: data?.dsDichVu,
              });
              resolve({
                ...s,
                data: {
                  ...s.data,
                  nbNgoaiVien: data.nbNgoaiVien,
                },
              });
            } else {
              dispatch.tiepDon.updateDetail({
                ...s.data,
                nbTheBaoHiem:
                  state?.tiepDon?.nbTheBaoHiem || s.data?.nbTheBaoHiem,
              });
              resolve(s);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
    setMacDinh: ({ id, data } = {}, state) => {
      let nbDiaChi = state.tiepDon.nbDiaChi || {};
      nbDiaChi.quocGiaId = data?.quocGia?.id;
      if (id) {
        dispatch.tiepDon.updateData({
          dataMacDinh: data || {},
        });
      } else {
        let doiTuong = data?.doiTuong;
        dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
          doiTuong: doiTuong,
        });
        dispatch.tiepDon.updateData({
          doiTuong: doiTuong,
          loaiDoiTuongId: data?.loaiDoiTuong?.id,
          quocTichId: data?.quocTich?.id,
          danTocId: data?.danToc?.id,
          nbDiaChi: { ...nbDiaChi },
          dataMacDinh: data || {},
        });
      }
    },

    macDinh: async (id, state) => {
      let dataCache = await cacheUtils.read(
        "",
        `DATA-TIEP-DON-MAC-DINH`,
        {},
        false
      );
      const getDataMacDinh = (setMacDinh) => {
        nbDotDieuTriProvider
          .macDinh()
          .then((s) => {
            if (setMacDinh) dispatch.tiepDon.setMacDinh({ id, data: s.data });
            cacheUtils.save(
              "",
              `DATA-TIEP-DON-MAC-DINH`,
              { data: s.data, date: new Date().getTime() },
              false
            );
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      };
      if (dataCache?.data) {
        dispatch.tiepDon.setMacDinh({ id, data: dataCache.data });
        getDataMacDinh(false);
      } else {
        getDataMacDinh(true);
      }
    },
    updateDetail: async (payload, state) => {
      let data = payload || {};
      let doiTuong = data.doiTuong;
      if (doiTuong)
        dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
          doiTuong: doiTuong,
          active: true,
          page: "",
          size: "",
        });
      let selectedAddress = false;
      if (data.nbDiaChi) {
        selectedAddress = !!(
          data.nbDiaChi.tinhThanhPhoId && data.nbDiaChi.diaChi
        );
      }

      const listLoaiDoiTuong =
        await dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
          doiTuong: doiTuong,
          active: true,
          page: "",
          size: "",
        });
      dispatch.tiepDon.updateData({
        id: data.id,
        maHoSo: data.maHoSo,
        anhDaiDien: data.anhDaiDien,
        maNb: data.maNb,
        tenNb: data.tenNb,
        loaiKcb: data.loaiKcb,
        gioiTinh: data.gioiTinh,
        ngaySinh: data.ngaySinh && {
          str: data.chiNamSinh
            ? moment(data.ngaySinh).format("YYYY")
            : moment(data.ngaySinh).format("DD/MM/YYYY"),
          date: data.ngaySinh,
        },
        chiNamSinh: data.chiNamSinh,
        thangTuoi: data.thangTuoi,
        tuoi: data.tuoi,
        soDienThoai: data.soDienThoai,
        khamSucKhoe: data.khamSucKhoe,
        khoaId: data.khoaId,
        khoaTiepDonId: data.khoaTiepDonId,
        quocTichId: data.quocTichId,
        ngheNghiepId: data.ngheNghiepId,
        soBaoHiemXaHoi: data.soBaoHiemXaHoi,
        email: data.email,
        danTocId: data.danTocId,
        doiTuong: doiTuong,
        loaiDoiTuongId: !data.ngoaiVien
          ? data.loaiDoiTuongId
          : listLoaiDoiTuong[0]?.id,
        uuTien: data.uuTien,
        capCuu: data.capCuu,
        nbQuanNhan: data.nbQuanNhan,
        nbDiaChi: data.nbDiaChi,
        nbGiayToTuyThan: data.nbGiayToTuyThan,
        nbMienGiam: data.nbMienGiam,
        nbNguoiBaoLanh: data.nbNguoiBaoLanh,
        nbTheBaoHiem: data.nbTheBaoHiem,
        nbCapCuu: data.nbCapCuu,
        nbTongKetRaVien: data.nbTongKetRaVien,
        stt: data.stt,
        checkNgaySinh: false,
        nbNguonNb: data.nbNguonNb,
        hangThe: data?.hangThe,
        hangTheId: data?.hangTheId,
        covid: data.covid,
        selectedAddress,
        nbNgoaiVien: data?.nbNgoaiVien,
        dsDichVu: data?.dsDichVu,
      });
    },
    resetData: (payload, state) => {
      dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
        doiTuong: state.tiepDon?.dataMacDinh?.doiTuong?.id || 1,
      });
      dispatch.tiepDon.clearData({
        dataMacDinh: state.tiepDon?.dataMacDinh,
        quocTichId: state.tiepDon?.dataMacDinh?.quocTich?.id,
        loaiDoiTuongId: state.tiepDon?.dataMacDinh?.loaiDoiTuong?.id,
        doiTuong: state.tiepDon?.dataMacDinh?.doiTuong?.id || 1,
        nbDiaChi: { quocGiaId: state.tiepDon?.dataMacDinh?.quocGia?.id },
        nbNguonNb: {},
        nbMienGiam: {},
        nbNguoiBaoLanh: {},
        ...payload,
      });
    },
    loadNguoiBenh: (payload, state, ignoreCheckCardInsurance) => {
      let data = payload || {};
      if (data.maTheBhyt && !ignoreCheckCardInsurance) {
        dispatch.tiepDon
          .giamDinhThe({
            hoTen: data.tenNb,
            ngaySinh: data.ngaySinh,
            maThe: data.maTheBhyt,
          })
          .then((res) => {
            const { data = {} } = res;
            const noiDangKy = (state.benhVien.listAllBenhVien || []).find(
              (item) => item.ma == data?.maDKBD
            );
            let day5nam = data?.ngayDu5Nam && data?.ngayDu5Nam.split("/");
            if (day5nam && day5nam.length === 3) {
              day5nam = `${day5nam[2]}/${day5nam[1]}/${day5nam[0]}`;
            }
            let mucHuong = data?.maThe?.substr(0, 3);
            let dataCheck = state.theBaoHiem?.listAllTheBaoHiem?.find(
              (item) => item.ma.toLowerCase() === mucHuong.toLowerCase()
            );
            dispatch.tiepDon.updateData({
              verifingCongBaoHiem: false,
              doiTuong: 2,
              loaiDoiTuongId: null,
              theBaoHiem: data,
              nbTheBaoHiem: {
                ...data,
                tuNgay: moment(data.gtTheTu, "DD/MM/YYYY"),
                denNgay: moment(data.gtTheDen, "DD/MM/YYYY"),
                noiDangKyId: noiDangKy?.id,
                noiDangKy: noiDangKy,
                thoiGianDu5Nam: moment(day5nam),
                mucHuong: dataCheck?.mucHuong,
                soBaoHiemXaHoi: data?.maSoBHXH,
              },
            });
          })
          .catch((e) => {
            dispatch.tiepDon.updateData({
              doiTuong: 2,
              loaiDoiTuongId: null,
              verifingCongBaoHiem: false,
            });
            message.error(t("tiepDon.layThongTinBaoHiemThatBai"));
          });
      }
      let doiTuong = data?.doiTuong || 1;
      let doiTuongMacDinh = state.tiepDon?.dataMacDinh?.doiTuong;
      if (doiTuong && doiTuong !== doiTuongMacDinh) {
        dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
          doiTuong: doiTuong,
          active: true,
          page: "",
          size: "",
        });
        dispatch.tiepDon.updateData({ loaiDoiTuongId: null });
      }
      let tuoi = data?.ngaySinh && moment(data?.ngaySinh)?._d?.getAge();
      let thangTuoi =
        tuoi <= 3 && data?.ngaySinh
          ? moment().diff(moment(data?.ngaySinh), "months")
          : null;
      dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({ doiTuong });
      dispatch.tiepDon.updateData({
        verifingCongBaoHiem: !!data?.maThe || !!data?.maTheBhyt,
        anhDaiDien: data?.anhDaiDien,
        nbLaySo: data,
        stt: data?.stt,
        doiTuong: doiTuong ? doiTuong : doiTuongMacDinh,
        tenNb: data?.tenNb,
        maNb: data?.maNb,
        uuTien: data?.uuTien,
        covid: data?.covid,
        nbTheBaoHiem: {
          ...state.tiepDon?.nbTheBaoHiem,
          maThe: data?.maThe || data?.maTheBhyt,
        },
        soDienThoai: data?.soDienThoai,
        ngaySinh: {
          date: data?.ngaySinh,
          str: data?.ngaySinh && moment(data?.ngaySinh).format("DD/MM/YYYY"),
        },
        tuoi: tuoi,
        thangTuoi: thangTuoi,
        gioiTinh: data?.gioiTinh,
        nbDiaChi: {
          ...state.tiepDon?.nbDiaChi,
          soNha: data?.soNha,
          xaPhuongId: data?.xaPhuongId,
          xaPhuong: data?.xaPhuong,
          quanHuyenId: data?.quanHuyenId,
          quanHuyen: data?.quanHuyen,
          tinhThanhPhoId: data?.tinhThanhPhoId,
          tinhThanhPho: data?.tinhThanhPho,
        },
      });
    },
    onChangeDoiTuong: (payload = {}, state) => {
      return new Promise(async (resolve, reject) => {
        const { value } = payload;
        const newData = {};
        const listLoaiDoiTuong =
          await dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
            doiTuong: value,
          });
        newData.loaiDoiTuongId = listLoaiDoiTuong[0]?.id || null;
        newData.doiTuong = value;
        if (value === 1) newData.nbTheBaoHiem = {};
        dispatch.tiepDon.updateData(newData);
      });
    },
    initPageTiepDon: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        let isEdit = payload.isEdit;
        if (isEdit === undefined) isEdit = true;
        dispatch.theBaoHiem.getListAllTheBaoHiem({
          active: true,
          page: "",
          size: "",
        });
        dispatch.utils.getUtils({ name: ENUM.DOI_TUONG });
        dispatch.utils.getUtils({ name: ENUM.GIOI_TINH });
        dispatch.utils.getUtils({ name: ENUM.LOAI_GIAY_TO });
        dispatch.utils.getUtils({ name: ENUM.LOAI_MIEN_GIAM });
        dispatch.utils.getUtils({ name: ENUM.KHU_VUC_BHYT });
        dispatch.thietLap.getThietLap({
          ma: THIET_LAP_CHUNG.MA_LOI_BH_DUOC_TIEP_DON,
        });
        dispatch.tiepDon.resetData({
          checkValidate: false,
          checkNgaySinh: false,
          disableTiepDon: !isEdit,
          // ...(id ? { disableTiepDon: true } : {}),
        }); //nếu đang ở chế độ xem chi tiết 1 bệnh nhân thì bật disable để readonly các trường
        dispatch.tiepDon.macDinh(payload.id || "");
      });
    },
    updateThongTinBaoHiem: (payload = {}, state) => {
      const nbTheBaoHiem = state.tiepDon.nbTheBaoHiem || {};
      dispatch.tiepDon.updateData({
        nbTheBaoHiem: { ...nbTheBaoHiem, ...payload },
      });
    },
    updateThongTinChanDoan: (payload = {}, state) => {
      const nbTongKetRaVien = state.tiepDon.nbTongKetRaVien || {};
      dispatch.tiepDon.updateData({
        nbTongKetRaVien: { ...nbTongKetRaVien, ...payload },
      });
    },
    updateThongTinTiepDon: async (payload = {}, state) => {
      const { doiTuong, loaiDoiTuongId } = state.tiepDon;
      if (
        payload.hasOwnProperty("doiTuong") &&
        (doiTuong != payload.doiTuong || !loaiDoiTuongId)
      ) {
        const listLoaiDoiTuong =
          await dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
            doiTuong: payload.doiTuong,
          });

        payload.loaiDoiTuongId = listLoaiDoiTuong[0]?.id || null;
      }
      dispatch.tiepDon.updateData(payload);
    },
    updateThongTinNbMienGiam: (payload = {}, state) => {
      const nbMienGiam = state.tiepDon.nbMienGiam || {};
      dispatch.tiepDon.updateData({
        nbMienGiam: { ...nbMienGiam, ...payload },
      });
    },
    updateThongTinNb: (payload = {}, state, fieldName) => {
      const data = state.tiepDon[fieldName] || {};
      const newState = { [fieldName]: { ...data, ...payload } };
      const noiTru = state?.nbDotDieuTri?.thongTinBenhNhan?.noiTru;
      if (
        fieldName == "nbTheBaoHiem" &&
        payload.hasOwnProperty("noiDangKyId") //nếu trường thay đổi là trường noiDangKyId
      ) {
        const auth = state.auth.auth;
        if (auth?.benhVien?.id === payload.noiDangKyId || noiTru) {
          //nếu noiDangKyId trùng với thông tin bệnh viện
          newState.checkNoiGioiThieu = false; //bỏ qua check nơi giới thiệu
        } else {
          newState.checkNoiGioiThieu = true; //ngược lại thì check noi giới thiệu
        }
      }
      if (
        fieldName == "nbTheBaoHiem" &&
        payload.hasOwnProperty("maThe") //nếu trường thay đổi là trường noiDangKyId
      ) {
        const { mucHuong } = state.tiepDon.nbTheBaoHiem || {};
        if (!mucHuong) {
          const { listAllTheBaoHiem } = state.theBaoHiem;
          newState.nbTheBaoHiem.mucHuong = listAllTheBaoHiem?.find(
            (item) =>
              item.ma.toLowerCase() ===
              payload.maThe?.substr(0, 3).toLowerCase()
          )?.mucHuong; //thì cập nhật giá trị mức hưởng
        }
        const { doiTuong } = state.tiepDon;
        if (doiTuong !== 2) {
          //Đối tượng hiện tại đang không phải đối tượng bảo hiểm
          //thì update lại là đối tượng bảo hiểm
          newState.doiTuong = 2;
          newState.loaiDoiTuongId = null;
          newState.nbTheBaoHiem.maThe = payload.maThe.toUpperCase();
        }
      }
      dispatch.tiepDon.updateThongTinTiepDon(newState);
    },
    onSelectAddress: (data, state) => {
      return new Promise((resolve, reject) => {
        const nbDiaChi = state.tiepDon.nbDiaChi || {};
        let address = {};
        if (data?.tinhThanhPho && data?.quanHuyen) {
          address = {
            ...nbDiaChi,
            tinhThanhPhoId: data?.tinhThanhPho?.id,
            quanHuyenId: data?.quanHuyen?.id,
            xaPhuongId: data?.id,
            diaChi: data?.displayText,
            quocGiaId: data?.tinhThanhPho?.quocGia?.id || nbDiaChi?.quocGiaId,
          };
        } else if (data?.tinhThanhPho) {
          address = {
            ...nbDiaChi,
            tinhThanhPhoId: data?.tinhThanhPho?.id,
            quanHuyenId: data?.id,
            diaChi: data?.displayText,
            quocGiaId: data?.tinhThanhPho?.quocGia?.id || nbDiaChi?.quocGiaId,
          };
        } else {
          address = {
            ...nbDiaChi,
            tinhThanhPhoId: data?.id,
            diaChi: data?.displayText,
            quocGiaId: data?.quocGia?.id || nbDiaChi?.quocGiaId,
            quanHuyenId: null,
            xaPhuongId: null,
          };
        }
        dispatch.tiepDon.updateData({
          selectedAddress: true,
          nbDiaChi: address,
        });
        resolve(address);
      });
    },
    tiepDon: ({ boQuaChuaThanhToan, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        /*
        0: Chỉnh sửa thành công
        1: chưa chọn quầy
        2: địa chỉ sai
        3: chưa thanh toán
        4: thiếu thông tin quân nhân
        5: thiếu thông tin cấp cứu
        */
        const {
          tiepDon: {
            loaiDoiTuongId,
            tenNb,
            gioiTinh,
            ngaySinh,
            soDienThoai = "",
            quocTichId,
            email,
            doiTuong,
            nbQuanNhan,
            nbDiaChi,
            nbGiayToTuyThan,
            nbNguoiBaoLanh,
            nbTheBaoHiem,
            theBaoHiem,
            nbCapCuu,
            nbTongKetRaVien,
            checkNgaySinh,
            checkNoiGioiThieu,
            requiredNguoiGioiThieu,
            nbNguonNb,
            capCuu,
            dangKyKhamCc,
            quanNhan,
            dsDichVu,
            id,
            nbNgoaiVien,
            quayTiepDonId: quayBanDau,
            khoaId,
          },
          goiSo: { quayTiepDonId, daThanhToan, messageChuaThanhToan },
        } = state;
        const { maNguonNb } = payload;
        let tuoi = ngaySinh?.date?._d
          ? ngaySinh?.date?._d.getAge()
          : moment(ngaySinh?.date)?._d?.getAge();

        if (!quayTiepDonId && !id) {
          dispatch.tiepDon.updateData({ checkValidate: true });
          resolve({ code: 1, message: t("tiepDon.chuaChonQuayTiepDon") });
          return;
        }
        if (nbDiaChi?.diaChi && !nbDiaChi?.tinhThanhPhoId) {
          // nếu có trường thông tin địa chỉ mà không có thông tin tỉnh thành phố
          message.error(t("tiepDon.diaChiHanhChinhKhongHopLe"));
          resolve({
            code: 2,
            message: t("tiepDon.diaChiHanhChinhKhongHopLe"),
          });
          return;
        }
        if (!daThanhToan && !boQuaChuaThanhToan) {
          resolve({
            code: 3,
            message: messageChuaThanhToan,
            data: { doiTuong },
          });
          return;
        }
        if (quanNhan) {
          if (
            !nbQuanNhan ||
            !nbQuanNhan.chucVuId ||
            !nbQuanNhan.donViId ||
            !nbQuanNhan.quanHamId
          ) {
            message.warning(t("tiepDon.nhapDayDuThongTinDoiTuongQuanNhan"));
            resolve({
              code: 4,
              message: t("tiepDon.nhapDayDuThongTinDoiTuongQuanNhan"),
            });
            return;
          }
        }
        if (capCuu) {
          if (!nbCapCuu || !nbCapCuu.loaiCapCuuId) {
            message.warning(t("tiepDon.nhapDayDuThongTinDoiTuongCapCuu"));
            resolve({
              code: 5,
              message: t("tiepDon.nhapDayDuThongTinDoiTuongCapCuu"),
            });
            return;
          }
        }

        const validThongTinBaoHiem = () => {
          if (doiTuong != 2) return true;

          return (
            nbTheBaoHiem?.maThe &&
            nbTheBaoHiem?.maThe?.length <= 15 &&
            nbTheBaoHiem?.tuNgay &&
            nbTheBaoHiem?.denNgay &&
            // nbChanDoan?.cdNoiGioiThieu &&
            nbTheBaoHiem?.noiDangKyId &&
            (checkNoiGioiThieu &&
            !nbTheBaoHiem?.henKhamLai &&
            maNguonNb !== "NNB0002"
              ? nbTheBaoHiem?.noiGioiThieuId
              : true)
          );
        };
        const validTreEmDuoi6Tuoi = () => {
          return tuoi < 6
            ? nbNguoiBaoLanh?.hoTen &&
                (nbNguoiBaoLanh?.soDienThoai &&
                nbNguoiBaoLanh?.soDienThoai.replaceAll(" ", "").isPhoneNumber()
                  ? true
                  : false) &&
                nbNguoiBaoLanh?.moiQuanHeId
            : true;
        };

        if (
          (!nbNguonNb?.ghiChu || nbNguonNb?.ghiChu?.length <= 256) &&
          doiTuong &&
          loaiDoiTuongId &&
          tenNb?.length &&
          ngaySinh?.date &&
          (!checkNgaySinh || ngaySinh?.date) &&
          gioiTinh &&
          quocTichId &&
          (soDienThoai
            ? soDienThoai.replaceAll(" ", "").isPhoneNumber()
            : true) &&
          (nbDiaChi?.diaChi || nbDiaChi?.tinhThanhPhoId) && //với trường hợp người bệnh bảo hiểm lấy địa chỉ từ bảo hiểm
          validThongTinBaoHiem() &&
          validTreEmDuoi6Tuoi() &&
          (email?.length ? email.isEmail() : true) &&
          (requiredNguoiGioiThieu
            ? nbNguonNb?.nguoiGioiThieuId
              ? true
              : false
            : true)
        ) {
          const submit = () => {
            const dataSubmit = {
              data: {
                id: id,
                tenNb: tenNb,
                gioiTinh: gioiTinh,
                ngaySinh:
                  ngaySinh?.date instanceof moment
                    ? ngaySinh?.date.format("DD/MM/YYYY HH:mm:ss")
                    : ngaySinh?.date,
                soDienThoai: soDienThoai?.replaceAll(" ", ""),
                quocTichId: quocTichId,
                email: email,
                doiTuong: doiTuong,
                loaiDoiTuongId: loaiDoiTuongId,
                nbQuanNhan: nbQuanNhan,
                nbDiaChi: nbDiaChi,
                nbGiayToTuyThan: nbGiayToTuyThan,
                nbNguoiBaoLanh: {
                  ...nbNguoiBaoLanh,
                  soDienThoai: nbNguoiBaoLanh?.soDienThoai?.replaceAll(" ", ""),
                },
                nbTheBaoHiem: {
                  ...nbTheBaoHiem,
                  diaChi: theBaoHiem?.diaChi || nbTheBaoHiem?.diaChi,
                  khuVuc: theBaoHiem?.maKV || nbTheBaoHiem?.khuVuc,
                  tuNgay:
                    nbTheBaoHiem?.tuNgay &&
                    moment(nbTheBaoHiem?.tuNgay).format("YYYY-MM-DD"),
                  denNgay:
                    nbTheBaoHiem?.denNgay &&
                    moment(nbTheBaoHiem?.denNgay).format("YYYY-MM-DD"),
                  thoiGianDu5Nam:
                    nbTheBaoHiem?.thoiGianDu5Nam &&
                    moment(nbTheBaoHiem?.thoiGianDu5Nam).format("YYYY-MM-DD"),
                  tuNgayMienCungChiTra:
                    nbTheBaoHiem?.tuNgayMienCungChiTra &&
                    moment(nbTheBaoHiem?.tuNgayMienCungChiTra).format(
                      "YYYY-MM-DD"
                    ),
                  denNgayMienCungChiTra:
                    nbTheBaoHiem?.denNgayMienCungChiTra &&
                    moment(nbTheBaoHiem?.denNgayMienCungChiTra).format(
                      "YYYY-MM-DD"
                    ),
                  tuNgayApDung: nbTheBaoHiem?.tuNgayApDung
                    ? moment(nbTheBaoHiem?.tuNgayApDung).format("YYYY-MM-DD")
                    : nbTheBaoHiem?.tuNgay &&
                      moment(nbTheBaoHiem?.tuNgay).format("YYYY-MM-DD"),

                  denNgayApDung: nbTheBaoHiem?.denNgayApDung
                    ? moment(nbTheBaoHiem?.denNgayApDung).format("YYYY-MM-DD")
                    : nbTheBaoHiem?.denNgay &&
                      moment(nbTheBaoHiem?.denNgay).format("YYYY-MM-DD"),
                },
                nbCapCuu: nbCapCuu,
                nbTongKetRaVien: nbTongKetRaVien,
                nbNguonNb: nbNguonNb,
                nbNgoaiVien: nbNgoaiVien,
                quayTiepDonId: quayBanDau,
                khoaId,
              },
              id: id,
              boQuaChuaThanhToan: boQuaChuaThanhToan,
            };

            dispatch.tiepDon
              .onSaveData(dataSubmit)
              .then(async (s) => {
                switch (s?.code) {
                  case 0:
                    if (dsDichVu?.length) {
                      let data = dsDichVu.map((item) => {
                        return {
                          nbDotDieuTriId: s?.data?.id,
                          nbDvKyThuat: {
                            phongThucHienId: item?.phongId,
                            ngoaiVienId: {
                              id: item?.ngoaiVienId,
                            },
                          },
                          nbDichVu: {
                            dichVuId: item?.dichVuId,
                            soLuong: 1,
                            chiDinhTuDichVuId: s?.data?.id,
                            chiDinhTuLoaiDichVu: 200,
                            khoaChiDinhId: s?.data?.khoaId,
                            loaiDichVu: item?.loaiDichVu,
                            khongThuTien: item?.khongThuTien,
                          },
                        };
                      });
                      await dispatch.tiepDonDichVu
                        .keDichVuKham({ data })
                        .then(() => {
                          if (data.length > 0) {
                            dispatch.tiepDonDichVu.getPhieuKhamBenh({
                              id: s?.data?.id,
                              data,
                            });
                          }
                        });
                    }
                    resolve({
                      code: 0,
                      message: t("common.daLuuDuLieu"),
                      id: s?.data?.id || "",
                      edit: !!id,
                      khamCapCuu: !id ? dangKyKhamCc : false,
                    });
                    if (!id && dangKyKhamCc) {
                      dispatch.tiepDon.resetData();
                      openInNewTab(
                        `/kham-benh/${s?.data?.phongKhamCapCuuId}/${s?.data?.maHoSo}/${s?.data?.nbDichVuKhamCapCuuId}`
                      );
                    }
                    break;
                  case 7950:
                    resolve({
                      code: 7950,
                      message: `${s?.message}, ${t(
                        "tiepDon.banCoMuonBoQuaKiemTraThe"
                      )}`,
                    });
                    break;
                  case 7920:
                    resolve({
                      code: 7920,
                      message: `${s?.message}`,
                    });
                    break;
                  case 7922:
                    if (capCuu)
                      resolve({
                        code: 7922,
                        message: `${s?.message} . ${t(
                          "tiepDon.banCoMuonTiepTucTiepDonNguoiBenhCapCuu"
                        )}`,
                      });
                    else {
                      message.error(s?.message);
                    }
                    break;
                  case 7923:
                    resolve({
                      code: 7923,
                      message: `${s?.message}`,
                      id: s?.data?.id || "",
                    });
                    break;
                  case 7924:
                    resolve({
                      code: 7924,
                      message: `${s?.message}`,
                      id: s?.data?.id || "",
                    });
                    break;
                  case 7940:
                    resolve({
                      code: 7940,
                      message: `${s?.message}`,
                      id: s?.data?.id || "",
                      nbThongTinId: s.data?.nbThongTinId,
                    });
                    break;
                  default:
                    break;
                }
              })
              .catch(() => {});
          };
          const getTenNb = (tenNb = "") => {
            return tenNb.split(" ").pop().toLowerCase();
          };
          const tenBanDau = state.nbDotDieuTri.thongTinBenhNhan?.tenNb;
          if (tenBanDau && getTenNb(tenNb) != getTenNb(tenBanDau)) {
            refConfirm.current &&
              refConfirm.current.show(
                {
                  title: t("common.thongBao"),
                  content: `${t("tiepDon.xacNhanDoiTenNguoiBenh")
                    .replace("{0}", tenBanDau)
                    .replace("{1}", tenNb.toUpperCase())}`,
                  cancelText: t("common.huy"),
                  okText: t("common.dongY"),
                  showImg: true,
                  showBtnOk: true,
                },
                () => {
                  submit();
                }
              );
          } else {
            submit();
          }
        } else {
          dispatch.tiepDon.updateData({ checkValidate: true });
          resolve({
            code: 10,
            message: t("tiepDon.loiValidateDuLieu"),
          });
          return;
        }
      });
    },
    onUpdate: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .capNhatDotDieuTri(payload)
          .then((s) => {
            if (s?.code === 0) {
              dispatch.tiepDon.updateData({
                thongTinBenhNhan: s.data,
              });
              resolve(s);
            } else {
              resolve(s);
              if (s?.code !== 7950 && s?.code !== 7920)
                message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message || t("common.xayRaLoiVuiLongThuLaiSau"));
          });
      });
    },
  }),
};
